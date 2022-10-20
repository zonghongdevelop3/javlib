import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  clearFilters,
  navDetail,
  selectMovie,
  updateFilter,
} from "../features/movieSlice";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";

function SuggestList({
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
  resultCode,
  studio,
  director,
  allDataisTrue,
  releasedate,
  actorid,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const nameInArray = name?.split("/");
  const genreInArray = genre?.split(" ");
  const extraimageurlInArray = extraimageurl?.split(";");
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
        director,
        actorIdInArray,
        allDataisTrue,
      })
    );
    if (allDataisTrue) {
      router.push(`/detailsall`);
    } else {
      router.push(`/details/${id}`);
    }
  };
  if (image == null) return false;
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
              quality="45"
              alt="poster"
              objectFit="contain"
              aria-hidden="true"
            />
          )}

          <div className="p-2">
            <div className="flex space-x-4">
              <div>
                <h1 className="my-1">{code}</h1>
              </div>

              <div className="space-x-4  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                {nameInArray?.slice(0, 3).map((name) => (
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
              {genreInArray?.slice(0, 8).map((genre) => (
                <div key={genre}>
                  <p className="text-white text-xs">{genre}</p>
                </div>
              ))}
            </div>
            <div className="font-bold text-gray-500">{releasedate}</div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default SuggestList;
