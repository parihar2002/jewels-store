'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import axios from 'axios';

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: ConfirmationResult | null;
  }
}

type LoginProps = {
  onClose: () => void;
};

export default function Login({onClose}: LoginProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const initializeRecaptcha = () => {
    try {
      if (window.recaptchaVerifier) {
        return;
      }
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
    }
  };

  useEffect(() => {
    initializeRecaptcha();
    return () => {
      // Cleanup on unmount
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const sendOtp = async () => {
    try {
      if (!phone) {
        alert('Please enter a phone number');
        return;
      }

      // Initialize reCAPTCHA if not already initialized
      if (!window.recaptchaVerifier) {
        initializeRecaptcha();
      }

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        alert('reCAPTCHA not initialized. Please try again.');
        return;
      }

      const confirmation = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      if (error.code === 'auth/invalid-app-credential') {
        // Reset reCAPTCHA on error
        try {
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
          }
        } catch (clearError) {
          console.error('Error clearing reCAPTCHA:', clearError);
        }
        window.recaptchaVerifier = null;
        initializeRecaptcha();
        alert('reCAPTCHA verification failed. Please try again.');
      } else {
        alert('Error sending OTP. Please try again.');
      }
    }
  };

  const verifyOtp = async () => {
    try {
      if (!window.confirmationResult) {
        alert('No OTP verification in progress. Please request a new OTP.');
        return;
      }
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await axios.post('http://localhost:5000/api/auth/verify-firebase-token', { token });
      console.log(response.data);
      onClose();
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  function handleClose() {
    onClose();
    reset();
  }

  function reset() {
    setPhone("");
    setOtp("");
    setOtpSent(false);
    // Reset reCAPTCHA when modal is closed
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    } catch (error) {
      console.error('Error clearing reCAPTCHA:', error);
    }
    window.recaptchaVerifier = null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <div id="recaptcha-container"></div>
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          ✕ 
        </button>
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Enter WhatsApp no. *" 
          className="w-full border border-gray-300 p-2 rounded-md mb-2"
        />
        {!otpSent ? (
          <button 
            onClick={sendOtp} 
            className="w-full bg-[#c8a876] text-white p-2 rounded-md"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter OTP" 
              className="w-full border border-gray-300 p-2 rounded-md mb-2"
            />
            <button 
              onClick={verifyOtp} 
              className="w-full bg-[#c8a876] text-white p-2 rounded-md"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}