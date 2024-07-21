"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
    const cart = useCart();

    useEffect(() => {
        // clearCart should only be called once
        if (cart.cartItems.length > 0) {
            cart.clearCart();
        }
    }, [cart]);

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <h1 className='text-heading3-bold text-green-1'>Successful Payment</h1>
            <p className='text-heading1-bold text-black'>Free Palestine</p>
            <p className='text-heading1-bold text-red-1'>Free Palestine</p>
            <p className='text-heading1-bold text-green'>Free Palestine</p>
            <p className='text-body2'>Thank you for your payment</p>
            <Link href="/" className="p-4 border text-base-bold bg-black text-white hover:bg-white hover:text-black">
                Go Back To Home
            </Link>
        </div>
    );
}

export default SuccessfulPayment;
