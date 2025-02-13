import Header from "components/header";
import { MainSection } from "./home/mainSection";
import { Benefits } from "./home/benefits";
import { Footer } from "src/components/footer";
import { Students } from "./home/students";

const Landing = () => {
  return (
    <>
    <Header />
    <MainSection />
    <Students />
    <Benefits />
    <Footer />
    </>
  );

};

export default Landing;