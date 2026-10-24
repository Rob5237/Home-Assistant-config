# Elektrische stoppen – groepenkast

Aansluiting 3×25A. Elke aardlekschakelaar (ALS) hangt aan één fase; alle groepen zijn B16.
Draadkleuren fasen in meterkast: L1 = links, L2 = midden, L3 = rechts.

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
| 1, 2 | 2 | L2 | (leeg / reserve) |
| 3 | 2 | L2 | Quooker |
| 4 | 2 | L2 | Woonkamer, tuinverlichting, laadpaalsensoren |
| 5 | 2 | L2 | Combimagnetron |
| 6 | 2 | L2 | Koffiemachine, keukennis WCD rechterzijde |
| ? | 2 | L2 | Meterkast stopcontact linksboven |
| 7, 8 | 3 | L3 | (leeg / reserve) |
| 9 | 3 | L3 | ALARM + vaatwasser |
| 10 | 3 | L3 | WCD achter badkamerdeur (evt. elektrische radiator) |
| 11 | 3 | L3 | Droger |
| 12 | 3 | L3 | Wasmachine |
| 17 | 1 | L1 | (leeg / reserve) |
| 19 | 1 | L1 | WCD in muur achter keukenwandkast (ongebruikt) |
| 20 | 1 | L1 | Hal, toilet beneden, keukennis WCD linkerzijde, overloop, slaapkamers Ivan & Taeke, computer zolder, mechanische ventilatie, zolderplafondlicht |
| 21 | 1 | L1 | Meterkast stopcontact rechtsboven, internet/wifi/glasvezel, deurbel, garage (licht, koelkast, roldeur), buitenlamp rechterzijgevel, 2× slaapkamer achterzijde (Rob & Sonia, Aukje), badkamer (excl. WCD achter deur), WCD zolder (staande vloerlamp) |
| 22 | 1 | L1 | Stopcontacten keukenmuur, keukenvriezer, keukenkoelkast, keukenlicht, WCD terras, rookmelder hal, ingebouwde deurbel meterkast (ongebruikt) |

## Meerfase-verbruikers (eigen aansluiting)
| Wat | Fasen |
|-----|-------|
| Zonnepanelen | L1 L2 L3 |
| Enphase Q-relay | L1 L2 L3 |
| Inductiekookplaat | 2 fasen: L1 + L3 (gemeten 24-10-2026 via P1-fase 1 en 3 bij een testrun) |
| Warmtepomp (buiten + zolder) | L1 L2 L3 |
| Laadpaal garage (EV-Lader Rob) | L1 L2 L3 |
| Laadpaal voordeur (EV-Lader Sonia) | L1 L2 L3 |

## Controle P1-fasenummering (24-10-2026)
P1-fase 1/2/3 (HomeWizard, `sensor.p1_meter_power_phase_N`) is vergeleken met de groepenkast:
- **L3 bevestigd:** droger (stop 11, L3) liet alleen P1-fase 3 reageren (+~440 W, daarna wisselend ~265 W).
- **L2 waarschijnlijk:** de pulsen van ~2,1 kW (~51 per dag, ~10 s) die vermoedelijk de Quooker (stop 3, L2) zijn, staan op P1-fase 2. Niet bevestigd, want de Quooker is niet apart getest.
- **L1 door uitsluiting:** niet apart getest; volgt uit L2 en L3.
- Inductiekookplaat (2 fasen) reageerde op P1-fase 1 en 3, niet op fase 2.
