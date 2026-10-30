# -*- coding: utf-8 -*-
import sys
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1280, "height": 900})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto("file:///E:/kids/index.html")
    pg.wait_for_timeout(1500)
    pg.evaluate("app.switchMainView('food')")
    pg.wait_for_timeout(1000)
    print("badge:", pg.locator("#food-count-badge").inner_text())
    print("list:", pg.locator("#food-restaurants-list").inner_text()[:200])
    print("errors:", errs)
    b.close()
