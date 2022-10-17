import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { selectDetail, selectMovie } from "../../../../features/movieSlice";
import SuggestList from "../../../../components/SuggestList";
import Zoom from "react-reveal/Zoom";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
  resetGrid,
} from "../../../../features/gridSlice";
import { EyeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { pageCount, filterAllData } from "../../../../utils/helpers";
import { show_per_page } from "../../../../config";

function ModieDetails({ params, moviesData, totalMovieCount, totalMovies }) {
  let pageIntoArray = Array.from(Array(totalMovieCount).keys());

  const router = useRouter();
  const moviesDB = JSON.parse(moviesData);

  const currentParam = router.query.filter;
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
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moviesData) {
      setLoading(true);
    } else {
      setLoading(false);
      setMovie(moviesData);
    }
  }, [moviesData]);

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

  const name = movies ? getUniqueName() : null;
  const keywords = movies ? getUniqueKeywords() : null;

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
            Suggest Movie ({totalMovies > 0 && totalMovies} movies)
          </h1>
          <div
            className={`px-5 my-10 grid grid-flow-row-dense
       ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
       ${grid2 && "md:grid-cols-2"}
       ${grid3 && "md:grid-cols-3"}
       ${grid5 && "md:grid-cols-5"}

       `}
          >
            {loading ? (
              <p className="text-lg tracking-widest font-bold text-center">
                Loading...
              </p>
            ) : (
              <>
                {moviesDB?.map((collection) => (
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

          <nav className="w-full overflow-hidden pb-2">
            <ul className="overflow-x-scroll flex flex-row items-center justify-items-center space-x-8 mx-8">
              {pageIntoArray.map((page) => {
                return (
                  <li key={page} className="page-item p-2">
                    <Link
                      href={
                        page === 0
                          ? `/detailsall/${currentParam}`
                          : `/detailsall/${currentParam}/page/${page + 1}`
                      }
                    >
                      <a className="page-link">{page + 1}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Zoom>
    </>
  );
}

export default ModieDetails;
export async function getStaticPaths() {
  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
  );
  const data = await movieRes.json();

  let totalMovieCount = pageCount(data.length);

  // totalMovieCount number convert into a array
  let pageIntoArray = Array.from(Array(totalMovieCount).keys());

  let paths = [];

  pageIntoArray.map((path) =>
    paths.push({
      params: { filter: `${path}`, page: `${path + 1}` },
    })
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const value = params.filter;

  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
  );
  const data = await movieRes.json();

  const sortData = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );

  const filteredData = filterAllData(sortData, value);
  let totalMovieCount = pageCount(filteredData.length);
  const totalMovies = filteredData?.length;

  let totalMovie;
  if (Number(params.page) == 1) {
    totalMovie = filteredData.slice(show_per_page, show_per_page);
  }
  if (Number(params.page) == 2) {
    totalMovie = filteredData.slice(show_per_page, show_per_page * params.page);
  }

  if (Number(params.page) > 2) {
    totalMovie = filteredData.slice(
      show_per_page * params.page - show_per_page,
      show_per_page * params.page
    );
  }
  return {
    props: {
      moviesData: JSON.stringify(totalMovie),
      totalMovieCount,
      totalMovies,
      params: params,
    },
    revalidate: 60,
  };
}
