import { auth } from "@/src/_lib/auth";
import React from "react";

async function page() {
  const session = await auth();

  return (
    <div className="text-lg text-accent-500">
      Hello,{" "}
      <p className="text-xl text-accent-600 font-bold">{session.user.name}</p>{" "}
    </div>
  );
}

export default page;
