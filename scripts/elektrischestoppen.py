#!/usr/bin/python3
"""Maakt www/elektrischestoppen.pdf (1 x A4) uit .claude/rules/elektrischestoppen.md.

Gebruik:  /usr/bin/python3 /config/scripts/elektrischestoppen.py
Vereist het Alpine-pakket py3-reportlab (apk add py3-reportlab); dat verdwijnt bij
een herinstallatie van de add-on. Alleen het bronbestand wijzigen, niet het PDF.
"""
import datetime
import re
import sys

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

SRC = "/config/.claude/rules/elektrischestoppen.md"
OUT = "/config/www/elektrischestoppen.pdf"
TITLE = "GROEPENKAST DUITLAAN 20"
SUBTITLE = "Meterkast woning"
SPECS = [("3 x 25 A", "AANSLUITING"), ("B16", "ALLE GROEPEN"), ("3", "AARDLEKSCHAKELAARS")]
TAGS = {"Quooker": "pulsen ~2,1 kW", "Droger": "controle L3"}  # kleine toelichting onder een onderdeel
SZ = 9.0  # lettergrootte onderdelen (groter laat de pagina overlopen)

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

matrix = []
for wat, fasen, toel in table_rows(section("Meerfase-verbruikers")):
    belast = set(re.findall(r"L\d", re.sub(r"\(.*?\)", "", fasen)))
    aangesloten = set(re.findall(r"L\d", " ".join(re.findall(r"\((.*?)\)", fasen))))
    pat = "".join("1" if f in belast else "h" if f in aangesloten else "0" for f in ("L1", "L2", "L3"))
    matrix.append((wat, pat, toel))

feiten = [(t.upper(), d) for t, d in re.findall(r"^- \*\*(.+?)\*\*: (.+)$", section("Kernmetingen"), re.M)]

# ------------------------------------------------------------------ tekenen
W, H = A4
M = 12 * mm
CW = W - 2 * M
FG = HexColor("#1b1f24"); RULE = HexColor("#cfd3d8"); SOFT = HexColor("#eef0f2"); RED = HexColor("#d41c1c")
P = {1: (HexColor("#e0529c"), HexColor("#fbe3ef")),
     2: (HexColor("#9b4fbf"), HexColor("#f1e2f6")),
     3: (HexColor("#5db8ea"), HexColor("#e3f4fc"))}
R, B, MONO = "Helvetica", "Helvetica-Bold", "Courier-Bold"

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Groepenkast Duitlaan 20")
y = H - M


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
text(M + 55, y - 12, "Hoofdschakelaar", R, 9, white)
volgorde = [f for p in ("links", "midden", "rechts") for f in pos if pos[f] == p]
segs = []
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
text(M, y - 9, "ENKELFASE-GROEPEN PER AARDLEKSCHAKELAAR", B, 8.5)
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


def tag_of(items):
    return TAGS.get(items[0]) if len(items) == 1 else None


HEAD, POS = 30, 13
colh = max(HEAD + POS + sum(row_h(it, n, tag_of(it)) for n, it, k in rows) for *_, rows in cols)
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
        tag = tag_of(items)
        h = row_h(items, num, tag)
        if tag:
            c.setFillColor(soft); c.rect(x + 0.3, ry - h, colw - 0.6, h, stroke=0, fill=1)
        c.setStrokeColor(RULE); c.setLineWidth(0.4); c.line(x, ry - h, x + colw, ry - h)
        for k, part in enumerate(num.split("\n")):
            text(x + 6, ry - 11 - k * LEAD, part, MONO, 8.5, col)
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
text(M, y - 9, "MEERFASE-VERBRUIKERS MET EIGEN AANSLUITING", B, 8.5)
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
text(M, y - 9, "GEMETEN OP 24-10-2026", B, 8.5)
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
c.setStrokeColor(RULE); c.setLineWidth(0.6); c.line(M, M + 12, W - M, M + 12)
text(M, M + 3, "Volgorde in de meterkast: " + ", ".join(f"{f} {pos[f]}" for f in volgorde)
     + ". Kleuren: L1 roze, L2 paars, L3 lichtblauw.", R, 7)

if y <= M + 14:
    sys.exit(f"inhoud past niet op 1 A4 (y={y:.0f}); verklein SZ of kort het bronbestand in")
c.showPage()
c.save()
print(f"klaar: {OUT}, marge over {(y - M - 14) / mm:.1f} mm")
