export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("q") || "crypto";

  const token = process.env.TWITTER_BEARER;

  const r = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=${search}&tweet.fields=public_metrics&max_results=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const data = await r.json();
  return Response.json(data);
}
