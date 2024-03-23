import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCompany } from "../../redux/slices/company";


export default function EditCompany({data,handleReFetch,closeModal}) {

  console.log(data)

  const dispatch= useDispatch()
  const [name,setName]= useState(data.name)
  const [address,setAddress]= useState(data.address)
  const [email,setEmail]= useState(data.email)    
  const [phone,setPhone]= useState(data.phone)
  const [description,setDescription]= useState(data.description)
  const [busy,isBusy]= useState(true)

  useEffect(()=>{
      setName(data.name)
      setAddress(data.address)
      setEmail(data.email)
      setPhone(data.phone)
      setDescription(data.description)
      isBusy(false)
  },[busy,data])

 const handleEdit=()=>{
  data={
    id:data.id,
    name:name,
    address:address,
    email:email,
    phone:phone,
    description:description
  }
 

  dispatch(updateCompany(data))
  setName()
  setAddress()
  setEmail()
  setPhone()
  setDescription()
  handleReFetch()

 }


  return (
    <div>
      <div className="mt-10">
      
        <h1 className="text-center font-poppinsBold text-[30px]">
          Edit Company
        </h1>
        <div>
          <div>
            <div className="mt-10 sm:w-[90%] md:w-[40%] flex justify-center flex-col gap-5
             m-auto text-[15px] px-2 py-5">
              <div>
                <p>* Company Name</p>
                <Input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                  className="h-10"
                  placeholder="Enter Company Name"
                ></Input>
              </div>

              <div>
                <p>* Company Description(optional)</p>
                <TextArea
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                  rows={3}
                  className="h-10"
                  placeholder="Enter Company Description"
                ></TextArea>
              </div>

              <div>
                <p>* Company Address(optional)</p>
                <Input
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                  className="h-10"
                  placeholder="Enter Company Address"
                ></Input>
              </div>
              <div>
                <p>* Company Email(optional)</p>

                <Input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Company Email"
                  className="h-10"
                ></Input>
              </div>

              <div>
                <p>* Company Contact(optional)</p>

                <Input 
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className="h-10" placeholder="+88 000 00000"></Input>
              </div>

              <button onClick={handleEdit} className="cursor-pointer hover:bg-blue-300 px-2 py-2 border-2 rounded-md">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
