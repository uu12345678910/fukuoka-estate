'use client';

import React from 'react';

export default function LineFAB() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end flex-col group">
            {/* Tooltip / Microcopy */}
            <div className="mb-2 bg-white text-navy-900 border border-gray-100 shadow-lg rounded-xl px-4 py-2 text-sm font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:translate-y-2 md:group-hover:translate-y-0 relative mr-0 md:mr-2">
                LINEで気軽に相談
                {/* Caret pointing right to the button */}
                <div className="absolute top-1/2 -right-2 -mt-1 w-2 h-2 bg-white border-t border-r border-gray-100 transform rotate-45 hidden md:block"></div>
                {/* Caret pointing down on mobile */}
                <div className="absolute -bottom-2 left-1/2 -ml-1 w-2 h-2 bg-white border-r border-b border-gray-100 transform rotate-45 md:hidden"></div>
            </div>

            <a
                href="http://bit.ly/4kOVqms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 duration-300 focus:outline-none focus:ring-4 focus:ring-[#06C755]/50"
                aria-label="LINEで相談する"
            >
                {/* Simple LINE icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.896 8.954 9.172 9.613.359.076.85.234 1.025.534.156.269.102.684.05 1.054-.059.418-.387 2.302-.469 2.766-.135.762.656.417 1.04.225.291-.144 3.868-2.277 5.258-3.886C22.618 18.067 24 14.402 24 10.304z" />
                </svg>
            </a>
        </div>
    );
}
