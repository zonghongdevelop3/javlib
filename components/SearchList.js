import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";
import Fade from "react-reveal/Fade";
import { useState, useEffect } from "react";

function SearchList({
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
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeName, setActiveName] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");
  const nameInArray = name?.split("/");
  const genreInArray = genre?.split(" ");
  const extraimageurlInArray = extraimageurl?.split(";");

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
      })
    );
    router.push(`/details/${id}`);
  };

  return (
    <>
      <Fade bottom>
        <div
          key={key}
          onClick={navToDetails}
          className="p-2 flex items-center space-x-4 hover:bg-gray-800 text-black hover:text-white rounded-3xl"
        >
          <div>
            {image && (
              <Image
                layout="fixed"
                src={image}
                height="160"
                width="160"
                className=" object-contain"
                onClick={navToDetails}
                alt="img"
              />
            )}
          </div>
          <h1 onClick={navToDetails} className="">
            {code}
          </h1>
          <div className="flex space-x-4">
            {nameInArray.slice(0, 3).map((name) => (
              <div key={name}>
                <h1 className="">{name}</h1>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </>
  );
}

export default SearchList;
