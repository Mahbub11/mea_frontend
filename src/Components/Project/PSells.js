import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import PSellsList from "./PSellsList";
import moment from "moment";

export default function PSells({ data }) {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(data.sells);
  }, [data]);

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(data.sells);
    } else {
      const newData = data.sells.filter((val) =>
        moment(val.sell_date)
          .format("DD-MM-YYYY")

          .includes(e.target.value)
      );

      setFilterData(newData);
    }
  };

  return (
    <div>
      <div className="font-poppins text-[20px]">
        <h1 className="text-center">
          Sells List of :
          <span className="font-[700] bg-gray-100 px-1 py-1 rounded-md">
            {data.name}
          </span>
        </h1>
        <div className="w-full flex justify-center mt-5">
          <Search
            className="md:w-[80%] sm:w-full px-2 sm:h-[10%] rounded-md "
            placeholder="Search By Date"
            onChange={handleSearch}
          />
        </div>

        <div>
          <PSellsList data={filterData}></PSellsList>
        </div>
      </div>
    </div>
  );
}
