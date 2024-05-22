import React, { useState } from "react";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";

const data = [
  {
    date: "2021-01-01",
    stone: {
      amount: 44,
      rate: 456,
    },
    sand:{
        amount: 44,
        rate: 456,
      },
    cement:{
        amount: 44,
        rate: 456,
      },
    admixer: {
        amount: 44,
        rate: 456,
      },
    brick_chips: {
        amount: 44,
        rate: 456,
      },
    other: [
      {
        name: "pump 120Hp",
        price: 2300,
      },
      { name: "splitter", price: 2300 },
    ],
  },
  {
    date: "2021-01-01",
    stone: {
      amount: 44,
      rate: 456,
    },
    sand:{
        amount: 44,
        rate: 456,
      },
    cement:{
        amount: 44,
        rate: 456,
      },
    admixer: {
        amount: 44,
        rate: 456,
      },
    brick_chips: {
        amount: 44,
        rate: 456,
      },
    other: [
      {
        name: "pump 120Hp",
        price: 2300,
      },
      { name: "splitter", price: 2300 },
    ],
  },
  {
    date: "2021-01-01",
    stone: {
      amount: 44,
      rate: 456,
    },
    sand:{
        amount: 44,
        rate: 456,
      },
    cement:{
        amount: 44,
        rate: 456,
      },
    admixer: {
        amount: 44,
        rate: 456,
      },
    brick_chips: {
        amount: 44,
        rate: 456,
      },
    other: [
      {
        name: "pump 120Hp",
        price: 2300,
      },
      { name: "splitter", price: 2300 },
    ],
  },
 
];
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (id, record) => (
      <div className="w-[5rem] text-[13px]">
        {
          //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
          // <p>{record.index}.</p><p>{title}</p>

          // </Link>
          <button className=" font-montserrat font-[400] flex gap-2">
            <h1>{record.date}</h1>
          </button>
        }
      </div>
    ),
  },
  {
    title: "Stone",
    dataIndex: "due_date",
    key: "due_date",
    render: (id, record) => (
      <div className="w-[5rem] text-[13px]">
        {
          //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
          // <p>{record.index}.</p><p>{title}</p>

          // </Link>

          <div className="">
            <div>Amount: {record.stone.amount}</div>
            <div>Rate: {record.stone.rate}</div>
          </div>
        }
      </div>
    ),
  },
  {
    title: "Sand",
    dataIndex: "description",
    key: "description",

    render: (level, record) => (
      <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
        <div className="">
            <div>Amount: {record.sand.amount}</div>
            <div>Rate: {record.sand.rate}</div>
          </div>
      </div>
    ),
  },
  {
    title: "Cement",
    dataIndex: "companyname",
    key: "companyname",
    render: (level, record) => (
      <div className="cursor-pointer font-montserrat font-[400] text-[13px]">
      <div className="">
            <div>Amount: {record.cement.amount}</div>
            <div>Rate: {record.cement.rate}</div>
          </div>
      </div>
    ),
  },
  {
    title: "Admixer",
    dataIndex: "projectname",
    key: "projectname",
    render: (level, record) => (
      <div className="cursor-pointer font-montserrat font-[400] w-[5rem] text-[13px]">
       <div className="">
            <div>Amount: {record.admixer.amount}</div>
            <div>Rate: {record.admixer.rate}</div>
          </div>
      </div>
    ),
  },
  {
    title: "Bricks_Chips",
    dataIndex: "unit",
    key: "unit",
    render: (level, record) => (
      <div className="font-[500] cursor-pointer font-montserrat  text-[13px]">
      <div className="">
            <div>Amount: {record.brick_chips.amount}</div>
            <div>Rate: {record.brick_chips.rate}</div>
          </div>
      </div>
    ),
  },
  {
    title: "Others",
    dataIndex: "paid_amount",
    key: "paid_amount",
    fixed: "right",
    render: (level, record) => (
      <div className="font-[600] cursor-pointer font-montserrat text-[13px] overflow-y-scroll">
        <span>
          {record.other.map((item, index) => {
            return (
              <div key={index}>
                <span>
                  <span>
                    {item.name}: {item.price}tk
                  </span>
                </span>
              </div>
            );
          })}
        </span>
      </div>
    ),
  },
];
export default function PurchaseHistory() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  return (
    <div className="mt-5">
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

          dataSource={data}
          columns={columns}
          style={{ fontSize: "20px" }}
          size="middle"
          scroll={
            isMobile ? { x: "calc(700px + 50%)" } : { x: "calc(700px + 40%)" }
          }
        />
        <div className="w-full flex justify-center gap-3 mt-5">
          <Pagination
            current={1}

            // itemRender={itemRender}
          />
          <div className="">
            <Select
              defaultValue={5}
              style={{ width: 120 }}
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
