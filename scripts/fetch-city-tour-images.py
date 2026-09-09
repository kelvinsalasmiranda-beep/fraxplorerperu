"""Download city tour images from live site."""
import re
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images"
TOURS = ROOT / "public" / "images" / "tours"
OUT.mkdir(parents=True, exist_ok=True)
TOURS.mkdir(parents=True, exist_ok=True)

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()

DIRECT = [
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/09/pexels-angel-valladares-242487480-17060841-scaled.jpg",
        OUT / "pexels-angel-valladares-242487480-17060841-scaled.jpg",
    ),
    *[
        (
            f"https://fraxplorerperu.com/wp-content/uploads/2025/08/{n}.jpg",
            OUT / f"{n}.jpg",
        )
        for n in range(1, 7)
    ],
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/07/6b0e3434bbe01745289f4491408b1eab-819x1024.jpg",
        OUT / "6b0e3434bbe01745289f4491408b1eab-819x1024.jpg",
    ),
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/07/9b05f0fdf89824318a168dfff5be7798.jpg",
        OUT / "9b05f0fdf89824318a168dfff5be7798.jpg",
    ),
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/07/c71ae50025b786242292dbd09e83e1f9.jpg",
        OUT / "c71ae50025b786242292dbd09e83e1f9.jpg",
    ),
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/07/c0147acaeadf2532c8d2de8f70888baf-1.jpg",
        OUT / "c0147acaeadf2532c8d2de8f70888baf-1.jpg",
    ),
    (
        "https://fraxplorerperu.com/wp-content/uploads/2025/07/322ea6b83c34a8a85a8202d8d04a3b7b.jpg",
        OUT / "322ea6b83c34a8a85a8202d8d04a3b7b.jpg",
    ),
]


def download(url: str, dest: Path) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://fraxplorerperu.com/"})
    try:
        with urllib.request.urlopen(req, timeout=45, context=CTX) as resp:
            dest.write_bytes(resp.read())
        print("ok", dest.name)
        return True
    except Exception as exc:
        print("fail", dest.name, exc)
        return False


def scrape_page_urls() -> list[str]:
    url = "https://fraxplorerperu.com/city-tour-medio-dia/"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    html = urllib.request.urlopen(req, timeout=45, context=CTX).read().decode("utf-8", errors="ignore")
    pattern = re.compile(
        r"https://fraxplorerperu\.com/wp-content/uploads/[^\"'\s>]+\.(?:jpg|jpeg|png|webp)",
        re.I,
    )
    seen: list[str] = []
    for match in pattern.findall(html):
        if match not in seen:
            seen.append(match)
    return seen


def main() -> None:
    ok = 0
    for url, dest in DIRECT:
        if dest.exists() and dest.stat().st_size > 0:
            print("skip", dest.name)
            ok += 1
            continue
        if download(url, dest):
            ok += 1

    try:
        scraped = scrape_page_urls()
        print("scraped", len(scraped), "urls from page")
        for url in scraped:
            name = url.rsplit("/", 1)[-1]
            if not re.search(r"(1|2|3|4|5|6)\.jpg$|6b0e3434|9b05f0fd|c71ae500|c0147aca|322ea6b8|pexels-angel-valladares", name, re.I):
                continue
            dest = OUT / name
            if dest.exists():
                continue
            download(url, dest)
    except Exception as exc:
        print("scrape skipped", exc)

    print("done", ok, "files in", OUT)


if __name__ == "__main__":
    main()
