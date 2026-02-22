export const zodiacBySlugQuery = `*[_type == "zodiacProfile" && slug.current == $slug][0] {
  _id,
  signName,
  slug,
  element,
  rulingPlanet,
  dates,
  luckyNumbers,
  traits,
  overview,
  compatibility
}`;

export const zodiacSlugsQuery = `*[_type == "zodiacProfile" && defined(slug.current)][].slug.current`;

export const relatedPostsByTagQuery = `*[_type == "post" && $tag in categories] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories
}`;

// --- Eastern Profile Queries ---

export const easternBySlugQuery = `*[_type == "easternProfile" && slug.current == $slug][0] {
  _id,
  animalName,
  slug,
  polarity,
  years,
  luckyNumbers,
  traits,
  overview
}`;

export const easternSlugsQuery = `*[_type == "easternProfile" && defined(slug.current)][].slug.current`;
