# Security Guidance

Frontend security baseline for projects built from this starter.

## Secrets

- Never put secrets in `VITE_*` variables or `src/` — everything bundled into
  the client is public.
- `.env` is gitignored; `.env.example` is the committed, secret-free contract.
- Backend credentials belong in backend env / a secrets manager.

## Tokens and auth

- Prefer httpOnly, Secure, SameSite cookies set by the backend.
- If bearer tokens are unavoidable, keep them in memory (Redux store), not
  `localStorage`, and inject them in `src/lib/apiClient.ts` interceptors.
- `ProtectedRoute` is a UX guard, not a security boundary — every API endpoint
  must enforce authorization server-side.

## XSS

- React escapes interpolated values by default; do not bypass it with
  `dangerouslySetInnerHTML` on untrusted content.
- Sanitize any rich text/HTML at render time (e.g. DOMPurify) and set
  `rel="noopener noreferrer"` on user-provided links.

## Transport and headers

- Serve over HTTPS; enforce HSTS at the CDN/proxy.
- `nginx.conf` sets `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, and `Permissions-Policy`. Add a `Content-Security-Policy`
  per project (start with `default-src 'self'` and allow the API origins you
  actually call; avoid `unsafe-inline` where the app permits).
- The API base URL is configurable at runtime (`env.js`) — restrict CORS on the
  backend to known origins.

## Dependencies

- Keep the lockfile committed; `npm ci` in Docker and CI guarantees
  reproducible installs.
- Review dependency updates (Renovate/Dependabot) and run
  `npm audit` regularly.

## Reporting

Add your project's disclosure contact here before shipping.
