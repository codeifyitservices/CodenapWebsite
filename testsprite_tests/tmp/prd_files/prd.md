# CodeNap Website - Product Requirements Document (PRD)

## 1. Purpose & Overview
CodeNap is a software engineering and digital marketing agency. The website serves as a public presence to acquire clients, advertise services, showcase success stories, recruit talent, and train developers. 

An administrative dashboard (Admin Panel) allows internal users to manage dynamic content like services, job listings, testimonials, and FAQs without manual code deployments.

---

## 2. Core Features

### 2.1 Public User Interface (Client-Facing)
*   **Home Page**: Introducing CodeNap, highlights of service capabilities, testimonials, and primary CTAs.
*   **About Page**: Information about the company history, values, and engineering leadership.
*   **Services Page**: Lists offerings (Web Dev, Mobile App Dev, AI/ML, Digital Marketing, Cloud Hosting, Project Onboarding) using visually rich cards tailored with dynamic accent colors and Lucide icons.
*   **Service Detail Page**: Nested dynamic routes (`/services/:id`) displaying deep-dive specifications:
    *   Detailed descriptions & listing tags
    *   Detailed tech stack & bullet points
    *   Timeline of project process steps (e.g. Discovery, Design, Development, Launch)
    *   Performance metrics and stats
*   **Careers Page**: Job board rendering open positions with department categories, salary ranges, location types (remote/hybrid/on-site), requirements, and application submission.
*   **Contact Page**: Form for potential clients or trainees to submit inquiries.

### 2.2 Admin Panel (Internal CMS)
*   **Authentication**: Login page (`/admin/login`) requiring a secure admin username and password. On successful authentication, a JWT is issued and stored in local storage.
*   **Dashboard**: Shows summary cards with total counts of active services, testimonials, FAQs, job listings, and job applications.
*   **Manage Services**:
    *   **CRUD Operations**: Admin can add, view, edit, and delete services.
    *   **Tabbed Form Editor**: Interactive editor split into 3 steps: (1) Basic Info & Style, (2) Descriptions & Tech Stack, (3) Detailed features, process steps, and stats.
    *   **Accent Color Selector**: Interactive HTML color picker matching input colors to Tailwind CSS accent themes (orange, blue, violet, emerald, cyan, amber).
    *   **Icon Library Search**: Real-time filtered grid of Lucide React icons.
    *   **Drag-and-Drop Reordering**: Admin can drag and drop service rows in the table using a GripVertical drag handle to reorder services. The order is automatically saved via a bulk update endpoint (`PUT /api/services/reorder`).
*   **Manage FAQs & Testimonials**: Full CRUD tables for managing content.
*   **Manage Jobs & View Applications**: CRUD for job openings, and a list viewer for candidate submissions.
*   **Manage Contact Info**: Form to update the address, phone number, email, and social links displayed across the site.

---

## 3. Product Architecture & Workflows

### 3.1 Drag-and-Drop Reordering Workflow
1.  **User Action**: Admin hovers over the first column of a service row, showing a grab cursor, and drags the row up or down.
2.  **Visual Interaction**: The dragged row drops opacity and highlights with a dashed border. Other rows shift to accommodate the drag in real-time.
3.  **Local State Swap**: The frontend swaps the items in the local React state.
4.  **Save Trigger**: On drop (`onDragEnd`), the frontend maps the new array indices to an array of `{ id, order }` objects.
5.  **API Requests**: Sends a PUT request to `/api/services/reorder` with the body `{ orders }`.
6.  **Database Write**: The backend database controller uses Mongoose `bulkWrite` to perform atomic updates for each service's `order` field.
7.  **Data Fetching**: The next time any page requests `/api/services` (admin or public), the backend retrieves services sorted by `order` ascending.
