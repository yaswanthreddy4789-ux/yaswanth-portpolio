"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";

type Ctx = { ready: boolean; setReady: (v: boolean) => void };
const ReadyContext = createContext<Ctx>({ ready: true, setReady: () => {} });

/** `ready` flips to true when the preloader finishes; the hero waits for it. */
export const useReady = () => useContext(ReadyContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return (
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>
    </MotionConfig>
  );
}
