# MARU private anonymous stories

This module prepares a login-free Cloudflare Worker intake backend and a form on the public MUSIC SHARE site. **It is not deployed or connected.** The public form is disabled until a server is configured.

## Behavior
- Audience members need no GitHub account, password, or email. They submit a nickname, story, optional KST airtime and at most one small (8MB) image/video/song.
- The Worker requires server-side Turnstile verification and a rate limiter, then saves story text privately in D1.
- Optional media gets an extension + magic-byte check and is saved to a **private** R2 quarantine bucket, never a public link. These checks are NOT full malware scanning, copyright clearance, or producer approval.
- Every story remains pending_security_review and cannot be automatically aired.

## Before activation
1. Set up a Cloudflare account, private D1 database and private R2 bucket. Keep R2 public access disabled.
2. Configure a Turnstile widget for skytins3-png.github.io.
3. Copy wrangler.toml.example to wrangler.toml; replace the database ID and choose a unique rate-limit namespace ID.
4. In guest-intake run: npx wrangler d1 execute maru-stories-private --remote --file=./schema.sql.
5. Supply Wrangler secrets TURNSTILE_SECRET and RATE_SALT. Deploy via npx wrangler deploy.
6. Confirm /health returns ready:true and an anonymous test submission persists in D1 as pending review.
7. Configure the real HTTPS Worker base endpoint and public Turnstile site key in music-share/guest-intake-config.json.
8. Switch the radio's listener button to the anonymous form only after the endpoint is live and reviewed.

## Still needed
Private authenticated producer inbox, consent and retention policy, deletion and abuse reporting, real sandboxed ClamAV/ffprobe media scanning, royalty/license verification, and official BIGO-compatible broadcast integration. No upload is accepted for automatic broadcast.

Test with Node 22+: node --test guest-intake/tests/worker.test.mjs.
