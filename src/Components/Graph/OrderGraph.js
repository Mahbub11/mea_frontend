import React, { useState } from "react";
import { Skeleton, Collapse } from "antd";
import { DatePicker, Space } from "antd";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import './index.css'
const { RangePicker } = DatePicker;


const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'Quantity'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Date'
      }
    }
  },
  plugins: {
    legend: {
      display: false,
    },
  }
}
const data = {
 
  labels: ['2-2-24','2-3-24','2-4-24','2-5-24','2-6-24','2-7-24','2-8-24'],
  datasets: [
    {
      label: "Casting Report",
      data: [165, 159, 180, 181, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function OrderGraph() {
  return (
    <div>
      <div className=" px-2 rounded-sm py-3 sm:w-full  md:w-[45rem]">
        <div className="flex justify-center ">
          <RangePicker  />
        </div>

        <div className="rounded-md px-4 py-4 flex justify-center bg-header/30 mt-3">
          <Bar options={options} data={data}></Bar>
        </div>
      </div>
    </div>
  );
}
