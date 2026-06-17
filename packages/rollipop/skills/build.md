---
name: build
description: Rollipop bundle/build workflow. Use for rollipop bundle, production or development bundles, sourcemaps, assets, cache flags, build output validation, and programmatic runBuild usage.
allowed-tools: Bash(npx:*), Bash(npm:*), Bash(pnpm:*), Bash(rollipop:*), Bash(yarn:*), Bash(node:*)
---

# Rollipop Build

Use this skill when the task is about producing or validating a Rollipop bundle.

## Bundle Command

Read https://rollipop.dev/docs/get-started/cli-commands.md before choosing `rollipop bundle` flags. Confirm platform, entry file, output paths, sourcemap needs, asset output needs, and dev/prod intent before running or editing scripts.

## Bundler API

Use the programmatic API only for custom tooling or tests that need `loadConfig`/`runBuild`. Read https://rollipop.dev/docs/apis/bundler.md before adding API usage.

## Build Configuration

Inspect `rollipop.config.ts` before changing build behavior. Use https://rollipop.dev/docs/get-started/configuration.md for config options, and keep changes narrow.

## Failure Routing

If the build fails, switch to `troubleshooting.md` to classify the failure before changing unrelated config. Use `debugging.md` only when you need logs/events/symbolication tooling.

## Watchpoints

- Be careful with Metro compatibility flags; some are accepted only as unsupported placeholders.
- Avoid clearing cache reflexively. Use `--reset-cache` only when stale transform/cache state is plausible or when starting a focused repro.
- If docs and implementation disagree, inspect `packages/rollipop/src/node/commands/bundle` and keep the final recommendation narrow.
