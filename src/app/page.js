"use client";

import { useAuthStore } from "@/store/useAuthStore";
import LoginPage from "@/pages/Auth/Login";
import DashboardHome from "@/components/DashboardHome";


export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? <DashboardHome /> : <LoginPage />}
    </main>
  );
}
