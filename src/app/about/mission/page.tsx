"use client";

import React from "react";
import Link from "next/link";
import {
  GlobeAltIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { futurePlan } from "@/lib/regularActivitiesData";

const Mission = () => {
  const goals = [
    {
      title: "Community Development",
      description:
        "Foster a thriving, connected community where every member feels valued and supported.",
      icon: UserGroupIcon,
      timeline: "Ongoing",
    },
    {
      title: "Digital Transformation",
      description:
        "Modernize our services and communication to better serve our members.",
      icon: GlobeAltIcon,
      timeline: "2024-2025",
    },
    {
      title: "Sustainability",
      description:
        "Implement eco-friendly practices and green initiatives throughout our community.",
      icon: HeartIcon,
      timeline: "2025-2026",
    },
    {
      title: "Youth Engagement",
      description:
        "Create more opportunities for young people to participate in community activities.",
      icon: SparklesIcon,
      timeline: "2024-2027",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GlobeAltIcon className="w-4 h-4" />
              <span>Mission & Vision</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Mission</span> & Vision
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the guiding principles and aspirations that drive our
              community forward, creating a better tomorrow for all our members.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a vibrant, inclusive, and sustainable community where
                every member can thrive, grow, and contribute to the collective
                well-being of our society.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We are committed to fostering strong relationships, promoting
                cultural diversity, and providing essential services that
                enhance the quality of life for all our members.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about/history"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Our History</span>
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>

                <Link
                  href="/about/previous-ec"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary hover:border-primary-800 text-primary hover:text-primary-800 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Leadership</span>
                </Link>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
                  <HeartIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Building Community Together
                </h3>
                <p className="text-gray-600">
                  Every initiative, every event, and every service we provide is
                  designed to strengthen the bonds within our community and
                  create lasting positive impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Vision</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 mb-6">
                To be the leading community organization that sets the standard
                for inclusive growth, sustainable development, and member
                satisfaction.
              </p>
              <p className="text-lg text-gray-600">
                We envision a future where Gulshan Society serves as a model
                community that other organizations look to for inspiration and
                best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            গুলশান সোসাইটির <span className="text-primary">ভবিষ্যৎ পরিকল্পনা            </span>
            </h2>
            <p className=" text-gray-600 max-w-2xl mx-auto">
            গুলশান সোসাইটির ভবিষ্যৎ পরিকল্পনা, যা আমাদের নির্ণায়ক নীতি এবং আমাদের সম্প্রদায়ের মানবতাকে নির্ধারণ করে।
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futurePlan.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-gray-600 flex-1">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Strategic <span className="text-primary">Goals</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our roadmap for the future, outlining key objectives and
              milestones we aim to achieve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {goals.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {goal.title}
                        </h3>
                        <span className="text-sm font-semibold text-primary bg-primary-100 px-3 py-1 rounded-full">
                          {goal.timeline}
                        </span>
                      </div>

                      <p className="text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Be Part of Our Mission
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join us in building a stronger, more connected community where
            everyone can thrive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UserGroupIcon className="mr-2 w-4 h-4" />
              <span>Join Our Community</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Learn More About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
