"""Build the English, two-page portfolio CV as a print-ready PDF."""

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "isai-rodriguez-ortega-cv.pdf"
WEB_COPY = ROOT / "public" / "isai-rodriguez-cv.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))

W, H = A4
LEFT = 48
RIGHT = W - 48
WIDTH = RIGHT - LEFT
INK = colors.HexColor("#101820")
MUTED = colors.HexColor("#52606B")
ORANGE = colors.HexColor("#CF4C20")
RULE = colors.HexColor("#D9DEE2")
WHITE = colors.white


def line(c, x1, y, x2, color=RULE, width=0.7):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


def label(c, text, x, y, color=ORANGE):
    c.setFillColor(color)
    c.setFont("Arial-Bold", 8.3)
    c.drawString(x, y, text.upper())


def wrap(text, font, size, width):
    words = text.split()
    rows = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if current and pdfmetrics.stringWidth(trial, font, size) > width:
            rows.append(current)
            current = word
        else:
            current = trial
    if current:
        rows.append(current)
    return rows


def paragraph(c, text, x, y, width=WIDTH, size=9.4, leading=14, color=INK, font="Arial"):
    c.setFillColor(color)
    c.setFont(font, size)
    for row in wrap(text, font, size, width):
        c.drawString(x, y, row)
        y -= leading
    return y


def bullet(c, text, x, y, width=WIDTH, size=9.2):
    c.setFillColor(ORANGE)
    c.circle(x + 2, y + 3, 2, stroke=0, fill=1)
    return paragraph(c, text, x + 14, y, width - 14, size=size, leading=13) - 4


def section(c, title, y):
    label(c, title, LEFT, y)
    line(c, LEFT, y - 8, RIGHT)
    return y - 28


def footer(c, page):
    line(c, LEFT, 43, RIGHT)
    c.setFont("Arial", 8)
    c.setFillColor(MUTED)
    c.drawString(LEFT, 28, "ISAÍ RODRÍGUEZ ORTEGA  /  CURRICULUM VITAE")
    c.drawRightString(RIGHT, 28, f"{page} / 2")


c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
c.setTitle("Isaí Rodríguez Ortega | Senior Video Producer & Broadcast Operations")
c.setAuthor("Isaí Rodríguez Ortega")
c.setSubject("English professional curriculum vitae")

# Page 1: positioning and CNP experience.
c.setFillColor(INK)
c.rect(0, H - 190, W, 190, stroke=0, fill=1)
label(c, "Senior Video Producer  /  Broadcast Operations  /  Live Production", LEFT, H - 46,
      colors.HexColor("#FF8A5B"))
c.setFillColor(WHITE)
c.setFont("Arial-Bold", 29)
c.drawString(LEFT, H - 91, "ISAÍ RODRÍGUEZ")
c.drawString(LEFT, H - 124, "ORTEGA")
c.setFont("Arial", 9.4)
c.drawString(LEFT, H - 157, "Guadalajara, Jalisco, Mexico")
c.drawRightString(RIGHT, H - 157, "orror.isai@outlook.com")
c.setFillColor(colors.HexColor("#B9C4CA"))
c.setFont("Arial", 8.7)
c.drawRightString(RIGHT, H - 174, "linkedin.com/in/iro/")

y = H - 222
y = section(c, "Professional profile", y)
y = paragraph(c,
    "Audiovisual producer whose work spans broadcast news, live events, field production and digital content. "
    "Combines storytelling and hands-on production with REMI workflows, quality control, training and documentation "
    "in deadline-driven, multidisciplinary environments.", LEFT, y, size=9.7, leading=15) - 15

y = section(c, "Selected operation indicators", y)
metrics = [("6", "daily newscasts"), ("4h+", "daily content"), ("20+", "stories reviewed per shift"),
           ("7-10", "editors supervised")]
col_width = WIDTH / 4
for i, (value, caption) in enumerate(metrics):
    x = LEFT + i * col_width
    c.setFillColor(INK)
    c.setFont("Arial-Bold", 20)
    c.drawString(x, y, value)
    paragraph(c, caption, x, y - 18, col_width - 10, size=8.3, leading=11, color=MUTED)
y -= 64

y = section(c, "CNP / TV Azteca  |  Broadcast news operation", y)
c.setFillColor(INK)
c.setFont("Arial-Bold", 10.7)
c.drawString(LEFT, y, "Video Editor → Local News Producer")
c.setFont("Arial", 8.8)
c.setFillColor(MUTED)
c.drawRightString(RIGHT, y, "2021-2026  ·  Jalisco, Mexico")
y -= 20
y = paragraph(c,
    "Joined on February 16, 2021 during implementation of TV Azteca's third National Production Center. "
    "Promoted to Local News Producer approximately two months later; the team operation reached stable daily production "
    "after approximately five months.", LEFT, y, size=9.1, leading=13) - 7
for item in [
    "Contributed to REMI operation, editing workflows, continuity criteria, material delivery and quality review with production, editorial and technical teams.",
    "Participated in Tricaster configuration: virtual sets, transitions, bumpers, resource and story ingest, ISO recording preparation, and operator training.",
    "Supported process improvement, training and knowledge transfer; trained more than 20 editors and two Tricaster operators over the operation.",
    "Participated in review and quality processes associated with an approximately 70% reduction in editing errors.",
]:
    y = bullet(c, item, LEFT, y, size=8.9)

y -= 4
y = section(c, "Production systems", y)
y = paragraph(c,
    "Operational manuals · video tutorials · glossaries · continuity diagrams · visual aids · Premiere sequence references · "
    "story-review processes · ISO recording workflows", LEFT, y, size=8.9, leading=13)
footer(c, 1)
c.showPage()

# Page 2: project work, tools and education.
c.setFillColor(INK)
c.rect(0, H - 90, W, 90, stroke=0, fill=1)
label(c, "Selected work  /  Production craft", LEFT, H - 34, colors.HexColor("#FF8A5B"))
c.setFillColor(WHITE)
c.setFont("Arial-Bold", 18)
c.drawString(LEFT, H - 62, "FROM LIVE BROADCAST TO STORYTELLING")
y = H - 120

y = section(c, "Tlajtoli 2026  |  Live and event production", y)
c.setFont("Arial-Bold", 10)
c.setFillColor(INK)
c.drawString(LEFT, y, "Transmission Director & Audiovisual Producer")
y -= 17
y = paragraph(c, "CEDSPI · Hidalgo State Government", LEFT, y, size=8.6, color=MUTED) - 3
for item in [
    "Directed an approximately 90-minute official ceremony broadcast with a six-person production team and two cameras: one fixed and one mobile.",
    "Produced an institutional video capsule and a reel; captured and delivered audiovisual materials.",
]:
    y = bullet(c, item, LEFT, y)
y = paragraph(c, "Tools: Sony FX30, DJI Osmo Mobile 3, Blackmagic, OBS, Adobe Premiere Pro, Tugga MD44.",
              LEFT, y, size=8.6, color=MUTED) - 17

y = section(c, "Costa Maya  |  Field production", y)
for item in [
    "Participated in an approximately six-week audiovisual project with an eight-person team across roughly five municipalities in Quintana Roo.",
    "Captured images; edited informational and promotional content and three special news features; selected approximately two hours of B-roll.",
]:
    y = bullet(c, item, LEFT, y)
y -= 13

y = section(c, "HUBWELL Logistics  |  Digital editing", y)
y = paragraph(c,
    "Edited client-provided vertical footage in CapCut Pro, adding music and captions and adapting visuals to the client's color palette and typography. "
    "Publishing platforms have not been confirmed.", LEFT, y, size=9.2, leading=13) - 17

y = section(c, "Technical and creative toolkit", y)
y = paragraph(c,
    "Adobe Premiere Pro · After Effects · Photoshop · Illustrator · Audition · Final Cut Pro · Tricaster · NDI · OBS · CapCut Pro", LEFT, y,
    size=9.1, leading=14) - 18

y = section(c, "Education", y)
c.setFont("Arial-Bold", 9.5)
c.setFillColor(INK)
c.drawString(LEFT, y, "Bachelor's Degree in Communication Sciences")
c.setFont("Arial", 8.8)
c.setFillColor(MUTED)
c.drawRightString(RIGHT, y, "2004-2009")
y -= 16
y = paragraph(c, "Autonomous University of the State of Hidalgo · Degree awarded", LEFT, y, size=8.8, color=MUTED) - 9
c.setFont("Arial-Bold", 9.5)
c.setFillColor(INK)
c.drawString(LEFT, y, "Industrial Engineering")
c.setFont("Arial", 8.8)
c.setFillColor(MUTED)
c.drawRightString(RIGHT, y, "2015-2019")
y -= 16
y = paragraph(c, "Technological Institute of Pachuca · Coursework completed; degree pending", LEFT, y, size=8.8, color=MUTED)

footer(c, 2)
c.save()
copyfile(OUTPUT, WEB_COPY)
print(f"Created {OUTPUT}")
print(f"Web copy {WEB_COPY}")
