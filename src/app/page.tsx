"use client"

// shifted all imports in a separate file
import { ChangeEvent, motion, useEffect, useState, CardComponents, genres, headingAnimation } from "./_imports"


export default function Home() {
  const [movieOrSeriesData, setMovieOrSeriesData] = useState<TMovie[]>([]);
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
        .then((data) => setMovieOrSeriesData(data["data"]["results"]))
        .catch((error) => console.log(error))
    }
    getMoviesOrSeries();
  }, [])


  // Array retrieved after searching items from search box and setting the genre from dropdown.
  const searchedFilteredItems = movieOrSeriesData.filter((data) => {
    if (genreId !== undefined) {
      return data.original_title.toLowerCase().includes(searchItem.trim().toLowerCase()) && data.genre_ids.includes(genreId)
    } else if (genreId === undefined) {
      return data.original_title.toLowerCase().includes(searchItem.trim().toLowerCase())
    }
  })

  console.log(genreId)
  console.log(genre)


  return (
    <>
      {/* NAVBAR START */}
      <nav className="py-6 px-8 border-b-2 border-zinc-600 flex flex-row items-center justify-around">
        <h1 className="text-black text-2xl font-bold">Movies App</h1>

        <div className="flex flex-row gap-x-2 items-center">
          <input
            type="text"
            placeholder="Search any movie or series..."
            className="bg-black placeholder:text-zinc-300 placeholder:text-sm px-5 py-1 rounded-lg text-white"
            value={searchItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)}
          />

          {/* input and dropdown */}
          <div className="bg-gray-200 px-5 py-1 rounded-lg">
            <label htmlFor="genre">Choose genre: </label>
            <select
              id="genre"
              value={genre}
              defaultValue={`showAll`}
              onChange={(e) => setGenre(e.target.value)}
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
        {movieOrSeriesData.length > 0 ? (
          searchedFilteredItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-y-20 place-items-center">
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