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

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/add") {
      const body = await req.json();
      const { success, message } = addSynonymsHandler(body);
      if (!success) {
        return new Response(JSON.stringify({ success, message }), {
          status: 400,
        });
      }

      return new Response(JSON.stringify({ success, message }), {
        status: 200,
      });
    }
    return new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404 }
    );
  },
});
