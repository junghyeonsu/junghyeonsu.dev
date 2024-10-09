import { Box } from "@chakra-ui/react";
import * as React from "react";

export default function MousePointerContainer() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onHover = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        return;
      }

      if (!ref.current) {
        return;
      }

      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const elements = document.querySelectorAll(":hover");
      const circleElement = ref.current.children[0] as HTMLDivElement;
      const topElement: Element | null = elements[elements.length - 1] ?? null;

      if (topElement && getComputedStyle(topElement).cursor === "pointer") {
        circleElement.style.transform = "scale(2)";
      } else {
        circleElement.style.transform = "scale(1)";
      }
    };

    document.addEventListener("pointermove", onHover);

    return () => {
      document.removeEventListener("pointermove", onHover);
    };
  }, []);

  return (
    <Box
      pos="fixed"
      top="-20px"
      left="-20px"
      width="40px"
      height="40px"
      zIndex="2000"
      pointerEvents="none"
      transform="translate(-1000px, -1000px)"
      ref={ref}
    >
      <Box
        width="40px"
        height="40px"
        backgroundColor="var(--chakra-colors-gray-900)"
        opacity={0.3}
        borderRadius="full"
        pointerEvents="none"
        transition="transform 0.15s"
      />
    </Box>
  );
}
