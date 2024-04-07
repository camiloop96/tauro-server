import GuideModel from "../models/GuideModel";

// Función para generar un número de guía único y consecutivo
export const generateUniqueGuideNumber = async () => {
  // Generar desde
  let lastGuideNumberInDatabase = 11282;

  // Consulta el último número de guía almacenado en la base de datos
  const lastGuide = await GuideModel.findOne({}, {}, { sort: { number: -1 } });

  
  if (lastGuide) {
    lastGuideNumberInDatabase = parseInt(
      lastGuide.number.replace("MAG", ""),
      10
    );
  }

  // Encuentra un número de guía único
  let newGuideNumber;
  do {
    lastGuideNumberInDatabase++;
    newGuideNumber = `MAG${lastGuideNumberInDatabase
      .toString()
      .padStart(5, "0")}`;
  } while (await GuideModel.findOne({ number: newGuideNumber }));

  // Crea el nuevo número de guía en la base de datos
  const newGuide = new GuideModel({ number: newGuideNumber });
  await newGuide.save();

  return newGuideNumber;
};
