export default async function handler(req, res) {
  const movieRes = await fetch(process.env.NEXT_PUBLIC_BASE_MOVIE_URL);
  const data = await movieRes.json();

  res.status(200).json({ movies: data });
}
