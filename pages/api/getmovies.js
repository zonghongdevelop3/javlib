export default async function handler(req, res) {
  const movieRes = await fetch(
    "https://raw.githubusercontent.com/zonghongdevelop3/javdb.io/main/data/movie.json"
  );
  const data = await movieRes.json();

  res.status(200).json({ movies: data });
}
