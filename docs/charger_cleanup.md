# OCPP entity cleanup — Sonia = EV-Lader 1 Sonia (charger1_*)

Rob blijft `charger3_*` ("EV-Lader Rob") — expliciet zo gevraagd.

## STAP 1 — Sonia's entities hernoemen (charger2 → charger1) + friendly name

**Bulk-tip in HA UI:** Instellingen → Apparaten & services → tab **Entiteiten** → filter op `charger2` → alle rijen selecteren → 3-punts-menu boven → **Entiteit-ID's wijzigen** → zoek: `charger2`, vervang: `charger1`. In één keer klaar.

Voor friendly names: gebruik dezelfde bulk-tip: zoek `EV-Lader Sonia`, vervang door `EV-Lader 1 Sonia`.

Totaal: **52 entities** (charger2 → charger1). Onderstaand ter controle:

| Oud entity_id | Nieuw entity_id | Nieuwe friendly | Huidige state |
|---|---|---|---|
| `button.charger2_reset` | `button.charger1_reset` | "EV-Lader 1 Sonia Reset" | unknown |
| `button.charger2_unlock` | `button.charger1_unlock` | "EV-Lader 1 Sonia Unlock" | unknown |
| `number.charger2_maximum_current` | `number.charger1_maximum_current` | "EV-Lader 1 Sonia Maximum Current" | 16.0 |
| `number.charger2_session_current_limit` | `number.charger1_session_current_limit` | "EV-Lader 1 Sonia Session Current Limit" | unavailable |
| `sensor.charger2_connectors` | `sensor.charger1_connectors` | "EV-Lader 1 Sonia Connectors" | 1 |
| `sensor.charger2_current_export` | `sensor.charger1_current_export` | "EV-Lader 1 Sonia Current Export" | unavailable |
| `sensor.charger2_current_import` | `sensor.charger1_current_import` | "EV-Lader 1 Sonia Current Import" | unavailable |
| `sensor.charger2_current_offered` | `sensor.charger1_current_offered` | "EV-Lader 1 Sonia Current Offered" | unavailable |
| `sensor.charger2_energy_active_export_interval` | `sensor.charger1_energy_active_export_interval` | "EV-Lader 1 Sonia Energy Active Export Interval" | unavailable |
| `sensor.charger2_energy_active_export_register` | `sensor.charger1_energy_active_export_register` | "EV-Lader 1 Sonia Energy Active Export Register" | unavailable |
| `sensor.charger2_energy_active_import_interval` | `sensor.charger1_energy_active_import_interval` | "EV-Lader 1 Sonia Energy Active Import Interval" | unavailable |
| `sensor.charger2_energy_active_import_register` | `sensor.charger1_energy_active_import_register` | "EV-Lader 1 Sonia Energy Active Import Register" | unknown |
| `sensor.charger2_energy_meter_start` | `sensor.charger1_energy_meter_start` | "EV-Lader 1 Sonia Energy Meter Start" | unknown |
| `sensor.charger2_energy_reactive_export_interval` | `sensor.charger1_energy_reactive_export_interval` | "EV-Lader 1 Sonia Energy Reactive Export Interval" | unavailable |
| `sensor.charger2_energy_reactive_export_register` | `sensor.charger1_energy_reactive_export_register` | "EV-Lader 1 Sonia Energy Reactive Export Register" | unavailable |
| `sensor.charger2_energy_reactive_import_interval` | `sensor.charger1_energy_reactive_import_interval` | "EV-Lader 1 Sonia Energy Reactive Import Interval" | unavailable |
| `sensor.charger2_energy_reactive_import_register` | `sensor.charger1_energy_reactive_import_register` | "EV-Lader 1 Sonia Energy Reactive Import Register" | unavailable |
| `sensor.charger2_energy_session` | `sensor.charger1_energy_session` | "EV-Lader 1 Sonia Energy Session" | unknown |
| `sensor.charger2_error_code` | `sensor.charger1_error_code` | "EV-Lader 1 Sonia Error Code" | NoError |
| `sensor.charger2_error_code_connector` | `sensor.charger1_error_code_connector` | "EV-Lader 1 Sonia Error Code Connector" | NoError |
| `sensor.charger2_features` | `sensor.charger1_features` | "EV-Lader 1 Sonia Features" | CORE|SMART|REM |
| `sensor.charger2_frequency` | `sensor.charger1_frequency` | "EV-Lader 1 Sonia Frequency" | unavailable |
| `sensor.charger2_heartbeat` | `sensor.charger1_heartbeat` | "EV-Lader 1 Sonia Heartbeat" | 2026-09-28T20:19:41+00:00 |
| `sensor.charger2_id` | `sensor.charger1_id` | "EV-Lader 1 Sonia ID" | RATIO_P00000000006507 |
| `sensor.charger2_id_tag` | `sensor.charger1_id_tag` | "EV-Lader 1 Sonia Id Tag" | unknown |
| `sensor.charger2_latency_ping` | `sensor.charger1_latency_ping` | "EV-Lader 1 Sonia Latency Ping" | 0.0 |
| `sensor.charger2_latency_pong` | `sensor.charger1_latency_pong` | "EV-Lader 1 Sonia Latency Pong" | 138.0 |
| `sensor.charger2_model` | `sensor.charger1_model` | "EV-Lader 1 Sonia Model" | Charger-5 |
| `sensor.charger2_power_active_export` | `sensor.charger1_power_active_export` | "EV-Lader 1 Sonia Power Active Export" | unavailable |
| `sensor.charger2_power_factor` | `sensor.charger1_power_factor` | "EV-Lader 1 Sonia Power Factor" | unavailable |
| `sensor.charger2_power_offered` | `sensor.charger1_power_offered` | "EV-Lader 1 Sonia Power Offered" | unavailable |
| `sensor.charger2_power_reactive_export` | `sensor.charger1_power_reactive_export` | "EV-Lader 1 Sonia Power Reactive Export" | unavailable |
| `sensor.charger2_power_reactive_import` | `sensor.charger1_power_reactive_import` | "EV-Lader 1 Sonia Power Reactive Import" | unavailable |
| `sensor.charger2_reconnects` | `sensor.charger1_reconnects` | "EV-Lader 1 Sonia Reconnects" | 0 |
| `sensor.charger2_rpm` | `sensor.charger1_rpm` | "EV-Lader 1 Sonia RPM" | unavailable |
| `sensor.charger2_serial` | `sensor.charger1_serial` | "EV-Lader 1 Sonia Serial" | P00000000006507 |
| `sensor.charger2_soc` | `sensor.charger1_soc` | "EV-Lader 1 Sonia SoC" | unavailable |
| `sensor.charger2_status` | `sensor.charger1_status` | "EV-Lader 1 Sonia Status" | Available |
| `sensor.charger2_status_connector` | `sensor.charger1_status_connector` | "EV-Lader 1 Sonia Status Connector" | Available |
| `sensor.charger2_status_firmware` | `sensor.charger1_status_firmware` | "EV-Lader 1 Sonia Status Firmware" | unknown |
| `sensor.charger2_stop_reason` | `sensor.charger1_stop_reason` | "EV-Lader 1 Sonia Stop Reason" | unknown |
| `sensor.charger2_temperature` | `sensor.charger1_temperature` | "EV-Lader 1 Sonia Temperature" | unavailable |
| `sensor.charger2_time_session` | `sensor.charger1_time_session` | "EV-Lader 1 Sonia Time Session" | unknown |
| `sensor.charger2_timestamp_config_response` | `sensor.charger1_timestamp_config_response` | "EV-Lader 1 Sonia Timestamp Config Response" | 2026-09-28T16:19:38+00:00 |
| `sensor.charger2_timestamp_data_response` | `sensor.charger1_timestamp_data_response` | "EV-Lader 1 Sonia Timestamp Data Response" | unknown |
| `sensor.charger2_timestamp_data_transfer` | `sensor.charger1_timestamp_data_transfer` | "EV-Lader 1 Sonia Timestamp Data Transfer" | unknown |
| `sensor.charger2_transaction_id` | `sensor.charger1_transaction_id` | "EV-Lader 1 Sonia Transaction Id" | unknown |
| `sensor.charger2_vendor` | `sensor.charger1_vendor` | "EV-Lader 1 Sonia Vendor" | Ratio |
| `sensor.charger2_version_firmware` | `sensor.charger1_version_firmware` | "EV-Lader 1 Sonia Version Firmware" | 3.14.1 |
| `sensor.charger2_voltage` | `sensor.charger1_voltage` | "EV-Lader 1 Sonia Voltage" | unavailable |
| `switch.charger2_availability` | `switch.charger1_availability` | "EV-Lader 1 Sonia Availability" | on |
| `switch.charger2_charge_control` | `switch.charger1_charge_control` | "EV-Lader 1 Sonia Charge Control" | off |

## STAP 1b — Alleen friendly name (entity_id blijft charger1_*)

Deze bestaat al onder charger1_* (weesje uit oude registratie); alleen friendly name aanpassen zodat hij bij "EV-Lader 1 Sonia" hoort.

- `sensor.charger1_power_active_import`:  "EV-Lader Sonia Power Active Import"  →  "EV-Lader 1 Sonia Power Active Import"  (state: unavailable)

## STAP 2 — Dode entities verwijderen

Totaal: **43 entities** — allemaal `unavailable`/`unknown`. Selecteer via multi-select → prullenbak.

- `button.charger_reset`  (state: unavailable, friendly: "EV-Lader Rob Reset")
- `button.charger_unlock`  (state: unavailable, friendly: "EV-Lader Rob Unlock")
- `number.charger_maximum_current`  (state: unavailable, friendly: "EV-Lader Rob Maximum Current")
- `number.charger_session_current_limit`  (state: unavailable, friendly: "EV-Lader Rob Session Current Limit")
- `sensor.charger_energy_meter_start`  (state: unavailable, friendly: "EV-Lader Rob Energy Meter Start")
- `sensor.charger_energy_reactive_export_interval`  (state: unavailable, friendly: "EV-Lader Rob Energy Reactive Export Interval")
- `sensor.charger_energy_reactive_export_register`  (state: unavailable, friendly: "EV-Lader Rob Energy Reactive Export Register")
- `sensor.charger_energy_reactive_import_interval`  (state: unavailable, friendly: "EV-Lader Rob Energy Reactive Import Interval")
- `sensor.charger_energy_reactive_import_register`  (state: unavailable, friendly: "EV-Lader Rob Energy Reactive Import Register")
- `sensor.charger_energy_session`  (state: unavailable, friendly: "EV-Lader Rob Energy Session")
- `sensor.charger_error_code`  (state: unavailable, friendly: "EV-Lader Rob Error Code")
- `sensor.charger_error_code_connector`  (state: unavailable, friendly: "EV-Lader Rob Error Code Connector")
- `sensor.charger_features`  (state: unavailable, friendly: "EV-Lader Rob Features")
- `sensor.charger_frequency`  (state: unavailable, friendly: "EV-Lader Rob Frequency")
- `sensor.charger_heartbeat`  (state: unavailable, friendly: "EV-Lader Rob Heartbeat")
- `sensor.charger_id`  (state: unavailable, friendly: "EV-Lader Rob ID")
- `sensor.charger_id_tag`  (state: unavailable, friendly: "EV-Lader Rob Id Tag")
- `sensor.charger_latency_ping`  (state: unavailable, friendly: "EV-Lader Rob Latency Ping")
- `sensor.charger_latency_pong`  (state: unavailable, friendly: "EV-Lader Rob Latency Pong")
- `sensor.charger_model`  (state: unavailable, friendly: "EV-Lader Rob Model")
- `sensor.charger_power_active_export`  (state: unavailable, friendly: "EV-Lader Rob Power Active Export")
- `sensor.charger_power_active_import`  (state: unavailable, friendly: "EV-Lader Rob Power Active Import")
- `sensor.charger_power_factor`  (state: unavailable, friendly: "EV-Lader Rob Power Factor")
- `sensor.charger_power_offered`  (state: unavailable, friendly: "EV-Lader Rob Power Offered")
- `sensor.charger_power_reactive_export`  (state: unavailable, friendly: "EV-Lader Rob Power Reactive Export")
- `sensor.charger_power_reactive_import`  (state: unavailable, friendly: "EV-Lader Rob Power Reactive Import")
- `sensor.charger_reconnects`  (state: unavailable, friendly: "EV-Lader Rob Reconnects")
- `sensor.charger_rpm`  (state: unavailable, friendly: "EV-Lader Rob RPM")
- `sensor.charger_serial`  (state: unavailable, friendly: "EV-Lader Rob Serial")
- `sensor.charger_soc`  (state: unavailable, friendly: "EV-Lader Rob SoC")
- `sensor.charger_status`  (state: unavailable, friendly: "EV-Lader Rob Status")
- `sensor.charger_status_connector`  (state: unavailable, friendly: "EV-Lader Rob Status Connector")
- `sensor.charger_status_firmware`  (state: unavailable, friendly: "EV-Lader Rob Status Firmware")
- `sensor.charger_stop_reason`  (state: unavailable, friendly: "EV-Lader Rob Stop Reason")
- `sensor.charger_temperature`  (state: unavailable, friendly: "EV-Lader Rob Temperature")
- `sensor.charger_time_session`  (state: unavailable, friendly: "EV-Lader Rob Time Session")
- `sensor.charger_timestamp_config_response`  (state: unavailable, friendly: "EV-Lader Rob Timestamp Config Response")
- `sensor.charger_timestamp_data_response`  (state: unavailable, friendly: "EV-Lader Rob Timestamp Data Response")
- `sensor.charger_timestamp_data_transfer`  (state: unavailable, friendly: "EV-Lader Rob Timestamp Data Transfer")
- `sensor.charger_transaction_id`  (state: unavailable, friendly: "EV-Lader Rob Transaction Id")
- `sensor.charger_vendor`  (state: unavailable, friendly: "EV-Lader Rob Vendor")
- `sensor.charger_version_firmware`  (state: unavailable, friendly: "EV-Lader Rob Version Firmware")
- `sensor.charger_voltage`  (state: unavailable, friendly: "EV-Lader Rob Voltage")

## STAP 3 — Ping mij als klaar

Dan update ik `/config/packages/ev_laden.yaml` (charger2 → charger1 voor sensor-refs). `devid: charger2` blijft staan want dat is de interne OCPP chargePointId (niet de HA entity-slug); wil je die óók naar `charger1` dan is dat een OCPP-station-herconfiguratie.