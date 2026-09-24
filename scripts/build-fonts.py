#!/usr/bin/env python3
"""
Download the site's three typefaces from Google Fonts as single, trimmed
woff2 files into app/fonts/, which app/layout.js loads through next/font/local.

Why self-host trimmed files instead of next/font/google:
  * only the weights the design system uses (DESIGN.md → Typography);
  * only the characters the copy uses — Basic Latin, Latin-1, the punctuation
    below and ₹ — in ONE file per family, instead of a "latin" file plus a
    "latin-ext" file that every page pulled in just for the rupee sign.

Google's `text=` subsetting keeps every axis, so the files are then cut
down locally with fontTools (pip install fonttools brotli): variable axes are
limited to the ranges below and hinting is dropped.

Re-run this after adding copy with a character outside CHARSET (a new
currency sign, a new symbol): `python3 scripts/build-fonts.py`.
The fonts are licensed under the SIL Open Font License 1.1.
"""
import re, urllib.parse, urllib.request, pathlib

CHARSET = (
    ''.join(chr(c) for c in range(0x20, 0x7F))        # Basic Latin
    + ''.join(chr(c) for c in range(0xA0, 0x100))     # Latin-1 Supplement
    + '‐‑–—‘’‚“”„•…′″‹›€₹™←↑→↓−★'                     # punctuation, arrows, ₹, ★
)

FAMILIES = {
    # file stem         Google Fonts family spec                 axis ranges the site uses
    'big-shoulders': ('Big Shoulders:opsz,wght@10..72,100..900', {'wght': (300, 500), 'opsz': (10, 72)}),
    'ibm-plex-sans': ('IBM Plex Sans:wght@100..700',             {'wght': (400, 600)}),
    'ibm-plex-mono': ('IBM Plex Mono:wght@500',                  {}),
}

UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
OUT = pathlib.Path(__file__).resolve().parent.parent / 'app' / 'fonts'
OUT.mkdir(parents=True, exist_ok=True)

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=30).read()

import io
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

def trim(data, axes):
    # Characters first, then axes: instancing a font whose gvar still covers
    # glyphs the subsetter is about to drop trips over missing entries.
    font = TTFont(io.BytesIO(data), lazy=False)
    opts = subset.Options()
    opts.hinting = False
    opts.layout_features = ['kern', 'liga', 'calt', 'tnum', 'lnum', 'case']
    sub = subset.Subsetter(opts)
    sub.populate(text=CHARSET)
    sub.subset(font)
    if axes and 'fvar' in font:
        font = instancer.instantiateVariableFont(font, axes)
    out = io.BytesIO()
    font.flavor = 'woff2'
    font.save(out)
    return out.getvalue()

for stem, (spec, axes) in FAMILIES.items():
    q = urllib.parse.urlencode({'family': spec, 'text': CHARSET, 'display': 'swap'})
    css = get(f'https://fonts.googleapis.com/css2?{q}').decode()
    urls = re.findall(r'url\((https://[^)]+)\)', css)
    if len(urls) != 1:
        raise SystemExit(f'{stem}: expected one file, got {len(urls)}')
    data = trim(get(urls[0]), axes)
    (OUT / f'{stem}.woff2').write_bytes(data)
    print(f'{stem}.woff2  {len(data) // 1024} KB')
