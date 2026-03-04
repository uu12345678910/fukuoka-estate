import { defineField, defineType } from 'sanity'

export const highSchoolType = defineType({
    name: 'highSchool',
    title: 'High School',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: '高校名 (Name)',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'スラッグ (Slug)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            title: '位置情報 (Location Geopoint)',
            type: 'geopoint',
            description: '地図に表示するための緯度経度',
        }),
        defineField({
            name: 'rank',
            title: 'ランキング順位 (Rank)',
            type: 'number',
        }),
        defineField({
            name: 'deviationValue',
            title: '偏差値 (Deviation Value)',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: '特徴やエージェントのコメント (Description)',
            type: 'text',
            description: '学校の特徴や、ママ目線での推薦文など',
        }),
    ],
})
