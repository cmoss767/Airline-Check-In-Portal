import { StatusData } from '@/types';

export const StatusDisplay = ({ displayData, isRefetching }: { displayData: StatusData, isRefetching: boolean }) => (
  <div className="space-y-4">
    {isRefetching && <p className="text-center text-sm text-gray-400">Checking for updates...</p>}
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Passenger</h2>
      <p className="text-gray-600">{displayData.passengerName}</p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Flight Details</h2>
      <p className="text-gray-600">Flight: {displayData.flightInfo.flightNumber}</p>
      <p className="text-gray-600">Destination: {displayData.flightInfo.destination}</p>
      <p className="text-gray-600">
        Departure: {new Date(displayData.flightInfo.departureTime).toLocaleString()}
      </p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Status</h2>
      <p className="text-lg font-bold text-brand-green">{displayData.status.replace(/_/g, ' ')}</p>
    </div>
    {displayData.documentUrl && (
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Uploaded Document</h2>
        <a href={displayData.documentUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          View Document
        </a>
      </div>
    )}
  </div>
);
