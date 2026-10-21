"use client";

import { motion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Single element: fade + slide up when scrolled into view (once). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Staggered group. Wrap children in <StaggerItem>. */
export function Stagger({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" }) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

/** Line-by-line masked heading reveal. */
export function MaskLines({ lines, accentLine, className }: { lines: string[]; accentLine?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
    >
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${i === accentLine ? "text-accent" : ""}`}
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.9, ease } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
