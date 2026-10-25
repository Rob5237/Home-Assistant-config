# Elektrische stoppen – groepenkast

Het overzicht-PDF (`www/elektrischestoppen.pdf`) wordt uit dit bestand gemaakt met `scripts/elektrischestoppen.py`. Wijzig dus alleen hier en draai daarna dat script.

Aansluiting 3×25A. Elke aardlekschakelaar (ALS) hangt aan één fase; alle groepen zijn B16.
Fasevolgorde in de meterkast, van links naar rechts: L2 = links, L3 = midden, L1 = rechts (aangepast 25-10-2026 op aanwijzing van de gebruiker; eerder stond hier L1 links, L2 midden, L3 rechts, en 'draadkleuren' terwijl het posities zijn).

## Hoofdcomponenten
| Stop | Wat | Fasen |
|------|-----|-------|
| 13 | Hoofdschakelaar | L1 L2 L3 |
| 14 | Aardlekschakelaar 1 | L1 |
| 15 | Aardlekschakelaar 2 | L2 |
| 16 | Aardlekschakelaar 3 | L3 |

## Enkelfase-groepen
| Stop | ALS | Fase | Wat |
|------|-----|------|-----|
| 1, 2 | 2 | L2 | AardLekSchakelaar |
| 3 | 2 | L2 | Quooker |
| 4 | 2 | L2 | Woonkamer, tuinverlichting, laadpaalsensoren, meterkast stopcontact linksboven |
| 5 | 2 | L2 | Combimagnetron |
| 6 | 2 | L2 | Koffiemachine, keukennis WCD rechterzijde |
| 7, 8 | 3 | L3 | AardLekSchakelaar |
| 9 | 3 | L3 | ALARM + vaatwasser |
| 10 | 3 | L3 | WCD achter badkamerdeur (evt. elektrische radiator) |
| 11 | 3 | L3 | Droger |
| 12 | 3 | L3 | Wasmachine |
| 17, 18 | 1 | L1 | AardLekSchakelaar |
| 19 | 1 | L1 | WCD in muur achter keukenwandkast (ongebruikt) |
| 20 | 1 | L1 | Hal, toilet beneden, keukennis WCD linkerzijde, overloop, slaapkamers Ivan & Taeke, computer zolder, mechanische ventilatie, zolderplafondlicht |
| 21 | 1 | L1 | Meterkast stopcontact rechtsboven, internet/wifi/glasvezel, deurbel, garage (licht, koelkast, roldeur), buitenlamp rechterzijgevel, slaapkamers achterzijde (Rob & Sonia, Aukje), badkamer (excl. WCD achter deur), WCD zolder (staande vloerlamp) |
| 22 | 1 | L1 | Stopcontacten keukenmuur, keukenvriezer, keukenkoelkast, keukenlicht, WCD terras, rookmelder hal, ingebouwde deurbel meterkast (ongebruikt) |

## Meerfase-verbruikers (eigen aansluiting)
Kolom Fasen: fasen buiten haakjes worden belast; fasen tussen haakjes zijn aangesloten maar niet belast.

| Wat | Fasen | Toelichting |
|-----|-------|-------------|
| Zonnepanelen + Enphase Q-relay | L1 L2 L3 | Opwek verdeeld: ~37% L1, ~27% L2, ~36% L3 |
| Inductiekookplaat | L1 L3 | 2 fasen, gemeten via P1 |
| Warmtepomp: compressor | L2 (L1 L3) | Alleen L2: +0,6 tot 1,4 kW. L1 en L3 aangesloten, niet belast |
| Warmtepomp: elektrisch element | L1 L3 | L1 + L3, ~2,0 kW per fase, samen ~4 kW |
| Laadpaal garage (EV-Rob) | L1 L2 L3 | Passat laadt op L2 (1 fase) |
| Laadpaal voordeur (EV-Sonia) | L1 L2 L3 | Ioniq 3 fasen; Passat ook hier op L2 |

## Kernmetingen
Elke regel krijgt de datum van de meting tussen haakjes achter de titel, bijvoorbeeld `(24-10-2026)`. Het PDF leidt de kop 'Gemeten op ...' daaruit af en stopt als een datum ontbreekt.

- **P1-fasen = L1, L2, L3** (24-10-2026): HomeWizard-app en P1-sensor tellen in dezelfde volgorde.
- **Quooker op L2** (24-10-2026): ~51 pulsen per dag van ~10 s en ~2,1 kW, naar schatting ~0,3 kWh per dag.
- **Element zonder compressor** (24-10-2026): Tapwatermode "Second heatsource" en setpoint 65 °C. Start pas als de boiler onder 55 °C staat.

## Controle P1-fasenummering (24-10-2026)
P1-fase 1/2/3 (HomeWizard-app en `sensor.p1_meter_power_phase_N`, zelfde volgorde) is vergeleken met de groepenkast:
- **L3 bevestigd:** droger (stop 11, L3) liet alleen de derde fase reageren (+~440 W, daarna wisselend ~265 W).
- **L2 bevestigd:** Quooker (stop 3, L2) handmatig aangezet; reageerde op de middelste fase. De korte pulsen van ~2,1 kW (~51 per dag, ~10 s) op die fase zijn dus vrijwel zeker de Quooker-standby.
- **L1 door uitsluiting:** niet apart getest; volgt uit L2 en L3.
- Passat laadt bij beide laders (EV-Rob en EV-Sonia) op de middelste fase (L2).
- Inductiekookplaat (2 fasen) reageerde op de eerste en derde fase (L1 + L3), niet op de middelste.
- Warmtepomp-compressor: belast alleen de middelste fase (L2); L1 en L3 vlak bij opstarten (32 opstarts, 26 dagen).
- Warmtepomp elektrisch element (extra warmteopwekker 2, 2 fasen): gemeten op 24-10-2026 21:20-21:28 via dhw_mode "Second heatsource" + setpoint 65 °C: +2,0 kW op L1 en +2,0 kW op L3 tegelijk (samen ~4 kW), L2 geen reactie, compressor uit. Draaide ononderbroken 21:22:25-21:28:14 na een aanloop van drie pulsen van 10 s aan / 30 s uit; daarna afgebroken door `tapwater_bijverwarmen`. Start alleen als de boiler onder setpoint minus `dhw_hysteresis` (10 K) staat, bij setpoint 65 dus onder 55 °C.
- Element zonder compressor aansturen (gemeten 24-10-2026): `select.luxtronik_280807_0450_dhw_mode` = "Second heatsource" + `number.luxtronik_280807_0450_dhw_target_temperature` = 65. Voorwaarde: boiler (`dhw_temperature`) onder setpoint minus `dhw_hysteresis` (10 K), dus onder 55 °C bij setpoint 65 (bij setpoint 62 en boiler 58,2 °C gebeurde niets). Compressor blijft dan uit. `automation.tapwater_bijverwarmen` (boiler < 46 °C voor 5 min en tarief < 0,25) overschrijft dit met Automatic + setpoint 57, dus houd de boiler tussen 46 en 55 °C of zet die automatisering tijdelijk uit. Niet getest: langer dan 5 min 49 s, ruimteverwarming (`heating_mode` "Second heatsource"). Rendement: element ~1 kWh warmte per kWh stroom, compressor ~3; alleen zinvol bij negatieve/zeer lage prijzen of PV-overschot.
