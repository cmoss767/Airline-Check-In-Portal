# Airline Check-In: Implementation Details

This document outlines how the project requirements for the Airline Check-In Portal were implemented. It details the technical choices and the flow of data for each feature.

---

## Architecture Overview

The application follows a modern Next.js architecture, prioritizing **Server Actions** for all backend communication initiated from the client. This approach is more performant and secure than traditional API routes for internal data handling.

-   **Client-Side State**: Managed by **TanStack Query (React Query)**, which is used for caching, optimistic updates, and handling loading/error states. All client-side data-fetching logic is encapsulated in custom hooks (e.g., `useCheckInStatus`).
-   **Server-Side Logic**: Handled exclusively by **Server Actions**. These server-only functions are co-located with the features that use them (e.g., `src/app/admin/actions.ts`). They interact directly with the database using Prisma.
-   **API Routes**: The `src/app/api` directory is used only for endpoints that need to be publicly accessible via a URL, such as the CRON job for expiring check-ins.

---

## Frontend Requirements

### 1. Check-in Form UI

-   **Requirement**: A form for "Last Name" and "Confirmation Number" to initiate check-in.
-   **Implementation**: The `src/app/page.tsx` component uses `react-hook-form` for form management.
-   **How it Works**:
    1.  The custom hook `useCheckIn` (`src/hooks/useCheckIn.ts`) uses `useMutation` from TanStack Query.
    2.  On submit, the `mutationFn` calls the `checkInAction` Server Action, passing the form data.
    3.  The Server Action validates the data against the database and either returns an existing check-in status or creates a new one.
    4.  On success, the user is redirected to the appropriate page (upload or status).

### 2. Check-in Status Page

-   **Requirement**: A page to view check-in status using a confirmation number.
-   **Implementation**: The `src/app/status/page.tsx` component displays data fetched by a custom hook.
-   **How it Works**:
    1.  The `useCheckInStatus` hook reads the `confirmationNumber` or `bookingId` from the URL search params.
    2.  It uses `useQuery` from TanStack Query to call the `fetchCheckInStatusAction` Server Action.
    3.  This action fetches the booking details from the database and returns them to the client.
    4.  The hook implements polling via `refetchInterval` to automatically update the UI if the check-in is still processing.

---

## Backend Requirements

### 1. Database

-   **Requirement**: Use PostgreSQL.
-   **Implementation**: A **PostgreSQL** database hosted on **Supabase** is used, with **Prisma** as the ORM. The schema is defined in `prisma/schema.prisma`.

### 2. Document Upload

-   **Requirement**: A cloud storage service for document uploads.
-   **Implementation**: File uploads are handled by a Server Action that interacts with **Supabase Storage**.
-   **How it Works**:
    1.  The `src/app/check-in/[bookingId]/upload/page.tsx` component captures the file in a form.
    2.  The `useDocumentUpload` hook calls the `uploadDocumentAction` Server Action, passing the `bookingId` and `FormData`.
    3.  The Server Action uploads the file to a Supabase Storage bucket and updates the `CheckIn` record in the database with the public URL.

### 3. Queue Pattern for Async Processing

-   **Requirement**: Simulate a queue for asynchronous processing.
-   **Implementation**: This is achieved using a `Job` model in Prisma and a dedicated **Server Action** to simulate the task.
-   **How it Works**:
    1.  **Trigger**: After a document is successfully uploaded, the `useDocumentUpload` hook calls the `startDocumentProcessingAction` Server Action with the `checkInId`.
    2.  **Job Creation**: The action creates a `Job` record in the database.
    3.  **Simulated Processing**: The action waits for 5 seconds to simulate a long-running task before updating the `CheckIn` status to `CHECKED_IN` and marking the job as complete. This entire process happens on the server.

### 4. Admin/Passenger Auth

-   **Requirement**: Basic, hardcoded authentication.
-   **Implementation**: Admin access is controlled by **Next.js Middleware**.
-   **How it Works**:
    - The middleware at `src/middleware.ts` is configured to run on all requests to `/admin/:path*`.
    - It performs a simple check to see if the `ADMIN_SECRET_KEY` environment variable is defined on the server.
    - If the key exists, access is granted. If the key is not defined, access is blocked to prevent the application from running in an insecure state. This serves as a hardcoded "stub" for authentication.

---

## Bonus Features

-   **Scheduled Background Task**: Implemented as a CRON job API route at `src/app/api/cron/expire-checkins/route.ts` that can be triggered by a scheduling service.
-   **UI/UX Enhancements**: **Tailwind CSS** is used for responsive styling. TanStack Query provides robust loading and error states.
-   **Optimistic Updates**: Implemented in the `useUpdateCheckInStatus` hook for the admin dashboard and on the document upload flow, where the UI navigates to the status page immediately, showing a positive result while the upload and processing happen in the background.
