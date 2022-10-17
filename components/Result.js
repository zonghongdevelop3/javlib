import dynamic from "next/dynamic";
const ResultList = dynamic(() => import("./ResultList"));

import { useSelector } from "react-redux";
import {
  selectGrid2,
  selectGrid3,
  selectGrid5,
  selectInitialgrid,
} from "../features/gridSlice";

function Result({ collections, allDataisTrue }) {
  const initial = useSelector(selectInitialgrid);
  const grid2 = useSelector(selectGrid2);
  const grid3 = useSelector(selectGrid3);
  const grid5 = useSelector(selectGrid5);

  return (
    <div
      className={`px-5 my-10 grid grid-flow-row-dense
      ${initial && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}
      ${grid2 && "md:grid-cols-2"}    
      ${grid3 && "md:grid-cols-3"}
      ${grid5 && "md:grid-cols-5"}
         
      `}
    >
      {collections?.map((collection) => (
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
          releasedate={collection.releasedate}
          rating={collection.rating}
          director={collection?.director}
          allDataisTrue={allDataisTrue}
        />
      ))}
    </div>
  );
}

export default Result;
