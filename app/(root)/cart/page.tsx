"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));
  console.log(user)
  const customer = {
    clerkId: user?.id,
    email:user?.emailAddresses[0].emailAddress,
    name: user?.fullName
  };
  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({
            cartItems: cart.cartItems, 
            customer,
          }),
          
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data)
      }
    } catch (err) {
      console.log("[checkout_post]", err);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />
        {cart.cartItems.length === 0 ? (
          <p className="text-heading4-bold">Your cart is empty</p>
        ) : (
          <div>
          {cart.cartItems.map((cartItem) => (
            <div className="w-full flex max-sm:flex-col rounded-lg max-sm:gap-3 hover:bg-grey-2 px-4 py-3 m-3 items-center max-sm:items-start justify-between">
              <div className="flex items-center">
                <Image
                  src={cartItem.item.media[0]}
                  width={100}
                  height={100}
                  className="rounded-lg w-32 h-32 object-cover"
                  alt="product"
                />
                  <div className="flex flex-col gap-4 ml-4">
                    <p className="text-heading4-bold">{cartItem.item.title}</p>
                    {cartItem.color &&(
                      <p className="text-small-medium text-grey-1 rounded-lg">
                        {cartItem.color} 
                      </p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium text-grey-1  rounded-lg">
                        {cartItem.size}
                        </p>
                        )}

                    <p className="text-small-medium">
                      {" "}
                      ${cartItem.item.price}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 ml-3  cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 ml-3  mr-9 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                  <Trash
                    className="hover:text-red-1 ml-9 cursor-pointer max-sm:absolute max-sm:right-3"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-2 rounded-lg px-4 py-5">
        <p className=" text-heading3-bold pb-4 ">
          Summary{" "}
          <span>
            {`( ${cart.cartItems.length} ${
              cart.cartItems.length > 1 ? "items" : "item"
            } )`}
          </span>
        </p>
        <div className="flex justify-between items-center">
          <span className="text-heading4-bold">Total Amount </span>
          <span className="text-heading4-bold">$ {totalRounded}</span>
        </div>
        <button
          className=" w-full bg-white hover:text-white hover:bg-black text-heading3-bold py-4 rounded-lg hover:bg-red-2 transition-all duration-300 "
          onClick={handleCheckout}
        >
          {" "}
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
