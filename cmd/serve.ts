import { dispatch, run } from "./deps.ts";

Deno.serve(async (req: Request) => {
  const { src, context } = await req.json();
  const func = await dispatch(src);
  const result = await run(func)(context);
  return new Response(JSON.stringify(result));
});
