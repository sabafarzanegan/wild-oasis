"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { actiondeletbooking } from "../_lib/action";
import { useTransition } from "react";
import Spinner from "./Spinner";
function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelet() {
    if (confirm("Are you sure to delet this reservation?"))
      startTransition(() => actiondeletbooking(bookingId));
  }
  return (
    <button
      onClick={handleDelet}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      {!isPending ? (
        <span className="mt-1">Delete</span>
      ) : (
        <span className="mt-1">
          <Spinner />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
