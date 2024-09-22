#!/usr/bin/env python3
# screenlink Source Code
from http.server import HTTPServer, BaseHTTPRequestHandler
import subprocess
import ctypes
import ctypes.wintypes

# Windows constants
KEYEVENTF_KEYUP = 0x0002
VK_SNAPSHOT = 0x2C

# Load user32.dll
user32 = ctypes.windll.user32

def press_print_screen():
    # Press the Print Screen key
    user32.keybd_event(VK_SNAPSHOT, 0, 0, 0)
    # Release the Print Screen key
    user32.keybd_event(VK_SNAPSHOT, 0, KEYEVENTF_KEYUP, 0)

class CORSRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/screenshot':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*')  # Allow all origins
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
            self.end_headers()
            press_print_screen()
            self.wfile.write(b"Screenshot taken")
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        self.end_headers()

def run(server_class=HTTPServer, handler_class=CORSRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()