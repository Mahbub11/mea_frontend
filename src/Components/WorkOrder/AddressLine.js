import React, { useEffect, useState } from "react";
import AddressLineField from "./AddressLineField";
import { Button, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function AddressLine({
  id,
  address,
  onDeleteItem,
  onEdtiItem,
  disabled,
  disabledNew
}) {
 

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };


  console.log(disabled)


  return (
    <div>
      <tr className="">
        <td className="w-auto px-2 ">
         
          <AddressLineField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Address Line",
              type: "text",
              name: "address",
              id: id,
              value: address,
              isDisable:disabledNew ? false: disabled,
              className: " px-2 py-2 w-[15rem] drop-shadow-sm",
            }}
          />
        </td>
        
        <td className="w-auto px-2 ">
         
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
