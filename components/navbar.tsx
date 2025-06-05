"use client";
import { useState } from "react";

import LoginModal from "@/components/LoginModal";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav className="fixed top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between p-3 bg-[#e8e8e5]">
    <div className="text-xl">JEVELS-STORE</div>
    <div className="flex md:hidden">
        <button id="hamburger">
          <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
          <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
        </button>
    </div>
    <div className=" toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 md:border-none">
        <a href="#home" className="block md:inline-block hover:text-blue-500 px-3 py-3 md:border-none">Home
        </a>
        <a href="#services" className="block md:inline-block hover:text-blue-500 px-3 py-3 md:border-none">Products
        </a>
        <a href="#aboutus" className="block md:inline-block hover:text-blue-500 px-3 py-3 md:border-none">About us
        </a>
        <a href="#gallery" className="block md:inline-block hover:text-blue-500 px-3 py-3 md:border-none">Gallery
        </a>
        <a href="#contactUs" className="block md:inline-block hover:text-blue-500 px-3 py-3 md:border-none">Visit Us
        </a>
    </div>

    <button
        onClick={() => setIsOpen(true)}
        className="bg-[#c8a876] text-white px-4 py-2 rounded-md"
        >
        Login
    </button>

    {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    


</nav>
    );
}
export default Navbar;