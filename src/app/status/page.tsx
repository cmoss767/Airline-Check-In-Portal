'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { useCheckInStatus } from '@/hooks/useCheckInStatus';
import { StatusSearchFormInputs } from '@/types';
import { StatusDisplay } from '@/components/status/StatusDisplay';
import { SearchForm } from '@/components/status/SearchForm';

export default function StatusPage() {
  const router = useRouter();
  const { displayData, error, isLoading, isRefetching } = useCheckInStatus();

  const handleSearch: SubmitHandler<StatusSearchFormInputs> = (data) => {
    router.push(`/status?confirmationNumber=${data.confirmationNumber}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-brand-text">Loading...</p>;
    }

    if (error) {
      return <p className="text-center text-brand-red">Error: {error.message}</p>;
    }

    if (displayData) {
      return <StatusDisplay displayData={displayData} isRefetching={isRefetching} />;
    }

    return <SearchForm onSubmit={handleSearch} isSubmitting={isLoading || isRefetching} />;
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 py-12 sm:p-6 md:p-12 bg-background">
      <div className="w-full max-w-md md:max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Check-In Status
        </h1>
        <div className="p-6 border-t border-gray-200">
          {renderContent()}
        </div>
      </div>
    </main>
  );
}
