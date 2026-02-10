"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  mealId: string;
  price: number;
  title: string;
  image?: string;
  providerName: string;
  providerId: string;
}

const AddToCartButton = ({
  mealId,
  price,
  title,
  image,
  providerName,
  providerId,
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      mealId: mealId,
      title: title,
      price: Number(price),
      image: image,
      providerId: providerId,
      providerName: providerName,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className='btn-primary w-full flex items-center justify-center gap-2'>
      <ShoppingCart className='w-5 h-5' />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
