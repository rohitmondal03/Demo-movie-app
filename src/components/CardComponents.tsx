import { motion } from "framer-motion"

import { childDivAnimations } from "../constants/animation"
import { genres } from "@/constants/genres";
import { useEffect, useState } from "react";


type TProps = {
  index: number
} & TMovie


export default function CardComponents(props: TProps) {
  const [genreList, setGenreList] = useState<string[]>([]);

  const {
    index,
    original_title,
    overview,
    popularity,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
  } = props;


  // code to get genres from genre IDs
  function getGenres() {
    let result: string[] = [];

    genres.forEach((genre) => {
      if (genre_ids.includes(genre.id)) result.push(genre.name);
    })
    setGenreList(result)
  }

  useEffect(() => {
    getGenres()
  }, [])


  return (
    <>
      <motion.div
        variants={childDivAnimations}
        initial="hidden"
        animate="show"
        custom={index}
        // sm:backdrop-brightness-[.95]
        className="backdrop-blur-3xl bg-opacity-5 backdrop-brightness-95 sm:backdrop-brightness-[.95] text-center border-2 border-zinc-500 shadow-[0px_0px_40px] p-2 rounded-xl space-y-5 bg-white"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold mb-5">{original_title}</h1>
          <h1><span className="font-bold">Released:</span> {release_date}</h1>
          <h1><span className="font-bold">Popularity:</span> {popularity}</h1>
          <h1><span className="font-bold">Overview:</span> {overview.slice(0, 250)}</h1>
          <h1><span className="font-bold">Vote average:</span> {vote_average}</h1>
          <h1><span className="font-bold">Vote Count:</span> {vote_count}</h1>
        </div>

        <div className="space-x-3 space-y-2">
          {genreList.map((genre, idx: number) => (
            <span
              key={idx}
              className="border-2 border-red-600 rounded-lg p-1 inline-block"
            >
              {genre}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  )
}