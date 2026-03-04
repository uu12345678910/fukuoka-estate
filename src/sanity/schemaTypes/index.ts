import { type SchemaTypeDefinition } from 'sanity'
import { propertyType } from './property'
import { postType } from './post'
import { caseStudyType } from './caseStudy'
import { highSchoolType } from './highSchool'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propertyType, postType, caseStudyType, highSchoolType],
}
