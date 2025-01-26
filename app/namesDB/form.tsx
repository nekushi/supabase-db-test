"use client"

import { useFormStatus } from "react-dom"
import React, { useActionState, useRef, useState } from "react"
import { createPost } from "../actions"
import { useRouter } from "next/navigation"



export default function Form() {

  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState<string | null>(null)

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log("Form submitted");

  //   const fruit = fruitRef.current?.value
  //   const price = priceRef.current?.value

  //   if(!fruitRef.current?.value || !priceRef.current?.value) {
  //     setResponse("Both field is required.")
  //     return
  //   }

  //   const res = await fetch("/api", {
  //     method: "post",
  //     body: JSON.stringify({ name: fruit, price: price })
  //   })

  //   const data = res.json()

  //   router.refresh()

  //   // const result = await res.json()

  //   // if(res.ok) {
  //   //   setResponse("Data added successfully")
  //   // } else {
  //   //   setResponse("Something went wrong")
  //   // }

  //   // fruitRef.current = null
  //   // priceRef.current = null

  // }

  const [ data, action, pending ] = useActionState(createPost, undefined);

  return (
    // <form action={action}>
    // <form method="POST" action={`/api?fruit=${fruitRef.current}&price=${priceRef.current}`}>
    <form action={action} className="w-64 border-2 border-black p-4 rounded-md flex flex-col space-y-4">
      <input ref={nameRef} className="border-2 border-black indent-1" type="text" name="name" placeholder="Enter a name" />
      <input ref={ageRef} className="border-2 border-black indent-1" type="text" name="age" placeholder="Enter age" />
      <input type="submit" value="Create Post" disabled={pending} className={`${pending && "text-slate-500 cursor-pointer"} px-4 py-2 border-2 border-black`} />
      {/* {data?.message && <p className="text-red-500">ERROR: {data.message}</p>} */}
    </form>
    // <h1>hello world</h1>
  )
}