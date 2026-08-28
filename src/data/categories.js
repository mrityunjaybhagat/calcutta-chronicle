// Real category names, confirmed from a screenshot of the live site
// (calcuttachronicle.co.in blocks automated fetches, so this is the
// authoritative source). Cover images are placeholders — swap for the
// site's real category photography when exported.
const categories = [
  { slug: 'spotlight', name: 'Spotlight', tagline: 'People and moments defining the city right now', image: 'https://picsum.photos/seed/cc-spotlight/900/700' },
  { slug: 'cityscape', name: 'Cityscape', tagline: 'The skyline, the streets, the ever-changing city', image: 'https://picsum.photos/seed/cc-cityscape/900/700' },
  { slug: 'calcuttas-edifice', name: "Calcutta's Edifice", tagline: 'Buildings, monuments and the architecture of memory', image: 'https://picsum.photos/seed/cc-edifice/900/700' },
  { slug: 'food-pump', name: 'Food Pump', tagline: "Kolkata's kitchens, street food and old-world eateries", image: 'https://picsum.photos/seed/cc-foodpump/900/700' },
  { slug: 'neighbourhood', name: 'Neighbourhood', tagline: 'Para life — the lanes, clubs and corners of the city', image: 'https://picsum.photos/seed/cc-neighbourhood/900/700' },
  { slug: 'nostalgia', name: 'Nostalgia', tagline: 'Calcutta as it was, told by those who remember', image: 'https://picsum.photos/seed/cc-nostalgia/900/700' },
  { slug: 'market-buzz', name: 'Market Buzz', tagline: 'Bazaars, traders and the commerce of the city', image: 'https://picsum.photos/seed/cc-marketbuzz/900/700' },
  { slug: 'metamorphosis', name: 'Metamorphosis', tagline: 'How Calcutta keeps becoming Kolkata', image: 'https://picsum.photos/seed/cc-metamorphosis/900/700' },
  { slug: 'connoisseurs-choice', name: "Connoisseurs Choice", tagline: 'Art, film, music and the finer things', image: 'https://picsum.photos/seed/cc-connoisseur/900/700' },
  { slug: 'potpourri', name: 'Potpourri', tagline: 'A little bit of everything Calcutta', image: 'https://picsum.photos/seed/cc-potpourri/900/700' },
  { slug: 'changing-face', name: 'Changing Face', tagline: 'The city in transition, block by block', image: 'https://picsum.photos/seed/cc-changingface/900/700' },
  { slug: 'culture', name: 'Culture', tagline: 'Art, festivals and the life of the city', image: 'https://picsum.photos/seed/cc-culture/900/700' },
  { slug: 'do-you-know', name: 'Do You Know', tagline: 'Little-known facts about Calcutta', image: 'https://picsum.photos/seed/cc-doyouknow/900/700' },
  { slug: 'lets-explore-calcutta', name: "Let's Explore Calcutta", tagline: 'Walks, trails and hidden corners', image: 'https://picsum.photos/seed/cc-explore/900/700' },
  { slug: 'museum', name: 'Museum', tagline: "The city's collections and archives", image: 'https://picsum.photos/seed/cc-museum/900/700' },
  { slug: 'past-perfect', name: 'Past Perfect', tagline: 'History, revisited', image: 'https://picsum.photos/seed/cc-pastperfect/900/700' },
  { slug: 'reminiscence', name: 'Reminiscence', tagline: 'Personal memories of the city', image: 'https://picsum.photos/seed/cc-reminiscence/900/700' },
  { slug: 'roadscape', name: 'Roadscape', tagline: 'Streets, lanes and the journeys between them', image: 'https://picsum.photos/seed/cc-roadscape/900/700' },
  { slug: 'special-feature', name: 'Special Feature', tagline: 'Longer reads on the city', image: 'https://picsum.photos/seed/cc-specialfeature/900/700' },
  { slug: 'stage-craft', name: 'Stage Craft', tagline: "Theatre and performance in Calcutta", image: 'https://picsum.photos/seed/cc-stagecraft/900/700' },
  { slug: 'when-kolkata-was-calcutta', name: 'When Kolkata Was Calcutta', tagline: 'Stories from before the name changed', image: 'https://picsum.photos/seed/cc-wkwc/900/700' },
]

// A curated subset shown on the homepage discovery grid.
export const featuredCategorySlugs = [
  'spotlight', 'cityscape', 'calcuttas-edifice', 'food-pump',
  'neighbourhood', 'nostalgia', 'connoisseurs-choice', 'when-kolkata-was-calcutta',
]

export default categories
