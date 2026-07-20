# CodeNap Website - API Product Requirements Document (PRD)

This document specifies the backend API requirements, endpoints, request/response structures, database models, and authentication mechanisms for the CodeNap Website codebase.

---

## 1. Overview & Architecture
The CodeNap backend is a Node.js/Express application using MongoDB (via Mongoose) to manage site content and process user forms (contacts, bookings, careers, and general inquiries).

### 1.1 Base URL
All API requests are relative to:
`http://localhost:5000/api` (Development) or the configured production server URL (e.g., `https://node.codenap.in/api`).

### 1.2 Authentication & Authorization
*   **Mechanism**: JSON Web Token (JWT) Bearer authentication.
*   **Header Format**: `Authorization: Bearer <JWT_TOKEN>`
*   **Access Control**: 
    *   **Public Endpoints**: Open for read operations or form submissions (e.g., fetching services, submitting jobs, contact forms).
    *   **Admin Endpoints**: Protected using `verifyAdmin` middleware. Requires a valid JWT token with payload `role: "admin"`.

---

## 2. Database Models & Schemas

### 2.1 Service Schema (`Service.js`)
Used to store services offered by the agency, rendered on public pages and managed in the admin panel.
*   `id` (String, Required, Unique): Service slug (e.g., `web-development`).
*   `title` (String, Required): Display title.
*   `shortTitle` (String): Short title for UI badges/breadcrumbs.
*   `tagline` (String): Brief catchy summary.
*   `headline` (String): Main headline in details page.
*   `description` (String): Summary description.
*   `longDescription` (String): Deep-dive description.
*   `icon` (String): Lucide React icon name (e.g., `Code2`, `Network`).
*   `accentColor` (String): Tailwind accent theme (e.g., `orange`, `blue`).
*   `image` (String): Path or URL to static assets/uploaded illustrations.
*   `techStack` (Array of Strings): Recommended technology names.
*   `bulletPoints` (Array of Strings): Key highlights.
*   `features` (Array of Objects): Detailed features:
    *   `title` (String)
    *   `desc` (String)
*   `process` (Array of Objects): Sequential timeline steps:
    *   `step` (String): Step label (e.g., `01`)
    *   `title` (String)
    *   `desc` (String)
*   `stats` (Array of Objects): Highlight metrics:
    *   `value` (String): (e.g., `99%`)
    *   `label` (String): (e.g., `Uptime`)
*   `tags` (Array of Strings): Metadata tags.
*   `accent`, `accentShadow`, `accentBadge` (String): Additional theme classes.
*   `order` (Number, Default: 0): Sequence index for custom sorting.

### 2.2 FAQ Schema (`FAQ.js`)
*   `question` (String, Required)
*   `answer` (String, Required)
*   `bullets` (Array of Strings)
*   `page` (String, Required): Target page (`home` or `careers`).

### 2.3 Testimonial Schema (`Testimonial.js`)
*   `name` (String, Required): Reviewer's name.
*   `role` (String, Required): Job title.
*   `company` (String): Client company name.
*   `tenure` (String): Employee tenure at CodeNap.
*   `initials` (String): Profile placeholder text.
*   `color` (String): Background color class.
*   `rating` (Number, Default: 5)
*   `text` (String, Required): Review content.
*   `image` (String): Reviewer photo.
*   `category` (String, Required): Target location (`home` or `careers`).

### 2.4 Job Schema (`Job.js`)
*   `id` (String, Required, Unique): URL friendly slug.
*   `title` (String, Required)
*   `department` (String, Required)
*   `type` (String, Required): (e.g., `Full-Time`, `Part-Time`, `Contract`)
*   `locationType` (String, Required): (e.g., `Remote`, `Hybrid`, `On-Site`)
*   `location` (String, Required): (e.g., `Indore, India`)
*   `experience` (String, Required): (e.g., `1-3 Years`)
*   `salary` (String, Required): (e.g., `Competitive`)
*   `badge` (String): Focus area badge (e.g., `Urgent`).
*   `badgeColor` (String): Color theme.
*   `techStack` (Array of Strings)
*   `description` (String, Required)
*   `responsibilities` (Array of Strings)
*   `requirements` (Array of Strings)

### 2.5 Application Schema (`Application.js`)
*   `name` (String, Required)
*   `email` (String, Required)
*   `phone` (String, Required)
*   `countryCode` (String, Default: `+91`)
*   `noticePeriod` (String, Required)
*   `state` (String, Required)
*   `city` (String, Required)
*   `experience` (String, Required)
*   `appliedFor` (String, Required): Role title.
*   `message` (String): Cover letter.
*   `resumeUrl` (String, Required): Path to the candidate's PDF or document.
*   `status` (String, Enum: `Pending`, `Reviewed`, `Shortlisted`, `Rejected`, Default: `Pending`)
*   `createdAt` (Date, Default: `Date.now`)

### 2.6 Booking Schema (`Booking.js`)
*   `name` (String, Required)
*   `email` (String, Required)
*   `mobile` (String, Required)
*   `business` (String): Brief business details.
*   `services` (Array of Strings)
*   `otherService` (String)
*   `budget` (String)
*   `startTime` (String)
*   `guests` (Array of Strings)
*   `timestamps` (Automatically generated fields `createdAt` and `updatedAt`).

### 2.7 Contact Schema (`Contact.js`)
*   `firstName` (String, Required)
*   `lastName` (String, Required)
*   `phoneNumber` (String, Required)
*   `email` (String, Required, Pattern Matching)
*   `message` (String, Required)
*   `createdAt` (Date, Default: `Date.now`)

### 2.8 Hero Schema (`Hero.js`)
*   `name` (String, Required, Min length: 2)
*   `mobile` (String, Required, Pattern Matching: 10 digits)
*   `message` (String, Required, Min length: 10)
*   `createdAt` (Date, Default: `Date.now`)

### 2.9 Setting Schema (`Setting.js`)
Used to store configuration and site settings keys (such as address, footer links, contact info).
*   `key` (String, Required, Unique): Configuration key.
*   `value` (Mixed, Required): Key value data.

---

## 3. Detailed Endpoint Specifications

### 3.1 Authentication Endpoint (`/api/auth`)

#### `POST /api/auth/login`
Authenticates administration credentials and issues a JSON Web Token.
*   **Auth Level**: Public
*   **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "your_secure_password"
    }
    ```
*   **Responses**:
    *   `200 OK` (Success):
        ```json
        {
          "message": "Login successful",
          "token": "eyJhbGciOi..."
        }
        ```
    *   `401 Unauthorized` (Invalid credentials):
        ```json
        {
          "message": "Invalid username or password"
        }
        ```

---

### 3.2 Services Endpoint (`/api/services`)

#### `GET /api/services`
Retrieves all services sorted by the `order` field in ascending sequence. Automatically initializes and sequentializes any orders that are undefined.
*   **Auth Level**: Public
*   **Responses**:
    *   `200 OK` (Success): List of Service objects.

#### `GET /api/services/:id`
Retrieves detailed specification of a single service by its custom string identifier (`id`).
*   **Auth Level**: Public
*   **Responses**:
    *   `200 OK` (Success): Service object details.
    *   `404 Not Found`: Service with ID not found.

#### `POST /api/services`
Creates a new service entry.
*   **Auth Level**: Protected (Admin)
*   **Request Body**: Service schema fields. If `order` is omitted, it will automatically default to `maxService.order + 1`.
*   **Responses**:
    *   `201 Created`:
        ```json
        {
          "message": "Service created successfully",
          "service": { ... }
        }
        ```
    *   `400 Bad Request`: Slug or ID already exists.

#### `PUT /api/services/:id`
Modifies an existing service identifying it by custom ID.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `200 OK`: Success payload with updated service.
    *   `404 Not Found`: Service not found.

#### `DELETE /api/services/:id`
Deletes a service configuration.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `200 OK`: Success message.
    *   `404 Not Found`: Service not found.

#### `PUT /api/services/reorder`
Updates the sorting indices of multiple services concurrently (atomic bulk write).
*   **Auth Level**: Protected (Admin)
*   **Request Body**:
    ```json
    {
      "orders": [
        { "id": "web-dev", "order": 0 },
        { "id": "mobile-dev", "order": 1 }
      ]
    }
    ```
*   **Responses**:
    *   `200 OK`: Success message.
    *   `400 Bad Request`: Invalid payload structure.

---

### 3.3 FAQ Endpoint (`/api/faqs`)

#### `GET /api/faqs`
Retrieves FAQs. Optionally filters by page using query parameters.
*   **Auth Level**: Public
*   **Query Parameters**:
    *   `page` (Optional): Filter by target page (values: `home` or `careers`).
*   **Responses**:
    *   `200 OK`: List of FAQ objects.

#### `POST /api/faqs`
Creates a new FAQ entry.
*   **Auth Level**: Protected (Admin)
*   **Request Body**:
    ```json
    {
      "question": "What is CodeNap?",
      "answer": "CodeNap is a software engineering agency.",
      "bullets": ["Bullet 1", "Bullet 2"],
      "page": "home"
    }
    ```
*   **Responses**:
    *   `201 Created`: FAQ object created.
    *   `400 Bad Request`: Missing mandatory parameters.

#### `PUT /api/faqs/:id`
Updates an FAQ entry by its database MongoDB `_id`.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `200 OK`: Success message and updated FAQ.
    *   `404 Not Found`: FAQ entry not found.

#### `DELETE /api/faqs/:id`
Deletes an FAQ entry.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `200 OK` / `404 Not Found`.

---

### 3.4 Testimonial Endpoint (`/api/testimonials`)

#### `GET /api/testimonials`
Retrieves client and employee reviews.
*   **Auth Level**: Public
*   **Query Parameters**:
    *   `category` (Optional): Filter by display page (`home` or `careers`).
*   **Responses**:
    *   `200 OK`: List of Testimonial objects.

#### `POST /api/testimonials`
Creates a testimonial review.
*   **Auth Level**: Protected (Admin)
*   **Request Body**: Testimonial schema properties.
*   **Responses**:
    *   `201 Created` / `400 Bad Request`.

#### `PUT /api/testimonials/:id`
Updates testimonial by database `_id`.
*   **Auth Level**: Protected (Admin)

#### `DELETE /api/testimonials/:id`
Deletes testimonial by database `_id`.
*   **Auth Level**: Protected (Admin)

---

### 3.5 Careers / Jobs Endpoint (`/api/jobs`)

#### `GET /api/jobs`
Retrieves all open career listings.
*   **Auth Level**: Public
*   **Responses**:
    *   `200 OK`: Array of Job listings.

#### `GET /api/jobs/:id`
Retrieves detailed specifications of a job listing by its custom string identifier (`id`).
*   **Auth Level**: Public
*   **Responses**:
    *   `200 OK` / `404 Not Found`.

#### `POST /api/jobs`
Creates a job position. Generates a URL slug from the title if the `id` field is omitted.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `201 Created` / `400 Bad Request` (Conflict if slug already exists).

#### `PUT /api/jobs/:id`
Updates a job opening via its slug ID.
*   **Auth Level**: Protected (Admin)

#### `DELETE /api/jobs/:id`
Deletes a job listing.
*   **Auth Level**: Protected (Admin)

---

### 3.6 Applications Endpoint (`/api/applications`)

#### `POST /api/applications/submit`
Submits a job application with candidate metadata and upload file middleware.
*   **Auth Level**: Public
*   **Form-Data Fields (Multipart/form-data)**:
    *   `resume` (File, Required): PDF or Word document file.
    *   `name`, `email`, `phone`, `noticePeriod`, `state`, `city`, `experience`, `appliedFor` (Strings, Required).
    *   `countryCode`, `message` (Strings, Optional).
*   **Behavior**:
    *   Saves resume file to `/uploads/resumes/` on local disk.
    *   Creates a new application entry with state `status: "Pending"`.
    *   Triggers an asynchronous email notification via `nodemailer` to the administrator/HR email (`EMAIL_USER` or `codenapdev@gmail.com`).
*   **Responses**:
    *   `201 Created`: Application success message.
    *   `400 Bad Request`: Missing file or missing required fields.

#### `GET /api/applications`
Retrieves all job applications sorted by creation timestamp descending.
*   **Auth Level**: Protected (Admin)
*   **Responses**:
    *   `200 OK`: Array of Application entries.

#### `PUT /api/applications/:id/status`
Updates candidate application workflow status (e.g., shortlist/reject).
*   **Auth Level**: Protected (Admin)
*   **Request Body**:
    ```json
    {
      "status": "Shortlisted"
    }
    ```
*   **Responses**:
    *   `200 OK` / `400 Bad Request` / `404 Not Found`.

#### `DELETE /api/applications/:id`
Deletes a single candidate application.
*   **Auth Level**: Protected (Admin)

#### `POST /api/applications/bulk-delete`
Deletes multiple application records at once.
*   **Auth Level**: Protected (Admin)
*   **Request Body**:
    ```json
    {
      "ids": ["60b8c0...1", "60b8c0...2"]
    }
    ```
*   **Responses**:
    *   `200 OK` / `400 Bad Request`.

---

### 3.7 Contact Form Endpoint (`/api/contact`)

#### `POST /api/contact/submit`
Submits contact form and sends notification email to `EMAIL_USER`.
*   **Auth Level**: Public
*   **Request Body**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "1234567890",
      "email": "john.doe@example.com",
      "message": "Interested in consulting services."
    }
    ```
*   **Responses**:
    *   `201 Created`: Form submitted successfully.
    *   `400 Bad Request`: Validation failure.

#### `POST /api/contact/booking`
Submits a client booking form for project estimation.
*   **Auth Level**: Public
*   **Request Body**:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "mobile": "9876543210",
      "business": "Agency details",
      "services": ["web-development", "seo"],
      "otherService": "Consulting",
      "budget": "5000-10000",
      "startTime": "Immediate",
      "guests": ["Guest A", "Guest B"]
    }
    ```
*   **Behavior**:
    *   Persists payload in Bookings DB.
    *   Compiles services list and sends booking details email notification to administration.
*   **Responses**:
    *   `201 Created` / `400 Bad Request`.

---

### 3.8 Hero Form Endpoint (`/api/hero`)

#### `POST /api/hero/submit`
Submits a quick request from the website home hero section.
*   **Auth Level**: Public
*   **Request Body**:
    ```json
    {
      "name": "Alex",
      "mobile": "9999999999",
      "message": "Need a quick callback regarding projects."
    }
    ```
*   **Behavior**:
    *   Saves request to Hero DB.
    *   Triggers email notification to the administrator.
*   **Responses**:
    *   `201 Created` / `400 Bad Request`.

---

### 3.9 Configuration & Settings Endpoint (`/api/settings`)

#### `GET /api/settings/:key`
Retrieves settings values (e.g. company address, phone, social links).
*   **Auth Level**: Public
*   **Responses**:
    *   `200 OK`: Stored key value or `null`.

#### `PUT /api/settings/:key`
Upserts a site configuration setting by its key.
*   **Auth Level**: Protected (Admin)
*   **Request Body**:
    ```json
    {
      "value": {
        "address": "123 Street",
        "phone": "+91 99999 99999",
        "email": "contact@codenap.in",
        "social": {
          "twitter": "https://twitter.com/codenap"
        }
      }
    }
    ```
*   **Responses**:
    *   `200 OK`: Stored and updated configuration object.

---

## 4. Response Codes & Error Handling
Error responses follow a standard shape returned by the `errorHandler` middleware:
*   **Response Body**:
    ```json
    {
      "message": "Error details/description string"
    }
    ```
*   **Standard Status Codes**:
    *   `200 OK`: Successful retrieval or action.
    *   `201 Created`: Successful creation of resources.
    *   `400 Bad Request`: Missing inputs, invalid payloads, schema validation errors, or duplicate unique keys.
    *   `401 Unauthorized`: Token is missing, expired, or invalid.
    *   `403 Forbidden`: Admin role validation check failed.
    *   `404 Not Found`: Target resource could not be found.
    *   `500 Internal Server Error`: Uncaught server exception or database connectivity issues.
