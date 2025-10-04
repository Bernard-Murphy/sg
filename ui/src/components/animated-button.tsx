import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  id?: string;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | "custom";
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 px-6 py-3 rounded-lg",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 px-6 py-3 rounded-lg",
  destructive:
    "bg-red-400 text-white hover:bg-red-500 disabled:bg-red-300 px-6 py-3 rounded-lg",
  outline:
    "bg-gray-700 text-white hover:bg-gray-700 disabled:bg-gray-500 px-6 py-3 rounded-lg",
  ghost:
    "text-white hover:bg-gray-700 disabled:bg-gray-500 px-6 py-3 rounded-lg",
  link: "text-white hover:bg-gray-700 disabled:bg-gray-500 px-6 py-3 rounded-lg",
  custom: "",
};

export default function AnimatedButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [pressing, setPressing] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setPressing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    setTimeout(() => {
      setPressing(false);
      onClick?.();
    }, 150);
  };

  const baseClasses = "overflow-hidden font-medium transition-all duration-200";

  return (
    <button
      // id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        pressing ? "scale-90" : ""
      } ${disabled ? "" : "cursor-pointer"}`}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </button>
  );
}
