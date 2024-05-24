import { API_LEVEL } from "../config"
import axiosInstance from "../utils/axios"

export const sendToInventory=async(data)=>{
  
   await axiosInstance.post(`${API_LEVEL}/inventory/create-item`,data)
   .then(res=>{

   }).cath(err=>{
    console.log(err)

   })
}