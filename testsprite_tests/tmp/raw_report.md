
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** CodenapWebsite
- **Date:** 2026-07-20
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Sign in and reach the admin dashboard
- **Test Code:** [TC001_Sign_in_and_reach_the_admin_dashboard.py](./TC001_Sign_in_and_reach_the_admin_dashboard.py)
- **Test Error:** TEST BLOCKED

The test could not be run — login failed because the provided credentials were rejected and no alternative credentials are available to continue the test.

Observations:
- The login page remained on /admin/login and displayed the error message 'Invalid username or password'.
- The username field contains 'example@gmail.com' and a password was submitted, but authentication did not succeed.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/6b84f4e7-e450-4ae4-8149-e3e163ef19b2
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Submit a contact inquiry successfully
- **Test Code:** [TC002_Submit_a_contact_inquiry_successfully.py](./TC002_Submit_a_contact_inquiry_successfully.py)
- **Test Error:** TEST BLOCKED

The contact form could not be tested because the Contact page failed to load and no interactive elements were available.

Observations:
- The /contact page rendered blank in the viewport (screenshot shows an empty white page).
- Browser state reports zero interactive elements and no form fields to interact with.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/bb9c2246-cfe0-4bf0-85f9-0779aaa339ae
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Explore the home page and continue browsing
- **Test Code:** [TC003_Explore_the_home_page_and_continue_browsing.py](./TC003_Explore_the_home_page_and_continue_browsing.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/a421225a-dd6a-40f3-9fcd-75a956cd9070
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Open a service detail page from the services directory
- **Test Code:** [TC004_Open_a_service_detail_page_from_the_services_directory.py](./TC004_Open_a_service_detail_page_from_the_services_directory.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/a656f47e-57c8-4857-90f9-1eb0a7994879
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Open the admin sign-in page
- **Test Code:** [TC005_Open_the_admin_sign_in_page.py](./TC005_Open_the_admin_sign_in_page.py)
- **Test Error:** TEST FAILURE

The admin login page did not render — the login form is not visible on the page.

Observations:
- Navigated to http://localhost:5173/admin/login and the page content is blank with no interactive elements.
- The screenshot shows an empty white page and page stats report 0 interactive elements, indicating the SPA did not load the login UI.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/6563fdd8-50f0-4f27-b85c-2ac3f3b2f87f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Browse all services from the directory
- **Test Code:** [TC006_Browse_all_services_from_the_directory.py](./TC006_Browse_all_services_from_the_directory.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/7fedfc4b-8d96-45b2-b2a5-dbac44e58626
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 View the home page introduction and agency highlights
- **Test Code:** [TC007_View_the_home_page_introduction_and_agency_highlights.py](./TC007_View_the_home_page_introduction_and_agency_highlights.py)
- **Test Error:** TEST FAILURE

The home page did not display the expected main agency introduction or highlighted content — the page rendered as blank.

Observations:
- The browser screenshot and page state show a completely blank page with no visible content.
- The page contains 0 interactive elements and no introduction or highlighted sections are present.
- The SPA content appears not to have loaded (no UI rendered).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/e2c4fd31-7f6a-4ae4-93d4-bc6f202fdd2e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Browse open jobs and start an application
- **Test Code:** [TC008_Browse_open_jobs_and_start_an_application.py](./TC008_Browse_open_jobs_and_start_an_application.py)
- **Test Error:** TEST FAILURE

No job listings or an "Open roles" / listing view was found on the Careers page, so the candidate cannot review available roles from a listing and open a job detail as required.

Observations:
- The Careers page contains a talent-pool section with "Join Talent Network", an application form (file upload, message textarea, and "Submit Application"), and FAQ accordions.
- Multiple scrolls, search queries, and element enumeration across the page did not reveal any job cards, job titles, or an 'Open roles'/'Openings' listing section.
- Scrolling reached the footer (contact and service links) but no job detail links or "Apply" actions tied to a job listing were visible.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/7b916e4e-0893-42e1-8365-1fd11fa12904
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Open a highlighted service from the home page
- **Test Code:** [TC009_Open_a_highlighted_service_from_the_home_page.py](./TC009_Open_a_highlighted_service_from_the_home_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/a627742a-0916-4f4a-ace0-2172be81ae54
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Submit a contact inquiry with minimal valid details
- **Test Code:** [TC010_Submit_a_contact_inquiry_with_minimal_valid_details.py](./TC010_Submit_a_contact_inquiry_with_minimal_valid_details.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/254d4764-68a1-4e56-8741-d944bfa184ed
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Submit a job application successfully
- **Test Code:** [TC011_Submit_a_job_application_successfully.py](./TC011_Submit_a_job_application_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/7e3ba819-0a0a-4e65-8d4f-d30a5b50d961
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Review a job role before applying
- **Test Code:** [TC012_Review_a_job_role_before_applying.py](./TC012_Review_a_job_role_before_applying.py)
- **Test Error:** TEST FAILURE

No job listings or job detail pages are available from the Careers page — candidates cannot open a specific job to view role details or requirements.

Observations:
- The Careers page shows the message 'No suitable role? Join our talent pool.' and includes a talent-pool file upload input instead of job listings.
- Multiple scrolls and page searches were performed and no job titles, 'Open Positions' section, or links to job detail pages were found.
- The UI exposes hiring steps and values but does not present per-role details or requirements to open before applying.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/d127a533-528f-4742-927b-098ce97e8456
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Add a job listing
- **Test Code:** [TC013_Add_a_job_listing.py](./TC013_Add_a_job_listing.py)
- **Test Error:** TEST BLOCKED

The test could not be run — valid admin credentials were not available and the fallback credentials were rejected.

Observations:
- After attempting login, the page shows 'Invalid username or password' in a red alert box.
- Username and password fields are present (inside open shadow DOM) and were filled with example@gmail.com / password123, but login failed.
- No 'Forgot password' or alternative admin access link is visible on the login page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/d1d93199-6dbe-45c0-b240-0e00ebabdd4e
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Create a service successfully
- **Test Code:** [TC014_Create_a_service_successfully.py](./TC014_Create_a_service_successfully.py)
- **Test Error:** TEST BLOCKED

The admin login could not be completed — the provided credentials were rejected and admin access is required to continue the test.

Observations:
- The login form displayed the message 'Invalid username or password'.
- After entering 'example@gmail.com' and 'password123' and clicking 'Log In', the page remained on the login screen showing the same error.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/73caaeb1-babc-43a9-b422-5ef07f4313c9
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Start a job application from a role detail page
- **Test Code:** [TC015_Start_a_job_application_from_a_role_detail_page.py](./TC015_Start_a_job_application_from_a_role_detail_page.py)
- **Test Error:** TEST BLOCKED

The Careers page is blank and no job listings or application flow elements are accessible, so the candidate cannot open role details or reach the application form.

Observations:
- Navigated to /careers but the page shows no content (blank white screen).
- The page reports 0 interactive elements and no job listings were present.
- SPA content appears not to have loaded (no links, buttons, or listings).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f9a2d30c-aebe-4bfa-aa87-6566db7395d8/78d6c122-8d91-4a19-858b-866278b7890c
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **40.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---