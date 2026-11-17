"""Animación de motion graphics para el hero del portafolio de Isaí (loop de 12 s).

Uso:
    python scripts/hero_motion.py --carpeta public/hero-motion   # renderiza 16:9 y 4:5 para el sitio
    python hero_motion.py --formato 16x9  # solo uno
    python hero_motion.py --frame 5.0     # exporta solo un PNG del segundo 5 (para revisar)

Requisitos: Python 3, Pillow, numpy y ffmpeg en el PATH.
Cambia textos, colores y tiempos en la sección CONFIGURACIÓN.
"""
import argparse
import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ---------------- CONFIGURACIÓN ----------------
NOMBRE = "ISAÍ RODRÍGUEZ ORTEGA"
EYEBROW = "MOTION GRAPHICS Y VIDEO"
LEMA = ""  # vacío = sin frase bajo el nombre
SUPER_2 = "PRODUCTOR Y REALIZADOR AUDIOVISUAL"
WIPE_TXT = "DEL RODAJE AL AIRE"

# (rol en una línea para 16:9, rol en varias líneas para 4:5, herramientas)
ROLES = [
    ("EDICIÓN REMOTA", ["EDICIÓN", "REMOTA"], ["PREMIERE PRO", "CAPCUT PRO", "AUDITION"]),
    ("PRODUCCIÓN EN CAMPO + IA", ["PRODUCCIÓN", "EN CAMPO + IA"], ["HIGGSFIELD", "GOOGLE FLOW", "SONY FX30"]),
    ("BROADCAST EN VIVO", ["BROADCAST", "EN VIVO"], ["TRICASTER", "REMI", "NDI · OBS"]),
    ("MOTION GRAPHICS", ["MOTION", "GRAPHICS"], ["AFTER EFFECTS", "ILLUSTRATOR", "PYTHON"]),
]

FORMATOS = {"16x9": (1920, 1080), "4x5": (1080, 1350)}
FPS, DUR = 30, 12.0

INK = (7, 9, 11)
NARANJA = (255, 77, 0)
PAPEL = (243, 241, 235)
GRIS = (150, 154, 160)

FONT_DIR = "/usr/share/fonts/opentype/inter/"
F_BLACK = [FONT_DIR + "InterDisplay-Black.otf", "C:/Windows/Fonts/ariblk.ttf", "C:/Windows/Fonts/arialbd.ttf"]
F_BOLD = [FONT_DIR + "InterDisplay-Bold.otf", "C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
F_REG = [FONT_DIR + "Inter-Medium.otf", "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]
F_MONO = ["/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Bold.ttf",
          "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", "C:/Windows/Fonts/consolab.ttf"]
# -----------------------------------------------

_cache = {}


def fuente(rutas, tam):
    tam = max(6, int(tam))
    key = (rutas[0], tam)
    if key not in _cache:
        for r in rutas:
            if Path(r).exists():
                _cache[key] = ImageFont.truetype(r, tam)
                break
        else:
            import glob
            extra = glob.glob("/usr/share/fonts/**/JetBrainsMono-Bold.ttf", recursive=True)
            _cache[key] = ImageFont.truetype(extra[0], tam) if extra else ImageFont.load_default()
    return _cache[key]


def ajustar(rutas, texto, ancho_max, tam_max):
    """Tamaño de fuente más grande que cabe en ancho_max."""
    tam = tam_max
    while tam > 10 and fuente(rutas, tam).getlength(texto) > ancho_max:
        tam -= 2
    return tam


# ---------- tiempo y easing ----------
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def prog(t, ini, dur):
    return clamp((t - ini) / dur)


def out_expo(x):
    return 1 if x >= 1 else 1 - 2 ** (-10 * x)


def in_out_cubic(x):
    return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2


def out_back(x, s=1.7):
    x -= 1
    return x * x * ((s + 1) * x + s) + 1


def rgba(c, a=1.0):
    return (*c, int(255 * clamp(a)))


# ---------- primitivas ----------
def texto_mascara(img, texto, fnt, x, y, t, ini, stagger, dur, color, salida=None, tracking=0):
    """Letras que suben a través de una máscara (entrada) y salen hacia arriba (salida)."""
    asc, desc = fnt.getmetrics()
    lh = asc + desc
    ancho = int(fnt.getlength(texto) + tracking * len(texto)) + 4
    capa = Image.new("RGBA", (ancho, lh + 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    cx = 0.0
    visible = False
    for i, ch in enumerate(texto):
        e = out_expo(prog(t, ini + i * stagger, dur))
        dy = (1 - e) * lh
        if salida is not None:
            s = in_out_cubic(prog(t, salida + i * stagger * 0.6, dur * 0.7))
            dy -= s * lh
        if e > 0 and dy > -lh:
            d.text((cx, dy + 2), ch, font=fnt, fill=rgba(color))
            visible = True
        cx += fnt.getlength(texto[: i + 1]) - fnt.getlength(texto[:i]) + tracking
    if visible:
        img.paste(capa, (int(x), int(y)), capa)
    return lh


def caja(d, x0, y0, x1, y1, color, a=1.0):
    if x1 - x0 >= 1 and y1 - y0 >= 1:
        d.rectangle([x0, y0, x1, y1], fill=rgba(color, a))


def fondo(W, H):
    """Fondo tinta con retícula broadcast y viñeta (igual que el sitio)."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    base = np.zeros((H, W, 3), np.float32) + np.array(INK, np.float32)
    paso = 72
    rejilla = ((xx % paso) < 1) | ((yy % paso) < 1)
    base[rejilla] += 255 * 0.045
    # brillo naranja muy tenue arriba a la derecha
    r = np.sqrt(((xx - W * 0.85) / W) ** 2 + ((yy - H * 0.1) / H) ** 2)
    base += np.array(NARANJA, np.float32)[None, None, :] * (0.07 * np.clip(1 - r * 1.6, 0, 1) ** 2)[..., None]
    # viñeta
    v = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    base *= (1 - 0.45 * np.clip(v - 0.55, 0, 1))[..., None]
    return Image.fromarray(np.clip(base, 0, 255).astype(np.uint8))  # RGB: así ImageDraw "RGBA" mezcla la transparencia


def mascara_wipe(W, H, borde_x, inclinacion):
    """Máscara 0..255 de lo que queda a la izquierda de un borde inclinado (antialias)."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dist = borde_x - (xx + inclinacion * (1 - yy / H))
    return np.clip(dist + 0.5, 0, 1)


# ---------- layout por formato ----------
def layout(W, H):
    vert = H > W
    L = {"vert": vert, "mx": int(W * (0.075 if not vert else 0.08))}
    mx = L["mx"]
    ancho_util = W - 2 * mx
    L["hud_top"] = int(H * (0.15 if not vert else 0.16))
    L["hud_bot"] = int(H * 0.93)
    if not vert:
        L["nombre_lineas"] = ["ISAÍ RODRÍGUEZ", "ORTEGA"]
        L["nombre_tam"] = ajustar(F_BLACK, "ISAÍ RODRÍGUEZ", ancho_util * 0.82, 210)
        L["nombre_y"] = int(H * 0.30)
        L["rol_y"] = int(H * 0.34)
        L["rol_tam"] = min(ajustar(F_BLACK, max((r[0] for r in ROLES), key=len), ancho_util, 150), 150)
        L["lt_y"] = int(H * 0.775)
        L["lt_w"] = int(W * 0.42)
        L["strip"] = (int(W * 0.56), int(H * 0.755), W - mx, int(H * 0.875))
    else:
        L["nombre_lineas"] = ["ISAÍ", "RODRÍGUEZ", "ORTEGA"]
        L["nombre_tam"] = ajustar(F_BLACK, "RODRÍGUEZ", ancho_util, 230)
        L["nombre_y"] = int(H * 0.27)
        L["rol_y"] = int(H * 0.30)
        L["rol_tam"] = min(ajustar(F_BLACK, "EN CAMPO + IA", ancho_util, 170), 170)
        L["lt_y"] = int(H * 0.71)
        L["lt_w"] = ancho_util
        L["strip"] = (mx, int(H * 0.815), W - mx, int(H * 0.905))
    return L


# ---------- elementos ----------
def hud(img, d, t, W, H, L):
    a = prog(t, 0.0, 0.7)
    if a <= 0:
        return
    e = out_expo(a)
    mx, top, bot = L["mx"], L["hud_top"], L["hud_bot"]
    lado = int(min(W, H) * 0.045 * e)
    g = max(2, W // 640)
    col = rgba(PAPEL, 0.55)
    for (x, y, sx, sy) in [(mx, top, 1, 1), (W - mx, top, -1, 1), (mx, bot, 1, -1), (W - mx, bot, -1, -1)]:
        d.rectangle([min(x, x + sx * lado), y - g // 2, max(x, x + sx * lado), y + g // 2], fill=col)
        d.rectangle([x - g // 2, min(y, y + sy * lado), x + g // 2, max(y, y + sy * lado)], fill=col)
    fm = fuente(F_MONO, max(14, W // 90 if not L["vert"] else W // 48))
    al = prog(t, 0.2, 0.4)
    fr = int(round(t * FPS))
    tc = f"{fr // (FPS * 3600):02d}:{fr // (FPS * 60) % 60:02d}:{fr // FPS % 60:02d}:{fr % FPS:02d}"
    y = top + lado + int(H * 0.018)
    blink = 1.0 if (t % 1.0) < 0.6 else 0.25
    r = fm.size * 0.32
    d.ellipse([mx + 4, y + fm.size * 0.35 - r, mx + 4 + 2 * r, y + fm.size * 0.35 + r], fill=rgba(NARANJA, al * blink))
    d.text((mx + 4 + 2 * r + fm.size * 0.6, y - 2), "REC", font=fm, fill=rgba(PAPEL, al * 0.8))
    tw = fm.getlength(tc)
    d.text((W - mx - 4 - tw, y - 2), tc, font=fm, fill=rgba(PAPEL, al * 0.8))


def bloque_nombre(img, d, t, W, H, L):
    """Nombre principal: entra 0.7-2.0 s, sale 3.4-3.9 s."""
    if t > 4.3:
        return
    mx = L["mx"]
    tam = L["nombre_tam"]
    f_big = fuente(F_BLACK, tam)
    f_mono = fuente(F_MONO, max(16, int(tam * (0.13 if not L["vert"] else 0.12))))
    y = L["nombre_y"]
    # eyebrow con efecto máquina de escribir y cursor
    n = int(len(EYEBROW) * prog(t, 0.55, 0.7))
    ae = 1 - prog(t, 3.35, 0.3)
    if n > 0 and ae > 0:
        txt = EYEBROW[:n]
        d.text((mx, y - f_mono.size * 2.1), txt, font=f_mono, fill=rgba(NARANJA, ae))
        if (t % 0.5) < 0.3 or n < len(EYEBROW):
            cx = mx + f_mono.getlength(txt) + 6
            d.rectangle([cx, y - f_mono.size * 2.1 + 3, cx + f_mono.size * 0.55, y - f_mono.size * 0.9], fill=rgba(NARANJA, ae))
    # líneas del nombre
    lineas = L["nombre_lineas"]
    yy = y
    for k, linea in enumerate(lineas):
        ultima = k == len(lineas) - 1
        f = fuente(F_BLACK, int(tam * (0.42 if ultima else 1.0)))
        trk = int(f.size * 0.22) if ultima else -int(f.size * 0.02)
        col = NARANJA if ultima else PAPEL
        lh = texto_mascara(img, linea, f, mx, yy, t, 0.75 + k * 0.12, 0.028, 0.75, col,
                           salida=3.35 + k * 0.05, tracking=trk)
        yy += int(lh * (0.86 if not ultima else 1.0))
    # barra naranja que crece bajo el nombre
    b = out_expo(prog(t, 1.25, 0.8)) * (1 - in_out_cubic(prog(t, 3.3, 0.45)))
    bw = (W - 2 * mx) * (0.5 if not L["vert"] else 0.75) * b
    caja(d, mx, yy + 14, mx + bw, yy + 14 + max(4, H // 220), NARANJA)
    # lema
    f_lema = fuente(F_REG, int(tam * (0.2 if not L["vert"] else 0.19)))
    al = prog(t, 1.5, 0.5) * (1 - prog(t, 3.3, 0.3))
    if al > 0 and LEMA:
        dy = (1 - out_expo(prog(t, 1.5, 0.6))) * 18
        d.text((mx, yy + 40 + dy), LEMA, font=f_lema, fill=rgba(PAPEL, al * 0.75))


def lower_third(img, d, t, W, H, L):
    """Super estilo broadcast con el nombre, desde 3.7 s hasta el wipe final."""
    p = prog(t, 3.7, 0.7)
    if p <= 0:
        return
    mx, y = L["mx"], L["lt_y"]
    f1 = fuente(F_BOLD, int(H * (0.032 if not L["vert"] else 0.03)))
    f2 = fuente(F_MONO, int(H * (0.0155 if not L["vert"] else 0.0135)))
    h1 = int(f1.size * 1.75)
    h2 = int(f2.size * 2.3)
    w1 = min(L["lt_w"], int(f1.getlength(NOMBRE) + f1.size * 1.6))
    w2 = int(f2.getlength(SUPER_2) + f2.size * 2.4)
    e = out_expo(p)
    # tab naranja de acento
    caja(d, mx, y, mx + int(f1.size * 0.28), y + h1 + h2, NARANJA, min(1, p * 4))
    x0 = mx + int(f1.size * 0.28)
    caja(d, x0, y, x0 + w1 * e, y + h1, PAPEL)
    e2 = out_expo(prog(t, 3.85, 0.7))
    caja(d, x0, y + h1, x0 + w2 * e2, y + h1 + h2, INK, 0.92)
    capa_y = y + (h1 - (f1.getmetrics()[0] + f1.getmetrics()[1])) // 2
    texto_mascara(img, NOMBRE, f1, x0 + f1.size * 0.8, capa_y, t, 4.05, 0.012, 0.5, INK)
    texto_mascara(img, SUPER_2, f2, x0 + f2.size * 1.2, y + h1 + (h2 - sum(f2.getmetrics())) // 2,
                  t, 4.2, 0.006, 0.45, PAPEL)


def chip(d, x, y, texto, fnt, escala, alfa):
    pad_x, pad_y = fnt.size * 0.9, fnt.size * 0.65
    w = fnt.getlength(texto) + 2 * pad_x
    h = fnt.size + 2 * pad_y
    if escala <= 0.02 or alfa <= 0:
        return w
    cx, cy = x + w / 2, y + h / 2
    ww, hh = w * escala, h * escala
    d.rectangle([cx - ww / 2, cy - hh / 2, cx + ww / 2, cy + hh / 2], outline=rgba(PAPEL, 0.55 * alfa), width=2)
    if escala > 0.75:
        d.text((x + pad_x, y + pad_y - fnt.size * 0.12), texto, font=fnt, fill=rgba(PAPEL, alfa * clamp((escala - 0.75) / 0.25)))
    return w


ROL_INI, ROL_SLOT = 4.0, 1.75


def roles(img, d, t, W, H, L):
    mx = L["mx"]
    tam = L["rol_tam"]
    f_rol = fuente(F_BLACK, tam)
    f_num = fuente(F_MONO, max(18, int(H * (0.022 if not L["vert"] else 0.019))))
    f_chip = fuente(F_MONO, max(14, int(H * (0.016 if not L["vert"] else 0.0145))))
    y0 = L["rol_y"]
    for i, (linea, lineas_v, tools) in enumerate(ROLES):
        ini = ROL_INI + i * ROL_SLOT
        if t < ini - 0.05 or t > ini + ROL_SLOT + 0.4:
            continue
        ultimo = i == len(ROLES) - 1
        sal = None if ultimo else ini + ROL_SLOT - 0.32
        # contador 0X / 04 + segmentos de progreso
        a_num = prog(t, ini, 0.25) * (1 if sal is None else 1 - prog(t, sal, 0.25))
        if a_num > 0:
            num = f"{i + 1:02d} / {len(ROLES):02d}"
            d.text((mx, y0 - f_num.size * 2.2), num, font=f_num, fill=rgba(NARANJA, a_num))
            sx = mx + f_num.getlength(num) + f_num.size * 1.2
            for k in range(len(ROLES)):
                seg = f_num.size * 1.6
                col = NARANJA if k <= i else PAPEL
                caja(d, sx + k * (seg + 6), y0 - f_num.size * 1.55, sx + k * (seg + 6) + seg,
                     y0 - f_num.size * 1.55 + 3, col, a_num * (1 if k <= i else 0.25))
        # texto del rol
        lineas = lineas_v if L["vert"] else [linea]
        yy = y0
        for k, ln in enumerate(lineas):
            lh = texto_mascara(img, ln, f_rol, mx - tam * 0.04, yy, t, ini + k * 0.07, 0.022, 0.6,
                               PAPEL if k == 0 else (NARANJA if L["vert"] else PAPEL), salida=sal, tracking=-int(tam * 0.02))
            yy += int(lh * 0.88)
        # subrayado
        b = out_expo(prog(t, ini + 0.15, 0.6)) * (1 if sal is None else 1 - in_out_cubic(prog(t, sal, 0.3)))
        caja(d, mx, yy + 10, mx + (W - 2 * mx) * 0.18 * b, yy + 10 + max(4, H // 220), NARANJA)
        # chips de herramientas
        cx = mx
        cy = yy + 10 + int(H * 0.045)
        for k, tool in enumerate(tools):
            pe = prog(t, ini + 0.3 + k * 0.08, 0.4)
            esc = out_back(pe) if pe > 0 else 0
            alfa = 1 if sal is None else 1 - prog(t, sal, 0.2)
            w = chip(d, cx, cy, tool, f_chip, esc, alfa)
            cx += w + f_chip.size * 0.8


def pista(img, d, t, W, H, L):
    """Mini timeline de edición con playhead y medidores de audio."""
    p = prog(t, 0.5, 0.8)
    if p <= 0:
        return
    x0, y0, x1, y1 = L["strip"]
    w, h = x1 - x0, y1 - y0
    f = fuente(F_MONO, max(11, int(h * 0.12)))
    pistas = ["V2", "V1", "A1"]
    lab_w = f.getlength("V2") + 14
    meter_w = int(w * 0.06)
    tx0, tx1 = x0 + lab_w, x1 - meter_w - 10
    th = h / 3
    # clips deterministas (inicio, fin) en fracción de la pista
    clips = {
        0: [(0.08, 0.26), (0.44, 0.58), (0.74, 0.96)],
        1: [(0.0, 0.18), (0.19, 0.41), (0.42, 0.63), (0.64, 0.82), (0.83, 1.0)],
        2: [(0.0, 0.39), (0.4, 0.71), (0.72, 1.0)],
    }
    colores = {0: NARANJA, 1: (82, 88, 98), 2: (40, 120, 110)}
    for k, nombre in enumerate(pistas):
        ya = y0 + k * th
        a = prog(t, 0.5 + k * 0.08, 0.4)
        d.text((x0, ya + th * 0.5 - f.size * 0.6), nombre, font=f, fill=rgba(GRIS, a))
        caja(d, tx0, ya + 2, tx1, ya + th - 2, (255, 255, 255), 0.04 * a)
        for j, (c0, c1) in enumerate(clips[k]):
            e = out_expo(prog(t, 0.6 + k * 0.08 + j * 0.05, 0.6))
            if e <= 0:
                continue
            cx0 = tx0 + c0 * (tx1 - tx0)
            cx1 = cx0 + (c1 - c0) * (tx1 - tx0) * e
            alpha = 0.9 if k != 1 else 0.85
            caja(d, cx0 + 1, ya + 4, cx1 - 1, ya + th - 4, colores[k], alpha * a)
            if k == 2 and e > 0.9:  # forma de onda
                n = int((cx1 - cx0) / 4)
                mid = ya + th / 2
                for s in range(1, n):
                    xx = cx0 + s * 4
                    amp = (th * 0.32) * abs(math.sin(xx * 0.09) * math.sin(xx * 0.023 + j))
                    d.line([(xx, mid - amp), (xx, mid + amp)], fill=rgba((170, 240, 225), 0.6 * a), width=1)
    # playhead
    ph = prog(t, 1.2, DUR - 1.2)
    px = tx0 + (tx1 - tx0) * ph
    if t > 1.2:
        d.rectangle([px - 1, y0 - 6, px + 1, y1], fill=rgba(NARANJA))
        d.polygon([(px - 7, y0 - 14), (px + 7, y0 - 14), (px, y0 - 4)], fill=rgba(NARANJA))
    # medidores de audio (sinusoides con ciclos enteros por loop: loop sin saltos)
    mx0 = x1 - meter_w
    for c in range(2):
        nivel = 0.55 + 0.25 * math.sin(2 * math.pi * (7 * t / DUR) + c) + 0.15 * math.sin(2 * math.pi * (23 * t / DUR) + 2 * c)
        nivel = clamp(nivel) * p
        bw = (meter_w - 6) / 2
        bx = mx0 + c * (bw + 6)
        segs = 14
        for s in range(segs):
            sy1 = y1 - s * (h / segs)
            sy0 = sy1 - h / segs + 2
            on = s / segs < nivel
            col = NARANJA if s >= segs * 0.8 else ((255, 190, 60) if s >= segs * 0.6 else (60, 200, 140))
            caja(d, bx, sy0, bx + bw, sy1, col if on else (255, 255, 255), 0.9 if on else 0.06)


WIPE_INI, WIPE_MITAD, WIPE_FIN = 10.85, 11.4, 11.98


def frame(t, W, H, L, bg):
    img = bg.copy()
    d = ImageDraw.Draw(img, "RGBA")  # "RGBA" = mezcla con transparencia
    contenido = t < WIPE_MITAD
    if contenido:
        hud(img, d, t, W, H, L)
        pista(img, d, t, W, H, L)
        bloque_nombre(img, d, t, W, H, L)
        lower_third(img, d, t, W, H, L)
        roles(img, d, t, W, H, L)
    # wipe naranja final (tapa todo y deja el fondo limpio = frame 0)
    if t >= WIPE_INI:
        incl = H * 0.22
        lead = in_out_cubic(prog(t, WIPE_INI, WIPE_MITAD - WIPE_INI)) * (W + incl + 2)
        trail = in_out_cubic(prog(t, WIPE_MITAD, WIPE_FIN - WIPE_MITAD)) * (W + incl + 2)
        m = mascara_wipe(W, H, lead, incl) - mascara_wipe(W, H, trail, incl)
        m = np.clip(m, 0, 1)
        if m.max() > 0:
            capa = Image.new("RGBA", (W, H), rgba(NARANJA))
            dc = ImageDraw.Draw(capa)
            fw = fuente(F_BLACK, ajustar(F_BLACK, WIPE_TXT, W * 0.8, int(H * 0.11)))
            tw = fw.getlength(WIPE_TXT)
            dx = (prog(t, WIPE_INI, WIPE_FIN - WIPE_INI) - 0.5) * W * 0.08
            dc.text(((W - tw) / 2 - dx, H / 2 - fw.size * 0.62), WIPE_TXT, font=fw, fill=rgba(INK))
            capa.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
            img.paste(capa, (0, 0), capa)
    return img.convert("RGB")


def renderizar(fmt, carpeta):
    W, H = FORMATOS[fmt]
    L = layout(W, H)
    bg = fondo(W, H)
    total = int(FPS * DUR)
    master = carpeta / f"_master-{fmt}.mp4"
    cmd = ["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "8", "-preset", "fast", "-pix_fmt", "yuv444p", str(master)]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for f in range(total):
        p.stdin.write(frame(f / FPS, W, H, L, bg).tobytes())
        if f % 60 == 0:
            print(f"  {fmt}: frame {f}/{total}", file=sys.stderr)
    p.stdin.close()
    if p.wait() != 0:
        sys.exit("ffmpeg falló")
    base = carpeta / f"hero-{fmt}"
    # versiones web: ligeras, sin audio, faststart
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(master), "-an", "-c:v", "libx264", "-crf", "23",
                    "-preset", "veryslow", "-tune", "animation", "-profile:v", "high", "-pix_fmt", "yuv420p",
                    "-movflags", "+faststart", f"{base}.mp4"], check=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(master), "-an", "-c:v", "libvpx-vp9", "-crf", "33",
                    "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", f"{base}.webm"], check=True)
    # póster (frame con nombre + rol) para carga inicial y prefers-reduced-motion
    frame(5.2, W, H, L, bg).save(f"{base}-poster.jpg", quality=86, optimize=True, progressive=True)
    master.unlink()
    print("Listo:", base)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--formato", choices=list(FORMATOS), nargs="*", default=list(FORMATOS))
    ap.add_argument("--carpeta", default=str(Path(__file__).parent))
    ap.add_argument("--frame", type=float, nargs="*")
    args = ap.parse_args()
    out = Path(args.carpeta)
    out.mkdir(parents=True, exist_ok=True)
    if args.frame:
        for fmt in args.formato:
            W, H = FORMATOS[fmt]
            L, bg = layout(W, H), fondo(W, H)
            for s in args.frame:
                frame(s, W, H, L, bg).save(out / f"check-{fmt}-{s:05.2f}.png")
        return
    for fmt in args.formato:
        renderizar(fmt, out)


if __name__ == "__main__":
    main()
