import React, { useRef, useEffect, useState, useCallback } from 'react';

interface NestedHeadingType {
  nodeName: string;
  text: string | null;
  id: string;
}

// TODO: any 없애기
const useIntersectionObserver = (setActiveId: any) => {
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

const TableOfContents = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeadingType[]>([]);
  const [activeId, setActiveId] = useState();

  useIntersectionObserver(setActiveId);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    const headingElementsTexts = headingElements.map(heading => {
      const { nodeName, childNodes, id } = heading;
      if (childNodes[0].nodeName === 'IMG') {
        // Open Source Section
        return { nodeName, id, text: childNodes[1].textContent };
      }
      return { nodeName, id, text: childNodes[0].textContent };
    });
    setNestedHeadings(headingElementsTexts);
  }, []);

  const onClickAnchor = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
      event.preventDefault();
      document.querySelector(`#${id}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    },
    [],
  );

  return (
    <div>
      {nestedHeadings.map(heading => {
        const { nodeName, text, id } = heading;
        // const active = id === activeId;

        switch (nodeName) {
          case 'H1':
            return <p>{text}</p>;
          case 'H2':
            return <p>{text}</p>;
          case 'H3':
            return <p>{text}</p>;
          default:
            return '';
        }
      })}
    </div>
  );
};

export default TableOfContents;
