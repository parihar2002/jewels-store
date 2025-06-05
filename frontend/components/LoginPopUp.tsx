"use client";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

function LoginPopUp() {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
        </div>
    );
}
export default LoginPopUp;