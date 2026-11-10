"""모든 테스트를 한 번에 실행한다.

사용법:  uv run --with playwright python tests/run_all.py
(자체 HTTP 서버를 임시 포트로 띄우므로 별도 서버가 필요 없다.)
"""
import functools
import http.server
import os
import subprocess
import sys
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TESTS = ["test_smoke.py", "test_auth_profile_persistence.py", "test_naver_copy_and_dup.py"]


def main():
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args, **kwargs):
            pass

    handler = functools.partial(QuietHandler, directory=str(ROOT))
    with http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler) as srv:
        port = srv.server_address[1]
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        env = {**os.environ, "BASE_URL": f"http://127.0.0.1:{port}", "PYTHONIOENCODING": "utf-8"}
        failed = []
        for name in TESTS:
            print(f"\n=== {name} ===", flush=True)
            r = subprocess.run([sys.executable, str(ROOT / "tests" / name)], env=env)
            if r.returncode != 0:
                failed.append(name)
        srv.shutdown()
    print("\nRESULT:", "FAILED " + ", ".join(failed) if failed else "ALL PASSED")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
