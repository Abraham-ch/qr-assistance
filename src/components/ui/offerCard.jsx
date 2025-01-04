export const OfferCard = ({ title, description, img, alt, cn }) => {
  return (
    <div className={`flex flex-row${cn} max-w-5xl mx-auto gap-x-0 md:gap-x-4 lg:gap-x-16 px-6 sm:px-12 rounded-xl text-left items-center w-full`}>
      <div className="flex items-center gap-x-4 w-1/2">
        <img src={img} alt={alt} className="rounded-xl" />
      </div>
      <span className="w-1/2 flex flex-col gap-y-2 sm:gap-y-4 pr-2 sm:pr-8">
        <h3 className="text-base sm:text-xl md:text-2xl font-bold">{title}</h3>
        <p className="text-xs sm:text-sm md:text-lg">{description}</p>
      </span>
    </div>
  );
};