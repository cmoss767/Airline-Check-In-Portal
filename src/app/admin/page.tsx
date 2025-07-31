'use client';

import { useAdminCheckIns } from '@/hooks/useAdminCheckIns';
import { useUpdateCheckInStatus } from '@/hooks/useUpdateCheckInStatus';
import { CheckInStatus } from '@/types';

export default function AdminPage() {
  const { checkIns, isLoading, error } = useAdminCheckIns();
  const updateStatusMutation = useUpdateCheckInStatus();

  const handleStatusChange = (checkInId: string, newStatus: string) => {
    updateStatusMutation.mutate({ checkInId, newStatus: newStatus as CheckInStatus });
  };

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - All Check-Ins</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {checkIns.map((ci) => (
              <tr key={ci.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ci.booking.passenger.firstName} {ci.booking.passenger.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ci.booking.flight.flightNumber} to {ci.booking.flight.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ci.booking.confirmationNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ci.documentUrl ? (
                    <a href={ci.documentUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      View Document
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ci.status === 'CHECKED_IN' ? 'bg-green-100 text-green-800' :
                    ci.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ci.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ci.status}
                    onChange={(e) => handleStatusChange(ci.id, e.target.value)}
                    disabled={updateStatusMutation.isPending && updateStatusMutation.variables?.checkInId === ci.id}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {Object.values(CheckInStatus).map((status) => (
                      <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
