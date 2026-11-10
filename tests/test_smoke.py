"""Smoke test: 페이지 로드 시 JS 오류가 없고 핵심 객체가 초기화되는지 확인."""
import os
import sys

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_timeout(1000)
        state = page.evaluate(
            "() => ({ app: typeof window.app, fb: typeof window.DodamFirebase,"
            " login: typeof window.app?.handleAuthSubmit,"
            " profile: typeof window.app?.saveProfile })"
        )
        browser.close()
    assert not errors, f"Page errors: {errors}"
    assert state["app"] == "object", state
    assert state["login"] == "function", state
    assert state["profile"] == "function", state
    print("smoke OK", state)


if __name__ == "__main__":
    run()
