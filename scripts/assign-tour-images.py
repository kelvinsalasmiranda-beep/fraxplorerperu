"""Map tour images from scraped pages + Facebook-style filenames."""
import json
import re
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]
SCRAPED = ROOT / "src/data/tours-scraped.json"
OUT = ROOT / "src/data/tour-images.generated.json"

SKIP = re.compile(
    r"logo|cropped-FRAX|cropped-LOGO|favicon|pagos|payment|paypal|whatsapp|badge|32x32|192x192|180x180|270x270|\.css",
    re.I,
)
EXT = re.compile(r"\.(jpe?g|png|webp|gif|avif)$", re.I)
SKIP_SLUGS = {
    "tour-en-cusco",
    "machupicchu",
    "paquetes",
    "camino-inca",
    "salkantay-y-otros",
    "otros-destinos",
    "machu-picchu-full-day",
}


def is_wide(img: str) -> bool:
    m = re.search(r"-(\d+)x(\d+)\.(jpe?g|png|webp)$", img, re.I)
    if not m:
        return False
    w, h = int(m.group(1)), int(m.group(2))
    return w / h > 1.6


def valid(img: str) -> bool:
    return bool(EXT.search(img)) and not SKIP.search(img) and not is_wide(img)


def pixel_area(img: str) -> int:
    m = re.search(r"-(\d+)x(\d+)\.", img)
    if m:
        return int(m.group(1)) * int(m.group(2))
    return 10_000_000


def normalize(path: str) -> str:
    name = path.split("/")[-1]
    base = re.sub(r"-\d+x\d+\.(jpe?g|png|webp)$", r".\1", name, flags=re.I)
    return base.lower()


# Manual overrides — Facebook promos + real client photos
MANUAL: dict[str, dict] = {
    "tour-machu-picchu-full-day": {
        "hero": "/images/Siitulo-2-922x1024.jpg",
        "gallery": [
            "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
            "/images/Sin-titulo-2-6-768x908.jpg",
            "/images/Sin-titulo-6-1-866x1024.jpg",
            "/images/Sin-titulo-1-2-866x1024.jpg",
            "/images/Sin-titulo-2-7-866x1024.jpg",
            "/images/maaaaaaaaaaae-810x1024.jpg",
        ],
    },
    "aguas-calientes-machu-picchu": {
        "hero": "/images/Sin-titulo-6-1-866x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
            "/images/Sin-titulo-2-6-768x908.jpg",
            "/images/Sin-titulo-1-3-866x1024.jpg",
        ],
    },
    "huaynapicchu-machupicchu": {
        "hero": "/images/Sin-titulo-2-7-866x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/Sin-titulo-2-8-866x1024.jpg",
            "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
            "/images/Sin-titulo-6-1-866x1024.jpg",
        ],
    },
    "valle-sagrado-machu-picchu": {
        "hero": "/images/Siitulo-2-922x1024.jpg",
        "gallery": [
            "/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg",
            "/images/pexels-sergei-a-1322276-2539417-1536x1022.jpg",
            "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
            "/images/Sin-titulo-1-2-866x1024.jpg",
        ],
    },
    "machu-picchu-en-carro-desde-cusco": {
        "hero": "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/Sin-titulo-2-6-768x908.jpg",
            "/images/Sin-titulo-6-1-866x1024.jpg",
        ],
    },
    "machu-picchu-en-carro-desde-cusco-full-day": {
        "hero": "/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/Sin-titulo-2-6-768x908.jpg",
        ],
    },
    "laguna-humantay-full-day": {
        "hero": "/images/lagunaab-768x1024.jpg",
        "gallery": [
            "/images/lagunaab-1152x1536.jpg",
            "/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg",
            "/images/5e9a0ffd519bd6c06a66afce7742183f.jpg",
            "/images/Imagen-de-WhatsApp-2025-08-21-a-las-00.31.39_2d83e2f3.jpg",
        ],
    },
    "montana-de-colores-full-day": {
        "hero": "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        "gallery": [
            "/images/1-1.jpg",
            "/images/2-1.jpg",
            "/images/frax3-768x1024.jpg",
            "/images/Imagen-de-WhatsApp-2025-08-21-a-las-00.26.36_f739ad7c.jpg",
        ],
    },
    "montana-palcoyo-full-day": {
        "hero": "/images/palcoyoo-1.jpg",
        "gallery": [
            "/images/778218d7d4252d82475ec90875f51531-1.jpg",
            "/images/frax3-768x1024.jpg",
        ],
    },
    "cusco-montana-de-colores-4d-3n": {
        "hero": "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        "gallery": [
            "/images/1-1.jpg",
            "/images/2-1.jpg",
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
        ],
    },
    "machupicchu-laguna-humantay-6d-5n": {
        "hero": "/images/Sin-titu-2-922x1024.jpg",
        "gallery": [
            "/images/lagunaab-768x1024.jpg",
            "/images/Siitulo-2-922x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        ],
    },
    "cusco-laguna-humantay-6d-5n": {
        "hero": "/images/lagunaab-768x1024.jpg",
        "gallery": [
            "/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg",
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
    "valle-sagrado-full-day": {
        "hero": "/images/pexels-sergei-a-1322276-2539417-1536x1022.jpg",
        "gallery": [
            "/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg",
            "/images/pexels-susan-flores-232226967-33423804-681x1024.jpg",
            "/images/Sin-titulo-1-2-866x1024.jpg",
        ],
    },
    "maras-moray-valle-sagrado-5d-4n": {
        "hero": "/images/pexels-susan-flores-232226967-33423804-681x1024.jpg",
        "gallery": [
            "/images/pexels-sergei-a-1322276-2539417-1536x1022.jpg",
            "/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg",
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
    "maras-y-moray-con-picnic-andino-full-day": {
        "hero": "/images/pexels-susan-flores-232226967-33423804-681x1024.jpg",
        "gallery": [
            "/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg",
        ],
    },
    "cusco-valle-sagrado-6d-5n": {
        "hero": "/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg",
        "gallery": [
            "/images/pexels-sergei-a-1322276-2539417-1536x1022.jpg",
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
        ],
    },
    "inca-trip-8d-7n": {
        "hero": "/images/Siitulo-2-922x1024.jpg",
        "gallery": [
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
            "/images/maaaaaaaaaaae-810x1024.jpg",
            "/images/frax3-768x1024.jpg",
        ],
    },
    "inca-trip-9d-8n": {
        "hero": "/images/maaaaaaaaaaae-810x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        ],
    },
    "inca-trip-7d-6n": {
        "hero": "/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
        ],
    },
    "inca-trip-10d-9n": {
        "hero": "/images/Siitulo-2-922x1024.jpg",
        "gallery": [
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
            "/images/hucachina6-819x1024.jpg",
        ],
    },
    "inca-trip-11d-10n": {
        "hero": "/images/frax3-768x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
        ],
    },
    "inca-trip-12d-11n": {
        "hero": "/images/maaaaaaaaaaae-810x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/hucachina6-819x1024.jpg",
        ],
    },
    "peru-aventura-total-7d-6n": {
        "hero": "/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        ],
    },
    "peru-aventura-total-8d-7n": {
        "hero": "/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        ],
    },
    "peru-aventura-total-9d-8n": {
        "hero": "/images/maaaaaaaaaaae-810x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
        ],
    },
    "peru-aventura-total-10d-9n": {
        "hero": "/images/Siitulo-2-922x1024.jpg",
        "gallery": [
            "/images/lagunaab-768x1024.jpg",
            "/images/33098cd0a441c619cc416a8f67180f21.jpg",
            "/images/hucachina6-819x1024.jpg",
            "/images/frax3-768x1024.jpg",
        ],
    },
    "peru-aventura-total-13d-12n": {
        "hero": "/images/frax3-768x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/hucachina6-819x1024.jpg",
            "/images/lagunaab-768x1024.jpg",
        ],
    },
    "huacachina-islas-ballestas-full-day": {
        "hero": "/images/hucachina6-819x1024.jpg",
        "gallery": [
            "/images/Imagen-de-WhatsApp-2025-08-21-a-las-00.34.49_9380b644.jpg",
        ],
    },
    "city-tour-medio-dia": {
        "hero": "/images/pexels-joanavittoria-2193392-scaled.jpg",
        "gallery": [
            "/images/frax3.jpg",
            "/images/Imagen-de-WhatsApp-2025-08-21-a-las-00.03.14_889f3aad.jpg",
        ],
    },
    "glaciar-qelccaya-full-day": {
        "hero": "/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg",
        "gallery": [
            "/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg",
        ],
    },
    "waqrapukara-full-day": {
        "hero": "/images/778218d7d4252d82475ec90875f51531-1.jpg",
        "gallery": [
            "/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg",
        ],
    },
    "camino-inca-4d-3n": {
        "hero": "/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
            "/images/Sin-titulo-2-6-768x908.jpg",
        ],
    },
    "camino-inca-machupicchu-2d-1n": {
        "hero": "/images/Sin-titulo-2-6-768x908.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
    "salkantay-trek-machupicchu-5d-4n": {
        "hero": "/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg",
        "gallery": [
            "/images/lagunaab-768x1024.jpg",
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
    "salkantay-trek-machupicchu-4d-3n": {
        "hero": "/images/lagunaab-768x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
    "inca-jungle-trek-machupicchu-4d-3n": {
        "hero": "/images/frax3-768x1024.jpg",
        "gallery": [
            "/images/Siitulo-2-922x1024.jpg",
        ],
    },
}


def main():
    raw = json.loads(SCRAPED.read_text(encoding="utf-8"))
    img_to_slugs: dict[str, set[str]] = defaultdict(set)

    for tour in raw:
        slug = tour["slug"]
        if slug in SKIP_SLUGS:
            continue
        for img in tour.get("images", []):
            if valid(img):
                img_to_slugs[normalize(img)].add(slug)

    result: dict[str, dict] = {}
    public = ROOT / "public"

    for slug, data in MANUAL.items():
        hero = data["hero"]
        gallery = []
        for g in data["gallery"]:
            if (public / g.lstrip("/")).exists() or (public / "images" / g.split("/")[-1]).exists():
                gallery.append(g)
        if (public / hero.lstrip("/")).exists():
            result[slug] = {"hero": hero, "gallery": [hero, *gallery]}
        else:
            print("MISSING hero", slug, hero)

    # Auto-fill remaining tours from scraped unique images
    for tour in raw:
        slug = tour["slug"]
        if slug in SKIP_SLUGS or slug in result:
            continue
        imgs = sorted({i for i in tour.get("images", []) if valid(i)}, key=pixel_area, reverse=True)
        unique = []
        seen = set()
        for img in imgs:
            key = normalize(img)
            if key in seen:
                continue
            seen.add(key)
            unique.append(img)
        if unique:
            result[slug] = {"hero": unique[0], "gallery": unique[:8]}

    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(result)} tour image maps to {OUT}")


if __name__ == "__main__":
    main()
