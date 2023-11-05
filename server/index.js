import { SynonymsService } from "./synonyms";

const synonyms = new SynonymsService();

const addSynonymsHandler = ({ words = [] }) => {
  if (!words.length) {
    return { success: false, message: "No words to add" };
  }
  synonyms.add(words);
  console.dir(synonyms.roots);
  return { success: true, message: "Words added successfully" };
};

const checkSynonymsHandler = ({ word = "" }) => {};

const handlers = {
  "/add": addSynonymsHandler,
  "/check": checkSynonymsHandler,
};

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    if (handlers[url.pathname]) {
      const body = await req.json();
      const { success, message } = handlers[url.pathname](body);
      return new Response(JSON.stringify({ success, message }), {
        status: success ? 200 : 400,
      });
    }

    return new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404 }
    );
  },
});
