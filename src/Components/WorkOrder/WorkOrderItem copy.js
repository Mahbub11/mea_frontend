import React, { useEffect, useState } from "react";
import WorkOrderField from "./WorkOrderField";
import { Button, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";


const mpaRate=[
  {
    label:25,
    value:340
  },
  {
    label:28,
    value:345
  },
  {
    label:30,
    value:345
  },
  {
    label:32,
    value:350
  }
]
export default function WorkOrderItem({
  id,
  materials_name,
  materials_category,
  materials_quantity,
  materials_rate,
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
          
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Name",
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
         
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: materials_name,
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        
        
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Category",
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
         
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: materials_category,
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        
        
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Quantity",
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
         
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: `${materials_quantity } CFT`,
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        
        
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Materials Rate",
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
         
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: materials_rate,
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        
        
      </tr>
      <tr className="">
        <td className="w-auto px-2 ">
          
          <WorkOrderField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: "Order Amount",
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
         
          <WorkOrderField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              isDisable:disabledNew ? false: disabled,
              placeholder: "Value",
              type: "text",
              min: "1",
              name: "value",
              id: id,
              value: 170000000,
              className: " px-2 py-2 w-[10rem] drop-shadow-sm",
            }}
          />
        </td>
        
        
      </tr>
    </div>
  );
}
