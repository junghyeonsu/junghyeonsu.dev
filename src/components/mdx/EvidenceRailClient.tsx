import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";
import { type ReactNode, useEffect, useRef } from "react";

declare global {
  interface Window {
    __emblaInstances?: Map<HTMLElement, EmblaCarouselType>;
  }
}

interface EvidenceRailClientProps {
  children: ReactNode;
}

export function EvidenceRailClient({ children }: EvidenceRailClientProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const embla = EmblaCarousel(viewport, {
      dragFree: true,
      containScroll: "trimSnaps",
      align: "start",
    });

    if (!window.__emblaInstances) {
      window.__emblaInstances = new Map();
    }
    window.__emblaInstances.set(viewport, embla);

    return () => {
      embla.destroy();
      window.__emblaInstances?.delete(viewport);
    };
  }, []);

  return (
    <div className="my-6 -mx-5 md:mx-0">
      <div ref={viewportRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-3 pl-5 md:pl-0 pr-5 md:pr-0">{children}</div>
      </div>
    </div>
  );
}
