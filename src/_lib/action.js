"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-server";
import { redirect } from "next/navigation";

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
export async function actiondeletbooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("you must login");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  // console.log(formData);
  const session = await auth();

  if (!session) throw new Error("you must login");

  const updateData = {
    numberGuest: Number(formData.get("numberGuest")),
    observations: formData.get("observations").slice(0, 100),
  };

  const bookingID = Number(formData.get("bookingID"));
  // console.log(updateData);
  // console.log(bookingID);

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingID)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingID}`);
  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  // console.log(formData);
  const session = await auth();

  if (!session) throw new Error("you must login");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numberGuest: Number(formData.get("numberGuest")),
    observations: formData.get("observations").slice(0, 100),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "uncomfirmed",
  };
  // console.log(newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinID}`);
}
