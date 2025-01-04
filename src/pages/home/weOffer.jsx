import { OfferCard, OfferCardReverse } from "src/components/ui/offerCard";
import card1 from "assets/svg/offerCard1.svg"
import card2 from "assets/svg/offerCard2.svg"
import card3 from "assets/svg/offerCard3.svg"

export const WeOffer = () => {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold pb-16">¿Cómo funciona?</h2>
      <div className="flex flex-col gap-y-20 items-center">
        <OfferCard title="Prepárate con nosotros" description="Obtendrás una preparación completa para ingresar a la universidad. Enfócate en las áreas donde más lo necesitas." img={card1} alt="Offer card" />

        <OfferCardReverse title="Participa en simulacros" description="Practica con exámenes reales en un ambiente controlado. Analizamos tus resultados y te ayudamos a mejorar tu rendimiento." img={card2} alt="Offer card" />

        <OfferCard title="Conéctate con tu meta" description="Recibe orientación vocacional y elige la carrera ideal para ti. Nuestro equipo te acompaña en cada paso del camino." img={card3} alt="Offer card" />
      </div>
    </section>
    
  );
};