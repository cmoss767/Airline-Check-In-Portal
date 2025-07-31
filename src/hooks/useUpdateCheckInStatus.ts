'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCheckInStatus as updateCheckInStatusAction } from '@/app/admin/actions';
import { CheckIn, CheckInStatus } from '@/types';

export const useUpdateCheckInStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCheckInStatusAction, // No key needed, middleware handles auth

    onMutate: async ({ checkInId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['adminCheckIns'] });
      const previousCheckIns = queryClient.getQueryData<CheckIn[]>(['adminCheckIns']);
      queryClient.setQueryData<CheckIn[]>(['adminCheckIns'], (old) =>
        old ? old.map((ci) => (ci.id === checkInId ? { ...ci, status: newStatus } : ci)) : []
      );
      return { previousCheckIns };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousCheckIns) {
        queryClient.setQueryData(['adminCheckIns'], context.previousCheckIns);
      }
      alert(`Error updating status: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCheckIns'] });
    },
  });
};
