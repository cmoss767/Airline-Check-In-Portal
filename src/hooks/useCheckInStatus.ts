'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCheckInStatusAction } from '@/app/check-in/actions';
import { StatusData, CheckInStatus } from '@/types';

export const useCheckInStatus = () => {
  const searchParams = useSearchParams();
  const confirmationNumberParam = searchParams.get('confirmationNumber');
  const bookingIdParam = searchParams.get('bookingId');
  const optimistic = searchParams.get('optimistic') === 'true';

  const [displayData, setDisplayData] = useState<StatusData | null>(null);

  const {
    data: serverData,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<StatusData, Error>({
    queryKey: ['checkInStatus', bookingIdParam, confirmationNumberParam],
    queryFn: () =>
      fetchCheckInStatusAction({
        bookingId: bookingIdParam,
        confirmationNumber: confirmationNumberParam,
      }),
    enabled: !!bookingIdParam || !!confirmationNumberParam,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return optimistic ? 5000 : false;
      return data.status === CheckInStatus.PROCESSING ? 5000 : false;
    },
  });

  useEffect(() => {
    if (optimistic && !serverData) {
      setDisplayData({
        status: CheckInStatus.CHECKED_IN,
        passengerName: 'Loading...',
        flightInfo: {
          flightNumber: 'Loading...',
          destination: 'Loading...',
          departureTime: new Date().toISOString(),
        },
        documentUrl: null,
      });
    } else if (serverData) {
      if (optimistic && serverData.status === CheckInStatus.PROCESSING) {
        return;
      }
      setDisplayData(serverData);
    }
  }, [serverData, optimistic]);

  return { displayData, error, isLoading: isLoading && !displayData, isRefetching, refetch };
};
