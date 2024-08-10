"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchparams = useSearchParams();
  console.log(searchparams);

  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchparams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const activeFilter = searchparams.get("capacity") ?? "all";
  console.log(activeFilter);

  return (
    <div className="border border-primary-800 flex items-center ">
      <button
        onClick={() => handleFilter("all")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "all" ? "bg-primary-700" : ""
        }  `}>
        All cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "small" ? "bg-primary-700" : ""
        } `}>
        1&mdash;3 guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "medium" ? "bg-primary-700" : ""
        }`}>
        4&mdash;7 guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === "large" ? "bg-primary-700" : ""
        }`}>
        8&mdash;12 guests
      </button>
    </div>
  );
}

export default Filter;
