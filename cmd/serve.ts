import { dispatch, Function, Logger, run, timestamp } from "./deps.ts";

const logger = new Logger();
logger.enableConsole();

export const route = (
  logger: Logger,
  deliver: (
    req: Request,
  ) => Promise<{ func: Function<unknown, unknown>; context: unknown }>,
) =>
async (req: Request) => {
  logRequest(logger, req);
  try {
    const { func, context } = await deliver(req);
    const result = await run(func, { logger })(context);
    return new Response(JSON.stringify(result));
  } catch (e) {
    logger.error(e);
    return new Response(e, { status: 400 });
  }
};

const logRequest = (logger: Logger, req: Request) => {
  logger.info({
    method: req.method,
    url: req.url,
    timestamp: timestamp(),
  });
};

const deliver = async (req: Request) => {
  const { src, context } = await req.json();
  const func = await dispatch(src);
  return { func, context };
};

if (import.meta.main) {
  Deno.serve(route(logger, deliver));
}
