'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  uploadDocumentAction,
  startDocumentProcessingAction,
} from '@/app/check-in/[bookingId]/upload/actions';
import { UploadResult } from '@/types';

export const useDocumentUpload = (bookingId: string) => {
  const router = useRouter();

  const processMutation = useMutation({
    mutationFn: startDocumentProcessingAction,
    onSuccess: () => {
      // On successful processing, redirect to the status page without the optimistic flag
      router.push(`/status?bookingId=${bookingId}`);
    },
    onError: (err: any) => {
      alert(`Error during document processing: ${err.message}`);
      // Redirect to the status page anyway to show the current (likely 'PROCESSING') status
      router.push(`/status?bookingId=${bookingId}`);
    },
  });

  const uploadMutation = useMutation<UploadResult, Error, FormData>({
    mutationFn: (formData) => uploadDocumentAction(bookingId, formData),
    onSuccess: (data) => {
      // Start the async processing job, but don't wait for it.
      // The optimistic navigation has already happened.
      processMutation.mutate(data.checkInId);
    },
    onError: (err: any) => {
      // If the upload itself fails, show an alert.
      alert(`Upload failed: ${err.message}`);
      // It might be good to redirect back from the optimistic page, but for now, an alert suffices.
      router.push(`/check-in/${bookingId}/upload`);
    },
  });

  // The main onSubmit function for the form should call this.
  // We add an optimistic redirect here for a better user experience.
  const handleUpload = (formData: FormData) => {
    router.push(`/status?bookingId=${bookingId}&optimistic=true`);
    uploadMutation.mutate(formData);
  };

  return {
    mutate: handleUpload,
    isPending: uploadMutation.isPending || processMutation.isPending,
  };
};
