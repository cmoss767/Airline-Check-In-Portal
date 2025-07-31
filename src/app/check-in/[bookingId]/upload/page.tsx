'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { DocumentUploadFormInputs } from '@/types';
import { useCheckInStatus } from '@/hooks/useCheckInStatus';
import { useEffect } from 'react';

export default function UploadPage() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = params.bookingId;
  const router = useRouter();

  // Fetch status to check if a document is already uploaded
  const { displayData, isLoading } = useCheckInStatus();

  useEffect(() => {
    // If data is loaded and a document URL exists, redirect to status
    if (displayData && displayData.documentUrl) {
      router.push(`/status?bookingId=${bookingId}`);
    }
  }, [displayData, bookingId, router]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentUploadFormInputs>();

  const mutation = useDocumentUpload(bookingId);

  const onSubmit: SubmitHandler<DocumentUploadFormInputs> = (data) => {
    const file = data.document[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    mutation.mutate(formData);
  };
  
  // Render a loading state or nothing while checking status
  if (isLoading || (displayData && displayData.documentUrl)) {
    return <p className="p-8 text-center">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center p-12 md:p-24 bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Upload Your Document
        </h1>
        <p className="text-sm text-center text-brand-text">
          Upload your passport or other identification.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="document" className="block text-sm font-medium text-brand-text">
              Select Document
            </label>
            <input
              id="document"
              type="file"
              {...register('document', { required: 'Please select a file to upload.' })}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-50 file:text-brand-blue-600 hover:file:bg-brand-blue-100"
            />
            {errors.document && <p className="text-sm text-brand-red">{errors.document.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400"
            >
              {mutation.isPending ? 'Uploading...' : 'Upload & Complete Check-In'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
