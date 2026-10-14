# Home Assistant configuratie — context voor Claude

## Platform
- Raspberry Pi met Home Assistant OS
- Werkmap: `/config`
- GitHub backup: `github.com/Rob5237/Home-Assistant-config` (one-way push, elke nacht 03:00)
- Backup script: `/config/git_push.sh`

## Bestandsstructuur
```
/config
├── configuration.yaml          # Hoofdconfig, laadt packages/ en templates/
├── automations.yaml            # Alle automaties
├── scenes.yaml
├── secrets.yaml
├── git_push.sh                 # GitHub backup script
├── packages/
│   ├── energy_meters.yaml      # utility_meter (dagelijks/maandelijks/jaarlijks)
│   └── helpers.yaml            # input_number, input_datetime
├── templates/
│   ├── warmtepomp.yaml         # COP-sensoren + optimaal_startuur (Zonneplan × COP × stooklijn)
│   ├── tapwater_decisions.yaml # beslissings-binary_sensors voor tapwater-automaties
│   └── elektriciteit_verbruik.yaml  # alleen nog export_365dagen (rest opgeruimd als dead code)
└── custom_templates/
    └── warmtepomp_macros.jinja # gedeelde stooklijn/COP/kosten + bereken_uren / bereken_tdi_uren
```

Bij wijzigen van `custom_templates/*.jinja`: `homeassistant.reload_custom_templates`
gevolgd door `template.reload`. Het eerste leest de macros opnieuw in,
het tweede her-evalueert de templates die ze gebruiken.

## Integraties
- **Luxtronik** — warmtepomp (entiteit-prefix: `luxtronik_280807_0450_`)
- **Zonneplan** — dynamisch elektricteitstarief (`sensor.zonneplan_current_electricity_tariff`, forecast in attribuut)
- **P1-meter** — slimme meter (import: `sensor.p1_meter_energy_import`, export: `sensor.p1_meter_energy_export`, vermogen: `sensor.p1_meter_power`)
- **Enphase Envoy** — zonnepanelen (`sensor.envoy_122331077486_current_power_production`, `..._lifetime_energy_production`)
- **OCPP** — laadpalen (certificaten: `ocpp_cert.pem`, `ocpp_key.pem`)
- **Weer** — `weather.thuis` (uurlijkse forecast via `weather.get_forecasts`)

## Helpers
- `input_number.tapwater_tarief_drempel` — max tarief voor bijverwarmen (default 0.25 €/kWh)
- `input_number.zon_forecast_drempel_kwh` — drempel voor `binary_sensor.zon_forecast_volgend_uur_voldoende` (default 2.0 kWh/uur)
- `input_datetime.tdi_laatste_start` — tijdstip laatste TDI (thermische desinfectie)
- `input_datetime.last_github_backup` — marker voor dagelijkse backup-poging
- `input_boolean.vakantie_actief` — single source of truth voor vakantiemodus. Sync bidirectioneel met Luxtronik dhw_mode/heating_mode "Holidays" via `vakantie_sync_aan`/`vakantie_sync_uit`.
- `input_boolean.tapwater_overschot_lock` — actief tijdens een opwarm-cyclus. Gezet door alle 5 start-automaties, gecheckt door 3 reset-automaties voor de "vakantie → Holidays" terugzet-actie, uitgezet door `tapwater_overschot_user_intervention` bij handmatige dhw_mode-wijziging.
- `input_number.compressor_starts_dag` / `..._nacht` — KPI-tellers voor compressor off→on transities, gesplitst op tijdvenster (06:00-22:00 vs 22:00-06:00 lokaal). Doel: meten of wijzigingen aan rust-setpoint/hysterese de starts richting zonne-uren verschuiven. Geïncrementeerd door `automation.compressor_starts_counter`, maandelijks gereset (1e v/d maand 00:01) door `automation.compressor_starts_monthly_reset`. Gebruikt `input_number` i.p.v. `counter` omdat counter geen reload-service heeft.

## Beslissings-binary_sensors (templates/tapwater_decisions.yaml)
- `binary_sensor.zon_forecast_volgend_uur_voldoende` — `on` als som van 3 dakgedeeltes (`sensor.energy_next_hour[_2][_3]`) ≥ 2.0 kWh. Gebruikt door zonne-overschot automaties (klein + groot) als forecast-conditie. Attributen: `forecast_kwh`, `drempel_kwh`.
- `binary_sensor.goedkoopste_nachtuur_nu` — `on` als huidig uur het goedkoopste resterende uur is binnen het 22:00-06:00 venster (Zonneplan forecast). Gebruikt door `tapwater_goedkoopste_nachtuur`.
- `binary_sensor.goedkoopste_tdi_uur_nu` — `on` als huidig uur het goedkoopste resterende uur is binnen 09:00-16:00 vandaag. Gebruikt door `tdi_legionella_solar_overschot`.

## Energie-meters (utility_meter)
- `solar_daily/monthly/yearly` — bron: P1 export (teruglevering naar net; naam historisch, meet NIET productie)
- `energy_daily/monthly/yearly` — bron: P1 import
- `enphase_daily/monthly/yearly` — bron: Enphase lifetime_energy_production (bruto zonneopwekking)

## Warmtepomp-logica
- **COP-sensoren**: Verwarming, Tapwater, Totaal, Geschat (op basis van aanvoer- en buitentemperatuur)
- **Optimaal startuur**: berekent goedkoopste stookuur via Zonneplan forecast × COP × dynamische stooklijn
  - Stooklijn: aanvoertemperatuur lineair van `heating_min_flow_out_temperature` tot `heating_curve_end_temperature` over bereik -10°C tot `heating_threshold_temperature`
- **TDI-kandidaat uur**: goedkoopste uur overdag (09:00-16:00) op de eerste dag waarop TDI ≥7 dagen geleden is
- **Pre-17:00 vloerbuffer**: `sensor.warmtepomp_optimaal_startuur_middag` kiest het goedkoopste uur binnen een venster dat eindigt om 17:00 en start op `middag_start_uur` (attribuut) — 12:00 bij mild weer (≥`heating_threshold_temperature`), schuivend tot 09:00 bij kou (heuristische clamp-formule, GEEN gekalibreerd model — recorder-historie start pas 2026-09-28 en heeft nog geen koude dagen gezien; later vervangen door een empirisch model zodra die data er is). `warmtepomp_pre17_buffer_start` zet op dat uur de kamerthermostaat (`climate.luxtronik_280807_0450_heating`) naar 21°C, met de oude setpoint weggeschreven in `input_number.warmtepomp_kamertemp_backup` (0 = geen backup actief). `warmtepomp_pre17_buffer_einde` zet om 17:00 de setpoint terug. `warmtepomp_pre17_buffer_reset_bij_gemiste_trigger` is het vangnet bij een HA-herstart rond 17:00. Losstaand van de dagbrede `warmtepomp_goedkoop_uur_opwarmen` (+0.5°C correctie, geen setpoint-wijziging) — beide kunnen onafhankelijk van elkaar draaien.
- **Zachte kamertemp-correctie** (`warmtepomp_kamertemp_correctie`): de Luxtronik heeft geen "kamerinvloed"-parameter, dus de stooklijn regelt open-loop op aanvoertemp, niet op kamertemp — kamertemp wijkt daardoor structureel iets af van het setpoint. Elke 15 min wordt `heating_target_correction` bijgesteld richting het setpoint in stappen van 0.5°C (kleinste stap van de entiteit), geclamped op ±2°C. Mutex via `input_boolean.warmtepomp_goedkoop_uur_boost_actief` met `warmtepomp_goedkoop_uur_opwarmen` (die dezelfde `heating_target_correction` tijdelijk op +0.5°C zet) — zonder mutex zouden beide automaties elkaar overschrijven.
- **`heating_threshold_temperature`** (stooklijn-drempel) verhoogd 2026-10-13 van 14.0°C naar **18.0°C**: bij 14.0°C clampte de stooklijn bij mild weer (16-17°C buiten) op de vaste bodemwaarde `heating_min_flow_out_temperature` — geen enkele compressorvraag, kamertemp bleef dagenlang onder setpoint hangen zonder dat er ooit boven-bodem werd aangestuurd. Met 18.0°C krijgt dit soort dagen voortaan een echte, boven-bodem aanvoertemp uit de stooklijn. Nog niet verder gevalideerd over meerdere dagen; bij te hoge stookkosten op milde dagen is dit de eerste parameter om weer te verlagen.
  - Zelfde dag (13-10-2026) ook getest: een geforceerde stookcyclus (`heating_min_flow_out_temperature` tijdelijk 19→29°C) om de kamer direct naar het setpoint (19,5°C) te krijgen — gelukt, afgebroken zodra kamertemp het setpoint bereikte (auto-revert naar 19,0°C), zie [[project_warmtepomp_aanvoer_traagheid]]. Bij 15,9°C buiten en de nieuwe drempel van 18,0°C berekent de stooklijn structureel maar ~20,2°C aanvoer (bodem 19,0°C + kleine marge) — bescheiden effect zo dicht bij de drempel, groter bij kouder weer. Besloten: eerst een paar dagen observeren met drempel 18,0°C voordat `heating_min_flow_out_temperature` zelf (permanent, voor alle dagen) wordt verhoogd voor een stevigere marge.

## Automaties (algemeen)
| Alias | Trigger | Doel |
|---|---|---|
| Warmtepomp: extra opwarmen bij goedkoopste uur | xx:01 (1×/uur) | +0.5°C correction op optimaal uur, window afhankelijk van buitentemp |
| Warmtepomp: reset correction bij HA-start | HA start | Reset heating_target_correction als die nog ≠0 na HA-restart tijdens delay-fase |
| GitHub: nachtelijke config backup | 03:00 dagelijks | `git add -A && commit && push` |
| Waarschuwing bij herinstallatie | HA start | Notificatie over /share-map risico |
| Vorstbescherming: waarschuwing bij heating Off in koud weer | buitentemp ≤5°C voor 10 min | Persistent notification als `heating_mode = Off` (geen vorstbescherming actief) |
| Tapwater: lock uitzetten bij handmatige dhw_mode wijziging | dhw_mode state change | Detecteert UI/RBE-overname via context.user_id/parent_id; clearet `tapwater_overschot_lock` zodat reset NIET dhw_mode terugzet naar Holidays |
| Warmtepomp: korte cyclus detector (<10 min) | compressor on→off | Persistent notification als laatste aan-fase <10 min duurde (pendel-signaal) |
| Warmtepomp: maandelijkse reset compressor-tellers | 1e v/d maand 00:01 | Reset `compressor_starts_dag`/`_nacht` → 0 voor MoM-trending |

## Tapwater opwarm-events
| Trigger | Conditie | Doel-setpoint | DHW-mode | Automatie |
|---|---|---|---|---|
| DHW < 46°C voor 5 min | tarief ≤ drempel (€0.25) **OF** DHW < 41°C (nood) | 57°C | Automatic | `tapwater_bijverwarmen` |
| Heel uur 22:00-06:00 | goedkoopste nachtuur **EN** DHW < 54°C | 57°C | Automatic | `tapwater_goedkoopste_nachtuur` |
| P1 < -2000W voor 5 min | DHW < 52°C **EN** zon-forecast ≥ 2 kWh **EN** Enphase nu > 1500W **EN** dhw_mode ≠ Party | 57°C | Automatic | `tapwater_zonne_overschot_klein` |
| P1 < -4000W voor 10 min | setpoint 55-60°C **EN** DHW < 61°C **EN** forecast ≥ 2 kWh | 62°C (+ hysterese 10K→3K) | Party | `tapwater_extra_opslag_groot_overschot` |
| Heel uur 09:00-16:00 | goedkoopste uur **EN** TDI ≥7 dgn geleden **EN** DHW < 60°C | 65°C (+ hysterese 10K→3K) | Party | `tdi_legionella_solar_overschot` |
| Autonome WP-cyclus | DHW ≤ setpoint − hysterese | (volgt setpoint) | (ongewijzigd) | Luxtronik intern |

De `dhw_mode ≠ Party` guard op klein-overschot voorkomt dat een zojuist gestarte groot-overschot boost (setpoint 62) of TDI-cyclus (setpoint 65) — beide Party-mode — door klein-overschot wordt overschreven (setpoint→57 + mode→Automatic). Zonder die guard breekt de Party→Automatic-overschrijving `zonne_overschot_extra_opslag_reset` (conditie `mode = Party`) en degradeert de boost-target.

TDI en extra-opslag gebruiken Party-mode om het tijdschema en de interne Sperrzeit te negeren — **niet** om de hysterese te omzeilen: bevestigd 23-09-2026 dat Party alléén de 10K-hysterese niet negeert op deze firmware (bij DHW ≥52°C bleef de WP 9u stil ondanks Party+62). Beide automaties verlagen daarom zelf ook `dhw_hysteresis` tijdelijk naar 3K zodat de compressor gegarandeerd start, en zetten 'm bij reset terug naar 10K. TDI zet bovendien `select.luxtronik_280807_0450_thermal_desinfection_day` op `None` om Luxtronik's eigen wekelijkse TDI-scheduler uit te schakelen (voorkomt een dubbele, autonome TDI-cyclus op de geconfigureerde dag naast de door HA aangestuurde cyclus).

TDI-setpoint is bewust 65°C i.p.v. 62°C (compressor-maximum): bij setpoint 62 stopte de compressor zodra de interne top-sensor 62 raakte, terwijl de HA-exposed mid-tanksensor (`dhw_temperature`) door stratificatie achterbleef op ~59°C — te laag voor Legionella-borging. Met setpoint 65 loopt de compressor door tot de mid-sensor ook richting 60+ getrokken wordt.

De realtime Enphase-check (`> 1500W`) op klein-overschot is een tweede guard naast de forecast: het uurgemiddelde-forecast detecteert een wolkenfront aan begin van het uur niet, de realtime productie wel. Voorkomt dat een cyclus start vlak nadat de zon plots wegvalt en daarna uit het net trekt tot DHW > 57.

## Tapwater stop-events
| Trigger | Conditie | Nieuwe setpoint | Nieuwe mode | Automatie |
|---|---|---|---|---|
| DHW > 57°C voor 1 min **OF** 13:55 (lock=on, DHW>56) **OF** 21:55 (lock=on) | 50 < setpoint < 60 **EN** P1 > -1500W | 50°C | (ongewijzigd) | `tapwater_reset_na_bijverwarmen` |
| DHW > 58°C (alleen setpoint 55-64) **OF** 21:55 (lock=on, setpoint > 55) | mode = Party | 50°C (+ hysterese→10K) | Automatic (of Holidays) | `zonne_overschot_extra_opslag_reset` |
| DHW ≥ 60°C voor 15 min | setpoint > 63 | 50°C (+ hysterese→10K) | Automatic | `tdi_einde_reset` — verwarming-switch uit bij warm weer, geen mode-check meer (TDI loopt nu in Party) |
| Autonome WP-stop | DHW ≥ setpoint | (ongewijzigd) | (ongewijzigd) | Luxtronik intern |

Watchdogs in `tapwater_reset_na_bijverwarmen`: 13:55 vóór het TDI-venster (~14:00) en 21:55 vóór het nachtuur-venster (22:00). Beide vangen op als de DHW>57-transitie-trigger gemist is (bv. P1 op moment van stijging niet > -1500W). De dag-watchdog heeft `DHW > 56` als extra guard om een actief lopende ochtend-cyclus niet af te breken; de avond-watchdog niet (om 21:55 zijn cycli normaal allang afgerond).

`tdi_einde_reset` heeft GEEN mode-conditie meer: TDI kan nu in Party of Automatic draaien (sinds Party-overrule). De "voor 15 min"-eis borgt Legionella-protocol óók voor de mid-tanksensor (de interne top-sensor stopt snel bij setpoint 65, de mid-sensor loopt door stratificatie achter). Onderscheid van zonne-overschot extra-opslag: expliciete `setpoint > 63`-conditie — TDI (65°C) matcht, extra-opslag (62°C) niet. `zonne_overschot_extra_opslag_reset` beperkt zijn DHW>58-trigger op zijn beurt tot `setpoint` tussen 55 en 64, zodat die niet op een lopende TDI-cyclus reageert.

Safety-reset in `tapwater_extra_opslag_groot_overschot`: na 45 min interne delay (was 90 min) wordt setpoint geforceerd naar 50 als de reguliere DHW>58-reset niet activeerde. Kortere termijn = kleiner pendel-venster.

## Tapwater drempel-temperaturen
| Temp | Betekenis |
|---|---|
| **41°C** | Noodgrens — bijverwarmen ongeacht tarief |
| **46°C** | Bijverwarm-trigger (mits tarief OK) |
| **52°C** | Bovengrens zonne-overschot start |
| **50°C** | Rust-setpoint → autonome WP-start bij **40°C** (50-10K) |
| **54°C** | Bovengrens nachtuur start |
| **57°C** | Target voor bijverwarmen/nacht/overschot + reset-trigger bijverwarmen (voor 1 min) |
| **58°C** | Reset-trigger zonne-overschot extra opslag |
| **60°C** | Reset-trigger TDI (voor 15 min — borgt Legionella-houdtijd voor mid-tanksensor) |
| **62°C** | Target voor extra opslag |
| **65°C** | Target voor TDI (compressor-maximum, zodat ook de mid-tanksensor richting 60+ getrokken wordt) |

Luxtronik DHW-hysterese: standaard 10K (entiteit `number.luxtronik_280807_0450_dhw_hysteresis`), tijdelijk verlaagd naar 3K tijdens een actieve TDI- of extra-opslag-cyclus (anders start de compressor niet ondanks Party-mode — zie hierboven) en teruggezet naar 10K door de bijbehorende reset-automatie.

## Vakantiemodus
Single source of truth: `input_boolean.vakantie_actief`. Sync via `vakantie_sync_aan` (trigger: dhw_mode of heating_mode → Holidays, óf boolean → on) en `vakantie_sync_uit` (trigger: alleen boolean → off). Dhw_mode is géén sync-uit trigger omdat zonne-overschot die kortstondig naar Automatic wijzigt. Heating_mode `from: Holidays` is óók geen sync-uit trigger meer — sync_aan zet heating zelf van Holidays → Automatic, dat zou anders sync_uit direct triggeren (race).

**Heating tijdens vakantie**: heating_mode blijft op `Automatic` (NIET Holidays — die mode hanteert intern een zeer lage curve waardoor kamertemp bij koud weer onder 10°C kan zakken). In plaats daarvan verlaagt sync_aan `heating_curve_parallel_shift_temperature` tijdelijk van de normale waarde (typisch 17°C) naar **15.0°C** (vakantie-stooklijn). De oorspronkelijke waarde staat in `input_number.vakantie_parallel_shift_backup` (0 = geen backup actief; Luxtronik-range 5–35°C dus 0 is veilige sentinel). Sync_uit herstelt de backup-waarde en zet backup → 0. Idempotent: sync_aan overschrijft de backup niet als die al > 0 staat.

Als gebruiker via Luxtronik-display heating_mode → Holidays zet, wordt sync_aan geactiveerd en zet 'm direct terug naar Automatic + parallel_shift naar 15°C. Dhw_mode wel naar Holidays (respecteert "Off"). Sync_uit reset dhw_mode terug naar Automatic als nog op Holidays staat.

**TDI catch-up bij sync_uit**: als `input_datetime.tdi_laatste_start` ≥ 7 dgn geleden is (of unknown), forceert sync_uit direct een TDI-cyclus na het herstellen van parallel_shift — setpoint 65°C, dhw_mode Automatic, switch.heating aan, `tdi_laatste_start` = now, `tapwater_overschot_lock` = on. Ongeacht zon, uur of tariefcurve. Setpoint 65°C (niet 62°C — gefixt 12-10-2026) is bewust gelijk aan de reguliere TDI-cyclus, zodat `tdi_einde_reset` (conditie `target_temperature > 63`) deze cyclus herkent; met 62°C matchte geen enkele reset-automation setpoint 62 + mode Automatic en bleef de boiler onbeperkt op 62°C/Automatic staan. Reset volgt via `tdi_einde_reset` (DHW > 60°C voor 15 min). Voorkomt dat de boiler na een vakantie nog dagen op niet-legionellaveilige 57°C draait voordat de reguliere TDI-automation aan de beurt komt.

NB: de TDI catch-up zet dhw_mode op Automatic (i.t.t. de reguliere `tdi_legionella_solar_overschot` die Party gebruikt). Reden: na een vakantie staat DHW typisch laag (Holidays-cyclus heeft hem onderhouden op ~10K onder rust-setpoint), dus de 10K-hysterese is geen probleem en Automatic past beter bij directe overgang uit Holidays.

Gedrag tijdens vakantie:

| Automatie | In vakantie |
|---|---|
| `warmtepomp_goedkoop_uur_opwarmen` | geblokkeerd |
| `tapwater_bijverwarmen` (tarief-tak) | geblokkeerd; noodtak DHW<41°C blijft actief |
| `tapwater_goedkoopste_nachtuur` | geblokkeerd |
| `tapwater_zonne_overschot_klein` | actief (overschot opslaan blijft) |
| `tapwater_extra_opslag_groot_overschot` | actief |
| `tdi_legionella_solar_overschot` | actief, maar `switch.heating` aan-actie geskipt |

Reset-automaties (`tapwater_reset_na_bijverwarmen`, `zonne_overschot_extra_opslag_reset`, `tdi_einde_reset`) zetten dhw_mode terug naar Holidays als `vakantie_actief = on` **EN** `tapwater_overschot_lock = on`. Heating-switch-uit in tdi_einde_reset is geskipt tijdens vakantie (respecteert user-keuze om heating aan te laten voor bv. vorstbescherming).

**User-intervention lock**: alle 5 start-automaties (`tapwater_bijverwarmen`, `tapwater_goedkoopste_nachtuur`, `tapwater_zonne_overschot_klein`, `tapwater_extra_opslag_groot_overschot`, `tdi_legionella_solar_overschot`) zetten `tapwater_overschot_lock = on` als laatste actie. De automation `tapwater_overschot_user_intervention` luistert op alle dhw_mode-wijzigingen en zet de lock uit zodra een wijziging niet van een eigen automation-context komt (context.user_id gevuld → UI; context.parent_id None → Luxtronik RBE/integration). De 3 reset-automaties checken de lock voor de Holidays-terugzet en clearen de lock altijd aan het eind.

Bij `vakantie_sync_uit`: persistent notification met DHW/kamer/buiten-temp, laatste TDI en heating-switch stand.

## Belangrijke entiteiten (veelgebruikt)
- Boilertemperatuur: `sensor.luxtronik_280807_0450_dhw_temperature`
- Buitentemperatuur: `sensor.luxtronik_280807_0450_outdoor_temperature`
- Aanvoertemperatuur: `sensor.luxtronik_280807_0450_flow_in_temperature`
- DHW mode: `select.luxtronik_280807_0450_dhw_mode`
- DHW water heater: `water_heater.luxtronik_280807_0450_domestic_water`
- Verwarmingsmodus: `select.luxtronik_280807_0450_heating_mode`
- Kamertemperatuur: `sensor.luxtronik_280807_0450_room_thermostat_temperature`
- Kamer setpoint: `sensor.luxtronik_280807_0450_room_thermostat_temperature_target`
- Stooklijn min aanvoer: `number.luxtronik_280807_0450_heating_min_flow_out_temperature`
- Stooklijn max aanvoer: `number.luxtronik_280807_0450_heating_curve_end_temperature`
- Stooklijn drempel: `number.luxtronik_280807_0450_heating_threshold_temperature`
- Actueel Zonneplan tarief: `sensor.zonneplan_current_electricity_tariff`
- Huidig vermogen net: `sensor.p1_meter_power` (positief=afname, negatief=teruglevering)

## API-aanroepen
- Gebruik altijd `$SUPERVISOR_TOKEN` voor REST API calls
- Nooit `ha core restart` voor partiële reloads — gebruik `homeassistant.reload_*` services
