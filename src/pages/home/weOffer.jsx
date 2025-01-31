import { OfferCard, OfferCardReverse } from "src/components/ui/offerCard";
import prep02 from 'assets/img/prep02.jpg'

export const WeOffer = () => {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold pb-16">¿Cómo funciona?</h2>
      <div className="flex flex-col gap-y-20 items-center">
        <OfferCard title="Prepárate con nosotros" description="Obtendrás una preparación completa para ingresar a la universidad. Enfócate en las áreas donde más lo necesitas." img='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/UNI_Pabell%C3%B3n_Central_2017.jpg/1280px-UNI_Pabell%C3%B3n_Central_2017.jpg' alt="Offer card" />

        <OfferCardReverse title="Participa en simulacros" description="Practica con exámenes reales en un ambiente controlado. Analizamos tus resultados y te ayudamos a mejorar tu rendimiento." img={prep02} alt="Offer card" />

        <OfferCard title="Conéctate con tu meta" description="Recibe orientación vocacional y elige la carrera ideal para ti. Nuestro equipo te acompaña en cada paso del camino." img='https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Offer card" />
      </div>
    </section>
    
  );
};