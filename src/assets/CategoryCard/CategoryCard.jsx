import React, { useState } from "react";
import CategoryImage from "./CategoryImage";
import CategoryInfo from "./CategoryInfo";
import CategoryPurchaseOptions from "./CategoryPurchaseOptions";
import CategoryActions from "./CategoryActions";

const CategoryCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [purchaseUnit, setPurchaseUnit] = useState("piece");
  const [showCounter, setShowCounter] = useState(false);

  const handleMinusClick = () => {
  const minQuantity = purchaseUnit === 'bulk' ? 5 : 1;
  if (quantity > minQuantity) {
    setQuantity(quantity - 1);
  } else {
    setShowCounter(false); 
    setQuantity(minQuantity);  
  }
};


  return (
    <div className="w-full sm:w-[300px] md:w-[280px] lg:w-[260px] mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <CategoryImage imageUrl={data.imageUrl} />
      <CategoryInfo name={data.name} price={data.price} points={data.points} />
      <CategoryPurchaseOptions
      quantity={quantity}
      setQuantity={setQuantity}
      purchaseUnit={purchaseUnit}
      setPurchaseUnit={setPurchaseUnit}
      handleMinusClick={handleMinusClick}
      showCounter={showCounter}
     />




    <CategoryActions
      purchaseUnit={purchaseUnit}
      showCounter={showCounter}
      setShowCounter={setShowCounter}
    />

    </div>
  );
};

export default CategoryCard;
