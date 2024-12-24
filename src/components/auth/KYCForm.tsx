import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import type { KYCData } from '../../types/auth';

interface KYCFormProps {
  onSubmit: (data: Partial<KYCData>) => Promise<void>;
}

export default function KYCForm({ onSubmit }: KYCFormProps) {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    idCard: null,
    proofOfAddress: null,
    selfie: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof files
  ) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // In a real app, you would upload files to a secure storage
      const documents = Object.entries(files).reduce((acc, [key, file]) => ({
        ...acc,
        [key]: file ? URL.createObjectURL(file) : undefined
      }), {});

      await onSubmit({ documents: documents as KYCData['documents'] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit KYC');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            ID Card or Passport
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={e => handleFileChange(e, 'idCard')}
              accept="image/*"
              className="hidden"
              id="idCard"
            />
            <label
              htmlFor="idCard"
              className="flex items-center justify-center gap-2 w-full py-8 border-2 
                       border-dashed border-gray-700 rounded-lg cursor-pointer
                       hover:border-[#05fabd] transition-colors"
            >
              <Upload className="w-6 h-6" />
              <span>{files.idCard?.name || 'Upload ID Card'}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Proof of Address
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={e => handleFileChange(e, 'proofOfAddress')}
              accept="image/*,.pdf"
              className="hidden"
              id="proofOfAddress"
            />
            <label
              htmlFor="proofOfAddress"
              className="flex items-center justify-center gap-2 w-full py-8 border-2 
                       border-dashed border-gray-700 rounded-lg cursor-pointer
                       hover:border-[#05fabd] transition-colors"
            >
              <Upload className="w-6 h-6" />
              <span>{files.proofOfAddress?.name || 'Upload Proof of Address'}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Selfie with ID
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={e => handleFileChange(e, 'selfie')}
              accept="image/*"
              className="hidden"
              id="selfie"
            />
            <label
              htmlFor="selfie"
              className="flex items-center justify-center gap-2 w-full py-8 border-2 
                       border-dashed border-gray-700 rounded-lg cursor-pointer
                       hover:border-[#05fabd] transition-colors"
            >
              <Upload className="w-6 h-6" />
              <span>{files.selfie?.name || 'Upload Selfie'}</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !Object.values(files).some(Boolean)}
        className="w-full bg-[#05fabd] text-gray-900 py-3 rounded-lg font-medium 
                 hover:bg-opacity-90 transition-opacity disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit KYC Documents'}
      </button>
    </form>
  );
}