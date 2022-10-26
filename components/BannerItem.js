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
        placeholder="blur"
        loading="lazy"
        blurDataURL={
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwePSwuJDJJQExLR0BGRVBac2JQVW1WRUZkiGVtd3uBgoFOYI2XjH2Wc36BfP/bAEMBFRcXHhoeOyEhO3xTRlN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIACUAMgMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAwEEBQIG/8QAHxAAAgMAAgMBAQAAAAAAAAAAAAECAxEEEiExQRNh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APZi5zSFyt8FW2/PoFp2ImNiMqXKx+yYcrfoGwponsjOhfv0crQLXYCt+gAcT3Clemakq/BWtp0DFsUtJrUtNCXG1+jqHG/gCqkyzHTuFGDFWAryA7oAFtoVNIAAV1R1GKAAO1FE4AARgAAH/9k="
        }
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
