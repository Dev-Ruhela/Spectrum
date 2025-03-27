import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuthStore } from "../../firebase";
import { CircleDollarSignIcon, Cross, DollarSignIcon, ShoppingCart, Wallet, X } from "lucide-react";
import toast from "react-hot-toast";
import Cart from "./Cart";
import Header from "./Header";
import LottieAnimation from "../animations/LottieAnimation";


const Shopping = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user , addToCart } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "cart");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
        setFilteredProducts(productsList); // Initially show all products
      } catch (error) {
        
      }
    };

    fetchProducts();
  }, []);
  // useEffect(() => {
  //   console.log(user.cart)
  // } , [])
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchTerm);
  };

  // Handle search functionality
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(selectedCategory, term);
  };

  // Filter products based on category and search term
  const filterProducts = (category, search) => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All Items" || product.type === category;
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.des.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const add = async (product) => {
    try {
      if (!user || !user.cart) {
        toast.error("User not logged in or cart not available");
        return;
      }
  
      // Check if the product already exists in the cart
      const isAlreadyInCart = user.cart.some((item) => item.id === product.id);
      if (isAlreadyInCart) {
        toast.success("Product already in cart!");
        return;
      }
  
      await addToCart(user.uid, product);
    } catch (error) {
      toast.error("Could not add to cart");
  
    }
  };
  
  const categories = [
    "All Items",
    "Clothing",
    "Accessories",
    "Digital Items",
    "Limited Edition",
  ];

  return (
    <>
    
      <div className="bg-gray-100 min-h-screen">
       
        {/* Background Section with Search & Filters */}
        <div className="relative h-[400px] bg-gray-900">
        <Header />
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-contain bg-center opacity-30"
            style={{ backgroundImage: "url('shopping.png')" }}
          ></div>

          {/* Header */}
          <header className="relative z-10 py-4">
            <div className="max-w-7.5xl mx-auto px-32 flex justify-between items-center mt-20">
              {/* Logo */}
              {/* <Link to="/">
                <div className="text-xl w-12 font-bold text-indigo-600">
                  <img src="logo.png" alt="" />
                </div>
              </Link> */}

              {/* Search Bar */}
              <div className="flex-1 mx-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-14 px-4 py-2 border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="text-yellow-300 font-semibold flex gap-2 rounded-lg p-2 items-center hover:bg-gray-200 hover:bg-opacity-30 duration-500">
                  <span> </span>{user.coins} <CircleDollarSignIcon className="h-4 w-4" /> 
                </div>
                <button 
                onClick={() => openCart()}
                className=" text-white p-4 rounded-full relative hover:bg-gray-400 hover:bg-opacity-40 duration-500">
                  <ShoppingCart className="h-6 w-6" />
                  {user.cart.length > 0 ? (<div className="absolute -top-1 mt-2 mr-0 right-0 text-xs bg-red-500 bg-opacity-90 text-red-100 py-1 px-2 rounded-full">{user.cart.length}</div>) : (<></>)}
                </button>
                

                {/* <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                  { <Link to="/profile">
                    <img src={user.image} alt="" className="rounded-full" />
                   </Link> }
                </div> */}
              </div>
            </div>
          </header>

          {/* Filters */}
          <section className="relative z-10 py-4">
            <div className="max-w-8xl ml-32 mx-auto px-4 flex justify-between items-center ">
              <div className="flex space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 rounded-lg duration-400 ${
                      selectedCategory === category
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Product Cards */}
        <section className="py-8 bg-gray-100">
        {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          {/* Modal content */}
          <button
              onClick={closeCart} // Trigger closeCart function on click
              className="fixed top-16 mt-3 right-4 text-white font-bold text-3xl hover:bg-gray-200 hover:text-black duration-300 rounded-full p-3 z-50"
            >
              <X className="h-7 w-7"/>
            </button>
          <div className="bg-white rounded-lg max-w-6xl w-full relative overflow-y-auto max-h-6xl p-3">
            
            {/* Close Button (Positioned at the top-right) */}
            

            {/* Content inside modal */}
            <div className="text-5xl mb-4 text-black">hello</div>
            <Cart /> {/* Your cart content */}
          </div>
        </div>
      )}
          {filteredProducts.length > 0 ? (
            <div className="max-w-8xl bg-gray-100 mx-auto px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-full hover:shadow-xl"
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-lg mb-4 "
                />

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-yellow-500 font-bold text-sm mt-2 flex items-center gap-1 ">
                     {product.coins} <CircleDollarSignIcon className="h-4 w-4" /> 
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{product.des}</p>
                </div>

                {/* Button */}
                <div className="flex gap-2 text-sm">
                <button className="bg-gray-800 text-white w-full py-2 mt-4 rounded-2xl hover:bg-black ">
                  Buy Now
                </button>
                <button 
  onClick={() => add(product)}
  className=" border border-black text-black w-full py-2 mt-4 rounded-2xl hover:bg-gray-800 hover:text-white hover:border-white duration-300"
>
  Add to Cart + 
</button>

                </div>
                
              </div>
            ))}
          </div>
          ) : (
            <div className="flex justify-center items-center mt-28">
              <div className="flex-col items-center justify-center">
              <img src="noitems.png" alt="" className="h-64" />
              <p className="text-gray-500">Looks like no items matched your search. Try again</p>
              </div>
              
            </div>
          )
          }
          
        </section>
      </div>
      <LottieAnimation/>
      <Footer />
    </>
  );
};

export default Shopping;
