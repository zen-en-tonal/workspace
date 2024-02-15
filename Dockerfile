FROM denoland/deno:alpine

EXPOSE 8000

WORKDIR /app

USER deno

ADD . .
RUN deno cache --lock=deno.lock cmd/serve.ts

CMD [ "run", "--allow-net", "cmd/serve.ts" ]
