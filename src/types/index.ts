export enum CheckInStatus {
  NOT_CHECKED_IN = 'NOT_CHECKED_IN',
  CHECKED_IN = 'CHECKED_IN',
  EXPIRED = 'EXPIRED',
  PROCESSING = 'PROCESSING',
}

export interface FlightInfo {
  flightNumber: string;
  destination: string;
  departureTime: string;
}

export interface StatusData {
  passengerName: string;
  flightInfo: FlightInfo;
  status: CheckInStatus;
  documentUrl: string | null;
}

export type CheckInResponse = {
  bookingId: string;
  status: CheckInStatus;
};

export interface PassengerInfo {
  firstName: string;
  lastName: string;
}

export interface BookingFlightInfo {
  flightNumber: string;
  destination: string;
}

export interface BookingSummary {
  confirmationNumber: string;
  passenger: PassengerInfo;
  flight: BookingFlightInfo;
}

export interface CheckIn {
  id: string;
  status: CheckInStatus;
  documentUrl: string | null;
  booking: BookingSummary;
}

export type CheckInFormInputs = {
  lastName: string;
  confirmationNumber: string;
};

export type StatusSearchFormInputs = {
  confirmationNumber: string;
};

export type DocumentUploadFormInputs = {
  document: FileList;
};

export interface UploadResult {
  message: string;
  checkInId: string;
}
