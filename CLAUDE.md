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
- `input_number.compressor_starts_dag` / `..._nacht` — KPI-tellers voor compressor off→on transities, gesplitst op tijdvenster (06:00-22:00 vs 22:00-06:00 lokaal). Doel: meten of wijzigingen aan rust-setpoint/hysterese de starts richting zonne-uren verschuiven. Geïncrementeerd door `automation.warmtepomp_tel_compressor_starts_dag_nacht`. Gebruikt `input_number` i.p.v. `counter` omdat counter geen reload-service heeft.

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

## Automaties (algemeen)
| Alias | Trigger | Doel |
|---|---|---|
| Warmtepomp: extra opwarmen bij goedkoopste uur | xx:01 (1×/uur) | +0.5°C correction op optimaal uur, window afhankelijk van buitentemp |
| Warmtepomp: reset correction bij HA-start | HA start | Reset heating_target_correction als die nog ≠0 na HA-restart tijdens delay-fase |
| GitHub: nachtelijke config backup | 03:00 dagelijks | `git add -A && commit && push` |
| Waarschuwing bij herinstallatie | HA start | Notificatie over /share-map risico |
| Vorstbescherming: waarschuwing bij heating Off in koud weer | buitentemp ≤5°C voor 10 min | Persistent notification als `heating_mode = Off` (geen vorstbescherming actief) |
| Tapwater: lock uitzetten bij handmatige dhw_mode wijziging | dhw_mode state change | Detecteert UI/RBE-overname via context.user_id/parent_id; clearet `tapwater_overschot_lock` zodat reset NIET dhw_mode terugzet naar Holidays |

## Tapwater opwarm-events
| Trigger | Conditie | Doel-setpoint | DHW-mode | Automatie |
|---|---|---|---|---|
| DHW < 47°C voor 5 min | tarief ≤ drempel (€0.25) **OF** DHW < 41°C (nood) | 57°C | Automatic | `tapwater_bijverwarmen` |
| Heel uur 22:00-06:00 | goedkoopste nachtuur **EN** DHW < 54°C | 57°C | Automatic | `tapwater_goedkoopste_nachtuur` |
| P1 < -2000W voor 5 min | DHW < 52°C **EN** zon-forecast ≥ 2 kWh **EN** dhw_mode ≠ Party | 57°C | Automatic | `tapwater_zonne_overschot_klein` |
| P1 < -4000W voor 10 min | setpoint 55-60°C **EN** DHW < 61°C **EN** forecast ≥ 2 kWh | 62°C | Party | `tapwater_extra_opslag_groot_overschot` |
| Heel uur 09:00-16:00 | goedkoopste uur **EN** TDI ≥7 dgn geleden | 62°C | Automatic | `tdi_legionella_solar_overschot` |
| Autonome WP-cyclus | DHW ≤ setpoint − 10K (hysterese) | (volgt setpoint) | (ongewijzigd) | Luxtronik intern |

De `dhw_mode ≠ Party` guard op klein-overschot voorkomt dat een zojuist gestarte groot-overschot boost (setpoint 62 + Party) door klein-overschot wordt overschreven (setpoint→57 + mode→Automatic). Zonder die guard breekt de Party→Automatic-overschrijving `zonne_overschot_extra_opslag_reset` (conditie `mode = Party`) en degradeert de boost-target.

## Tapwater stop-events
| Trigger | Conditie | Nieuwe setpoint | Nieuwe mode | Automatie |
|---|---|---|---|---|
| DHW > 57°C voor 2 min | 50 < setpoint < 60 **EN** P1 > -1500W | 50°C | (ongewijzigd) | `tapwater_reset_na_bijverwarmen` |
| DHW > 58°C | mode = Party **EN** setpoint > 55 | 50°C | Automatic | `zonne_overschot_extra_opslag_reset` |
| DHW > 60°C | mode = Automatic **EN** setpoint > 55 | 50°C | (ongewijzigd) | `tdi_einde_reset` — verwarming-switch uit bij warm weer |
| Autonome WP-stop | DHW ≥ setpoint | (ongewijzigd) | (ongewijzigd) | Luxtronik intern |

## Tapwater drempel-temperaturen
| Temp | Betekenis |
|---|---|
| **41°C** | Noodgrens — bijverwarmen ongeacht tarief |
| **47°C** | Bijverwarm-trigger (mits tarief OK) |
| **50°C** | Rust-setpoint → autonome WP-start bij **40°C** (50-10K) |
| **52°C** | Bovengrens zonne-overschot start |
| **54°C** | Bovengrens nachtuur start |
| **57°C** | Target voor bijverwarmen/nacht/overschot + reset-trigger bijverwarmen |
| **58°C** | Reset-trigger zonne-overschot extra opslag |
| **60°C** | Reset-trigger TDI |
| **62°C** | Target voor TDI + extra opslag |

Luxtronik DHW-hysterese: 10K (entiteit `number.luxtronik_280807_0450_dhw_hysteresis`).

## Vakantiemodus
Single source of truth: `input_boolean.vakantie_actief`. Sync via `vakantie_sync_aan` (trigger: dhw_mode of heating_mode → Holidays, óf boolean → on) en `vakantie_sync_uit` (trigger: alleen boolean → off). Dhw_mode is géén sync-uit trigger omdat zonne-overschot die kortstondig naar Automatic wijzigt. Heating_mode `from: Holidays` is óók geen sync-uit trigger meer — sync_aan zet heating zelf van Holidays → Automatic, dat zou anders sync_uit direct triggeren (race).

**Heating tijdens vakantie**: heating_mode blijft op `Automatic` (NIET Holidays — die mode hanteert intern een zeer lage curve waardoor kamertemp bij koud weer onder 10°C kan zakken). In plaats daarvan verlaagt sync_aan `heating_curve_parallel_shift_temperature` tijdelijk van de normale waarde (typisch 17°C) naar **15.0°C** (vakantie-stooklijn). De oorspronkelijke waarde staat in `input_number.vakantie_parallel_shift_backup` (0 = geen backup actief; Luxtronik-range 5–35°C dus 0 is veilige sentinel). Sync_uit herstelt de backup-waarde en zet backup → 0. Idempotent: sync_aan overschrijft de backup niet als die al > 0 staat.

Als gebruiker via Luxtronik-display heating_mode → Holidays zet, wordt sync_aan geactiveerd en zet 'm direct terug naar Automatic + parallel_shift naar 15°C. Dhw_mode wel naar Holidays (respecteert "Off"). Sync_uit reset dhw_mode terug naar Automatic als nog op Holidays staat.

**TDI catch-up bij sync_uit**: als `input_datetime.tdi_laatste_start` ≥ 7 dgn geleden is (of unknown), forceert sync_uit direct een TDI-cyclus na het herstellen van parallel_shift — setpoint 62°C, dhw_mode Automatic, switch.heating aan, `tdi_laatste_start` = now, `tapwater_overschot_lock` = on. Ongeacht zon, uur of tariefcurve. Reset volgt via `tdi_einde_reset` (DHW > 60°C). Voorkomt dat de boiler na een vakantie nog dagen op niet-legionellaveilige 57°C draait voordat de reguliere TDI-automation aan de beurt komt.

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
