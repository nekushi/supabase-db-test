
"use client"

import { createClient } from '@/utils/supabase/server';

import Form from './form';
import { useEffect, useState } from 'react';

export default function FruitDB() {
  const [ names, setNames ] = useState<any[]>([])

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
      <Form />
      <pre>{JSON.stringify(names, null, 2)}</pre>
      {/* <pre>{JSON.stringify(fruits, null, 2)}</pre> */}
    </>
  )
}
