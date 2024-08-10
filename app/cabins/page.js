import CabinList from "@/src/components/CabinList";
import Filter from "@/src/components/Filter";
import Spinner from "@/src/components/Spinner";
import React, { Suspense } from "react";

// export const revalidate = 3600; // alwayes gettind fresh data from server not chach storage
async function page({ searchParams }) {
  // console.log(searchParams);
  let filter = searchParams?.capacity ?? "all";

  return (
    <div className="space-y-6">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Filter />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

export default page;
