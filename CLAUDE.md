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

## Energie-meters (utility_meter)
- `solar_daily/monthly/yearly` — bron: P1 export (teruglevering naar net; naam historisch, meet NIET productie)
- `energy_daily/monthly/yearly` — bron: P1 import
- `enphase_daily/monthly/yearly` — bron: Enphase lifetime_energy_production (bruto zonneopwekking)

## Warmtepomp-logica
- **COP-sensoren**: Verwarming, Tapwater, Totaal, Geschat (op basis van aanvoer- en buitentemperatuur)
- **Optimaal startuur**: berekent goedkoopste stookuur via Zonneplan forecast × COP × dynamische stooklijn
  - Stooklijn: aanvoertemperatuur lineair van `heating_min_flow_out_temperature` tot `heating_curve_end_temperature` over bereik -10°C tot `heating_threshold_temperature`
- **TDI-kandidaat uur**: goedkoopste uur overdag (09:00-16:00) op de eerste dag waarop TDI ≥7 dagen geleden is

## Automaties
| Alias | Trigger | Doel |
|---|---|---|
| Warmtepomp: extra opwarmen bij goedkoopste uur | elke minuut | +0.5°C correction op optimaal uur, window afhankelijk van buitentemp |
| Warmwater bij Zonne-overschot | P1 < -2000W voor 5 min | Boiler naar 57°C als teruglevering ≥2000W en boiler <52°C |
| Warmwater bij Zonne-overschot - Uitschakelen | boilertemp >65°C | Reset setpoint naar 48°C, verwarming uit |
| Legionella TDI bij laagste tarief overdag | elk heel uur | TDI op goedkoopste uur 09:00-16:00, ≥7 dagen na vorige |
| Tapwater bijverwarmen bij lage temperatuur | boilertemp <47°C | Opwarmen naar 57°C als tarief laag of noodgeval (<41°C) |
| Tapwater reset na bijverwarmen | boilertemp >57°C (≥2 min) | Setpoint terug naar 48°C (niet tijdens TDI of zonne-overschot; solar-drempel -1500W) |
| Tapwater verwarmen in goedkoopste nachtuur | elk heel uur 22:00-06:00 | Opwarmen op goedkoopste nachtuur als boiler <54°C |
| GitHub: nachtelijke config backup | 03:00 dagelijks | `git add -A && commit && push` |
| Waarschuwing bij herinstallatie | HA start | Notificatie over /share-map risico |

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
