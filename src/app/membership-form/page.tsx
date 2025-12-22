"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  HomeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface Child {
  name: string;
  age: string;
  gender: string;
}

interface UserForm {
  // Membership Type & Declaration
  membershipType: string;
  declaration: boolean;
  proposerName: string;
  proposerMembershipNo: string;
  seconderName: string;
  seconderMembershipNo: string;
  
  // Personal Information
  name: string;
  nameBangla: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  profession: string;
  children: Child[];
  
  // Contact Information
  email: string;
  mobile: string;
  officeTel: string;
  residenceTel: string;
  
  // Professional
  designation: string;
  organization: string;
  residenceAddress: string;
  
  // Property Information
  propertyOwner: string;
  propertySchedule: string;
  relationship: string;
  
  // Documents
  photo?: File | null;
  nid?: File | null;
  taxReceipt?: File | null;
  leaseAgreement?: File | null;
  tradeLicense?: File | null;
  tinBinCertificate?: File | null;
}

interface MembershipFormProps {
  isAdmin?: boolean;
  applicationId?: string;
}

function MembershipFormContent({ isAdmin = false, applicationId }: MembershipFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adminMode = isAdmin || searchParams.get('admin') === 'true';
  const appId = applicationId || searchParams.get('applicationId');

  const [formData, setFormData] = useState<UserForm>({
    membershipType: "",
    declaration: false,
    proposerName: "",
    proposerMembershipNo: "",
    seconderName: "",
    seconderMembershipNo: "",
    name: "",
    nameBangla: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    profession: "",
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
    leaseAgreement: null,
    tradeLicense: null,
    tinBinCertificate: null,
  });

  const [adminFields, setAdminFields] = useState({
    membership_number: "",
    zone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [loading, setLoading] = useState(false);

  // Load application data if applicationId is provided
  useEffect(() => {
    if (appId && adminMode) {
      loadApplicationData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId, adminMode]);

  const loadApplicationData = async () => {
    if (!appId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/membership/${appId}`);
      const { data, error } = await response.json();

      if (error) throw new Error(error);

      if (data) {
        // Map database fields to form fields
        setFormData({
          membershipType: data.membership_type || "",
          declaration: true,
          proposerName: data.proposer_name || "",
          proposerMembershipNo: data.proposer_membership_no || "",
          seconderName: data.seconder_name || "",
          seconderMembershipNo: data.seconder_membership_no || "",
          name: data.name || "",
          nameBangla: data.name_bangla || "",
          fatherName: data.father_name || "",
          motherName: data.mother_name || "",
          spouseName: data.spouse_name || "",
          dob: data.date_of_birth || "",
          gender: data.gender === 'M' ? 'Male' : data.gender === 'F' ? 'Female' : "",
          bloodGroup: data.blood_group || "",
          profession: data.profession || "",
          email: data.email || "",
          children: data.children || [],
          mobile: data.mobile || "",
          officeTel: data.office_tel || "",
          residenceTel: data.residence_tel || "",
          designation: data.designation || "",
          organization: data.organization || "",
          residenceAddress: data.residence_address || "",
          propertyOwner: data.property_owner || "",
          propertySchedule: data.property_schedule || "",
          relationship: data.relationship_to_property || "",
          photo: null,
          nid: null,
          taxReceipt: null,
          leaseAgreement: null,
          tradeLicense: null,
          tinBinCertificate: null,
        });

        setAdminFields({
          membership_number: data.membership_number || "",
          zone: data.zone || "",
        });
      }
    } catch (error) {
      console.error('Error loading application:', error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Validate file size (max 5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        alert(`File ${files[0].name} is too large. Maximum size is 5MB.`);
        return;
      }
      // Validate file type (images or PDFs)
      const isValidFile = files[0].type.startsWith('image/') || files[0].type === 'application/pdf';
      if (!isValidFile) {
        alert(`File ${files[0].name} is not a valid file type. Please upload an image (JPG, PNG) or PDF.`);
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: null }));
    }
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "", gender: "" }],
    }));
  };

  const removeChild = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.map((child, i) =>
        i === index ? { ...child, [field]: value } : child
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (adminMode) {
        // Admin mode: Create member directly or update application
        interface MemberData {
          membership_number: string;
          membership_type: string;
          zone: string;
          name: string;
          name_bangla?: string;
          father_name?: string;
          mother_name?: string;
          spouse_name?: string;
          date_of_birth?: string;
          gender?: string | null;
          blood_group?: string;
          profession?: string;
          email?: string;
          mobile?: string;
          office_tel?: string;
          residence_tel?: string;
          designation?: string;
          organization?: string;
          residence_address?: string;
          property_owner?: string;
          property_schedule?: string;
          relationship_to_property?: string;
          proposer_name?: string;
          proposer_membership_no?: string;
          seconder_name?: string;
          seconder_membership_no?: string;
          children?: Child[];
          status: string;
          membership_date: string;
          photo_url?: string;
        }

        const memberData: MemberData = {
          membership_number: adminFields.membership_number,
          membership_type: formData.membershipType,
          zone: adminFields.zone,
          name: formData.name,
          name_bangla: formData.nameBangla,
          father_name: formData.fatherName,
          mother_name: formData.motherName,
          spouse_name: formData.spouseName,
          date_of_birth: formData.dob,
          gender: formData.gender === 'Male' ? 'M' : formData.gender === 'Female' ? 'F' : null,
          blood_group: formData.bloodGroup,
          profession: formData.profession,
          email: formData.email,
          mobile: formData.mobile,
          office_tel: formData.officeTel,
          residence_tel: formData.residenceTel,
          designation: formData.designation,
          organization: formData.organization,
          residence_address: formData.residenceAddress,
          property_owner: formData.propertyOwner,
          property_schedule: formData.propertySchedule,
          relationship_to_property: formData.relationship,
          proposer_name: formData.proposerName,
          proposer_membership_no: formData.proposerMembershipNo,
          seconder_name: formData.seconderName,
          seconder_membership_no: formData.seconderMembershipNo,
          children: formData.children,
          status: 'active',
          membership_date: new Date().toISOString().split('T')[0],
        };

        // Helper function to upload documents using the main API route approach
        const uploadDocument = async (file: File | null, folder: string): Promise<string | null> => {
          if (!file) return null;
          
          try {
            // Create FormData with file and folder
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('folder', folder);
            
            // Use the upload-image endpoint (now supports PDFs and custom folders)
            const uploadRes = await fetch('/api/membership/upload-image', {
              method: 'POST',
              body: uploadFormData,
            });
            
            const uploadResult = await uploadRes.json();
            if (uploadResult.error) {
              console.error(`Error uploading ${folder}:`, uploadResult.error);
              return null;
            }
            return uploadResult.data?.url || null;
          } catch (error) {
            console.error(`Error uploading ${folder}:`, error);
            return null;
          }
        };

        // Upload all documents
        if (formData.photo) {
          const photoUrl = await uploadDocument(formData.photo, 'photos');
          if (photoUrl) memberData.photo_url = photoUrl;
        }
        const nidUrl = await uploadDocument(formData.nid || null, 'nid');
        const taxReceiptUrl = await uploadDocument(formData.taxReceipt || null, 'tax-receipts');
        const leaseAgreementUrl = await uploadDocument(formData.leaseAgreement || null, 'lease-agreements');
        const tradeLicenseUrl = await uploadDocument(formData.tradeLicense || null, 'trade-licenses');
        const tinBinCertificateUrl = await uploadDocument(formData.tinBinCertificate || null, 'certificates');

        let response;
        if (appId) {
          // Update existing application and approve
          response = await fetch(`/api/membership/${appId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...memberData,
              membership_number: adminFields.membership_number,
              zone: adminFields.zone,
              status: 'approved',
              nid_url: nidUrl,
              tax_receipt_url: taxReceiptUrl,
              lease_agreement_url: leaseAgreementUrl,
              trade_license_url: tradeLicenseUrl,
              tin_bin_certificate_url: tinBinCertificateUrl,
            }),
          });
        } else {
          // Create new member directly
          response = await fetch('/api/members/admin-create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(memberData),
          });
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        setSubmitStatus("success");
        setTimeout(() => {
          if (adminMode) {
            router.push('/admin/members');
          } else {
            // Reset form for public users
            setFormData({
              membershipType: "",
              declaration: false,
              proposerName: "",
              proposerMembershipNo: "",
              seconderName: "",
              seconderMembershipNo: "",
              name: "",
              nameBangla: "",
              fatherName: "",
              motherName: "",
              spouseName: "",
              dob: "",
              gender: "",
              bloodGroup: "",
              profession: "",
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
              leaseAgreement: null,
              tradeLicense: null,
              tinBinCertificate: null,
            });
            setSubmitStatus("idle");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 2000);
      } else {
        // Public mode: Submit application
        const payload = new FormData();
        
        // Add all text fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'children') {
            payload.append(key, JSON.stringify(value));
          } else if (key === 'declaration') {
            payload.append(key, value ? 'true' : 'false');
          } else if (key !== 'photo' && key !== 'nid' && key !== 'taxReceipt' && 
                     key !== 'leaseAgreement' && key !== 'tradeLicense' && key !== 'tinBinCertificate') {
            if (value) payload.append(key, value as string);
          }
        });
        
        // Add all document files
        if (formData.photo) payload.append('photo', formData.photo);
        if (formData.nid) payload.append('nid', formData.nid);
        if (formData.taxReceipt) payload.append('taxReceipt', formData.taxReceipt);
        if (formData.leaseAgreement) payload.append('leaseAgreement', formData.leaseAgreement);
        if (formData.tradeLicense) payload.append('tradeLicense', formData.tradeLicense);
        if (formData.tinBinCertificate) payload.append('tinBinCertificate', formData.tinBinCertificate);

        const res = await fetch("/api/membership", {
          method: "POST",
          body: payload,
        });

        if (res.ok) {
          setSubmitStatus("success");
          setTimeout(() => {
            setFormData({
              membershipType: "",
              declaration: false,
              proposerName: "",
              proposerMembershipNo: "",
              seconderName: "",
              seconderMembershipNo: "",
              name: "",
              nameBangla: "",
              fatherName: "",
              motherName: "",
              spouseName: "",
              dob: "",
              gender: "",
              bloodGroup: "",
              profession: "",
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
              leaseAgreement: null,
              tradeLicense: null,
              tinBinCertificate: null,
            });
            setSubmitStatus("idle");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 3000);
        } else {
          setSubmitStatus("error");
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading application data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>{adminMode ? 'Admin' : 'Join Our Community'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            <span className="text-gradient-primary">
              {adminMode ? 'Add New Member' : 'Membership Application'}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {adminMode 
              ? 'Fill out all member information below to add a new member to the system.'
              : 'Become a part of our vibrant community. Fill out the form below to start your membership journey with Gulshan Society.'}
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Application submitted successfully! We&apos;ll review your
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
          {/* Admin Fields */}
          {adminMode && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">  
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Admin Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Membership Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={adminFields.membership_number}
                    onChange={(e) => setAdminFields({ ...adminFields, membership_number: e.target.value })}
                    placeholder="Enter membership number"
                    required={adminMode}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={adminFields.zone}
                    onChange={(e) => setAdminFields({ ...adminFields, zone: e.target.value })}
                    required={adminMode}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  >
                    <option value="">Select Zone</option>
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                    <option value="Zone 3">Zone 3</option>
                    <option value="Zone 4">Zone 4</option>
                    <option value="Zone 5">Zone 5</option>
                    <option value="Zone 6">Zone 6</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Membership Type & Declaration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Membership Type & Declaration
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type of Membership <span className="text-red-500">*</span>
                </label>
                <select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                >
                  <option value="">Select membership type</option>
                  <option value="Life">Life</option>
                  <option value="Affiliate">Affiliate</option>
                  <option value="Associate">Associate</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
              
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  I hereby declare that I wish to become a <strong>{formData.membershipType || "_______"}</strong> member of Gulshan Society. 
                  I agree to abide by the constitution and rules of the society. I enclose herewith the personal information 
                  and a cheque/P.O./D.D. for the specified amount in favor of Gulshan Society for Membership.
                </p>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="declaration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I agree to the above declaration and terms <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Proposer Information</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Proposer Name
                    </label>
                    <input
                      type="text"
                      name="proposerName"
                      value={formData.proposerName}
                      onChange={handleChange}
                      placeholder="Enter proposer name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Proposer Membership Number
                    </label>
                    <input
                      type="text"
                      name="proposerMembershipNo"
                      value={formData.proposerMembershipNo}
                      onChange={handleChange}
                      placeholder="Enter membership number"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Seconder Information</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seconder Name
                    </label>
                    <input
                      type="text"
                      name="seconderName"
                      value={formData.seconderName}
                      onChange={handleChange}
                      placeholder="Enter seconder name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seconder Membership Number
                    </label>
                    <input
                      type="text"
                      name="seconderMembershipNo"
                      value={formData.seconderMembershipNo}
                      onChange={handleChange}
                      placeholder="Enter membership number"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name (Bangla)
                </label>
                <input
                  type="text"
                  name="nameBangla"
                  value={formData.nameBangla}
                  onChange={handleChange}
                  placeholder="Enter your name in Bangla"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Father&apos;s Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mother&apos;s Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Enter mother's name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Spouse Name
                </label>
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  placeholder="Enter spouse's name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blood Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Enter blood group"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Enter your profession"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <EnvelopeIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Office Telephone
                </label>
                <input
                  type="tel"
                  name="officeTel"
                  value={formData.officeTel}
                  onChange={handleChange}
                  placeholder="Enter office telephone"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Residence Telephone
                </label>
                <input
                  type="tel"
                  name="residenceTel"
                  value={formData.residenceTel}
                  onChange={handleChange}
                  placeholder="Enter residence telephone"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Children Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <UserGroupIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Children Information
              </h3>
            </div>
            <div className="space-y-4">
              {formData.children.map((child, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                >
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Child&apos;s Name
                      </label>
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) =>
                          updateChild(index, "name", e.target.value)
                        }
                        placeholder="Enter child's name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Age
                      </label>
                      <input
                        type="text"
                        value={child.age}
                        onChange={(e) =>
                          updateChild(index, "age", e.target.value)
                        }
                        placeholder="Enter age"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        value={child.gender}
                        onChange={(e) =>
                          updateChild(index, "gender", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
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
          </div>

          {/* Professional Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <BuildingOffice2Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Professional Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Designation/Job Title
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter your job title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization/Company
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address & Property Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Address & Property Information
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Residence Address
                </label>
                <textarea
                  name="residenceAddress"
                  value={formData.residenceAddress}
                  onChange={handleChange}
                  placeholder="Enter your complete residence address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Owner
                  </label>
                  <input
                    type="text"
                    name="propertyOwner"
                    value={formData.propertyOwner}
                    onChange={handleChange}
                    placeholder="Enter property owner name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Schedule
                  </label>
                  <input
                    type="text"
                    name="propertySchedule"
                    value={formData.propertySchedule}
                    onChange={handleChange}
                    placeholder="Enter property schedule"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Relationship to Property
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                >
                  <option value="">Select relationship to property</option>
                  <option value="Self">Self</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">  
              <div className="p-2 bg-gradient-primary rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Required Documents
              </h3>
            </div>
            <div className="space-y-6">
              {/* Profile Photo - Required for all */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photograph PP Size (2 Copies) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                />
                {formData.photo && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.photo.name}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image files only (JPG, PNG). Max size: 5MB</p>
              </div>

              {/* NID Card - Required for all */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo Copy of NID Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="nid"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                />
                {formData.nid && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.nid.name}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image or PDF. Max size: 5MB</p>
              </div>

              {/* Tax Receipt - Required for all */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo Copy of Most Recent Holding Tax Receipt of DNCC or Registered Sale Deed or Share Documents Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="taxReceipt"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                />
                {formData.taxReceipt && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.taxReceipt.name}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image or PDF. Max size: 5MB</p>
              </div>

              {/* Lease Agreement - Required for Associate Membership */}
              {(formData.membershipType === 'Associate' || formData.membershipType === 'Corporate') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.membershipType === 'Associate' 
                      ? 'Photo Copy of Valid Lease Agreement or Most Recent Rental Money Receipt' 
                      : 'Valid Lease Agreement / Proof of Ownership'}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="leaseAgreement"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    required={formData.membershipType === 'Associate' || formData.membershipType === 'Corporate'}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                  />
                  {formData.leaseAgreement && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.leaseAgreement.name}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image or PDF. Max size: 5MB</p>
                </div>
              )}

              {/* Corporate Membership Documents */}
              {formData.membershipType === 'Corporate' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Photo Copy of Trade License / RJSC / Corporation Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="tradeLicense"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      required
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                    />
                    {formData.tradeLicense && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.tradeLicense.name}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image or PDF. Max size: 5MB</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Photo Copy of TIN / BIN Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="tinBinCertificate"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      required
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer"
                    />
                    {formData.tinBinCertificate && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.tinBinCertificate.name}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Image or PDF. Max size: 5MB</p>
                  </div>
                </>
              )}
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

export default function MembershipForm(props: MembershipFormProps = {}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <MembershipFormContent {...props} />
    </Suspense>
  );
}
