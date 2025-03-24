import { useState, useEffect } from "react";

const useIsMobile = (breakpoint: number = 768): boolean | undefined  =>{
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResizeTest = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResizeTest();

    // Add event listener
    window.addEventListener("resize", handleResizeTest);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResizeTest);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
