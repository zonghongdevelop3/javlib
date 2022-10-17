import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectDetail } from "../../features/movieSlice";
import Zoom from "react-reveal/Zoom";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
} from "../../features/gridSlice";

import { EyeIcon } from "@heroicons/react/outline";
const Header = dynamic(() => import("../../components/Header"));
const SuggestList = dynamic(() => import("../../components/SuggestList"));
const Pagination = dynamic(() => import("../../components/Pagination"));

import {
  fetchMoviesDetailsWithSuggest,
  fetchMovies,
} from "../../utils/fetchmovies";
import { pageCount } from "../../utils/helpers";

function ModieDetails({ movieDetails, suggestMovie, all }) {
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);
  const movies = useSelector(selectDetail);
  const dataList = all;
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
  const [showSuggest, setShowSuggest] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const excludeColumns = [];
  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = searchResults?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let newImageList = [];
    const extraimageurlInArray =
      movieDetails?.extraimageurl !== null &&
      movieDetails?.extraimageurl?.split(";");
    newImageList.push(movieDetails?.image, ...extraimageurlInArray);
    setImageList(newImageList);
  }, [movieDetails]);

  const getUniqueName = () => {
    const nameInArray =
      movieDetails.actor !== null && movieDetails.actor?.split("/");

    let unique = nameInArray?.map((name) => name);

    unique = unique?.flat();

    return [...new Set(unique)];
  };

  const getUniqueKeywords = () => {
    let unique = movies.genreInArray?.map((name) => name);
    unique = unique?.flat();

    return [...new Set(unique)];
  };

  const name = movieDetails ? getUniqueName() : null;
  const keywords = movieDetails ? getUniqueKeywords() : null;

  useEffect(() => {
    let newImageList = [];

    newImageList.push(movies.image, ...movies?.extraimageurlInArray);
    setImageList(newImageList);
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
      console.log("name", value.toString());
      setActiveName(value);
      setActiveKeyword("");
      setActiveSeries("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio("");
    }
    if (item === "director") {
      console.log("name", value.toString());
      setActiveDirector(value);
      setActiveKeyword("");
      setActiveSeries("");
      setActiveCode("");
      setActiveName("");
      setActiveStudio("");
    }
    if (item === "keywords") {
      console.log("keywords", value.toString());
      setActiveKeyword(value);
      setActiveName("");
      setActiveSeries("");
      setActiveCode("");
      setActiveDirector("");
      setActiveStudio("");
    }
    if (Value === "") {
      setSearchResults(false);
      setSearchResults(suggestMovie);
    } else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key]?.toString().toLocaleUpperCase().includes(Value)
        );
      });
      setShowSuggest(true);
      setSearchResults(filteredData);
    }
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
              Movie || {movieDetails.title} || {movieDetails.id}
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
                        filterData(movieDetails.id.substring(0, 4), "code")
                      }
                    >
                      {movieDetails.id}
                    </span>
                    {movieDetails.title}
                  </h1>
                </div>
                {movieDetails?.series && (
                  <div
                    onClick={() => filterData(movieDetails.series, "series")}
                    className={`text-xl flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                           ${
                             activeSeries && "bg-gray-500 text-white font-bold"
                           }`}
                  >
                    <h1 className="cursor-pointer line-clamp-1 lg:line-clamp-none">
                      {movieDetails.series}
                    </h1>
                  </div>
                )}
                {movieDetails?.studio && (
                  <div
                    onClick={() => filterData(movieDetails?.studio, "studio")}
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
                    onClick={() =>
                      filterData(movieDetails?.director, "director")
                    }
                  >
                    {movieDetails?.director}
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
                    href={movieDetails?.sourceurl}
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
          {showSuggest ? (
            <h1 className=" text-center text-2xl lg:text-4xl font-medium">
              Suggest Movie (
              {searchResults?.length > 0 && searchResults?.length}
              movies)
            </h1>
          ) : (
            <h1 className=" text-center text-2xl lg:text-4xl font-medium">
              Suggest Movie ({suggestMovie?.length > 0 && suggestMovie?.length}
              movies)
            </h1>
          )}
          <div
            className={`px-5 my-10 grid grid-flow-row-dense
       ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
       ${grid2 && "md:grid-cols-2"}
       ${grid3 && "md:grid-cols-3"}
       ${grid5 && "md:grid-cols-5"}

       `}
          >
            {!showSuggest && suggestMovie ? (
              <>
                {suggestMovie?.map((collection) => (
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
              </>
            ) : (
              <>
                {showSuggest &&
                  currentMovie?.map((collection) => (
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
              </>
            )}
          </div>
          {showSuggest && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={searchResults?.length}
              paginate={paginate}
            />
          )}
        </div>
      </Zoom>
    </>
  );
}

export default ModieDetails;
export async function getStaticPaths() {
  const data = await fetchMovies();
  let totalMovieCount = pageCount(data.length);
  let pageIntoArray = Array.from(Array(totalMovieCount).keys());
  let paths = [];

  pageIntoArray.map((path) =>
    paths.push({
      params: { id: `${path}` },
    })
  );

  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const id = params.id;
  const all = await fetchMovies();

  const data = await fetchMoviesDetailsWithSuggest(id);
  const movies = data.movies[0];
  const suggestMovie = data.suggest;

  return {
    props: { movieDetails: movies, suggestMovie: suggestMovie, all: all },
  };
}
