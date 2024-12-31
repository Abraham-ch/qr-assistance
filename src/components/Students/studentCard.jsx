const Card = ({ id, nombre, apellido, dni, nivel, grado }) => {
  return (
    <div className="aspect-[3.375/2.125] card border border-gray-300 rounded-lg p-4 shadow-md print:shadow-none print:border-gray-500 flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold">{`${nombre} ${apellido}`}</h2>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">ID:</span> {id}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">DNI:</span> {dni}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Nivel:</span> {nivel}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Grado:</span> {grado}
      </p>
    </div>
  );
};

export default Card;
