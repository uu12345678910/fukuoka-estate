import { defineField, defineType } from 'sanity'

export const caseStudyType = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'customerType',
            title: '顧客タイプ (Customer Type - e.g. 30代ファミリー, 東京からの移住者)',
            type: 'string',
        }),
        defineField({
            name: 'problem',
            title: 'お悩み (Problem)',
            type: 'text',
        }),
        defineField({
            name: 'solution',
            title: '解決策 (Solution)',
            type: 'text',
        }),
        defineField({
            name: 'feedback',
            title: 'お客様の声 (Feedback)',
            type: 'text',
        }),
    ],
})
