import { Collapse, Input, Pagination, Select, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function InvoiceBillItems({ data }) {
  console.log(data);

  const [current, setCurrent] = useState(1);
  const [page, setPage] = useState(5);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (id, record) => (
        <div className="">
          {
            <button className="sm:text-[15px] w-[5rem]  font-montserrat font-[400] flex gap-2">
              <Tooltip placement="topLeft" title={record.materials_Name}>
                <p className="overflow-hidden truncate ">
                  {record.materials_Name}
                </p>
              </Tooltip>
            </button>
          }
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "mpa",
      key: "mpa",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.materials_category}</p>
        </div>
      ),
    },
    {
      title: "Quantity(cft)",
      dataIndex: "cubic_meter",
      key: "cubic_meter",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.materials_quantity}</p>
        </div>
      ),
    },
    {
      title: "Rate(tk)",
      dataIndex: "joined",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.materials_rate}</p>
        </div>
      ),
    },
    {
      title: "Cubic Meter",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>{record.cubic_meter}</p>
        </div>
      ),
    },
    {
      title: "Stone(ton)",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>
            {parseInt(record.materials_category) === 21
              ? (record.cubic_meter * 1075) / 1000
              : parseInt(record.materials_category) === 25
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 28
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 30
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 32
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 35
              ? (record.cubic_meter * 1060) / 1000
              : 0}
          </p>
        </div>
      ),
    },
    {
      title: "Sand(cft)",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>
            {parseInt(record.materials_category) === 21
              ? Math.floor((record.cubic_meter * 865) / 3)
              : parseInt(record.materials_category) === 25
              ? (record.cubic_meter * 850) / 35
              : parseInt(record.materials_category) === 28
              ? Math.floor((record.cubic_meter * 820) / 35)
              : parseInt(record.materials_category) === 30
              ? Math.floor((record.cubic_meter * 820) / 35)
              : parseInt(record.materials_category) === 32
              ? Math.floor((record.cubic_meter * 810) / 35)
              : parseInt(record.materials_category) === 35
              ? Math.floor((record.cubic_meter * 770) / 35)
              : 0}
          </p>
        </div>
      ),
    },
    {
      title: "Cement(ton)",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>
            {parseInt(record.materials_category) === 21
              ? (record.cubic_meter * 1075) / 1000
              : parseInt(record.materials_category) === 25
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 28
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 30
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 32
              ? (record.cubic_meter * 1040) / 1000
              : parseInt(record.materials_category) === 35
              ? (record.cubic_meter * 1060) / 1000
              : 0}
          </p>
        </div>
      ),
    },
    {
      title: "Admixer(kg)",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>
            {parseInt(record.materials_category) === 21
              ? record.cubic_meter * 1.5
              : parseInt(record.materials_category) === 25
              ? record.cubic_meter * 2.5
              : parseInt(record.materials_category) === 28
              ? record.cubic_meter * 3
              : parseInt(record.materials_category) === 30
              ? record.cubic_meter * 3
              : parseInt(record.materials_category) === 32
              ? record.cubic_meter * 3.5
              : parseInt(record.materials_category) === 35
              ? record.cubic_meter * 3.5
              : 0}
          </p>
        </div>
      ),
    },
    {
      title: "Pump Charge",
      dataIndex: "pump_charge",
      key: "pump_charge", 
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
        <p>
            {record.pump_charge }
          </p>
        </div>
      ),
    },

    {
      title: "Amount",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>{record.work_order_amount}Tk</p>
        </div>
      ),
    },
  ];

  const onChangePage = (page) => {
    setCurrent(page);
  };
  const handleChange = (value) => {
    setPage(value);
  };
  return (
    <div className="font-poppins text-[20px]">
      <h1 className="text-center">
        Items Of :
        <span className="font-[700] bg-gray-100 px-1 py-1 rounded-md">
          {data.project.name}
        </span>
      </h1>
      <div>
        <div className=" w-full mt-5 flex-col gap-5 justify-center m-auto">
          <Table
            dataSource={data.workorder.items}
            columns={columns}
            style={{ fontSize: "20px" }}
            size="middle"
            pagination={{
              pageSize: page,
              current: current,
              style: { display: "none" },
            }}
          />
          <div className="flex justify-center mt-5">
            <Select
              defaultValue={8}
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

            <Pagination
              current={current}
              pageSize={page}
              onChange={onChangePage}
              total={data.length}
              // itemRender={itemRender}
            />
          </div>
        </div>

        <div className="mt-10 ml-5">
          <h2 className="font-poppinsBold">Additional Info</h2>
          <div className="mt-5">
            <div className="flex-col gap-5">
              <h2>Order Date: <span className="font-[700]">{moment(data.workorder.order_date).format("DD-MM-YYYY")}</span></h2>
              <h2>Delivery Date: <span className="font-[700]">{moment(data.workorder.delivery_date).format("DD-MM-YYYY")}</span></h2>
              <h2>Site Eng. Name: <span className="font-[700]">{data.workorder.site_eng_name}</span></h2>
              <h2>Site Eng. Phone: <span className="font-[700]">{data.workorder.site_eng_phone}</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
