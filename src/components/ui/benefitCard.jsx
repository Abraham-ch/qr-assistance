export const BenefitCard = ({ title, description, icon, alt, cn }) => {
  return (
    <div className="flex flex-col max-w-64 gap-y-4 px-4 rounded-xl text-left transition-all duration-300">
      <div className="flex items-center gap-x-4">
        <img src={icon} alt={alt} className={`${cn} h-10 sm:h-12 p-2 rounded-md`} />
      </div>
      <h3 className="text-base sm:text-lg font-bold">{title}</h3>
      <p className="text-gray-700 text-xs sm:text-sm">{description}</p>
    </div>
  );
};