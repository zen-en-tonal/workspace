FROM denoland/deno:alpine

EXPOSE 8000

WORKDIR /app

USER deno

COPY src/deps.ts .
COPY deno.lock .
RUN deno cache --lock=deno.lock deps.ts

ADD . .
RUN deno cache --lock=deno.lock cmd/serve.ts

CMD [ "run", "--allow-net", "cmd/serve.ts" ]
