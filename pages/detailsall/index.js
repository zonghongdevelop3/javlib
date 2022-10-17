import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { selectDetail, selectMovie } from "../../features/movieSlice";
const SuggestList = dynamic(() => import("../../components/SuggestList"));
const Pagination = dynamic(() => import("../../components/Pagination"));

import Zoom from "react-reveal/Zoom";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
  resetGrid,
} from "../../features/gridSlice";
import { addMovie } from "../../features/movieSlice";
import { EyeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function ModieDetails() {
  const router = useRouter();
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);
  const movies = useSelector(selectDetail);
  const [imageList, setImageList] = useState([]);
  const [activeImage, setActiveImage] = useState(imageList[0]);
  const [activeCode, setActiveCode] = useState("");
  const [activeSeries, setActiveSeries] = useState("");
  const [activeName, setActiveName] = useState("");
  const [activeDirector, setActiveDirector] = useState("");
  const [activeStudio, setActiveStudio] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("all");
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [searchResults, setSearchResults] = useState([]);

  const excludeColumns = [];
  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = searchResults?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getUniqueName = () => {
    let unique = movies.nameInArray?.map((name) => name);

    unique = unique.flat();

    return [...new Set(unique)];
  };

  const getUniqueKeywords = () => {
    let unique = movies.genreInArray?.map((name) => name);
    unique = unique.flat();

    return [...new Set(unique)];
  };

  const name = <movies></movies> ? getUniqueName() : null;
  const keywords = <movies></movies> ? getUniqueKeywords() : null;

  useEffect(() => {
    let newImageList = [];

    newImageList.push(movies.image, ...movies?.extraimageurlInArray);
    setImageList(newImageList);
  }, [movies]);

  useEffect(() => {
    const fetchAllData = async () => {
      const movieRes = await fetch(
        "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
      );
      await movieRes.json().then((data) => {
        const sortData = data
          .slice()
          .sort(
            (b, a) =>
              new Date(a?.releasedate).getTime() -
              new Date(b?.releasedate).getTime()
          );

        const suggest = sortData?.filter((collection) =>
          collection.actor?.includes(name[0])
        );
        setSearchResults(suggest);
        setActiveKeyword("");
        setActiveName("");
        setActiveSeries("");
      });
    };
    fetchAllData();
  }, [movies]);

  const filterData = (value, item) => {
    const Value = value.toLocaleUpperCase().trim();
    if (item === "code") {
      setActiveCode(value);
      setActiveSeries("");
      setActiveName("");
      setActiveKeyword("");
      setActiveDirector("");
      setActiveStudio("");
    }

    if (item === "series") {
      setActiveSeries(value);
      setActiveName("");
      setActiveKeyword("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio("");
    }
    if (item === "studio") {
      setActiveSeries("");
      setActiveName("");
      setActiveKeyword("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio(value);
    }
    if (item === "name") {
      setActiveName(value);
      setActiveKeyword("");
      setActiveSeries("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio("");
    }
    if (item === "director") {
      setActiveDirector(value);
      setActiveKeyword("");
      setActiveSeries("");
      setActiveCode("");
      setActiveName("");
      setActiveStudio("");
    }
    if (item === "keywords") {
      setActiveKeyword(value);
      setActiveName("");
      setActiveSeries("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio("");
    }
    router.push(`/detailsall/${Value}`);
  };

  useEffect(() => {
    setActiveImage(imageList[0]);
  }, [imageList]);

  return (
    <>
      <Zoom bottom>
        <div className="p-1">
          <Head>
            <title>
              Movie || {movies.title} || {movies.code}
            </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main className="mx-auto max-w-screen-lg">
            <div className="max-w-screen-xl mx-auto">
              <div className="">
                <div className="flex items-center justify-center w-full mb-4">
                  {activeImage ? (
                    <Image
                      className={
                        "w-full rounded-lg cursor-pointer object-contain"
                      }
                      width={800}
                      height={800}
                      objectFit="contain"
                      src={activeImage}
                      alt="poster/image"
                      quality={65}
                      loading="eager"
                      priority
                      aria-hidden="true"
                    />
                  ) : (
                    <Image
                      className={
                        "w-full rounded-lg cursor-pointer object-contain"
                      }
                      width={800}
                      height={800}
                      objectFit="fill"
                      src={movies?.image}
                      alt="poster/image"
                      quality={65}
                      loading="eager"
                      priority
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex flex-row items-center p-4 overflow-auto">
                  {imageList &&
                    imageList?.map((activeImg) => (
                      <div
                        key={activeImg}
                        className="mr-3 mb-3 cursor-pointer"
                        onClick={() => setActiveImage(activeImg)}
                      >
                        {activeImg ? (
                          <Image
                            className="rounded-md w-full cursor-pointer"
                            width={200}
                            height={200}
                            layout="fixed"
                            objectFit="contain"
                            src={activeImg}
                            alt=""
                            aria-hidden="true"
                            quality={30}
                            fallback={false}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div>
              <div className=" grid place-items-center mb-10 w-full">
                <div className="p-4">
                  <h1 className="text-lg lg:text-2xl">
                    <span
                      className={` hover:underline cursor-pointer mr-1
                     ${activeCode && "bg-gray-500 text-white font-bold"}`}
                      onClick={() =>
                        filterData(movies.code.substring(0, 4), "code")
                      }
                    >
                      {movies.code}
                    </span>
                    {movies.title}
                  </h1>
                </div>
                {movies.series && (
                  <div
                    onClick={() => filterData(movies.series, "series")}
                    className={`text-xl flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                           ${
                             activeSeries && "bg-gray-500 text-white font-bold"
                           }`}
                  >
                    <h1 className="cursor-pointer line-clamp-1 lg:line-clamp-none">
                      {movies.series}
                    </h1>
                  </div>
                )}
                {movies?.studio && (
                  <div
                    onClick={() => filterData(movies.studio, "studio")}
                    className={`text-xl flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                           ${
                             activeStudio && "bg-gray-500 text-white font-bold"
                           }`}
                  >
                    <h1 className="cursor-pointer line-clamp-1 lg:line-clamp-none">
                      {movies.studio}
                    </h1>
                  </div>
                )}
                <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                  {name &&
                    name?.map((value) => (
                      <div
                        key={value}
                        className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                  ${value == activeName && "bg-gray-500 text-white font-bold"}`}
                        onClick={() => filterData(value, "name")}
                      >
                        {value}
                      </div>
                    ))}
                  <div
                    className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                  ${activeDirector && "bg-gray-500 text-white font-bold"}`}
                    onClick={() => filterData(movies?.director, "director")}
                  >
                    {movies?.director}
                  </div>
                </div>
                <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                  {keywords &&
                    keywords?.map((value) => (
                      <div
                        key={value}
                        className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                    ${
                      value == activeKeyword &&
                      "bg-gray-500 text-white font-bold"
                    }`}
                        onClick={() => filterData(value, "keywords")}
                      >
                        {value}
                      </div>
                    ))}
                </div>
                <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4">
                  <a
                    target="_blank"
                    href={movies?.sourceurl}
                    rel="noopener noreferrer"
                  >
                    <div
                      className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer flex-col space-y-2
               `}
                    >
                      <EyeIcon className="w-6 h-6" />
                      <p>View Web</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div>
          <h1 className=" text-center text-2xl lg:text-4xl font-medium">
            Suggest Movie ({searchResults?.length > 0 && searchResults?.length}{" "}
            movies)
          </h1>
          <div
            className={`px-5 my-10 grid grid-flow-row-dense
       ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
       ${grid2 && "md:grid-cols-2"}
       ${grid3 && "md:grid-cols-3"}
       ${grid5 && "md:grid-cols-5"}

       `}
          >
            {currentMovie?.map((collection) => (
              <SuggestList
                key={collection?.id}
                id={collection?.id}
                code={collection?.id}
                image={collection?.bigimageurl}
                extraimageurl={collection?.extraimageurl}
                name={collection?.actor}
                title={collection?.title}
                genre={collection?.genre}
                publisher={collection?.studio}
                series={collection?.tag}
                filePath={collection?.filePath}
                sourceurl={collection?.sourceurl}
                resultCode={movies.code}
                allDataisTrue
                releasedate={collection?.releasedate}
              />
            ))}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={searchResults?.length}
            paginate={paginate}
          />
        </div>
      </Zoom>
    </>
  );
}

export default ModieDetails;
