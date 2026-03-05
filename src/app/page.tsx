import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { propertyQuery, caseStudyQuery, postQuery, highSchoolQuery } from "@/sanity/lib/queries";
import FukuokaMap from "@/components/FukuokaMap";
import LineFAB from '@/components/LineFAB';
import LineCTA from '@/components/LineCTA';
import InstagramSection from '@/components/InstagramSection';

// Hero Section Component
export const revalidate = 60; // Auto-revalidate cache every 60 seconds

function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Container */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 space-y-6 p-8 md:p-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            福岡移住のコンシェルジュ
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-100 leading-relaxed drop-shadow-md">
            私も県外から移住してきました。<br />
            福岡での住まい探しから、暮らしの「困った」まで、<br />
            何でも相談できる個人の不動産エージェントです。
          </p>
          <Link href="/contact" className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 duration-300 shadow-xl mt-4">
            無料相談を予約する
          </Link>
        </div>
      </div>

      {/* Background Image (Fukuoka Cityscape) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1670511915504-9f0f1df5a3de?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          alt="Fukuoka Cityscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-navy-900/60"></div>
      </div>
    </section>
  );
}

// Property Card Component
function PropertyCard({ property }: { property: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">画像なし</div>
        )}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {property.tags?.map((tag: string) => (
            <span key={tag} className="bg-navy-900/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              {tag === 'recommended-for-migrants' ? '県外からの移住者おすすめ' :
                tag === 'good-for-parenting' ? '子育て環境◎' :
                  tag === 'freelance-friendly' ? '自営業相談可' : tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-900 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {property.location}
        </p>
        <div className="text-2xl font-bold text-orange-500 mb-6">
          {property.price ? `¥${property.price.toLocaleString()}` : "価格未定"}
        </div>

        {property.agentComment && (
          <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
            <h4 className="flex items-center gap-2 text-sm font-bold text-orange-500 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              エージェントのおすすめポイント
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {property.agentComment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Case Study Card Component
function CaseStudyCard({ study }: { study: any }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="inline-block bg-orange-100 text-orange-500 text-sm font-bold px-4 py-1 rounded-full mb-4">
        {study.customerType}
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-gray-400 mb-1">お悩み</h4>
          <p className="text-navy-900 font-medium">{study.problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-400 mb-1">解決策</h4>
          <p className="text-navy-900">{study.solution}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl mt-4">
          <h4 className="text-sm font-bold text-orange-500 mb-2">お客様の声</h4>
          <p className="text-gray-600 italic text-sm">「{study.feedback}」</p>
        </div>
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ post }: { post: any }) {
  // Format standard date to read nicely (e.g., 2026/03/04)
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 shrink-0">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">画像なし</div>
        )}
      </div>
      <div className="p-6 flex flex-col grow">
        <div className="text-sm font-medium text-orange-500 mb-3">{formattedDate}</div>
        <h3 className="text-xl font-bold text-navy-900 mb-4 line-clamp-2">{post.title}</h3>
        <div className="mt-auto">
          <Link href={`/post/${post.slug}`} className="text-orange-500 font-bold hover:text-orange-600 inline-flex items-center gap-1 transition-colors">
            続きを読む
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const properties = await client.fetch(propertyQuery);
  const caseStudies = await client.fetch(caseStudyQuery);
  const posts = await client.fetch(postQuery);
  const highSchools = await client.fetch(highSchoolQuery);

  return (
    <>
      <Hero />

      {/* Profile Section (About Me) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-orange-50/50 rounded-3xl p-8 md:p-12 border border-orange-100 shadow-sm">
            <div className="shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center text-gray-400 relative">
                <Image
                  src="/profile.PNG"
                  alt="代表プロフィール"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-bold text-navy-900 mb-2">代表プロフィール</h2>
                <p className="text-orange-500 font-bold tracking-wide">About Me</p>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                他県から福岡へ移住し、現在は14歳と8歳の子供を育てるママエージェントです。前職のソフトウェアエンジニアから現在個人としてハウスクリーニングや物販などマルチに事業運営しており、自身の子育て・移住のリアルな実体験を掛け合わせ、お客様の『理想の暮らし』を親身にサポートします。特にファミリー層向けの学区選びや、高校進学を見据えたエリア提案を得意としています。
              </p>
              <div className="pt-2">
                <a
                  href="http://bit.ly/4kOVqms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 duration-300 shadow-md"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.896 8.954 9.172 9.613.359.076.85.234 1.025.534.156.269.102.684.05 1.054-.059.418-.387 2.302-.469 2.766-.135.762.656.417 1.04.225.291-.144 3.868-2.277 5.258-3.886C22.618 18.067 24 14.402 24 10.304z" />
                  </svg>
                  このエージェントにLINEで相談する
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20 bg-gray-50 container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">おすすめの物件</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            移住者の方に特におすすめしたい、周辺環境や生活の利便性に注目の物件を厳選しました。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property: any) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              現在、おすすめ物件の準備中です。Studioから物件を登録してください。
            </div>
          )}
        </div>
      </section>

      {/* Fukuoka Area Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">学区・エリアマップ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              おすすめ物件の周辺環境や、福岡市内の主要な高校へのアクセスを地図上で確認できます。
            </p>
          </div>
          <FukuokaMap properties={properties} highSchools={highSchools} />

          {/* High School Ranking Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 text-center flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              福岡県内 公立・私立高校 偏差値ランキング トップ10
            </h3>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              {highSchools?.length > 0 ? highSchools.map((school: any, index: number) => (
                <div key={school._id} className={`flex items-start md:items-center p-6 sm:p-8 ${index !== highSchools.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-orange-50/30 transition-colors`}>
                  <div className="flex-shrink-0 mr-6 text-center">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl ${index === 0 ? 'bg-yellow-400 text-yellow-900 shadow-md transform scale-110' : index === 1 ? 'bg-gray-300 text-gray-800 shadow-sm' : index === 2 ? 'bg-orange-300 text-orange-900 shadow-sm' : 'bg-gray-100 text-gray-500'}`}>
                      {school.rank || index + 1}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                      <h4 className="text-xl font-bold text-navy-900">{school.name}</h4>
                      {school.deviationValue && (
                        <span className="inline-block bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap self-start md:self-auto">
                          偏差値 {school.deviationValue}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {school.description}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-gray-400">高校データが登録されていません。</div>
              )}
            </div>
            <p className="text-right text-xs text-gray-400 mt-4">※偏差値および順位は独自調査に基づいた目安であり、年度により変動します。</p>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      {/* Case Studies Section */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">移住・住まい探しのお悩み解決事例</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              様々な境遇の方の「困った」を一緒に解決してきました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.length > 0 ? (
              caseStudies.map((study: any) => (
                <CaseStudyCard key={study._id} study={study} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400 bg-navy-800 rounded-2xl border border-navy-800">
                <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                事例を準備中です。Studioから事例を登録してください。
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog/Posts Section */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">福岡暮らしのコラム</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            移住に役立つ情報や、福岡での暮らしについての最新情報をお届けします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              現在、コラム記事の準備中です。StudioからPostを登録してください。
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-orange-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">まずは、お気軽にお話ししませんか？</h2>
        <p className="mb-8 text-orange-50 text-xl font-light">オンラインでのカジュアルなご相談も大歓迎です。</p>
        <Link href="/contact" className="bg-white text-orange-500 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 duration-300 shadow-xl inline-flex items-center gap-2">
          <span>無料相談を予約する</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </footer>
    </>
  );
}
