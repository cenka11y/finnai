from playwright.sync_api import sync_playwright
import sys

def take_screenshot(html_file, output_file):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # Set viewport to a larger size for better capture
        page.set_viewport_size({"width": 1440, "height": 900})
        
        # Load the HTML file
        page.goto(f"file://{html_file}")
        
        # Wait for page to load completely
        page.wait_for_load_state('networkidle')
        
        # Take full page screenshot
        page.screenshot(path=output_file, full_page=True)
        
        browser.close()
        
        print(f"Screenshot saved to {output_file}")

if __name__ == "__main__":
    html_file = "/workspace/SUOAI_Homepage_Enhanced.html"
    output_file = "/workspace/souai_enhanced_preview.png"
    take_screenshot(html_file, output_file)