import {
  ArrowUpRight, Blocks, Check, Code2, Globe, LayoutTemplate, Map, PanelsTopLeft, PenTool,
  Plug, RefreshCw, Rocket, Search, Server, ShoppingBag, ShoppingCart, TrendingUp, Wrench,
  type LucideIcon,
} from "lucide-react";

/** Config files reference icons by key so they stay plain data. */
export const icons: Record<string, LucideIcon> = {
  arrow: ArrowUpRight,
  blocks: Blocks,
  cart: ShoppingCart,
  check: Check,
  code: Code2,
  globe: Globe,
  layout: LayoutTemplate,
  map: Map,
  panel: PanelsTopLeft,
  pen: PenTool,
  plug: Plug,
  refresh: RefreshCw,
  rocket: Rocket,
  search: Search,
  server: Server,
  shopping: ShoppingBag,
  trend: TrendingUp,
  wrench: Wrench,
};

export function Icon({ name, className, ...rest }: { name: string; className?: string; "aria-hidden"?: boolean }) {
  const C = icons[name] ?? Globe;
  return <C className={className} aria-hidden="true" {...rest} />;
}
