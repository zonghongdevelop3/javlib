import { useEffect, useState } from "react";
import { pageCount, filterAllData } from "../../utils/helpers";
import HeaderItems from "../../components/HeaderItems";
import ResultList from "../../components/ResultList";

import Link from "next/link";

import { useRouter } from "next/router";
import { show_per_page } from "../../config";

import Head from "next/head";
import {
  AdjustmentsIcon,
  FireIcon,
  GlobeAltIcon,
  HomeIcon,
  SearchIcon,
  GiftIcon,
  SearchCircleIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { fetchAllBaseMovie } from "../../utils/fetchmovies";

function SearchFilter({ moviesData, totalMovieCount, totalMoviesResult }) {
  const movies = moviesData;
  const router = useRouter();
  const currentParam = router.query.filter;
  const currentPostpage = router.query;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(moviesData);
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = searchResults?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navtoHome = () => {
    router.push("/");
  };

  const navtosearch = () => {
    router.push("/search");
  };

  const navtofilter = () => {
    router.push("/filter");
  };

  const navtowebsite = () => {
    router.push("/website");
  };

  const navtoRank = () => {
    router.push("/actress");
  };
  const navtomobileRandom = () => {
    router.push("/mobilerandom");
  };

  const navtoRandom = () => {
    router.push("/random");
  };
  const searchMe = (e) => {
    e.preventDefault();
    router.push(`/searchfilter/${searchTerm}`);
  };
  const navtoAll = () => {
    router.push("/allmovies");
  };
  const navtoSearchAll = () => {
    router.push("/searchall");
  };
  let pageIntoArray = Array?.from(Array(totalMovieCount).keys());

  return (
    <div>
      <Head>
        <title>My JavLib</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center sticky top-0 z-50 h-auto m-5">
        <div className="flex items-center space-x-6">
          <div className="flex flex-grow justify-evenly max-w-2xl">
            <HeaderItems title="HOME" Icon={HomeIcon} navtoHome={navtoHome} />
            <HeaderItems title="ALL" Icon={SparklesIcon} navtoHome={navtoAll} />
            <HeaderItems
              title="SEARCH ALL"
              Icon={HeartIcon}
              navtosearch={navtoSearchAll}
            />
            <HeaderItems
              title="FILTER"
              Icon={AdjustmentsIcon}
              navtosearch={navtofilter}
            />
            <HeaderItems
              title="SEARCH"
              Icon={SearchIcon}
              navtosearch={navtosearch}
            />
            <HeaderItems
              title="WEBSITE"
              Icon={GlobeAltIcon}
              navtosearch={navtowebsite}
            />
            <HeaderItems
              title="ACTRESS"
              Icon={FireIcon}
              navtosearch={navtoRank}
            />
            <div className="flex lg:hidden">
              <HeaderItems
                title="Random"
                Icon={GiftIcon}
                navtosearch={navtomobileRandom}
              />
            </div>
            <div className="hidden lg:flex">
              <HeaderItems
                title="Random"
                Icon={GiftIcon}
                navtosearch={navtoRandom}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center cursor-pointer">
          <form
            onSubmit={searchMe}
            className="w-full flex items-center cursor-pointer"
          >
            <input
              className={` focus:shadow-2xl focus:shadow-blue-500 font-bold tracking-widest bg-gradient-to-l text-gray-800 from-[#06202A] p-2 px-5 h-full w-full flex-grow rounded flex-shrink rounded-l-md focus:outline-none
           `}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Movie"
            />
            <SearchCircleIcon
              className="w-8 h-8 hover:text-cyan-500 cursor-pointer"
              onClick={searchMe}
            />
          </form>
        </div>
      </div>

      <main className="mx-auto max-w-screen">
        {searchResults?.length > 0 && (
          <h1 className=" text-white text-xl lg:text-3xl mt-10 font-light text-center">
            {totalMoviesResult} movies
          </h1>
        )}

        <div className="px-5 my-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies?.map((collection) => (
            <ResultList
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
              studio={collection?.studio}
              releasedate={collection?.releasedate}
              actorid={collection?.actorid}
              allDataisTrue
            />
          ))}
        </div>

        {searchResults?.length === 0 && (
          <div className="flex items-center justify-center cursor-pointer">
            <h1 className="text-6xl text-gray-400 text-center font-medium tracking-widest">
              No Movies found
            </h1>
          </div>
        )}
        <nav className="w-full overflow-hidden pb-2">
          <ul className="overflow-x-scroll flex flex-row items-center justify-items-center space-x-8 mx-8">
            {pageIntoArray.map((page) => {
              return (
                <li
                  key={page}
                  className={`page-item p-2 mb-4 ${
                    Number(currentPostpage) == Number(page + 1) &&
                    "bg-gray-500 rounded-full leading-loose"
                  }`}
                >
                  <Link
                    href={
                      page === 0
                        ? `/searchfilter/${currentParam}`
                        : `/searchfilter/${currentParam}/page/${page + 1}`
                    }
                  >
                    <p>{page + 1}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default SearchFilter;
export async function getStaticPaths() {
  const allmovieData = await fetchAllBaseMovie();
  let totalMovieCount = pageCount(allmovieData?.length);

  // totalMovieCount number convert into a array
  let pageIntoArray = Array.from(Array(totalMovieCount).keys());

  let paths = [];

  pageIntoArray.splice(0, 1).map((path) =>
    paths.push({
      params: { filter: `${path}` },
    })
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const value = params.filter;

  const allmovieData = await fetchAllBaseMovie();
  const sortData = allmovieData
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );

  const filteredData = filterAllData(sortData, value);
  const totalMoviesResult = filteredData?.length;
  let totalMovieCount = pageCount(filteredData.length);
  let totalMovie = filteredData.slice(0, show_per_page);

  return {
    props: {
      moviesData: totalMovie,
      totalMoviesResult,
      totalMovieCount,
    },
  };
}
