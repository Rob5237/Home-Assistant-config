#!/usr/bin/python3
"""Maakt www/elektrischestoppen.pdf (1 x A4) uit .claude/rules/elektrischestoppen.md.

Pagina 1 (A4 staand): overzicht. Pagina 2 (A4 liggend): labels op ware grootte voor onder de Hager-modules
(print op 100 %, niet 'aanpassen aan pagina').

Gebruik:  /usr/bin/python3 /config/scripts/elektrischestoppen.py
Vereist het Alpine-pakket py3-reportlab (apk add py3-reportlab); dat verdwijnt bij
een herinstallatie van de add-on. Alleen het bronbestand wijzigen, niet het PDF.
"""
import datetime
import re
import sys

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

SRC = "/config/.claude/rules/elektrischestoppen.md"
OUT = "/config/www/elektrischestoppen.pdf"
TITLE = "GROEPENKAST DUITLAAN 20"
SUBTITLE = "Meterkast woning"
SPECS = [("3 x 25 A", "AANSLUITING"), ("B16", "ALLE GROEPEN"), ("3", "AARDLEKSCHAKELAARS")]
SZ = 9.6  # lettergrootte onderdelen (groter laat de pagina overlopen)

# ------------------------------------------------------------------ bron inlezen
md = open(SRC, encoding="utf-8").read()


def clean(s):
    return (s.replace("–", "-").replace("×", "x").replace("—", "-")
             .replace("’", "'").replace("“", '"').replace("”", '"'))


def section(name):
    m = re.search(r"^## " + re.escape(name) + r".*?$(.*?)(?=^## |\Z)", md, re.S | re.M)
    if not m:
        sys.exit(f"sectie '{name}' niet gevonden in {SRC}")
    return m.group(1)


def table_rows(txt):
    rows = []
    for ln in txt.splitlines():
        if ln.startswith("|") and not re.match(r"^\|[-| ]+\|$", ln):
            rows.append([c.strip() for c in ln.strip().strip("|").split("|")])
    return rows[1:]  # eerste regel is de kop


# aardlekschakelaars: fase -> (stopnummer, nummer)
als = {}
for stop, wat, fase in table_rows(section("Hoofdcomponenten")):
    m = re.match(r"Aardlekschakelaar (\d)", wat)
    if m:
        als[fase] = (stop, m.group(1))

# positie in de meterkast
pos = dict((f"L{n}", p) for n, p in re.findall(r"L(\d) = (links|midden|rechts)", md))
if sorted(pos.values()) != ["links", "midden", "rechts"]:
    sys.exit("fasevolgorde (L2 = links, ...) niet gevonden in het bronbestand")


def split_items(desc):
    out, depth, cur = [], 0, ""
    i = 0
    while i < len(desc):
        ch = desc[i]
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if depth == 0 and (ch == "," or desc[i:i + 3] == " + "):
            out.append(cur.strip()); cur = ""
            i += 1 if ch == "," else 3
            continue
        cur += ch
        i += 1
    out.append(cur.strip())
    return [x[:1].upper() + x[1:] for x in out if x]


groepen = {"L1": [], "L2": [], "L3": []}
for nums, _, fase, desc in table_rows(section("Enkelfase-groepen")):
    kind = "res" if desc == "AardLekSchakelaar" else ""
    items = split_items(desc)
    groepen[fase].append(("\n".join(n.strip() for n in nums.split(",")), items, kind))

TAGS, LABELTEKST = {}, {}  # stop -> toelichting pagina 1 / tekst op het label
for stop, ov, lb in table_rows(section("Toelichting per stop")):
    if ov:
        TAGS[stop] = ov
    if lb:
        LABELTEKST[stop] = [x.strip() for x in lb.split(" / ")]

matrix = []
for wat, fasen, toel in table_rows(section("Meerfase-verbruikers")):
    belast = set(re.findall(r"L\d", re.sub(r"\(.*?\)", "", fasen)))
    aangesloten = set(re.findall(r"L\d", " ".join(re.findall(r"\((.*?)\)", fasen))))
    pat = "".join("1" if f in belast else "h" if f in aangesloten else "0" for f in ("L1", "L2", "L3"))
    matrix.append((wat, pat, toel))

feiten, meetdata = [], []
for t, dat, d in re.findall(r"^- \*\*(.+?)\*\*(?: \((\d{2}-\d{2}-\d{4})\))?: (.+)$", section("Kernmetingen"), re.M):
    if not dat:
        sys.exit(f"meting '{t}' in Kernmetingen heeft geen datum; zet (dd-mm-jjjj) achter de titel")
    feiten.append((t.upper(), d))
    meetdata.append(datetime.datetime.strptime(dat, "%d-%m-%Y").date())
if not feiten:
    sys.exit("geen metingen gevonden in sectie Kernmetingen")
uniek = sorted(set(meetdata))
fmt = lambda d: d.strftime("%d-%m-%Y")
if len(uniek) == 1:
    MEETKOP = f"GEMETEN OP {fmt(uniek[0])}"
elif len(uniek) == 2:
    MEETKOP = f"GEMETEN OP {fmt(uniek[0])} EN {fmt(uniek[1])}"
else:
    MEETKOP = f"GEMETEN TUSSEN {fmt(uniek[0])} EN {fmt(uniek[-1])}"

# ------------------------------------------------------------------ tekenen
W, H = A4
M = 12 * mm          # linker- en rechtermarge
MT = 7 * mm          # bovenmarge
MB = 6 * mm          # ondermarge
CW = W - 2 * M
FG = HexColor("#1b1f24"); RULE = HexColor("#cfd3d8"); SOFT = HexColor("#eef0f2"); RED = HexColor("#d41c1c")
P = {1: (HexColor("#e0529c"), HexColor("#fbe3ef")),
     2: (HexColor("#9b4fbf"), HexColor("#f1e2f6")),
     3: (HexColor("#5db8ea"), HexColor("#e3f4fc"))}
R, B, MONO = "Helvetica", "Helvetica-Bold", "Courier-Bold"

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Groepenkast Duitlaan 20")
# afdrukvoorkeuren in het PDF: enkelzijdig en op 100 % (labels op ware grootte); niet elke viewer volgt dit
c.setViewerPreference("Duplex", "Simplex")
c.setViewerPreference("PrintScaling", "None")
y = H - MT


def text(x, yb, s, font=R, size=8, color=FG):
    c.setFont(font, size); c.setFillColor(color); c.drawString(x, yb, clean(s))


def wrap(s, width, font=R, size=8):
    return simpleSplit(clean(s), font, size, width)


# kop
text(M, y - 37, SUBTITLE + "  -  bijgewerkt " + datetime.date.today().strftime("%d-%m-%Y"), R, 6.5)
sx = W - M
for big, small in reversed(SPECS):
    sx -= max(c.stringWidth(big, B, 16.2), c.stringWidth(small, R, 6.5)) + 10
    text(sx, y - 26, big, B, 16.2)
    text(sx, y - 37, small, R, 6.5)
text(M, y - 26, TITLE, B, 17.8)
y -= 46
c.setStrokeColor(FG); c.setLineWidth(2); c.line(M, y, W - M, y)
y -= 9

# hoofdschakelaar met fasevolgorde in kleur
bh = 18
c.setFillColor(FG); c.rect(M, y - bh, CW, bh, stroke=0, fill=1)
text(M + 8, y - 12, "Stop 13", MONO, 9, white)
text(M + 55, y - 12.4, "HOOFDSCHAKELAAR", B, 9.9, white)
volgorde = [f for p in ("links", "midden", "rechts") for f in pos if pos[f] == p]
segs = [("Faseschakelaars:", white), ("    ", white)]
for k, f in enumerate(volgorde):
    if k:
        segs.append(("   -   ", white))
    segs.append((f"{f} {pos[f]}", P[int(f[1])][0]))
sxx = W - M - 8 - sum(c.stringWidth(t, B, 9) for t, _ in segs)
for t, col_ in segs:
    text(sxx, y - 12, t, B, 9, col_)
    sxx += c.stringWidth(t, B, 9)
y -= bh + 12

# kolommen
text(M, y - 9, "ENKELFASE-GROEPEN PER AARDLEKSCHAKELAAR", B, 9.5)
text(W - M - c.stringWidth("HOMEWIZARD KLEUREN", B, 9.5), y - 9, "HOMEWIZARD KLEUREN", B, 9.5)
y -= 15
cols = [(int(f[1]), f, f"Stop {als[f][0]} - Aardlek {als[f][1]}", pos[f].capitalize() + " in de meterkast", groepen[f])
        for f in ("L1", "L2", "L3")]
GAP = 8
colw = (CW - 2 * GAP) / 3
NW = 17
LEAD = SZ * 1.19
BUL = 7
TW = colw - NW - 12


def item_lines(items):
    return [wrap(it, TW - BUL, R, SZ) for it in items]


def row_h(items, num, tag):
    n = sum(len(x) for x in item_lines(items)) + (1 if tag else 0)
    return max(n, 1 + num.count("\n")) * LEAD + 8


def tag_of(num, items):
    return TAGS.get(num)


HEAD, POS = 30, 13
colh = max(HEAD + POS + sum(row_h(it, n, tag_of(n, it)) for n, it, k in rows) for *_, rows in cols)
for i, (pn, l, als_t, pos_t, rows) in enumerate(cols):
    x = M + i * (colw + GAP)
    col, soft = P[pn]
    c.setStrokeColor(RULE); c.setLineWidth(0.6); c.setFillColor(white)
    c.rect(x, y - colh, colw, colh, stroke=1, fill=1)
    c.setFillColor(col); c.rect(x, y - HEAD, colw, HEAD, stroke=0, fill=1)
    text(x + 8, y - 22, l, B, 22, white)
    text(x + colw - 8 - c.stringWidth(als_t, MONO, 8), y - 18, als_t, MONO, 8, white)
    c.setFillColor(soft); c.rect(x, y - HEAD - POS, colw, POS, stroke=0, fill=1)
    text(x + 8, y - HEAD - 9.3, pos_t.upper(), R, 6.5)
    ry = y - HEAD - POS
    for num, items, kind in rows:
        tag = tag_of(num, items)
        h = row_h(items, num, tag)
        if tag:
            c.setFillColor(soft); c.rect(x + 0.3, ry - h, colw - 0.6, h, stroke=0, fill=1)
        c.setStrokeColor(RULE); c.setLineWidth(0.4); c.line(x, ry - h, x + colw, ry - h)
        for k, part in enumerate(num.split("\n")):
            text(x + 6, ry - 11 - k * LEAD, part, B, 9, FG)
        tx, ly, res = x + NW + 4, ry - 11, kind == "res"
        for it, lines in zip(items, item_lines(items)):
            if not res:
                c.setFillColor(col); c.circle(tx + 1.6, ly + 2.6, 1.1, stroke=0, fill=1)
            for ln in lines:
                if it == "ALARM":
                    text(tx + BUL, ly, "ALARM", B, SZ, RED)
                else:
                    text(tx + (0 if res else BUL), ly, ln, R, SZ)
                ly -= LEAD
        if tag:
            text(tx + BUL, ly, tag, R, 6.8)
        ry -= h
y -= colh + 14

# matrix
text(M, y - 9, "MEERFASE-VERBRUIKERS MET EIGEN AANSLUITING", B, 9.5)
y -= 15
NAMEW = 150
DOTX = [M + NAMEW + 14 + k * 30 for k in range(3)]
NOTEX = M + NAMEW + 14 + 3 * 30 + 6
NOTEW = W - M - 8 - NOTEX
mh = 15
c.setFillColor(SOFT); c.rect(M, y - mh, CW, mh, stroke=0, fill=1)
for k in range(3):
    c.setFillColor(P[k + 1][0]); c.setFont(B, 9); c.drawCentredString(DOTX[k], y - 10.5, f"L{k + 1}")
text(M + 8, y - 10.3, "VERBRUIKER", B, 7)
text(NOTEX, y - 10.3, "BELASTING", B, 7)
rows_total = [max(len(wrap(n, NOTEW, R, 8.2)) * 9.5 + 4, 15.5) for _, _, n in matrix]
mt = mh + sum(rows_total)
c.setStrokeColor(RULE); c.setLineWidth(0.6); c.setFillColor(white)
c.rect(M, y - mt, CW, mt, stroke=1, fill=0)
ry = y - mh
for (nm, pat, note), h in zip(matrix, rows_total):
    c.setStrokeColor(RULE); c.setLineWidth(0.4); c.line(M, ry - h, W - M, ry - h)
    text(M + 8, ry - h / 2 - 3, nm, B, 8.2)
    for k, ch in enumerate(pat):
        cx, cy = DOTX[k], ry - h / 2
        if ch == "1":
            c.setFillColor(P[k + 1][0]); c.circle(cx, cy, 5.2, stroke=0, fill=1)
        elif ch == "0":
            c.setStrokeColor(RULE); c.setLineWidth(0.8); c.setFillColor(white); c.circle(cx, cy, 5.2, stroke=1, fill=0)
        else:
            c.setStrokeColor(FG); c.setLineWidth(0.8); c.setDash(1.5, 1.5); c.circle(cx, cy, 4, stroke=1, fill=0); c.setDash()
    lines = wrap(note, NOTEW, R, 8.2)
    for k, ln in enumerate(lines):
        text(NOTEX, ry - h / 2 + (len(lines) - 1) * 4.75 - k * 9.5 - 2.6, ln, R, 8.2)
    ry -= h
y -= mt + 5
c.setFillColor(FG); c.circle(M + 4, y - 6, 3, stroke=0, fill=1)
text(M + 11, y - 8.2, "belast of aangesloten en gebruikt", R, 7)
c.setStrokeColor(FG); c.setLineWidth(0.7); c.setDash(1.2, 1.2); c.circle(M + 150, y - 6, 3, stroke=1, fill=0); c.setDash()
text(M + 157, y - 8.2, "aangesloten, geen belasting", R, 7)
y -= 22

# kernmetingen
text(M, y - 9, MEETKOP, B, 9.5)
y -= 15
fw = (CW - 2 * GAP) / 3
fh = max(12 + len(wrap(d, fw - 10, R, 8.2)) * 9.5 for _, d in feiten)
for i, (t, d) in enumerate(feiten[:3]):
    x = M + i * (fw + GAP)
    c.setFillColor(FG); c.rect(x, y - fh, 2.2, fh, stroke=0, fill=1)
    text(x + 8, y - 9, t, B, 8)
    for k, ln in enumerate(wrap(d, fw - 10, R, 8.2)):
        text(x + 8, y - 12 - 8.2 - k * 9.5 + 0.5, ln, R, 8.2)
y -= fh + 12

# voet
c.setStrokeColor(RULE); c.setLineWidth(0.6); c.line(M, MB + 12, W - M, MB + 12)
text(M, MB + 3, "Volgorde in de meterkast: " + ", ".join(f"{f} {pos[f]}" for f in volgorde)
     + ". Kleuren: L1 roze, L2 paars, L3 lichtblauw.", R, 7)

if y <= MB + 14:
    sys.exit(f"inhoud past niet op 1 A4 (y={y:.0f}); verklein SZ of kort het bronbestand in")
c.showPage()

# ------------------------------------------------------------------ labels op ware grootte (pagina 2 en 3)
lab = section("Labels meterkast")


def sub(naam):
    m = re.search(r"^### " + re.escape(naam) + r".*?$(.*?)(?=^### |\Z)", lab, re.S | re.M)
    if not m:
        sys.exit(f"onderdeel '{naam}' niet gevonden in sectie Labels meterkast")
    return m.group(1)


def getal(patroon):
    m = re.search(patroon, lab)
    if not m:
        sys.exit(f"'{patroon}' niet gevonden in sectie Labels meterkast")
    return float(m.group(1).replace(",", "."))


MODULE = getal(r"Modulebreedte: ([\d,.]+) mm") * mm
LABEL_H = getal(r"Labelhoogte: ([\d,.]+) mm") * mm
LEGE_NA = int(getal(r"Lege modules achter de L1-rij: (\d+)"))
HOOFD_NAAM = next((w for st, w, f in table_rows(section("Hoofdcomponenten")) if st == "13"), "Hoofdschakelaar")
I = "Helvetica-Oblique"
FASE_RE = re.compile(r"\b(L[123])\b")


def kleur_van(tok):
    return P[int(tok[1])][0]


def vul_fase(x, ytop, w, h, fases):
    """Vakachtergrond in de kleur van de fase(n) die in het vak genoemd worden (naast elkaar bij meerdere)."""
    fases = sorted(set(fases))
    for i, f in enumerate(fases):
        c.setFillColor(kleur_van(f))
        c.rect(x + i * w / len(fases), ytop - h, w / len(fases), h, stroke=0, fill=1)


def rich(line, font, size):
    """Regel -> segmenten (tekst, font, grootte, kleur); **vet** en fasenamen in fasekleur."""
    segs = []
    for deel in re.split(r"(\*\*.+?\*\*)", line):
        if not deel:
            continue
        f = font
        if deel.startswith("**") and deel.endswith("**"):
            deel, f = deel[2:-2], B
        for stuk in FASE_RE.split(deel):
            if stuk:
                segs.append((stuk, f, size, FG))
    return segs


def teken_segs(cx, yb, segs):
    totaal = sum(c.stringWidth(clean(t), f, z) for t, f, z, _ in segs)
    xx = cx - totaal / 2
    for t, f, z, kl in segs:
        text(xx, yb, t, f, z, kl)
        xx += c.stringWidth(clean(t), f, z)


def celtekst(x, w, ytop, ybodem, regels):
    """Tekstregels gecentreerd (horizontaal en verticaal) in een vak."""
    uit = []
    for k, r in enumerate(regels):
        if k == 0:
            z = 10
            while z > 7 and sum(c.stringWidth(clean(t), f, z) for t, f, _, _ in rich(r, B, z)) > w - 4 * mm:
                z -= 0.5
            uit.append((rich(r, B, z), z * 1.35))
        elif r.startswith("("):
            uit.append((rich(r, R, 7), 7 * 1.35))
        elif r.startswith("_") and r.endswith("_"):
            uit.append((rich(r.strip("_"), I, 7), 7 * 1.35))
        elif r.startswith("- "):
            uit.append((rich("\u2022 " + r[2:], R, 8.5), 8.5 * 1.35))
        elif re.fullmatch(r"L[123](?: \+ L[123])*", r):
            uit.append((rich(r, B, 9), 9 * 1.35))
        else:
            uit.append((rich(r, R, 8.5), 8.5 * 1.35))
    hoogte = sum(l for _, l in uit)
    yb = (ytop + ybodem) / 2 + hoogte / 2
    for segs, lead in uit:
        yb -= lead
        teken_segs(x + w / 2, yb + lead * 0.28, segs)


def pas_in_vak(x, ybodem, breedte, hoogte, tekst, font=R, maxsz=7.0, minsz=3.0):
    """Zet tekst in een vak; kiest de grootste letter waarbij alles past, horizontaal of 90 graden gedraaid."""
    tekst = clean(tekst)
    beste = None
    for gedraaid in (False, True):
        bw, bh = (hoogte, breedte) if gedraaid else (breedte, hoogte)
        sz = maxsz
        while sz >= minsz:
            regels = simpleSplit(tekst, font, sz, bw)
            if all(c.stringWidth(r, font, sz) <= bw + 0.01 for r in regels) and len(regels) * sz * 1.12 <= bh:
                if beste is None or sz > beste[0]:
                    beste = (sz, gedraaid, regels)
                break
            sz -= 0.25
    if beste is None:
        sys.exit(f"tekst past niet in het vak: {tekst!r}")
    sz, gedraaid, regels = beste
    c.setFillColor(FG); c.setFont(font, sz)
    lead = sz * 1.12
    if gedraaid:
        c.saveState(); c.translate(x, ybodem); c.rotate(90)
        for k, r in enumerate(regels):
            c.drawString(0, -(k + 1) * lead + (lead - sz) * 0.2, r)
        c.restoreState()
    else:
        for k, r in enumerate(regels):
            c.drawString(x, ybodem + hoogte - (k + 1) * lead + (lead - sz) * 0.2, r)
    return sz


STOP_ITEMS = {}
for _f, _rows in groepen.items():
    for _n, _items, _k in _rows:
        if "\n" not in _n and _k != "res":
            STOP_ITEMS[_n] = _items
c.setPageSize(landscape(A4))
LW, LH = landscape(A4)


def label_secties(fases):
    out = []
    for f in fases:
        rows = sorted(groepen[f], key=lambda r: int(r[0].split("\n")[0]))
        out.append((f, [(n.split("\n"), kind == "res", items[0]) for n, items, kind in rows]))
    return out


def teken_label(x0, ytop, titel, secs, voor=0, na=0):
    """voor/na = aantal modules vooraan (hoofdschakelaar) en leeg achteraan."""
    mods = sum(len(n) if als else 1 for _, rows in secs for n, als, _ in rows) + voor + na
    breedte = mods * MODULE
    text(x0, ytop + 3 * mm, f"{titel}  -  {mods} modules = {breedte / mm:.0f} x {LABEL_H / mm:.0f} mm", R, 7)
    c.setStrokeColor(HexColor("#999999")); c.setLineWidth(0.4)
    c.rect(x0, ytop - LABEL_H, breedte, LABEL_H, stroke=1, fill=0)
    x = x0 + voor * MODULE
    for si, (fase, rows) in enumerate(secs):
        for k, (n, als, omschr) in enumerate(rows):
            w = (len(n) if als else 1) * MODULE
            if als:
                vul_fase(x, ytop, w, LABEL_H, [fase])
                text(x + 2 * mm, ytop - 6 * mm, omschr, B, 8.5)
                text(x + 2 * mm, ytop - LABEL_H + 6 * mm, "Fase", R, 8)
                text(x + 2 * mm + c.stringWidth("Fase ", R, 8) + 1 * mm, ytop - LABEL_H + 5 * mm, fase, R, 34, FG)
            else:
                c.setFillColor(FG); c.setFont(R, 13)
                c.drawCentredString(x + w / 2, ytop - 7 * mm, n[0])
                eigen = LABELTEKST.get(n[0], [])
                for j, regel in enumerate(eigen):
                    c.setFont(B, 8.5)
                    c.drawCentredString(x + w / 2, ytop - 14 * mm - j * 4 * mm, regel)
                items = [i for i in STOP_ITEMS.get(n[0], []) if not (eigen and i == "ALARM")]
                if items:
                    top = ytop - (10 * mm + (11 * mm if eigen else 0))
                    pas_in_vak(x + 1.5 * mm, ytop - LABEL_H + 1.5 * mm, w - 3 * mm, top - (ytop - LABEL_H + 1.5 * mm), ", ".join(items))
            x += w
            if x < x0 + breedte - 0.1:  # lijn op de modulegrens; dik tussen twee fasen
                laatste = k == len(rows) - 1
                dik = laatste and si < len(secs) - 1
                c.setStrokeColor(FG); c.setLineWidth(1.0 if dik else 0.5)
                c.line(x, ytop - (0 if laatste else 12 * mm), x, ytop - LABEL_H)
    for j in range(1, na):  # lege modules achteraan
        c.setStrokeColor(FG); c.setLineWidth(0.5)
        c.line(x + j * MODULE, ytop, x + j * MODULE, ytop - LABEL_H)


def teken_hoofdschakelaar(x0, ytop):
    """4 modules: band met de naam van de hoofdschakelaar en daaronder de aardlek-vakjes uit het bronbestand."""
    vakken = table_rows(sub("Hoofdschakelaar-vakjes"))
    band = 9 * mm
    n = len(vakken)
    c.setFillColor(HexColor("#c4c4c4")); c.rect(x0, ytop - band, n * MODULE, band, stroke=0, fill=1)
    c.setFillColor(FG); c.setFont(B, 14)
    c.drawCentredString(x0 + n * MODULE / 2, ytop - band / 2 - 5, HOOFD_NAAM)
    c.setStrokeColor(FG); c.setLineWidth(0.5)
    c.line(x0, ytop - band, x0 + n * MODULE, ytop - band)
    for k, (vak, tekst_, achtergrond) in enumerate(vakken):
        cx = x0 + k * MODULE + MODULE / 2
        fasen_in_vak = FASE_RE.findall(tekst_)
        if fasen_in_vak:
            vul_fase(x0 + k * MODULE, ytop - band, MODULE, LABEL_H - band, fasen_in_vak)
        if achtergrond.lower() == "grijs":
            c.setFillColor(HexColor("#a8a8a8")); c.rect(x0 + k * MODULE, ytop - LABEL_H, MODULE, LABEL_H - band, stroke=0, fill=1)
        regels = [r.strip() for r in tekst_.split(" / ")]
        fase_regel = next((r for r in regels if re.fullmatch(r"L[123]", r)), None)
        rest = [r for r in regels if r != fase_regel]
        for j, r in enumerate(rest):
            if j < 2:
                teken_segs(cx, ytop - band - (3.8 + 3.4 * j) * mm, rich(r, B, 6.6))
            else:
                teken_segs(cx, ytop - band - (12.5 + 4.3 * (j - 2)) * mm, rich(r, B, 10))
        if fase_regel:
            teken_segs(cx, ytop - LABEL_H + 3.5 * mm, rich(fase_regel, R, 27))
        c.setStrokeColor(FG); c.setLineWidth(0.5)
        c.line(x0 + (k + 1) * MODULE, ytop - band, x0 + (k + 1) * MODULE, ytop - LABEL_H)
    c.setLineWidth(1.0); c.line(x0 + n * MODULE, ytop, x0 + n * MODULE, ytop - LABEL_H)
    return n


def stopreeks(fases):
    nums = [int(n.split("\n")[0]) for f in fases for n, _, k in groepen[f] if k != "res"]
    return f"{min(nums)}-{max(nums)}"


# ---- pagina 2: fase-labels en losse labels
lx = (LW - 12 * MODULE) / 2
ly = LH - 28 * mm
teken_label(lx, ly, f"Stoppen 1-12 ({' en '.join(['L2', 'L3'])})", label_secties(["L2", "L3"]))
ly -= LABEL_H + 22 * mm
n_hoofd = len(table_rows(sub("Hoofdschakelaar-vakjes")))
teken_label(lx, ly, f"{HOOFD_NAAM} en stoppen {stopreeks(['L1'])} (L1)", label_secties(["L1"]), voor=n_hoofd, na=LEGE_NA)
teken_hoofdschakelaar(lx, ly)
ly -= LABEL_H + 22 * mm
for naam, breedte_mm, tekst_ in table_rows(sub("Losse labels")):
    bw = float(breedte_mm.replace(",", ".")) * mm
    text(lx, ly + 3 * mm, f"{naam}  -  {bw / mm:.0f} x {LABEL_H / mm:.0f} mm", R, 7)
    c.setStrokeColor(HexColor("#999999")); c.setLineWidth(0.4)
    c.rect(lx, ly - LABEL_H, bw, LABEL_H, stroke=1, fill=0)
    celtekst(lx, bw, ly, ly - LABEL_H, [r.strip() for r in tekst_.split(" / ")])
    ly -= LABEL_H + 22 * mm
yl = 22 * mm
c.setStrokeColor(FG); c.setLineWidth(0.8)
c.line(lx, yl, lx + 100 * mm, yl)
c.line(lx, yl - 1.5 * mm, lx, yl + 1.5 * mm); c.line(lx + 100 * mm, yl - 1.5 * mm, lx + 100 * mm, yl + 1.5 * mm)
text(lx, yl - 6 * mm, "Controle: deze lijn moet precies 100 mm zijn. Print op 100 % (niet 'aanpassen aan pagina'), A4 liggend.", R, 8)
text(lx, LH - 14 * mm, "LABELS METERKAST - OP WARE GROOTTE", B, 11)
c.showPage()

# ---- pagina 3: overige labels (rijen van 12 modules)
rijen, volgorde_rijen = {}, []
for rij, modules, tekst_ in table_rows(sub("Overige labels")):
    if rij not in rijen:
        rijen[rij] = []
        volgorde_rijen.append(rij)
    rijen[rij].append((int(modules), [r.strip() for r in tekst_.split(" / ")] if tekst_ else []))
text(lx, LH - 10 * mm, "LABELS METERKAST - OP WARE GROOTTE (VERVOLG)", B, 11)
ly = LH - 22 * mm
for rij in volgorde_rijen:
    cellen = rijen[rij]
    totaal = sum(m for m, _ in cellen)
    if totaal != 12:
        sys.exit(f"rij '{rij}' heeft {totaal} modules, verwacht 12")
    text(lx, ly + 3 * mm, f"{rij}  -  12 modules = {12 * MODULE / mm:.0f} x {LABEL_H / mm:.0f} mm", R, 7)
    c.setStrokeColor(HexColor("#999999")); c.setLineWidth(0.4)
    c.rect(lx, ly - LABEL_H, 12 * MODULE, LABEL_H, stroke=1, fill=0)
    x = lx
    for k, (m, regels) in enumerate(cellen):
        w = m * MODULE
        if regels:
            celtekst(x, w, ly, ly - LABEL_H, regels)
        x += w
        if k < len(cellen) - 1:
            c.setStrokeColor(FG); c.setLineWidth(0.5)
            c.line(x, ly, x, ly - LABEL_H)
    ly -= LABEL_H + 9 * mm
yl = 12 * mm
c.setStrokeColor(FG); c.setLineWidth(0.8)
c.line(lx, yl, lx + 100 * mm, yl)
c.line(lx, yl - 1.5 * mm, lx, yl + 1.5 * mm); c.line(lx + 100 * mm, yl - 1.5 * mm, lx + 100 * mm, yl + 1.5 * mm)
text(lx + 104 * mm, yl - 1 * mm, "Controle: 100 mm. Print op 100 %, A4 liggend.", R, 8)
c.showPage()
c.save()
print(f"klaar: {OUT}, marge over {(y - MB - 14) / mm:.1f} mm")
