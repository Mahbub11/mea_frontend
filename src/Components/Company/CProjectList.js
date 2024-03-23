import { Collapse, Input, Pagination, Select, Table, Tooltip } from "antd";
import React, { useState } from "react";
import moment from "moment";

export default function CProjectList({ data }) {
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
              <Tooltip placement="topLeft" title={record.name}>
                <p className="overflow-hidden truncate ">{record.name}</p>
              </Tooltip>
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
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.mpa}</p>
        </div>
      ),
    },
    {
      title: "Cubic Meter",
      dataIndex: "cubic_meter",
      key: "cubic_meter",
      render: (level, record) => (
        <div className="cursor-pointer font-montserrat font-[400] ">
          <p>{record.cubic_meter}</p>
        </div>
      ),
    },
    {
      title: "CFT Quantity",
      dataIndex: "cft_quantity",
      key: "cft_quantity",
      render: (level, record) => (
        <div className=" cursor-pointer font-montserrat font-[400] ">
          <p>{record.cft_quantity}</p>
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
              total={data.length}
              // itemRender={itemRender}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
