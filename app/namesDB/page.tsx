
"use client"

import { createClient } from '@/utils/supabase/server';

import Form from './form';
import { useEffect, useState } from 'react';

export default function FruitDB() {
  const [ names, setNames ] = useState<any[]>([])
  const [ formType, setFormType ] = useState<string>("post")

  useEffect(() => {
    let ignore = false

    async function getFruits() {
      const res = await fetch("/api")
      const data = await res.json()

      if(!ignore) {
        setNames(data)
      }
    }

    getFruits()

    return () => { ignore = true }
  }, [])

  return (
    <>
      <h1>Landing Page muhehehe</h1>
      <Form type={formType} />
      <div className='[&>*]:px-2 [&>*]:py-1 [&>*]:border-2 [&>*]:border-black space-x-8 my-4'>
        <button value={"POST"} onClick={() => {setFormType("post")}}>POST</button>
        <button value={"PUT"} onClick={() => {setFormType("put")}}>PUT</button>
        <button value={"DELETE"} onClick={() => {setFormType("delete")}}>DELETE</button>
      </div>
      <pre>{JSON.stringify(names, null, 2)}</pre>
      {/* <pre>{JSON.stringify(fruits, null, 2)}</pre> */}
    </>
  )
}
