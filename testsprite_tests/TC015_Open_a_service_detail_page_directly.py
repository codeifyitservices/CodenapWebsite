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
        
        # -> Open the site's public 'Services' page by navigating to /services and wait for service cards or a 'Services' heading to appear.
        await page.goto("http://localhost:5173/services")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Explore Service' link on the Web Development card to open its detail page.
        # Code That Converts. Web Development We design and... link
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/div[3]/div[2]/div/a')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the service detail content is displayed
        # Assert: Service detail heading "High-Performance Web Applications Built to Scale" is visible.
        await expect(page.locator("xpath=/html/body/div/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("High-Performance Web Applications Built to Scale", timeout=15000), "Service detail heading \"High-Performance Web Applications Built to Scale\" is visible."
        # Assert: The detailed service description paragraph is visible on the page.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("We design and develop high-performance web applications with seamless user experiences, robust security, and scalable architectures, tailored to meet your business's growth demands.", timeout=15000), "The detailed service description paragraph is visible on the page."
        
        # --> Verify the page provides a deeper explanation of the selected service
        # Assert: The page contains the explanatory paragraph about engineering digital experiences.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("At CodeNap, web development is not just about writing code \u2014 it's about engineering digital experiences that perform under real-world conditions.", timeout=15000), "The page contains the explanatory paragraph about engineering digital experiences."
        # Assert: The page contains the detailed description of the web development offering.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("We design and develop high-performance web applications with seamless user experiences, robust security, and scalable architectures, tailored to meet your business's growth demands.", timeout=15000), "The page contains the detailed description of the web development offering."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    