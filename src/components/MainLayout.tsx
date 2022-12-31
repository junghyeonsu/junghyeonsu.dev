import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth={800}
        margin="auto"
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
