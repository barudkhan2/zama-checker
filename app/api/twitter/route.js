export async function GET(req) {
  const token = process.env.TWITTER_BEARER;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "crypto";

  const r = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await r.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
