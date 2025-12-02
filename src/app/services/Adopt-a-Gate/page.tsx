"use client";
import { useState } from "react";
import {
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserIcon,
  PhoneIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface AdoptAGateForm {
  adopterType: string;
  name: string;
  address: string;
  residentType: string;
  isMember: boolean;
  membershipNumber: string;
  gateRoadNumber: string;
  gulshanArea: string;
  adoptionStartDate: string;
  adoptionEndDate: string;
  mobile: string;
  email: string;
  termsAccepted: boolean;
}

export default function AdoptAGate() {
  const [formData, setFormData] = useState<AdoptAGateForm>({
    adopterType: "",
    name: "",
    address: "",
    residentType: "",
    isMember: false,
    membershipNumber: "",
    gateRoadNumber: "",
    gulshanArea: "",
    adoptionStartDate: "",
    adoptionEndDate: "",
    mobile: "",
    email: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const registrationData = {
        adopter_type: formData.adopterType,
        name: formData.name,
        address: formData.address,
        resident_type: formData.residentType || null,
        is_member: formData.isMember,
        membership_number: formData.isMember ? formData.membershipNumber : null,
        gate_road_number: formData.gateRoadNumber,
        gulshan_area: formData.gulshanArea || null,
        adoption_start_date: formData.adoptionStartDate,
        adoption_end_date: formData.adoptionEndDate,
        mobile: formData.mobile,
        email: formData.email || null,
        terms_accepted: formData.termsAccepted,
        status: 'pending', // Public submissions start as pending
      };

      const res = await fetch("/api/adopt-a-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (res.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setFormData({
            adopterType: "",
            name: "",
            address: "",
            residentType: "",
            isMember: false,
            membershipNumber: "",
            gateRoadNumber: "",
            gulshanArea: "",
            adoptionStartDate: "",
            adoptionEndDate: "",
            mobile: "",
            email: "",
            termsAccepted: false,
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

  return (
    <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Community Initiative</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <span className="text-gradient-primary">
              Adopt a Gate Registration
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join our community initiative to maintain and beautify Gulshan gates. 
            Fill out the form below to register for the Adopt a Gate program.
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
          {/* Type of Adopter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Type of Adopter
              </h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                1. Type of Adopter <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="adopterType"
                    value="Personal"
                    checked={formData.adopterType === "Personal"}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Personal</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="adopterType"
                    value="Commercial"
                    checked={formData.adopterType === "Commercial"}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Commercial</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="adopterType"
                    value="Family"
                    checked={formData.adopterType === "Family"}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Family</span>
                </label>
              </div>
            </div>
          </div>

          {/* Gate Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <MapPinIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Details of Gate
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  2. Gate Road Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="gateRoadNumber"
                  value={formData.gateRoadNumber}
                  onChange={handleChange}
                  placeholder="Enter gate road number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Gulshan Area <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="gulshanArea"
                      value="Gulshan 1"
                      checked={formData.gulshanArea === "Gulshan 1"}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Gulshan 1</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="gulshanArea"
                      value="Gulshan 2"
                      checked={formData.gulshanArea === "Gulshan 2"}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Gulshan 2</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Adoption Period */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Period of Adoption
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  3. From Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="adoptionStartDate"
                  value={formData.adoptionStartDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="adoptionEndDate"
                  value={formData.adoptionEndDate}
                  onChange={handleChange}
                  required
                  min={formData.adoptionStartDate}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Adopter Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Adopter Information
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  4. Name of Adopter <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter adopter name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  5. Address of Adopter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  6. Type of Resident
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="residentType"
                      value="Permanent"
                      checked={formData.residentType === "Permanent"}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Permanent</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="residentType"
                      value="Tenant"
                      checked={formData.residentType === "Tenant"}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Tenant</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  7. Are you a member of Gulshan Society?
                </label>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="isMember"
                      checked={formData.isMember === true}
                      onChange={() => setFormData({ ...formData, isMember: true })}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Yes</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="isMember"
                      checked={formData.isMember === false}
                      onChange={() => setFormData({ ...formData, isMember: false, membershipNumber: "" })}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
                {formData.isMember && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      If yes, Gulshan Society Membership Number
                    </label>
                    <input
                      type="text"
                      name="membershipNumber"
                      value={formData.membershipNumber}
                      onChange={handleChange}
                      placeholder="Enter membership number"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <PhoneIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  8. Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  9. E-mail Address (if any)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Terms and Conditions
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="w-full text-left flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <span>View Terms and Conditions</span>
                  <span className="text-primary">{showTerms ? '▲' : '▼'}</span>
                </button>
                {showTerms && (
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p><strong>1.</strong> The program is called &quot;Adopt a Gate&quot;.</p>
                    <p><strong>2.</strong> A dedicated Community Worker will be assigned for the Adopted Gate.</p>
                    <p><strong>3.</strong> Community Worker responsibilities include: keeping the gate clean, controlling traffic, reporting suspicious activity, and other tasks for communal betterment.</p>
                    <p><strong>4.</strong> The <strong>Adopter</strong> must pay Tk. 3,00,000/- (Three Lac) as the adoption cost for a two-year duration.</p>
                    <p><strong>5.</strong> Payment preferred via account payee cheque made out to <strong>Gulshan Society</strong> for Tk. 3,00,000/-. Cash payment is also accepted, and a money receipt will be provided by the Gulshan Society office.</p>
                    <p><strong>6.</strong> The <strong>Adopter</strong> has the right, with permission from <strong>Gulshan Society</strong>, to post advertisements for their organization on the M.S. plate of the adopted gate.</p>
                    <p><strong>7.</strong> The <strong>Adopter</strong> has the right to inform <strong>Gulshan Society</strong> about any issues, problems, or reasonable demands concerning the <strong>Adopted Gate</strong>. <strong>Gulshan Society</strong> will coordinate with authorities like the Dhaka Metropolitan Police (DMP), Dhaka North City Corporation (DNCC), or other government agencies to resolve such matters.</p>
                    <p><strong>8.</strong> <strong>Gulshan Society</strong> reserves the right to amend the terms and conditions at its discretion.</p>
                  </div>
                )}
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="termsAccepted" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  I agree to the Terms and Conditions of the Adopt A Gate programme <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>

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
