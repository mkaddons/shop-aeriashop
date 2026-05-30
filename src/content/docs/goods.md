---
title: Product metadata (goods)
order: 11
---

Products are Markdown files under **`src/content/goods/`**. Front matter (YAML between `---` lines) holds metadata; the body below is shown on the product detail page under **Details**.

Format reference: `desc/goods.md` in the siteshopdev repo.

## File layout

**Single file**

```
src/content/goods/my-product.md
```

**Folder (recommended for images)**

```
src/content/goods/my-product/index.md
src/content/goods/my-product/cover.svg
```

Non-`.md` assets in `goods/` are copied to `public/content/goods/` on build for static URLs.

## Front matter fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | yes | Product name |
| `desc` | yes | Short summary (listing + detail sidebar) |
| `preview` | no | Preview image; filename relative to product folder, or absolute `/content/goods/...` URL |
| `tools` | no | Tech stack tags; string (comma-separated) or array |
| `images` | no | Detail carousel; string (comma-separated) or array |
| `featured` | no | `true` for homepage featured section (`fetured` typo also accepted) |
| `collection` | no | Group label |
| `demo` | no | Demo URL; if set, shows **Live demo** on detail page and product cards |
| `license` | no | Purchase tiers (see below) |

Legacy top-level `price` + `payurl` are still supported as a single **Single license** tier.

### `license`

Nested object; keys must match entries in `public/licenses.json` → `types` (e.g. `single license`, `team licenses`).

Each tier:

| Field | Description |
| --- | --- |
| `price` | Display price for paid tiers (e.g. `$49`). Omit on tiers marked `free: true` in `licenses.json` |
| `payurl` | Checkout or download URL (required for every tier) |

License labels, descriptions, and whether a tier is **free** come from `public/licenses.json` — see [licenses.json](./licenses-json/). The license **key name** (e.g. `free license`) is only an identifier.

### Free tiers

Set `"free": true` on that type in `licenses.json`. The UI shows **Free** (still uses `payurl` from the product). Product `price` is not used for free tiers.

**Product card pricing:** one tier → `Free` or price from the first tier. Multiple tiers → **From** + first tier in license order (e.g. free tier first → **From Free**).

## Example

```yaml
---
name: SaaS Launch Kit
desc: Next.js landing template with pricing and testimonials.
preview: cover.svg
tools: Next.js, Tailwind CSS, TypeScript
images: cover.svg, screen-1.svg, screen-2.svg
featured: true
collection: templates
demo: https://example.com/demo/launch-kit
license:
  single license:
    price: $49
    payurl: https://example.com/pay/launch-kit-single
  team licenses:
    price: $199
    payurl: https://example.com/pay/launch-kit-team
---

## What's inside

Long-form product description in Markdown…
```

## Image paths

- Relative filenames (e.g. `cover.svg`) resolve to `/content/goods/{slug}/cover.svg` after sync.
- Paths starting with `http` or `/` are used as-is.
