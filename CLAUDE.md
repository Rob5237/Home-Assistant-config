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
└── templates/
    ├── warmtepomp.yaml         # COP-sensoren + forecast-logica
    ├── elektriciteit_verbruik.yaml  # Netto verbruik, kosten, vermogen
    └── Smartphones.yaml        # Aanwezigheidsdetectie
```

## Integraties
- **Luxtronik** — warmtepomp (entiteit-prefix: `luxtronik_280807_0450_`)
- **Zonneplan** — dynamisch elektricteitstarief (`sensor.zonneplan_current_electricity_tariff`, forecast in attribuut)
- **P1-meter** — slimme meter (import: `sensor.p1_meter_energy_import`, export: `sensor.p1_meter_energy_export`, vermogen: `sensor.p1_meter_power`)
- **Enphase Envoy** — zonnepanelen (`sensor.envoy_122331077486_current_power_production`, `..._lifetime_energy_production`)
- **OCPP** — laadpalen (certificaten: `ocpp_cert.pem`, `ocpp_key.pem`)
- **Weer** — `weather.thuis` (uurlijkse forecast via `weather.get_forecasts`)

## Helpers
- `input_number.tapwater_tarief_drempel` — max tarief voor bijverwarmen (default 0.25 €/kWh)
- `input_number.verbruiksprijs_kwh` — verbruiksprijs (default 0.2554 €/kWh)
- `input_number.terugleverprijs_kwh` — terugleverprijs (default 0.09 €/kWh)
- `input_datetime.tdi_laatste_start` — tijdstip laatste TDI (thermische desinfectie)
- `input_boolean.vakantie_actief` — single source of truth voor vakantiemodus. Sync bidirectioneel met Luxtronik dhw_mode/heating_mode "Holidays" via `vakantie_sync_aan`/`vakantie_sync_uit`.

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
| Warmtepomp: extra opwarmen bij goedkoopste uur | elke minuut | +0.5°C correction op optimaal uur, window afhankelijk van buitentemp |
| GitHub: nachtelijke config backup | 03:00 dagelijks | `git add -A && commit && push` |
| Waarschuwing bij herinstallatie | HA start | Notificatie over /share-map risico |

## Tapwater opwarm-events
| Trigger | Conditie | Doel-setpoint | DHW-mode | Automatie |
|---|---|---|---|---|
| DHW < 47°C voor 5 min | tarief ≤ drempel (€0.25) **OF** DHW < 41°C (nood) | 57°C | Automatic | `tapwater_bijverwarmen` |
| Heel uur 22:00-06:00 | goedkoopste nachtuur **EN** DHW < 54°C | 57°C | Automatic | `tapwater_goedkoopste_nachtuur` |
| P1 < -2000W voor 5 min | DHW < 52°C **EN** zon-forecast ≥ 2 kWh | 57°C | Automatic | `1778941827789` (warmwater_zonne_overschot) |
| P1 < -4000W voor 10 min | setpoint 55-60°C **EN** DHW < 61°C **EN** forecast ≥ 2 kWh | 62°C | Party | `tapwater_extra_opslag_groot_overschot` |
| Heel uur 09:00-16:00 | goedkoopste uur **EN** TDI ≥7 dgn geleden | 62°C | Automatic | `tdi_legionella_solar_overschot` |
| Autonome WP-cyclus | DHW ≤ setpoint − 8K (hysterese) | (volgt setpoint) | (ongewijzigd) | Luxtronik intern |

## Tapwater stop-events
| Trigger | Conditie | Nieuwe setpoint | Nieuwe mode | Automatie |
|---|---|---|---|---|
| DHW > 57°C voor 2 min | 50 < setpoint < 60 **EN** P1 > -1500W | 48°C | (ongewijzigd) | `tapwater_reset_na_bijverwarmen` |
| DHW > 58°C | mode = Party **EN** setpoint > 55 | 48°C | Automatic | `zonne_overschot_extra_opslag_reset` |
| DHW > 60°C | mode = Automatic **EN** setpoint > 55 | 48°C | (ongewijzigd) | `1778941860493` (tdi_einde_reset) — verwarming-switch uit bij warm weer |
| Autonome WP-stop | DHW ≥ setpoint | (ongewijzigd) | (ongewijzigd) | Luxtronik intern |

## Tapwater drempel-temperaturen
| Temp | Betekenis |
|---|---|
| **41°C** | Noodgrens — bijverwarmen ongeacht tarief |
| **47°C** | Bijverwarm-trigger (mits tarief OK) |
| **48°C** | Rust-setpoint → autonome WP-start bij **40°C** (48-8K) |
| **52°C** | Bovengrens zonne-overschot start |
| **54°C** | Bovengrens nachtuur start |
| **57°C** | Target voor bijverwarmen/nacht/overschot + reset-trigger bijverwarmen |
| **58°C** | Reset-trigger zonne-overschot extra opslag |
| **60°C** | Reset-trigger TDI |
| **62°C** | Target voor TDI + extra opslag |

Luxtronik DHW-hysterese: 8K (entiteit `number.luxtronik_280807_0450_dhw_hysteresis`).

## Vakantiemodus
Single source of truth: `input_boolean.vakantie_actief`. Sync via `vakantie_sync_aan` (trigger: dhw_mode of heating_mode → Holidays, óf boolean → on) en `vakantie_sync_uit` (trigger: boolean → off, óf heating_mode van Holidays → iets anders). Dhw_mode is géén sync-uit trigger omdat zonne-overschot die kortstondig naar Automatic wijzigt.

Sync_aan respecteert `Off` — modes die al uit staan worden niet overschreven naar Holidays (anders zou bv. zomerse "heating Off" omslaan naar vorstbescherming, en sync_uit later naar Automatic resetten i.p.v. Off). Sync_uit reset alleen modes die nog op Holidays staan, dus Off blijft Off door de hele cyclus.

Gedrag tijdens vakantie:

| Automatie | In vakantie |
|---|---|
| `warmtepomp_goedkoop_uur_opwarmen` | geblokkeerd |
| `tapwater_bijverwarmen` (tarief-tak) | geblokkeerd; noodtak DHW<41°C blijft actief |
| `tapwater_goedkoopste_nachtuur` | geblokkeerd |
| `1778941827789` warmwater zonne-overschot | actief (overschot opslaan blijft) |
| `tapwater_extra_opslag_groot_overschot` | actief |
| `tdi_legionella_solar_overschot` | actief, maar `switch.heating` aan-actie geskipt |

Reset-automaties (`tapwater_reset_na_bijverwarmen`, `zonne_overschot_extra_opslag_reset`, `1778941860493` tdi_einde_reset) zetten dhw_mode terug naar Holidays als `vakantie_actief = on`. Heating-switch-uit in tdi_einde_reset is geskipt tijdens vakantie (respecteert user-keuze om heating aan te laten voor bv. vorstbescherming).

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
