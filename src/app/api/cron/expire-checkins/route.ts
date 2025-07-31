import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();

    // Find flights that have departed
    const departedFlights = await prisma.flight.findMany({
      where: {
        departureTime: {
          lt: now,
        },
      },
      include: {
        bookings: {
          include: {
            checkIn: true,
          },
        },
      },
    });

    let updatedCount = 0;

    for (const flight of departedFlights) {
      for (const booking of flight.bookings) {
        if (booking.checkIn && booking.checkIn.status !== 'EXPIRED') {
          await prisma.checkIn.update({
            where: { id: booking.checkIn.id },
            data: { status: 'EXPIRED' },
          });
          updatedCount++;
        }
      }
    }

    return NextResponse.json({
      message: `Expired ${updatedCount} check-ins successfully.`,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}