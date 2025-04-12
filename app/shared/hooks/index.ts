"use client";
import { useState, useEffect } from "react";
import useGeneratedPrompts from "./useGeneratedPrompts";

export const getWindow = (): Window | null => {
  return typeof window !== 'undefined' ? window : null;
};

const useIsMobile = (breakpoint: number = 768): boolean | undefined  =>{
    // Initialize with undefined to avoid hydration mismatch
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [breakpoint]);

  return isMobile;
};

export { useGeneratedPrompts };
export default useIsMobile;
