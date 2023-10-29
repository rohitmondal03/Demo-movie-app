import Image from "next/image"
import { motion } from "framer-motion"

import { childDivAnimations } from "./animation"


type TProps = {
  index: number
} & TMovie


export default function SearchedItems(props: TProps) {
  const { Poster, Title, Type, Year, imdbID, index } = props;

  return (
    <>
      <motion.div
        variants={childDivAnimations}
        initial="hidden"
        animate="show"
        custom={index}
        className="w-[27vw] h-[70vh] border-2 border-zinc-500 p-3 rounded-xl space-y-7 flex flex-col items-center justify-center text-center"
      >
        <div className="">
          <h1 className="text-2xl font-bold mb-5">{Title}</h1>
          <h1><span className="font-bold">Year Released:</span> {Year}</h1>
          <h1><span className="font-bold">Imdb Id:</span> {imdbID}</h1>
          <h1><span className="font-bold">Type:</span> {Type}</h1>
        </div>

        <Image
          src={Poster}
          alt="img"
          height={'100'}
          width={`200`}
          className="rounded-lg"
        />
      </motion.div>
    </>
  )
}