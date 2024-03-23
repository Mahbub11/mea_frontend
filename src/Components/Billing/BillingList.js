import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Popover, Tag, Tooltip } from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  ArrowUpOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/slices/company";
import { deleteSellsReport } from "../../redux/slices/sellsReport";
import { CSVLink, CSVDownload } from "react-csv";

export default function BillingList({
  list: projects,
  handleEditBill,
  handleReFetch,
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
          <p>B-{record.id}</p>
        </div>
      ),
    },
    {
      title: "Issue Date",
      dataIndex: "date",
      key: "date",
      render: (id, record) => (
        <div className="w-[5rem] text-[13px]">
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button className=" font-montserrat font-[400] flex gap-2">
              <p>{moment(record.sell_date).format("DD-MM-YYYY")}</p>
            </button>
          }
        </div>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (id, record) => (
        <div className="w-[5rem] text-[13px]">
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button className="font-montserrat font-[400] flex gap-2">
              <p>{moment(record.due_date).format("DD-MM-YYYY")}</p>
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
        <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
          <p>{record.description}</p>
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyname",
      key: "companyname",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
          <p>{record.company.name}</p>
        </div>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "projectname",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] w-[5rem] text-[13px]">
          <p>{record.project.name}</p>
        </div>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (level, record) => (
        <div className="font-[500] cursor-pointer font-montserrat  text-[13px]">
          <Tag color="blue">
            <p>{Math.round(record.unit * 100) / 100}</p>
          </Tag>
        </div>
      ),
    },
    {
      title: "Unit Rate(tk)",
      dataIndex: "unit_rate",
      key: "unit_rate",
      render: (level, record) => (
        <div className="font-[500] cursor-pointer font-montserrat text-[13px]">
          <Tag color="geekblue">
            <p>{Math.round(record.unit_rate * 100) / 100}</p>
          </Tag>
        </div>
      ),
    },
    {
      title: "Vat",
      dataIndex: "vat",
      key: "vat",
      render: (level, record) => (
        <div className=" font-[500] cursor-pointer font-montserrat ">
          <Tag color="red">
            <p>{Math.round(record.vat * 100) / 100}%</p>
          </Tag>
        </div>
      ),
    },
    {
      title: "Pump Charge",
      dataIndex: "pump_charge",
      key: "pump_charge",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
          <p>
            {record.pump_charge ? (
              <Tag icon={<CheckCircleOutlined />} color="success"></Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error"></Tag>
            )}
          </p>
        </div>
      ),
    },
    {
      title: "Total Ammount(tk)",
      dataIndex: "total_amount",
      key: "total_amount",
      fixed: "right",
      render: (level, record) => (
        <div className="font-[600] cursor-pointer font-montserrat text-[13px]">
          <p>
            {(Math.round(record.total_amount * 100) / 100).toLocaleString()}
          </p>
        </div>
      ),
    },
    {
      title: "Paid Amount(tk)",
      dataIndex: "paid_amount",
      key: "paid_amount",
      fixed: "right",
      render: (level, record) => (
        <div className="font-[600] cursor-pointer font-montserrat text-[13px]">
          <p>{(Math.round(record.paid_amount * 100) / 100).toLocaleString()}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      render: (level, record) => (
        <div className="font-[600] cursor-pointer font-montserrat text-[13px]">
          {record.status === 1 ? (
            <Tag color="yellow">Billed</Tag>
          ) : record.status === 2 ? (
            <Tooltip
              placement="leftTop"
              title={`Invoice Balance merged B-${record.tid}`}
            >
              <Tag color="blue">Transfer</Tag>
            </Tooltip>
          ) : record.status === 3 ? (
            <Tag color="magenta">Partial</Tag>
          ) : record.status === 4 ? (
            <Tag color="green">Paid</Tag>
          ) : (
            ""
          )}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",

      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
          {record.status === 4 ? (
            <Tag color="green">paid</Tag>
          ) : (
            <div className="flex gap-3">
              <span className="flex flex-wrap gap-2">
                {/* <Button>Work Order</Button> */}
                <Button
                  disabled={record.status === 2 ? true : false}
                  onClick={() => handleEditBill(record.id)}
                >
                  Edit
                </Button>
                <Popconfirm
                  okType="danger"
                  onConfirm={(e) => handleDelete(record.id)}
                  title="Delete the Bill"
                  description="Are you sure to delete this Bill?"
                >
                  <Button className="border-[1px]  cursor-pointer ">
                    <DeleteOutlined
                      color="red"
                      className="cursor-pointer mt-[-5px]"
                    ></DeleteOutlined>
                  </Button>
                </Popconfirm>
              </span>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteSellsReport(id));
    handleReFetch();
  };
  const onChangePage = (page) => {
    setCurrent(page);
  };
  const handleChange = (value) => {
    setPage(value);
  };
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <div className="m-auto flex flex-col justify-center sm:pb-5">
      <div className="w-full flex justify-end ">
        {/* <div className="bg-home rounded-md px-1 py-1">
          <CSVLink data={projectsData}>Download Excel</CSVLink>
        </div> */}
      </div>
      <div id="journal-scroll" className="sm:w-full  m-auto ">
        <Table
          className="text-[10px]"
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
