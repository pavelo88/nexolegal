import os
from playwright.sync_api import sync_playwright

os.makedirs('scratch/capture', exist_ok=True)
p = sync_playwright().start()
b = p.chromium.launch(headless=True)

# 1. Mobile captures (430 x 932)
mobile_ctx = b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
page_m = mobile_ctx.new_page()

# Home
page_m.goto('http://localhost:4040/')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_home.png')

page_m.evaluate('window.scrollTo(0, 800)')
page_m.wait_for_timeout(600)
page_m.screenshot(path='scratch/capture/m_home_scroll.png')

# Nosotros
page_m.goto('http://localhost:4040/nosotros')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_nosotros.png')

page_m.evaluate('window.scrollTo(0, 880)')
page_m.wait_for_timeout(700)
page_m.screenshot(path='scratch/capture/m_nosotros_orbit.png')

# Login / Ingresar
page_m.goto('http://localhost:4040/ingresar')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_login.png')

# User Portal
page_m.goto('http://localhost:4040/user')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_user.png')

page_m.evaluate('window.scrollTo(0, 650)')
page_m.wait_for_timeout(600)
page_m.screenshot(path='scratch/capture/m_user_scroll.png')

# Empresas
page_m.goto('http://localhost:4040/empresas')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_empresas.png')

# Abogado
page_m.goto('http://localhost:4040/abogado')
page_m.wait_for_timeout(1000)
page_m.screenshot(path='scratch/capture/m_abogado.png')

# 2. Desktop captures (1920 x 1080)
desk_ctx = b.new_context(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
page_d = desk_ctx.new_page()

# Admin Dashboard
page_d.goto('http://localhost:4040/admin')
page_d.wait_for_timeout(1200)
page_d.screenshot(path='scratch/capture/d_admin_top.png')

# Admin CRM / Leads with WhatsApp buttons
try:
    page_d.click('text=Pipeline Leads')
    page_d.wait_for_timeout(800)
    page_d.screenshot(path='scratch/capture/d_admin_crm_leads.png')
except Exception as e:
    print('CRM click fallback:', e)
    page_d.evaluate('window.scrollTo(0, 600)')
    page_d.wait_for_timeout(600)
    page_d.screenshot(path='scratch/capture/d_admin_crm_leads.png')

b.close()
p.stop()
print('All screens successfully captured in scratch/capture!')
