import { SynonymsService } from "./synonyms";

const synonyms = new SynonymsService();

const addSynonymsHandler = ({ words = [] }) => {
  if (!words.length) {
    return { success: false, message: "No words to add", responseCode: 200 };
  }
  synonyms.add(words);
  console.dir(synonyms.roots);
  return {
    success: true,
    message: "Words added successfully",
    responseCode: 200,
  };
};

const findSynonymsHandler = ({ word }) => {
  if (!word) {
    return { success: true, message: "No word in request", responseCode: 200 };
  }
  const synonymsForWord = synonyms.findAllSynonyms(word);

  return synonymsForWord.length === 0
    ? {
        success: false,
        message: `No synonyms found for ${word}`,
        responseCode: 200,
      }
    : {
        success: true,
        message: `Successfully found synonyms for ${word}`,
        synonyms: synonymsForWord,
        responseCode: 200,
      };
};

const handlers = {
  "/add": addSynonymsHandler,
  "/find": findSynonymsHandler,
};

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type",
  },
};

Bun.serve({
  port: 8080,
  async fetch(req) {
    if (req.method === "OPTIONS") {
      const res = new Response("Departed", CORS_HEADERS);
      return res;
    }
    const url = new URL(req.url);
    if (handlers[url.pathname]) {
      const body = await req.json();
      const response = handlers[url.pathname](body);
      const res = new Response(JSON.stringify(response), {
        status: response.responseCode,
      });
      res.headers.set("Content-Type", "application/json");
      res.headers.set("Access-Control-Allow-Origin", "*");
      res.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST");
      return res;
    }

    const res = new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404 }
    );
    res.headers.set("Content-Type", "application/json");
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST");
    return res;
  },
});
