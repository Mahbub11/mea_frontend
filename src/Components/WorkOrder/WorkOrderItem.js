import React, { useEffect, useState } from "react";
import WorkOrderField from "./WorkOrderField";
import { Button, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function WorkOrderItem({
  id,
  name,
  value,
  onDeleteItem,
  onEdtiItem,
  disabled,
  disabledNew
}) {
 

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  const handleNext = (e) => {
    console.log(e);
  };

  return (
    <div>
      <tr className="">
        <td className="w-auto px-2 ">
          <p>Name</p>
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: name,
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <p>Value</p>
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: value,
              className: " px-2 py-2 w-[8rem] drop-shadow-sm",
            }}
          />
        </td>
        
        <td className="w-auto px-2 ">
          <p className="text-center">Action</p>
          <Button
            className="hover:bg-blue-400 bg-blue-200"
            onClick={deleteItemHandler}
          >
            Delete
          </Button>
        </td>
      </tr>
    </div>
  );
}
