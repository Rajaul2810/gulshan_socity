"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: "",
    preferredContact: "email",
    termsAccepted: false,
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
          preferredContact: formData.preferredContact,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "general",
        message: "",
        preferredContact: "email",
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setFormStatus("error");
      // Reset to idle after showing error
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              <span>Contact Us</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              For inquiries or assistance, reach out to us. Join our community
              for cultural events, civic projects, and positive impact in
              Gulshan Model Town.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Contact Details
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  <PhoneIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Phone
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Call us for immediate assistance
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    +88-02-9881375
                    <br />
                    +880 1715-882117
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  <EnvelopeIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Email
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Send us an email anytime
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    gulshansociety@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  <BuildingOfficeIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Website
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Visit our website
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    www.gulshansociety.com
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Office Address
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Visit our office
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    House# 7/B, Flat# A1
                    <br />
                    Road# 103, Gulshan-2
                    <br />
                    Dhaka-1212
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Send us a Message
              </h2>

              {formStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="text-green-800 dark:text-green-300 font-semibold">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    <div>
                      <h3 className="text-red-800 dark:text-red-300 font-semibold">
                        Failed to Send Message
                      </h3>
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        Please try again later or contact us directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="membership">Membership</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="security">Security</option>
                      <option value="billing">Billing</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your inquiry"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Please provide detailed information about your inquiry..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="either">Either Email or Phone</option>
                  </select>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          {" "}
                          Privacy Policy
                        </Link>{" "}
                        of Gulshan Society. I understand that my information
                        will be used to respond to my inquiry.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Office Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Office Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BuildingOfficeIcon className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Main Office
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Gulshan Society
                      <br />
                      House # 7/B, Flat # A1, Road # 103,
                      <br />
                      Gulshan-2, Dhaka-1212.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Gulshan-2 Area
                      <br />
                      Near Gulshan Circle 2
                      <br />
                      Easy access by public transport
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Emergency Contact
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                For urgent security or maintenance issues that require immediate
                attention.
              </p>

              <a
                href="tel:+8801715882117"
                className="inline-flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <PhoneIcon className="mr-2 w-5 h-5" />
                <span>Emergency Hotline: +880 1715-882117</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
            Find Us
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3650.7258041919813!2d90.4197764!3d23.7927765!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a3f79a7a1f%3A0xd0bd813c4c162415!2sHouse%207%20B%20Flat%20A1%2C%202%20Rd%20103%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1766421643780!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
