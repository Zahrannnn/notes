#!/bin/bash
# Emits the runtime env script served at /env.js.
# The Docker CMD redirects this output into /usr/share/nginx/html/env.js so
# VITE_* values are injected at container start, not at build time.
set -e

cat <<EOF
window.__RUNTIME_CONFIG__ = {
  VITE_APP_NAME: "${VITE_APP_NAME:-}",
  VITE_API_BASE_URL: "${VITE_API_BASE_URL:-}",
  VITE_API_TIMEOUT_MS: "${VITE_API_TIMEOUT_MS:-}",
  VITE_ENABLE_AXE: "${VITE_ENABLE_AXE:-}",
};
EOF
