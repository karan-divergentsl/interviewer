"use client";

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <PageIllustration />
      {!isAuthenticated ?
      <Hero />
      :
        <h1>Hello</h1>
      }
    </>
  );
}
