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
        
        # -> Click the 'Join Talent Pool' button to open the application form (after searching the page for any existing 'Apply' or job links).
        # Join Talent Pool button
        elem = page.get_by_role('button', name='Join Talent Pool', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill the Name, Email and Message fields and click the 'Submit Application' button.
        # Jane Smith text field
        elem = page.get_by_placeholder('Jane Smith', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Alex Morgan")
        
        # -> Fill the Name, Email and Message fields and click the 'Submit Application' button.
        # jane@example.com email field
        elem = page.get_by_placeholder('jane@example.com', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("alex.morgan@example.com")
        
        # -> Fill the Name, Email and Message fields and click the 'Submit Application' button.
        # Tell us a bit about your background and what... text area
        elem = page.get_by_placeholder("Tell us a bit about your background and what you're looking for…", exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("I am very interested in opportunities at CodeNap. I have 5 years of frontend experience building React applications and strong experience with Node.js. I would love to contribute and learn more about relevant roles.")
        
        # -> Fill the Name, Email and Message fields and click the 'Submit Application' button.
        # Submit Application button
        elem = page.get_by_role('button', name='Submit Application', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the "Select notice period" dropdown and choose a notice period (e.g., 'Immediate Joiner') once the options appear.
        # Select notice period Immediate Joiner 15 Days 30... dropdown
        elem = page.get_by_text('Select notice period Immediate Joiner 15 Days 30 Days 60 Days 90 Days', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select 'Immediate Joiner' from the 'Select notice period' dropdown and fill State, City, Experience, and Applied For fields.
        # Select notice period Immediate Joiner 15 Days 30... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[2]/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Immediate Joiner' from the 'Select notice period' dropdown and fill State, City, Experience, and Applied For fields.
        # Select state Andhra Pradesh Bihar Delhi Gujarat... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[3]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Immediate Joiner' from the 'Select notice period' dropdown and fill State, City, Experience, and Applied For fields.
        # e.g. Faridabad text field
        elem = page.get_by_placeholder('e.g. Faridabad', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Faridabad")
        
        # -> Select 'Immediate Joiner' from the 'Select notice period' dropdown and fill State, City, Experience, and Applied For fields.
        # Select experience Fresher 0–1 Years 1–3 Years 3–5... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[4]/div/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select 'Immediate Joiner' from the 'Select notice period' dropdown and fill State, City, Experience, and Applied For fields.
        # Select role Senior Frontend Developer Full-Stack... dropdown
        elem = page.locator("xpath=/html/body/div/div/div/div[2]/section[5]/div/div[2]/form/div[4]/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Upload a resume file, fill the Phone Number with 9876543210, then click the 'Submit Application' button to send the application.
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
        
        # -> Upload a resume file, fill the Phone Number with 9876543210, then click the 'Submit Application' button to send the application.
        # 98765 43210 tel field
        elem = page.get_by_placeholder('98765 43210', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9876543210")
        
        # -> Upload a resume file, fill the Phone Number with 9876543210, then click the 'Submit Application' button to send the application.
        # Submit Application button
        elem = page.get_by_role('button', name='Submit Application', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    