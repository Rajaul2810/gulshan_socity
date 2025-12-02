"use client";
import { useState } from "react";
import {
  TicketIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

interface CarStickerForm {
  carNumber: string;
  ownerName: string;
  phone: string;
  houseNumber: string;
  roadNumber: string;
  issueDate: string;
  expiryDate: string;
}

export default function CarStickerRegistration() {
  const [formData, setFormData] = useState<CarStickerForm>({
    carNumber: "",
    ownerName: "",
    phone: "",
    houseNumber: "",
    roadNumber: "",
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const stickerData = {
        car_number: formData.carNumber,
        owner_name: formData.ownerName,
        phone: formData.phone,
        house_number: formData.houseNumber,
        road_number: formData.roadNumber,
        issue_date: formData.issueDate,
        expiry_date: formData.expiryDate || null,
        status: 'pending', // Public submissions start as pending
      };

      const res = await fetch("/api/car-stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stickerData),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (res.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setFormData({
            carNumber: "",
            ownerName: "",
            phone: "",
            houseNumber: "",
            roadNumber: "",
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: "",
          });
          setSubmitStatus("idle");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormSection = ({
    title,
    icon: Icon,
    children,
    className = "",
  }: {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Vehicle Registration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <span className="text-gradient-primary">
              Car Sticker Registration
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Register your vehicle for a car sticker. Fill out the form below to
            submit your registration request. Our admin team will review and process your application.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Registration submitted successfully! We&apos;ll review your
              application and get back to you soon.
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              Something went wrong. Please try again or contact support.
            </span>
          </div>
        )}

        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Vehicle Information */}
          <FormSection title="Vehicle Information" icon={TicketIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Car Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="carNumber"
                  value={formData.carNumber}
                  onChange={handleChange}
                  placeholder="Enter car registration number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Optional: Leave blank if not applicable
                </p>
              </div>
            </div>
          </FormSection>

          {/* Owner Information */}
          <FormSection title="Owner Information" icon={UserIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner's full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </FormSection>

          {/* Address Information */}
          <FormSection title="Address Information" icon={HomeIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  House Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  placeholder="Enter house number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Road Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roadNumber"
                  value={formData.roadNumber}
                  onChange={handleChange}
                  placeholder="Enter road number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </FormSection>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group bg-primary cursor-pointer text-white inline-flex items-center justify-center px-8 py-4 hover:bg-gradient-primary-dark disabled:from-gray-400 disabled:to-gray-500 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <span>Submit Registration</span>
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
