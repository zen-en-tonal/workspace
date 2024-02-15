import { dynamic } from "../src/mod.ts";

Deno.serve(async (req: Request) => {
  const { src, arg } = await req.json();
  const run = await dynamic.dispatch(src);
  const result = await run(arg);
  return new Response(JSON.stringify(result));
});
