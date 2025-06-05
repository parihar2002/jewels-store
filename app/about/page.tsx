// "use client";
// import { useState } from "react";
import LoginPopUp from "@/components/LoginPopUp";

function AboutPage() {
  return (
    <div>
      <LoginPopUp />
      <h2 className="text-xl font-semibold mb-2">About Us</h2>
      <p>
        JewelsCart is your go-to online store for stylish and affordable imitation
        jewelry. We aim to provide unique and trendy pieces for all occasions.
      </p>
    </div>
  );
}

export default AboutPage;