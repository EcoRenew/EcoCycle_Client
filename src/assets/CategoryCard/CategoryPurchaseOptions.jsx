import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const CategoryPurchaseOptions = ({
  quantity,
  setQuantity,
  purchaseUnit,
  setPurchaseUnit,
  handleMinusClick,
  showCounter,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(quantity.toString());

  const minQuantity = purchaseUnit === "bulk" ? 5 : 1;

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleCounterClick = () => {
    setIsEditing(true);
    setTempQuantity(quantity.toString());
  };

  const handleInputSubmit = () => {
    const newQuantity = parseInt(tempQuantity) || minQuantity;
    setQuantity(Math.max(minQuantity, newQuantity));
    setIsEditing(false);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") handleInputSubmit();
  };

  const handleInputBlur = () => {
    handleInputSubmit();
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setPurchaseUnit(newUnit);
    if (quantity < (newUnit === "bulk" ? 5 : 1)) {
      setQuantity(newUnit === "bulk" ? 5 : 1);
    }
  };

  // ✅ هنا نبدأ الـ return بشكل سليم
  return showCounter ? (
    <div className="px-6 pb-4 space-y-4">
      {/* وحدة الشراء */}
      <div>
        <label className="block text-sm font-medium text-gray-700  dark:text-gray-500 mb-2">
          Purchase Unit:
        </label>
        <select
          value={purchaseUnit}
          onChange={handleUnitChange}
          className="w-full border  text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#38af44]"
        >
          <option value="piece">Per Piece</option>
          <option value="bulk">Per Ton (Bulk)</option>
        </select>
      </div>

      {/* السعر الإضافي لو bulk */}
      {purchaseUnit === "bulk" && (
        <div className="bg-gray-50 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">18,500 EGP</span>
            <span className="text-sm text-gray-600">per ton</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-600">Volume Discounts:</span>
            <span className="text-sm text-orange-600 font-medium">
              10+ tons: 5% off
            </span>
          </div>
        </div>
      )}

      {/* الكمية */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700  dark:text-gray-500">
            Quantity:
          </label>
          {purchaseUnit === "bulk" && (
            <span className="text-sm text-gray-500">Min. order: 5 ton(s)</span>
          )}
        </div>

        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-2">
          <button
            onClick={handleMinusClick}
            className="w-8 h-8 bg-[#38af44] hover:bg-[#2e8f38] text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Minus size={16} />
          </button>

          <div className="mx-4 min-w-[60px] text-center">
            {isEditing ? (
              <input
                type="number"
                value={tempQuantity}
                onChange={(e) => setTempQuantity(e.target.value)}
                onKeyPress={handleInputKeyPress}
                onBlur={handleInputBlur}
                className="w-16 text-center text-lg font-semibold border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#38af44]"
                autoFocus
              />
            ) : (
              <button
                onClick={handleCounterClick}
                className="text-lg font-semibold text-gray-800 hover:text-[#38af44] transition-colors px-2 py-1 rounded hover:bg-gray-100"
              >
                {quantity}
              </button>
            )}
          </div>

          <button
            onClick={handlePlusClick}
            className="w-8 h-8 bg-[#38af44] hover:bg-[#2e8f38] text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CategoryPurchaseOptions;
