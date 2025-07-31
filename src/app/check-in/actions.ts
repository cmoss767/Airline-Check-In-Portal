'use server';

import prisma from '@/lib/prisma';
import { CheckInFormInputs, CheckInResponse, StatusData } from '@/types';

export const checkInAction = async (data: CheckInFormInputs): Promise<CheckInResponse> => {
  const { lastName, confirmationNumber } = data;

  if (!lastName || !confirmationNumber) {
    throw new Error('Missing required fields');
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        confirmationNumber,
      },
      include: {
        passenger: true,
        checkIn: true,
      },
    });

    if (!booking || booking.passenger.lastName.toLowerCase() !== lastName.toLowerCase()) {
      throw new Error('Invalid confirmation number or last name');
    }

    if (booking.checkIn) {
      return {
        bookingId: booking.id,
        status: booking.checkIn.status,
      };
    }

    const newCheckIn = await prisma.checkIn.create({
      data: {
        bookingId: booking.id,
        status: 'NOT_CHECKED_IN',
      },
    });

    return {
      bookingId: booking.id,
      status: newCheckIn.status,
    };
  } catch (error: any) {
    console.error('Check-in error:', error);
    if (error.message.includes('Invalid confirmation number')) {
      throw error;
    }
    throw new Error('An internal server error occurred during check-in.');
  }
};

export const fetchCheckInStatusAction = async ({
  bookingId,
  confirmationNumber,
}: {
  bookingId: string | null;
  confirmationNumber: string | null;
}): Promise<StatusData> => {
  if (!bookingId && !confirmationNumber) {
    throw new Error('A booking ID or confirmation number is required.');
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id: bookingId || undefined }, { confirmationNumber: confirmationNumber || undefined }],
      },
      include: {
        passenger: true,
        flight: true,
        checkIn: true,
      },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    return {
      passengerName: `${booking.passenger.firstName} ${booking.passenger.lastName}`,
      flightInfo: {
        flightNumber: booking.flight.flightNumber,
        destination: booking.flight.destination,
        departureTime: booking.flight.departureTime,
      },
      status: booking.checkIn?.status || 'NOT_CHECKED_IN',
      documentUrl: booking.checkIn?.documentUrl || null,
    };
  } catch (error: any) {
    console.error('Error fetching booking status:', error);
    if (error.message.includes('Booking not found')) {
      throw error;
    }
    throw new Error('An internal server error occurred while fetching the status.');
  }
};
