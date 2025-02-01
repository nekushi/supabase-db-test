"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export async function createPost(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name");
  const age = formData.get("age");

  if (!name || !age) {
    // return encodedRedirect("error", "/fruitDB", "Both field is required.");
    return { message: "Both field is required." };
  }
  // return encodedRedirect("success", `/api?fruit=${fruit}&price=${price}`, "Both field is required.");
  // redirect(`/api?fruit=${fruit}&price=${price}`)
  // const { data, error } = await supabase.from("fruitDB")
  const { data, error } = await supabase
    .from("namesDB")
    .insert([{ name, age }])
    .select();

  console.log(data, error);

  redirect("/namesDB");
}

export async function updateRow(prevState: any, formData: FormData) {
  // get data from form
  const name = formData.get("name");
  const age = formData.get("age");

  // check if no error
  // if (!name || !age) {
  //   return { message: "Both fields are required. " };
  // }

  // call and update database
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("namesDB")
    .update({ name, age })
    .eq("id", id)
    .select();

  // redirect serves as to refresh the page
  redirect("/namesDB");
}

export async function deleteRow(prevState: any, formData: FormData) {
  // get id
  const requestedID = formData.get("id");

  // validate ID
  if (!requestedID) {
    return { message: "ID is required. " };
  }

  // access db
  const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("namesDB")
  //   .delete()
  //   .eq({ id: 1 });

  const { error } = await supabase
    .from("namesDB")
    .delete()
    .eq("id", requestedID);

  // refresh page
  redirect("/namesDB");
}
