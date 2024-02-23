"use client";

import Link from "next/link";
import { useContext } from "react";

import { ThemeContext } from "app/providers";

export default function Logo() {
  const { theme } = useContext(ThemeContext);

  console.log("theme", theme);
  return (
    <div>
      <Link
        href="/"
        style={{
          color: theme === "light" ? "white" : "black",
        }}
      >
        C
      </Link>
    </div>
  );
}
