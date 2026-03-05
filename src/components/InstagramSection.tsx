'use client';

import { InstagramEmbed } from 'react-social-media-embed';

export default function InstagramSection() {
    return (
        <section className="py-24 bg-white container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Instagram</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    福岡のリアルな暮らしや、おすすめ物件のルームツアー動画をお届けしています。
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="w-full max-w-[328px]">
                    <InstagramEmbed url="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDg1NjQ0MDQxMTg2NzM5?igsh=MTd2dWdqZTd0OGsyNg==" width="100%" />
                </div>
                <div className="w-full max-w-[328px]">
                    <InstagramEmbed url="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTAzNzI3MTAxNjY4MjM1?igsh=NHlsZmZybTRobzJw" width="100%" />
                </div>
            </div>

            <div className="mt-12 text-center">
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors"
                >
                    Instagramをもっと見る
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
        </section>
    );
}
