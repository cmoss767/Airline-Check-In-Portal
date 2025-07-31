import { StatusData } from '@/types';

export const StatusDisplay = ({ displayData, isRefetching }: { displayData: StatusData, isRefetching: boolean }) => (
  <div className="space-y-4">
    {isRefetching && <p className="text-center text-sm text-gray-400">Checking for updates...</p>}
    <div>
      <h2 className="text-lg font-semibold text-foreground">Passenger</h2>
      <p className="text-brand-text">{displayData.passengerName}</p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-foreground">Flight Details</h2>
      <p className="text-brand-text">Flight: {displayData.flightInfo.flightNumber}</p>
      <p className="text-brand-text">Destination: {displayData.flightInfo.destination}</p>
      <p className="text-brand-text">
        Departure: {new Date(displayData.flightInfo.departureTime).toLocaleString()}
      </p>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-foreground">Status</h2>
      <p className="text-lg font-bold text-brand-green">{displayData.status.replace(/_/g, ' ')}</p>
    </div>
    {displayData.documentUrl && (
      <div>
        <h2 className="text-lg font-semibold text-foreground">Uploaded Document</h2>
        <a href={displayData.documentUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue-600 hover:underline">
          View Document
        </a>
      </div>
    )}
  </div>
);
