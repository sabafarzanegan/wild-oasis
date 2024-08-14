"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInaction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutaction() {
  await signOut("google", { redirectTo: "/" });
}

export async function updateProfile(formData) {
  // console.log(formData);
  const session = await auth();
  console.log(session.user.guestId);

  if (!session) throw new Error("you must login");
  const nationalid = formData.get("nationalid");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updateData = { nationality, nationalid, countryFlag };
  // console.log(updateData);
  const { data, error } = await supabase
    .from("guest")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
