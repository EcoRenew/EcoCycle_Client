import React from "react";
import { Plus, Truck } from "lucide-react";

const CategoryActions = ({ setShowCounter }) => {
  return (
    <div className="px-6 pb-6 space-y-3">
      {/* زر الإضافة للسلة */}
     <button
  onClick={() => setShowCounter(true)}
  className="w-full bg-[#38af44] hover:bg-[#2e8f38] text-white py-2 px-3 text-sm rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
>
  <Plus size={20} />
  Add to Cart
</button>



      {/* زر التواصل للشحن بالجملة */}
      <button
        className="w-full bg-gray hover:bg-gray-200 text-gray-700 py-2 px-3 text-sm rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-gray-200"
      >
        <Truck size={20} />
        Contact for Bulk Shipping
      </button>

    </div>
  );
};

export default CategoryActions;
