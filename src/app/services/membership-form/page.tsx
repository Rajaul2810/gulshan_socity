"use client";
import { useState } from "react";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOffice2Icon, 
  HomeIcon, 
  DocumentTextIcon,
  PhotoIcon,
  IdentificationIcon,
  ReceiptPercentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

interface Child {
  name: string;
  age: string;
  gender: string;
}

interface UserForm {
  name: string;
  nameBangla: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  children: Child[];
  email: string;
  mobile: string;
  officeTel: string;
  residenceTel: string;
  designation: string;
  organization: string;
  residenceAddress: string;
  propertyOwner: string;
  propertySchedule: string;
  relationship: string;
  photo?: File | null;
  nid?: File | null;
  taxReceipt?: File | null;
}

export default function MembershipForm() {
  const [formData, setFormData] = useState<UserForm>({
    name: "",
    nameBangla: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    email: "",
    children: [],
    mobile: "",
    officeTel: "",
    residenceTel: "",
    designation: "",
    organization: "",
    residenceAddress: "",
    propertyOwner: "",
    propertySchedule: "",
    relationship: "",
    photo: null,
    nid: null,
    taxReceipt: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "", gender: "" }]
    }));
  };

  const removeChild = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value as unknown as string);
    });

    const res = await fetch("/api/membership", {
      method: "POST",
      body: payload,
    });

    if (res.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            nameBangla: "",
            fatherName: "",
            motherName: "",
            spouseName: "",
            dob: "",
            gender: "",
            bloodGroup: "",
            email: "",
            children: [],
            mobile: "",
            officeTel: "",
            residenceTel: "",
            designation: "",
            organization: "",
            residenceAddress: "",
            propertyOwner: "",
            propertySchedule: "",
            relationship: "",
            photo: null,
            nid: null,
            taxReceipt: null,
          });
          setSubmitStatus('idle');
        }, 3000);
    } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormSection = ({ title, icon: Icon, children, className = "" }: { 
    title: string; 
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InputField = ({ 
    name, 
    label,
    placeholder, 
    type = "text", 
    icon: Icon, 
    required = false,
    value,
    onChange,
    options = []
  }: {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    options?: string[];
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={3}
            className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none`}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          />
        )}
      </div>
    </div>
  );

  const FileUpload = ({ 
    name, 
    label, 
    icon: Icon, 
    accept = "*/*",
    value,
    onChange
  }: {
    name: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    accept?: string;
    value: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={onChange}
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Icon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {value ? value.name : `Click to upload ${label.toLowerCase()}`}
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8" style={{background: 'linear-gradient(to bottom right, #FDF2F0, #ffffff, #FCE4E0)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>Join Our Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <span className="text-gradient-primary">
              Membership Application
            </span>
      </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Become a part of our vibrant community. Fill out the form below to start your membership journey with Gulshan Society.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Application submitted successfully! We&apos;ll review your application and get back to you soon.
            </span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              Something went wrong. Please try again or contact support.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <FormSection title="Personal Information" icon={UserIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                icon={UserIcon}
                required
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                name="nameBangla"
                label="Name (Bangla)"
                placeholder="Enter your name in Bangla"
                value={formData.nameBangla}
                onChange={handleChange}
              />
              <InputField
                name="fatherName"
                label="Father's Name"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={handleChange}
              />
              <InputField
                name="motherName"
                label="Mother's Name"
                placeholder="Enter mother's name"
                value={formData.motherName}
                onChange={handleChange}
              />
              <InputField
                name="spouseName"
                label="Spouse Name"
                placeholder="Enter spouse's name"
                value={formData.spouseName}
                onChange={handleChange}
              />
              <InputField
                name="dob"
                label="Date of Birth"
                placeholder="Select date of birth"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <InputField
                name="gender"
                label="Gender"
                placeholder="Select Gender"
                type="select"
                value={formData.gender}
                onChange={handleChange}
                options={['Male', 'Female']}
              />
              <InputField
                name="bloodGroup"
                label="Blood Group"
                placeholder="Enter blood group"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
        </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact Information" icon={EnvelopeIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
                type="email"
                icon={EnvelopeIcon}
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                name="mobile"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                icon={PhoneIcon}
                value={formData.mobile}
                onChange={handleChange}
              />
              <InputField
                name="officeTel"
                label="Office Telephone"
                placeholder="Enter office telephone"
                icon={PhoneIcon}
                value={formData.officeTel}
                onChange={handleChange}
              />
              <InputField
                name="residenceTel"
                label="Residence Telephone"
                placeholder="Enter residence telephone"
                icon={PhoneIcon}
                value={formData.residenceTel}
                onChange={handleChange}
              />
        </div>
          </FormSection>

          {/* Children Information */}
          <FormSection title="Children Information" icon={UserGroupIcon}>
            <div className="space-y-4">
              {formData.children.map((child, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Child {index + 1}
                    </h4>
                    {formData.children.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeChild(index);
                        }}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Child&apos;s Name
                      </label>
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) => updateChild(index, 'name', e.target.value)}
                        placeholder="Enter child's name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Age
                      </label>
                      <input
                        type="text"
                        value={child.age}
                        onChange={(e) => updateChild(index, 'age', e.target.value)}
                        placeholder="Enter age"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gender
                      </label>
                      <select
                        value={child.gender}
                        onChange={(e) => updateChild(index, 'gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
        </select>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addChild();
                }}
                className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                <PlusIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Add Child
                </span>
              </button>
            </div>
          </FormSection>

          {/* Professional Information */}
          <FormSection title="Professional Information" icon={BuildingOffice2Icon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="designation"
                label="Designation/Job Title"
                placeholder="Enter your job title"
                value={formData.designation}
                onChange={handleChange}
              />
              <InputField
                name="organization"
                label="Organization/Company"
                placeholder="Enter your organization name"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Address & Property Information */}
          <FormSection title="Address & Property Information" icon={HomeIcon}>
            <div className="space-y-4">
              <InputField
                name="residenceAddress"
                label="Residence Address"
                placeholder="Enter your complete residence address"
                type="textarea"
                value={formData.residenceAddress}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  name="propertyOwner"
                  label="Property Owner"
                  placeholder="Enter property owner name"
                  value={formData.propertyOwner}
                  onChange={handleChange}
                />
                <InputField
                  name="propertySchedule"
                  label="Property Schedule"
                  placeholder="Enter property schedule"
                  value={formData.propertySchedule}
                  onChange={handleChange}
                />
              </div>
              <InputField
                name="relationship"
                label="Relationship to Property"
                placeholder="Select relationship to property"
                type="select"
                value={formData.relationship}
                onChange={handleChange}
                options={['Self', 'Father', 'Mother', 'Other']}
              />
            </div>
          </FormSection>

          {/* Document Upload */}
          <FormSection title="Required Documents" icon={DocumentTextIcon}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FileUpload
                name="photo"
                label="Profile Photo"
                icon={PhotoIcon}
                accept="image/*"
                value={formData.photo || null}
                onChange={handleFileChange}
              />
              <FileUpload
                name="nid"
                label="National ID Card"
                icon={IdentificationIcon}
                accept="image/*,.pdf"
                value={formData.nid || null}
                onChange={handleFileChange}
              />
              <FileUpload
                name="taxReceipt"
                label="Tax Receipt"
                icon={ReceiptPercentIcon}
                accept="image/*,.pdf"
                value={formData.taxReceipt || null}
                onChange={handleFileChange}
              />
        </div>
          </FormSection>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
        <button
          type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-primary hover:bg-gradient-primary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <span>Submit Application</span>
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