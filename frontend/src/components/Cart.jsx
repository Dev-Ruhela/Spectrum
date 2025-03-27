import { useAuthStore } from "../../firebase";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import { ShoppingBag, Trash, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { user, setUser, removeFromCart } = useAuthStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(true); 
  
  useEffect(() => {

    if (user?.cart) {
      const total = user.cart.reduce(
        (sum, item) => sum + parseInt(item.coins), // Ensure coins are treated as integers
        0
      );
      setTotalPrice(total);
    }
  }, [user?.cart]);

  const removeItem = async (product) => {
    await removeFromCart(user.uid, product);
  };

  const closeCart = () => {
    setShowCart(false); // Set showCart to false to close the modal
  };

  const checkout = async () => {
    if (user.coins >= totalPrice) {
      const newCoins = user.coins - totalPrice;

      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), { cart: [], coins: newCoins });

      // Update Zustand state
      setUser({ ...user, cart: [], coins: newCoins });

      toast.success("Checkout successful! 🎉");
    } else {
      toast.error("Not enough coins to complete the purchase.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 ">
      <div className="bg-white rounded-lg max-w-6xl w-full relative overflow-y-auto max-h-[60vh] p-6 flex">
        {/* Left Section: Cart Items */}
        <div className="w-2/3 overflow-y-scroll max-h-[80vh] p-4">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {user?.cart?.length > 0 ? (
            <div className="space-y-4">
              {user.cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border p-2 rounded-lg shadow-sm">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md" />
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">💰 {item.coins} Coins</p>
                  </div>
                  <button
                    onClick={() => removeItem(item)}
                    className="bg-transparent text-white p-2.5 rounded-full hover:bg-red-50 duration-300"
                  >
                    <Trash2Icon className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 items-center justify-center flex p-1">
                <img src="emptycart.png" alt=""  className="h-52"/>
                Your cart is empty <br />
                Explore more in shopping area 
                <button>
                <ShoppingBag
                  onClick={()=> window.location.reload()}
                  className="mt-6 ml-2 h-5 w-5 hover:text-black duration-300"

                 />
                 </button>
                
            </div>
          )}
        </div>

        {/* Right Section: Coin Info and Checkout */}
        <div className="w-1/3 p-6 border-l border-gray-300 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <div className="text-lg">
            <p className="mb-2">Total: <span className="font-semibold">{totalPrice} Coins</span></p>
            <p className="mb-4">Available Coins: <span className="font-semibold text-green-600">{user.coins}</span></p>
            {user.coins >= totalPrice && totalPrice > 0 ? (
              <button
                onClick={checkout}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
              >
                ✅ Checkout
              </button>
            ) : (
              <p className="mt-6 text-red-400 font-light">
                Not eligible for checkout
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Close Button */}
      
    </div>
  );
}
