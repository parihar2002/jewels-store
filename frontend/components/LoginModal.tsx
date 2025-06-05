"use client";
import { useState, useRef, useEffect } from "react";



type PhoneInputProps = {
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

function PhoneInput({
  phoneNumber,
  onChange,
  onSubmit,
  inputRef,
}: PhoneInputProps) {
  return (
    <>
      <input
        ref={inputRef}
        type="tel"
        placeholder="Enter WhatsApp No. *"
        className="w-full border border-gray-300 p-2 rounded-md mb-2"
        value={phoneNumber}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
        className="w-full bg-[#c8a876] text-white p-2 rounded-md"
      >
        Submit
      </button>
    </>
  );
}

type OtpInputProps = {
  otp: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

function OtpInput({ otp, onChange, onVerify, inputRef }: OtpInputProps) {
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter OTP"
        className="w-full border border-gray-300 p-2 rounded-md mb-2"
        value={otp}
        onChange={onChange}
      />
      <button
        onClick={onVerify}
        className="w-full bg-[#c8a876] text-white p-2 rounded-md"
      >
        Verify OTP
      </button>
    </>
  );
}

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step === "phone") {
      phoneInputRef.current?.focus();
    }
  }, [step]);


  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  function handleSendOtp() {
    if (!phoneNumber.trim()) {
      setError("Please enter your WhatsApp number");
      return;
    }
    setError("");
    setStep("otp");
  }

  function handleVerifyOtp() {
    if (otp.trim() === "1234") {
      setError("");
      onClose();
      reset();
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  }

  function reset() {
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setError("");
  }

  function handleClose() {
    onClose();
    reset();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        {step === "phone" ? (
          <>
            <PhoneInput
              phoneNumber={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onSubmit={handleSendOtp}
              inputRef={phoneInputRef}
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </>
        ) : (
          <>
            <OtpInput
              otp={otp}
              onChange={(e) => setOtp(e.target.value)}
              onVerify={handleVerifyOtp}
              inputRef={otpInputRef}

            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
