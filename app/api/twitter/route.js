import { NextResponse } from "next/server";


export async function GET(request) {
try {
const bearer = process.env.TWITTER_BEARER;
if (!bearer) {
return NextResponse.json({ error: "TWITTER_BEARER missing on server" }, { status: 500 });
}


const { searchParams } = new URL(request.url);
const username = searchParams.get("username") || "zama"; // default


// Twitter v2 user by username endpoint
const endpoint = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=public_metrics,verified,description`;


const resp = await fetch(endpoint, {
headers: {
Authorization: `Bearer ${bearer}`,
},
});


const data = await resp.json();


// propagate Twitter's status code when possible
const status = resp.ok ? 200 : (resp.status || 500);
return NextResponse.json(data, { status });
} catch (err) {
return NextResponse.json({ error: err.message }, { status: 500 });
}
}
