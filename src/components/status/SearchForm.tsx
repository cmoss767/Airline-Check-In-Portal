import { useForm, SubmitHandler } from 'react-hook-form';
import { StatusSearchFormInputs } from '@/types';

export const SearchForm = ({ onSubmit, isSubmitting }: { onSubmit: SubmitHandler<StatusSearchFormInputs>, isSubmitting: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StatusSearchFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
      <div>
        <label htmlFor="confirmationNumber" className="block text-sm font-medium text-gray-700">
          Enter Confirmation Number
        </label>
        <input
          id="confirmationNumber"
          type="text"
          {...register('confirmationNumber', { required: 'Confirmation number is required.' })}
          className="block w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
        />
        {errors.confirmationNumber && <p className="text-sm text-red-500">{errors.confirmationNumber.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
      >
        {isSubmitting ? 'Searching...' : 'Find My Booking'}
      </button>
    </form>
  );
};
