import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import LineCTA from "@/components/LineCTA";
import { notFound } from "next/navigation";

const singlePropertyQuery = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  price,
  location,
  "imageUrl": images[0].asset->url,
  tags,
  agentComment
}`;

export default async function PropertyPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const property = await client.fetch(singlePropertyQuery, { slug });

    if (!property) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 md:py-24">
            <article className="container mx-auto px-6 lg:px-12 max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Image */}
                {property.imageUrl && (
                    <div className="w-full h-64 md:h-96 relative bg-gray-200">
                        <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Area */}
                <div className="p-8 md:p-16">
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {property.tags?.map((tag: string) => (
                                <span key={tag} className="bg-navy-100 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                                    {tag === 'recommended-for-migrants' && '県外移住者おすすめ'}
                                    {tag === 'good-for-parenting' && '子育て環境◎'}
                                    {tag === 'freelance-friendly' && '自営業相談可'}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-navy-900 leading-tight mb-4">
                            {property.title}
                        </h1>
                        <p className="text-2xl text-orange-500 font-bold mb-8">
                            ¥{property.price?.toLocaleString()}
                        </p>
                        <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-navy-900 mb-2 border-b-2 border-gray-100 pb-2">所在地</h2>
                            <p className="text-gray-700">{property.location}</p>
                        </div>

                        {property.agentComment && (
                            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 relative">
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">!</div>
                                <h2 className="text-lg font-bold text-navy-900 mb-2">エージェント（ママ）の推しポイント</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.agentComment}</p>
                            </div>
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
