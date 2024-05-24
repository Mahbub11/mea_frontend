import { Button, Input } from "antd";
import React, { useState } from "react";
import { uid } from "uid";
import {useDispatch} from 'react-redux'
import InventoryItem from "./InventoryItem";
import { AddMiscellaneous } from "./AddMiscellaneous";
import {sentoInventory} from '../../redux/slices/inventory'

export default function Addbalance() {

  const dispatch= useDispatch()
  const [items, setItems] = useState([
    {
      id: uid(6),
      sno: uid(6),
      itemName: "",
      rate: "",
      amount: "",
      misItemName:''
    },
  ]);
 
  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uid(6),
        sno: uid(6),
        itemName: "",
        rate: "",
        amount: "",
        misItemName:''
      },
    ]);
  };
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  const edtiItemHandler = ({ event, flag = 1 }) => {
    if (flag === 1) {
      const editedItem = {
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      };

      const newItems = items.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setItems(newItems);
    } else {
      const editedItem = {
        id: event.id,
        name: event.name,
        value: event.value,
      };

      const newItems = items.map((items) => {
        for (const key in items) {
          if (key === editedItem.name && items.id === editedItem.id) {
            items[key] = editedItem.value;
          }
        }
        return items;
      });

      setItems(newItems);
    }
  };

  const handleSave=()=>{
    dispatch(sentoInventory(items))
  }

  console.log(items);

  return (
    <div>
      <div>
        <h1 className="font-poppinsBold text-[25px] text-center">
          Add Purchase Items
        </h1>

        <div className="mt-10 flex gap-5 px-2 py-2 flex-wrap justify-center w-full">
          {items.map((item) => (
            <InventoryItem
              itemName={item.itemName}
              rate={item.rate}
              amount={item.amount}
              misItemName={item.misItemName}
              key={item.id}
              id={item.id}
              onDeleteItem={deleteItemHandler}
              onEdtiItem={edtiItemHandler}
            />
          ))}

         
        </div>
        <div className="mt-10 ml-3 w-full m-auto flex  gap-5 justify-center">
          <button
            onClick={addItemHandler}
            className="bg-blue-300 rounded-md px-10 py-1  text-white"
          >
            Add Item
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-300 rounded-md px-10 py-1  text-white"
          >
           Save Items
          </button>
         
        </div>
      </div>
    </div>
  );
}
