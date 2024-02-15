import { dynamic, zod } from "./deps.ts";

const scheme = zod.object({
  src: zod.string().url(),
  context: zod.record(zod.any()),
});

Deno.serve(async (req: Request) => {
  const json = await req.json();
  const { src, context } = await scheme.parseAsync(json);
  const run = await dynamic.dispatch(src);
  const result = await run(context);
  return new Response(JSON.stringify(result));
});
