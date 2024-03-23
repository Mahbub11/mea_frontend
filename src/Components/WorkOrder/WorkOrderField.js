import { Input } from 'antd'
import React from 'react'

export default function WorkOrderField({ onEditItem, cellData }) {
  return (
    <div>
         <Input
         disabled={cellData.isDisable ? true : false}
      className={`${cellData.className} font-[700]`}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
    </div>
  )
}
