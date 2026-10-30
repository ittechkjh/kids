# -*- coding: utf-8 -*-
import os
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def main():
    index_file = os.path.abspath("index.html")
    file_url = f"file:///{index_file.replace(os.sep, '/')}"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto(file_url, wait_until='domcontentloaded')
        time.sleep(1.5)

        metrics = page.evaluate('''() => {
            const header = document.querySelector('header');
            const topBanner = document.querySelector('body > div');
            const chips = document.getElementById('board-category-chips');
            const asides = Array.from(document.querySelectorAll('aside')).map(a => ({
                display: getComputedStyle(a).display,
                height: a.getBoundingClientRect().height,
                top: a.getBoundingClientRect().top
            }));
            const boardSec = document.getElementById('view-board');
            return {
                viewportHeight: window.innerHeight,
                topBannerHeight: topBanner ? topBanner.getBoundingClientRect().height : 0,
                headerHeight: header ? header.getBoundingClientRect().height : 0,
                headerPosition: header ? getComputedStyle(header).position : '',
                chipsHeight: chips ? chips.getBoundingClientRect().height : 0,
                boardTop: boardSec ? boardSec.getBoundingClientRect().top : 0,
                bodyScrollWidth: document.body.scrollWidth,
                windowInnerWidth: window.innerWidth,
                asides: asides
            };
        }''')
        print('Mobile Metrics:', metrics)
        page.screenshot(path='scripts/mobile_diag_board.png', full_page=False)
        page.screenshot(path='scripts/mobile_diag_board_full.png', full_page=True)

        for v in ['food', 'school', 'apartments', 'admissions']:
            page.evaluate(f"app.switchMainView('{v}')")
            time.sleep(0.8)
            v_metrics = page.evaluate(f'''() => {{
                const sec = document.getElementById('view-{v}');
                return {{
                    top: sec ? sec.getBoundingClientRect().top : 0,
                    scrollWidth: document.body.scrollWidth
                }};
            }}''')
            print(f'View {v} metrics:', v_metrics)
            page.screenshot(path=f'scripts/mobile_diag_{v}.png', full_page=False)

        browser.close()

if __name__ == '__main__':
    main()
