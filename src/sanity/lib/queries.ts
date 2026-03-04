export const propertyQuery = `*[_type == "property"] {
  _id,
  title,
  "slug": slug.current,
  price,
  location,
  geopoint,
  "imageUrl": images[0].asset->url,
  tags,
  agentComment
}`

export const postQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url,
  publishedAt,
  body
}`

export const caseStudyQuery = `*[_type == "caseStudy"] {
  _id,
  customerType,
  problem,
  solution,
  feedback
}`

export const highSchoolQuery = `*[_type == "highSchool" && defined(rank)] | order(rank asc) {
  _id,
  name,
  "slug": slug.current,
  location,
  description,
  rank,
  deviationValue
}`
