export const fetchMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getmovies`);
  const data = await res.json();
  const movies = data.movies;
  return movies;
};

export const fetchAllMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmovies`
  );
  const data = await res.json();
  const movies = data.movies;
  const totalMovieCount = data.totalMovieCount;

  return { movies, totalMovieCount };
};
export const fetchAllMoviesPaginate = async (page) => {
  const moviesFilter = {
    page: page,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getallmoviespaginate`,
    { body: JSON.stringify(moviesFilter), method: "POST" }
  );
  const data = await res.json();
  const movies = data.movies;
  const totalMovieCount = data.totalMovieCount;

  return { movies, totalMovieCount };
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
