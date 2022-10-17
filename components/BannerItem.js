import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { navDetail } from "../features/movieSlice";

function BannerItem({
  id,
  code,
  image,
  extraimageurl,
  name,
  title,
  publisher,
  genre,
  series,
  sourceurl,
  studio,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const nameInArray = name !== null && name?.split("/");
  const genreInArray = genre !== null && genre?.split(" ");
  const extraimageurlInArray =
    extraimageurl !== null && extraimageurl?.split(";");

  const navToDetails = () => {
    dispatch(
      navDetail({
        id,
        code,
        image,
        nameInArray,
        genreInArray,
        title,
        publisher,
        series,
        extraimageurlInArray,
        sourceurl,
        studio,
      })
    );
    router.push(`/details/${id}`);
  };

  return (
    <div className="group relative" onClick={navToDetails}>
      <Image
        src={image}
        layout="responsive"
        height={800}
        width={800}
        quality="75"
        alt="poster"
        className="object-contain"
      />
      <div className="w-full p-0 lg:p-10 flex items-center justify-center -mt-0 absolute bottom-0 right-5 lg:left-0 lg:bottom-10 group-hover:bg-gradient-to-l group-hover:text-gray-800 group-hover:from-[black] group-hover:opacity-100 ">
        <h1 className="text-lg lg:text-5xl opacity-0 group-hover:opacity-100 text-white tracking-widest font-light">
          {code}
        </h1>
      </div>
    </div>
  );
}

export default BannerItem;
