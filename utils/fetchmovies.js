import {
  movieIdrray,
  show_per_page,
  url,
  allurl1,
  allurl2,
  allurl3,
  allurl4,
} from "../config";
import { pageCount } from "./helpers";

export const fetchBaseMovie = async () => {
  const res = await fetch(url);
  const movies = res.json();
  return movies;
};

export const fetchMovies = async () => {
  const moviesData = await fetchBaseMovie();
  let sortingMovies;
  sortingMovies = moviesData
    .slice()
    .sort(
      (b, a) =>
        new Date(a?.releasedate).getTime() - new Date(b?.releasedate).getTime()
    );
  const movies = sortingMovies.slice(0, show_per_page);
  const totalMovieCount = pageCount(moviesData.length);

  return { movies: movies, totalMovieCount: totalMovieCount };
};

export const fetchAllMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmovies`
  );
  const data = await res.json();
  // console.log("data", data);
  const movies = data;
  const totalMovieCount = data.totalMovieCount;

  return { movies, totalMovieCount };
};

export const fetchAllMoviesPaginate = async (page) => {
  const moviesFilter = {
    page: page,
  };
  const moviesData = await fetchAllMovies();
  const newAllData = moviesData.movies.movies;
  const totalMovieCount = pageCount(newAllData.length);
  let totalMovie;
  if (Number(page) == 1) {
    totalMovie = newAllData.slice(show_per_page, show_per_page);
  }
  if (Number(page) == 2) {
    totalMovie = newAllData.slice(show_per_page, show_per_page * page);
  }
  if (Number(page) > 2) {
    totalMovie = newAllData.slice(
      show_per_page * page - show_per_page,
      show_per_page * page
    );
  }

  return { movies: newAllData, totalMovieCount };
};

export const fetchSearchMovies = async (filter) => {
  const moviesFilter = {
    searchterm: filter,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmovieswithfilter`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();
  const movies = data.movies;
  const totalMovieCount = data.totalMovieCount;
  const totalMoviesResult = data.totalMoviesResult;

  return { movies, totalMovieCount, totalMoviesResult };
};

export const fetchSearchMoviesPaginate = async (filter, page) => {
  const moviesFilter = {
    searchterm: filter,
    page: page,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmovieswithfilterPaginate`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();
  const movies = data.movies;
  const totalMovieCount = data.totalMovieCount;
  const totalMoviesResult = data.totalMoviesResult;

  console.log(movies);
  return { movies, totalMovieCount, totalMoviesResult };
};

export const fetchMoviesDetailsWithSuggest = async (id) => {
  const moviesFilter = {
    id: id,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getmoviesdetailwithsuggest`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();

  const movies = data.movies;

  const suggest = data.suggest;

  return { movies, suggest };
};

export const fetchMoviesDetailsWithAllSuggest = async (id) => {
  const moviesFilter = {
    id: id,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmoviesdetailwithsuggest`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();

  const movies = data.movies;

  const suggest = data.suggest;

  return { movies, suggest };
};

export const fetchMoviesDetailsMagnetlinks = async (id) => {
  const filterMovieId = (id) => {
    let newid;
    if (id.length === 7) {
      const slieId = id.slice(0, 3);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
    if (id.length === 8) {
      const slieId = id.slice(0, 4);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
    if (id.length === 9) {
      const slieId = id.slice(0, 5);
      const IdFilter = slieId.toLocaleUpperCase().trim();
      newid = movieIdrray.filter((id) => id.id.includes(IdFilter));
      return newid;
    }
  };
  const input = filterMovieId(id);
  console.log("input", input);
  const moviesFilter = {
    mid: id.toString(),
    id: input[0]?.id?.toString(),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getmoviesmagnet`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();
  console.log(data);
  const magnets = data.magnets;

  return { magnets };
};
