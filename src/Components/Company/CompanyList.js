import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  Radio,
  Space,
  Tag,
  Input,
  Button,
  Popconfirm,
} from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/slices/company";

export default function CompanyList({
  list: projects,
  handleQ,
  handleEditCompany,
  handleReFetch,
  openProjectList,
}) {
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const dispatch = useDispatch();
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    setProjectsData(projects);
  }, [projects]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>C-{record.id}</p>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div>
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button
              onClick={(e) => openProjectList(record.id)}
              className="sm:text-[15px]  font-montserrat font-[400] flex gap-2"
            >
              <p>{record.name}.</p>
            </button>
          }
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.description}</p>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.address}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>{record.email}</p>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.phone}</p>
        </div>
      ),
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{moment(record.createdAt).format("DD-MM-YYYY")}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "joined",
      key: "phone",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] flex gap-3">
          <Button onClick={() => handleEditCompany(record.id)}>Edit</Button>
          <Popconfirm
            okType="danger"
            onConfirm={(e) => handleDelete(record.id)}
            title="Delete the Company"
            description="Are you sure to delete this Company?"
          >
            <Button className="border-[1px]  cursor-pointer ">
              <DeleteOutlined
                color="red"
                className="cursor-pointer mt-[-5px]"
              ></DeleteOutlined>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteCompany(id));
    handleReFetch();
  };
  const onChangePage = (page) => {
    setCurrent(page);
  };
  const handleChange = (value) => {
    setPage(value);
  };

  return (
    <div className="m-auto flex flex-col justify-center sm:pb-5">
      <div id="journal-scroll" className="sm:w-full  m-auto text-[21px] ">
        <Table
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       openProjectList(record.id)
          //       console.log(record);
          //     }, // click row
          //   };
          // }}
          locale={{
            emptyText: (
              <span>{projectsData.length === 0 ? "No Data" : "Loading"}</span>
            ),
          }}
          dataSource={projectsData}
          columns={columns}
          style={{ fontSize: "20px" }}
          size="middle"
          scroll={isMobile ? { x: "calc(700px + 50%)" } : ""}
          pagination={{
            pageSize: page,
            current: current,
            style: { display: "none" },
          }}
        />
        <div className="w-full flex justify-center gap-3 mt-5">
          <Pagination
            current={current}
            pageSize={page}
            onChange={onChangePage}
            total={projectsData.length}
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
  );
}
