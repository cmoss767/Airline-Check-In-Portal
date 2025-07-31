'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { CheckIn, CheckInStatus } from '@/types';

export const fetchCheckIns = async (): Promise<CheckIn[]> => {
  try {
    const checkIns = await prisma.checkIn.findMany({
      include: {
        booking: {
          include: {
            passenger: true,
            flight: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return checkIns as unknown as CheckIn[];
  } catch (error) {
    console.error('Failed to fetch check-ins:', error);
    throw new Error('An internal server error occurred while fetching check-ins.');
  }
};

export const updateCheckInStatus = async ({
  checkInId,
  newStatus,
}: {
  checkInId: string;
  newStatus: CheckInStatus;
}) => {
  try {
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: checkInId },
      data: { status: newStatus },
    });

    revalidatePath('/admin');
    return updatedCheckIn;
  } catch (error) {
    console.error(`Failed to update check-in status for ID ${checkInId}:`, error);
    throw new Error('An internal server error occurred while updating the status.');
  }
};
