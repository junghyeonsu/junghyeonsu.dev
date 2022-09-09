import { useEffect, useRef } from 'react';

const useIntersectionObserver = (
  setActiveId: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const headingElementsRef = useRef<any>({});

  useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce((map: any, headingElement: any) => {
        // eslint-disable-next-line no-param-reassign
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: any = [];
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex(heading => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a: any, b: any) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id),
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -100px 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

export default useIntersectionObserver;
