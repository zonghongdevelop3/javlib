import React from "react";
import {
  AiOutlineSortDescending,
  AiOutlineSortAscending,
} from "react-icons/ai";

function SortingHeader({ setSortingCriteria }) {
  return (
    <div>
      <div className="grid grid-flow-row-dense grid-cols-3 lg:grid-cols-6 gap-2">
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("releasedateDsc")}
        >
          <p>Release Date</p>
          <AiOutlineSortDescending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("releasedateAsc")}
        >
          <p>Release Date</p>
          <AiOutlineSortAscending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("idDsc")}
        >
          <p>ID</p>
          <AiOutlineSortDescending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("idAsc")}
        >
          <p>ID</p>
          <AiOutlineSortAscending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("titleDsc")}
        >
          <p>Title</p>
          <AiOutlineSortDescending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("titleAsc")}
        >
          <p>Title</p>
          <AiOutlineSortAscending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("ratingDsc")}
        >
          <p>Rating</p>
          <AiOutlineSortDescending className="w-6 h-6" />
        </div>
        <div
          className="flex flex-row items-center justify-center cursor-pointer hover:underline"
          onClick={() => setSortingCriteria("ratingAsc")}
        >
          <p>Rating</p>
          <AiOutlineSortAscending className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default SortingHeader;
