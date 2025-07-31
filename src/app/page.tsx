'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useCheckIn } from '@/hooks/useCheckIn';
import { CheckInFormInputs } from '@/types';

export default function CheckInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckInFormInputs>();

  const mutation = useCheckIn(setError);

  const onSubmit: SubmitHandler<CheckInFormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 py-12 sm:p-6 md:p-12 bg-background">
      <div className="w-full max-w-md md:max-w-2xl p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Airline Check-In
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-brand-text">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { required: 'Last name is required.' })}
              className="block w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
            />
            {errors.lastName && <p className="text-sm text-brand-red">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmationNumber" className="block text-sm font-medium text-brand-text">
              Confirmation Number
            </label>
            <input
              id="confirmationNumber"
              type="text"
              {...register('confirmationNumber', {
                required: 'Confirmation number is required.',
              })}
              className="block w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
            />
            {errors.confirmationNumber && (
              <p className="text-sm text-brand-red">{errors.confirmationNumber.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400"
            >
              {isSubmitting || mutation.isPending ? 'Checking in...' : 'Check In'}
            </button>
          </div>
        </form>

        {errors.root?.serverError && (
          <p className="text-sm text-center text-brand-red">{errors.root.serverError.message}</p>
        )}
      </div>
    </main>
  );
}
