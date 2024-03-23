import { Button, Drawer, Input, Modal, Pagination, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyList } from "../../redux/slices/company";
import { Skeleton } from "antd";
import CompanyList from "../../Components/Company/CompanyList";
import Search from "antd/es/input/Search";
import CreateCompany from "../../Components/Company/CreateCompany";
import EditCompany from "../../Components/Company/EditCompany";
import CProjects from "../../Components/Company/CProjects";

export default function CompanyPage() {
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);

  const [filterData, setFilterData] = useState(companyList);
  const [busy, isBusy] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [show, isShow] = useState(false);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [drawer, setDrawer] = useState(false);
  const [selectCompany, setSelectCompany] = useState([]);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  useEffect(() => {
    dispatch(getCompanyList());
    setFilterData(companyList);

    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    setFilterData(companyList);
  }, [companyList]);

  const handleQ = (id) => {};
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(companyList);
    } else {
      const newData = companyList.filter((val) =>
        val.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );

      setFilterData(newData);
    }
  };

  const handleCloseModal = () => {
    isShow(false);
  };

  const handleEditCompany = (id) => {
    setEditData();
    const data = filterData.filter((data) => data.id === id);
    setEditData(data[0]);

    console.log(data[0]);
    isShowEdit(true);
  };

  const handleReFetch = () => {
    isBusy(true);
    isShow(false);
    // window.location.reload();
  };
  const handleEditReFetch = () => {
    isBusy(true);
    isShowEdit(false);
    // window.location.reload();
  };

  const openProjectList = (id) => {
    setDrawer(true);
    const selectCompany = filterData.filter((val) => val.id === id);

    console.log(selectCompany[0]);
    setSelectCompany(selectCompany[0]);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Company List
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Company"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <div className="flex justify-end w-full px-1 py-3">
                <Button onClick={() => isShow(true)} className="">
                  Create Company
                </Button>
              </div>
              <CompanyList
                handleEditCompany={handleEditCompany}
                list={filterData}
                handleQ={handleQ}
                handleReFetch={handleReFetch}
                openProjectList={openProjectList}
              ></CompanyList>
            </div>
          </div>

          <div>
            <Modal
              style={config}
              footer={null}
              maskClosable={false}
              closable={true}
              width="md:w-[100%] sm:w-full"
              open={show}
              onCancel={() => isShow(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <CreateCompany
                  handleReFetch={handleReFetch}
                  handleCloseModal={handleCloseModal}
                ></CreateCompany>
              </div>
            </Modal>
            <Modal
              style={config}
              footer={null}
              maskClosable={false}
              closable={true}
              width="md:w-[100%] sm:w-full"
              open={showEdit}
              onCancel={() => isShowEdit(false)}
              className=" top-[1rem] m-auto z-10"
            >
              <div>
                <EditCompany
                  handleReFetch={handleEditReFetch}
                  data={editData}
                ></EditCompany>
              </div>
            </Modal>
          </div>
          <Drawer
            closable={true}
            width={720}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <CProjects data={selectCompany}></CProjects>
          </Drawer>
        </div>
      )}
    </div>
  );
}
