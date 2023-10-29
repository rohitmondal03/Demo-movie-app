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
        className="w-[27vw] h-fit border-2 border-zinc-500 p-3 rounded-xl space-y-7 flex flex-col items-center justify-center text-center backdrop-blur-[100px] backdrop-brightness-[0.95] shadow-zinc-500 shadow-[20px_20px_30px] transition ease-out hover:shadow-[0px_0px_20px] hover:translate-x-16 hover:translate-y-16"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold mb-5">{original_title}</h1>
          <h1><span className="font-bold">Released:</span> {release_date}</h1>
          <h1><span className="font-bold">Popularity:</span> {popularity}</h1>
          <h1><span className="font-bold">Overview:</span> {overview}</h1>
          <h1><span className="font-bold">Vote average:</span> {vote_average}</h1>
          <h1><span className="font-bold">Vote Count:</span> {vote_count}</h1>
        </div>

        <div className="space-x-3">
          {genreList.map((genre, idx: number) => (
            <span
              key={idx}
              className="border-2 border-red-600 rounded-lg p-1"
            >
              {genre}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  )
}