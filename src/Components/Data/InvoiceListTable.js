import React, { useState } from "react";
import { Avatar, List, Radio, Space, Tag, Input, Button } from "antd";
import { Pagination, PaginationProps, Row, Select, Table } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

export default function InvoiceListTable({ list, handleQ,current,page }) {
  
 

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.index - b.index,

      render: (id, record) => (
        <div>
          {
            //     <Link  target='_self'  to={(`/practice/${type}/${record.index}`)} className="sm:text-[15px] md:text-[21px] font-montserrat font-[400] flex gap-2">
            // <p>{record.index}.</p><p>{title}</p>

            // </Link>
            <button
              onClick={(e) => handleQ(record.index)}
              className="sm:text-[15px]  font-montserrat font-[400] flex gap-2"
            >
              <p>{record.index}.</p>
             
            </button>
          }
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "cname",
      key: "cname",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
          <p>{record.cname}</p>
        </div>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "pname",
      key: "pname",
      render: (level, record) => (
        <div className=" font-montserrat font-[400] ">
          <p>{record.pname}</p>
        </div>
      ),
    },
    {
      title: "Invoice Created",
      dataIndex: "mpa",
      key: "mpa",
      render: (level, record) => (
        <div className="font-montserrat font-[400] ">
          <p>{record.date}</p>
        </div>
      ),
    },
   
    {
      title: "Action",
      dataIndex: "btn",
      key: "btn",
      render: (level, record) => (
        <div className="text-[17px] font-montserrat font-[400] ">
         <Button >Delete</Button>
        </div>
      ),
    },

  ];


  // const handleChange = (value) => {
  //   setPage(value);
  // };

  // const onChangePage = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };

  // const handleClick = (myLink) => () => {
  //   window.location.href = myLink;
  // };
  return (
    <div className="m-auto flex flex-col justify-center sm:pb-5">
      <div className="sm:w-full
      m-auto text-[21px]  ">
        <Table
          dataSource={list}
          columns={columns}
          style={{ fontSize: "20px" }}
          pagination={{
            pageSize: page,
            current: current,
            style: { display: "none" },
          }}
          
          // rowClassName="bg-[#f8f9fa] "

         
        />


      </div>
      
    </div>
  );
}
