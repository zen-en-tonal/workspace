import { runner } from "./src/mod.ts";
import * as yagura from "./src/mod.ts";

Deno.serve(async (req: Request) => {
  const payload = await req.json();
  const url = payload["url"];
  const { script } = await import(url);
  const { func, args } = script(yagura);
  const arg = payload["arg"];
  const result = await runner(func, args)(arg);
  return new Response(JSON.stringify(result));
});
