import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import {
  clearFilters,
  navDetail,
  selectMovie,
  updateFilter,
} from "../features/movieSlice";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";

function ResultList({
  key,
  id,
  code,
  image,
  extraimageurl,
  name,
  title,
  publisher,
  genre,
  series,
  sourceurl,
  studio,
  releasedate,
  rating,
  director,
  actorid,
  allDataisTrue,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [blur, setBlur] = useState(null);

  const nameInArray = name !== null && name?.split("/");
  const genreInArray = genre !== null && genre?.split(" ");
  const extraimageurlInArray =
    extraimageurl !== null && extraimageurl?.split(";");
  const actorIdInArray = actorid !== null && actorid?.split("/");
  const navToDetails = () => {
    dispatch(
      navDetail({
        id,
        code,
        image,
        nameInArray,
        genreInArray,
        title,
        publisher,
        series,
        extraimageurlInArray,
        sourceurl,
        studio,
        releasedate,
        rating,
        director,
        actorIdInArray,
      })
    );
    if (allDataisTrue) {
      router.push(`/detailsall`);
    } else {
      router.push(`/details/${id}`);
    }
  };

  return (
    <>
      <Fade bottom>
        <div
          key={key}
          className="p-2 group cursor-pointer transition duration-200 z-30 ease-in transform sm:hover:scale-105 hover:z-50"
        >
          {image && (
            <Image
              onClick={navToDetails}
              src={image}
              layout="responsive"
              height={800}
              width={800}
              alt="poster"
              className="object-contain"
              aria-hidden="true"
              quality={45}
              loading="lazy"
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwePSwuJDJJQExLR0BGRVBac2JQVW1WRUZkiGVtd3uBgoFOYI2XjH2Wc36BfP/bAEMBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIACUAMgMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAwEEBQIG/8QAHxAAAgMAAgMBAQAAAAAAAAAAAAECAxEEEiExQRNh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APZi5zSFyt8FW2/PoFp2ImNiMqXKx+yYcrfoGwponsjOhfv0crQLXYCt+gAcT3Clemakq/BWtp0DFsUtJrUtNCXG1+jqHG/gCqkyzHTuFGDFWAryA7oAFtoVNIAAV1R1GKAAO1FE4AARgAAH/9k="
              }
            />
          )}

          <div className="p-2">
            <div className="flex space-x-4">
              <div>
                <h1 className="my-1">{code}</h1>
              </div>

              <div className="space-x-4  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                {nameInArray &&
                  nameInArray?.slice(0, 3)?.map((name) => (
                    <div key={name}>
                      <h1 className="">{name}</h1>
                    </div>
                  ))}
              </div>
            </div>
            <h2 className=" line-clamp-1 mt-1 text-lg text-white transition-all duration-100 ease-in group-hover:font-bold ">
              {title}
            </h2>

            <div className="my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
              {genreInArray &&
                genreInArray?.slice(0, 8)?.map((genre) => (
                  <div key={genre}>
                    <p className="text-white text-xs">{genre}</p>
                  </div>
                ))}
            </div>
            <div className="flex items-center space-x-4">
              {rating > 0 && (
                <div className="flex items-center space-x-2">
                  <AiOutlineFire className="w-4 h-4 text-yellow-500" />
                  {rating}
                </div>
              )}
              <div className="font-bold text-gray-500">{releasedate}</div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default ResultList;
