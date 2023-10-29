import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;

export async function GET() {
  const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=' + apiKey)
    .then((resp) => resp.json());

  return NextResponse.json({ data });
}