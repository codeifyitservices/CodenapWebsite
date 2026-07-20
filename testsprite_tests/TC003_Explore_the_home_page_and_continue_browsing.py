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
        
        # -> Open the site's home page (navigate to /) so the homepage intro, featured services, and testimonials can be inspected.
        await page.goto("http://localhost:5173/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll to the featured Services section on the Home page, locate the Testimonials section, then click the 'Explore Services' button to continue browsing.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the featured Services section on the Home page, locate the Testimonials section, then click the 'Explore Services' button to continue browsing.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the featured Services section on the Home page, locate the Testimonials section, then click the 'Explore Services' button to continue browsing.
        # Explore Services button
        elem = page.get_by_role('button', name='Explore Services', exact=True)
        await elem.click(timeout=10000)
        
        # -> Scroll to the 'Testimonials' section and verify the 'Testimonials' heading is visible on the page.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the 'Testimonials' section and verify the 'Testimonials' heading is visible on the page.
        # Web Development We design and develop... link
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/div[2]/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify a public destination page is displayed
        # Assert: The URL contains '/services/web-development', indicating the public destination page is displayed.
        await expect(page).to_have_url(re.compile("/services/web\\-development"), timeout=15000), "The URL contains '/services/web-development', indicating the public destination page is displayed."
        
        # --> Verify featured content from the home page is visible
        # Assert: The hero heading "High-Performance Web Applications Built to Scale" is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("High-Performance Web Applications Built to Scale", timeout=15000), "The hero heading \"High-Performance Web Applications Built to Scale\" is visible."
        # Assert: The featured bullet "Custom SPAs and SaaS dashboards" is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("Custom SPAs and SaaS dashboards", timeout=15000), "The featured bullet \"Custom SPAs and SaaS dashboards\" is visible."
        # Assert: The featured bullet "Serverless & Headless architectures" is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("Serverless & Headless architectures", timeout=15000), "The featured bullet \"Serverless & Headless architectures\" is visible."
        # Assert: The featured bullet "SEO-optimized static frameworks" is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("SEO-optimized static frameworks", timeout=15000), "The featured bullet \"SEO-optimized static frameworks\" is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    