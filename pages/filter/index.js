import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { addMovie, selectMovie } from "../../features/movieSlice";
const SuggestList = dynamic(() => import("../../components/SuggestList"));
const Header = dynamic(() => import("../../components/Header"));

import { getUniqueValues, pageCount } from "../../utils/helpers";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Fade from "react-reveal/Fade";
import Pagination from "../../components/Pagination";
import PaginationActor from "../../components/PaginationActor";

function Index({ all_movie }) {
  const dispatch = useDispatch();
  // const all_movie = useSelector(selectMovie);

  const dataList = all_movie;
  const excludeColumns = [];
  const [activeKeyword, setActiveKeyword] = useState("all");
  const [activePublisher, setActivePublisher] = useState("all");
  const [activeName, setActiveName] = useState("all");

  const [showFilter, setShowFilter] = useState(true);
  const [showPublisher, setShowPublisher] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [filter, setFilter] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const publisher = all_movie ? getUniqueValues(all_movie, "studio") : null;
  const name = all_movie ? getUniqueValues(all_movie, "actor") : null;
  const keywords = all_movie ? getUniqueValues(all_movie, "genre") : null;

  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  // get current poster
  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = all_movie?.slice(indexOfFirstPost, indexOfLastPost);
  const filterCurrentMovie = searchResults?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const [currentactor, setCurrentActor] = useState(1);
  const [postsPerActor] = useState(50);
  // get current poster
  const indexOfLastPostActor = currentactor * postsPerActor;
  const indexOfFirstPostActor = indexOfLastPostActor - postsPerActor;
  const currentActor = name?.slice(indexOfFirstPostActor, indexOfLastPostActor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginateActor = (pageNumber) => {
    setCurrentActor(pageNumber);
  };

  const filterData = (value, item) => {
    setFilter(true);
    const Value = value.toLocaleUpperCase().trim();

    if (item === "studio") {
      setActivePublisher(value);
      setActiveName("");
      setActiveKeyword("");
    }
    if (item === "actor") {
      setActiveKeyword("");
      setActiveName(value);
      setActivePublisher("");
    }
    if (item === "genre") {
      setActiveKeyword(value);
      setActiveName("");
      setActivePublisher("");
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

  const clearAllFilters = () => {
    setFilter(false);
    setActivePublisher("");
    setActiveName("");
    setActiveKeyword("");
  };

  return (
    <div className={`lg:h-screen overflow-y-auto scrollbar-hide`}>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header collections={all_movie} />
      <main className="flex flex-col lg:flex-row p-4">
        <div className="min-w-[20vw] max-w-screen lg:max-w-[20vw]">
          <div className="mx-auto max-w-screen h-full max-h-screen scrollbar-hide ">
            <div className=" w-full  md:w-3/12">
              <div className="w-full">
                <div
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center cursor-pointer"
                >
                  <h2 className="p-4 text-center text-base md:text-lg font-medium">
                    Filter
                  </h2>
                  {showFilter ? (
                    <AiOutlineUp className="w-4 h-4 cursor-pointer" />
                  ) : (
                    <AiOutlineDown className="w-4 h-4 cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
            {showFilter && (
              <>
                <Fade bottom>
                  <div className="h-screen overflow-y-scroll scrollbar-hide">
                    {filter && (
                      <div className="p-4">
                        <button
                          onClick={clearAllFilters}
                          className="bg-yellow-300 hover:text-white w-full p-3 rounded-md ring-gray-200 text-sm text-gray-800 
    hover:ring-1 focus:outline-none active:ring-gray-300 hover:shadow-md"
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col p-4 items-center space-y-2">
                      <div className="flex items-center">
                        <h2 className="p-4 text-center text-base md:text-lg font-medium">
                          女优
                        </h2>
                        {showName ? (
                          <AiOutlineUp
                            onClick={() => setShowName(false)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        ) : (
                          <AiOutlineDown
                            onClick={() => setShowName(true)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        )}
                      </div>
                      {showName && (
                        <div className=" space-y-4  w-full">
                          {currentActor?.map((value) => (
                            <div
                              className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activeName &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                              onClick={() => filterData(value, "actor")}
                              key={value}
                            >
                              <Fade bottom>{value}</Fade>
                            </div>
                          ))}
                        </div>
                      )}
                      <PaginationActor
                        postsPerActor={postsPerActor}
                        totalActor={name?.length}
                        paginate={paginateActor}
                      />
                    </div>
                    <div className="flex flex-col p-4 items-center space-y-2 ">
                      <div className="flex items-center">
                        <h2 className="p-4 text-center text-base md:text-lg font-medium">
                          Publisher
                        </h2>
                        {showPublisher ? (
                          <AiOutlineUp
                            onClick={() => setShowPublisher(false)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        ) : (
                          <AiOutlineDown
                            onClick={() => setShowPublisher(true)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        )}
                      </div>
                      {showPublisher && (
                        <div className=" space-y-4  w-full">
                          {publisher?.map((value) => (
                            <div
                              className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activePublisher &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                              onClick={() => filterData(value, "studio")}
                              key={value}
                            >
                              <Fade bottom>{value}</Fade>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col p-4 items-center space-y-2">
                      <div className="flex items-center">
                        <h2 className="p-4 text-center text-base md:text-lg font-medium">
                          Keywords
                        </h2>
                        {showKeywords ? (
                          <AiOutlineUp
                            onClick={() => setShowKeywords(false)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        ) : (
                          <AiOutlineDown
                            onClick={() => setShowKeywords(true)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        )}
                      </div>
                      {showKeywords && (
                        <div className=" space-y-4  w-full">
                          {keywords?.map((value) => (
                            <div
                              className={`flex items-center justify-center p-2  rounded-2xl w-full cursor-pointer
                      ${
                        value == activeKeyword &&
                        "bg-gray-500 text-white font-bold"
                      }`}
                              onClick={() => filterData(value, "genre")}
                              key={value}
                            >
                              <Fade bottom>{value}</Fade>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Fade>
              </>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-[70vw] ">
          {!filter && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={all_movie?.length}
              paginate={paginate}
            />
          )}

          {filter && <p>{searchResults.length} Movie</p>}

          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
            {filter &&
              filterCurrentMovie?.map((collection) => (
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
                  allDataisTrue
                  releasedate={collection?.releasedate}
                  actorid={collection?.actorid}
                />
              ))}
            {!filter &&
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
                  allDataisTrue
                  releasedate={collection?.releasedate}
                  actorid={collection?.actorid}
                />
              ))}
          </div>
          {filter && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={searchResults?.length}
              paginate={paginate}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Index;
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const movieRes1 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie1.json",
    { cache: "no-store" }
  );
  const movieRes2 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie2.json",
    { cache: "no-store" }
  );
  const movieRes3 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie3.json",
    { cache: "no-store" }
  );
  const movieRes4 = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie3.json",
    { cache: "no-store" }
  );
  const data1 = await movieRes1.json();
  const data2 = await movieRes2.json();
  const data3 = await movieRes3.json();
  const data4 = await movieRes4.json();

  let allData = [];

  const newAllData = allData.concat(data1, data2, data3, data4);

  // count how many pages
  let totalMovieCount = pageCount(newAllData.length);
  const sortMovie = newAllData
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  let totalMovie = sortMovie.slice(0, 12);

  return {
    props: { movie: totalMovie, totalMovieCount, all_movie: sortMovie },
  };
}
