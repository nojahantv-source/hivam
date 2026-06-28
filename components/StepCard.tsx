"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  delay: number;
}

export default function StepCard({
  number,
  title,
  description,
  icon,
  color,
  delay,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg transition-all"
    >
      <div
        className={`absolute right-0 top-0 h-2 w-full ${color}`}
      />

      <span className="text-6xl font-black text-slate-100">
        {number}
      </span>

      <div
        className={`mt-6 flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-white`}
      >
        {icon}
      </div>

      <h3 className="mt-8 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>
    </motion.div>
  );
}