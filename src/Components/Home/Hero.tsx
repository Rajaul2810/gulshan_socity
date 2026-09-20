'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRightIcon,
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const HERO_SLIDES = [
  { src: '/heroSlider/12thEC.jpg', alt: '12th Executive Committee' },
  { src: '/heroSlider/AM10.JPG', alt: 'Gulshan Society community' },
  { src: '/heroSlider/APH06023.jpg', alt: 'Society event' },
  { src: '/heroSlider/ID3.jpg', alt: 'Community gathering' },
]

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const stats = [
    { number: '2974+', label: 'Active Members' },
    { number: '50+', label: 'Community Events' },
    { number: '24+', label: 'Years of Service' },
    { number: '100%', label: 'Community Focus' },
  ]

  const features = [
    'Community Support Programs',
    'Educational Resources',
    'Health & Wellness Initiatives',
    'Cultural Events & Celebrations',
  ]

  const goTo = useCallback((index: number) => {
    setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo])
  const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern - Line Grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000000' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute inset-0 dark:block hidden" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='0.3'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Blurry Color Corners */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary-700/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Additional subtle corner blurs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-primary-300/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-tl from-primary-400/10 to-transparent rounded-full blur-2xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-400 dark:bg-primary-600 rounded-full opacity-25 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              <span>Building Stronger Communities Together</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent dark:from-primary-400 dark:via-primary-500 dark:to-primary-300">
                  Gulshan Society
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Connecting Hearts,
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Building Futures
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join our vibrant community where neighbors become family 
                and together we create a brighter tomorrow.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-2 max-w-lg mx-auto lg:mx-0">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link 
                href="/membership-form"
                className="group inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Join Our Community</span>
                <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                href="/about"
                className="group inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary-400 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2.5 sm:p-3 overflow-hidden">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-xl overflow-hidden bg-primary-100 dark:bg-gray-700 group">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.src}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                ))}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 z-30 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm sm:text-base font-semibold drop-shadow-md truncate">
                      {HERO_SLIDES[activeSlide].alt}
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">Est. 2002 · Gulshan Society</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {HERO_SLIDES.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => goTo(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === activeSlide
                            ? 'w-5 bg-white'
                            : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-gray-900/80 text-gray-800 dark:text-white shadow-md flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-gray-900/80 text-gray-800 dark:text-white shadow-md flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-3 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
              <div className="flex items-center space-x-2">
                <HandRaisedIcon className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">Join Events</div>
                  <div className="text-xs opacity-90">Monthly gatherings</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-primary text-white p-3 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
              <div className="flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">Support</div>
                  <div className="text-xs opacity-90">Help those in need</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero