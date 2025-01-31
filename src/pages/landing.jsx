import Header from "components/header";
import { MainSection } from "./home/mainSection";
import { Benefits } from "./home/benefits";
import { WeOffer } from "./home/weOffer";
import { Footer } from "src/components/footer";
import { Students } from "./home/students";

const Landing = () => {
  return (
    <>
    <Header />
    <MainSection />
    <Students />
    <WeOffer />
    <Benefits />
    <Footer />
    </>
  );

};

export default Landing;