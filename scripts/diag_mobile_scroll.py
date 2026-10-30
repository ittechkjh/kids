# -*- coding: utf-8 -*-
import os, time
from playwright.sync_api import sync_playwright

def main():
    index_file = os.path.abspath("index.html")
    file_url = f"file:///{index_file.replace(os.sep, '/')}"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto(file_url, wait_until='domcontentloaded')
        time.sleep(1.5)

        for v in ['school', 'apartments', 'food', 'admissions']:
            page.evaluate(f"app.switchMainView('{v}')")
            time.sleep(0.8)
            page.evaluate("window.scrollTo(0, 500)")
            time.sleep(0.3)
            page.screenshot(path=f'scripts/mobile_scroll_{v}.png', full_page=False)

        browser.close()

if __name__ == '__main__':
    main()
