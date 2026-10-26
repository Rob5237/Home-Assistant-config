# Elektrische stoppen – groepenkast

Het overzicht-PDF (`www/elektrischestoppen.pdf`) wordt uit dit bestand gemaakt met `scripts/elektrischestoppen.py`. Pagina 1 is het overzicht, pagina 2 en 3 zijn de labels op ware grootte voor onder de Hager-modules (print op 100 %, A4 liggend). Alle teksten staan in dit bestand (secties Enkelfase-groepen, Toelichting per stop en Labels meterkast); het script bevat alleen de opmaak. Wijzig dus alleen hier en draai daarna dat script.

Aansluiting 3×25A. Elke aardlekschakelaar (ALS) hangt aan één fase; alle groepen zijn B16.
Fasevolgorde van de aardlekschakelaars in de meterkast, van links naar rechts: L1 = links, L2 = midden, L3 = rechts (aangepast 26-10-2026 op aanwijzing van de gebruiker: de linker faseschakelaar is L1, de middelste is L2; rechts is L3 door uitsluiting). Dit komt overeen met het HomeWizard-display. Onderaan de hoofdschakelaar zijn L1 en L2 onderling verwisseld (zie Kernmetingen).

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
| 10 | 3 | L3 | WCD achter badkamerdeur |
| 11 | 3 | L3 | Droger |
| 12 | 3 | L3 | Wasmachine |
| 17, 18 | 1 | L1 | AardLekSchakelaar |
| 19 | 1 | L1 | WCD in muur achter keukenwandkast (ongebruikt) |
| 20 | 1 | L1 | Hal, toilet beneden, keukennis WCD linkerzijde, overloop, slaapkamers Ivan & Taeke, computer zolder, mechanische ventilatie, zolderplafondlicht |
| 21 | 1 | L1 | Meterkast stopcontact rechtsboven, internet/wifi/glasvezel, Home Assistant, deurbel, garage (licht, koelkast, roldeur), buitenlamp rechterzijgevel, slaapkamers achterzijde (Rob & Sonia, Aukje), badkamerverlichting (excl. WCD achter deur), WCD zolder (staande vloerlamp) |
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
(Een ` // ` in een regel is een nieuwe regel in het PDF.)
Elke regel krijgt de datum van de meting tussen haakjes achter de titel, bijvoorbeeld `(24-10-2026)`. Het PDF leidt de kop 'Gemeten op ...' daaruit af en stopt als een datum ontbreekt.

- **P1-fasen = L1, L2, L3** (24-10-2026): HomeWizard-app en P1-sensor tonen in dezelfde volgorde en kleur.
- **Voeding hoofdschakelaar** (26-10-2026): de hoofdschakelaar (stop 13) krijgt voeding van de onderzijde. // links = L2 (paars in HomeWizard), // midden = L1 (roze in HomeWizard), // rechts = L3 (Lichtblauw in Homewizard).
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

## Toelichting per stop
Extra tekst bij een stop. Overzicht = klein onder de omschrijving op pagina 1. Label = vet boven de omschrijving in het vak op de labels (pagina 2); gebruik ` / ` voor een nieuwe regel.

| Stop | Overzicht | Label |
|------|-----------|-------|
| 3 | pulsen ~2,1 kW | |
| 9 | | HUIS / ALARM |

## Labels meterkast
Alles voor de labels op ware grootte (pagina 2 en 3 van het PDF). Tekst per vak: regels gescheiden door ` / `. De eerste regel is de titel (vet). Een regel die met `(` begint is klein; `_tekst_` is schuin en klein; `- tekst` krijgt een opsommingsteken; `**tekst**` is vet. De fasenamen L1, L2 en L3 krijgen automatisch de kleur van de fase (roze, paars, lichtblauw). Een leeg vak heeft geen tekst.

- Labelhoogte: 34 mm. Modulebreedte: 17,5 mm (Hager).
- Lege modules achter de L1-rij: 2.

### Hoofdschakelaar-vakjes (voor de L1-rij, 4 modules)
Vak met als achtergrond `grijs` wordt donkergrijs. Een regel die alleen een fase is (bijvoorbeeld L2) komt groot onderin; de overige regels staan bovenaan, de eerste twee klein.

| Vak | Tekst | Achtergrond |
|-----|-------|-------------|
| 1 | AardLek / Schakelaar / L2 | |
| 2 | AardLek / Schakelaar / L1 | |
| 3 | AardLek / Schakelaar / L3 | |
| 4 | AardLek / Schakelaar / 1 / 2 / 3 | grijs |

### Overige labels (rijen van 12 modules, pagina 3)
| Rij | Modules | Tekst |
|-----|---------|-------|
| Links boven: zonnepanelen en Enphase | 4 | Zonnepanelen / L3 + L1 + L2 |
| Links boven: zonnepanelen en Enphase | 6 | Enphase Q-relay / (Netbeveiligingsrelais) / L3 + L1 + L2 |
| Links boven: zonnepanelen en Enphase | 1 | |
| Links boven: zonnepanelen en Enphase | 1 | |
| Rechts boven: inductiekookplaat en laadpalen | 4 | Inductiekookplaat / L1 + L3 |
| Rechts boven: inductiekookplaat en laadpalen | 4 | Laadpaal bij garage (Rob) / Ratio Laadpaal P0000000000**6589** / _Laadpaal Code 491238_ / L2 + L1 + L3 |
| Rechts boven: inductiekookplaat en laadpalen | 4 | Laadpaal bij voordeur (Sonia) / Ratio Laadpaal P0000000000**6507** / _Laadpaal Code 792926_ / L2 + L1 + L3 |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 1 | |
| Links onder: warmtepomp | 4 | Warmtepomp / - Compressor op **L2** / - Elektrisch element op **L1 + L3** |
| Rechts onder: overspanningsbeveiliging | 4 | Overspanningsbeveiliging / L1 + L2 + L3 |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |
| Rechts onder: overspanningsbeveiliging | 1 | |

### Losse labels (pagina 2, breedte in mm)
| Label | Breedte | Tekst |
|-------|---------|-------|
| Enphase Envoy | 90 | Enphase Envoy |

### Frontlabel hoofdschakelaar (pagina 2)
Rechthoek die op de voorzijde van de hoofdschakelaar komt, onder de schakelaars, bij de faseaanduidingen. Vier polen van 1 module breed (70 mm). De drie automaten B16, B20 en B20 naast elkaar zijn ook 4-polig, 70 mm breed en 10 mm hoog, met dezelfde volgorde L2, L1, L3, N (26-10-2026). Polen van links naar rechts; N is de blauwe nul. De hoogte is een aanname, pas die aan zodra de ruimte op de schakelaar is opgemeten.

- Frontlabel polen: L2, L1, L3, N
- Frontlabel hoogte: 12 mm
- Frontlabel automaten: B16, B20, B20
- Frontlabel automaat hoogte: 10 mm

### Fasenlabel L1 L2 L3 (pagina 2, staand)
Eén rechthoek met drie smalle vakjes voor L1, L2 en L3. Alle maten in mm vanaf de bovenkant van het staande label (liggend gemeten vanaf links) (26-10-2026).

- Fasenlabel hoogte: 20 mm
- Fasenlabel vakbreedte: 18 mm
- Fasenlabel afstand: 58 mm
