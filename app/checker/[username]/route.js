import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const username = params.username;
  const token = process.env.TWITTER_BEARER;

  if (!token) return NextResponse.json({ error: "Missing TWITTER_BEARER" }, { status: 500 });

  const res = await fetch(
    `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=public_metrics,verified,description`,
    {
      headers: { Authorization: `Bearer ${token}`, "User-Agent": "zama-checker" }
    }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
