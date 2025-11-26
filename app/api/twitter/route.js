import { NextResponse } from "next/server";

export async function GET() {
  try {
    const bearer = process.env.TWITTER_BEARER;

    if (!bearer) {
      return NextResponse.json(
        { error: "Twitter bearer token missing" },
        { status: 500 }
      );
    }

    // Change the endpoint if needed
    const response = await fetch(
      "https://api.twitter.com/2/users/by/username/zama",
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
