export type Testimonial = {
  name: string;
  from: { es: string; en: string };
  tour: { es: string; en: string };
  quote: { es: string; en: string };
};

/** Comentarios de viajeros — texto claro, sin capturas falsas de TripAdvisor */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Lucía M.',
    from: { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina' },
    tour: { es: 'Laguna Humantay', en: 'Humantay Lagoon' },
    quote: {
      es: 'La laguna es otro mundo. El guía nos cuidó en la subida, el desayuno en Mollepata estuvo rico y llegamos a tiempo a todo. Vale cada paso.',
      en: 'The lagoon is another world. The guide looked after us on the climb, breakfast in Mollepata was great and everything ran on time. Worth every step.',
    },
  },
  {
    name: 'Diego S.',
    from: { es: 'Ciudad de México', en: 'Mexico City' },
    tour: { es: 'Machu Picchu 2 días', en: 'Machu Picchu 2 days' },
    quote: {
      es: 'Todo puntual: tren, bus y la visita. Dormir en Aguas Calientes y entrar a Machu Picchu al día siguiente fue lo mejor del viaje.',
      en: 'Everything on time: train, bus and the visit. Sleeping in Aguas Calientes and going into Machu Picchu the next day was the best part of the trip.',
    },
  },
  {
    name: 'Carla V.',
    from: { es: 'Madrid, España', en: 'Madrid, Spain' },
    tour: { es: 'Montaña Palcoyo', en: 'Palcoyo Mountain' },
    quote: {
      es: 'Queríamos colores sin una caminata tan dura. Palcoyo nos encantó: tres montañas, buenas fotos y el grupo pequeño se sintió familiar.',
      en: 'We wanted the colors without a hard hike. Palcoyo was perfect: three mountains, great photos and a small group that felt friendly.',
    },
  },
  {
    name: 'Mateo L.',
    from: { es: 'Santiago, Chile', en: 'Santiago, Chile' },
    tour: { es: 'Valle Sagrado', en: 'Sacred Valley' },
    quote: {
      es: 'Pisac, Ollantaytambo y el almuerzo en Urubamba. El guía explicaba claro, sin apurarnos. Se nota que conocen el valle de verdad.',
      en: 'Pisac, Ollantaytambo and lunch in Urubamba. The guide explained clearly, without rushing us. You can tell they really know the valley.',
    },
  },
  {
    name: 'Sofía P.',
    from: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
    tour: { es: 'City Tour Cusco', en: 'Cusco City Tour' },
    quote: {
      es: 'En una tarde entendimos Cusco: Qorikancha, Sacsayhuamán y el resto. Recojo en el hotel y todo organizado. Así da gusto viajar.',
      en: 'In one afternoon we understood Cusco: Qorikancha, Sacsayhuamán and the rest. Hotel pick-up and everything organized. That’s how travel should feel.',
    },
  },
  {
    name: 'Andrés G.',
    from: { es: 'Lima, Perú', en: 'Lima, Peru' },
    tour: { es: 'Montaña de Colores', en: 'Rainbow Mountain' },
    quote: {
      es: 'Salimos de madrugada, desayunamos en Cusipata y la vista en el mirador compensó el frío. Bastones y oxígeno incluidos, eso ayuda mucho.',
      en: 'We left before dawn, had breakfast in Cusipata and the viewpoint made up for the cold. Poles and oxygen included — that helps a lot.',
    },
  },
];
