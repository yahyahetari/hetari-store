import ProductCard from "@/components/ProductCard";
import { getCollectionsDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionsDetails(params.collectionId);
  return (
    <div className="px-10 py-5 flex flex-col items-center gap-6">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        className="rounded-xl w-full h-[500px] object-cover "
        alt="collection"
      />
      <h1 className="text-heading2-bold text-grey-1 text-center">
        {collectionDetails.title}
      </h1>
      <p className="text-heading4-bold text-center text-grey-1 max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-18 mx-auto ">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product}  />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
