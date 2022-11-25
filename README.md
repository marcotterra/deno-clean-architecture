## Description

The core microservice of contentsby.me stack

## Running

To run for first time

```bash
# We need generate prisma client
deno run -A --unstable npm:prisma generate --data-proxy
```

To run the project

```bash
npx dotenv -- deno task dev
```

### Observations

- Currently the prisma support for Deno is unstable, so is needed use the arg
  `--unstable`.
- The prisma suport for deno is only with `--data-proxy`, using prisma cloud.

  # deno run -A --unstable

## Technologies

- Deno
- Danet: Http framework like nestjs
- Prisma with postgres
- Created with Hexagonal architecture in mind
