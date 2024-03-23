import { Collapse, Input, Pagination, Select, Table, Tooltip } from "antd";
import React, { useState } from "react";
import moment from "moment";

export default function PSellsList({ data }) {

    console.log(data)
  const [current, setCurrent] = useState(1);
  const [page, setPage] = useState(5);

  const columns = [
    {
      title: "Sell Date",
      dataIndex: "sell_date",
      key: "sell_date",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (id, record) => (
        <div className="">
          {
            <div>
                <span>
                {moment(record.sell_date).format("DD-MM-YYYY")}
                </span>
             
            </div>
          }
        </div>
      ),
    },
    {
      title: "MPA",
      dataIndex: "mpa",
      key: "mpa",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.mpa}</p>
        </div>
      ),
    },
    {
      title: "Stone",
      dataIndex: "stone",
      key: "stone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.stone}</p>
        </div>
      ),
    },
    {
      title: "Sand",
      dataIndex: "sand",
      key: "sand",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>{record.sand}</p>
        </div>
      ),
    },

    {
      title: "Cement",
      dataIndex: "cement",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.cement}</p>
        </div>
      ),
    },
    {
      title: "Admixer",
      dataIndex: "admixer",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.admixer}</p>
        </div>
      ),
    },
    {
      title: "Cubic Meter",
      dataIndex: "cubic_meter",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.cubic_meter}</p>
        </div>
      ),
    },
    {
      title: "CFT Quantity",
      dataIndex: "cft_quantity",
      key: "phone",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.cft_quantity}</p>
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
      <div>
        <div className=" w-[95%] mt-5 flex-col gap-5 justify-center m-auto">
          <Table
            dataSource={data}
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
              total={data?.length}
              // itemRender={itemRender}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
