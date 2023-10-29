import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY as string;

export async function GET() {
  const data = await fetch('https://www.omdbapi.com/?apikey=' + apiKey + '&s=man&type=series')
    .then((resp) => resp.json());

  return NextResponse.json({data});
}