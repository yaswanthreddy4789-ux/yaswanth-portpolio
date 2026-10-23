"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { site } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance photo cluster for the hero. The three photos arrive one after another:
 * the main portrait reveals with a mask, the side photos fly in from opposite
 * edges with a roll. Afterwards they float gently and drift with the pointer.
 * Reduced-motion: the global MotionConfig drops the movement and CSS forces the final state.
 */
export function HeroPhotos({ ready, sx, sy }: { ready: boolean; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const mainX = useTransform(sx, [-1, 1], [-6, 6]);
  const mainY = useTransform(sy, [-1, 1], [-5, 5]);
  const leftX = useTransform(sx, [-1, 1], [-18, 18]);
  const leftY = useTransform(sy, [-1, 1], [-12, 12]);
  const rightX = useTransform(sx, [-1, 1], [14, -14]);
  const rightY = useTransform(sy, [-1, 1], [10, -10]);

  const card = "relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]";
  const forceDone = "motion-reduce:![clip-path:none] motion-reduce:!opacity-100";

  return (
    <motion.div
      className="relative mx-auto h-[27rem] w-full max-w-md sm:h-[31rem] lg:h-[34rem] lg:max-w-none"
      initial="hide"
      animate={ready ? "show" : "hide"}
    >
      {/* soft glow + spinning dotted ring behind the photos */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[90px]" />
      <motion.div
        aria-hidden="true"
        variants={{ hide: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease, delay: 0.3 } } }}
        className="absolute left-1/2 top-1/2 -z-10 size-[88%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="size-full animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-accent/30 motion-reduce:animate-none" />
      </motion.div>

      {/* main portrait: mask reveal from the bottom */}
      <motion.div style={{ x: mainX, y: mainY }} className="absolute left-[14%] top-[7%] z-20 w-[62%]">
        <motion.div
          variants={{
            hide: { opacity: 0, scale: 0.85, clipPath: "inset(100% 0 0 0)" },
            show: { opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)", transition: { duration: 1.2, ease, delay: 0.45 } },
          }}
          className={forceDone}
        >
          <div className="float-y">
            <div className={card}>
              <Image src="/hero/riverfront.jpg" alt={`${site.name} standing by a riverfront at dusk`} fill priority sizes="(min-width:1024px) 22vw, 60vw" className="object-cover object-[50%_25%]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* left photo: flies in from the left with a roll */}
      <motion.div style={{ x: leftX, y: leftY }} className="absolute -left-[1%] bottom-[2%] z-30 w-[44%]">
        <motion.div
          variants={{
            hide: { opacity: 0, x: -260, rotate: -42 },
            show: { opacity: 1, x: 0, rotate: -7, transition: { duration: 1.2, ease, delay: 0.85 } },
          }}
        >
          <div className="float-y [animation-delay:-3s]">
            <div className={card}>
              <Image src="/hero/patrika-gate.jpg" alt={`${site.name} in front of a pink sandstone gateway`} fill sizes="(min-width:1024px) 14vw, 40vw" className="object-cover" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* right photo: flies in from the right with a roll */}
      <motion.div style={{ x: rightX, y: rightY }} className="absolute -right-[1%] top-0 z-10 w-[42%]">
        <motion.div
          variants={{
            hide: { opacity: 0, x: 260, rotate: 42 },
            show: { opacity: 1, x: 0, rotate: 6, transition: { duration: 1.2, ease, delay: 1.05 } },
          }}
        >
          <div className="float-y [animation-delay:-5s]">
            <div className={card}>
              <Image src="/hero/terrace.jpg" alt={`${site.name} on a stone terrace overlooking a temple complex`} fill sizes="(min-width:1024px) 14vw, 40vw" className="object-cover" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
