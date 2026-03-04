import { client } from "@/sanity/lib/client";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import Link from "next/link";
import LineCTA from "@/components/LineCTA";
import { notFound } from "next/navigation";

// Define the query for a single post by slug
const singlePostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "imageUrl": mainImage.asset->url,
  publishedAt,
  body
}`;

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const post = await client.fetch(singlePostQuery, { slug });

    if (!post) {
        return notFound();
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
        : '';

    return (
        <main className="min-h-screen bg-gray-50 py-12 md:py-24">
            <article className="container mx-auto px-6 lg:px-12 max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Image */}
                {post.imageUrl && (
                    <div className="w-full h-64 md:h-96 relative bg-gray-200">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Area */}
                <div className="p-8 md:p-16">
                    <div className="mb-8">
                        <div className="text-orange-500 font-bold mb-4">{formattedDate}</div>
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                    </div>

                    <div className="prose prose-lg prose-orange max-w-none text-gray-700">
                        {post.body ? (
                            <PortableText value={post.body} />
                        ) : (
                            <p>本文がありません。</p>
                        )}
                    </div>
                </div>
            </article>

            {/* Back button */}
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl mt-12 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:text-orange-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    ホームに戻る
                </Link>
            </div>

            {/* LINE CTA Section */}
            <LineCTA />
        </main>
    );
}
