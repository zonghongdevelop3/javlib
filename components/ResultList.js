import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
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
  allDataisTrue,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const nameInArray = name !== null && name?.split("/");
  const genreInArray = genre !== null && genre?.split(" ");
  const extraimageurlInArray =
    extraimageurl !== null && extraimageurl?.split(";");

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
      })
    );
    if (!allDataisTrue) {
      router.push(`/details/${id}`);
    } else {
      router.push(`/detailsall`);
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
              alt="poster"
              className="object-contain"
              aria-hidden="true"
              quality={45}
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
