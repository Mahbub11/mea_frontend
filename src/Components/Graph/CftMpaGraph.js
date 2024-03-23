import React, { useEffect, useState } from "react";
import { Skeleton, Collapse } from "antd";
import { DatePicker, Space } from "antd";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import './index.css'
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;


const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: 'CFT'
      }
    },
    x: {
      title: {
        display: true,
        text: 'MPA'
      }
    }
  },
  plugins: {
    legend: {
      display: false,
    },
  }
}
// const data = {
 
//   labels: [30,28,25,28,28,32,30,25],
//   datasets: [
//     {
//       label: "Casting Report",
//       data: [1059.45,988.82,882.875,988.82,988.82,1130,1059.45,882.875],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//         "rgba(255, 205, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(201, 203, 207, 0.2)",
//       ],
//       borderColor: [
//         "rgb(255, 99, 132)",
//         "rgb(255, 159, 64)",
//         "rgb(255, 205, 86)",
//         "rgb(75, 192, 192)",
//         "rgb(54, 162, 235)",
//         "rgb(153, 102, 255)",
//         "rgb(201, 203, 207)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export default function CftMpaGraph() {

  const {sellsList} = useSelector((state)=> state.sells)
  const [dateRange, setDateRange] = useState([]);

  const [data, setData] = useState({
    labels: sellsList.map(
      (data) => data.mpa
    ),
    datasets: [
      {
        label: "CFT Quantity",
        data: sellsList.map((data) => data.mpa * 35.315),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(()=>{
    const sortedData = getData(dateRange[0], dateRange[1], sellsList);

      setData({
        labels: sortedData.map(
          (data) => data.mpa
        ),
        datasets: [
          {
            label: "CFT Quantity",
        data: sortedData.map((data) => data.mpa * 35.315),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
  },[dateRange,sellsList])



  function getData(start, end, data) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return data.filter((item) => {
      console.log(item);
      const itemTime = new Date(item.createdAt).getTime();

      return itemTime >= startTime && itemTime <= endTime;
    });
  }

  const onChange = (date, dateString) => {
    setDateRange(dateString);
   
  };

  return (
    <div>
      <div className=" px-2 rounded-sm py-3 sm:w-full  md:w-[45rem]">
        <div className="flex justify-center ">
          <RangePicker onChange={onChange} />
        </div>

        <div className="rounded-md px-4 py-4 flex-col justify-center bg-header/30 mt-3">
          <h1 className="self-end w-full flex justify-end underline"><span className="font-[700]">35.315 {" "}</span> per CFT</h1>
          <Bar options={options} data={data}></Bar>
        </div>
      </div>
    </div>
  );
}
