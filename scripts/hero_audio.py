"""Música y efectos de sonido para el loop del hero (12 s), sintetizados con numpy.

Uso:
    python scripts/hero_audio.py --carpeta public/hero-motion

Genera hero-audio.wav y lo mete en hero-16x9/4x5 .mp4 (AAC) y .webm (Opus) sin volver
a codificar el video. Los efectos caen en los mismos tiempos que la animación de
hero_motion.py, y el final se empata con el inicio para que el loop no tenga salto.
Requisitos: Python 3, numpy y ffmpeg en el PATH.
"""
import argparse
import shutil
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48000
DUR = 12.0
BPM = 120  # 24 tiempos exactos en 12 s: el compás cierra con el loop
BEAT = 60 / BPM

# Tiempos de la animación (ver hero_motion.py)
T_TECLEO = (0.55, 0.7, 23)          # inicio, duración, caracteres del eyebrow
T_NOMBRE_IN, T_NOMBRE_OUT = 1.25, 3.3
T_SUPER = 3.7
T_ROLES = [4.0 + i * 1.75 for i in range(4)]
T_WIPE_INI, T_WIPE_MITAD = 10.85, 11.4

rng = np.random.default_rng(7)


def t_arr(dur):
    return np.arange(int(dur * SR)) / SR


def env(n, a=0.002, r=0.1, curva=4.0):
    """Ataque lineal y caída exponencial."""
    t = np.arange(n) / SR
    e = np.exp(-t / r * (curva / 4))
    na = max(1, int(a * SR))
    e[:na] *= np.linspace(0, 1, na)
    return e


def lowpass(x, fc):
    """Filtro de un polo (suficiente para suavizar)."""
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def highpass(x, fc):
    return x - lowpass(x, fc)


def ruido(n):
    return rng.uniform(-1, 1, n)


# ---------- instrumentos ----------
def kick():
    t = t_arr(0.45)
    f = 45 + 110 * np.exp(-t * 28)
    fase = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(fase) * env(len(t), 0.001, 0.16)
    click = ruido(len(t)) * env(len(t), 0.0005, 0.004)
    return np.tanh(1.6 * x + 0.3 * click)


def clap():
    n = int(0.3 * SR)
    x = highpass(ruido(n), 900)
    e = np.zeros(n)
    for d in (0, 0.009, 0.018):
        i = int(d * SR)
        e[i:] += env(n - i, 0.0005, 0.03 if d < 0.018 else 0.09)
    return x * e * 0.6


def hat(abierto=False):
    n = int((0.12 if abierto else 0.04) * SR)
    x = highpass(ruido(n), 7000)
    return x * env(n, 0.0005, 0.035 if abierto else 0.01) * (0.16 if abierto else 0.2)


def saw(f, t):
    return 2 * ((f * t) % 1) - 1


def bajo(f, dur):
    t = t_arr(dur)
    x = 0.6 * saw(f, t) + 0.4 * np.sin(2 * np.pi * f * t)
    x = lowpass(x, 420)
    return np.tanh(2.2 * x) * env(len(t), 0.004, dur * 0.5)


def pluck(f, dur):
    t = t_arr(dur)
    x = saw(f, t) + 0.5 * saw(f * 1.005, t)
    x = lowpass(x, 2600)
    return x * env(len(t), 0.002, 0.09) * 0.22


def pad(fs, dur):
    t = t_arr(dur)
    x = sum(saw(f, t) + saw(f * 1.004, t) for f in fs) / (2 * len(fs))
    x = lowpass(x, 1100)
    n = len(t)
    e = np.minimum(1, np.minimum(t / 0.25, (dur - t) / 0.3))
    return x * np.clip(e, 0, 1) * 0.16 * np.ones(n)


# ---------- efectos ----------
def whoosh(dur=0.45, sube=True, nivel=0.5):
    n = int(dur * SR)
    x = ruido(n)
    t = np.linspace(0, 1, n)
    # barrido de filtro hecho por bloques
    y = np.zeros(n)
    bloques = 24
    for b in range(bloques):
        s, e = b * n // bloques, (b + 1) * n // bloques
        p = (b + 0.5) / bloques
        fc = 300 + 5200 * (p if sube else 1 - p)
        y[s:e] = highpass(lowpass(x[s:e], fc), fc * 0.25)
    forma = np.sin(np.pi * t) ** 1.5
    return y * forma * nivel


def impacto(nivel=0.9):
    t = t_arr(0.9)
    f = 38 + 70 * np.exp(-t * 14)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.001, 0.35)
    capa = lowpass(ruido(len(t)), 2500) * env(len(t), 0.001, 0.08)
    return np.tanh(1.8 * x + 0.5 * capa) * nivel


def tecla():
    n = int(0.03 * SR)
    t = t_arr(0.03)
    x = np.sin(2 * np.pi * 2400 * t) + 0.5 * highpass(ruido(n), 3000)
    return x * env(n, 0.0003, 0.004) * 0.18


def riser(dur):
    t = t_arr(dur)
    p = t / dur
    f = 200 + 1600 * p ** 2
    tono = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.15
    rd = highpass(ruido(len(t)), 1500) * 0.25
    return (tono + rd) * p ** 2


def blip(f=1320, dur=0.08, nivel=0.2):
    t = t_arr(dur)
    return np.sin(2 * np.pi * f * t) * env(len(t), 0.001, 0.02) * nivel


# ---------- mezcla ----------
def poner(pista, sonido, t, pan=0.0, gan=1.0):
    """Suma un sonido mono a la pista estéreo; lo que pasa de 12 s regresa al inicio."""
    i = int(round(t * SR)) % pista.shape[0]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    for k, ch in ((0, l), (1, r)):
        s = sonido * gan * ch * np.sqrt(2)
        fin = i + len(s)
        if fin <= pista.shape[0]:
            pista[i:fin, k] += s
        else:
            corte = pista.shape[0] - i
            pista[i:, k] += s[:corte]
            pista[:fin - pista.shape[0], k] += s[corte:]


def componer():
    n = int(DUR * SR)
    musica = np.zeros((n, 2))
    sfx = np.zeros((n, 2))
    K, C, H, HO = kick(), clap(), hat(), hat(True)

    # Progresión en La menor, 6 compases: Am Am F C G G
    raiz = {"Am": 55.0, "F": 43.65, "C": 65.41, "G": 49.0}
    acordes = {"Am": [220, 261.6, 329.6], "F": [174.6, 220, 261.6],
               "C": [196, 261.6, 329.6], "G": [196, 246.9, 293.7]}
    arpe = {"Am": [440, 523.3, 659.3, 880], "F": [349.2, 440, 523.3, 698.5],
            "C": [392, 523.3, 659.3, 784], "G": [392, 493.9, 587.3, 784]}
    prog_ = ["Am", "Am", "F", "C", "G", "G"]

    sin_bombo = (T_WIPE_INI, T_WIPE_MITAD)  # hueco para el wipe
    for compas, ac in enumerate(prog_):
        t0 = compas * 4 * BEAT
        musica_pad = pad(acordes[ac], 4 * BEAT)
        poner(musica, musica_pad, t0, 0, 1)
        for b in range(4):
            tb = t0 + b * BEAT
            hueco = sin_bombo[0] - 0.05 <= tb < sin_bombo[1]
            if not hueco:
                poner(musica, K, tb, 0, 0.9)
            if b in (1, 3) and not hueco:
                poner(musica, C, tb, 0.1, 0.8)
            # bajo en corcheas con salto de octava
            for c in range(2):
                tc = tb + c * BEAT / 2
                if not hueco:
                    poner(musica, bajo(raiz[ac] * (2 if c else 1), BEAT / 2 * 0.95), tc, 0, 0.55)
            # hats en semicorcheas, abierto a contratiempo
            for s in range(4):
                ts = tb + s * BEAT / 4
                if s == 2:
                    poner(musica, HO, ts, 0.3, 0.8)
                else:
                    poner(musica, H, ts, -0.3 if s % 2 else 0.25, 0.6 + 0.3 * (s == 0))
            # arpegio en semicorcheas
            for s in range(4):
                nota = arpe[ac][(b * 4 + s) % 4] * (2 if compas >= 4 and s == 3 else 1)
                poner(musica, pluck(nota, 0.16), tb + s * BEAT / 4, 0.4 if s % 2 else -0.4, 0.8)

    # ---- efectos sincronizados ----
    ini, dur, chars = T_TECLEO
    for c in range(chars):
        poner(sfx, tecla(), ini + dur * c / chars, rng.uniform(-0.4, 0.4), 1)
    poner(sfx, blip(1760), 0.12, -0.5, 1)                     # REC
    poner(sfx, whoosh(0.5, True, 0.45), T_NOMBRE_IN - 0.35, -0.2)
    poner(sfx, impacto(0.5), T_NOMBRE_IN + 0.12, 0)
    poner(sfx, whoosh(0.4, False, 0.35), T_NOMBRE_OUT - 0.1, 0.3)
    poner(sfx, whoosh(0.35, True, 0.35), T_SUPER - 0.2, -0.4)
    poner(sfx, blip(990, 0.06, 0.15), T_SUPER + 0.35, -0.4)
    for i, tr in enumerate(T_ROLES):
        poner(sfx, whoosh(0.4, True, 0.42), tr - 0.28, 0.5 if i % 2 else -0.5)
        poner(sfx, impacto(0.38), tr + 0.05, 0)
        poner(sfx, blip(1320 + 220 * i, 0.07, 0.12), tr + 0.3, 0.2)
    poner(sfx, riser(T_WIPE_INI - 9.9), 9.9, 0, 0.8)
    poner(sfx, whoosh(0.7, True, 0.6), T_WIPE_INI - 0.1, 0)
    poner(sfx, impacto(0.95), T_WIPE_MITAD, 0)
    poner(sfx, whoosh(0.5, False, 0.4), T_WIPE_MITAD + 0.1, 0)

    mezcla = musica * 0.55 + sfx * 0.9
    mezcla = np.tanh(mezcla * 1.3) / np.tanh(1.3)
    mezcla *= 0.89 / np.max(np.abs(mezcla))
    mezcla *= 0.6  # ~ -16 LUFS, volumen cómodo para web
    return mezcla


def guardar_wav(ruta, x):
    datos = (np.clip(x, -1, 1) * 32767).astype("<i2")
    with wave.open(str(ruta), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(datos.tobytes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--carpeta", default="public/hero-motion")
    ap.add_argument("--prefijo", default="hero", help='"hero-en" para la versión en inglés')
    args = ap.parse_args()
    if not shutil.which("ffmpeg"):
        sys.exit("Falta ffmpeg en el PATH")
    carpeta = Path(args.carpeta)
    wav = carpeta / "hero-audio.wav"
    guardar_wav(wav, componer())
    for fmt in ("16x9", "4x5"):
        for ext, codec in (("mp4", ["-c:a", "aac", "-b:a", "128k"]), ("webm", ["-c:a", "libopus", "-b:a", "96k"])):
            vid = carpeta / f"{args.prefijo}-{fmt}.{ext}"
            tmp = carpeta / f"tmp-{fmt}.{ext}"
            cmd = ["ffmpeg", "-y", "-v", "error", "-i", str(vid), "-i", str(wav), "-map", "0:v:0", "-map", "1:a:0",
                   "-c:v", "copy", *codec, "-t", str(DUR), "-shortest"]
            if ext == "mp4":
                cmd += ["-movflags", "+faststart"]
            subprocess.run(cmd + [str(tmp)], check=True)
            tmp.replace(vid)
            print(f"Audio agregado: {vid}")
    wav.unlink()


if __name__ == "__main__":
    main()
