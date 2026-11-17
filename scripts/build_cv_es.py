"""CV en español (una página) para /es: public/isai-rodriguez-cv-es.pdf.

Uso: python scripts/build_cv_es.py
Necesita reportlab. Busca Carlito o Calibri/Arial; si no hay ninguna, usa Liberation Sans.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "isai-rodriguez-cv-es.pdf"

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
c.setTitle("Isaí Rodríguez Ortega – Productor y realizador audiovisual – CV")
c.setAuthor("Isaí Rodríguez Ortega")
c.setSubject("Curriculum vitae en español")

# Encabezado
c.setFillColor(INK)
c.rect(0, H - HEADER_H, W, HEADER_H, stroke=0, fill=1)
c.setFillColor(WHITE)
c.setFont("Sans-Bold", 25)
c.drawString(MAIN_X, H - 44, "ISAÍ RODRÍGUEZ ORTEGA")
c.setFillColor(ORANGE)
c.setFont("Sans-Bold", 10)
c.drawString(MAIN_X, H - 62, "  ".join("PRODUCTOR Y REALIZADOR AUDIOVISUAL"))
c.setFillColor(colors.HexColor("#C4CDD2"))
c.setFont("Sans", 8.6)
c.drawString(MAIN_X, H - 79, "Rodaje  ·  Edición y color  ·  Motion graphics  ·  Coordinación de equipos")

c.setFont("Sans", 8.2)
contact = ["Guadalajara, Jal.  ·  +52 771 189 1450", "orror.isai@outlook.com", "linkedin.com/in/iro/",
           "Portafolio: portfolio-isai-capcut.vercel.app/es"]
cy = H - 30
for row in contact:
    c.drawRightString(SIDE_R, cy, row)
    cy -= 11.5
c.setFillColor(WHITE)
c.setFont("Sans-Bold", 8.2)
avail = "Disponible de inmediato · Presencial o híbrido en GDL"
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
y = section(c, "Perfil", MAIN_X, y)
y = para(c,
    "Productor y realizador audiovisual con más de 15 años en televisión, publicidad y contenido digital. "
    "Realizo de principio a fin: guion y planeación del rodaje, grabación con cámara, iluminación básica y "
    "audio directo, y postproducción con edición, corrección de color básica, mezcla de audio y motion graphics en "
    "After Effects. En TV Azteca formé parte del equipo de producción remota de seis noticieros estatales, "
    "revisé la calidad de más de 20 notas por turno y capacité a más de 20 editores.",
    MAIN_X, y, MAIN_R - MAIN_X) - 8

y = section(c, "Experiencia relevante", MAIN_X, y)
y = job(c, "Productor de noticias locales / Editor de video", "TV Azteca – CNP Jalisco  |  feb 2021 – ago 2026", y)
for parts in [
    [("Ascendí de editor de video a productor de noticias locales a los dos meses, durante la implementación del tercer Centro Nacional de Producción.", False)],
    [("Formé parte del equipo que coordinaba desde Guadalajara la producción remota (REMI) de ", False),
     ("seis noticieros estatales de 30 minutos", True), (" al aire de lunes a viernes.", False)],
    [("Configuré el Tricaster para REMI, edité notas y noticieros completos y cuidé que cada emisión saliera en orden y a tiempo.", False)],
    [("Revisé la calidad visual y técnica de más de 20 notas por turno; contribuí a una reducción aproximada del ", False),
     ("70 % en errores de edición.", True)],
    [("Capacité a ", False), ("más de 20 editores", True), (" con documentación operativa, referencias visuales y videotutoriales.", False)],
    [("Editor y realizador en una cobertura especial de 45 días por la costa maya de Quintana Roo: grabé, edité y seleccioné B-roll.", False)],
]:
    y = bullet(c, parts, y)
y -= 4

y = job(c, "Editor de video y productor audiovisual independiente", "Proyectos independientes  |  sep 2026 – actual", y)
for parts in [
    [("HUBWELL Logistics: ", True), ("produzco en locación y edito reels 9:16 de 60–90 s en CapCut Pro, con texto animado, overlays, efectos de IA y la identidad de la marca.", False)],
    [("Tlajtoli 2026", True), (" (CEDSPI, Gobierno de Hidalgo): dirección de transmisión de 90 min con dos cámaras, cápsula institucional y reel.", False)],
]:
    y = bullet(c, parts, y)
y -= 6

y = section(c, "Experiencia anterior", MAIN_X, y)
y = job(c, "Productor audiovisual y editor independiente", "Proyectos independientes  |  2012 – 2021", y)
y = bullet(c, "Guion, grabación y edición de videos corporativos y comerciales para IDIM Olben, Pro Mujer Hidalgo y Ciudad 88. Camarógrafo de investigación para Igualdad Animal.", y) - 3
y = job(c, "Productor de noticiero deportivo y editor", "Teleportal (antes Laya Comunica)  |  2006 – 2008", y)
y = bullet(c, "Produje un noticiero deportivo y edité programación general. Editor externo y productor comercial para TV Azteca Hidalgo.", y) - 3
y = job(c, "Planeación de materiales y demanda", "Bombardier Transportation  |  2009 – 2010", y)
y = bullet(c, "Video corporativo y fotografía para comunicación interna; trabajo en inglés con equipos en Canadá.", y)

c.setFillColor(MUTED)
c.setFont("Sans", 7)
c.drawString(MAIN_X, 20, "Isaí Rodríguez Ortega  ·  Productor y realizador audiovisual")

# ---------- Columna lateral ----------
sw = SIDE_R - SIDE_X
y = H - HEADER_H - 26
y = section(c, "Realización", SIDE_X, y)
for title, body in [
    ("Preproducción", "Guion y planeación del rodaje: equipo, tiempos y necesidades técnicas."),
    ("Rodaje", "Cámara (Sony FX30, DJI Osmo), iluminación básica y audio directo con micrófonos inalámbricos DJI."),
    ("Postproducción", "Edición y montaje narrativo, corrección de color básica en Lumetri (balance de blancos y exposición), mezcla de audio y exportación por plataforma, 16:9 y 9:16."),
    ("Motion graphics", "Texto animado, plecas, overlays, keyframes, máscaras y tracking en After Effects."),
    ("Coordinación", "Prioridades y fechas de entrega, revisión de calidad y capacitación."),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, body, SIDE_X, y - 10.5, sw, size=8.4, leading=11) - 5
y -= 3

y = section(c, "Herramientas", SIDE_X, y)
for title, items in [
    ("Adobe", ["Premiere Pro", "After Effects", "Photoshop", "Illustrator", "Audition"]),
    ("Edición", ["CapCut Pro", "Final Cut Pro"]),
    ("Producción", ["Sony FX30", "DJI Osmo", "Micrófonos DJI", "Tricaster (REMI)", "OBS"]),
    ("Inteligencia artificial", ["ChatGPT", "Claude", "Google Flow", "Higgsfield"]),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = chips(c, items, SIDE_X, y - 15, SIDE_R) - 1
y -= 4

y = section(c, "Educación", SIDE_X, y)
for title, school, years in [
    ("Lic. en Ciencias de la Comunicación", "Universidad Autónoma del Estado de Hidalgo", "2004 – 2009 · Titulado"),
    ("Ingeniería Industrial", "Instituto Tecnológico de Pachuca", "2015 – 2019 · Créditos concluidos"),
]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, school, SIDE_X, y - 10.5, sw, size=8.4, leading=11)
    y = para(c, years, SIDE_X, y, sw, size=8.4, leading=11, color=MUTED) - 6
y -= 2

y = section(c, "Idiomas", SIDE_X, y)
for title, level in [("Español", "Nativo"), ("Inglés", "B2–C1 · lectura técnica y conversación")]:
    c.setFillColor(INK)
    c.setFont("Sans-Bold", 8.6)
    c.drawString(SIDE_X, y, title)
    y = para(c, level, SIDE_X, y - 10.5, sw, size=8.4, leading=11) - 5

c.save()
print(f"CV creado: {OUTPUT}")
