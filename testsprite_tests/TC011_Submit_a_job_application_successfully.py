import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173/admin/services")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the Careers page (navigate to the site's Careers page).
        await page.goto("http://localhost:5173/careers")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click a job listing to open its details (find and select a visible job posting on the Careers page).
        await page.mouse.wheel(0, 300)
        
        # -> Click a job listing to open its details (after revealing the listings by scrolling if needed).
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the Careers page to reveal job listings so a visible job posting can be clicked.
        await page.mouse.wheel(0, 300)
        
        # -> Open the 'Applied For' dropdown (label: "Applied For *" / placeholder "Select role").
        # Select role Senior Frontend Developer Full-Stack... dropdown
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[4]/div[2]/select')
        await elem.click(timeout=10000)
        
        # -> Select 'Senior Frontend Developer' from the 'Applied For' dropdown
        # Select role Senior Frontend Developer Full-Stack... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[4]/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select '1–3 Years' from the 'No. of Experience' dropdown
        # Select experience Fresher 0–1 Years 1–3 Years 3–5... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[4]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Set 'Notice Period' to 'Immediate Joiner' from the 'Notice Period' dropdown, then set 'Current State' to 'Delhi'.
        # Select notice period Immediate Joiner 15 Days 30... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[2]/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Set 'Notice Period' to 'Immediate Joiner' from the 'Notice Period' dropdown, then set 'Current State' to 'Delhi'.
        # Select state Andhra Pradesh Bihar Delhi Gujarat... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[3]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill the 'Name', 'Email Address', 'Phone Number', 'Current City', and 'Message to HR' fields with valid applicant details.
        # Jane Smith text field
        elem = page.get_by_placeholder('Jane Smith', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test Candidate")
        
        # -> Fill the 'Name', 'Email Address', 'Phone Number', 'Current City', and 'Message to HR' fields with valid applicant details.
        # jane@example.com email field
        elem = page.get_by_placeholder('jane@example.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("test.candidate+qa@example.com")
        
        # -> Fill the 'Name', 'Email Address', 'Phone Number', 'Current City', and 'Message to HR' fields with valid applicant details.
        # 98765 43210 tel field
        elem = page.get_by_placeholder('98765 43210', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9876543210")
        
        # -> Fill the 'Name', 'Email Address', 'Phone Number', 'Current City', and 'Message to HR' fields with valid applicant details.
        # e.g. Faridabad text field
        elem = page.get_by_placeholder('e.g. Faridabad', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Faridabad")
        
        # -> Fill the 'Name', 'Email Address', 'Phone Number', 'Current City', and 'Message to HR' fields with valid applicant details.
        # Tell us a bit about your background and what... text area
        elem = page.get_by_placeholder("Tell us a bit about your background and what you're looking for…", exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("I am excited to apply for the Senior Frontend Developer role. I have 2 years of relevant experience and am eager to contribute to the team.")
        
        # -> Attach a resume using the 'Browse' control (Attach Resume) and then click the 'Submit Application' button.
        # file upload
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[5]/input')
        await elem.wait_for(state="attached", timeout=10000)
        if await elem.evaluate("e => e.tagName === 'INPUT' && (e.type || '').toLowerCase() === 'file'"):
            await elem.set_input_files("./fixtures/resume.pdf")
        else:
            await elem.wait_for(state="visible", timeout=10000)
            async with page.expect_file_chooser() as fc_info:
                await elem.click()
            chooser = await fc_info.value
            await chooser.set_files("./fixtures/resume.pdf")
        
        # --> Assertions to verify final state
        
        # --> Verify a successful application confirmation is visible
        # Assert: A confirmation message indicates the application was received.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("We've received your resume and details.", timeout=15000), "A confirmation message indicates the application was received."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    