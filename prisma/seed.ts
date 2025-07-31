import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear old data
  await prisma.job.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.passenger.deleteMany();
  await prisma.flight.deleteMany();
  console.log('Cleared old data...');

  // Create Passengers
  const passenger1 = await prisma.passenger.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  const passenger2 = await prisma.passenger.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
  });

  console.log('Created passengers...');

  // Create Flights
  const flight1 = await prisma.flight.create({
    data: {
      flightNumber: 'NA4321',
      destination: 'New York',
      departureTime: new Date('2024-08-15T10:00:00Z'),
    },
  });

  const flight2 = await prisma.flight.create({
    data: {
      flightNumber: 'SA1234',
      destination: 'San Francisco',
      departureTime: new Date('2024-08-20T14:30:00Z'),
    },
  });

  console.log('Created flights...');

  // Create Bookings
  await prisma.booking.create({
    data: {
      confirmationNumber: 'ABCDEF',
      passengerId: passenger1.id,
      flightId: flight1.id,
    },
  });

  await prisma.booking.create({
    data: {
      confirmationNumber: 'GHIJKL',
      passengerId: passenger2.id,
      flightId: flight2.id,
    },
  });

  await prisma.booking.create({
    data: {
      confirmationNumber: 'MNOPQR',
      passengerId: passenger1.id,
      flightId: flight2.id,
    },
  });

  console.log('Created bookings...');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 