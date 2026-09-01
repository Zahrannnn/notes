# Deployment

Merge to `main` deploys to production automatically. A merge request only runs
the verify gate. The deploy lands on the company server through a gitlab-runner
installed on the server itself (shell executor, tag `deploy`), so no SSH keys
live in CI and no inbound access from GitLab is needed.

```text
merge request ──► verify (shared runners)
merge to main ──► verify ──► publish ──► deploy (runner on the server)
                              │            docker compose pull
                              │            docker compose up -d
                              ▼            smoke test /healthz
                   image pushed as
                   sha-<short> + main
```

## One-time server setup

1. **Register the runner** (already installed):

   ```bash
   sudo gitlab-runner register \
     --url https://git.infogerance.d-fi.fr \
     --token <runner-authentication-token>   # Project → Settings → CI/CD → Runners
   ```

   Answers: executor `shell`, description `production-deploy`, tags `deploy`.

2. **Harden the runner config** in `/etc/gitlab-runner/config.toml`:

   - `concurrent = 1` — never run two deploys at once.
   - On the runner in the GitLab UI: tick **Protected** (only protected
     branches can use it) and make sure **Run untagged jobs** is off.

3. **Give the runner user access to Docker** (shell jobs run as the
   `gitlab-runner` user):

   ```bash
   sudo usermod -aG docker gitlab-runner
   sudo systemctl restart gitlab-runner
   ```

   `docker compose` (v2 plugin) must work for that user: `sudo -u gitlab-runner docker compose version`.

4. **Create the server env file**, e.g. `/srv/setup-vite/.env`, based on
   `.env.example` with the production values. Keep it off the repo:

   ```bash
   sudo mkdir -p /srv/setup-vite
   sudo cp .env.example /srv/setup-vite/.env   # then edit values
   sudo chmod 600 /srv/setup-vite/.env
   ```

## GitLab project settings

CI/CD variables (Settings → CI/CD → Variables). Mark everything **Protected**;
mask the password:

| Variable               | Example                      | Purpose                        |
| ---------------------- | ---------------------------- | ------------------------------ |
| `HUB_URL`              | `docker.infogerance.d-fi.fr` | Registry host                  |
| `APP_NAME`             | `example-project`            | Image name                     |
| `APP_VERSION`          | `1.0.0`                      | Local (make) image tag         |
| `CI_REGISTRY_USER`     | —                            | Registry login                 |
| `CI_REGISTRY_PASSWORD` | —                            | Registry password (masked)     |
| `DEPLOY_ENV_FILE`      | `/srv/setup-vite/.env`       | Server env file used by deploy |

Branch protection (Settings → Repository → Protected branches): `main` allows
**no direct pushes** — merge requests only. Merging to `main` is a production
deploy, so treat it accordingly.

## How a deploy runs

1. The deploy job checks the repo out on the server.
2. It copies `DEPLOY_ENV_FILE` over the checkout's `.env` — the server env file
   stays the single source of truth; the pipeline ships no secrets.
3. It sets `IMAGE_TAG=sha-<short>` and runs `docker compose pull && up -d`.
4. It polls `/healthz` until nginx answers (about 30s worst case). Failure
   fails the pipeline and shows in GitLab.

## Rollback

Deploy history lives under Environments → production. **Rollback** re-runs an
older deploy job, which redeploys that commit's `sha-…` image. Because every
tag is immutable, a rollback is a redownload, not a rebuild.

## Troubleshooting

| Symptom                             | Likely cause and fix                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| Deploy job stuck in _pending_       | Runner tag mismatch (`deploy`), runner not protected, or untagged-jobs mismatch    |
| `permission denied ... docker.sock` | `gitlab-runner` user missing from the `docker` group                               |
| `pull access denied`                | Registry credentials wrong, or the image was not published (check the publish job) |
| Smoke test fails, container up      | `docker compose logs app`, and check `APP_PORT` in the server env file             |
| `DEPLOY_ENV_FILE must point at…`    | The CI variable is missing or not marked protected                                 |
