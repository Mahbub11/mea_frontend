import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconExit_left from "../../Assets/SVG/IconExit_Left";
import { listing } from "../../utils/dummyData";
import { Select, Input, Pagination } from "antd";
import ListData from "../../Components/Data/ListData";
import InvoiceListTable from "../../Components/Data/InvoiceListTable";
import ContractAnalysisTable from "../../Components/Data/ContractAnalysisTable";
const { Search } = Input;

function ContractAnalysis(props) {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [index, setIndex] = useState();
  const [show, isShow] = useState(false);
  const [tableData, setTableData] = useState(listing);
  const [filterData, setFilterData] = useState(listing);
  const [level, setLevel] = useState(false);
  const [fpracUnprac, setFpracUnprac] = useState(false);
  const [markedFilter, setMarkedFilter] = useState(false);
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);

  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };
  const handleQ = (id) => {
    setIndex(id);
    isShow(true);
  };
  const handleChange = (value) => {
    setPage(value);
  };

  const onChangePage = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const handleClick = (myLink) => () => {
    window.location.href = myLink;
  };
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(tableData);
    } else {
      const newData = tableData.filter((val) =>
        val.cname
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };

  return (
    <div>
      <div className="px-2 py-2 w-full m-auto">
        <div className="py-5 drop-shadow-md">
          <div
            onClick={() => navigate(-1)}
            className="absolute md:px-2 py-2 cursor-pointer  md:mt-0"
          >
            <IconExit_left height="2rem" width="2rem"></IconExit_left>
          </div>
          <h1 className="text-center text-[30px]">Contract Analysis</h1>
          <div className="h-[5rem] sm:w-[60%] m-auto md:w-auto px-2 py-2 bg-header md:absolute right-0 text-[15px] font-montserrat">
            <h1>Total Paid:<span className="font-[800]"> 40000000 tk</span></h1>
            <h1>Total due: <span className="font-[800]">300000 tk</span></h1>


          </div>

          <div>
            <div>
              <div className="w-full flex justify-center mt-5">
                <Search
                  className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                  placeholder="Search Company/Project"
                  onChange={handleSearch}
                />
              </div>

              <div
                id="journal-scroll"
                className="overflow-x-scroll w-full mt-5 "
              >
                <ContractAnalysisTable
                  list={filterData.length === 0 ? listing : filterData}
                  current={current}
                  page={page}
                  handleQ={handleQ}
                ></ContractAnalysisTable>
              </div>
              <div className="w-full flex justify-center gap-3">
                <Pagination
                  current={current}
                  pageSize={page}
                  onChange={onChangePage}
                  total={listing.length}
                  // itemRender={itemRender}
                />
                <div className="">
                  <Select
                    defaultValue={5}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                      {
                        value: 5,
                        label: "5",
                      },
                      {
                        value: 8,
                        label: "8",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractAnalysis;
