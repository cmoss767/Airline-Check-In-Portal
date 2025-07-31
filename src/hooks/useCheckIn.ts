'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CheckInFormInputs, CheckInResponse, CheckInStatus } from '@/types';
import { checkInAction } from '@/app/check-in/actions';

export const useCheckIn = (setError: (name: any, error: any) => void) => {
  const router = useRouter();

  return useMutation<CheckInResponse, Error, CheckInFormInputs>({
    mutationFn: checkInAction,
    onSuccess: (data) => {
      if (data.status === CheckInStatus.NOT_CHECKED_IN) {
        router.push(`/check-in/${data.bookingId}/upload`);
      } else {
        router.push(`/status?bookingId=${data.bookingId}`);
      }
    },
    onError: (err: any) => {
      setError('root.serverError', {
        type: 'manual',
        message: err.message || 'An unexpected error occurred.',
      });
    },
  });
};
