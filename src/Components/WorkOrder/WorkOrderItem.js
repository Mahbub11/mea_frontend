import React, { useEffect, useState } from "react";
import WorkOrderField from "./WorkOrderField";
import { Button, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const mpaRateList = [
  {
    label: 20,
    value: 325,
  },
  {
    label: 21,
    value: 340,
  },
  {
    label: 25,
    value: 340,
  },
  {
    label: 28,
    value: 345,
  },
  {
    label: 30,
    value: 345,
  },
  {
    label: 32,
    value: 350,
  },
  {
    label: 35,
    value: 350,
  }
];
export default function WorkOrderItem({
  id,
  materials_name,
  materials_quantity,
  onDeleteItem,
  cubic_meter,
  onEdtiItem,
  disabled,
  disabledNew,
  pump_charge,
}) {
  const [mpa, setMpa] = useState();
  const [mpaRate, setMpaRate] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    onEdtiItem({
      event: {
        id,
        name: "materials_category",
        value: mpa,
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "materials_rate",
        value: mpaRate,
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "work_order_amount",
        value: amount ? amount : 0,
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "materials_quantity",
        value: Math.round(cubic_meter * 35.315),
      },
      flag: 2,
    });
  }, [mpa, mpaRate, amount, cubic_meter, materials_quantity, pump_charge]);

  useEffect(() => {
    setAmount(
      mpaRate * materials_quantity + parseFloat(pump_charge ? pump_charge : 0)
    );
  }, [materials_quantity, mpaRate, pump_charge]);

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  const mpacategory = (e) => {
    setMpa(e.split("-")[0]);
    setMpaRate(e.split("-")[1]);

    console.log(e.split("-")[1]);
  };

  return (
    <div>
      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Name",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: materials_name,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              // name: "materials_category",
              id: id,
              value: "Cubic Meter",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Value",
              type: "number",
              min: "1",
              name: "cubic_meter",
              id: id,
              value: cubic_meter,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              // name: "materials_category",
              id: id,
              value: "Materials Category",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <Select
            value={mpa}
            onChange={(e) => mpacategory(e)}
            showSearch
            className="h-[3rem] w-full font-[700]"
            placeholder="Search to Select"
            optionFilterProp="children"
            options={mpaRateList.map((val, key) => {
              return {
                value: `${val.label}-${val.value}`,
                label: val.label,
              };
            })}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Quantity(CFT)",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: true,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "materials_quantity",
              id: id,
              value: materials_quantity,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: false,
              placeholder: "Name",
              type: "text",
              // name: "name",
              id: id,
              value: "Materials Rate(per cft)",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: true,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "materials_rate",
              id: id,
              value: mpaRate,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>
      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Pump Charge",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              type: "number",
              placeholder: "Value",
              min: "1",
              name: "pump_charge",
              id: id,
              value: pump_charge,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: disabledNew ? false : disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Order Amount(TK)",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable: true,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "work_order_amount",
              id: id,
              value: amount ? amount : 0,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>
      <div className="w-[90%] m-auto">
        <Button
          onClick={() => deleteItemHandler(id)}
          className=" w-full mt-3 border-red-500"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
