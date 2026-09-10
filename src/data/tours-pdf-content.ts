import type { ItineraryDay, TourPage } from './tours';
import { getTourHero } from './tour-hero-images';

/** Contenido oficial desde brochures PDF FraXplorer — precio sin hotel */
export type PdfTourContent = Partial<
  Pick<
    TourPage,
    | 'title'
    | 'subtitle'
    | 'description'
    | 'intro'
    | 'detailParagraphs'
    | 'highlights'
    | 'includes'
    | 'excludes'
    | 'recommendations'
    | 'itinerary'
    | 'price'
    | 'duration'
    | 'difficulty'
    | 'tourType'
    | 'category'
    | 'heroImage'
    | 'images'
    | 'priceNote'
  >
>;

const PACKAGE_EXCLUDES = [
  'Vuelos nacionales o internacionales.',
  'Seguro de viaje.',
  'Alimentación no mencionada en el itinerario.',
  'Servicios no especificados en el programa.',
];

const PACKAGE_RECOMMENDATIONS = [
  'Reservar con anticipación, especialmente en temporada alta (junio a septiembre).',
  'Llegar a Cusco al menos un día antes para aclimatarse a la altura.',
  'Portar pasaporte o documento de identidad original para Machu Picchu.',
  'Recojo desde hoteles del centro histórico de Cusco.',
  'Opcional: Huayna Picchu (+60 USD, sujeto a disponibilidad).',
  'Opcional: tren Vistadome (+40 USD un tramo, +70 USD ambos tramos).',
  'Opcional: noche adicional en Aguas Calientes o Cusco.',
];

const CITY_TOUR_DAY: ItineraryDay = {
  day: 'Día 1',
  title: 'Recojo del aeropuerto de Cusco / City Tour tarde',
  content:
    'A su llegada al aeropuerto de Cusco, nuestro personal lo espera para la bienvenida y el traslado al hotel.\n\nMañana libre: descanse y aclimátese a la altura (3,400 m s.n.m.).\n\nA las 2:00 p.m. recojo en el hotel para el City Tour: Templo del Sol (Qorikancha), Sacsayhuamán, Qenqo, Tambomachay y Puka Pukara.\n\nRetorno al hotel alrededor de las 6:30 p.m.',
};

const VALLE_AGUAS_DAY: ItineraryDay = {
  day: 'Día 2',
  title: 'Valle Sagrado / Aguas Calientes',
  content:
    'Desayuno en el hotel. Recojo alrededor de las 7:30 a.m. para iniciar el Valle Sagrado.\n\nVisita a Pisac: andenes, templos y mercado artesanal. Luego Ollantaytambo, fortaleza inca con terrazas y murallas.\n\nAlmuerzo buffet en un restaurante turístico de Urubamba.\n\nPor la tarde, tren turístico desde Ollantaytambo hasta Aguas Calientes. Nuestro personal lo recibe en la estación y lo acompaña al hotel.\n\nNoche en Aguas Calientes.',
};

const MACHU_PICCHU_DAY: ItineraryDay = {
  day: 'Día 3',
  title: 'Machu Picchu / retorno a Cusco',
  content:
    'Desayuno en el hotel. Caminamos a la estación de buses y subimos a la ciudadela de Machu Picchu.\n\nVisita guiada de aproximadamente 3 horas: templos, terrazas, recintos sagrados y tiempo para fotografías.\n\nDescenso a Aguas Calientes y almuerzo en restaurante turístico.\n\nPor la tarde, tren de retorno a Ollantaytambo y transporte privado a Cusco.',
};

const HUMANTAY_DAY = (dayNum: number): ItineraryDay => ({
  day: `Día ${dayNum}`,
  title: 'Laguna Humantay',
  content:
    'Recojo entre 4:30 y 5:00 a.m. Viaje a Mollepata (~3 h) para el desayuno buffet.\n\nContinuamos a Soraypampa (3,900 m). Caminata de unos 90 minutos hasta la Laguna Humantay, con vista al Salkantay.\n\nTiempo libre para fotos y descanso. Descenso (~1 h 20) y almuerzo buffet en Mollepata.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
});

const AIRPORT_DAY = (dayNum: number): ItineraryDay => ({
  day: `Día ${dayNum}`,
  title: 'Traslado al aeropuerto de Cusco',
  content:
    'Según el horario de su vuelo, lo trasladamos del hotel al aeropuerto de Cusco. Fin de servicios.\n\nRecomendamos programar vuelos a partir del mediodía para viajar con calma.',
});

const CUATRIMOTOS_MARAS_DAY: ItineraryDay = {
  day: 'Día 4',
  title: 'Salineras de Maras y Moray en cuatrimotos',
  content:
    'Recojo entre 6:30 y 7:00 a.m. Traslado a Cruz Pata, base de cuatrimotos en el Valle Sagrado.\n\nBriefing de seguridad y tiempo para familiarizarse con el vehículo.\n\nRecorrido guiado a Moray (andenes circulares) y a las Salineras de Maras (más de 3,000 pozas).\n\nRetorno a la base y transporte a Cusco, cerca de la Plaza Principal, alrededor de las 2:30 p.m.',
};

const MONTANA_COLORES_DAY = (dayNum: number): ItineraryDay => ({
  day: `Día ${dayNum}`,
  title: 'Montaña de Colores',
  content:
    'Recojo entre 4:30 y 5:00 a.m. Viaje a Cusipata (~3 h) para el desayuno.\n\nCaminata desde Phulawasipata hasta el mirador de Vinicunca (más de 5,000 m): unos 90 minutos de subida.\n\nTiempo libre para fotos. Descenso y almuerzo buffet en Cusipata.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
});

export const PDF_TOUR_CONTENT: Record<string, PdfTourContent> = {
  'montana-de-colores-full-day': {
    title: 'Montaña de Colores Full Day',
    subtitle: 'Un reto andino con una vista que vale cada paso',
    description:
      'Asciende a la Montaña de Colores (Vinicunca) desde Cusco con desayuno y almuerzo buffet, guía bilingüe y paisajes altoandinos inolvidables.',
    intro: [
      'Horario: 04:00 a.m. – 05:00 p.m. Salidas todos los días, todo el año. Nivel moderado.',
      'Recojo a las 4:00 a.m. en su hotel de Cusco. Desayuno en Cusipata, caminata desde Phulawasipata (4,626 m s.n.m.) hasta el mirador de Vinicunca (más de 5,000 m) y almuerzo buffet de regreso.',
      'La caminata dura unos 90 minutos de subida. Se recomienda aclimatarse 1 o 2 días en Cusco. La entrada (25 soles) se paga en el lugar.',
    ],
    detailParagraphs: [
      'Vinicunca es una de las formaciones más fotografiadas de los Andes. En el camino se ven llamas, alpacas y el nevado Ausangate, la montaña más alta del Cusco.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Montaña de Colores – Cusco',
        content:
          '4:00 a.m. — Recojo en su hotel en Cusco. Viaje hacia el pueblo de Cusipata, donde disfrutará de un desayuno incluido.\n\nContinuamos por un paisaje altoandino hasta Phulawasipata (4,626 m s.n.m.), punto de inicio de la caminata hacia la Montaña de Colores (Vinicunca).\n\nEn el trayecto se aprecian llamas, alpacas y nevados como el Ausangate. Tras aproximadamente 1 hora y 30 minutos de caminata llegamos al mirador principal, con tonos rojizos, dorados y turquesa.\n\nTiempo libre para fotografías, descanso y disfrutar el paisaje.\n\nRetorno por el mismo camino. Almuerzo buffet en Cusipata.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
      },
    ],
    highlights: [
      'Viaje panorámico por los majestuosos paisajes altoandinos del Cusco.',
      'Observa llamas, alpacas y comunidades andinas en su entorno natural.',
      'Caminata hacia la Montaña de 7 Colores (Vinicunca), a más de 5,000 m s.n.m.',
      'Tiempo libre para disfrutar las vistas, descansar y tomar fotografías inolvidables.',
      'Conexión con la naturaleza, los apus y la energía de los Andes peruanos.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno y almuerzo buffet.',
      'Guía profesional inglés / español.',
      'Asistencia permanente.',
      'Bastones y oxígeno.',
    ],
    excludes: ['Entrada a la Montaña de Colores (25 soles).'],
    recommendations: [
      'Llevar ropa abrigada en capas, gorro, guantes y bloqueador solar.',
      'Use zapatillas de trekking con buena tracción.',
      'Hidratación y snacks ligeros para la caminata.',
      'Aclimatarse en Cusco al menos 1–2 días antes del tour.',
    ],
    price: '$30.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Naturaleza',
    category: 'Cusco en un día',
  },
  'maras-y-moray-con-picnic-andino-full-day': {
    title: 'Maras y Moray con Picnic Andino Full Day',
    subtitle: 'Historia inca, paisajes únicos y picnic andino al aire libre',
    description:
      'Chinchero, Salineras de Maras, Moray y picnic andino en Mountain View (Tipi) con frutas, quesos, vinos, llamas y vicuñas en el Valle Sagrado.',
    intro: [
      'Horario: 08:00 a.m. – 06:00 p.m. Recojo entre 8:30 y 9:00 a.m. Duración: 8 horas. Nivel moderado.',
      'Recorrido por Chinchero, Salineras de Maras y Moray, y picnic andino en Mountain View (Tipi) con frutas, quesos, vinos, llamas y vicuñas.',
      'Las entradas (boleto turístico y Salineras de Maras) se pagan en el lugar. Lleve efectivo en soles.',
    ],
    detailParagraphs: [
      'El picnic se sirve en un Tipi, con vista al Valle Sagrado. Es un día más relajado que los trekkings de alta montaña, con tiempo para fotos y para conocer el proceso de la sal y los andenes de Moray.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Chinchero – Maras – Moray – Mountain View – Cusco',
        content:
          '8:30–9:00 a.m. — Recojo en su hotel en Cusco. Viaje a Chinchero: comunidad artesanal y proceso tradicional de la lana de llama.\n\nVisita a las Salineras de Maras. El guía explica la extracción de sal. Tiempo libre para fotos.\n\nContinuamos a Moray, antiguo laboratorio agrícola inca.\n\nPor la tarde, picnic andino en Mountain View, en un Tipi, con frutas, quesos y vinos. Interacción con llamas y vicuñas.\n\nRetorno a Cusco entre 5:30 y 6:00 p.m.',
      },
    ],
    highlights: [
      'Comunidad artesanal de Chinchero y proceso tradicional de la lana.',
      'Salineras de Maras con más de 3,000 pozas de sal.',
      'Terrazas circulares de Moray, antiguo laboratorio agrícola inca.',
      'Picnic andino en Tipi en Mountain View con llamas y vicuñas.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Transporte privado a Mountain View.',
      'Guía profesional bilingüe.',
      'Almuerzo tipo picnic andino.',
    ],
    excludes: [
      'Boleto turístico Parcial Cusco (s/ 70 soles).',
      'Boleto turístico General Cusco (s/ 130 soles).',
      'Entrada a las Salineras de Maras (s/ 20 soles).',
      'Alimentación no mencionada.',
    ],
    recommendations: [
      'Llevar chamarra, gorro y bloqueador solar.',
      'Cámara o celular con batería cargada.',
      'Efectivo en soles para entradas.',
    ],
    price: '$90.00',
    duration: '8 Horas',
    difficulty: 'Moderado',
    tourType: 'Cultural, Naturaleza',
    category: 'Cusco en un día',
  },
  'laguna-humantay-full-day': {
    title: 'Laguna Humantay Full Day',
    subtitle: 'Descubre la magia de la Laguna Humantay, un paraíso entre montañas',
    description:
      'Full day desde Cusco hasta la Laguna Humantay: recojo en hotel, desayuno y almuerzo buffet en Mollepata, caminata guiada con vistas al Salkantay, bastones y oxígeno. Un día de trekking moderado entre montañas y aguas turquesa.',
    intro: [
      'Horario: 04:00 a.m. – 6:00 p.m. Salidas todos los días, todo el año.',
      'El recojo es a las 4:30 a.m. en su hotel de Cusco. Viajamos a Mollepata para el desayuno y luego a Soraypampa (3,900 m s.n.m.), donde comienza la caminata de unos 90 minutos hasta la laguna.',
      'En el mirador hay tiempo para fotos y descanso. El descenso vuelve a Mollepata para el almuerzo buffet y el retorno a Cusco es alrededor de las 6:00 p.m.',
    ],
    detailParagraphs: [
      'Nivel moderado. Se recomienda aclimatarse 1 o 2 días en Cusco. La entrada a Soraypampa / Laguna Humantay (aprox. 20 soles) se paga en el lugar. El caballo es opcional.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Mollepata – Laguna Humantay – Cusco',
        content:
          '4:30 a.m. — Recojo en su hotel en Cusco. Viaje hacia Mollepata, donde disfrutará de un desayuno buffet incluido.\n\nContinuamos a Soraypampa (3,900 m s.n.m.), punto de inicio de la caminata.\n\nCaminata de aproximadamente 1 hora y 30 minutos hacia la Laguna Humantay, rodeada de paisajes andinos y con vista al nevado Salkantay. El guía comparte la importancia natural y espiritual de esta laguna sagrada.\n\nTiempo libre en la laguna para fotografías, descanso y admirar el color turquesa de sus aguas.\n\nRetorno a Soraypampa. Almuerzo buffet en Mollepata.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
      },
    ],
    highlights: [
      'Desayuno y almuerzo buffet incluidos en restaurantes locales.',
      'Caminata con vistas impresionantes al nevado Salkantay.',
      'Contempla la espectacular Laguna Humantay de aguas turquesa.',
      'Tiempo libre para fotografías y conexión espiritual con los apus andinos.',
      'Viaje panorámico por los valles andinos rumbo a Mollepata.',
    ],
    includes: [
      'Recojo desde su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno y almuerzo buffet en Mollepata.',
      'Guía profesional (español / inglés).',
      'Bastones y oxígeno.',
    ],
    excludes: ['Entrada Soraypampa / Laguna Humantay (aprox. 20 soles).', 'Caballo opcional.'],
    recommendations: [
      'Ropa abrigada, gorro, guantes y poncho de lluvia.',
      'Zapatillas de trekking y botella de agua.',
      'Pastillas para el soroche si es sensible a la altura.',
    ],
    price: '$35.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Naturaleza',
    category: 'Cusco en un día',
  },
  'montana-palcoyo-full-day': {
    title: 'Montaña de Palcoyo Full Day',
    subtitle: 'Paisajes andinos únicos, montañas de colores y caminata ligera',
    description:
      'Alternativa más accesible a Vinicunca: tres montañas arcoíris, caminata suave de 40–50 minutos, desayuno y almuerzo buffet incluidos.',
    intro: [
      'Horario: 04:00 a.m. – 05:00 p.m. Salidas todos los días. Nivel moderado, caminata ligera.',
      'Recojo a las 4:00 a.m. Desayuno en Cusipata y caminata suave de 40–50 minutos desde Palcoyo (~4,900 m s.n.m.) hasta los miradores de tres montañas de colores.',
      'Es la alternativa menos exigente a Vinicunca, con las mismas vistas de colores y del Ausangate. La entrada (15 soles) se paga en el lugar.',
    ],
    detailParagraphs: [
      'Ideal si busca paisajes de montañas arcoíris sin la subida larga de Vinicunca. Lleve ropa en capas, gorro y bloqueador: el viento en altura es frío.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Palcoyo – Cusco',
        content:
          '4:00 a.m. — Recojo en su hotel en Cusco. Viaje a Cusipata para el desayuno incluido.\n\nContinuamos hasta la comunidad de Palcoyo (~4,900 m s.n.m.), inicio de una caminata suave y progresiva.\n\nEn el camino: tres montañas multicolores, llamas, alpacas y vistas de la Cordillera del Ausangate, sin gran exigencia física.\n\nA los 40–50 minutos llegamos a los miradores. Tiempo libre para fotos y descanso.\n\nRetorno a Cusipata. Almuerzo buffet.\n\nLlegada a Cusco alrededor de las 5:00 p.m.',
      },
    ],
    highlights: [
      'Viaje panorámico por paisajes altoandinos del Cusco.',
      'Tres montañas multicolores sin gran exigencia física.',
      'Vistas espectaculares de la Cordillera del Ausangate.',
      'Observa llamas, alpacas y comunidades andinas.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno y almuerzo buffet.',
      'Guía profesional inglés / español.',
      'Asistencia permanente.',
      'Bastones y oxígeno.',
    ],
    excludes: ['Entrada a la Montaña de Palcoyo (15 soles).'],
    recommendations: [
      'Ropa en capas, gorro y bloqueador solar.',
      'Caminata moderada — ideal para quienes buscan menos esfuerzo que Vinicunca.',
    ],
    price: '$40.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Naturaleza',
    category: 'Cusco en un día',
  },
  'valle-sagrado-full-day': {
    title: 'Valle Sagrado de los Incas Full Day',
    subtitle: 'Historia, tradición y paisajes impresionantes en un solo día',
    description:
      'Mirador de Taray, Pisac, almuerzo buffet en Urubamba, Ollantaytambo y Chinchero con talleres textiles en un recorrido completo por el Valle Sagrado.',
    intro: [
      'Horario: 07:00 a.m. – 07:00 p.m. Salidas todos los días. Nivel moderado.',
      'Recojo a las 7:00 a.m. en su hotel. Mirador de Taray, Pisac, almuerzo buffet en Urubamba, Ollantaytambo y Chinchero. Retorno a Cusco alrededor de las 7:00 p.m.',
    ],
    detailParagraphs: [
      'Un día completo por los pueblos más emblemáticos del Valle Sagrado: andenes, templos y talleres textiles. El boleto turístico (parcial 70 soles o general 130 soles) se paga en el lugar.',
      'Precio del tour: USD 25 por persona. Reserva con el 30% del precio final. El saldo se paga en Cusco.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Taray – Pisac – Urubamba – Ollantaytambo – Chinchero',
        content:
          '7:00 a.m. — Recojo en su hotel en Cusco. Primera parada en el Mirador de Taray, con vista panorámica del Valle Sagrado.\n\nPisac: andenes, templos incas y mercado artesanal.\n\nAlmuerzo buffet en Urubamba, con platos típicos.\n\nPor la tarde, Ollantaytambo: templos, terrazas y murallas incas.\n\nChinchero: iglesia colonial sobre muros incas y talleres textiles (teñido y tejido andino).\n\nLlegada a Cusco alrededor de las 7:00 p.m.',
      },
    ],
    highlights: [
      'Mirador de Taray con vista panorámica del Valle Sagrado.',
      'Pisac: andenes agrícolas, templos incas y mercado artesanal.',
      'Almuerzo buffet en Urubamba con platos típicos.',
      'Ollantaytambo: complejo arqueológico y estructura inca original.',
      'Chinchero: iglesia colonial sobre muros incas y tejidos andinos.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno en el hotel y almuerzo buffet en Urubamba.',
      'Guía profesional (español / inglés).',
      'Asistencia permanente.',
    ],
    excludes: [
      'Boleto turístico Parcial Cusco (s/ 70 soles).',
      'Boleto turístico General Cusco (s/ 130 soles).',
      'Alimentación no mencionada.',
    ],
    recommendations: [
      'Usar ropa cómoda y abrigadora; el clima puede variar durante el día.',
      'Llevar zapatillas cómodas o calzado con buena tracción.',
      'Portar gorra, lentes de sol y bloqueador solar.',
      'Llevar efectivo en soles para entradas.',
      'Llevar cámara o celular con batería cargada.',
    ],
    price: '$25.00',
    priceNote: 'Precio del tour USD 25 por persona. Reserva con 30% del total; saldo en Cusco.',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Cultural, Naturaleza',
    category: 'Cusco en un día',
  },
  'valle-sagrado-con-maras-y-moray-full-day': {
    title: 'Valle Sagrado con Maras y Moray Full Day',
    subtitle: 'Un día perfecto entre terrazas incas y salineras milenarias',
    description:
      'Chinchero, Moray, Salineras de Maras, almuerzo buffet en Urubamba, Ollantaytambo y Pisac en un recorrido completo por el Valle Sagrado.',
    intro: [
      'Horario: 07:00 a.m. – 07:00 p.m. Recojo entre 6:30 y 7:00 a.m. Nivel moderado.',
      'Chinchero, Moray, Salineras de Maras, almuerzo buffet en Urubamba, Ollantaytambo y Pisac. Guía bilingüe incluido.',
      'El boleto turístico y la entrada a las Salineras de Maras (20 soles) se pagan en el lugar. Lleve efectivo en soles.',
    ],
    detailParagraphs: [
      'Combina el Valle Sagrado clásico con Moray y las salineras milenarias. Es el full day más completo si quiere ver terrazas, sal y dos complejos incas en una sola jornada.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Chinchero – Moray – Maras – Urubamba – Ollantaytambo – Pisac',
        content:
          '6:30–7:00 a.m. — Recojo en su hotel. Viaje al Valle Sagrado.\n\nChinchero: terrazas agrícolas y centro textil con teñido de pigmentos naturales.\n\nMoray: andenes circulares, laboratorio agrícola inca.\n\nSalineras de Maras: extracción ancestral de sal.\n\nAlmuerzo buffet en Urubamba.\n\nPor la tarde, Ollantaytambo y Pisac, con vista panorámica del valle.\n\nLlegada a Cusco alrededor de las 7:00 p.m.',
      },
    ],
    highlights: [
      'Chinchero: terrazas agrícolas y artesanía textil andina.',
      'Moray: antiguo laboratorio agrícola inca con andenes circulares.',
      'Salineras de Maras con proceso ancestral de extracción de sal.',
      'Ollantaytambo y Pisac con vistas panorámicas del valle.',
      'Almuerzo buffet incluido en Urubamba.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Guía profesional (español / inglés).',
      'Almuerzo buffet en Urubamba.',
      'Asistencia permanente.',
    ],
    excludes: [
      'Boleto turístico Parcial Cusco (s/ 70 soles).',
      'Boleto turístico General Cusco (s/ 130 soles).',
      'Entrada a las Salineras de Maras (s/ 20 soles).',
      'Alimentación no mencionada.',
    ],
    recommendations: [
      'Ropa cómoda en capas y calzado con buena tracción.',
      'Gorra, lentes de sol y bloqueador solar.',
      'Efectivo en soles para entradas.',
    ],
    price: '$34.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Cultural, Naturaleza',
    category: 'Cusco en un día',
  },
  'cuatrimotos-maras-moray-medio-dia': {
    title: 'Maras y Moray en Cuatrimotos Full Day',
    subtitle: 'Aventura, cultura y paisajes únicos en el Valle Sagrado',
    description:
      'Recorre Moray y las Salineras de Maras en cuatrimotos con briefing de seguridad, guía bilingüe y transporte desde Cusco.',
    intro: [
      'Horario: 07:00 a.m. – 02:30 p.m. Recojo entre 6:30 y 7:00 a.m. Nivel moderado.',
      'Base de cuatrimotos en Cruz Pata, Valle Sagrado. Briefing de seguridad, recorrido a Moray y Salineras de Maras, y retorno a Cusco cerca de la Plaza Principal alrededor de las 2:30 p.m.',
      'Las entradas (boleto turístico y Salineras de Maras, 20 soles) se pagan en el lugar.',
    ],
    detailParagraphs: [
      'Combina aventura y cultura: usted maneja el cuatrimoto con guía. Use ropa cómoda, guantes y lentes de sol. No se requiere experiencia previa; hay tiempo para familiarizarse en la base.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cruz Pata – Moray – Maras – Cusco',
        content:
          '6:30–7:00 a.m. — Recojo en su hotel en Cusco. Traslado a Cruz Pata, en el Valle Sagrado.\n\nBriefing de seguridad y entrega de cuatrimotos.\n\nRecorrido guiado a Moray, laboratorio agrícola inca de andenes circulares.\n\nContinuamos a las Salineras de Maras (más de 3,000 pozas).\n\nRetorno a la base y transporte a Cusco, cerca de la Plaza Principal, alrededor de las 2:30 p.m.',
      },
    ],
    highlights: [
      'Recorrido en cuatrimotos por paisajes del Valle Sagrado.',
      'Terrazas circulares de Moray, antiguo laboratorio agrícola inca.',
      'Salineras de Maras con más de 3,000 pozas de sal.',
      'Briefing de seguridad y manejo guiado antes del recorrido.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Recorrido en cuatrimotos.',
      'Guía profesional (español / inglés).',
      'Asistencia permanente.',
    ],
    excludes: [
      'Entradas (Boleto Turístico Parcial 70 soles o General 130 soles).',
      'Entrada a las Salineras de Maras (20 soles).',
    ],
    recommendations: [
      'Use ropa cómoda, guantes y lentes de sol.',
      'Experiencia ideal para combinar aventura y cultura.',
    ],
    price: '$40.00',
    duration: '8 Horas',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Cusco en un día',
  },
  'city-tour-medio-dia': {
    title: 'City Tour Cusco Full Day',
    subtitle: 'Un viaje al corazón del Imperio Inca, lleno de historia y belleza',
    description:
      'Qorikancha, Centro Histórico, Catedral y complejo arqueológico de Sacsayhuamán, Qenqo, Puca Pucara y Tambomachay.',
    intro: [
      'Duración: 6 horas. Nivel fácil. Salidas todos los días.',
      'Horario de tarde: 2:30 p.m. – 6:30 p.m. Recojo en hotel, Qorikancha, centro histórico, Catedral y el circuito de Sacsayhuamán, Qenqo, Puca Pucara y Tambomachay.',
      'Las entradas se pagan en el lugar: Qorikancha 15 soles y Boleto Turístico Parcial 70 soles.',
    ],
    detailParagraphs: [
      'Es el recorrido clásico para entender Cusco en una tarde: templo del Sol, Plaza de Armas y los cuatro sitios arqueológicos de los alrededores. Use calzado cómodo; hay tramos a pie y algo de altura.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'City Tour Cusco + Complejo Arqueológico',
        content:
          'Recojo en su hotel en Cusco para un recorrido de historia y tradición.\n\nPrimera visita: Templo del Sol o Qorikancha, fusión de arquitectura inca y colonial.\n\nCentro histórico: calles empedradas, casonas y la Catedral del Cusco (Escuela Cusqueña).\n\nCircuito arqueológico: Sacsayhuamán (bloques de piedra), Qenqo (centro ceremonial), Puca Pucara (fortaleza) y Tambomachay (Baño del Inca).\n\nRetorno al Cusco alrededor de las 6:00 p.m.',
      },
    ],
    highlights: [
      'Explora templos y calles históricas del Cusco imperial.',
      'Visita el Templo del Sol – Qorikancha.',
      'Admira la Catedral del Cusco y obras de la Escuela Cusqueña.',
      'Conoce Sacsayhuamán, Qenqo, Puca Pucara y Tambomachay.',
    ],
    includes: [
      'Guía oficial de turismo (español / inglés).',
      'Transporte turístico.',
      'Recojo de su hotel en Cusco.',
      'Asistencia personalizada.',
    ],
    excludes: [
      'Alimentación.',
      'Entrada Qorikancha (15 soles).',
      'Boleto Turístico Parcial (70 soles).',
    ],
    recommendations: [
      'Use ropa cómoda y calzado para caminar.',
      'Lleve documento de identidad.',
    ],
    price: '$10.00',
    duration: '6 Horas',
    difficulty: 'Fácil',
    tourType: 'Cultural, Histórico',
    category: 'Cusco en un día',
  },
  'pallay-punchu-full-day': {
    title: 'Pallay Punchu Full Day',
    subtitle: 'Formaciones únicas y paisajes andinos espectaculares',
    description:
      'Caminata moderada hacia la Montaña Pallay Punchu con formaciones rocosas en filamentos, vistas al lago Langui, desayuno y almuerzo incluidos.',
    intro: [
      'Horario: 04:00 a.m. – 06:00 p.m. Salidas todos los días. Nivel moderado.',
      'Recojo a las 4:00 a.m. Viaje al sur (distrito de Layo, Canas), caminata moderada a Pallay Punchu y almuerzo incluido. Retorno a Cusco alrededor de las 6:00 p.m.',
      'La entrada a Pallay Punchu (15 soles) se paga en el lugar. Lleve ropa abrigada y zapatillas de trekking.',
    ],
    detailParagraphs: [
      'Pallay Punchu destaca por sus formaciones rocosas en filamentos y la vista del lago Langui. Es un destino menos masivo que Vinicunca, con el mismo espíritu de alta montaña.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Layo – Pallay Punchu – Cusco',
        content:
          '4:00 a.m. — Recojo en su hotel en Cusco. Viaje al sur, entre paisajes andinos.\n\nParada en ruta para el desayuno. Continuamos al distrito de Layo, provincia de Canas.\n\nCaminata moderada hacia Pallay Punchu: formaciones rocosas en filamentos y vistas del lago Langui.\n\nTiempo libre para fotos y descanso.\n\nAlmuerzo en restaurante local.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
      },
    ],
    highlights: [
      'Formaciones rocosas únicas en forma de filamentos.',
      'Vistas panorámicas del lago Langui.',
      'Paisajes altoandinos al sur del Cusco.',
      'Desayuno y almuerzo incluidos.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno y almuerzo.',
      'Guía profesional inglés / español.',
      'Asistencia permanente.',
      'Bastones y oxígeno.',
    ],
    excludes: ['Entrada a Pallay Punchu (15 soles).'],
    recommendations: [
      'Ropa abrigada, gorro y bloqueador solar.',
      'Zapatillas de trekking recomendadas.',
    ],
    price: '$45.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Naturaleza',
    category: 'Cusco en un día',
  },
  'machu-picchu-en-carro-desde-cusco': {
    title: 'Machu Picchu en Carro desde Cusco Full Day',
    subtitle: 'Visita Machu Picchu en un día con transporte terrestre desde Cusco',
    description:
      'Recorre el Valle Sagrado en transporte privado hasta Ollantaytambo y continúa hacia Aguas Calientes para visitar la ciudadela de Machu Picchu con guía profesional, entrada incluida y almuerzo.',
    intro: [
      'Horario: 04:00 a.m. – 11:00 p.m. Salidas todos los días. Nivel moderado.',
      'Recojo a las 4:00 a.m. Carro por el Valle Sagrado hasta Ollantaytambo, tren a Aguas Calientes, bus y visita guiada de unas 2 h 30 en Machu Picchu. Almuerzo incluido. Retorno a Cusco alrededor de las 9:00 p.m.',
      'Incluye tren turístico, entrada a Machu Picchu y guía. Reserva con anticipación: los cupos de la ciudadela son limitados. Lleve pasaporte original.',
    ],
    detailParagraphs: [
      'Opción para conocer Machu Picchu en un solo día desde Cusco, sin noche en Aguas Calientes. Opcional: Huayna Picchu (+60 USD) o tren Vistadome (+40 USD un tramo, +70 USD ambos).',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Ollantaytambo – Aguas Calientes – Machu Picchu – Cusco',
        content:
          '4:00 a.m. — Recojo en su hotel en Cusco. Traslado en carro por el Valle Sagrado hasta la estación de Ollantaytambo.\n\nTren hacia Aguas Calientes, con vistas de montañas, río y valle.\n\nBus a la ciudadela. Recorrido guiado de unas 2 horas 30 minutos: templos, terrazas y miradores.\n\nTiempo libre para fotos.\n\nDescenso a Aguas Calientes y almuerzo en restaurante local.\n\nTren de retorno a Ollantaytambo y carro a Cusco, alrededor de las 9:00 p.m.',
      },
    ],
    highlights: [
      'Visita guiada por templos, terrazas y miradores de Machu Picchu.',
      'Traslado terrestre por el Valle Sagrado con paisajes andinos.',
      'Tiempo libre para explorar la ciudadela.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico Cusco – Ollantaytambo ida y retorno.',
      'Boleto de tren turístico ida y retorno.',
      'Entrada a Machu Picchu.',
      'Guía profesional (español / inglés).',
      'Almuerzo en restaurante turístico.',
    ],
    excludes: ['Propinas personales.', 'Otros servicios no mencionados.'],
    recommendations: [
      'Reservar con anticipación — cupos limitados.',
      'Llevar pasaporte original.',
      'Opcional: Huayna Picchu (+60 USD), tren Vistadome (+40–70 USD por tramo).',
    ],
    price: '$280.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Cultural, Histórico',
    category: 'Cusco en un día',
  },
  'waqrapukara-full-day': {
    title: 'Waqrapukara Full Day',
    subtitle: 'WAQRAPUKARA FULL DAY – AVENTURA ENTRE NUBES Y ANDES',
    description:
      'Vive una experiencia única hacia la imponente fortaleza de Waqrapukara, un destino místico rodeado de paisajes andinos, cañones profundos y una energía ancestral que te conecta con la historia inca.',
    intro: [
      'Horario: salida 4:30–5:00 a.m. Retorno a Cusco entre 5:30 y 6:30 p.m. Nivel moderado. Duración aprox. 12 horas.',
      'Salida temprana hacia Sangarará (desayuno andino), caminata de 1 h 30 a 2 h por el cañón del Apurímac hasta la fortaleza en forma de cuernos, almuerzo típico y retorno por la tarde.',
      'La entrada al complejo (aprox. 20 soles / 6 USD) se paga en el lugar. Clima frío y variable: lleve cortaviento y calzado de trekking.',
    ],
    detailParagraphs: [
      'Waqrapukara es un destino menos masivo, con vistas del cañón y una visita guiada al sitio arqueológico. Ideal si ya conoce Vinicunca o Humantay y busca otra cara de los Andes.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Sangarará – Waqrapukara – Cusco',
        content:
          '4:30–5:00 a.m. — Recojo en Cusco. Viaje al sur hasta Sangarará para el desayuno andino.\n\nTraslado al inicio del trekking. Caminata moderada de 1 h 30 a 2 h por el cañón del Apurímac.\n\nVisita guiada a Waqrapukara, la fortaleza en forma de cuernos.\n\nDescenso por el mismo camino. Almuerzo típico en restaurante local.\n\nLlegada a Cusco entre 5:30 y 6:30 p.m.',
      },
    ],
    highlights: [
      'Complejo arqueológico de Waqrapukara con formación en forma de cuernos.',
      'Vistas espectaculares del cañón del Apurímac.',
      'Desayuno andino y almuerzo típico incluidos.',
      'Guía bilingüe especializado en trekking y cultura andina.',
    ],
    includes: [
      'Transporte turístico ida y vuelta desde Cusco.',
      'Desayuno andino en Sangarará.',
      'Almuerzo típico en restaurante local.',
      'Guía profesional bilingüe (español / inglés).',
      'Botiquín de primeros auxilios y oxígeno.',
    ],
    excludes: [
      'Entrada al complejo arqueológico de Waqrapukara (aprox. 20 soles / 6 USD).',
      'Gastos personales, souvenirs y propinas.',
    ],
    recommendations: [
      'Ropa abrigadora y cortaviento — clima frío y variable.',
      'Zapatillas o botas de trekking con buena tracción.',
      'Gorro, lentes de sol, bloqueador solar y agua.',
      'Efectivo en soles para la entrada.',
    ],
    price: '$50.00',
    duration: '12 Horas',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Cusco en un día',
  },
  'tour-machu-picchu-full-day': {
    title: 'Machu Picchu Full Day',
    subtitle: 'Explora una de las joyas más impresionantes del planeta',
    description:
      'Tour full day desde Cusco con tren turístico, bus a la ciudadela, guía profesional, entrada a Machu Picchu y almuerzo en Aguas Calientes.',
    intro: [
      'Horario: 04:00 a.m. – 11:00 p.m. | Salidas todos los días.',
      'Recojo 4:00 a.m. → tren Ollantaytambo–Aguas Calientes → visita guiada ~2h30 → retorno ~9:00 p.m.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Ollantaytambo – Machu Picchu – Cusco',
        content:
          'Traslado a Ollantaytambo → tren al Valle Sagrado → bus a Machu Picchu → tour guiado → tiempo libre → almuerzo en Aguas Calientes → tren retorno → traslado a Cusco.',
      },
    ],
    highlights: [
      'Recorrido guiado por templos, terrazas y miradores de Machu Picchu.',
      'Viaje en tren con vistas del Valle Sagrado.',
      'Tiempo libre para explorar la ciudadela.',
    ],
    includes: [
      'Recojo de su hotel en Cusco.',
      'Transporte turístico Cusco – Ollantaytambo.',
      'Boleto de tren turístico ida y retorno.',
      'Entrada a Machu Picchu.',
      'Guía profesional (español / inglés).',
      'Almuerzo en restaurante turístico.',
    ],
    excludes: ['Propinas personales.', 'Otros servicios no mencionados.'],
    recommendations: [
      'Reservar con anticipación — cupos limitados.',
      'Llevar pasaporte original.',
      'Opcional: Huayna Picchu (+60 USD), tren Vistadome (+40–70 USD por tramo).',
      'Opcional: aguas termales en Aguas Calientes.',
    ],
    price: '$320.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Cultural, Histórico',
    category: 'Machupicchu',
  },
  'glaciar-qelccaya-full-day': {
    title: 'Glaciar de Quelccaya Full Day',
    subtitle: 'GLACIAR DE QUELCCAYA FULL DAY',
    description:
      'Descubre el glaciar tropical más grande del mundo con desayuno y almuerzo, caminata por la puna andina y guía profesional desde Cusco.',
    intro: [
      'Horario: 04:00 a.m. – 6:00 p.m. Salidas todos los días. Nivel moderado.',
      'Recojo a las 4:00 a.m. Viaje al sur hasta Cusipata para el desayuno. Continuamos hacia la comunidad cercana al glaciar (Phinaya), caminata ligera al mirador y almuerzo andino. Retorno a Cusco alrededor de las 6:00 p.m.',
      'Quelccaya es el glaciar tropical más grande del mundo. La entrada (15 soles) se paga en el lugar. Zona de alta montaña: lleve ropa muy abrigada, gorro, guantes y lentes de sol.',
    ],
    detailParagraphs: [
      'El guía explica el glaciar y el impacto del cambio climático. En el camino se ven llamas, alpacas y planicies altoandinas. Bastones y oxígeno van incluidos.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Glaciar Quelccaya – Cusco',
        content:
          '4:00 a.m. — Recojo en su hotel en Cusco. Viaje al sur hasta Cusipata para el desayuno incluido.\n\nContinuamos hacia la comunidad cercana al Glaciar de Quelccaya, el glaciar tropical más grande del mundo. En el camino: llamas, alpacas y planicies altoandinas.\n\nCaminata ligera hasta un mirador. Tiempo libre para fotos. El guía explica el glaciar y el cambio climático.\n\nRetorno a Cusipata. Almuerzo andino.\n\nLlegada a Cusco alrededor de las 6:00 p.m.',
      },
    ],
    highlights: [
      'Vista panorámica del Glaciar de Quelccaya.',
      'Paisajes con llamas, alpacas y planicies altoandinas.',
      'Información sobre el impacto del cambio climático.',
    ],
    includes: [
      'Recojo desde su hotel en Cusco.',
      'Transporte turístico ida y vuelta.',
      'Desayuno y almuerzo buffet.',
      'Guía profesional (español / inglés).',
      'Bastones y oxígeno.',
    ],
    excludes: ['Entrada (15 soles).'],
    recommendations: [
      'Ropa muy abrigada — zona de alta montaña.',
      'Gorro, guantes y lentes de sol.',
    ],
    price: '$50.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Naturaleza',
    category: 'Cusco en un día',
  },
  'huacachina-islas-ballestas-full-day': {
    title: 'Islas Ballestas y Huacachina Full Day',
    subtitle: 'Mar y desierto en un día',
    description:
      'Desde Lima: Islas Ballestas, viñedo con cata de pisco, almuerzo, tubulares y sandboarding en Huacachina. Retorno ~10:00 p.m.',
    intro: [
      'Horario: 04:00 a.m. – 11:00 p.m. | Recojo en Barranco, San Isidro y Miraflores.',
      'Duración aproximada: 10 horas | Nivel: Fácil.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Lima – Paracas – Ica – Huacachina – Lima',
        content:
          'Recojo 4:00 a.m. → Paracas (desayuno) → Islas Ballestas en lancha → Ica (viñedo y cata) → almuerzo → Huacachina (tubulares y sandboarding) → retorno Lima ~10:00 p.m.',
      },
    ],
    highlights: [
      'Navega por las Islas Ballestas: lobos marinos, pingüinos y aves guaneras.',
      'Descubre el Oasis de Huacachina rodeado de dunas.',
      'Adrenalina con tubulares (buggy) y sandboarding.',
      'Cata de vino y pisco peruano.',
    ],
    includes: [
      'Recojo y retorno desde hotel (Barranco, San Isidro, Miraflores).',
      'Transporte turístico.',
      'Desayuno y almuerzo.',
      'Cata de vino y pisco peruano.',
      'Tour en tubulares y sandboarding en Huacachina.',
      'Guía bilingüe profesional.',
      'Entradas turísticas.',
    ],
    excludes: ['Actividades no mencionadas en el itinerario.'],
    recommendations: [
      'Llevar gorro, lentes de sol y ropa ligera.',
      'Protector solar — mucho sol en Ica.',
    ],
    price: '$120.00',
    duration: '1 Día',
    difficulty: 'Fácil',
    tourType: 'Aventura, Naturaleza',
    category: 'Explora',
  },
  'city-tour-lima-full-day': {
    title: 'City Tour Lima Full Day',
    subtitle: 'Lima inolvidable: del Centro Histórico al mar del Pacífico',
    description:
      'Recorrido por Miraflores, Malecón, Parque del Amor, Centro Histórico de Lima y Convento de San Francisco con catacumbas.',
    intro: [
      'Horarios: mañana 09:00 a.m.–1:00 p.m. o tarde 2:30 p.m.–6:30 p.m.',
      'Recojo desde hotel en Barranco, San Isidro y Miraflores.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Miraflores – Centro Histórico – San Francisco',
        content:
          'Recojo en hotel → Malecón de Miraflores y Parque del Amor → Centro Histórico → Convento de San Francisco y catacumbas → retorno ~6:30 p.m.',
      },
    ],
    highlights: [
      'Vista panorámica del Océano Pacífico desde Miraflores.',
      'Paseo por el Parque del Amor.',
      'Recorrido por el Centro Histórico de Lima.',
      'Visita al Convento de San Francisco y sus catacumbas.',
    ],
    includes: [
      'Recojo de su hotel (Barranco, San Isidro, Miraflores).',
      'Guía turístico.',
      'Entradas turísticas.',
    ],
    excludes: ['Alimentación.', 'Seguro de viaje.'],
    recommendations: [
      'Use calzado cómodo para caminar en el centro.',
      'Lleve documento de identidad.',
    ],
    price: '$30.00',
    duration: '4 Horas',
    difficulty: 'Fácil',
    tourType: 'Cultural, Histórico',
    category: 'Explora',
  },
  'islas-ballestas-nazca-2d-1n': {
    title: 'Islas Ballestas – Huacachina / Sobrevuelo Nazca 2D / 1N',
    subtitle: 'Mar, desierto y líneas de Nazca desde Lima',
    description:
      'Día 1: Islas Ballestas, viñedo, Huacachina y noche en Ica. Día 2: sobrevuelo de 35 min sobre las Líneas de Nazca y retorno a Lima.',
    intro: [
      'Paquete 2 días / 1 noche desde Lima.',
      'Paquete + hotel desde USD 270 por persona (habitación doble, triple o matrimonial).',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Lima – Islas Ballestas – Huacachina – Ica',
        content:
          'Recojo en su hotel de Lima entre 4:30 y 5:00 a.m. Viaje a Paracas.\n\nTour en lancha a las Islas Ballestas: lobos marinos, aves guaneras y formaciones rocosas (el Candelabro).\n\nVisita a un viñedo con almuerzo y degustación de pisco.\n\nPor la tarde, oasis de Huacachina: tubulares y sandboarding en las dunas.\n\nNoche de hotel en Ica.',
      },
      {
        day: 'Día 2',
        title: 'Sobrevuelo Nazca – Retorno Lima',
        content:
          'Desayuno en el hotel. Recojo y traslado al aeródromo.\n\nSobrevuelo de unos 35 minutos sobre las Líneas de Nazca (Patrimonio UNESCO).\n\nAlmuerzo. Retorno a Lima, con llegada alrededor de las 10:00 p.m.',
      },
    ],
    highlights: [
      'Islas Ballestas con fauna marina y formaciones rocosas.',
      'Oasis de Huacachina con tubulares y sandboarding.',
      'Sobrevuelo sobre las misteriosas Líneas de Nazca (Patrimonio UNESCO).',
    ],
    includes: [
      'Recojo de su hotel en Lima (Día 1).',
      'Desayuno y almuerzo (Día 1).',
      'Guía profesional durante el tour.',
      'Transporte turístico.',
      'Entradas turísticas.',
      'Tubulares y sandboarding.',
      'Desayuno en hotel Ica (Día 2).',
      'Guía profesional durante el tour.',
      'Boleto aéreo para sobrevuelo Nazca.',
      'Transporte turístico ida y vuelta (Día 2).',
    ],
    excludes: [
      'Vuelos nacionales o internacionales.',
      'Seguro de viaje.',
      'Alimentación no mencionada en el itinerario.',
      'Servicios no especificados.',
    ],
    recommendations: [
      'Reservar con anticipación en temporada alta (junio–septiembre).',
      'Portar pasaporte o documento original.',
      'Recojo desde Miraflores o San Isidro.',
    ],
    price: '$270.00',
    priceNote:
      'Paquete + hotel desde USD 270 (doble/triple/matrimonial). Habitación individual: USD 290.',
    duration: '2 Días / 1 Noche',
    difficulty: 'Fácil',
    tourType: 'Aventura, Cultural',
    category: 'Explora',
  },
  'lago-titicaca-desde-cusco-full-day': {
    title: 'Lago Titicaca desde Cusco Full Day',
    subtitle: 'Islas flotantes de los Uros y cultura ancestral en Taquile',
    description:
      'Desde Cusco en bus nocturno: islas flotantes de los Uros, Isla Taquile con almuerzo típico y retorno a Cusco. Duración total aprox. 34 horas.',
    intro: [
      'Salidas según disponibilidad.',
      'Salida de Cusco a Puno 22:00 hrs → visita al lago al día siguiente → retorno nocturno a Cusco.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco – Puno (bus nocturno)',
        content:
          'Salida a las 10:00 p.m. desde Cusco en bus turístico hacia Puno.\n\nViaje nocturno por el altiplano. Llegada a Puno alrededor de las 5:00 a.m.\n\nDesayuno en hotel y traslado al puerto para iniciar el tour del lago.',
      },
      {
        day: 'Día 2',
        title: 'Lago Titicaca – Uros – Taquile – Retorno Cusco',
        content:
          'Navegación en lancha rápida a las islas flotantes de los Uros. El guía explica la vida sobre totora.\n\nContinuamos a la Isla Taquile: cultura ancestral, tejidos y almuerzo típico con vista al lago.\n\nFin del tour del lago alrededor de las 5:00 p.m. Tarde libre en Puno.\n\nBus de retorno a las 10:00 p.m. Llegada a Cusco alrededor de las 5:00 a.m.',
      },
    ],
    highlights: [
      'Lago Titicaca, el lago navegable más alto del mundo.',
      'Islas flotantes de los Uros en lancha rápida.',
      'Experiencia cultural en Isla Taquile.',
      'Almuerzo típico con vista al lago.',
      'Transporte completo Cusco–Puno ida y retorno.',
    ],
    includes: [
      'Transporte turístico Cusco–Puno ida y retorno.',
      'Desayuno continental y almuerzo.',
      'Guía profesional.',
      'Entradas.',
      'Lancha rápida.',
      'Guarda equipaje y asistencia en Puno.',
    ],
    excludes: ['Actividades no especificadas en el itinerario.'],
    recommendations: [
      'Llevar abrigo — las noches en bus y Puno son frías.',
      'Pasaporte o documento de identidad.',
    ],
    price: '$90.00',
    duration: '34 Horas',
    difficulty: 'Moderado',
    tourType: 'Cultural, Naturaleza',
    category: 'Explora',
  },
  'machupicchu-laguna-humantay-6d-5n': {
    title: 'Machupicchu / Laguna Humantay 6D / 5N',
    subtitle: 'Machu Picchu y Laguna Humantay en 6 Días de Aventura',
    description:
      'Descubre la grandeza de Machu Picchu y la belleza turquesa de la Laguna Humantay en seis días llenos de paisajes andinos, cultura viva y aventuras únicas.',
    intro: [
      'Machu Picchu · Maras y Moray · Laguna Humantay · Montaña de Colores.',
      'Precio desde USD 419 por persona. Reserva con 30% del total; saldo a la llegada a Cusco.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Llegada a Cusco y City Tour (tarde)',
        content:
          'Recojo en el aeropuerto y traslado al hotel. Tiempo libre para aclimatarse. City Tour por la tarde: Qorikancha, Catedral, Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay.',
      },
      {
        day: 'Día 2',
        title: 'Machu Picchu Full Day',
        content:
          'Salida temprano hacia la estación de tren (Poroy u Ollantaytambo). Tren a Aguas Calientes, bus a Machu Picchu, visita guiada y tiempo libre. Retorno a Cusco en tren.',
      },
      {
        day: 'Día 3',
        title: 'Maras y Moray',
        content:
          'Excursión al poblado de Maras y las Salineras. Continuación al centro arqueológico de Moray, antiguo laboratorio agrícola inca.',
      },
      {
        day: 'Día 4',
        title: 'Laguna Humantay',
        content:
          'Recojo temprano (03:00–03:30). Traslado a Soraypampa. Caminata de 1,5–2 h hasta la Laguna Humantay. Descenso y almuerzo en Mollepata. Retorno a Cusco.',
      },
      {
        day: 'Día 5',
        title: 'Montaña de Colores (Vinicunca)',
        content:
          'Recojo temprano. Traslado al punto de inicio. Trekking hacia la Montaña de Colores (~3 km de subida). Tiempo libre para fotos. Descenso y retorno a Cusco.',
      },
      AIRPORT_DAY(6),
    ],
    highlights: [
      'Machu Picchu con tren, bus y guía incluidos.',
      'Salineras de Maras y terrazas circulares de Moray.',
      'Trek a la Laguna Humantay y Montaña de 7 Colores.',
      'City Tour por los principales sitios incas de Cusco.',
    ],
    includes: [
      'Traslados y transporte turístico.',
      'Entradas a todos los atractivos mencionados.',
      'Guías profesionales en español/inglés.',
      'Desayunos y almuerzos durante las excursiones.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$419.00',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
    priceNote: 'Precio desde USD 419 por persona. Reserva con 30% del total; saldo a la llegada a Cusco.',
  },
  'cusco-inolvidable-4d-3n': {
    title: 'Cusco Inolvidable 4D / 3N',
    subtitle: 'City Tour, Machu Picchu Full Day y Laguna Humantay',
    description:
      'Paquete de 4 días y 3 noches: City Tour, Machu Picchu en un día completo desde Cusco y trek a la Laguna Humantay.',
    intro: [
      'City Tour · Machu Picchu full day · Laguna Humantay.',
      'Ideal para viajeros con poco tiempo que quieren lo esencial del Cusco.',
    ],
    itinerary: [
      CITY_TOUR_DAY,
      {
        day: 'Día 2',
        title: 'Machu Picchu full day / retorno a Cusco',
        content:
          'Recojo 04:00 hrs. Traslado a Ollantaytambo y tren a Aguas Calientes. Bus a Machu Picchu. Visita guiada ~2h30. Almuerzo en Aguas Calientes. Tren y transporte de retorno a Cusco.',
      },
      HUMANTAY_DAY(3),
      AIRPORT_DAY(4),
    ],
    highlights: [
      'City Tour por los principales sitios incas de Cusco.',
      'Machu Picchu en un solo día con tren, bus y guía incluidos.',
      'Laguna Humantay con caminata guiada y comidas incluidas.',
      'Traslados aeropuerto incluidos.',
    ],
    includes: [
      'Recojo y traslado aeropuerto–hotel–aeropuerto.',
      'Transporte turístico Cusco–Ollantaytambo–Cusco.',
      'Tren turístico y bus Machu Picchu (ambos tramos).',
      'Entrada a Machu Picchu y sitios del City Tour.',
      'Guía profesional (español / inglés).',
      'Almuerzo en Aguas Calientes y en Humantay.',
      'Desayuno y almuerzo buffet en Humantay.',
      'Bastones y oxígeno para Humantay.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$359.00',
    priceNote:
      'Paquete + hotel desde USD 359. Sin hotel: apartamento USD 399, 2★ USD 419, 3★ USD 449, 4★ USD 649.',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural, Naturaleza',
    category: 'Paquetes Cusco',
  },
  'cusco-inolvidable-5d-4n': {
    title: 'Cusco Inolvidable 5D / 4N',
    subtitle: 'City Tour, Valle Sagrado, Machu Picchu y Laguna Humantay',
    description:
      'Paquete de 5 días y 4 noches con lo esencial del Cusco: City Tour, Valle Sagrado, Machu Picchu y trek a la Laguna Humantay.',
    intro: [
      'City Tour · Valle Sagrado · Machu Picchu · Laguna Humantay.',
      'Paquete + hotel desde USD 409 por persona.',
    ],
    itinerary: [CITY_TOUR_DAY, VALLE_AGUAS_DAY, MACHU_PICCHU_DAY, HUMANTAY_DAY(4), AIRPORT_DAY(5)],
    highlights: [
      'City Tour por los principales sitios incas de Cusco.',
      'Valle Sagrado: Pisac y Ollantaytambo con almuerzo buffet.',
      'Machu Picchu con tren, bus y visita guiada de 3 horas.',
      'Trek a la Laguna Humantay con desayuno y almuerzo incluidos.',
      'Traslados aeropuerto incluidos.',
    ],
    includes: [
      'Recojo y traslado aeropuerto–hotel–aeropuerto.',
      'Transporte turístico en todas las excursiones.',
      'Guía profesional (español / inglés).',
      'Entradas a City Tour, Valle Sagrado, Machu Picchu y Humantay.',
      'Tren y bus Machu Picchu.',
      'Desayunos y almuerzos según itinerario.',
      'Bastones y oxígeno para Humantay.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$409.00',
    priceNote:
      'Paquete + hotel desde USD 409. Sin hotel: apartamento USD 459, 2★ USD 509, 3★ USD 559, 4★ USD 889.',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
  },
  'valle-sagrado-machu-picchu': {
    title: 'Valle Sagrado / Machu Picchu 2D / 1N',
    subtitle: 'Del Valle Sagrado a la ciudadela inca en dos días',
    description:
      'Tour de 2 días y 1 noche: Valle Sagrado (Pisac, Urubamba, Ollantaytambo), pernocte en Aguas Calientes y visita guiada a Machu Picchu.',
    intro: [
      'Tour de 2 días y 1 noche por Ollantaytambo: Valle Sagrado el día 1 y Machu Picchu el día 2.',
      'Incluye tren turístico, bus a la ciudadela, entradas, guía profesional y almuerzos según itinerario.',
      'Lleve pasaporte original. Reserva con anticipación: los cupos de Machu Picchu son limitados.',
    ],
    detailParagraphs: [
      'El primer día recorre Pisac y Ollantaytambo, almuerza en Urubamba y toma el tren hacia Aguas Calientes. El segundo día sube en bus a Machu Picchu para una visita guiada de unas 3 horas y retorna a Cusco por la tarde.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco / Valle Sagrado / Aguas Calientes',
        content:
          'Desayuno en el hotel. Recojo alrededor de las 7:30 a.m. para iniciar el tour.\n\nVisita a los centros arqueológicos de Pisac y Ollantaytambo, dos sitios clave del Valle Sagrado de los Incas.\n\nAlmuerzo buffet en un restaurante turístico de Urubamba.\n\nPor la tarde, tren turístico desde Ollantaytambo hacia Aguas Calientes.\n\nA su llegada, nuestro personal lo recibe en la estación y lo acompaña al hotel.\n\nNoche de hotel en Aguas Calientes.',
      },
      {
        day: 'Día 2',
        title: 'Machu Picchu / retorno a Cusco',
        content:
          'Después del desayuno en el hotel, nos dirigimos a la estación de buses para subir a la ciudadela de Machu Picchu.\n\nVisita guiada de aproximadamente 3 horas: templos, terrazas, recintos sagrados y tiempo para fotografías.\n\nA la hora indicada descendemos a Aguas Calientes para almorzar en un restaurante turístico.\n\nPor la tarde, tren de retorno a Ollantaytambo. Desde allí, transporte privado lo lleva de regreso a Cusco.',
      },
    ],
    highlights: [
      'Pisac y Ollantaytambo en el Valle Sagrado.',
      'Almuerzo buffet en Urubamba.',
      'Pernocte en Aguas Calientes (Machu Picchu pueblo).',
      'Visita guiada completa a Machu Picchu.',
    ],
    includes: [
      'Recojo del hotel en Cusco.',
      'Transporte al Valle Sagrado.',
      'Entradas a centros arqueológicos del Valle Sagrado y Machu Picchu.',
      'Guía profesional (español / inglés).',
      'Almuerzo buffet en Urubamba y almuerzo en Aguas Calientes.',
      'Tren Ollantaytambo–Aguas Calientes (ida) y retorno.',
      'Bus subida y bajada a Machu Picchu.',
      'Transporte Ollantaytambo–Cusco.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$359.00',
    priceNote: 'Paquete + hotel desde USD 359. Sin hotel: apartamento USD 369, 2★ USD 379.',
    duration: '2 Días / 1 Noche',
    difficulty: 'Moderado',
    tourType: 'Cultural, Histórico',
    category: 'Machupicchu',
  },
  'cusco-valle-sagrado-6d-5n': {
    title: 'Cusco Inolvidable 6D / 5N',
    subtitle: 'Valle Sagrado, Machu Picchu, cuatrimotos Maras/Moray y Montaña de Colores',
    description:
      'Paquete de 6 días y 5 noches: City Tour, Valle Sagrado, Machu Picchu, Maras y Moray en cuatrimotos, y Montaña de Colores.',
    intro: [
      'City Tour · Valle Sagrado · Machu Picchu · Maras/Moray en cuatrimotos · Montaña de Colores.',
      'Paquete + hotel desde USD 449 por persona.',
    ],
    itinerary: [
      CITY_TOUR_DAY,
      VALLE_AGUAS_DAY,
      MACHU_PICCHU_DAY,
      CUATRIMOTOS_MARAS_DAY,
      MONTANA_COLORES_DAY(5),
      AIRPORT_DAY(6),
    ],
    highlights: [
      'Machu Picchu con tren, bus y visita guiada de 3 horas.',
      'Valle Sagrado: Pisac y Ollantaytambo con almuerzo buffet.',
      'Maras y Moray en cuatrimotos por el Valle Sagrado.',
      'Trek a la Montaña de 7 Colores (Vinicunca).',
      'City Tour por los principales sitios incas de Cusco.',
    ],
    includes: [
      'Recojo y traslado aeropuerto–hotel–aeropuerto.',
      'Transporte turístico en todas las excursiones.',
      'Guía profesional (español / inglés).',
      'Entradas a City Tour, Valle Sagrado, Machu Picchu, Maras/Moray y Montaña de Colores.',
      'Tren y bus Machu Picchu.',
      'Cuatrimotos Maras y Moray con briefing de seguridad.',
      'Desayunos y almuerzos según itinerario.',
      'Bastones y oxígeno para Montaña de Colores.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$449.00',
    priceNote:
      'Paquete + hotel desde USD 449. Sin hotel: apartamento USD 519, 2★ USD 549, 3★ USD 609, 4★ USD 939.',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Paquetes Cusco',
  },
  'cusco-laguna-humantay-6d-5n': {
    title: 'Cusco / Valle Sagrado 6D / 5N',
    subtitle: 'Explorando el Valle Sagrado en Cusco 6 Días 5 Noches',
    description:
      'Vive una experiencia única en los Andes con City Tour, Valle Sagrado, Machu Picchu, Montaña de Colores y Laguna Humantay en 6 días.',
    intro: [
      'City Tour · Valle Sagrado · Machu Picchu · Montaña de Colores · Laguna Humantay.',
      'Precio desde USD 420 por persona. Reserva con 30% del total.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Llegada a Cusco y City Tour (tarde)',
        content:
          'Recojo en el aeropuerto y traslado al hotel. Tiempo libre para aclimatarse. City Tour por la tarde: Qorikancha, Catedral, Sacsayhuamán, Qenqo, Puka Pukara y Tambomachay.',
      },
      {
        day: 'Día 2',
        title: 'Valle Sagrado – Aguas Calientes',
        content:
          'Traslado al Valle Sagrado: Pisac y su mercado artesanal. Visita a Ollantaytambo. Traslado a Aguas Calientes para pernoctar.',
      },
      {
        day: 'Día 3',
        title: 'Machu Picchu Full Day',
        content:
          'Traslado temprano a Machu Picchu. Visita guiada con tiempo libre para fotos. Retorno a Cusco y noche en hotel.',
      },
      {
        day: 'Día 4',
        title: 'Montaña de Colores (Vinicunca)',
        content:
          'Recojo temprano (03:00–03:30). Transporte a Soraypampa/Palccoyo. Trekking a la Montaña de Colores (~3 km). Descenso y retorno a Cusco.',
      },
      {
        day: 'Día 5',
        title: 'Laguna Humantay',
        content:
          'Recojo temprano. Transporte a Soraypampa. Trekking a la Laguna Humantay (1,5–2 h). Descenso, almuerzo y retorno a Cusco.',
      },
      AIRPORT_DAY(6),
    ],
    highlights: [
      'Machu Picchu con tren, bus y guía incluidos.',
      'Valle Sagrado: Pisac y Ollantaytambo.',
      'Trek a la Montaña de 7 Colores y Laguna Humantay.',
      'City Tour por los principales sitios incas de Cusco.',
    ],
    includes: [
      'Traslados aeropuerto–hotel–aeropuerto.',
      'Transporte turístico en todas las excursiones.',
      'Entradas a City Tour, Valle Sagrado, Machu Picchu, Montaña de Colores y Humantay.',
      'Tren y bus Machu Picchu.',
      'Guías profesionales en español/inglés.',
      'Desayunos y almuerzos según itinerario.',
      'Bastones y oxígeno para trekkings.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$420.00',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
    priceNote: 'Precio desde USD 420 por persona. Reserva con 30% del total; saldo a la llegada a Cusco.',
  },
  'cusco-inolvidable-7d-6n': {
    title: 'Cusco Inolvidable 7D / 6N',
    subtitle: 'Lo más completo: Machu Picchu, Humantay, Maras/Moray y Montaña de Colores',
    description:
      'Paquete de 7 días y 6 noches con City Tour, Valle Sagrado, Machu Picchu, Laguna Humantay, Maras/Moray y Montaña de Colores.',
    intro: [
      'El paquete más completo de Cusco Inolvidable.',
      'City Tour · Valle Sagrado · Machu Picchu · Humantay · Maras/Moray · Montaña de Colores.',
    ],
    itinerary: [
      CITY_TOUR_DAY,
      VALLE_AGUAS_DAY,
      MACHU_PICCHU_DAY,
      HUMANTAY_DAY(4),
      {
        day: 'Día 5',
        title: 'Salineras de Maras y Moray',
        content:
          'Desayuno en hotel. Recorrido al Valle Sagrado: Moray (terrazas circulares) y Salineras de Maras (+3,000 pozas). Retorno a Cusco ~14:30 hrs.',
      },
      {
        day: 'Día 6',
        title: 'Montaña de Colores',
        content:
          'Recojo 4:30–5:00 a.m. Transporte a Cusipata. Desayuno. Caminata a Vinicunca. Almuerzo buffet en Cusipata. Retorno a Cusco ~18:00 hrs.',
      },
      AIRPORT_DAY(7),
    ],
    highlights: [
      'Machu Picchu con visita guiada de 3 horas.',
      'Laguna Humantay en trek de día completo.',
      'Moray y Salineras de Maras.',
      'Montaña de 7 Colores (Vinicunca).',
      'Valle Sagrado: Pisac, Urubamba y Ollantaytambo.',
    ],
    includes: [
      'Recojo y traslado aeropuerto–hotel–aeropuerto.',
      'Transporte turístico en todas las excursiones.',
      'Guía profesional (español / inglés).',
      'Entradas a todos los sitios del programa.',
      'Tren y bus Machu Picchu.',
      'Desayunos y almuerzos según itinerario.',
      'Bastones y oxígeno para Humantay y Montaña de Colores.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$469.00',
    priceNote:
      'Paquete + hotel desde USD 469. Sin hotel: apartamento USD 549, 2★ USD 589, 3★ USD 649, 4★ USD 999.',
    duration: '7 Días / 6 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Paquetes Cusco',
  },
  'huaynapicchu-machupicchu': {
    title: 'Huaynapicchu / Machu Picchu',
    subtitle: 'Machu Picchu y Waynapicchu: La Cima de tu Aventura Inca',
    description:
      'Vive una experiencia única visitando Machu Picchu y aventúrate a subir el icónico Huayna Picchu con vistas panorámicas espectaculares del santuario inca.',
    intro: [
      'Machu Picchu + Huayna Picchu en un solo día desde Cusco.',
      'Precio USD 330 por persona. Reserva con 30% del total.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Machu Picchu + Huayna Picchu – salida y retorno el mismo día',
        content:
          '03:30–04:00: recojo del hotel en Cusco y traslado a Ollantaytambo (~1h40). 06:10: tren a Aguas Calientes. 08:00: bus a Machu Picchu. 08:30–10:00: visita guiada (Templo del Sol, Plaza Principal, Intihuatana). 10:00–12:30: ascenso a Huayna Picchu (~1–1h30). 12:30: bus de regreso a Aguas Calientes. 13:00: almuerzo incluido. 14:30: tren a Ollantaytambo. 16:00: traslado a Cusco. Llegada ~18:30–19:00.',
      },
    ],
    highlights: [
      'Visita guiada a Machu Picchu con guía bilingüe.',
      'Ascenso a Huayna Picchu con entrada incluida.',
      'Tren, bus y traslados desde Cusco.',
      'Almuerzo en Aguas Calientes.',
    ],
    includes: [
      'Traslado desde el hotel a la estación de tren y regreso.',
      'Tren ida y vuelta a Aguas Calientes.',
      'Bus de subida y bajada a Machu Picchu.',
      'Entrada a Machu Picchu + Huayna Picchu.',
      'Guía profesional en español/inglés.',
      'Almuerzo en Aguas Calientes.',
    ],
    excludes: [
      'Vuelos hacia y desde Cusco.',
      'Seguro de viaje.',
      'Propinas para guías y conductores.',
      'Gastos personales (souvenirs, snacks, bebidas adicionales).',
    ],
    recommendations: [
      'Llegar a Cusco al menos un día antes para aclimatarse (3,300 m.s.n.m.).',
      'Ropa cómoda en capas, zapatos de trekking y poncho impermeable.',
      'Bloqueador solar, gorro, lentes de sol y mínimo 1 litro de agua.',
      'La subida a Huayna Picchu requiere buena condición física.',
      'Portar pasaporte o DNI original para ingresar a Machu Picchu.',
    ],
    price: '$330.00',
    duration: '12 Horas – Full Day',
    difficulty: 'Moderado a exigente',
    tourType: 'Cultural y Natural',
    category: 'Machupicchu',
    priceNote: 'Precio USD 330 por persona. Reserva con 30% del total; saldo antes del tour o a la llegada a Cusco.',
  },
  'picnic-andino-medio-dia': {
    title: 'Picnic Andino',
    subtitle: 'Picnic Andino: Tradición y Naturaleza',
    description:
      'Aventura por el Valle Sagrado: Salineras de Maras, Moray y picnic andino en Mountain View con sabores tradicionales y paisajes únicos.',
    intro: [
      'Chinchero · Maras · Moray · Picnic en Mountain View.',
      'Precio USD 90 por persona en servicio grupal.',
    ],
    itinerary: [
      {
        day: 'Medio día',
        title: 'Valle Sagrado y Picnic Andino',
        content:
          '08:30–09:00: recojo en hotel en Cusco. Traslado al Valle Sagrado. Parada en Chinchero (artesanía y tejido). Salineras de Maras y centro arqueológico de Moray. Mountain View: picnic andino con frutas, quesos y vinos en refugio Tipi. Interacción con llamas y vicuñas. Retorno a Cusco.',
      },
    ],
    includes: [
      'Guía profesional bilingüe (inglés y español).',
      'Transporte turístico durante todo el recorrido.',
      'Recojo en su hotel en Cusco.',
      'Almuerzo tipo picnic incluido.',
      'Asistencia personalizada durante toda la experiencia.',
      'Transporte privado de regreso a Cusco.',
    ],
    excludes: [
      'Boleto turístico Parcial Cusco (S/ 70 soles).',
      'Entrada a las Salineras de Maras (S/ 20 soles).',
      'Alimentación no mencionada.',
    ],
    recommendations: [
      'Ropa cómoda y abrigadora para la altura del Valle Sagrado.',
      'Bloqueador solar, gorro y agua.',
      'Efectivo en soles para entradas parciales.',
    ],
    price: '$90.00',
    duration: 'Medio Día',
    difficulty: 'Bajo / Fácil',
    tourType: 'Naturaleza y experiencia cultural',
    category: 'Explora',
    priceNote: 'Precio grupal USD 90 por persona. Reserva con 30% del total; saldo en Cusco antes del tour.',
  },
  'ausangate-7-lagunas-donhill-1-dia': {
    title: 'Ausangate 7 Lagunas Downhill',
    subtitle: 'Downhill: Adrenalina entre 7 Lagunas',
    description:
      'Vive la emoción del downhill mientras recorres paisajes impresionantes y siete lagunas cristalinas en el nevado Ausangate.',
    intro: [
      'Aventura en bicicleta de montaña por 7 lagunas del Ausangate.',
      'Precio USD 99 por persona.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Ausangate 7 Lagunas en bicicleta',
        content:
          'Recojo en hotel en Cusco. Traslado al punto de inicio cerca del Ausangate. Briefing de seguridad y equipamiento (casco, rodilleras, coderas, guantes). Descenso en bicicleta por rutas de montaña visitando lagunas andinas. Almuerzo típico incluido. Retorno a Cusco al atardecer.',
      },
    ],
    includes: [
      'Transporte privado desde y hacia Cusco.',
      'Guía bilingüe con experiencia en rutas de montaña.',
      'Equipo de seguridad: casco, rodilleras, coderas y guantes.',
      'Alquiler de bicicleta (Santa Cruz Hightower o eléctrica).',
      'Entradas a áreas protegidas del Ausangate.',
      'Almuerzo típico andino.',
      'Botiquín de primeros auxilios y oxígeno.',
    ],
    excludes: ['Propinas.', 'Gastos personales.', 'Seguro de viaje.'],
    recommendations: [
      'Condición física media-alta recomendada.',
      'Ropa deportiva en capas y guantes.',
      'Hidratarse y usar protector solar.',
    ],
    price: '$99.00',
    duration: '1 Día',
    difficulty: 'Medio – Alto',
    tourType: 'Aventura, Naturaleza',
    category: 'Explora',
  },
  'ausangate-7-lagunas-downhill-1-dia': {
    title: 'Ausangate 7 Lagunas Downhill',
    subtitle: 'Downhill: Adrenalina entre 7 Lagunas',
    description:
      'Vive la emoción del downhill mientras recorres paisajes impresionantes y siete lagunas cristalinas en el nevado Ausangate.',
    intro: [
      'Aventura en bicicleta de montaña por 7 lagunas del Ausangate.',
      'Precio USD 99 por persona.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Ausangate 7 Lagunas en bicicleta',
        content:
          'Recojo en hotel en Cusco. Traslado al punto de inicio cerca del Ausangate. Briefing de seguridad y equipamiento (casco, rodilleras, coderas, guantes). Descenso en bicicleta por rutas de montaña visitando lagunas andinas. Almuerzo típico incluido. Retorno a Cusco al atardecer.',
      },
    ],
    includes: [
      'Transporte privado desde y hacia Cusco.',
      'Guía bilingüe con experiencia en rutas de montaña.',
      'Equipo de seguridad: casco, rodilleras, coderas y guantes.',
      'Alquiler de bicicleta (Santa Cruz Hightower o eléctrica).',
      'Entradas a áreas protegidas del Ausangate.',
      'Almuerzo típico andino.',
      'Botiquín de primeros auxilios y oxígeno.',
    ],
    excludes: ['Propinas.', 'Gastos personales.', 'Seguro de viaje.'],
    recommendations: [
      'Condición física media-alta recomendada.',
      'Ropa deportiva en capas y guantes.',
      'Hidratarse y usar protector solar.',
    ],
    price: '$99.00',
    duration: '1 Día',
    difficulty: 'Medio – Alto',
    tourType: 'Aventura, Naturaleza',
    category: 'Explora',
  },
  'tour-maras-moray-downhill-medio-dia': {
    title: 'Tour Maras & Moray Downhill',
    subtitle: 'Aventura en bicicleta por el Valle Sagrado',
    description:
      'Recorre Moray y las Salineras de Maras en bicicleta de montaña con guía profesional y equipamiento de seguridad incluido.',
    intro: [
      'Downhill por Moray y Salineras de Maras desde Cusco.',
      'Medio día de aventura y paisajes andinos.',
    ],
    itinerary: [
      {
        day: 'Medio día',
        title: 'Maras y Moray en bicicleta',
        content:
          'Recojo en hotel en Cusco. Traslado al punto de inicio en el Valle Sagrado. Briefing de seguridad y entrega de equipo. Descenso en bicicleta visitando Moray y las Salineras de Maras. Almuerzo ligero incluido. Retorno a Cusco.',
      },
    ],
    includes: [
      'Transporte privado desde y hacia Cusco.',
      'Guía bilingüe especializado en mountain bike.',
      'Equipo de seguridad completo.',
      'Alquiler de bicicleta de montaña.',
      'Almuerzo ligero.',
    ],
    excludes: [
      'Entrada a Salineras de Maras (S/ 20 soles).',
      'Boleto turístico parcial.',
      'Propinas y gastos personales.',
    ],
    recommendations: [
      'Experiencia previa en bicicleta recomendada.',
      'Ropa cómoda, guantes y protector solar.',
    ],
    price: '$75.00',
    duration: 'Medio Día',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Explora',
  },
  'cusco-retiro-ayahuasca-1-dia': {
    title: 'Cusco Retiro Ayahuasca',
    subtitle: 'Ceremonia de Sanación y Sabiduría Ancestral',
    description:
      'Experimenta una ceremonia de Ayahuasca para renovar energías, sanar y conectar con la sabiduría ancestral de la naturaleza.',
    intro: [
      'Ceremonia guiada por chamán con transporte y consultas individuales.',
      'Precio USD 220 por persona.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Ceremonia de Ayahuasca',
        content:
          'Recojo en hotel en Cusco. Traslado al centro ceremonial en entorno natural. Consulta individual con el chamán. Ceremonia de Ayahuasca con acompañamiento y cuidados de seguridad. Retorno a Cusco al finalizar la experiencia.',
      },
    ],
    includes: [
      'Transporte de ida y vuelta.',
      'Chamán para la ceremonia de Ayahuasca.',
      'Consultas individuales con el chamán.',
    ],
    excludes: ['Alojamiento.', 'Comidas no mencionadas.', 'Seguro de viaje.'],
    recommendations: [
      'Seguir dieta recomendada días antes de la ceremonia.',
      'Consultar con un médico si tiene condiciones de salud.',
      'Llevar ropa cómoda y abrigadora.',
    ],
    price: '$220.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    tourType: 'Espiritual, Cultural',
    category: 'Explora',
  },
  'lago-titicaca-salar-de-uyuni-4-dias': {
    title: 'Lago Titicaca / Salar de Uyuni 4 Días',
    subtitle: 'De Titicaca a Uyuni: Aventura Andina',
    description:
      'Explora la grandeza del Lago Titicaca y la magia del Salar de Uyuni en un viaje de 4 días por el altiplano boliviano.',
    intro: [
      'Puno · La Paz · Uyuni · lagunas altiplánicas.',
      'Precio USD 309 por persona en servicio grupal (mín. 2 personas).',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Puno – La Paz – Uyuni',
        content: 'Salida desde Puno hacia La Paz y traslado a Uyuni, punto de inicio de la aventura en Bolivia.',
      },
      {
        day: 'Día 2',
        title: 'Uyuni – Colchani – Cementerio de Trenes',
        content:
          'Exploración del Salar de Uyuni. Visita a Colchani (artesanías de sal) y al Cementerio de Trenes con locomotoras antiguas.',
      },
      {
        day: 'Día 3',
        title: 'Tomave – Lagunas Altiplánicas',
        content:
          'Recorrido hacia Tomave y lagunas altiplánicas con flamencos, montañas y volcanes.',
      },
      {
        day: 'Día 4',
        title: 'Retorno La Paz – Puno',
        content: 'Viaje de retorno desde Uyuni a La Paz y posteriormente a Puno. Fin de servicios.',
      },
    ],
    includes: [
      'Traslado desde su hotel en Puno.',
      'Bus turístico Puno – La Paz – Uyuni (asientos reclinables 140°).',
      'Hostel en La Paz (day use) para conexión.',
      'Guía profesional en inglés o español.',
      'Transporte 4×4 con portaequipajes.',
      'Alojamiento en habitación doble/matrimonial/triple con baño privado.',
      '2 almuerzos, 1 cena y 1 desayuno.',
      'Entradas a sitios turísticos.',
      'Copa de vino al atardecer en las salinas.',
      'Bus de retorno Uyuni – La Paz – Puno.',
    ],
    excludes: [
      'Comidas no especificadas en el itinerario.',
      'Gastos personales.',
      'Bebidas frías y snacks adicionales.',
      'Nota: llevar efectivo en bolivianos; no se aceptan USD ni tarjeta en ruta.',
    ],
    recommendations: [
      'Ropa abrigadora; noches frías en el altiplano.',
      'Calzado resistente, sombrero, lentes de sol y protector solar.',
      'Botella de agua reutilizable y efectivo en bolivianos.',
      'Moverse despacio para adaptarse a la altura.',
    ],
    price: '$309.00',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura y Naturaleza',
    category: 'Explora',
    priceNote: 'Precio grupal USD 309 por persona. Reserva con 20% del total; saldo en Puno antes del tour.',
  },
  'salar-de-uyuni-5-dias-4-noches-desde-puno': {
    title: 'Salar de Uyuni 5D / 4N desde Puno',
    subtitle: 'Salar de Uyuni: 5 Días y 4 Noches entre Cielos y Espejos',
    description:
      'Aventura de 5 días y 4 noches por el Salar de Uyuni: sal infinita, lagunas multicolores, géiseres, aguas termales y cielos estrellados.',
    intro: [
      'La experiencia más completa del altiplano boliviano desde Puno.',
      'Precio USD 369 por persona en servicio grupal.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Puno – La Paz – Uyuni',
        content: 'Salida temprano desde Puno a La Paz en bus turístico. Conexión hacia Uyuni. Noche en alojamiento local.',
      },
      {
        day: 'Día 2',
        title: 'Uyuni – Colchani – Cementerio de Trenes',
        content:
          'Tour en 4×4 al Cementerio de Trenes y Colchani. Ingreso al Salar de Uyuni con tiempo para fotografías. Pernocte en hotel de sal.',
      },
      {
        day: 'Día 3',
        title: 'Desierto de Chiguana – Lagunas Altiplánicas',
        content:
          'Recorrido por el Desierto de Chiguana y lagunas Cañapa, Hedionda y Honda con flamencos rosados. Noche en refugio de montaña.',
      },
      {
        day: 'Día 4',
        title: 'Géiser Sol de Mañana – Aguas Termales – Uyuni',
        content:
          'Visita a Sol de Mañana (géiseres). Aguas termales de Polques. Paradas en Desierto de Dalí y Laguna Verde. Retorno a Uyuni.',
      },
      {
        day: 'Día 5',
        title: 'Retorno La Paz – Puno',
        content: 'Traslado de Uyuni a La Paz y conexión a Puno. Llegada tarde/noche. Fin de servicios.',
      },
    ],
    includes: [
      'Traslados Puno – La Paz – Uyuni – La Paz – Puno.',
      'Transporte 4×4 durante todo el recorrido.',
      '4 noches de alojamiento (hotel de sal, hospedaje local y refugios).',
      'Alimentación completa: desayunos, almuerzos y cenas.',
      'Entradas a atractivos del itinerario.',
      'Guía profesional en español.',
      'Botiquín de primeros auxilios.',
    ],
    excludes: ['Alimentación no mencionada.', 'Bebidas frías.', 'Gastos personales.'],
    recommendations: [
      'Ropa abrigadora; temperaturas nocturnas bajo 0 °C.',
      'Bloqueador solar, lentes de sol y sombrero.',
      'Efectivo en bolivianos; no se aceptan USD ni tarjeta en ruta.',
      'Adaptarse a la altura descansando bien la primera noche.',
    ],
    price: '$369.00',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura y Naturaleza',
    category: 'Explora',
    priceNote: 'Precio grupal USD 369 por persona. Reserva con 20% del total; saldo en Cusco/Puno antes del tour.',
  },
  'taller-de-cocina-en-lima-1-dia': {
    title: 'Taller de Cocina en Lima – 1 Día',
    subtitle: 'Sabores del Perú en un taller práctico',
    description:
      'Aprende a preparar platos emblemáticos de la cocina peruana con chef local: mercado, ceviche, causa limeña y pisco sour en un taller hands-on en Lima.',
    intro: [
      'Visita al mercado · preparación de ceviche · causa y pisco sour.',
      'Experiencia gastronómica de medio día en Lima.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Taller de cocina peruana',
        content:
          'Recojo en hotel en Miraflores o San Isidro. Visita guiada a mercado local para seleccionar ingredientes frescos. Taller práctico: ceviche, causa limeña y preparación de pisco sour. Degustación de los platos preparados. Retorno al hotel.',
      },
    ],
    includes: [
      'Recojo y traslado desde hotel en Lima.',
      'Chef instructor bilingüe.',
      'Ingredientes y utensilios para el taller.',
      'Degustación de platos preparados.',
      'Recetario digital de los platos del taller.',
    ],
    excludes: ['Bebidas adicionales.', 'Propinas.', 'Traslados fuera de zonas céntricas de Lima.'],
    recommendations: [
      'Informar alergias alimentarias con anticipación.',
      'Ropa cómoda para cocinar.',
      'Llevar cámara para la experiencia en el mercado.',
    ],
    price: '$85.00',
    duration: '1 Día',
    difficulty: 'Fácil',
    tourType: 'Gastronómico, Cultural',
    category: 'Explora',
  },
  'camino-inca-machupicchu-2d-1n': {
    title: 'Camino Inca / Machu Picchu 2D / 1N',
    subtitle: 'Camino Inca: La Ruta hacia Machu Picchu',
    description:
      'Embárcate en la travesía más emblemática del Perú con el Camino Inca hacia Machu Picchu. Una experiencia única que combina naturaleza, historia y misticismo.',
    intro: [
      'Vive la aventura de recorrer el legendario Camino Inca hasta la majestuosa ciudadela de Machu Picchu en 2 días y 1 noche.',
      'Caminata por senderos incas, bosques nublados y ruinas arqueológicas con llegada por la Puerta del Sol (Inti Punku).',
    ],
    detailParagraphs: [
      'Este tour de 2 días y 1 noche combina historia, naturaleza y cultura, permitiéndote caminar por paisajes impresionantes de montañas, bosques nubosos y ruinas arqueológicas.',
      'Durante la caminata disfrutarás de vistas panorámicas del Valle Sagrado, pasos incas bien conservados y la experiencia única de llegar a Machu Picchu a través de Inti Punku.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco – Km 104 – Camino Inca – Aguas Calientes',
        content:
          'Recojo temprano en su hotel en Cusco. Traslado al Km 104, inicio oficial del Camino Inca corto.\n\nTrekking por senderos incas, bosques nubosos y sitios como Wiñay Wayna. Almuerzo tipo picnic en ruta.\n\nLlegada a Inti Punku (Puerta del Sol) y primer acceso a Machu Picchu.\n\nDescenso a Aguas Calientes. Noche de hotel.',
      },
      {
        day: 'Día 2',
        title: 'Machu Picchu Full Day – Regreso a Cusco',
        content:
          'Desayuno en Aguas Calientes. Subida a la ciudadela.\n\nVisita guiada por templos, plazas y terrazas. Tiempo libre para fotos.\n\nTren de retorno y traslado a su hotel en Cusco. Fin del tour.',
      },
    ],
    includes: [
      'Traslado desde tu hotel en Cusco hasta el Km 104 (inicio del Camino Inca).',
      'Entrada oficial al Camino Inca y Machu Picchu.',
      'Guía profesional en español/inglés durante todo el trekking y visita a Machu Picchu.',
      'Transporte en tren ida y vuelta de Aguas Calientes a Cusco.',
      'Alojamiento en Aguas Calientes (1 noche).',
      'Alimentación: desayuno, almuerzo tipo picnic durante el trekking y cena (según operador).',
      'Botiquín de primeros auxilios durante el recorrido.',
    ],
    excludes: [
      'Vuelos hacia y desde Cusco.',
      'Seguro de viaje o asistencia médica.',
      'Gastos personales (souvenirs, snacks, bebidas adicionales).',
      'Propinas para guías y porteadores.',
    ],
    recommendations: [
      'Llegar a Cusco al menos 2 días antes del trekking para adaptarse a la altura.',
      'Ropa cómoda en capas, zapatos de trekking y protector solar.',
      'Caminata moderada a exigente: buena condición física requerida.',
      'Llevar agua (mínimo 1 litro) y snacks energéticos.',
    ],
    price: '$480.00',
    priceNote:
      'Precio total: USD 480 por persona. Reserva con 20% del valor total. Saldo restante antes del inicio del tour o a la llegada a Cusco.',
    duration: '2 Días / 1 Noche',
    difficulty: 'Moderado a exigente',
    tourType: 'Senderismo (trekking)',
    category: 'Camino Inca',
  },
  'camino-inca-4d-3n': {
    title: 'Camino Inca 4D / 3N',
    subtitle: 'Camino Inca 4 días 3 noches descubriendo historia y naturaleza',
    description:
      'Una caminata inolvidable por senderos ancestrales que combinan paisajes impresionantes, sitios arqueológicos y la magia de llegar a Machu Picchu tal como lo hicieron los incas.',
    intro: [
      'Vive cuatro días de aventura rodeado de montañas, valles y bosques nublados.',
      'Cruza el Abra Warmiwañusca, explora Wiñay Wayna e Inti Punku antes de llegar a la ciudadela sagrada.',
    ],
    detailParagraphs: [
      'Embárcate en una aventura única de 4 días y 3 noches recorriendo el legendario Camino Inca hasta Machu Picchu.',
      'Caminarás entre paisajes espectaculares, cruzarás ríos, escalarás pasos altos y descubrirás sitios arqueológicos como Wiñay Wayna e Inti Punku.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco – Km 82 – Campamento 1',
        content:
          'Recojo temprano en tu hotel. Traslado a Km 82, inicio del Camino Inca. Trekking por senderos incas y Valle Sagrado. Visita a ruinas arqueológicas. Almuerzo picnic. Llegada al Campamento 1: carpas y cena.',
      },
      {
        day: 'Día 2',
        title: 'Campamento 1 – Abra Warmiwañusca – Campamento 2',
        content:
          'Desayuno temprano. Trekking hacia el Abra Warmiwañusca (Paso de la Mujer Muerta), punto más alto del recorrido. Descenso por bosques nubosos. Almuerzo picnic. Llegada al Campamento 2.',
      },
      {
        day: 'Día 3',
        title: 'Campamento 2 – Wiñay Wayna – Aguas Calientes',
        content:
          'Desayuno en campamento. Trekking hasta Wiñay Wayna. Continuación hasta Inti Punku con vistas de Machu Picchu. Descenso a Machu Picchu. Tren a Aguas Calientes y pernocte.',
      },
      {
        day: 'Día 4',
        title: 'Machu Picchu – Cusco',
        content:
          'Desayuno en Aguas Calientes. Visita guiada por Machu Picchu. Tiempo libre para explorar y fotografiar. Tren de regreso a Cusco. Traslado al hotel. Fin del tour.',
      },
    ],
    includes: [
      'Traslado desde tu hotel en Cusco hasta el punto de inicio del Camino Inca.',
      'Entrada oficial al Camino Inca y Machu Picchu.',
      'Guía profesional en español/inglés durante todo el trekking y visita a Machu Picchu.',
      'Alojamiento en campamentos (3 noches) con carpas y colchones.',
      'Alimentación: desayunos, almuerzos tipo picnic y cenas durante el trekking.',
      'Transporte en tren de Aguas Calientes a Cusco.',
      'Botiquín de primeros auxilios y porteadores para equipaje (hasta 7 kg).',
    ],
    excludes: [
      'Vuelos hacia y desde Cusco.',
      'Seguro de viaje o asistencia médica.',
      'Huayna Picchu o Montaña Machu Picchu (costo extra, reserva anticipada).',
      'Propinas para guías y porteadores.',
      'Equipo personal adicional (bastones, botas especiales).',
    ],
    recommendations: [
      'Llegar a Cusco 2–3 días antes para aclimatarse a la altura.',
      'Caminata exigente con ascensos y descensos pronunciados.',
      'Ropa en capas, calzado de trekking y impermeable obligatorios.',
    ],
    price: '$699.00',
    priceNote:
      'Precio total: USD 699 por persona. Reserva con 20% del valor total. Saldo restante antes del inicio del tour o a la llegada a Cusco.',
    duration: '4 Días / 3 Noches',
    difficulty: 'Exigente',
    tourType: 'Cultural y Natural',
    category: 'Camino Inca',
  },
  'salkantay-trek-machupicchu-5d-4n': {
    title: 'Salkantay Trek / Machu Picchu 5D / 4N',
    subtitle: 'Salkantay 5 días 4 noches: Aventura Andina hacia Machu Picchu',
    description:
      'Embárcate en la espectacular travesía del Salkantay, recorriendo montañas, glaciares y valles impresionantes hasta llegar a la majestuosa Machu Picchu.',
    intro: [
      'Cinco días de aventura, naturaleza y cultura por Mollepata, Laguna Humantay, el Abra Salkantay y la ceja de selva.',
      'Una experiencia única que combina paisajes impresionantes, historia y emociones inolvidables.',
    ],
    detailParagraphs: [
      'Conocerás pueblos tradicionales como Mollepata y Challacancha, visitarás la Laguna Humantay y cruzarás el imponente Abra Salkantay (4,650 m.s.n.m.).',
      'La travesía desciende por Collpapampa y Hidroeléctrica hasta Aguas Calientes, culminando con la visita guiada a Machu Picchu.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco – Mollepata – Soraypampa – Laguna Humantay',
        content:
          'Salida desde Cusco hacia Mollepata y Challacancha. Ascenso a Soraypampa e instalación del campamento. Por la tarde, excursión a la impresionante Laguna Humantay con vistas al nevado Salkantay.',
      },
      {
        day: 'Día 2',
        title: 'Soraypampa – Abra Salkantay – Chaullay',
        content:
          'El tramo más desafiante: cruce del Abra Salkantay (4,650 m.s.n.m.). Descenso hacia Huayracmachay y Chaullay. Pernocte en campamento rodeado de naturaleza.',
      },
      {
        day: 'Día 3',
        title: 'Chaullay – Collpapampa – La Playa – Hidroeléctrica – Aguas Calientes',
        content:
          'Descenso por el valle verde de Collpapampa hacia La Playa y Hidroeléctrica. Caminata final hasta Aguas Calientes. Pernocte en hotel con baño, wifi y desayuno.',
      },
      {
        day: 'Día 4',
        title: 'Aguas Calientes – Machu Picchu – Cusco',
        content:
          'Muy temprano, ascenso a Machu Picchu. Visita guiada y tiempo libre para fotos.\n\nTren a Ollantaytambo y transporte a Cusco. Noche en Cusco.',
      },
      {
        day: 'Día 5',
        title: 'Cusco / fin de servicios',
        content:
          'Día libre o traslado al aeropuerto según su vuelo. Fin de servicios.',
      },
    ],
    includes: [
      'Briefing previo, recojo desde tu hotel y retorno al finalizar.',
      'Guía profesional bilingüe durante toda la experiencia.',
      'Entrada a Machu Picchu y tickets de bus Aguas Calientes–Machu Picchu.',
      'Tren Expedición de regreso desde Aguas Calientes a Ollantaytambo.',
      'Alojamiento en carpas (noches 1–2) y hotel en Aguas Calientes (noche 3).',
      'Equipo logístico, chef, alimentación completa y agua hervida.',
      'Bolsas de viaje para pertenencias (hasta 7 kg transportadas por mulas).',
    ],
    excludes: [
      'Sleeping bag (alquiler: $20).',
      'Bastones de trekking (alquiler: $20).',
      'Entrada Laguna Humantay (S/ 20) y Huayna Picchu.',
      'Desayuno del día 1 y comidas del último día en Aguas Calientes.',
      'Tren opcional Hidroeléctrica–Aguas Calientes ($39).',
      'Seguro de viaje.',
    ],
    recommendations: [
      'Llevar pasaporte o DNI vigente (obligatorio para Machu Picchu).',
      'Ropa abrigadora, impermeable y calzado de trekking ya usado.',
      'Dinero en efectivo (soles) para entradas y extras.',
    ],
    price: '$330.00',
    priceNote:
      'Tarifa servicio compartido: USD 330 por persona. Reserva con 20% de adelanto. Saldo del 80% al llegar a Cusco (efectivo, tarjeta o PayPal).',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado a exigente',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Camino Inca',
  },
  'inca-jungle-trek-machupicchu-4d-3n': {
    title: 'Inca Jungle Trek / Machu Picchu 4D / 3N',
    subtitle: 'Aventura total: bici, rafting, selva y Machu Picchu',
    description:
      'La alternativa más dinámica al Camino Inca clásico: combina ciclismo de montaña, rafting, caminata por la selva, tirolesa opcional y visita a Machu Picchu en 4 días.',
    intro: [
      'Descenso en bicicleta desde Abra Málaga, rafting en el río Urubamba, caminata por plantaciones de café y cacao, y llegada a la ciudadela inca.',
      'Ideal para viajeros activos que buscan variedad de actividades más que un trekking tradicional.',
    ],
    detailParagraphs: [
      'El Inca Jungle Trek recorre microclimas únicos: desde los Andes altos hasta la ceja de selva y el río Urubamba, con paradas culturales y baños termales en Santa Teresa.',
      'No requiere permiso del Camino Inca clásico y combina aventura, naturaleza y la visita guiada a Machu Picchu.',
    ],
    itinerary: [
      {
        day: 'Día 1',
        title: 'Cusco – Abra Málaga – Santa María (Bici y rafting)',
        content:
          'Salida temprano de Cusco hacia Abra Málaga (4,300 m.s.n.m.). Emocionante descenso en bicicleta de montaña hacia Santa María. Por la tarde, rafting opcional en el río Urubamba. Pernocte en Santa María.',
      },
      {
        day: 'Día 2',
        title: 'Santa María – Cocalmayo – Santa Teresa (Trekking)',
        content:
          'Caminata por senderos de selva, plantaciones de café y cacao. Visita a comunidades locales. Tarde libre en los baños termales de Cocalmayo. Pernocte en Santa Teresa.',
      },
      {
        day: 'Día 3',
        title: 'Santa Teresa – Hidroeléctrica – Aguas Calientes',
        content:
          'Tirolesa opcional por la mañana. Caminata junto a la vía del tren desde Hidroeléctrica hasta Aguas Calientes, con vistas al río y la montaña. Pernocte en Aguas Calientes.',
      },
      {
        day: 'Día 4',
        title: 'Machu Picchu – Cusco',
        content:
          'Madrugada: bus a Machu Picchu. Visita guiada de ~2 horas por la ciudadela. Tiempo libre para explorar. Tren y bus de regreso a Cusco. Fin del tour.',
      },
    ],
    includes: [
      'Traslados Cusco–Abra Málaga y retorno desde Aguas Calientes.',
      'Bicicleta de montaña, equipo de rafting y guía profesional bilingüe.',
      'Entrada a Machu Picchu y bus Aguas Calientes–Machu Picchu.',
      'Alojamiento 3 noches (hostal en ruta y hotel en Aguas Calientes).',
      'Alimentación según itinerario (desayunos, almuerzos y cenas).',
      'Tren turístico Aguas Calientes–Ollantaytambo y transporte a Cusco.',
    ],
    excludes: [
      'Tirolesa y rafting opcionales si no están incluidos en la tarifa base.',
      'Entrada a baños termales Cocalmayo.',
      'Huayna Picchu o Montaña Machu Picchu (costo extra).',
      'Seguro de viaje y propinas.',
    ],
    recommendations: [
      'Buena condición física y experiencia previa en bicicleta recomendada.',
      'Ropa ligera para selva e impermeable para lluvia.',
      'Protector solar, repelente de insectos y documento de identidad.',
    ],
    price: '$350.00',
    priceNote: 'Consultar disponibilidad de actividades opcionales (rafting, tirolesa). Reserva con adelanto del 20%.',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural, Natural',
    category: 'Camino Inca',
  },
  'cusco-montana-de-colores-4d-3n': {
    title: 'Cusco / Montaña de colores 4D / 3N',
    subtitle: 'City Tour, Machu Picchu y Montaña de Colores en 4 días',
    description:
      'Paquete de 4 días y 3 noches: City Tour, Machu Picchu en un día desde Cusco y trek a la Montaña de Colores (Vinicunca).',
    intro: [
      'City Tour · Machu Picchu full day · Montaña de Colores.',
      'Ideal si tiene poco tiempo y quiere la ciudadela y Vinicunca.',
    ],
    detailParagraphs: [
      'Día 1 en Cusco para aclimatarse y el City Tour. Día 2 a Machu Picchu por Ollantaytambo. Día 3 caminata a Vinicunca. Día 4 traslado al aeropuerto.',
    ],
    itinerary: [
      CITY_TOUR_DAY,
      {
        day: 'Día 2',
        title: 'Machu Picchu full day / retorno a Cusco',
        content:
          'Recojo a las 4:00 a.m. Traslado a la estación de Ollantaytambo y tren a Aguas Calientes.\n\nBus a Machu Picchu. Visita guiada de unas 2 h 30: templos, terrazas y miradores.\n\nAlmuerzo en Aguas Calientes. Tren y transporte de retorno a Cusco.',
      },
      MONTANA_COLORES_DAY(3),
      AIRPORT_DAY(4),
    ],
    highlights: [
      'City Tour por los principales sitios incas de Cusco.',
      'Machu Picchu con tren, bus y guía incluidos.',
      'Caminata a la Montaña de 7 Colores (Vinicunca).',
      'Traslados aeropuerto incluidos.',
    ],
    includes: [
      'Recojo y traslado aeropuerto–hotel–aeropuerto.',
      'Transporte turístico Cusco–Ollantaytambo–Cusco.',
      'Tren turístico y bus Machu Picchu (ambos tramos).',
      'Entrada a Machu Picchu y sitios del City Tour.',
      'Guía profesional (español / inglés).',
      'Desayuno y almuerzo buffet en Montaña de Colores.',
      'Bastones y oxígeno para Vinicunca.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$350.00',
    priceNote: 'Servicio compartido: USD 350 por persona. Reserva con 30% del total; saldo en Cusco.',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Paquetes Cusco',
  },
  'maras-moray-valle-sagrado-5d-4n': {
    title: 'Maras Moray / Valle Sagrado 5D / 4N',
    subtitle: 'Valle Sagrado, Maras, Moray, Machu Picchu y Montaña de Colores',
    description:
      'Paquete de 5 días y 4 noches: City Tour, Valle Sagrado con Maras y Moray, Machu Picchu y Montaña de Colores.',
    intro: [
      'City Tour · Valle Sagrado, Maras y Moray · Machu Picchu · Montaña de Colores.',
      'Precio desde USD 390 por persona. Reserva con 30% del total.',
    ],
    detailParagraphs: [
      'Combina el Valle Sagrado y las salineras con una noche en Aguas Calientes, la visita a Machu Picchu y el trek a Vinicunca.',
    ],
    itinerary: [
      CITY_TOUR_DAY,
      {
        day: 'Día 2',
        title: 'Valle Sagrado, Maras y Moray / Aguas Calientes',
        content:
          'Recojo temprano hacia el Valle Sagrado.\n\nPisac y su mercado artesanal. Luego Maras (salineras) y Moray (andenes circulares).\n\nPor la tarde, tren desde Ollantaytambo a Aguas Calientes.\n\nNoche de hotel en Aguas Calientes.',
      },
      MACHU_PICCHU_DAY,
      MONTANA_COLORES_DAY(4),
      AIRPORT_DAY(5),
    ],
    highlights: [
      'Valle Sagrado, Salineras de Maras y Moray.',
      'Machu Picchu con tren, bus y visita guiada.',
      'Montaña de Colores (Vinicunca).',
      'City Tour en Cusco.',
    ],
    includes: [
      'Traslados aeropuerto–hotel–aeropuerto.',
      'Transporte turístico en las excursiones.',
      'Tren y bus Machu Picchu.',
      'Guía profesional (español / inglés).',
      'Desayunos y almuerzos según itinerario.',
    ],
    excludes: PACKAGE_EXCLUDES,
    recommendations: PACKAGE_RECOMMENDATIONS,
    price: '$390.00',
    priceNote: 'Desde USD 390 por persona. Reserva con 30% del total; saldo en Cusco.',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado',
    tourType: 'Naturaleza, Aventura',
    category: 'Paquetes Cusco',
  },
};

/** Tours nuevos que no existen en tours-scraped.json */
export const PDF_CUSTOM_TOUR_SLUGS = [
  'pallay-punchu-full-day',
  'city-tour-lima-full-day',
  'islas-ballestas-nazca-2d-1n',
  'lago-titicaca-desde-cusco-full-day',
  'valle-sagrado-con-maras-y-moray-full-day',
  'cusco-inolvidable-4d-3n',
  'cusco-inolvidable-5d-4n',
  'cusco-inolvidable-7d-6n',
] as const;

export function buildCustomTourFromPdf(slug: string): TourPage | null {
  const pdf = PDF_TOUR_CONTENT[slug];
  if (!pdf) return null;
  const mapped = getTourHero(slug);
  const hero = mapped?.hero || pdf.heroImage || '/images/portada.jpg';
  const images = mapped?.gallery?.length ? mapped.gallery : pdf.images?.length ? pdf.images : [hero];
  return {
    slug,
    title: pdf.title || slug,
    subtitle: pdf.subtitle || null,
    description: pdf.description || '',
    intro: pdf.intro || [],
    detailParagraphs: pdf.detailParagraphs || [],
    highlights: pdf.highlights || [],
    tourType: pdf.tourType || 'Aventura, Cultural',
    difficulty: pdf.difficulty || 'Moderado',
    duration: pdf.duration || '1 Día',
    price: pdf.price || null,
    priceNote: pdf.priceNote || null,
    itinerary: pdf.itinerary || [],
    includes: pdf.includes || [],
    excludes: pdf.excludes || [],
    recommendations: pdf.recommendations || [],
    images,
    heroImage: hero,
    category: pdf.category || 'Explora',
  };
}

export function applyPdfContent(tour: TourPage): TourPage {
  const pdf = PDF_TOUR_CONTENT[tour.slug];
  if (!pdf) return tour;

  const mapped = getTourHero(tour.slug);
  const hero = mapped?.hero || pdf.heroImage || tour.heroImage;
  const gallery = mapped?.gallery?.length
    ? mapped.gallery
    : pdf.images?.length
      ? Array.from(new Set([hero, ...pdf.images]))
      : tour.images;

  return {
    ...tour,
    ...pdf,
    title: pdf.title || tour.title,
    subtitle: pdf.subtitle ?? tour.subtitle,
    description: pdf.description || tour.description,
    intro: pdf.intro?.length ? pdf.intro : tour.intro,
    detailParagraphs: pdf.detailParagraphs?.length ? pdf.detailParagraphs : [],
    highlights: pdf.highlights?.length ? pdf.highlights : tour.highlights,
    includes: pdf.includes?.length ? pdf.includes : tour.includes,
    excludes: pdf.excludes?.length ? pdf.excludes : tour.excludes,
    recommendations: pdf.recommendations?.length ? pdf.recommendations : tour.recommendations,
    itinerary: pdf.itinerary?.length ? pdf.itinerary : tour.itinerary,
    price: pdf.price !== undefined ? pdf.price : tour.price,
    priceNote: pdf.price ? (pdf.priceNote ?? null) : (pdf.priceNote ?? tour.priceNote),
    heroImage: hero,
    images: gallery,
    category: pdf.category || tour.category,
    difficulty: pdf.difficulty || tour.difficulty,
    duration: pdf.duration || tour.duration,
    tourType: pdf.tourType || tour.tourType,
  };
}
