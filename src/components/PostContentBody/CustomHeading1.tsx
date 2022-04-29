const CustomHeading1 = ({
  children,
}: JSX.IntrinsicElements['h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6']) => {
  const headingHref = children?.toString().split(' ').join('-');

  return (
    <h1 id={headingHref}>
      {children}

      <a href={`#${headingHref}`} aria-label={headingHref}>
        #
      </a>
    </h1>
  );
};

export default CustomHeading1;
