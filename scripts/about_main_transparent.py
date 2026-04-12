"""Make edge-connected near-black pixels transparent (hero PNG with black matte)."""

from __future__ import annotations

import sys
from collections import deque

from PIL import Image


def main() -> int:
    path = sys.argv[1] if len(sys.argv) > 1 else "src/img/about-main.png"
    out = sys.argv[2] if len(sys.argv) > 2 else path

    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    # Pixels this dark that touch the image border are treated as background.
    max_sum = 55  # r+g+b; black ~0, very dark grey still removed at edges
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        if x < 0 or x >= w or y < 0 or y >= h or visited[y][x]:
            return
        r, g, b, _a = px[x, y]
        if r + g + b > max_sum:
            return
        visited[y][x] = True
        q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or nx >= w or ny < 0 or ny >= h or visited[ny][nx]:
                continue
            nr, ng, nb, _ = px[nx, ny]
            if nr + ng + nb > max_sum:
                continue
            visited[ny][nx] = True
            q.append((nx, ny))

    im.save(out, optimize=True)
    print(f"Wrote {out} ({w}x{h})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
