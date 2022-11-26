## Running

1. create a `.env` file based in `.env.example`
2. run `docker compose up` or `deno task dev`

## Technologies

- Deno
- Danet: Http framework like nestjs
- DenoDb: ORM for Deno
- Created with Hexagonal and clean architecture in mind

### Generating jwt key/pair

```javascript
// generate a new key
let key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify'],
);

// export the previous generated key
let exported = await crypto.subtle.exportKey(
  'jwk',
  key,
);

// recupered key
let originalKey = await crypto.subtle.importKey(
  'jwk',
  exportedKey,
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify'],
);
```

This project was created based on @pvarentsov's project  [typescript-clean-architecture](https://github.com/pvarentsov/typescript-clean-architecture)
