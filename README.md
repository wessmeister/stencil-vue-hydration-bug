# Vue + Stencil Hydration Bug

Stencil's `hydrated` class is removed when Vue's `:class` binding updates in `@stencil/vue-output-target`.

## Versions

- **Breaking Version:** `@stencil/vue-output-target@0.10.8` (June 17, 2025)
- **Last Working:** `@stencil/vue-output-target@0.10.7` (March 17, 2025)
- **Status:** Bug persists in v0.11.8 and all subsequent versions

## Setup

```bash
# 1. Build Stencil components
cd demo-components && npm install && npm run build

# 2. Build Vue wrapper
cd ../demo-components-vue && npm install && npm run build

# 3. Run test app
cd ../vue-test-app && npm install && npm run dev
```

## Reproduction Steps

1. Open http://localhost:5173
2. Open DevTools → inspect `<my-text>` element
3. Note initial classList: `["text", "text--visible", "hydrated"]` ✅
4. Click **"Toggle Text"** button
5. Observe classList: `["text", "text--visible"]` ❌

**Result:** The `hydrated` class is removed and never returns.

## Expected vs Actual

| State | v0.10.7 (Working) | v0.10.8+ (Broken) |
|-------|-------------------|-------------------|
| Initial | `["text", "text--visible", "hydrated"]` | `["text", "text--visible", "hydrated"]` |
| After toggle | `["hydrated", "text"]` ✅ | `["text", "text--visible"]` ❌ |

## Root Cause

Introduced in **v0.10.8** with the change "Fix: revert model update event renaming". When Vue's `:class` binding updates, the wrapper **replaces** the entire classList instead of **merging** with existing classes, removing Stencil's lifecycle classes.

**Affected pattern:**
```vue
<MyText class="static" :class="{ 'dynamic': condition }">
```

The reactive binding causes Stencil's `hydrated` class to be lost permanently. This regression persists in all versions from 0.10.8 onwards (including 0.11.8 and latest).
