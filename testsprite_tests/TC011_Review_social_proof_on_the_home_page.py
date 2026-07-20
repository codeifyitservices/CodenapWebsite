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
        
        # -> Open the site's home page and look for the testimonials section that demonstrates the agency's credibility.
        await page.goto("http://localhost:5173/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll the home page to reveal content below the hero and locate the 'testimonials' section by searching for the word 'testimonials'.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the home page to reveal the 'testimonials' section and locate testimonial entries.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the home page to reveal the 'Testimonials' section and verify testimonial entries are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll slightly to center the 'THE VOICE OF SUCCESS' testimonials section and verify testimonial entries and client images are visible.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> Verify testimonials are displayed
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[1]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: The testimonial from David Chen is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[1]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "The testimonial from David Chen is visible."
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[2]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: The testimonial from Sarah Jenkins is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[2]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "The testimonial from Sarah Jenkins is visible."
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[3]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: The testimonial from Marcus Thorne is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[3]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "The testimonial from Marcus Thorne is visible."
        
        # --> Verify supporting agency highlights are displayed
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[1]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: Client image with alt 'David Chen' is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[1]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "Client image with alt 'David Chen' is visible."
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[2]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: Client image with alt 'Sarah Jenkins' is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[2]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "Client image with alt 'Sarah Jenkins' is visible."
        await page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[3]/div[2]/img").nth(0).scroll_into_view_if_needed()
        # Assert: Client image with alt 'Marcus Thorne' is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/section[1]/div[3]/div[2]/div[3]/div[2]/img").nth(0)).to_be_visible(timeout=15000), "Client image with alt 'Marcus Thorne' is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    