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

export const fetchMoviesDetailsMagnetlinks = async (id) => {
  const movieIdrray = [
    { id: "SSIS" },
    { id: "SSNI" },
    { id: "SNIS" },
    { id: "IPX" },
    { id: "IPZ" },
    { id: "JUQ" },
    { id: "JUL" },
    { id: "URE" },
    { id: "ROE" },
    { id: "MIDV" },
    { id: "MIDE" },
    { id: "MIMK" },
    { id: "MIAA" },
    { id: "MIAE" },
    { id: "FSDSS" },
    { id: "DLDSS" },
    { id: "STARS" },
    { id: "CAWD" },
    { id: "ADN" },
    { id: "ATID" },
    { id: "SAME" },
    { id: "RBK" },
  ];

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
