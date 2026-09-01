# Auth Feature

Provider-agnostic authentication boundary for the starter. Replace the mock
login endpoint in `api/authApi.ts` with the project auth provider while keeping
the public exports stable.

- Session contracts live in `types/authTypes.ts`.
- Route UI lives in `components/` and `pages/`.
- Provider-specific calls live in `api/`.
- The mutation pattern (toasts + redirect) lives in
  `hooks/useLoginMutation.ts`.
- Validation lives in `schemas/loginSchema.ts` (Zod).
- Session state lives in `store/authSlice.ts` (durable client state).

Swap-in checklist for a real backend:

1. Point `api/authApi.ts` at the real endpoint(s); keep error normalization via
   `apiClient` (errors arrive as `ApiError`).
2. Persist the session per `SECURITY.md` (httpOnly cookies preferred; tokens in
   memory only).
3. Restore session on app start (e.g. a `useSessionQuery` in `hooks/`) so
   `ProtectedRoute` reflects reality after refresh.
