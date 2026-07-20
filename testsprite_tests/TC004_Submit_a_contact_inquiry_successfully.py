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
        
        # -> Click the 'Back to main website' link to return to the public (non-admin) site.
        # Back to main website link
        elem = page.get_by_role('link', name='Back to main website', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the site's Contact page (Contact) so the contact form can be filled and submitted.
        await page.goto("http://localhost:5173/contact")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Fill the contact form (Full Name, Email Address, "Tell Us What You Need" field) and click the 'SUBMIT REQUEST' button.
        # Full Name text field
        elem = page.get_by_placeholder('Full Name', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test User")
        
        # -> Fill the contact form (Full Name, Email Address, "Tell Us What You Need" field) and click the 'SUBMIT REQUEST' button.
        # Email Address email field
        elem = page.get_by_placeholder('Email Address', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("test.user@example.com")
        
        # -> Fill the contact form (Full Name, Email Address, "Tell Us What You Need" field) and click the 'SUBMIT REQUEST' button.
        # Tell Us What You Need (e.g. key specifications... text area
        elem = page.get_by_placeholder('Tell Us What You Need (e.g. key specifications, integrations)', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Requesting development of a custom web application with user authentication, payment integration, and an admin dashboard. Please advise on timeline and provide an estimate.")
        
        # -> Fill the contact form (Full Name, Email Address, "Tell Us What You Need" field) and click the 'SUBMIT REQUEST' button.
        # Submit Request button
        elem = page.get_by_role('button', name='Submit Request', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify a submission confirmation is visible
        # Assert: Expected submission confirmation to be visible with text 'Thank you for contacting us'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/div[2]/form/button").nth(0)).to_contain_text("Thank you for contacting us", timeout=15000), "Expected submission confirmation to be visible with text 'Thank you for contacting us'."
        
        # --> Verify the contact form is no longer the active state
        # Assert: Expected the Submit Request button to no longer be visible after submission.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/div[2]/form/button").nth(0)).not_to_be_visible(timeout=15000), "Expected the Submit Request button to no longer be visible after submission."
        # Assert: Expected the contact form message textarea to no longer be visible after submission.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/div[2]/form/div[5]/textarea").nth(0)).not_to_be_visible(timeout=15000), "Expected the contact form message textarea to no longer be visible after submission."
        # Assert: Expected the Full Name input to be cleared after submission.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/div[2]/form/div[1]/input").nth(0)).to_have_value("", timeout=15000), "Expected the Full Name input to be cleared after submission."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    