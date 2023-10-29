"use client"

import { useState, useEffect, ChangeEvent, useRef } from "react"
import { motion } from "framer-motion";

import { headingAnimation } from "@/components/animation";
import SearchedItems from "@/components/SearchedItems";


export default function Home() {
  const [movieData, setMovieData] = useState<TMovie[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");


  // side effect to fetch data from api everytime page is rendered.
  useEffect(() => {
    async function getMovies() {
      await fetch("/api/getMovie")  // fetching data from api route handler for optimization
        .then((resp) => resp.json())
        .then((data) => setMovieData(data.data.Search))
    }
    getMovies();
  }, [])


  // Array retrieved after searching items from search box.
  const searchedFilteredItems = movieData.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchItem.trim().toLowerCase())
  })


  return (
    <>
      {/* NAVBAR START */}
      <nav className="py-6 px-8 border-b-2 border-zinc-600 flex flex-row items-center justify-around">
        <h1 className="text-black text-2xl font-bold">Movies App</h1>

        <div>
          <input
            type="text"
            placeholder="Search any movie or series..."
            className="bg-black placeholder:text-zinc-300 placeholder:text-sm px-5 py-1 rounded-lg text-white"
            value={searchItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)}
          />
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
          Movie Collection
        </motion.h1>

        {/* if length of array received is > 0, then only render items in screen */}
        {movieData.length > 0 ? (
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
          <h1 className="text-center text-3xl font-bold">Loading...</h1>
          // "Loading" text when data is being fetched
        )}
      </section>
    </>
  )
}