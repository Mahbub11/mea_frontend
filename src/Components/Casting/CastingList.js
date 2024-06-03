import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Popover } from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  ArrowUpOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/slices/company";
import { deleteSells } from "../../redux/slices/sells";

export default function CastingList({
  list: projects,
  handleEditCompany,
  handleReFetch,
  createBill,
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
        <div
          onClick={(e) => openProjectList(record.id)}
          className="cursor-pointer font-montserrat font-[400] "
        >
          <button
            // onClick={(e) => openProjectList(record.id)}
            className="sm:text-[15px]  font-montserrat font-[400] flex gap-2"
          >
            <p>C-{record.id}</p>
          </button>
        </div>
      ),
    },
    {
      title: "Issue Date",
      dataIndex: "date",
      key: "date",
      render: (id, record) => (
        <div>
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button className="sm:text-[15px]  font-montserrat font-[400] flex gap-2">
              <p>{moment(record.issue_date).format("DD-MM-YYYY")}</p>
            </button>
          }
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyname",
      key: "companyname",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.company.name}</p>
        </div>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.project.name}</p>
        </div>
      ),
    },
    {
      title: "Delivery Address",
      dataIndex: "projectname",
      key: "projectname",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.delivery_address}</p>
        </div>
      ),
    },
    // {
    //   title: "MPA",
    //   dataIndex: "mpa",
    //   key: "mpa",
    //   render: (level, record) => (
    //     <div className=" cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.mpa}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Cubic Meter",
    //   dataIndex: "cubicmeter",
    //   key: "cubicmeter",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.cubic_meter}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Stone",
    //   dataIndex: "stone",
    //   key: "stone",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.stone}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Sand",
    //   dataIndex: "sand",
    //   key: "sand",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.sand}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Cement",
    //   dataIndex: "cement",
    //   key: "cement",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.cement}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Admixer",
    //   dataIndex: "admixer",
    //   key: "admixer",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.admixer}</p>
    //     </div>
    //   ),
    // },
    // {
    //   title: "CFT Quantity",
    //   dataIndex: "cftquatity",
    //   key: "cftquatity",
    //   render: (level, record) => (
    //     <div className="cursor-pointer font-montserrat font-[400] ">
    //       <p>{record.cft_quantity}</p>
    //     </div>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "joined",
      key: "phone",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] text-[12px] flex gap-3">
          {record.status === 1 ? (
            <Button disabled>Billed</Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => createBill(record.id)}>Make Bill</Button>
            </div>
          )}

          {record.status !== 1 ? (
            <Popover
              overlayStyle={{
                width: isMobile ? "60%" : "auto",
              }}
              content={
                <span className="flex flex-wrap gap-2">
                  {/* <Button>Work Order</Button> */}
                  <Button onClick={() => handleEditCompany(record.id)}>
                    Edit
                  </Button>
                  <Popconfirm
                    okType="danger"
                    onConfirm={(e) => handleDelete(record.id)}
                    title="Delete Item"
                    description="If deleted consume inventory items will restore"
                  >
                    <Button className="border-[1px]  cursor-pointer ">
                      <DeleteOutlined
                        color="red"
                        className="cursor-pointer mt-[-5px]"
                      ></DeleteOutlined>
                    </Button>
                  </Popconfirm>
                </span>
              }
              title="More Action"
            >
              {" "}
              <MoreOutlined
                color="red"
                className="text-[20px] mt-[5px] cursor-pointer"
              ></MoreOutlined>
            </Popover>
          ) : (
            ""
          )}
        </div>
        // <div className=" font-montserrat font-[400] text-[12px] flex-col gap-3">
        //   <div className="flex gap-2">
        //     <Button onClick={() => handleEditCompany(record.id)}>Edit</Button>
        //     <Popconfirm
        //       okType="danger"
        //       onConfirm={(e) => handleDelete(record.id)}
        //       title="Delete the Sell"
        //       description="Are you sure to delete this Sell?"
        //     >
        //       <Button className="border-[1px]  cursor-pointer ">
        //         <DeleteOutlined
        //           color="red"
        //           className="cursor-pointer mt-[-5px]"
        //         ></DeleteOutlined>
        //       </Button>
        //       {/* <Button>Invoice</Button>
        //     <Button>Work Order</Button> */}
        //     </Popconfirm>
        //   </div>

        //   <div className="flex gap-3 mt-2">
        //     <Button>Work Order</Button>
        //     <Button>Invoice</Button>
        //   </div>
        // </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteSells(id));
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
          scroll={
            isMobile ? { x: "calc(700px + 50%)" } : { x: "calc(700px + 40%)" }
          }
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
