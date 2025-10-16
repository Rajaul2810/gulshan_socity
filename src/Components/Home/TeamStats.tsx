'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  UsersIcon,
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon,
  HandRaisedIcon,
  HomeIcon,
  MegaphoneIcon,
  BuildingOfficeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface TeamStat {
  id: string
  title: string
  count: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  suffix?: string
}

const TeamStats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const teamStats: TeamStat[] = [
    {
      id: 'registered-members',
      title: 'Registered Members',
      count: 1284,
      icon: UsersIcon,
      color: 'primary'
    },
    {
      id: 'community-engagement',
      title: 'Community Engagement Team',
      count: 28,
      icon: UserGroupIcon,
      color: 'primary'
    },
    {
      id: 'community-allies',
      title: 'Community Allies',
      count: 85,
      icon: HeartIcon,
      color: 'primary'
    },
    {
      id: 'community-support',
      title: 'Community Support Squad',
      count: 46,
      icon: ShieldCheckIcon,
      color: 'primary'
    },
    {
      id: 'unity-task-force',
      title: 'Unity Task Force',
      count: 44,
      icon: HandRaisedIcon,
      color: 'primary'
    },
    {
      id: 'peacekeeping-corps',
      title: 'Peacekeeping Corps',
      count: 317,
      icon: ShieldCheckIcon,
      color: 'primary'
    },
    {
      id: 'neighborhood-safety',
      title: 'Neighborhood Safety Team',
      count: 16,
      icon: HomeIcon,
      color: 'primary'
    },
    {
      id: 'community-advocates',
      title: 'Community Advocates',
      count: 24,
      icon: MegaphoneIcon,
      color: 'primary'
    },
    {
      id: 'neighborhood-stewards',
      title: 'Neighborhood Stewards',
      count: 8400,
      icon: BuildingOfficeIcon,
      color: 'primary'
    },
    {
      id: 'cooperative-allies',
      title: 'Cooperative Allies',
      count: 35,
      icon: HandRaisedIcon,
      color: 'primary'
    }
  ]


  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Animated Counter Component
  const AnimatedCounter: React.FC<{ target: number; duration?: number }> = ({ 
    target, 
    duration = 2000 
  }) => {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
      if (!isVisible || hasAnimated) return

      setHasAnimated(true)
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(startValue + (target - startValue) * easeOutQuart)
        
        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [target, duration, hasAnimated])

    return <span>{count.toLocaleString()}</span>
  }

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gray-900 dark:bg-black">
      {/* Dark background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800"></div>
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-800/30 dark:bg-primary-700/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-700/25 dark:bg-primary-600/35 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-600/20 dark:bg-primary-500/30 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800/90 dark:bg-gray-700/90 backdrop-blur-sm border border-primary-600 dark:border-primary-500 text-primary-300 dark:text-primary-200 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl">
            <SparklesIcon className="w-4 h-4" />
            <span>Our Dedicated Team</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">Dedicated Team</span>
          </h2>
          
          <p className="text-lg text-gray-300 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate individuals and teams who make Gulshan Society a thriving, 
            supportive community for all residents.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {teamStats.map((stat, index) => {
            const IconComponent = stat.icon
            
            return (
              <div 
                key={stat.id}
                className="group relative bg-gray-800/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/50 dark:border-gray-500/50 hover:border-primary-400 dark:hover:border-primary-300 transform hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-primary-800/40 dark:bg-primary-700/50 rounded-xl mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/30 dark:group-hover:shadow-primary-400/40 transition-all duration-300`}>
                  <IconComponent className={`w-6 h-6 text-primary-300 dark:text-primary-200`} />
                </div>

                {/* Count */}
                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-primary-300 dark:group-hover:from-primary-300 dark:group-hover:to-primary-200 transition-all duration-300">
                    <AnimatedCounter target={stat.count} />
                    {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-200 dark:text-gray-300 leading-tight group-hover:text-primary-300 dark:group-hover:text-primary-200 transition-colors duration-300">
                  {stat.title}
                </h3>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-primary-400 dark:bg-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamStats
