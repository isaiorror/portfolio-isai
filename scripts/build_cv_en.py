"""CV en inglés (una página) para /en: public/isai-rodriguez-cv-en.pdf. Mismo diseño que build_cv_es.py.

Uso: python scripts/build_cv_en.py
Necesita reportlab. Busca Carlito o Calibri/Arial; si no hay ninguna, usa Liberation Sans.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "isai-rodriguez-cv-en.pdf"

FONT_CANDIDATES = [
    ("/usr/share/fonts/truetype/crosextra/Carlito-Regular.ttf", "/usr/share/fonts/truetype/crosextra/Carlito-Bold.ttf"),
    (r"C:\Windows\Fonts\calibri.ttf", r"C:\Windows\Fonts\calibrib.ttf"),
    (r"C:\Windows\Fonts\arial.ttf", r"C:\Windows\Fonts\arialbd.ttf"),
    ("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
     "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"),
]
for regular, bold in FONT_CANDIDATES:
    if Path(regular).exists() and Path(bold).exists():
        pdfmetrics.registerFont(TTFont("Sans", regular))
        pdfmetrics.registerFont(TTFont("Sans-Bold", bold))
        break
else:
    raise SystemExit("No se encontró una fuente TTF compatible.")

W, H = A4
INK = colors.HexColor("#101820")
TEXT = colors.HexColor("#2A3238")
MUTED = colors.HexColor("#5E6A72")
ORANGE = colors.HexColor("#E8551E")
SIDE_BG = colors.HexColor("#F3F2EF")
CHIP = colors.HexColor("#FFFFFF")
CHIP_LINE = colors.HexColor("#D5D9DC")
WHITE = colors.white

HEADER_H = 112
MAIN_X, MAIN_R = 32, 362
SIDE_X, SIDE_R = 380, W - 24


def wrap(text, font, size, width):
    rows, cur = [], ""
    for word in text.split():
        trial = f"{cur} {word}".strip()
        if cur and pdfmetrics.stringWidth(trial, font, size) > width:
            rows.append(cur)
            cur = word
        else:
            cur = trial
    if cur:
        rows.append(cur)
    return rows


def rich_rows(parts, size, width):
    """parts: list of (text, bold). Returns rows of [(word, font)]."""
    words = []
    for text, bold in parts:
        for w in text.split():
            words.append((w, "Sans-Bold" if bold else "Sans"))
    rows, cur, cur_w = [], [], 0.0
    space = pdfmetrics.stringWidth(" ", "Sans", size)
    for w, f in words:
        ww = pdfmetrics.stringWidth(w, f, size)
        add = ww if not cur else space + ww
        if cur and cur_w + add > width:
            rows.append(cur)
            cur, cur_w = [(w, f)], ww
        else:
            cur.append((w, f))
            cur_w += add
    if cur:
        rows.append(cur)
    return rows


def draw_rich(c, parts, x, y, width, size=9.1, leading=12.6, color=TEXT):
    c.setFillColor(color)
    space = pdfmetrics.stringWidth(" ", "Sans", size)
    for row in rich_rows(parts, size, width):
        cx = x
        for w, f in row:
            c.setFont(f, size)
            c.drawString(cx, y, w)
            cx += pdfmetrics.stringWidth(w, f, size) + space
        y -= leading
    return y


def para(c, text, x, y, width, size=9.1, leading=12.6, color=TEXT, font="Sans"):
    c.setFillColor(color)
    c.setFont(font, size)
    for row in wrap(text, font, size, width):
        c.drawString(x, y, row)
        y -= leading
    return y


def bullet(c, parts, y, x=MAIN_X, right=MAIN_R, size=9):
    if isinstance(parts, str):
        parts = [(parts, False)]
    c.setFillColor(ORANGE)
    c.circle(x + 4, y + 2.6, 1.5, stroke=0, fill=1)
    return draw_rich(c, parts, x + 11, y, right - x - 11, size=size, leading=12.2) - 2.5


def section(c, title, x, y):
    c.setFillColor(ORANGE)
    c.rect(x, y - 1, 9, 6, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 9)
    c.drawString(x + 14, y - 0.5, title.upper())
    return y - 15


def job(c, title, meta, y):
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 10.5)
    c.drawString(MAIN_X, y, title)
    c.setFillColor(MUTED)
    c.setFont("Sans", 7.8)
    c.drawString(MAIN_X, y - 10.5, meta)
    return y - 25


def chips(c, items, x, y, right):
    size, pad, h, gap = 7.6, 5, 13, 4
    cx = x
    for item in items:
        w = pdfmetrics.stringWidth(item, "Sans", size) + pad * 2
        if cx + w > right:
            cx = x
            y -= h + gap
        c.setFillColor(CHIP)
        c.setStrokeColor(CHIP_LINE)
        c.setLineWidth(0.5)
        c.roundRect(cx, y - 3.5, w, h, 2, stroke=1, fill=1)
        c.setFillColor(TEXT)
        c.setFont("Sans", size)
        c.drawString(cx + pad, y, item)
        cx += w + gap
    return y - h - 6


c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
c.setTitle("Isaí Rodríguez Ortega – Audiovisual Producer & Director – CV")
c.setAuthor("Isaí Rodríguez Ortega")
c.setSubject("Curriculum vitae (English)")

# Encabezado
c.setFillColor(INK)
c.rect(0, H - HEADER_H, W, HEADER_H, stroke=0, fill=1)
c.setFillColor(WHITE)
c.setFont("Sans-Bold", 25)
c.drawString(MAIN_X, H - 44, "ISAÍ RODRÍGUEZ ORTEGA")
c.setFillColor(ORANGE)
c.setFont("Sans-Bold", 10)
c.drawString(MAIN_X, H - 62, "  ".join("AUDIOVISUAL PRODUCER & DIRECTOR"))
c.setFillColor(colors.HexColor("#C4CDD2"))
c.setFont("Sans", 8.6)
c.drawString(MAIN_X, H - 79, "Filming  ·  Editing & color  ·  Motion graphics  ·  Team coordination")

c.setFont("Sans", 8.2)
contact = ["Guadalajara, Mexico  ·  +52 771 189 1450", "orror.isai@outlook.com", "linkedin.com/in/iro/",
           "Portfolio: portfolio-isai-capcut.vercel.app/en"]
cy = H - 30
for row in contact:
    c.drawRightString(SIDE_R, cy, row)
    cy -= 11.5
c.setFillColor(WHITE)
c.setFont("Sans-Bold", 8.2)
avail = "Available immediately · On-site or hybrid in Guadalajara"
c.drawRightString(SIDE_R, cy, avail)
c.setFillColor(ORANGE)
c.circle(SIDE_R - pdfmetrics.stringWidth(avail, "Sans-Bold", 8.2) - 7, cy + 2.8, 2.6, stroke=0, fill=1)

# Barra de acento
c.setFillColor(ORANGE)
c.rect(MAIN_X, H - HEADER_H - 7, 170, 3, stroke=0, fill=1)
c.setFillColor(colors.HexColor("#2A3238"))
for i in range(4):
    c.rect(MAIN_X + 176 + i * 42, H - HEADER_H - 7, 38, 3, stroke=0, fill=1)

# Columna lateral
c.setFillColor(SIDE_BG)
c.rect(SIDE_X - 10, 0, W - SIDE_X + 10, H - HEADER_H, stroke=0, fill=1)

# ---------- Columna principal ----------
y = H - HEADER_H - 26
y = section(c, "Profile", MAIN_X, y)
y = para(c,
    "Audiovisual producer and director with 15+ years in television, advertising and digital content. "
    "I handle projects end to end: scripting and shoot planning, camera, basic lighting and location sound, "
    "and post-production with editing, basic color correction, audio mixing and motion graphics in After Effects. "
    "At TV Azteca I was part of the remote production team for six state newscasts, reviewed the quality of "
    "20+ stories per shift and trained 20+ editors.",
    MAIN_X, y, MAIN_R - MAIN_X) - 8

y = section(c, "Relevant experience", MAIN_X, y)
y = job(c, "Local News Producer / Video Editor", "TV Azteca – CNP Jalisco  |  Feb 2021 – Aug 2026", y)
for parts in [
    [("Promoted from video editor to local news producer within two months, during the rollout of the third National Production Center.", False)],
    [("Part of the Guadalajara team coordinating remote (REMI) production of ", False),
     ("six 30-minute state newscasts", True), (" airing Monday to Friday.", False)],
    [("Configured Tricaster for REMI, edited stories and full newscasts, and made sure every show aired in order and on time.", False)],
    [("Reviewed the visual and technical quality of 20+ stories per shift; contributed to an approximate ", False),
     ("70% reduction in editing errors.", True)],
    [("Trained ", False), ("20+ editors", True), (" with operating documentation, visual references and video tutorials.", False)],
    [("Editor and director on a 45-day special assignment along the Costa Maya of Quintana Roo: filmed, edited and selected B-roll.", False)],
]:
    y = bullet(c, parts, y)
y -= 4

y = job(c, "Freelance Video Editor & Audiovisual Producer", "Independent projects  |  Sep 2026 – present", y)
for parts in [
    [("HUBWELL Logistics: ", True), ("I produce on location and edit 60–90 s 9:16 Reels in CapCut Pro, with animated text, overlays, AI effects and the brand identity.", False)],
    [("Tlajtoli 2026", True), (" (CEDSPI, Hidalgo State Government): directed a 90-minute two-camera broadcast, plus an institutional capsule and a reel.", False)],
]:
    y = bullet(c, parts, y)
y -= 6

y = section(c, "Earlier experience", MAIN_X, y)
y = job(c, "Freelance Audiovisual Producer & Editor", "Independent projects  |  2012 – 2021", y)
y = bullet(c, "Scripted, filmed and edited corporate and commercial videos for IDIM Olben, Pro Mujer Hidalgo and Ciudad 88. Investigative camera operator for Igualdad Animal.", y) - 3
y = job(c, "Sports News Producer & Editor", "Teleportal (formerly Laya Comunica)  |  2006 – 2008", y)
y = bullet(c, "Produced a sports newscast and edited general programming. Freelance editor and commercial producer for TV Azteca Hidalgo.", y) - 3
y = job(c, "Materials & Demand Planning", "Bombardier Transportation  |  2009 – 2010", y)
y = bullet(c, "Main role: materials and demand planning, working in English with teams in Canada.", y)
y = bullet(c, "Side project outside working hours: produced corporate video and photography for internal communications.", y)

c.setFillColor(MUTED)
c.setFont("Sans", 7)
c.drawString(MAIN_X, 20, "Isaí Rodríguez Ortega  ·  Audiovisual Producer & Director")

# ---------- Columna lateral ----------
sw = SIDE_R - SIDE_X
y = H - HEADER_H - 26
y = section(c, "Production", SIDE_X, y)
for title, body in [
    ("Pre-production", "Scripting and shoot planning: crew, schedule and technical needs."),
    ("Filming", "Camera (Sony FX30, DJI Osmo), basic lighting and location sound with DJI wireless mics."),
    ("Post-production", "Narrative editing, basic color correction in Lumetri (white balance and exposure), audio mixing and exports per platform, 16:9 and 9:16."),
    ("Motion graphics", "Animated text, lower thirds, overlays, keyframes, masks and tracking in After Effects."),
    ("Coordination", "Priorities and deadlines, quality review and training."),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, body, SIDE_X, y - 10.5, sw, size=8.4, leading=11) - 5
y -= 3

y = section(c, "Tools", SIDE_X, y)
for title, items in [
    ("Adobe", ["Premiere Pro", "After Effects", "Photoshop", "Illustrator", "Audition"]),
    ("Editing", ["CapCut Pro", "Final Cut Pro"]),
    ("Production", ["Sony FX30", "DJI Osmo", "DJI wireless mics", "Tricaster (REMI)", "OBS"]),
    ("Artificial intelligence", ["ChatGPT", "Claude", "Google Flow", "Higgsfield"]),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = chips(c, items, SIDE_X, y - 15, SIDE_R) - 1
y -= 4

y = section(c, "Education", SIDE_X, y)
for title, school, years in [
    ("B.A. in Communication Sciences", "Autonomous University of the State of Hidalgo", "2004 – 2009 · Degree awarded"),
    ("Industrial Engineering", "Technological Institute of Pachuca", "2015 – 2019 · Coursework completed"),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, school, SIDE_X, y - 10.5, sw, size=8.4, leading=11)
    y = para(c, years, SIDE_X, y, sw, size=8.4, leading=11, color=MUTED) - 6
y -= 2

y = section(c, "Languages", SIDE_X, y)
for title, level in [("Spanish", "Native"), ("English", "B2–C1 · technical reading and conversation")]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, level, SIDE_X, y - 10.5, sw, size=8.4, leading=11) - 5

c.save()
print(f"CV created: {OUTPUT}")
