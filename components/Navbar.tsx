"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/config/brand";

const menus = [
  {
    title: "خانه",
    href: "#hero",
  },
  {
    title: "شرکت‌ها",
    href: "#partners",
  },
  {
    title: "مزایا",
    href: "#features",
  },
  {
    title: "مقایسه",
    href: "#comparison",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Brand */}

        <a
          href="#hero"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <Image
              src="/logo.svg"
              alt={BRAND.englishName}
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />

          </div>

          <div>

            <h1 className="text-xl font-extrabold text-slate-900">
              {BRAND.name}
            </h1>

            <p className="text-xs text-slate-500">
              {BRAND.domain}
            </p>

          </div>

        </a>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 lg:flex">
          {menus.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-3">

          <Button
            asChild
            className="hidden rounded-xl bg-blue-600 px-6 hover:bg-blue-700 lg:flex"
          >
            <a href="#loan-form">
              درخواست وام
            </a>
          </Button>

          <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100 lg:hidden">
            <Menu size={22} />
          </button>

        </div>

      </div>
    </header>
  );
}