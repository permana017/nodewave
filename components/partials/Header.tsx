"use client";
import { User } from "@/app/interfaces";
import { useUserStore } from "@/lib/store";
import Image from "next/image";
import React from "react";

function Header() {
  const user: User = useUserStore((state) => state.user);

  return (
    <header className="fixed top-0 z-20 w-full p-4 shadow flex justify-between items-center">
      <p className="text-slate-500">Search</p>
      <div className="flex items-center gap-3">
        <p className="capitalize font-medium text-slate-600">{user?.fullName}</p>
        <Image src="/wBadge.svg" alt="avatar" height={34} width={34} />
      </div>
    </header>
  );
}

export default Header;
