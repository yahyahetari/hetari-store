"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const cart = useCart();

  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2 ml-4 mr-4 "
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base-bold">{product.title}</p>
          <p className="text-small-medium text-grey-1">{product.category}</p>
        </div>
        
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <ShoppingCart
          onClick={(e) => {
            e.preventDefault();
            cart.addItem({
              item: product,
              quantity: 1, // Default quantity
              color: product.colors[0], // Default color
              size: product.sizes[0], // Default size
            });
          }}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
