// Types
import { ContainerProps } from "@/types/props";

export default function AuthLayout({ children }: ContainerProps) {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
    </div>
  );
}
