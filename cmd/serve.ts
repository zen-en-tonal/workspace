import { dynamic } from "../src/mod.ts";

Deno.serve(async (req: Request) => {
  const { src, context } = await req.json();
  const run = await dynamic.dispatch(src);
  const result = await run(context);
  return new Response(JSON.stringify(result));
});
