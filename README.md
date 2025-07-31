# Airline Check-In Portal

This is a Next.js project for an airline check-in system, built for a coding assessment.

## Architecture

This project is a full-stack web application built with the following technologies:

-   **Framework**: [Next.js](https://nextjs.org/) (React) for the frontend and API routes.
-   **Backend**: [Supabase](https://supabase.com/) provides the PostgreSQL database and file storage for document uploads.
-   **Database ORM**: [Prisma](https://www.prisma.io/) is used to interact with the PostgreSQL database.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.

This approach uses a cloud-based backend to simplify setup and deployment, allowing a reviewer to get the project running without configuring a local database.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You will need to have the following software installed on your machine:

-   [Node.js](https://nodejs.org/en/download/) (v20 or newer)
-   [pnpm](https://pnpm.io/installation)

### 1. Set Up Your Supabase Backend

This project requires a Supabase project for its database and file storage.

1.  **Create a Supabase Account**: If you don't have one, sign up for a free account at [supabase.com](https://supabase.com/).
2.  **Create a New Project**:
    *   On your Supabase dashboard, click "New project".
    *   Give it a name (e.g., `airline-check-in`).
    *   Generate a secure database password and save it.
    *   Choose a region close to you.
    *   Click "Create new project".
3.  **Create a Storage Bucket**:
    *   Once the project is ready, go to the "Storage" section in the left sidebar.
    *   Click "New bucket".
    *   Enter `documents` as the bucket name.
    *   Make it a **public bucket** by toggling the switch. This is for simplicity in this assessment project.
    *   Click "Create bucket".

### 2. Configure Your Local Environment

1.  **Clone the Repository**
    ```sh
    git clone <your-repo-url>
    cd airline-check-in
    ```
2.  **Install Dependencies**
    ```sh
    pnpm install
    ```
3.  **Create an Environment File**

    Create a file named `.env.local` in the root of your project and add the following content:

    ```sh
    # Found in your Supabase project's "Settings" > "Database" > "Connection string" (URI tab)
    # Make sure to replace [YOUR-PASSWORD] with the database password you saved.
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.<ref-id>.supabase.co:5432/postgres"

    # Found in your Supabase project's "Settings" > "API"
    NEXT_PUBLIC_SUPABASE_URL="https://<ref-id>.supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-public-anon-key"
    SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

    # A long, random string you create yourself for securing the admin dashboard
    ADMIN_SECRET_KEY="your-long-random-secret-key"
    ```

4.  **Fill in Environment Variables**

    *   Navigate to your Supabase project's settings.
    *   Go to **Settings > Database**. Under "Connection string", select the **URI** tab and copy the value. This is your `DATABASE_URL`. **Remember to replace `[YOUR-PASSWORD]` with the password you created for your Supabase project.**
    *   Go to **Settings > API**.
        *   Copy the "Project URL" and set it as `NEXT_PUBLIC_SUPABASE_URL`.
        *   Copy the `anon` `public` key and set it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        *   Copy the `service_role` `secret` key and set it as `SUPABASE_SERVICE_ROLE_KEY`.

### 3. Prepare the Database

Now that your application can connect to the database, run the Prisma migrations to set up the database schema.

```sh
pnpm prisma migrate dev
```

This will create the necessary tables based on the `prisma/schema.prisma` file.

You can also seed the database with some initial data:
```sh
pnpm prisma db seed
```

### 4. Run the Application

Start the Next.js development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You should now be able to use the application.
