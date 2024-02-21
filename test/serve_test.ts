import { route } from "../cmd/serve.ts";
import Logger from "https://deno.land/x/logger@v1.1.5/logger.ts";
import { assertEquals } from "./deps.ts";

const logger = new Logger();
logger.disable();

Deno.test("serve ok", async () => {
  // deno-lint-ignore require-await
  const res = await route(logger, async (_) => ({
    func: async () => {},
    context: {},
  }))(new Request("http://example.test"));

  assertEquals(res.ok, true);
});

Deno.test("serve func throws", async () => {
  // deno-lint-ignore require-await
  const res = await route(logger, async (_) => ({
    // deno-lint-ignore require-await
    func: async () => {
      throw new Error("error!");
    },
    context: {},
  }))(new Request("http://example.test"));

  assertEquals(res.ok, true);
});

Deno.test("serve deliver throws", async () => {
  // deno-lint-ignore require-await
  const res = await route(logger, async (_) => {
    throw new Error("error!");
  })(new Request("http://example.test"));

  assertEquals(res.ok, false);
});
