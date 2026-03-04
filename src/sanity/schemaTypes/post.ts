import { defineField, defineType } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'タイトル (Title)',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'スラッグ (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'メイン画像 (Main image)',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: '公開日時 (Published at)',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: '本文 (Body)',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
    ],
})
