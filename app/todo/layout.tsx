import Header from "@/components/partials/Header";
import React from "react";

export default function LayoutGradient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-200 overflow-hidden">
      <Header />
      <div className="absolute -left-2 -top-40 h-[70vh] bg-white rounded-b-[68px] rotate-3 w-[102vw]"></div>
      <div className="relative z-10 w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
