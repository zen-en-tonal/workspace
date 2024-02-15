import { runner } from "../src/mod.ts";
import { tasks } from "../mod.ts";

Deno.serve(async (req: Request) => {
  const payload = await req.json();
  const url = payload["url"];
  const { script } = await import(url);
  const { func, args } = script(tasks);
  const arg = payload["arg"];
  const result = await runner.runner(func, args)(arg);
  return new Response(JSON.stringify(result));
});
