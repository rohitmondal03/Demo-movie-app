"use client"

import { useState, useEffect, ChangeEvent, useCallback } from "react"
import { motion } from "framer-motion";

import { headingAnimation } from "@/components/animation";
import SearchedItems from "@/components/SearchedItems";


export default function Home() {
  const [movieOrSeriesData, setMovieOrSeriesData] = useState<TMovie[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [type, setType] = useState<string>("movies")


  // side effect to fetch data from api everytime page is rendered.
  useEffect(() => {
    async function getMoviesOrSeries() {
      await fetch(`/api/get${type}`)
        .then((resp) => resp.json())
        .then((data) => setMovieOrSeriesData(data.data.Search))
        .catch((error) => console.log(error))
    }
    getMoviesOrSeries();
  }, [type])


  // Array retrieved after searching items from search box.
  const searchedFilteredItems =  movieOrSeriesData.filter((data) => {
    return data.Title.toLowerCase().includes(searchItem.trim().toLowerCase())
  })


  return (
    <>
      {/* NAVBAR START */}
      <nav className="py-6 px-8 border-b-2 border-zinc-600 flex flex-row items-center justify-around">
        <h1 className="text-black text-2xl font-bold">Movies App</h1>

        <div className="flex flex-row gap-x-4 items-center">
          <input
            type="text"
            placeholder="Search any movie or series..."
            className="bg-black placeholder:text-zinc-300 placeholder:text-sm px-5 py-1 rounded-lg text-white"
            value={searchItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)}
          />

          <div className="bg-gray-300 px-5 py-1 rounded-lg">
            <label htmlFor="type">Choose type: </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="series">Series</option>
              <option value="movies">Movies</option>
            </select>
          </div>
        </div>
      </nav>
      {/* NAVBAR END */}

      {/* MAIN CONTENT */}
      <section className={`container py-20 px-10 h-fit space-y-20`}>
        <motion.h1
          variants={headingAnimation}
          initial="hidden"
          animate="show"
          className="text-center text-4xl font-bold text-zinc-500 underline decoration-black"
        >
          {type === "movies" ? (
            <span>Movie </span>
          ) : (
            <span>Series </span>
          )}
          Collection
        </motion.h1>

        {/* if length of array received is > 0, then only render items in screen */}
        {movieOrSeriesData.length > 0 ? (
          searchedFilteredItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-y-10 place-items-center">
              {searchedFilteredItems.map((data, index: number) => (
                <SearchedItems
                  key={index}
                  Poster={data.Poster}
                  Title={data.Title}
                  Type={data.Type}
                  Year={data.Year}
                  imdbID={data.imdbID}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-2xl font-semibold">No items matched...</h1>
          )
        ) : (
          // "Loading" text when data is being fetched
          <h1 className="text-center text-3xl font-bold">Loading...</h1>
        )}
      </section>
    </>
  )
}