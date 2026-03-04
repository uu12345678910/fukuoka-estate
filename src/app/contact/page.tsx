'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LineCTA from '@/components/LineCTA';

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle the form submission here (e.g., API call)
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-6">
                <div className="bg-white p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-navy-900 mb-4">お問い合わせを送信しました</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        お問い合わせありがとうございます。<br />
                        内容を確認し、担当のエージェント（ママ）より通常2営業日以内にご返信いたします。
                    </p>
                    <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 duration-300 shadow-md">
                        トップページへ戻る
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white py-12 text-center border-b border-gray-200">
                <h1 className="text-3xl md:text-5xl font-bold text-navy-900 mb-4">無料相談のご予約</h1>
                <p className="text-gray-600">福岡での暮らしやお住まい探しについて、お気軽にご相談ください。</p>
            </header>

            <div className="flex-grow container mx-auto px-6 lg:px-12 py-12 max-w-3xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-bold text-navy-900 mb-2">姓 <span className="text-red-500 text-xs">必須</span></label>
                                <input required type="text" id="lastName" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3" placeholder="山田" />
                            </div>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-bold text-navy-900 mb-2">名 <span className="text-red-500 text-xs">必須</span></label>
                                <input required type="text" id="firstName" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3" placeholder="太郎" />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-navy-900 mb-2">メールアドレス <span className="text-red-500 text-xs">必須</span></label>
                            <input required type="email" id="email" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3" placeholder="info@example.com" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-navy-900 mb-2">電話番号</label>
                            <input type="tel" id="phone" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3" placeholder="090-1234-5678" />
                        </div>

                        {/* Consultation Type */}
                        <div>
                            <label className="block text-sm font-bold text-navy-900 mb-3">ご相談内容（複数選択可）</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {["移住に関するご相談", "物件探し（購入・賃貸）", "高校進学・学区選び", "自営業・フリーランスの審査相談", "その他"].map((item) => (
                                    <label key={item} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                                        <input type="checkbox" value={item} className="w-5 h-5 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-navy-900 mb-2">詳細なご要望・ご質問 <span className="text-gray-400 text-xs font-normal ml-2">任意</span></label>
                            <textarea id="message" rows={5} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3" placeholder="ここにご自身のご状況や、特に知りたいエリア情報などをお気軽にご記入ください。"></textarea>
                        </div>

                        {/* Submit */}
                        <div className="pt-6 text-center">
                            <button type="submit" className="w-full md:w-auto bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-16 rounded-full transition-transform hover:scale-105 duration-300 shadow-xl text-lg flex items-center justify-center gap-2 mx-auto">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                この内容で送信する
                            </button>
                            <p className="mt-4 text-xs text-gray-500">
                                ※送信ボタンを押すことで、プライバシーポリシーに同意したものとみなされます。
                            </p>
                        </div>
                    </form>
                </div>

                {/* Back button */}
                <div className="mt-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:text-orange-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        ホームに戻る
                    </Link>
                </div>
            </div>

            {/* LINE fallback CTA */}
            <LineCTA />
        </main>
    );
}
