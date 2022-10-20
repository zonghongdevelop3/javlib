import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { selectDetail, selectMovie } from "../../features/movieSlice";

import SuggestList from "../../components/SuggestList";
import Zoom from "react-reveal/Zoom";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
  resetGrid,
} from "../../features/gridSlice";
import { EyeIcon } from "@heroicons/react/outline";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import { fetchMoviesDetailsWithSuggest } from "../../utils/fetchmovies";
import { pageCount } from "../../utils/helpers";

function ModieDetails({ all, suggest, movieDetail }) {
  const router = useRouter();
  const movieDBURL = process.env.NEXT_PUBLIC_BASE_SOURCE_WEB_URL;
  const [actress, setActress] = useState(null);

  useEffect(() => {
    const actorArray =
      movieDetail.actor !== null && movieDetail.actor?.split("/");
    const actorIdInArray =
      movieDetail.actorid !== null && movieDetail.actorid?.split("/");
    // const actor = actorArray.map((e, i) => [
    //   { name: e },
    //   { actorid: actorIdInArray[i] },
    // ]);
    const actor = actorArray.map((e, i) => [
      { name: e, actorid: actorIdInArray[i] },
    ]);
    setActress(actor);
    console.log("actor", actor);
  }, [movieDetail]);

  const actorId = movieDetail.actorid;

  const movieID = movieDetail.id.toLocaleUpperCase();
  const moviesource = `${movieDBURL}/${movieID}`;
  const actorImg = `${movieDBURL}/pics/actress/${actorId}_a.jpg`;

  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);
  const movies = useSelector(selectDetail);
  const all_movie = useSelector(selectMovie);
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

  const name = all_movie ? getUniqueName() : null;
  const keywords = all_movie ? getUniqueKeywords() : null;

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
    if (Value === "") setSearchResults(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key]?.toString().toLocaleUpperCase().includes(Value)
        );
      });
      setSearchResults(filteredData);
    }
  };

  useEffect(() => {
    const initialfilter = () => {
      setSearchResults(
        dataList?.filter((collection) => collection.actor?.includes(name[0]))
      );
      setActiveKeyword("");
      setActiveName("");
      setActiveSeries("");
      setShowSuggest(true);
    };
    initialfilter();
  }, [dataList, movies]);

  useEffect(() => {
    setActiveImage(imageList[0]);
  }, [imageList]);
  // console.log(movieDetail.bigimageurl.slice(22));

  return (
    <>
      <Zoom bottom>
        <div className="p-1">
          <Head>
            <title>
              Movie || {movieDetail.title} || {movieDetail.id}
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
                      src={movieDetail?.bigimageurl}
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
                <div className="w-full">
                  <h2 className="text-center text-xl tracking-widest mb-2">
                    Actress
                  </h2>
                  <div className="place-items-center  mb-10 w-full  my-1 grid grid-flow-row-dense grid-cols-3 xl:grid-cols-5">
                    {actress &&
                      actress?.map((actor, idx) => (
                        <div key={idx}>
                          {actor?.map((value, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                            ${
                              value.name == activeName &&
                              "bg-gray-500 text-white font-bold"
                            }`}
                              onClick={() => filterData(value.name, "name")}
                            >
                              <div className="flex flex-col items-center justify-center relative">
                                <Image
                                  src={`${movieDBURL}/pics/actress/${value.actorid}_a.jpg`}
                                  alt="actress"
                                  height={200}
                                  width={200}
                                  objectFit="contain"
                                  quality={30}
                                  className="object-contain"
                                />
                                <p className="my-2">{value.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl tracking-widest mb-4">Director</h2>
                  <div
                    className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                  ${activeDirector && "bg-gray-500 text-white font-bold"}`}
                    onClick={() => filterData(movies?.director, "director")}
                  >
                    <p className="tracking-widest">{movies?.director}</p>
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
                    href={moviesource}
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
            Suggest Movie ({suggest?.length > 0 && suggest?.length} movies)
          </h1>
          <div
            className={`px-5 my-10 grid grid-flow-row-dense
       ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
       ${grid2 && "md:grid-cols-2"}
       ${grid3 && "md:grid-cols-3"}
       ${grid5 && "md:grid-cols-5"}

       `}
          >
            {!showSuggest && searchResults ? (
              <>
                {suggest?.map((collection) => (
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
                    actorid={collection?.actorid}
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
                      actorid={collection?.actorid}
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
  const movieRes = await fetch(process.env.NEXT_PUBLIC_BASE_MOVIE_URL);
  const data = await movieRes.json();

  let totalMovieCount = pageCount(data.length);

  // totalMovieCount number convert into a array
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

  const movieRes = await fetch(process.env.NEXT_PUBLIC_BASE_MOVIE_URL);
  const data = await movieRes.json();
  const movieDetailsRes = await fetchMoviesDetailsWithSuggest(id);
  const movieDetail = movieDetailsRes.movies;
  const suggest = movieDetailsRes.suggest;

  const initialData = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  return {
    props: { all: initialData, movieDetail: movieDetail, suggest, suggest },
  };
}
