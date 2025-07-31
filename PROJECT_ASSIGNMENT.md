# Airline Check-In Portal Coding Challenge
Ideal Stack: Node.js, TypeScript, cloud or local tools of your choice (e.g. Supabase, or
AWS), Next.js
✈️ Scenario
Build the MVP of an Airline Check-In System. Passengers can check in online before
their flight, upload documents, and view their check-in status. Airline staff can see all
passenger check-ins and update their status.
✅ Requirements
Frontend Requirements:
● Use Next.js
○ Check-in Form UI
■ A form where a user can enter their:
● Last Name
● Confirmation Number
■ On submit, call a /check-in API and display a confirmation
message.
○ Check-in Status Page
■ Allow a user to input their confirmation number to fetch their
check-in status.
■ Display:
● Passenger Name
● Flight Info (Flight Number, Destination)
● Check-in status (e.g., "Checked in" or "Not yet")

Backend Requirements:
● Use MongoDB or PostgreSQL
● Simulate or integrate
○ A local directory or a free storage service for uploading a document (e.g.,
passport)
○ Queue pattern to simulate async processing (e.g., gate notifications)
○ Include basic auth logic to distinguish admin from passenger (this can be
stubbed or hardcoded)

Bonus:
● Implement a scheduled background task (simulated Lambda) that marks
check-ins as expired after the travel date passes.
● Responsive layout
● Clean, accessible UI
● Shows loading/error states on API calls
● Optimistically updates check-in status