import React, { useState , useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../firebase';
import { LogOut, ShoppingBagIcon, User } from 'lucide-react';
// import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { AlignJustify, Menu, X , Sparkles , LogOutIcon ,LogInIcon ,ShoppingCart ,Earth, EarthIcon, Plus } from 'lucide-react';
import LottieAnimation from '../animations/LottieAnimation';
import LottieAnimation9 from '../animations/LottieAnimation9';
// import ThemeBtn from '../ThemeBtn';


function Header() {
    const { isAuthenticated, user, signOut , signIn } = useAuthStore();
    const handleLogin = async () => {
        try {
        await signIn();
        toast.success("Signed in successfully");
        } catch (error) {
            throw error;
        }
    };
    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("signout success !")
        } catch (error) {
            toast.error("logout failed:", error.message);
        }
        };
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [confirmLogout , setConfirmLogout] = useState(false);
    const confirmLoggingout = () => {
        setConfirmLogout(true);
    }
    // const handleLogout = () => {
    //     try {
    //         logout();
    //         const name = user.email;
    //         toast.success(name + " is logged out successfully");
    //     } catch (error) {
    //         toast.error("could not logout");
    //     }
    // };
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        
      const handleScroll = () => {
        if (window.scrollY > 60) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return (
      <header
        className={`shadow-lg sticky z-50 top-0 bg-white transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-opacity-80" : "bg-opacity-100"
        }`}
      >
            {confirmLogout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-pink-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm"
              >
                <h1 className=" text-black dark:text-gray-200 mb-4 text-lg font-semibold">You really want to logout?</h1>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 bg-red-600  text-white rounded-2xl shadow-md hover:bg-red-700 "
                >
                  Yes, Logout !
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="mt-2 w-full py-2 px-4 text-black dark:text-white"
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          )}
            <nav className="border-b border-gray-100  py-4">
                <div className="flex items-center  max-w-screen-xl mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="logo.png"
                            className="h-11 rounded-lg dark:hidden"
                            alt="Logo"
                        />
                        <img
                            src="logo.png"
                            className="h-10 absolute left-10 rounded-lg hidden dark:block"
                            alt="Logo"
                        />
                        <div className='absolute left-24 -ml-2 text-2xl  bg-pink-700 bg-clip-text text-transparent font-light '>SPECTRUM</div>
                    </Link>

                    

                    {/* Desktop menu */}
                    <div className="hidden ml-96 mr-10 lg:flex items-center space-x-6 font-medium">
                        
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-red-700' : 'text-gray-700 dark:text-gray-700'} hover:text-red-800`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/courses"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-red-700' : 'text-gray-700 dark:text-gray-700'} hover:text-red-800`
                            }
                        >
                            Courses
                        </NavLink>
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-red-700' : 'text-gray-700 dark:text-gray-700'} hover:text-red-800`
                            }
                        >
                            Jobs
                        </NavLink>
                        <NavLink
                            to="/About"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-red-700' : 'text-gray-700 dark:text-gray-700'} hover:text-red-800`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/campaigns"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-red-700    ' : 'text-gray-700 dark:text-gray-700'} hover:text-red-800`
                            }
                        >
                            Campaigns
                        </NavLink>
                        
                            <NavLink
                            to="/connect"
                            className={({ isActive }) =>
                                `text-xl font-light group relative ${
                                isActive ? 'text-orange-800' : 'text-gray-700 dark:text-gray-700'
                                } hover:text-red-800 transition-colors duration-300`
                            }
                            >
                            <div className="bg-pink-400 font-light bg-opacity-30 hover:bg-opacity-40 px-2 rounded-md py-0.5 text-pink-600 flex items-center justify-center duration-300">
                                Connect <Plus className="h-4 w-4 ml-1" />
                            </div>
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                            to="/explore"
                            className={({ isActive }) =>
                                `text-lg font-light ${isActive ? 'text-blue-800  bg-opacity-55  ' : 'text-blue-700'} hover:text-blue-800 -300`
                            }
                        >
                            <div className="bg-blue-300 font-light text-xl -ml-3 flex gap-1 items-center bg-opacity-50 px-3 py-0.5 text-blue-700 rounded-md hover:bg-opacity-70 duration-300">
                             Explore 
                             <EarthIcon className='h-4 w-4' />
                            {/* <LottieAnimation9 /> */}
                            </div>
                        </NavLink>
                        )
                        }
                        
                    </div>
                    
                    {/* Auth buttons and Theme toggle */}
                    <div className="hidden lg:flex absolute right-8 items-center  space-x-1">
                        {isAuthenticated ? (
                            <>
                                
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `p-3 rounded-full text-center transition-all duration-200 
                                        ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-200 '}`
                                    }
                                >
                                    <User className='h-6 w-6'/>
                                </NavLink>
                                <NavLink
                                    to="/shopping"
                                    className={({ isActive }) =>
                                        `p-3 rounded-full text-center transition-all duration-200 
                                        ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-200'}`
                                    }
                                    >
                                    <ShoppingBagIcon className="h-6 w-6" />
                                </NavLink>

                                    <Link
                                        onClick={handleSignOut}
                                        className="p-3 text-black rounded-full text-center hover:bg-gray-200"
                                    >
    
                                        <LogOut className='h-6 w-6'/>
                                    </Link>
                                    
                                
                            </>
                        ) : (
                            <>
                                <NavLink
                                    
                                    onClick={handleLogin}
                                    className="flex items-center bg-blue-300 bg-opacity-40 text-blue-800  hover:bg-opacity-50 rounded-lg text-base"
                                >
                                    
                                    <div className='flex font-light items-center justify-center'> 
                                        <span className='ml-3'>Login With Google </span>
                                        <div className='bg-gray-100 rounded-r-lg h-10 w-12 ml-2 flex items-center'>
                                            <img src="google.png" alt="" className='w-5 ml-3' />
                                        </div>
                                        
                                        
                                    </div>
                                    
                                </NavLink>
                                
                            </>
                        )}
                        {/* <ThemeBtn /> */}
                    </div>
                    {/* Toggle menu for mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-900 lg:hidden focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                
                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/About"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    Contact
                                </NavLink>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <NavLink
                                        to="/chatpage"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-300"
                                    >
                                        Chat-IIITA
                                        <AlignJustify className="ml-1" />
                                    </NavLink>
                                </li>
                            )}
                            {isAuthenticated ? (
                                <li>
                                    <motion.button
                                        onClick={() => {
                                            // handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left py-2 text-lg text-red-500"
                                    >
                                        Logout
                                    </motion.button>
                                </li>
                            ) : (
                                <li className="flex justify-between space-x-4">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-2 text-lg text-gray-700 dark:text-gray-300"
                                    >
                                        Log In
                                    </NavLink>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-2 bg-violet-700 text-white rounded-lg text-center shadow-lg"
                                    >
                                        Get Started
                                    </Link>
                                    
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
