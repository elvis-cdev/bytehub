import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export async function GET(req: Request) {
  console.log("AUTH GET HIT:", req.url);
  try {
    const res = await handlers.GET(req);
    console.log("AUTH GET RESPONSE STATUS:", res.status);
    return res;
  } catch (err) {
    console.error("AUTH GET ERROR:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export const POST = handlers.POST;
