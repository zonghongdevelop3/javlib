import React, { useState } from "react";

function PaginationActor({ postsPerActor, totalActor, paginate }) {
  const [currentpage, setCurrentPage] = useState(null);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalActor / postsPerActor); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="w-full overflow-hidden pb-2">
      <div className="overflow-x-scroll flex flex-row items-center justify-items-center space-x-8 mx-8">
        {pageNumber.map((number) => (
          <div
            onClick={() => {
              paginate(number);
              setCurrentPage(number);
            }}
            key={number}
            className={`cursor-pointer hover:animate-pulse p-2 mb-2 ${
              number == currentpage &&
              "bg-gray-300 rounded-full leading-loose text-emerald-500"
            }`}
          >
            <a className="tracking-widest">{number}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginationActor;
