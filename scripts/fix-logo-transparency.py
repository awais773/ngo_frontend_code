from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\G A Group\.cursor\projects\c-ngo-frontend\assets"
    r"\c__Users_G_A_Group_AppData_Roaming_Cursor_User_workspaceStorage_1faf440cd390d95212564557ecacfc86_images_"
    r"Gemini_Generated_Image_ynvh3kynvh3kynvh-e9d2e517-2119-48bd-a90d-c08149e005f8.png"
)
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "logo"


def remove_checkerboard(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)

    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    sat = max_c - min_c

    # Fake transparency checkerboard uses neutral greys/whites.
    bg = (
        ((sat <= 40) & (min_c >= 95))
        | ((sat <= 25) & (max_c >= 90))
    )

    # Remove leftover fringe/halo around the artwork.
    arr[:, :, 3] = np.where(bg, 0, arr[:, :, 3])
    alpha = arr[:, :, 3]
    fringe = (alpha > 0) & (alpha < 40) & bg
    arr[:, :, 3] = np.where(fringe, 0, arr[:, :, 3])
    return Image.fromarray(arr, "RGBA")


def crop_to_content(img: Image.Image, pad: int = 12) -> Image.Image:
    arr = np.array(img)
    visible = arr[:, :, 3] > 10
    ys, xs = np.where(visible)
    top, bottom = int(ys.min()), int(ys.max())
    left, right = int(xs.min()), int(xs.max())
    h, w = arr.shape[:2]

    top = max(0, top - pad)
    left = max(0, left - pad)
    bottom = min(h - 1, bottom + pad)
    right = min(w - 1, right + pad)

    return Image.fromarray(arr[top : bottom + 1, left : right + 1], "RGBA")


def main() -> None:
    img = Image.open(SRC)
    cleaned = remove_checkerboard(img)
    logo = crop_to_content(cleaned)

    logo_path = OUT_DIR / "verified-needy-logo.png"
    icon_path = OUT_DIR / "verified-needy-icon.png"
    mark_path = OUT_DIR / "verified-needy-mark.png"
    logo.save(logo_path, optimize=True)
    logo.save(icon_path, optimize=True)

    # Icon-only mark for dark footer (no dark text on navy background).
    mark_h = int(logo.height * 0.58)
    mark = logo.crop((0, 0, logo.width, mark_h))
    mark.save(mark_path, optimize=True)

    root = Path(__file__).resolve().parents[1]
    for rel in ("src/app/icon.png", "src/app/apple-icon.png", "public/favicon-32.png"):
        target = root / rel
        logo.resize((512, 512), Image.Resampling.LANCZOS).save(target, optimize=True)

    print(f"Saved transparent logo: {logo.size}")


if __name__ == "__main__":
    main()
