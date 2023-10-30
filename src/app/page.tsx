"use client"

// shifted all imports in a separate file
import { ChangeEvent, motion, useEffect, useState, CardComponents, genres, headingAnimation } from "./_imports"


export default function Home() {
  const [movieData, setMovieData] = useState<TMovie[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [genre, setGenre] = useState<TGenre["name"]>("")
  const [genreId, setGenreId] = useState<TGenre["id"]>()


  // side effect for setting the correct genre ID ==> to show items of particular genre only if selected
  useEffect(() => {
    function gettingGenreId() {
      // for getting genre id
      let genreId: number | undefined = undefined;

      genres.forEach((genreItem) => {
        if (genreItem.name === genre) {
          genreId = genreItem.id;
        }
      })
      setGenreId(genreId)
    }

    gettingGenreId();
  }, [genre])


  // side effect to fetch data from api everytime page is rendered.
  useEffect(() => {
    async function getMoviesOrSeries() {
      await fetch(`/api/getmovies`)
        .then((resp) => resp.json())
        .then((data) => setMovieData(data["data"]["results"]))
        .catch((error) => console.log(error))
    }
    getMoviesOrSeries();
  }, [])


  // Array retrieved after searching items from search box and setting the genre from dropdown.
  const searchedFilteredItems = movieData.filter((data) => {
    if (genreId !== undefined) {
      return data.original_title.toLowerCase().includes(searchItem.trim().toLowerCase()) && data.genre_ids.includes(genreId)
    } else if (genreId === undefined) {
      return data.original_title.toLowerCase().includes(searchItem.trim().toLowerCase())
    }
  })


  return (
    <>
      {/* NAVBAR START */}
      <nav className="py-6 px-8 border-b-2 border-zinc-600 flex flex-col lg:flex-row gap-y-10 sm:gap-y-5 lg:gap-0 items-center justify-around bg-black text-white">
        <h1 className="text-3xl sm:text-2xl font-bold">Movies App</h1>

        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-2 items-center">
          <input
            type="text"
            placeholder="Search any movie or series..."
            className="bg-zinc-700 placeholder:text-zinc-300 placeholder:text-sm px-5 py-1 rounded-lg text-white"
            value={searchItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)}
          />

          {/* input and dropdown */}
          <div className="bg-white px-5 py-1 rounded-lg">
            <label htmlFor="genre" className="text-black">Choose genre: </label>
            <select
              id="genre"
              value={genre}
              defaultValue={`showAll`}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-white text-black"
            >
              <option value="showAll">Show All</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>
      {/* NAVBAR END */}


      {/* MAIN CONTENT */}
      <section className={`py-20 px-5 sm:px-10 h-fit w-full space-y-20 flex flex-col items-center justify-center`}>
        <motion.h1
          variants={headingAnimation}
          initial="hidden"
          animate="show"
          className="text-center text-4xl font-bold text-zinc-800 underline decoration-black"
        >
          Movie Collection
        </motion.h1>

        {/* if length of array received is > 0, then only render items in screen */}
        {movieData.length > 0 ? (
          searchedFilteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center">
              {searchedFilteredItems.map((data, index: number) => (
                <CardComponents
                  key={index}
                  original_title={data.original_title}
                  release_date={data.release_date}
                  overview={data.overview}
                  popularity={data.popularity}
                  vote_average={data.vote_average}
                  vote_count={data.vote_count}
                  genre_ids={data.genre_ids}
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