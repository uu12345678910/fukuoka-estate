import { defineField, defineType } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '物件名 (Title)',
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
      name: 'price',
      title: '価格 (Price in JPY)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'location',
      title: '所在地 (Location)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: '画像 (Images)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'tags',
      title: '特徴タグ (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '県外からの移住者おすすめ', value: 'recommended-for-migrants' },
          { title: '子育て環境◎', value: 'good-for-parenting' },
          { title: '自営業相談可', value: 'freelance-friendly' },
        ],
      },
    }),
    defineField({
      name: 'agentComment',
      title: 'エージェントの推薦コメント (Agent Comment)',
      type: 'text',
      description: '移住経験や親目線（中学校の学区など）を活かした独自の推薦文',
    }),
    defineField({
      name: 'geopoint',
      title: '位置情報 (Location Geopoint)',
      type: 'geopoint',
      description: '地図に表示するための緯度経度',
    }),
  ],
})
