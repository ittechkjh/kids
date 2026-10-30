# -*- coding: utf-8 -*-
import sys
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')

def take_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 950})

        page.goto("file:///E:/kids/index.html")
        page.wait_for_timeout(2000)

        # Switch to Food tab
        page.evaluate("app.switchMainView('food')")
        page.wait_for_timeout(1000)

        # 1. Nationwide Overview
        page.screenshot(path="C:/Users/Administrator/.gemini/antigravity/brain/c0862611-06fc-45fb-9e3e-a61ff0b09467/screenshot_nationwide_restaurants_overview.png")

        # 2. Busan Filter View
        page.evaluate("app.onChangeRegion('busan')")
        page.wait_for_timeout(600)
        page.screenshot(path="C:/Users/Administrator/.gemini/antigravity/brain/c0862611-06fc-45fb-9e3e-a61ff0b09467/screenshot_busan_restaurants.png")

        # 3. Jeju Filter View
        page.evaluate("app.onChangeRegion('jeju')")
        page.wait_for_timeout(600)
        page.screenshot(path="C:/Users/Administrator/.gemini/antigravity/brain/c0862611-06fc-45fb-9e3e-a61ff0b09467/screenshot_jeju_restaurants.png")

        browser.close()
        print("Captured 3 screenshots successfully!")

if __name__ == '__main__':
    take_screenshots()
