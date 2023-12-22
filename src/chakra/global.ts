export default {
  html: {
    scrollPaddingTop: "75px",
  },

  body: {
    transition: "background-color 0.2s ease, color 0.2s ease",
  },

  "h1:hover .heading-anchor-icon, h2:hover .heading-anchor-icon, h3:hover .heading-anchor-icon": {
    opacity: 1,
  },

  blockquote: {
    p: {
      marginTop: "0px",
    },
  },

  ".heading-anchor-icon": {
    marginLeft: "10px",
    opacity: 0,
    color: "blue.600",
    transition: "all 0.2s ease-in-out",
  },

  ".gatsby-resp-image-figcaption": {
    fontSize: "14px",
    textAlign: "center",

    color: "gray.500",

    marginTop: "16px",
  },

  "article img": {
    borderRadius: "20px",
    border: "1px solid transparent",

    transition: "all 0.3s ease",

    ":hover": {
      border: "1px solid var(--chakra-colors-blackAlpha-50)",
    },
  },
};
