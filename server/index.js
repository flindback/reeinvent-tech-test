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

const findSynonymsHandler = ({ word }) => {
  if (!word) {
    return { success: false, message: "No word in request" };
  }
  const synonymsForWord = synonyms.findAllSynonyms(word);

  return synonymsForWord.length === 0
    ? { success: false, message: `No synonyms found for ${word}` }
    : {
        success: true,
        message: `Successfully found synonyms for ${word}`,
        synonyms: synonymsForWord,
      };
};

const handlers = {
  "/add": addSynonymsHandler,
  "/find": findSynonymsHandler,
};

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    if (handlers[url.pathname]) {
      const body = await req.json();
      const response = handlers[url.pathname](body);
      const res = new Response(JSON.stringify(response), {
        status: response.success ? 200 : 400,
      });
      res.headers.set("Access-Control-Allow-Origin", "*");
      res.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      return res;
    }

    return new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404 }
    );
  },
});
