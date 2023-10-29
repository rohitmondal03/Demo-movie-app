import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;

export async function GET() {
  const data = await fetch('https://www.omdbapi.com/?apikey=' + apiKey + '&s=flying&type=movie')
    .then((resp) => resp.json());

  return NextResponse.json({data});
}