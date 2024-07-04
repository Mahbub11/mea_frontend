import React, { useEffect, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import WorkOrderField from "../WorkOrder/WorkOrderField";
import InventoryItemField from "./InventoryItemField";

const itemList = [
  {
    label: "sand",
    value: "sand",
  },
  {
    label: "stone",
    value: "stone",
  },
  {
    label: "cement",
    value: "cement",
  },
  {
    label: "admixer",
    value: "admixer",
  },
  {
    label: "bricks",
    value: "bricks_chips",
  },
  {
    label: "miscellaneous",
    value: "miscellaneous",
  },
];
export default function InventoryItem({
  id,
  onEdtiItem,
  onDeleteItem,
  itemName,
  misItemName,
}) {
  const [item, setItem] = useState();
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);

  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  useEffect(() => {
    onEdtiItem({
      event: {
        id,
        name: "itemName",
        value: item,
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "amount",
        value: amount,
      },
      flag: 2,
    });
    onEdtiItem({
      event: {
        id,
        name: "rate",
        value: rate,
      },
      flag: 2,
    });

    setTotal(rate * amount);
  }, [item, rate, amount]);

  const handleRate = (value) => {
    setRate(value);
  };
  const handleAmount = (value) => {
    setAmount(value);
  };

  return (
    <div>
      <tr className="">
        <td className="w-auto px-2 ">
          <InventoryItemField
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Name",
              type: "text",
              name: "name",
              id: id,
              value: item === "miscellaneous" ? "Item" : "Item Name",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td className="px-2 w-[5rem]">
          <Select
            value={item}
            onChange={(e) => setItem(e)}
            showSearch
            className="h-[2.5rem] w-full font-[700]"
            placeholder="Search to Select"
            optionFilterProp="children"
            options={itemList.map((val, key) => {
              return {
                value: `${val.value}`,
                label: val.label,
              };
            })}
          />
        </td>
      </tr>

      <tr className={`${item === "miscellaneous" ? "show" : "hidden"} `}>
        <td className="w-full px-2 ">
          <InventoryItemField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Item Name",
              type: "text",
              // name: "materials_category",
              id: id,
              value: "Item Name",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <InventoryItemField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Gazi 120HP Pump",
              type: "text",
              min: "1",
              name: "misItemName",
              id: id,
              value: misItemName,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className={`${item === "miscellaneous" ? "hidden" : "block"} `}>
        <td className="w-full px-2 ">
          <InventoryItemField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Name",
              type: "text",
              // name: "materials_category",
              id: id,
              value:item==='sand' ? "Item Rate(per cft)":
              item==='bricks_chips' ? "Item Rate(per cft)":
              item==='admixer'?'Item Rate(per kg)':"Item Rate(per ton)",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <InventoryItemField
            onEditItem={(e) => handleRate(e.target.value)}
            // onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "0",
              type: "text",
              min: "1",
              name: "rate",
              id: id,
              value: rate,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <tr className="">
        <td className="w-auto px-2 ">
          <InventoryItemField
            onEditItem={(event) => onEdtiItem({ event: event })}
            cellData={{
              placeholder: "Name",
              type: "text",
              // name: "materials_category",
              id: id,
              value: "Item Amount",
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
        <td cclassName="w-auto px-2 ">
          <InventoryItemField
            onEditItem={(e) => handleAmount(e.target.value)}
            cellData={{
              placeholder: "0",
              type: "text",
              min: "1",
              name: "amount",
              id: id,
              value: amount,
              className: " px-2 py-2 w-[12rem] drop-shadow-sm",
            }}
          />
        </td>
      </tr>

      <div className="w-full ml-3 flex gap-3">
        <Button
          onClick={() => deleteItemHandler(id)}
          className=" w-[20%] mt-3 border-red-500"
        >
          Remove
        </Button>
        <div
          className={`${
            item === "miscellaneous" ? "hidden" : "block"
          } w-[80%] mt-4 font-[700]`}
        >
          Total: {total}tk
        </div>
      </div>
    </div>
  );
}
