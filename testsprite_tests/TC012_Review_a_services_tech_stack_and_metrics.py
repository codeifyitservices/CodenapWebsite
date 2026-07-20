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
        
        # -> Open the Services page by navigating to the site's /services URL and wait for the page to load.
        await page.goto("http://localhost:5173/services")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the site home page (/) to look for a visible 'Services' link or other navigation to the Services listing.
        await page.goto("http://localhost:5173/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Explore Services' button in the hero to open the Services listing or navigate to the Services section.
        # Explore Services button
        elem = page.get_by_role('button', name='Explore Services', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Web Development' service listing to open its detail page.
        # Web Development We design and develop... link
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/div[2]/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # -> Scroll down the 'Web Development' service detail page to reveal the 'What You Get' / 'Our Process' section and verify the service process steps are shown.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> Verify the service detail page displays performance metrics
        # Assert: The performance metric '120+ Web Projects Delivered' is visible on the service detail page.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("120+ Web Projects Delivered", timeout=15000), "The performance metric '120+ Web Projects Delivered' is visible on the service detail page."
        # Assert: The performance metric '99.9% Average Uptime' is visible on the service detail page.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("99.9% Average Uptime", timeout=15000), "The performance metric '99.9% Average Uptime' is visible on the service detail page."
        # Assert: The performance metric '< 2s Avg Load Time' is visible on the service detail page.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("< 2s Avg Load Time", timeout=15000), "The performance metric '< 2s Avg Load Time' is visible on the service detail page."
        # Assert: The performance metric '8+ Years Experience' is visible on the service detail page.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("8+ Years Experience", timeout=15000), "The performance metric '8+ Years Experience' is visible on the service detail page."
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
    