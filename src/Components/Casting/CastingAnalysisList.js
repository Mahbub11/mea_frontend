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
import { CSVLink } from "react-csv";

export default function CastingAnalysisList({
  list: projects,
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

  console.log(projectsData);

  const csvData = projectsData.map((val) => {
    return {
      id: val.id,
      issue_date: val.createdAt,
      due_date: val.due_date,
      description: val.description,
      company: val.company.name,
      project: val.project.name,
      items: {
        f: "fff",
        d: "dddd",
      },
      vat: val.vat,
      total_amount: val.total_amount,
      paid_amount: val.paid_amount,
      status:
        val.status === 1
          ? "Billed"
          : val.status === 2
          ? `Transferred(${val.tid})`
          : val.status === 3
          ? "Partial"
          : val.status === 4
          ? "Paid"
          : "",
      remarks: val.remarks,
    };
  });

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
      title: "Total Amount(tk)",
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
        <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
          {record.status === 0 ? (
            <Tag color="red">pending</Tag>
          ) : record.status === 4 ? (
            <Tag color="green">paid</Tag>
          ) : record.status === 2 ? (
            <Tooltip
              placement="leftTop"
              title={`Invoice Balance merged C-${record.tid}`}
            >
              <Tag color="blue">Transfer</Tag>
            </Tooltip>
          ) : record.status === 1 ? (
            <Tag color="blue">Billed</Tag>
          ) : record.status === 3 ? (
            <Tag color="orange">Partial</Tag>
          ) : (
            ""
          )}
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
      <span className="px-2 py-2 self-end">
        <CSVLink
          filename={"SES_sells_report.csv"}
          className="bg-home px-2 hover:text-red-400 py-1 rounded-md"
          data={csvData}
        >
          Download Excel
        </CSVLink>
      </span>
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
