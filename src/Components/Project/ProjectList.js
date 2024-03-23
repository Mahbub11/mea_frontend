import React, { useState } from "react";
import {
  Button,
  Popconfirm,
} from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/slices/company";
import { deleteProject } from "../../redux/slices/project";

export default function ProjectList({
  list,
  handleQ,
  handleEditCompany,
  handleReFetch,
  openSellsList,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const dispatch = useDispatch();
  const [page, setPage] = useState(5);
  const [current, setCurrent] = useState(1);

  console.log(list);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
          <p>C-{record.id}</p>
        </div>
      ),
    },

    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div>
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button
              onClick={(e) => openSellsList(record.id)}
              className="sm:text-[15px]  font-montserrat font-[400] flex gap-2"
            >
              <p>{record.name}.</p>
            </button>
          }
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div>
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button
              onClick={(e) => handleQ(record.id)}
              className="sm:text-[15px]  font-montserrat font-[400] flex gap-2"
            >
              <p>{record.company.name}.</p>
            </button>
          }
        </div>
      ),
    },

    {
      title: "MPA",
      dataIndex: "mpa",
      key: "mpa",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
          <p>{record.mpa}</p>
        </div>
      ),
    },
    {
      title: "Cubic_Meter",
      dataIndex: "cubic_meter",
      key: "cubic_meter",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
          <p>{record.cubic_meter}</p>
        </div>
      ),
    },
    {
      title: "CFT Quantity",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className="font-montserrat font-[400] ">
          <p>{record.cft_quantity}</p>
        </div>
      ),
    },
    {
      title: "Added",
      dataIndex: "added",
      key: "added",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
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
    dispatch(deleteProject(id));
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
          locale={{
            emptyText: <span>{list.length === 0 ? "No Data" : "Loading"}</span>,
          }}
          dataSource={list}
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
            total={list.length}
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
