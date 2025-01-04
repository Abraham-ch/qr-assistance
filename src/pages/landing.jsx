import Header from "components/header";
import { MainSection } from "./home/mainSection";
import { Benefits } from "./home/benefits";
import { WeOffer } from "./home/weOffer";
import { Footer } from "src/components/footer";

const Landing = () => {
  return (
    <>
    <Header />
    <MainSection />
    <Benefits />
    <WeOffer />
    <Footer />
    </>
  );

};

export default Landing;