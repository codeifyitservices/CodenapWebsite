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
        
        # -> Click the 'Back to main website' link to return to the public site and look for a Services link or navigation.
        # Back to main website link
        elem = page.get_by_role('link', name='Back to main website', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the public 'Services' page by navigating to /services and wait for content to load.
        await page.goto("http://localhost:5173/services")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Web Development' service card to open its detail page.
        # Code That Converts. Web Development We design and... link
        elem = page.locator('xpath=/html/body/div/div/div/div[2]/div[3]/div[2]/div/a')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify multiple service cards are displayed
        await page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[1]/div").nth(0).scroll_into_view_if_needed()
        # Assert: The first service card is visible on the Services page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[1]/div").nth(0)).to_be_visible(timeout=15000), "The first service card is visible on the Services page."
        await page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[2]/div").nth(0).scroll_into_view_if_needed()
        # Assert: The second service card is visible on the Services page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[2]/div").nth(0)).to_be_visible(timeout=15000), "The second service card is visible on the Services page."
        await page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[3]/div").nth(0).scroll_into_view_if_needed()
        # Assert: The third service card is visible on the Services page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[3]/div").nth(0)).to_be_visible(timeout=15000), "The third service card is visible on the Services page."
        
        # --> Verify the service detail page is displayed
        # Assert: The browser is on the Web Development service detail URL.
        await expect(page).to_have_url(re.compile("/services/web\\-development"), timeout=15000), "The browser is on the Web Development service detail URL."
        await page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0).scroll_into_view_if_needed()
        # Assert: The service detail hero content is visible on the page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_be_visible(timeout=15000), "The service detail hero content is visible on the page."
        
        # --> Verify service-specific information is displayed
        # Assert: Breadcrumb shows 'Services'.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[1]/a[2]").nth(0)).to_have_text("Services", timeout=15000), "Breadcrumb shows 'Services'."
        # Assert: Service detail page displays the service title.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("High-Performance Web Applications Built to Scale", timeout=15000), "Service detail page displays the service title."
        # Assert: Service detail page displays the descriptive paragraph for the service.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[1]/div[2]/div[2]/div/div[2]/div[1]").nth(0)).to_contain_text("We design and develop high-performance web applications with seamless user experiences, robust security, and scalable architectures, tailored to meet your business's growth demands.", timeout=15000), "Service detail page displays the descriptive paragraph for the service."
        # Assert: Service detail page lists the 'Custom SPAs and SaaS dashboards' bullet.
        await expect(page.locator("xpath=/html/body/div[1]/div/div/div[2]/div[3]/section[4]/div[2]/div[1]/div").nth(0)).to_contain_text("Custom SPAs and SaaS dashboards", timeout=15000), "Service detail page lists the 'Custom SPAs and SaaS dashboards' bullet."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    