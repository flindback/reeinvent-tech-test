import { SynonymsService } from "./synonyms";

const synonyms = new SynonymsService();

const addSynonymsHandler = ({ words = [] }) => {
  if (!words.length) {
    return { success: false, message: "No words to add", responseCode: 400 };
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
    return { success: false, message: "No word in request", responseCode: 400 };
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

const allowedOrigins = [
  "https://reeinvent-tech-test.vercel.app",
  "http://localhost:5173",
];

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type",
  },
};

const handlers = {
  "/add": addSynonymsHandler,
  "/find": findSynonymsHandler,
};

const setCorsHeaders = (res, origin) => {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
};

Bun.serve({
  port: 8080,
  async fetch(req) {
    if (req.method === "OPTIONS") {
      const res = new Response("Departed", CORS_HEADERS);
      return res;
    }
    const origin = req.headers.get("Origin") || req.headers.get("Referer");
    console.log("Have origin, is:", origin);
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }
    const url = new URL(req.url);
    if (handlers[url.pathname]) {
      const body = await req.json();
      const response = handlers[url.pathname](body);
      const res = new Response(JSON.stringify(response), {
        status: response.responseCode,
      });
      setCorsHeaders(res, origin);
      return res;
    }

    const res = new Response(
      JSON.stringify({ success: false, message: "Not found" }),
      { status: 404 }
    );
    setCorsHeaders(res, origin);
    return res;
  },
});
