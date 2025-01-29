import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { createRouteHandlerClient } from "@supabase/ssr"
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  // const { data: fruitDB } = await supabase.from("fruitdb").select();
  const { data: names } = await supabase
    .from("namesDB")
    .select("*")
    .order("id", { ascending: true });

  return new Response(JSON.stringify(names as any), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

// export async function POST(request: Request) {
//   // const formData = await request.formData()
//   // const fruit = formData.get("fruit")
//   // const price = formData.get("price")

//   const { name, price } = await request.json();

//   const supabase = await createClient();
//   // const supabase = await createClient();
//   // const supabase = createRouteHandlerClient({ cookies })

//   const { data, error } = await supabase
//     .from("fruitdb")
//     .insert([{ name: name, price: price }])
//     .select();

//   return new Response(JSON.stringify(data), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // return new Response(JSON.stringify(data as any), {
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   status: 201,
//   //   statusText: "Created",
//   // })
// }
