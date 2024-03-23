import { Button, Drawer, Input, Modal, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import Search from "antd/es/input/Search";
import ProjectList from "../../Components/Project/ProjectList";
import CreateProject from "../../Components/Project/CreateProject";
import EditProject from "../../Components/Project/EditProject";
import { getProjectList } from "../../redux/slices/project";
import PSellsList from "../../Components/Project/PSellsList";
import PSells from "../../Components/Project/PSells";

export default function ProjectPage() {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.project);

  const [filterData, setFilterData] = useState(projectList);
  const [busy, isBusy] = useState(true);
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [show, isShow] = useState(false);
  const [showEdit, isShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [drawer, setDrawer] = useState(false);
  const [sellsList, setSellsList] = useState([]);
  const config = isMobile
    ? { maxWidth: "98vw", padding: 0 }
    : { maxWidth: "80vw" };

  useEffect(() => {
    dispatch(getProjectList());
    setFilterData(projectList);

    isBusy(false);
  }, [busy, dispatch]);

  useEffect(() => {
    setFilterData(projectList);
  }, [projectList]);

  const handleQ = (id) => {};
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setFilterData(projectList);
    } else {
      const newData = projectList.filter((val) =>
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

  const openSellsList = (id) => {
    setDrawer(true);
    const selectCompany = filterData.filter((val) => val.id === id);

    console.log(selectCompany[0]);
    setSellsList(selectCompany[0]);
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div>
          <div className="mt-5">
            <h2 className="text-center font-poppinsBold text-[35px]">
              Project List
            </h2>
            <div className="w-full flex justify-center mt-5">
              <Search
                className="md:w-[40%] sm:w-full px-2 sm:h-[10%] rounded-md "
                placeholder="Search Project"
                onChange={handleSearch}
              />
            </div>
            <div className="mt-2 md:w-[90%] sm:w-full m-auto">
              <div className="flex justify-end w-full px-1 py-3">
                <Button onClick={() => isShow(true)} className="">
                  Create Project
                </Button>
              </div>
              <ProjectList
                handleEditCompany={handleEditCompany}
                list={filterData}
                handleQ={handleQ}
                handleReFetch={handleReFetch}
                openSellsList={openSellsList}
              ></ProjectList>
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
                <CreateProject
                  handleReFetch={handleReFetch}
                  handleCloseModal={handleCloseModal}
                ></CreateProject>
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
                <EditProject
                  handleReFetch={handleEditReFetch}
                  data={editData}
                ></EditProject>
              </div>
            </Modal>
          </div>
          <Drawer
            closable={true}
            width={720}
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <PSells data={sellsList}></PSells>
          </Drawer>
        </div>
      )}
    </div>
  );
}
