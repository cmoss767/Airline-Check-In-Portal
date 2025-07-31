'use server';

import prisma from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

import { UploadResult } from '@/types';

export const uploadDocumentAction = async (
  bookingId: string,
  formData: FormData
): Promise<UploadResult> => {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }
  
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }

  try {
    const checkIn = await prisma.checkIn.upsert({
      where: { bookingId },
      update: {
        status: 'PROCESSING',
      },
      create: {
        bookingId,
        status: 'PROCESSING',
      },
    });

    const filePath = `${bookingId}/${file.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('documents')
      .upload(filePath, file, {
        upsert: true, 
      });

    if (uploadError) {
      throw new Error(`Supabase upload error: ${uploadError.message}`);
    }

    const { data: urlData } = supabaseAdmin.storage.from('documents').getPublicUrl(filePath);

    await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: { documentUrl: urlData.publicUrl },
    });

    return {
      message: 'Upload successful, processing started',
      checkInId: checkIn.id,
    };
  } catch (error: any) {
    console.error('Upload action error:', error);
    throw new Error('An internal server error occurred during file upload.');
  }
};

export const startDocumentProcessingAction = async (checkInId: string) => {
  if (!checkInId) {
    throw new Error('checkInId is required for processing.');
  }

  try {
    const job = await prisma.job.create({
      data: { checkInId },
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await prisma.checkIn.update({
      where: { id: checkInId },
      data: { status: 'CHECKED_IN' },
    });

    await prisma.job.update({
      where: { id: job.id },
      data: { processed: true },
    });

    return { message: `Processing complete for check-in ${checkInId}` };
  } catch (error: any) {
    console.error('Worker error:', error);
    throw new Error('An internal server error occurred during processing.');
  }
};
