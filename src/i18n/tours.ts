import type { TourPage } from '@/data/tours';
import type { Locale } from './types';
import { en } from './en';
import { translateText, translateLines } from './translate-text';

/** English overrides for tour pages (by slug) */
export const TOUR_EN: Record<
  string,
  Partial<
    Pick<
      TourPage,
      | 'title'
      | 'subtitle'
      | 'description'
      | 'category'
      | 'duration'
      | 'difficulty'
      | 'tourType'
      | 'includes'
      | 'excludes'
      | 'recommendations'
      | 'intro'
      | 'highlights'
      | 'priceNote'
      | 'detailParagraphs'
      | 'itinerary'
    >
  >
> = {
  'lago-titicaca-salar-de-uyuni-4-dias': {
    title: 'Lake Titicaca / Uyuni Salt Flat 4 Days',
    subtitle: 'From Titicaca to Uyuni: Andean Adventure',
    description:
      'Explore the grandeur of Lake Titicaca and the surreal Uyuni Salt Flat on a 4-day journey through the high Andes.',
    category: 'EXPLORE',
    duration: '4 Days / 3 Nights',
    difficulty: 'Moderate',
    tourType: 'Adventure, Cultural, Nature',
  },
  'tour-machu-picchu-full-day': {
    title: 'Machu Picchu Full Day',
    subtitle: 'Explore one of the most impressive jewels on the planet',
    description:
      'Full day from Cusco with tourist train, bus to the citadel, professional guide, Machu Picchu entrance and lunch in Aguas Calientes.',
    category: 'MACHU PICCHU',
  },
  'laguna-humantay-full-day': {
    title: 'Humantay Lagoon Full Day',
    subtitle: 'Discover the magic of Humantay Lagoon, a paradise among the mountains',
    category: 'CUSCO IN A DAY',
    description:
      'Full day from Cusco to Humantay Lagoon: hotel pick-up, buffet breakfast and lunch in Mollepata, guided hike with Salkantay views, poles and oxygen. A moderate trek among mountains and turquoise water.',
    intro: [
      'Hours: 4:00 a.m. – 6:00 p.m. Daily departures, year-round.',
      'Pick-up is at 4:30 a.m. from your Cusco hotel. We travel to Mollepata for breakfast, then to Soraypampa (3,900 m a.s.l.), where the 90-minute hike to the lagoon begins.',
      'At the viewpoint there is time for photos and rest. We descend to Mollepata for the buffet lunch and return to Cusco around 6:00 p.m.',
    ],
    includes: [
      'Pick-up from your hotel in Cusco.',
      'Round-trip tourist transport.',
      'Buffet breakfast and lunch in Mollepata.',
      'Professional guide (Spanish / English).',
      'Trekking poles and oxygen.',
    ],
    excludes: ['Soraypampa / Humantay entrance (approx. 20 soles).', 'Optional horse rental.'],
    recommendations: [
      'Warm layered clothing, hat, gloves and rain poncho.',
      'Trekking shoes and water bottle.',
      'Altitude sickness pills if sensitive to elevation.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Mollepata – Humantay Lagoon – Cusco',
        content:
          '4:30 a.m. — Hotel pick-up in Cusco. Drive to Mollepata for a buffet breakfast included.\n\nWe continue to Soraypampa (3,900 m a.s.l.), the start of the hike.\n\nAbout 1 hour 30 minutes up to Humantay Lagoon, with Andean landscapes and views of Salkantay. The guide shares the natural and spiritual meaning of this sacred lagoon.\n\nFree time at the lagoon for photos, rest and the turquoise water.\n\nReturn to Soraypampa. Buffet lunch in Mollepata.\n\nArrival in Cusco around 6:00 p.m.',
      },
    ],
    detailParagraphs: [
      'Moderate level. Acclimatize 1–2 days in Cusco. Soraypampa / Humantay entrance (approx. 20 soles) is paid on site. Horse rental is optional.',
    ],
  },
  'montana-de-colores-full-day': {
    title: 'Rainbow Mountain Full Day',
    subtitle: 'An Andean challenge with a view worth every step',
    category: 'CUSCO IN A DAY',
    description:
      'Ascend Rainbow Mountain (Vinicunca) from Cusco with buffet breakfast and lunch, bilingual guide and unforgettable high-Andean landscapes.',
    intro: [
      'Hours: 4:00 a.m. – 5:00 p.m. Daily departures, year-round. Moderate level.',
      'Pick-up at 4:00 a.m. from your Cusco hotel. Breakfast in Cusipata, hike from Phulawasipata (4,626 m) to the Vinicunca viewpoint (over 5,000 m) and buffet lunch on the way back.',
      'The climb takes about 90 minutes. Acclimatize 1–2 days in Cusco. Entrance (25 soles) is paid on site.',
    ],
    detailParagraphs: [
      'Vinicunca is one of the most photographed formations in the Andes. Along the way you see llamas, alpacas and Ausangate, the highest mountain in Cusco.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Rainbow Mountain – Cusco',
        content:
          '4:00 a.m. — Hotel pick-up in Cusco. Drive to Cusipata for breakfast included.\n\nWe continue through high-Andean landscape to Phulawasipata (4,626 m a.s.l.), the start of the hike to Rainbow Mountain (Vinicunca).\n\nAlong the way: llamas, alpacas and peaks such as Ausangate. After about 1 hour 30 minutes we reach the main viewpoint, with red, gold and turquoise tones.\n\nFree time for photos, rest and the view.\n\nReturn the same way. Buffet lunch in Cusipata.\n\nArrival in Cusco around 6:00 p.m.',
      },
    ],
  },
  'maras-y-moray-con-picnic-andino-full-day': {
    title: 'Maras & Moray + Andean Picnic Full Day',
    subtitle: 'Inca history, unique landscapes and an outdoor Andean picnic',
    category: 'CUSCO IN A DAY',
    description:
      'Visit Chinchero, Maras Salt Mines, Moray and enjoy an Andean picnic at Mountain View with llamas, vicuñas and Sacred Valley views.',
    intro: [
      'Hours: 8:00 a.m. – 6:00 p.m. Pick-up between 8:30 and 9:00 a.m. Duration: 8 hours. Moderate level.',
      'Chinchero, Maras Salt Mines and Moray, plus an Andean picnic at Mountain View (Tipi) with fruit, cheeses, wines, llamas and vicuñas.',
      'Tickets (tourist ticket and Maras Salt Mines) are paid on site. Bring cash in soles.',
    ],
    detailParagraphs: [
      'The picnic is served in a Tipi overlooking the Sacred Valley. A more relaxed day than high-mountain treks, with time for photos and to learn about salt extraction and Moray’s terraces.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Chinchero – Maras – Moray – Mountain View – Cusco',
        content:
          '8:30–9:00 a.m. — Hotel pick-up in Cusco. Drive to Chinchero: artisan community and traditional llama-wool process.\n\nVisit the Maras Salt Mines. The guide explains salt extraction. Free time for photos.\n\nContinue to Moray, the ancient Inca agricultural laboratory.\n\nIn the afternoon, Andean picnic at Mountain View in a Tipi, with fruit, cheeses and wines. Time with llamas and vicuñas.\n\nReturn to Cusco between 5:30 and 6:00 p.m.',
      },
    ],
  },
  'montana-palcoyo-full-day': {
    title: 'Palcoyo Mountain Full Day',
    subtitle: 'Unique Andean landscapes, rainbow mountains and a gentle hike',
    category: 'CUSCO IN A DAY',
    description:
      'A more accessible alternative to Vinicunca: three rainbow mountains, a gentle 40–50 minute hike, buffet breakfast and lunch included.',
    intro: [
      'Hours: 4:00 a.m. – 5:00 p.m. Daily departures. Moderate level, gentle hike.',
      'Pick-up at 4:00 a.m. Breakfast in Cusipata and a gentle 40–50 minute walk from Palcoyo (~4,900 m) to the viewpoints of three colored mountains.',
      'A less demanding alternative to Vinicunca, with the same color views and Ausangate. Entrance (15 soles) is paid on site.',
    ],
    detailParagraphs: [
      'Ideal if you want rainbow-mountain landscapes without the long Vinicunca climb. Wear layers, a hat and sunscreen: the wind at altitude is cold.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Palcoyo – Cusco',
        content:
          '4:00 a.m. — Hotel pick-up in Cusco. Drive to Cusipata for breakfast included.\n\nWe continue to the Palcoyo community (~4,900 m a.s.l.), start of a gentle, gradual hike.\n\nAlong the way: three multicolored mountains, llamas, alpacas and views of the Ausangate range, without a hard climb.\n\nAfter 40–50 minutes we reach the viewpoints. Free time for photos and rest.\n\nReturn to Cusipata. Buffet lunch.\n\nArrival in Cusco around 5:00 p.m.',
      },
    ],
  },
  'valle-sagrado-full-day': {
    title: 'Sacred Valley of the Incas Full Day',
    subtitle: 'History, tradition and stunning landscapes in one day',
    category: 'CUSCO IN A DAY',
    description:
      'Taray viewpoint, Pisac, buffet lunch in Urubamba, Ollantaytambo and Chinchero with textile workshops on a complete Sacred Valley tour.',
    intro: [
      'Hours: 7:00 a.m. – 7:00 p.m. Daily departures. Moderate level.',
      'Pick-up at 7:00 a.m. from your hotel. Taray viewpoint, Pisac, buffet lunch in Urubamba, Ollantaytambo and Chinchero. Return to Cusco around 7:00 p.m.',
    ],
    detailParagraphs: [
      'A full day through the Sacred Valley’s emblematic towns: terraces, temples and textile workshops. The tourist ticket (partial 70 soles or general 130 soles) is paid on site.',
      'Tour price: USD 25 per person. Reserve with 30% of the total; the balance is paid in Cusco.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Taray – Pisac – Urubamba – Ollantaytambo – Chinchero',
        content:
          '7:00 a.m. — Hotel pick-up in Cusco. First stop at Taray viewpoint, with a panoramic view of the Sacred Valley.\n\nPisac: terraces, Inca temples and artisan market.\n\nBuffet lunch in Urubamba, with typical dishes.\n\nIn the afternoon, Ollantaytambo: temples, terraces and Inca walls.\n\nChinchero: colonial church on Inca walls and textile workshops (Andean dyeing and weaving).\n\nArrival in Cusco around 7:00 p.m.',
      },
    ],
  },
  'valle-sagrado-con-maras-y-moray-full-day': {
    title: 'Sacred Valley with Maras & Moray Full Day',
    subtitle: 'A perfect day among Inca terraces and ancient salt mines',
    category: 'CUSCO IN A DAY',
    description:
      'Chinchero, Moray, Maras Salt Mines, buffet lunch in Urubamba, Ollantaytambo and Pisac on a complete Sacred Valley tour.',
    intro: [
      'Hours: 7:00 a.m. – 7:00 p.m. Pick-up between 6:30 and 7:00 a.m. Moderate level.',
      'Chinchero, Moray, Maras Salt Mines, buffet lunch in Urubamba, Ollantaytambo and Pisac. Bilingual guide included.',
      'The tourist ticket and Maras Salt Mines entrance (20 soles) are paid on site. Bring cash in soles.',
    ],
    detailParagraphs: [
      'Combines the classic Sacred Valley with Moray and the ancient salt pans. The most complete full day if you want terraces, salt and two Inca complexes in one trip.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Chinchero – Moray – Maras – Urubamba – Ollantaytambo – Pisac',
        content:
          '6:30–7:00 a.m. — Hotel pick-up. Drive to the Sacred Valley.\n\nChinchero: agricultural terraces and a textile center with natural dyes.\n\nMoray: circular terraces, the Inca agricultural laboratory.\n\nMaras Salt Mines: ancestral salt extraction.\n\nBuffet lunch in Urubamba.\n\nIn the afternoon, Ollantaytambo and Pisac, with a panoramic valley view.\n\nArrival in Cusco around 7:00 p.m.',
      },
    ],
  },
  'cuatrimotos-maras-moray-medio-dia': {
    title: 'Maras & Moray by ATV Full Day',
    subtitle: 'Adventure, culture and unique landscapes in the Sacred Valley',
    category: 'CUSCO IN A DAY',
    description:
      'Ride ATVs to Moray and Maras Salt Mines with safety briefing, bilingual guide and transport from Cusco.',
    intro: [
      'Hours: 7:00 a.m. – 2:30 p.m. Pick-up between 6:30 and 7:00 a.m. Moderate level.',
      'ATV base at Cruz Pata, Sacred Valley. Safety briefing, ride to Moray and Maras Salt Mines, and return to Cusco near the Main Square around 2:30 p.m.',
      'Tickets (tourist ticket and Maras Salt Mines, 20 soles) are paid on site.',
    ],
    detailParagraphs: [
      'Adventure and culture: you drive the ATV with a guide. Wear comfortable clothes, gloves and sunglasses. No prior experience needed; there is time to get familiar at the base.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cruz Pata – Moray – Maras – Cusco',
        content:
          '6:30–7:00 a.m. — Hotel pick-up in Cusco. Transfer to Cruz Pata in the Sacred Valley.\n\nSafety briefing and ATV handover.\n\nGuided ride to Moray, the Inca circular-terrace laboratory.\n\nContinue to the Maras Salt Mines (more than 3,000 pools).\n\nReturn to the base and transport to Cusco, near the Main Square, around 2:30 p.m.',
      },
    ],
  },
  'lago-titicaca-desde-cusco-full-day': {
    title: 'Lake Titicaca from Cusco Full Day',
    subtitle: 'Uros floating islands and ancestral culture on Taquile',
    category: 'EXPLORE',
    description:
      'From Cusco by overnight bus: Uros floating islands, Taquile Island with typical lunch and return to Cusco.',
  },
  'city-tour-medio-dia': {
    title: 'Cusco City Tour Full Day',
    subtitle: 'A journey to the heart of the Inca Empire, full of history and beauty',
    category: 'CUSCO IN A DAY',
    description:
      'Qorikancha, Historic Center, Cathedral and the archaeological complex of Sacsayhuamán, Qenqo, Puca Pucara and Tambomachay.',
    intro: [
      'Duration: 6 hours. Easy level. Daily departures.',
      'Afternoon slot: 2:30 p.m. – 6:30 p.m. Hotel pick-up, Qorikancha, historic center, Cathedral and the Sacsayhuamán, Qenqo, Puca Pucara and Tambomachay circuit.',
      'Tickets are paid on site: Qorikancha 15 soles and Partial Tourist Ticket 70 soles.',
    ],
    detailParagraphs: [
      'The classic afternoon circuit to understand Cusco: Temple of the Sun, Main Square and the four nearby archaeological sites. Wear comfortable shoes; there is walking and some altitude.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco City Tour + Archaeological Complex',
        content:
          'Hotel pick-up in Cusco for a tour of history and tradition.\n\nFirst visit: Temple of the Sun or Qorikancha, Inca and colonial architecture together.\n\nHistoric center: cobbled streets, mansions and Cusco Cathedral (Cusco School of art).\n\nArchaeological circuit: Sacsayhuamán (stone blocks), Qenqo (ceremonial center), Puca Pucara (fortress) and Tambomachay (Inca Bath).\n\nReturn to Cusco around 6:00 p.m.',
      },
    ],
  },
  'pallay-punchu-full-day': {
    title: 'Pallay Punchu Full Day',
    subtitle: 'Unique rock formations and spectacular Andean landscapes',
    category: 'CUSCO IN A DAY',
    description:
      'Moderate hike to Pallay Punchu mountain with filament-like rock formations, views of Lake Langui, breakfast and lunch included.',
    intro: [
      'Hours: 4:00 a.m. – 6:00 p.m. Daily departures. Moderate level.',
      'Pick-up at 4:00 a.m. Drive south (Layo district, Canas), moderate hike to Pallay Punchu and lunch included. Return to Cusco around 6:00 p.m.',
      'Pallay Punchu entrance (15 soles) is paid on site. Bring warm clothes and trekking shoes.',
    ],
    detailParagraphs: [
      'Pallay Punchu stands out for filament-like rock formations and the view of Lake Langui. Less crowded than Vinicunca, with the same high-mountain feel.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Layo – Pallay Punchu – Cusco',
        content:
          '4:00 a.m. — Hotel pick-up in Cusco. Drive south through Andean landscapes.\n\nStop for breakfast on the way. We continue to Layo district, Canas province.\n\nModerate hike to Pallay Punchu: filament rock formations and views of Lake Langui.\n\nFree time for photos and rest.\n\nLunch at a local restaurant.\n\nArrival in Cusco around 6:00 p.m.',
      },
    ],
  },
  'glaciar-qelccaya-full-day': {
    title: 'Quelccaya Glacier Full Day',
    subtitle: 'Discover the white giant of the Andes',
    category: 'CUSCO IN A DAY',
    description:
      'Visit the world\'s largest tropical glacier with breakfast and lunch, hike through the Andean puna and professional guide from Cusco.',
    intro: [
      'Hours: 4:00 a.m. – 6:00 p.m. Daily departures. Moderate level.',
      'Pick-up at 4:00 a.m. Drive south to Cusipata for breakfast. We continue toward the community near the glacier (Phinaya), a light hike to the viewpoint and Andean lunch. Return to Cusco around 6:00 p.m.',
      'Quelccaya is the world’s largest tropical glacier. Entrance (15 soles) is paid on site. High mountain: bring very warm clothes, hat, gloves and sunglasses.',
    ],
    detailParagraphs: [
      'The guide explains the glacier and climate change. Along the way: llamas, alpacas and high-Andean plains. Poles and oxygen are included.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Cusipata – Quelccaya Glacier – Cusco',
        content:
          '4:00 a.m. — Hotel pick-up in Cusco. Drive south to Cusipata for breakfast included.\n\nWe continue toward the community near Quelccaya Glacier, the world’s largest tropical glacier. Along the way: llamas, alpacas and high plains.\n\nLight hike to a viewpoint. Free time for photos. The guide explains the glacier and climate change.\n\nReturn to Cusipata. Andean lunch.\n\nArrival in Cusco around 6:00 p.m.',
      },
    ],
  },
  'waqrapukara-full-day': {
    title: 'Waqrapukara Full Day',
    subtitle: 'Adventure among clouds and Andes',
    category: 'CUSCO IN A DAY',
    description:
      'Unique experience to the impressive Waqrapukara fortress, a mystical destination surrounded by Andean landscapes, deep canyons and ancestral Inca energy.',
    intro: [
      'Hours: departure 4:30–5:00 a.m. Return to Cusco between 5:30 and 6:30 p.m. Moderate level. About 12 hours.',
      'Early start to Sangarará (Andean breakfast), 1.5–2 hour hike along the Apurímac canyon to the horn-shaped fortress, typical lunch and afternoon return.',
      'Site entrance (approx. 20 soles / 6 USD) is paid on site. Cold, changing weather: bring a windbreaker and trekking shoes.',
    ],
    detailParagraphs: [
      'Waqrapukara is less crowded, with canyon views and a guided visit to the archaeological site. Ideal if you already know Vinicunca or Humantay and want another side of the Andes.',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Sangarará – Waqrapukara – Cusco',
        content:
          '4:30–5:00 a.m. — Pick-up in Cusco. Drive south to Sangarará for an Andean breakfast.\n\nTransfer to the trailhead. Moderate 1.5–2 hour hike along the Apurímac canyon.\n\nGuided visit to Waqrapukara, the horn-shaped fortress.\n\nDescent the same way. Typical lunch at a local restaurant.\n\nArrival in Cusco between 5:30 and 6:30 p.m.',
      },
    ],
  },
  'machu-picchu-en-carro-desde-cusco': {
    title: 'Machu Picchu by Car from Cusco Full Day',
    subtitle: 'Visit Machu Picchu in one day with ground transport from Cusco',
    category: 'CUSCO IN A DAY',
    description:
      'Travel through the Sacred Valley by private transport to Ollantaytambo and continue to Aguas Calientes to visit Machu Picchu citadel with professional guide, entrance and lunch included.',
    intro: [
      'Hours: 4:00 a.m. – 11:00 p.m. Daily departures. Moderate level.',
      'Pick-up at 4:00 a.m. Car through the Sacred Valley to Ollantaytambo, train to Aguas Calientes, bus and a guided visit of about 2 h 30 at Machu Picchu. Lunch included. Return to Cusco around 9:00 p.m.',
      'Includes tourist train, Machu Picchu entrance and guide. Book ahead: citadel tickets are limited. Bring your original passport.',
    ],
    detailParagraphs: [
      'A one-day option to see Machu Picchu from Cusco, without a night in Aguas Calientes. Optional: Huayna Picchu (+60 USD) or Vistadome train (+40 USD one way, +70 USD both ways).',
    ],
    itinerary: [
      {
        day: 'Full Day',
        title: 'Cusco – Ollantaytambo – Aguas Calientes – Machu Picchu – Cusco',
        content:
          '4:00 a.m. — Hotel pick-up in Cusco. Car through the Sacred Valley to Ollantaytambo station.\n\nTrain to Aguas Calientes, with mountain, river and valley views.\n\nBus to the citadel. Guided tour of about 2 hours 30 minutes: temples, terraces and viewpoints.\n\nFree time for photos.\n\nDescent to Aguas Calientes and lunch at a local restaurant.\n\nReturn train to Ollantaytambo and car to Cusco, around 9:00 p.m.',
      },
    ],
  },
  'huacachina-islas-ballestas-full-day': {
    title: 'Ballestas Islands & Huacachina Full Day',
    subtitle: 'Sea and desert in one day',
    category: 'EXPLORE',
    description:
      'From Lima: Ballestas Islands, vineyard with pisco tasting, lunch, dune buggies and sandboarding in Huacachina. Return ~10:00 p.m.',
  },
  'city-tour-lima-full-day': {
    title: 'Lima City Tour Full Day',
    subtitle: 'Unforgettable Lima: from the Historic Center to the Pacific',
    category: 'EXPLORE',
    description:
      'Tour through Miraflores, the Malecón, Love Park, Lima Historic Center and San Francisco Convent with catacombs.',
  },
  'islas-ballestas-nazca-2d-1n': {
    title: 'Ballestas Islands – Huacachina / Nazca Overflight 2D / 1N',
    subtitle: 'Sea, desert and Nazca Lines from Lima',
    category: 'EXPLORE',
    description:
      'Day 1: Ballestas Islands, vineyard, Huacachina and night in Ica. Day 2: 35-minute overflight over the Nazca Lines and return to Lima.',
  },
  'machupicchu-laguna-humantay-6d-5n': {
    title: 'Machu Picchu / Humantay Lagoon 6D / 5N',
    subtitle: 'Machu Picchu and Humantay Lagoon in 6 Days of Adventure',
    category: 'CUSCO PACKAGES',
    description:
      'Discover Machu Picchu, Maras, Moray, Humantay Lagoon and Rainbow Mountain in 6 days through the heart of the Inca Empire.',
    duration: '6 Days / 5 Nights',
  },
  'cusco-laguna-humantay-6d-5n': {
    title: 'Cusco / Sacred Valley 6D / 5N',
    subtitle: 'Exploring the Sacred Valley in Cusco — 6 Days 5 Nights',
    category: 'CUSCO PACKAGES',
    description:
      'City Tour, Sacred Valley, Machu Picchu, Rainbow Mountain and Humantay Lagoon in a complete 6-day Cusco package.',
    duration: '6 Days / 5 Nights',
  },
  'cusco-inolvidable-4d-3n': {
    title: 'Unforgettable Cusco 4D / 3N',
    subtitle: 'City Tour, Machu Picchu Full Day and Humantay Lagoon',
    category: 'CUSCO PACKAGES',
    description:
      '4-day package: City Tour, full-day Machu Picchu from Cusco and Humantay Lagoon trek.',
  },
  'cusco-inolvidable-5d-4n': {
    title: 'Unforgettable Cusco 5D / 4N',
    subtitle: 'City Tour, Sacred Valley, Machu Picchu and Humantay Lagoon',
    category: 'CUSCO PACKAGES',
    description:
      '5-day package with the essentials of Cusco: City Tour, Sacred Valley, Machu Picchu and Humantay Lagoon.',
    duration: '5 Days / 4 Nights',
  },
  'valle-sagrado-machu-picchu': {
    title: 'Sacred Valley / Machu Picchu 2D / 1N',
    subtitle: 'From the Sacred Valley to the Inca citadel in two days',
    category: 'MACHU PICCHU',
    description:
      '2-day tour: Sacred Valley (Pisac, Urubamba, Ollantaytambo), overnight in Aguas Calientes and guided Machu Picchu visit.',
    intro: [
      '2 days / 1 night via Ollantaytambo: Sacred Valley on day 1 and Machu Picchu on day 2.',
      'Includes tourist train, citadel bus, tickets, professional guide and meals as listed.',
      'Bring your original passport. Book ahead: Machu Picchu tickets are limited.',
    ],
    detailParagraphs: [
      'Day 1: Pisac and Ollantaytambo, lunch in Urubamba, then the train to Aguas Calientes. Day 2: bus to Machu Picchu for a guided visit of about 3 hours and return to Cusco in the afternoon.',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Cusco / Sacred Valley / Aguas Calientes',
        content:
          'Hotel breakfast. Pick-up around 7:30 a.m.\n\nVisit Pisac and Ollantaytambo, two key Sacred Valley sites.\n\nBuffet lunch at a tourist restaurant in Urubamba.\n\nAfternoon tourist train from Ollantaytambo to Aguas Calientes.\n\nOur staff meets you at the station and walks you to the hotel.\n\nOvernight in Aguas Calientes.',
      },
      {
        day: 'Day 2',
        title: 'Machu Picchu / return to Cusco',
        content:
          'After hotel breakfast we go to the bus station and ride up to Machu Picchu.\n\nGuided visit of about 3 hours: temples, terraces, sacred precincts and time for photos.\n\nWe descend to Aguas Calientes for lunch at a tourist restaurant.\n\nAfternoon return train to Ollantaytambo, then private transport back to Cusco.',
      },
    ],
  },
  'cusco-valle-sagrado-6d-5n': {
    title: 'Unforgettable Cusco 6D / 5N',
    subtitle: 'Sacred Valley, Machu Picchu, Maras/Moray quads and Rainbow Mountain',
    category: 'CUSCO PACKAGES',
    description:
      '6-day package: City Tour, Sacred Valley, Machu Picchu, Maras and Moray by ATV and Rainbow Mountain.',
    duration: '6 Days / 5 Nights',
  },
  'huaynapicchu-machupicchu': {
    title: 'Huayna Picchu / Machu Picchu',
    subtitle: 'Machu Picchu and Waynapicchu: The Summit of Your Inca Adventure',
    category: 'MACHU PICCHU',
    description:
      'Full day from Cusco: guided Machu Picchu visit and ascent of Huayna Picchu with train, bus, lunch and bilingual guide included.',
    duration: '12 Hours – Full Day',
    difficulty: 'Moderate to demanding',
  },
  'picnic-andino-medio-dia': {
    title: 'Andean Picnic – Half Day',
    subtitle: 'Andean Picnic: Tradition and Nature',
    category: 'EXPLORE',
    description:
      'Sacred Valley tour: Chinchero, Maras Salt Mines, Moray and an Andean picnic at Mountain View with llamas and vicuñas.',
    duration: 'Half Day',
    difficulty: 'Easy',
  },
  'ausangate-7-lagunas-downhill-1-dia': {
    title: 'Ausangate 7 Lagoons Downhill',
    subtitle: 'Downhill: Adrenaline among 7 Lagoons',
    category: 'EXPLORE',
    description:
      'Mountain bike downhill adventure visiting seven crystal-clear lagoons near Ausangate with safety gear and lunch included.',
    duration: '1 Day',
    difficulty: 'Medium – High',
  },
  'tour-maras-moray-downhill-medio-dia': {
    title: 'Maras & Moray Downhill Tour',
    subtitle: 'Mountain bike adventure in the Sacred Valley',
    category: 'EXPLORE',
    description:
      'Half-day downhill bike tour through Moray and Maras Salt Mines with professional guide and safety equipment.',
    duration: 'Half Day',
  },
  'cusco-retiro-ayahuasca-1-dia': {
    title: 'Cusco Ayahuasca Retreat – 1 Day',
    subtitle: 'Healing Ceremony and Ancestral Wisdom',
    category: 'EXPLORE',
    description:
      'Ayahuasca ceremony with shaman, individual consultations and round-trip transport from Cusco.',
    duration: '1 Day',
  },
  'salar-de-uyuni-5-dias-4-noches-desde-puno': {
    title: 'Uyuni Salt Flat 5D / 4N from Puno',
    subtitle: 'Uyuni Salt Flat: 5 Days and 4 Nights between Skies and Mirrors',
    category: 'EXPLORE',
    description:
      'Complete 5-day adventure across the Uyuni Salt Flat: colored lagoons, geysers, hot springs and starry nights.',
    duration: '5 Days / 4 Nights',
  },
  'taller-de-cocina-en-lima-1-dia': {
    title: 'Lima Cooking Workshop – 1 Day',
    subtitle: 'Flavors of Peru in a hands-on class',
    category: 'EXPLORE',
    description:
      'Market visit and hands-on Peruvian cooking class: ceviche, causa limeña and pisco sour with a local chef in Lima.',
    duration: '1 Day',
  },
  'cusco-inolvidable-7d-6n': {
    title: 'Unforgettable Cusco 7D / 6N',
    subtitle: 'The complete package: Machu Picchu, Humantay, Maras/Moray and Rainbow Mountain',
    category: 'CUSCO PACKAGES',
    description:
      '7-day package with City Tour, Sacred Valley, Machu Picchu, Humantay Lagoon, Maras/Moray and Rainbow Mountain.',
  },
  'inca-trip-7d-6n': {
    title: 'Peru Adventure Total 7D / 6N',
    subtitle: 'Peru Wonders 7D/6N: An unforgettable journey',
    category: 'SUPER PACKAGES',
    description:
      'An incredible trip combining the best of Peru: history, culture and unique landscapes across Lima, Cusco, Machu Picchu and Rainbow Mountain.',
  },
  'inca-trip-8d-7n': {
    title: 'Peru Adventure Total 8D / 7N',
    subtitle: 'Total Adventure 8D/7N: living traditions and unforgettable landscapes',
    category: 'SUPER PACKAGES',
    description:
      'An unforgettable 8-day, 7-night experience exploring Peru’s cultural, historical and natural richness in one journey.',
  },
  'inca-trip-9d-8n': {
    title: 'Peru Adventure Total 9D / 8N',
    subtitle: 'Total Adventure 9D/8N: the essence of the Inca Empire',
    category: 'SUPER PACKAGES',
    description:
      'Nine days and eight nights discovering the best of Peru: culture, history and unforgettable landscapes in the heart of the Inca Empire.',
  },
  'inca-trip-10d-9n': {
    title: 'Peru Adventure Total 10D / 9N',
    subtitle: 'Total Adventure 10 Days 9 Nights: a complete journey through the heart of the Empire',
    category: 'SUPER PACKAGES',
    description:
      'Discover the best of Peru in 10 days and 9 nights — unique landscapes, archaeological sites, living culture and unforgettable experiences.',
    priceNote:
      'Without lodging: USD 650 per person. With basic lodging: USD 759 per person. Book with 30% deposit; balance due on arrival in Cusco.',
  },
  'peru-aventura-total-7d-6n': {
    title: 'Peru Adventure Total 7D / 6N',
    subtitle: 'Peru Wonders 7D/6N: An unforgettable journey',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-8d-7n': {
    title: 'Peru Adventure Total 8D / 7N',
    subtitle: 'Total Adventure 8D/7N: living traditions and unforgettable landscapes',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-9d-8n': {
    title: 'Peru Adventure Total 9D / 8N',
    subtitle: 'Total Adventure 9D/8N: the essence of the Inca Empire',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-10d-9n': {
    title: 'Peru Adventure Total 10D / 9N',
    subtitle: 'Total Adventure 10 Days 9 Nights: a complete journey through the heart of the Empire',
    category: 'SUPER PACKAGES',
    priceNote:
      'Without lodging: USD 650 per person. With basic lodging: USD 759 per person. Book with 30% deposit; balance due on arrival in Cusco.',
  },
  'peru-aventura-total-13d-12n': {
    title: 'Peru Adventure Total 13D / 12N',
    subtitle: 'The most complete adventure across Peru',
    category: 'SUPER PACKAGES',
    description:
      'The most extensive package: Lima, coast, Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Maras, Moray, Titicaca and more in 13 unforgettable days.',
  },
  'camino-inca-machupicchu-2d-1n': {
    title: 'Inca Trail / Machu Picchu 2D / 1N',
    subtitle: 'Inca Trail: The Route to Machu Picchu',
    category: 'INCA TRAIL',
    description:
      'Embark on Peru’s most iconic journey on the Inca Trail to Machu Picchu — nature, history and mysticism on ancient paths.',
  },
  'camino-inca-4d-3n': {
    title: 'Inca Trail 4D / 3N',
    subtitle: 'Four days discovering history and nature on the Inca Trail',
    category: 'INCA TRAIL',
    description:
      'An unforgettable hike on ancestral trails through stunning landscapes, archaeological sites and Machu Picchu.',
  },
  'salkantay-trek-machupicchu-5d-4n': {
    title: 'Salkantay Trek / Machu Picchu 5D / 4N',
    subtitle: 'Andean adventure to Machu Picchu via Salkantay',
    category: 'INCA TRAIL',
    description:
      'Five days crossing mountains, glaciers and valleys on the spectacular Salkantay route to Machu Picchu.',
  },
  'inca-jungle-trek-machupicchu-4d-3n': {
    title: 'Inca Jungle Trek / Machu Picchu 4D / 3N',
    subtitle: 'Total adventure: biking, rafting, jungle and Machu Picchu',
    category: 'INCA TRAIL',
    description:
      'The most dynamic alternative to the classic Inca Trail: mountain biking, rafting, jungle hiking and Machu Picchu in 4 days.',
  },
};

const SUPER_PACKAGE_CATEGORIES = new Set(['Súper Paquetes', 'SUPER PACKAGES']);

export function isSuperPackageCategory(category: string): boolean {
  return SUPER_PACKAGE_CATEGORIES.has(category);
}

export function localizeTour(tour: TourPage, locale: Locale): TourPage {
  if (locale === 'es') return tour;

  const override = TOUR_EN[tour.slug];
  const navTitle = tourLabelFromNav(`/tours/${tour.slug}/`);

  const base = {
    ...tour,
    ...(override ?? {}),
    title: navTitle ?? override?.title ?? translateText(tour.title),
    subtitle: override?.subtitle ?? (tour.subtitle ? translateText(tour.subtitle) : tour.subtitle),
    description: override?.description ?? translateText(tour.description),
    category: override?.category ?? translateCategory(tour.category),
    difficulty: override?.difficulty ?? translateDifficulty(tour.difficulty),
    duration: override?.duration ?? translateDuration(tour.duration),
    tourType: override?.tourType ?? translateTourType(tour.tourType),
    priceNote: tour.priceNote ? translateText(tour.priceNote) : tour.priceNote,
    intro: override?.intro ?? translateLines(tour.intro),
    detailParagraphs: override?.detailParagraphs ?? translateLines(tour.detailParagraphs),
    highlights: override?.highlights ?? translateLines(tour.highlights),
    includes: override?.includes ?? translateLines(tour.includes),
    excludes: override?.excludes ?? translateLines(tour.excludes),
    recommendations: override?.recommendations ?? translateLines(tour.recommendations),
    itinerary: override?.itinerary?.length
      ? override.itinerary
      : tour.itinerary.map((day) => ({
          ...day,
          day: translateText(day.day),
          title: translateText(day.title),
          content: translateText(day.content),
        })),
  };

  return base;
}

function translateCategory(c: string): string {
  const map: Record<string, string> = {
    'Súper Paquetes': 'SUPER PACKAGES',
    'Paquetes Cusco': 'CUSCO PACKAGES',
    'Cusco en un día': 'CUSCO IN A DAY',
    Explora: 'EXPLORE',
    Tours: 'TOURS',
    'Camino Inca': 'INCA TRAIL',
    Machupicchu: 'MACHU PICCHU',
  };
  return map[c] || translateText(c);
}

function translateDifficulty(d: string | null): string | null {
  if (!d) return d;
  return translateText(d)
    .replace(/Moderada/i, 'Moderate')
    .replace(/Moderado/i, 'Moderate')
    .replace(/Fácil|Facil/i, 'Easy')
    .replace(/Difícil/i, 'Hard');
}

function translateDuration(d: string | null): string | null {
  if (!d) return d;
  return translateText(d)
    .replace(/Días/gi, 'Days')
    .replace(/Noches/gi, 'Nights')
    .replace(/Día/gi, 'Day')
    .replace(/Noche/gi, 'Night');
}

function translateTourType(t: string | null): string | null {
  if (!t) return t;
  return translateText(t)
    .replace(/Aventura/gi, 'Adventure')
    .replace(/Cultural/gi, 'Cultural')
    .replace(/Natural/gi, 'Nature')
    .replace(/Naturaleza/gi, 'Nature');
}

/** Find English nav label for a tour href */
export function tourLabelFromNav(href: string): string | null {
  for (const item of en.nav.items) {
    for (const child of item.children || []) {
      if (child.href === href) return child.label;
    }
  }
  return null;
}

/** Localized social video caption by id */
export function socialVideoCaption(id: string, locale: Locale, fallback: string): string {
  const dict = locale === 'en' ? en : null;
  if (!dict) return fallback;
  const found = dict.socialVideos.find((v) => v.id === id);
  return found?.caption ?? fallback;
}

/** Open-on-platform label for social embeds */
export function openPlatformLabel(
  platform: 'facebook' | 'tiktok' | 'local' | 'youtube' | 'instagram',
  locale: Locale
): string {
  const ui = locale === 'en' ? en.videosUi : null;
  if (!ui) {
    const es = {
      facebook: 'Abrir Facebook',
      tiktok: 'Abrir TikTok',
      local: 'Ver más',
      youtube: 'Abrir YouTube',
      instagram: 'Abrir Instagram',
    };
    return es[platform];
  }
  const map = {
    facebook: ui.openFacebook,
    tiktok: ui.openTiktok,
    local: ui.seeMore,
    youtube: ui.openYoutube,
    instagram: ui.openInstagram,
  };
  return map[platform];
}
