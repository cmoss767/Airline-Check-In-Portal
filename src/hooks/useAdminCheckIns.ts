'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCheckIns } from '@/app/admin/actions';
import { CheckIn } from '@/types';

export const useAdminCheckIns = () => {
  const {
    data: checkIns = [],
    isLoading,
    error,
  } = useQuery<CheckIn[], Error>({
    queryKey: ['adminCheckIns'],
    queryFn: fetchCheckIns, // No key needed, middleware handles auth
  });

  return { checkIns, isLoading, error };
};
