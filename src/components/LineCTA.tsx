import React from 'react';

export default function LineCTA() {
    return (
        <section className="bg-gray-50 border-t border-b border-gray-200 py-16 mt-16">
            <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#06C755]/10 text-[#06C755] rounded-full mb-6">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.896 8.954 9.172 9.613.359.076.85.234 1.025.534.156.269.102.684.05 1.054-.059.418-.387 2.302-.469 2.766-.135.762.656.417 1.04.225.291-.144 3.868-2.277 5.258-3.886C22.618 18.067 24 14.402 24 10.304z" />
                    </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">
                    福岡移住の疑問、なんでもご相談ください
                </h3>
                <p className="text-gray-700 text-lg mb-10 leading-relaxed">
                    福岡への移住や学区選びなど、ご希望の条件をLINEで教えてください。<br className="hidden md:block" />
                    ママエージェントが直接、個別のご提案をさせていただきます！
                </p>

                <a
                    href="http://bit.ly/4kOVqms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-lg md:text-xl py-4 px-10 md:px-16 rounded-full transition-transform hover:scale-105 duration-300 shadow-xl w-full sm:w-auto"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.896 8.954 9.172 9.613.359.076.85.234 1.025.534.156.269.102.684.05 1.054-.059.418-.387 2.302-.469 2.766-.135.762.656.417 1.04.225.291-.144 3.868-2.277 5.258-3.886C22.618 18.067 24 14.402 24 10.304z" />
                    </svg>
                    この情報をLINEで問い合わせる
                </a>
                <p className="mt-4 text-sm text-gray-500 font-medium">※クリックでLINEアプリが開きます</p>
            </div>
        </section>
    );
}
