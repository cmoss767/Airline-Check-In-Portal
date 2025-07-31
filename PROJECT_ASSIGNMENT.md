# Airline Check-In Portal Coding Challenge

**Ideal Stack:** Node.js, TypeScript, Next.js, and your choice of cloud or local tools (e.g., Supabase, AWS).

---

## ✈️ Scenario

Build the MVP of an Airline Check-In System. Passengers can check in online before their flight, upload documents, and view their check-in status. Airline staff can see all passenger check-ins and update their status.

---

## ✅ Core Requirements

### Frontend

-   **Framework**: Use Next.js.
-   **Check-in Form UI**:
    -   A form for users to enter their **Last Name** and **Confirmation Number**.
    -   On submit, the form should call a `/check-in` API and display a confirmation message.
-   **Check-in Status Page**:
    -   Allow a user to input their confirmation number to fetch their check-in status.
    -   Display the following:
        -   Passenger Name
        -   Flight Info (Flight Number, Destination)
        -   Check-in status (e.g., "Checked In" or "Not Yet Checked In").

### Backend

-   **Database**: Use MongoDB or PostgreSQL.
-   **Features to Simulate or Integrate**:
    -   **Document Upload**: A local directory or a free storage service (e.g., Supabase Storage, AWS S3) for uploading a document like a passport.
    -   **Async Processing**: A queue pattern to simulate asynchronous tasks (e.g., gate change notifications).
    -   **Authentication**: Basic authentication logic to distinguish between an admin and a passenger. This can be stubbed or hardcoded.

---

## ✨ Bonus Features

-   **Scheduled Task**: Implement a background job (e.g., a simulated Lambda function or a cron job) that marks check-ins as "expired" after the travel date has passed.
-   **Responsive Design**: Ensure the layout works well on various screen sizes.
-   **UI/UX**:
    -   Create a clean, accessible user interface.
    -   Display loading and error states for all API calls.
    -   Use optimistic updates for the check-in status.
