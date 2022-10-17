import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
const Header = dynamic(() => import("../../components/Header"));
const Result = dynamic(() => import("../../components/Result"));
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../features/movieSlice";
import { resetGrid } from "../../features/gridSlice";
import Reveal from "react-reveal/Reveal";
import { show_per_page } from "../../config";

import SortingHeader from "../../components/SortingHeader";
import { pageCount } from "../../utils/helpers";
import PaginationNew from "../../components/PaginationNew";

export default function Home({ moviesData, totalMovieCount, currentPostpage }) {
  const movies = JSON.parse(moviesData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(40);
  const [sortingCriteria, setSortingCriteria] = useState("releasedateDsc");
  const [sortingMovie, setSortingMovie] = useState(
    movies
      .slice()
      .sort(
        (b, a) =>
          new Date(a?.releasedate).getTime() -
          new Date(b?.releasedate).getTime()
      )
  );

  useEffect(() => {
    if (sortingCriteria === "releasedateDsc") {
      let newMovie = movies
        .slice()
        .sort(
          (b, a) =>
            new Date(a?.releasedate).getTime() -
            new Date(b?.releasedate).getTime()
        );
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "releasedateAsc") {
      let newMovie = movies
        .slice()
        .sort(
          (b, a) =>
            new Date(b?.releasedate).getTime() -
            new Date(a?.releasedate).getTime()
        );
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "idAsc") {
      let newMovie = movies.slice().sort(function (a, b) {
        return a.id.localeCompare(b.id);
      });
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "idDsc") {
      let newMovie = movies.slice().sort(function (b, a) {
        return a.id.localeCompare(b.id);
      });
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "titleAsc") {
      let newMovie = movies.slice().sort(function (a, b) {
        return a.actor.localeCompare(b.actor);
      });
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "titleDsc") {
      let newMovie = movies.slice().sort(function (b, a) {
        return a.actor.localeCompare(b.actor);
      });
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "ratingDsc") {
      let newMovie = movies.slice().sort(function (a, b) {
        return Number(b.rating) - Number(a.rating);
      });
      setSortingMovie(newMovie);
    }
    if (sortingCriteria === "ratingAsc") {
      let newMovie = movies.slice().sort(function (a, b) {
        return Number(a.rating) - Number(b.rating);
      });
      setSortingMovie(newMovie);
    }
  }, [movies, sortingCriteria]);

  const indexOfLastPost = currentpage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = sortingMovie?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(resetGrid());
    dispatch(addMovie(movies));
    setLoading(false);
  }, [movies]);

  return (
    <div className="">
      <Head>
        <title>My JavLib</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header collections={movies} />
      <SortingHeader setSortingCriteria={setSortingCriteria} />

      <main className="mx-auto max-w-screen">
        <Reveal effect="fadeInUp">
          {loading ? <p>Loading...</p> : <Result collections={currentMovie} />}
        </Reveal>

        <PaginationNew
          totalMovieCount={totalMovieCount}
          currentPostpage={currentPostpage}
        />
      </main>
    </div>
  );
}
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
      params: { page: `${path + 1}` },
    })
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/allmovie.json"
  );
  const data = await movieRes.json();
  const sortMovie = data
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );

  let totalMovieCount = pageCount(data.length);

  // main Logic for dynamic pagination get post base on show_per_page in you app.

  let totalMovie;

  if (Number(params.page) == 1) {
    totalMovie = sortMovie.slice(show_per_page, show_per_page);
  }
  if (Number(params.page) == 2) {
    totalMovie = sortMovie.slice(show_per_page, show_per_page * params.page);
  }

  if (Number(params.page) > 2) {
    totalMovie = sortMovie.slice(
      show_per_page * params.page - show_per_page,
      show_per_page * params.page
    );
  }

  return {
    props: {
      moviesData: JSON.stringify(totalMovie),
      totalMovieCount,
      currentPostpage: params.page,
    },
    revalidate: 60,
  };
}
