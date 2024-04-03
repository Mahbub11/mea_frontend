import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import CProjectList from "./CProjectList";

export default function CProjects({ data }) {
  const [filterData, setFilterData] = useState([]);

  useEffect(()=>{

    setFilterData(data.projects)
  },[data])

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(data.projects);
    } else {
      const newData = data.projects.filter((val) =>
        val.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };


  return (
    <div>
      <div className="font-poppins text-[20px]">
        <h1 className="text-center">
          Project List of :
          <span className="font-[700] bg-gray-100 px-1 py-1 rounded-md">
            {data.name}
          </span>
        </h1>
        <div className="w-full flex justify-center mt-5">
          <Search
            className="md:w-[80%] sm:w-full px-2 sm:h-[10%] rounded-md "
            placeholder="Search Project"
            onChange={handleSearch}
          />
        </div>

        <div>
          <CProjectList data={filterData}></CProjectList>
        </div>
      </div>
    </div>
  );
}
