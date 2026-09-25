import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const ToastContext = createContext(null);

/**
 * App-wide, single-slot toast — confirms an action that otherwise has
 * no visible result (e.g. clicking "Add More to Cart" only changes a
 * badge count tucked in the header). A second call while one is
 * showing replaces it and restarts the timer, rather than stacking.
 */
export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((text, duration = 2000) => {
    clearTimeout(timeoutRef.current);
    setMessage(text);
    timeoutRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* bottom-20 clears the fixed mobile nav bar; desktop sits lower */}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex justify-center px-4 lg:bottom-6"
      >
        {message && (
          <div className="animate-toast-in flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
            <CheckCircle2 size={16} aria-hidden="true" className="shrink-0 text-gold-400" />
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};
