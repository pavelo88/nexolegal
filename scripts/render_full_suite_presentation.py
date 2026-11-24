import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_SEC = 42
TOTAL_FRAMES = DURATION_SEC * FPS

FFMPEG_PATH = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
MUSIC_PATH = r"C:\Users\pablo\.claude\skills\brag\assets\music\happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"
OUTPUT_PATH = r"C:\Users\pablo\Documents\Judicial\public\vis_legal_suite_completa.mp4"

# Fonts
FONT_SERIF_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 54)
FONT_SERIF_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 36)
FONT_SERIF_H3 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 26)
FONT_SANS_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 24)
FONT_SANS_REG = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 20)
FONT_SANS_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 16)
FONT_MONO = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 16)
FONT_MONO_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\consolab.ttf", 18)

# Colors
COLOR_BG_DARK = (7, 25, 22)
COLOR_BG_EMERALD = (16, 45, 41)
COLOR_GOLD = (201, 154, 91)
COLOR_GOLD_LIGHT = (231, 199, 141)
COLOR_WHITE = (255, 255, 255)
COLOR_MUTED = (200, 218, 212)
COLOR_GREEN = (52, 199, 89)

# Preload assets
LOGO_IMG = Image.open(r"C:\Users\pablo\Documents\Judicial\public\logo.png").convert("RGBA")

# Load captured screens
CAP_DIR = r"C:\Users\pablo\Documents\Judicial\scratch\capture"
M_HOME = Image.open(os.path.join(CAP_DIR, "m_home.png")).convert("RGBA")
M_HOME_SCROLL = Image.open(os.path.join(CAP_DIR, "m_home_scroll.png")).convert("RGBA")
M_NOSOTROS = Image.open(os.path.join(CAP_DIR, "m_nosotros.png")).convert("RGBA")
M_NOSOTROS_ORBIT = Image.open(os.path.join(CAP_DIR, "m_nosotros_orbit.png")).convert("RGBA")
M_LOGIN = Image.open(os.path.join(CAP_DIR, "m_login.png")).convert("RGBA")
M_USER = Image.open(os.path.join(CAP_DIR, "m_user.png")).convert("RGBA")
M_USER_SCROLL = Image.open(os.path.join(CAP_DIR, "m_user_scroll.png")).convert("RGBA")
M_EMPRESAS = Image.open(os.path.join(CAP_DIR, "m_empresas.png")).convert("RGBA")
M_ABOGADO = Image.open(os.path.join(CAP_DIR, "m_abogado.png")).convert("RGBA")
D_ADMIN_TOP = Image.open(os.path.join(CAP_DIR, "d_admin_top.png")).convert("RGBA")
D_ADMIN_CRM = Image.open(os.path.join(CAP_DIR, "d_admin_crm_leads.png")).convert("RGBA")

def create_base_canvas():
    base = Image.new("RGBA", (WIDTH, HEIGHT), COLOR_BG_DARK)
    draw = ImageDraw.Draw(base)
    for r in range(HEIGHT, 0, -8):
        alpha = int(40 * (1 - r / HEIGHT))
        color = (23, 61, 54, alpha)
        draw.ellipse([WIDTH//2 - r*1.4, -r//3, WIDTH//2 + r*1.4, r*1.3], fill=color)
    return base

BASE_CANVAS = create_base_canvas()

def draw_top_bar(draw, section_tag="SUITE JURÍDICA INTEGRAL"):
    # Logo miniature top left
    logo_sz = 44
    lr = LOGO_IMG.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    draw.rounded_rectangle([60, 30, 60 + logo_sz, 30 + logo_sz], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    
    # Title
    draw.text((120, 32), "VIS LEGAL ABOGADOS & LEGALTECH", fill=COLOR_WHITE, font=FONT_SANS_BOLD)
    draw.text((120, 58), "Plataforma Web, Portales de Litigio y Gestión de Leads CRM", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    # Right Badge
    draw.rounded_rectangle([WIDTH - 380, 32, WIDTH - 60, 70], radius=18, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.ellipse([WIDTH - 365, 47, WIDTH - 355, 57], fill=COLOR_GREEN)
    draw.text((WIDTH - 345, 43), section_tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

def render_phone_mockup(screen_img, scroll_pct=0.0):
    # Phone container: width 440, height 900
    pw, ph = 440, 900
    phone = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(phone)

    # Outer bezel (titanium dark edge with subtle glow)
    pdraw.rounded_rectangle([0, 0, pw, ph], radius=48, fill=(28, 36, 34), outline=COLOR_GOLD, width=2)
    # Inner border
    pdraw.rounded_rectangle([6, 6, pw - 6, ph - 6], radius=44, fill=(10, 15, 14))

    # Screen dimensions
    sw, sh = pw - 24, ph - 24
    
    # Resize screen_img keeping aspect ratio
    orig_w, orig_h = screen_img.size
    target_w = sw
    target_h = int(orig_h * (sw / orig_w))
    screen_resized = screen_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Calculate scroll offset
    max_scroll = max(0, target_h - sh)
    offset_y = int(max_scroll * scroll_pct)

    # Crop visible viewport
    screen_crop = screen_resized.crop((0, offset_y, sw, offset_y + sh))

    # Mask with rounded corners
    mask = Image.new("L", (sw, sh), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle([0, 0, sw, sh], radius=36, fill=255)

    phone.paste(screen_crop, (12, 12), mask)

    # Dynamic Island / Notch
    pdraw.rounded_rectangle([pw//2 - 60, 22, pw//2 + 60, 48], radius=13, fill=(5, 5, 5))
    pdraw.ellipse([pw//2 + 35, 30, pw//2 + 45, 40], fill=(20, 30, 40))

    # Home indicator bar
    pdraw.rounded_rectangle([pw//2 - 65, ph - 22, pw//2 + 65, ph - 17], radius=3, fill=(255, 255, 255, 180))

    return phone

def render_desktop_mockup(screen_img, scroll_pct=0.0):
    # Desktop window container: width 1720, height 940
    dw, dh = 1720, 930
    desk = Image.new("RGBA", (dw, dh), (0, 0, 0, 0))
    ddraw = ImageDraw.Draw(desk)

    # Outer frame (MacBook / Studio Display style)
    ddraw.rounded_rectangle([0, 0, dw, dh], radius=28, fill=(18, 25, 23), outline=COLOR_GOLD, width=2)

    # Top Window Bar
    ddraw.rounded_rectangle([0, 0, dw, 54], radius=28, fill=(12, 18, 16))
    ddraw.rectangle([0, 30, dw, 54], fill=(12, 18, 16))
    # Window dots
    ddraw.ellipse([25, 21, 37, 33], fill=(255, 95, 86))
    ddraw.ellipse([45, 21, 57, 33], fill=(255, 189, 46))
    ddraw.ellipse([65, 21, 77, 33], fill=(39, 201, 63))

    # URL bar
    ddraw.rounded_rectangle([dw//2 - 280, 14, dw//2 + 280, 44], radius=15, fill=(24, 34, 30), outline=(201, 154, 91, 100), width=1)
    ddraw.text((dw//2 - 140, 20), "https://vislegalabogados.com/admin", fill=COLOR_MUTED, font=FONT_MONO)

    # Screen dimensions
    sw, sh = dw - 16, dh - 64
    orig_w, orig_h = screen_img.size
    target_w = sw
    target_h = int(orig_h * (sw / orig_w))
    screen_resized = screen_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    max_scroll = max(0, target_h - sh)
    offset_y = int(max_scroll * scroll_pct)
    screen_crop = screen_resized.crop((0, offset_y, sw, offset_y + sh))

    mask = Image.new("L", (sw, sh), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle([0, 0, sw, sh], radius=18, fill=255)

    desk.paste(screen_crop, (8, 56), mask)
    return desk

# ─── 7 SCENE RENDERERS ────────────────────────────────────────────────────────

def scene_1_mobile_home(progress):
    # Scene 1: Web Pública en Celular (0 - 6s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "1. WEB PÚBLICA EN CELULAR")

    # Left Column: Info
    lx = 100
    draw.rounded_rectangle([lx, 150, lx + 300, 185], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 158), "RESPONSIVE APPLE LUXURY", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 210), "Web Pública Oficial", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 280), "Diseño Cinematográfico & Conversión", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    bullets = [
        ("Hero Nítido 2K", "Optimizado en WebP de alta fidelidad sin recortes ni distorsiones."),
        ("Marquesina Promocional", "50% de descuento en diagnósticos preventivos y consultas."),
        ("Dock Inferior Flotante", "Píldora curvada Apple Luxury con feedback táctil y acceso rápido."),
        ("Áreas de Práctica", "Litigios, Derecho Penal, Corporativo, Familiar y Sucesiones.")
    ]
    by = 360
    for title, desc in bullets:
        draw.rounded_rectangle([lx, by, lx + 740, by + 90], radius=16, fill=(18, 38, 34, 210), outline=(201, 154, 91, 100), width=1)
        draw.text((lx + 25, by + 16), title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((lx + 25, by + 48), desc, fill=COLOR_MUTED, font=FONT_SANS_REG)
        by += 105

    # Right Column: Phone Mockup
    # Blend between m_home and m_home_scroll as progress increases
    curr_screen = M_HOME if progress < 0.5 else M_HOME_SCROLL
    scroll = (progress * 1.5) % 1.0
    phone = render_phone_mockup(curr_screen, scroll_pct=scroll * 0.4)
    frame.paste(phone, (1260, 110), phone)

    return frame

def scene_2_mobile_nosotros(progress):
    # Scene 2: Nosotros & Órbita en Celular (6 - 12s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "2. FIRMA & SOCIO FUNDADOR")

    lx = 100
    draw.rounded_rectangle([lx, 150, lx + 340, 185], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 158), "DESPACHO & ÓRBITA JURÍDICA", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 210), "Ab. José Aimacaña Mgtr.", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 280), "Socio Fundador & Director de Litigios", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    bullets = [
        ("Formación Académica de Élite", "Universidad Central, Máster en Derecho Procesal Penal y Alicante España."),
        ("Órbita de Principios Rotativa", "Animación física en sentido horario con momentum y tarjeta interactiva."),
        ("Los 3 Pilares Fundamentales", "Talento e Innovación, Confidencialidad y Ética, Persistencia y Tenacidad."),
        ("Publicación Doctrinal", "«El doble conforme en Ecuador y una garantía procesal sin regulación expresa».")
    ]
    by = 360
    for title, desc in bullets:
        draw.rounded_rectangle([lx, by, lx + 740, by + 90], radius=16, fill=(18, 38, 34, 210), outline=(201, 154, 91, 100), width=1)
        draw.text((lx + 25, by + 16), title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((lx + 25, by + 48), desc, fill=COLOR_MUTED, font=FONT_SANS_REG)
        by += 105

    curr_screen = M_NOSOTROS if progress < 0.45 else M_NOSOTROS_ORBIT
    scroll = (progress * 1.4) % 1.0
    phone = render_phone_mockup(curr_screen, scroll_pct=scroll * 0.35)
    frame.paste(phone, (1260, 110), phone)

    return frame

def scene_3_mobile_login(progress):
    # Scene 3: Acceso Multi-Rol & Credenciales (12 - 18s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "3. ACCESO A LAS APLICACIONES")

    lx = 100
    draw.rounded_rectangle([lx, 150, lx + 330, 185], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 158), "ENTRADA CON CLAVES DE MUESTRA", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 210), "Acceso Seguro a las 4 Apps", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 280), "Demostración de perfiles en un solo clic", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    roles = [
        ("1. Perfil Cliente / Usuario", "cliente@vislegal.example", "DemoCliente2026!", (59, 130, 246)),
        ("2. Perfil B2B Empresas", "empresa@vislegal.example", "DemoEmpresa2026!", (16, 185, 129)),
        ("3. Perfil Abogado Letrado", "abogado@vislegal.example", "DemoAbogado2026!", (245, 158, 11)),
        ("4. Perfil Dirección General", "admin@vislegal.example", "DemoAdmin2026!", (168, 85, 247))
    ]
    by = 360
    for name, user, pwd, col in roles:
        draw.rounded_rectangle([lx, by, lx + 740, by + 90], radius=16, fill=(18, 38, 34, 210), outline=col, width=1)
        draw.text((lx + 25, by + 14), name, fill=col, font=FONT_SANS_BOLD)
        draw.text((lx + 25, by + 46), f"Usuario: {user}   |   Clave: {pwd}", fill=COLOR_WHITE, font=FONT_MONO)
        by += 105

    phone = render_phone_mockup(M_LOGIN, scroll_pct=progress * 0.2)
    frame.paste(phone, (1260, 110), phone)

    return frame

def scene_4_mobile_user(progress):
    # Scene 4: App Cliente en Celular (18 - 24s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "4. PORTAL CLIENTE SATJE")

    lx = 100
    draw.rounded_rectangle([lx, 150, lx + 320, 185], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 158), "SEGUIMIENTO PROCESAL EN VIVO", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 210), "App Clientes & Causas", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 280), "Expedientes SATJE y Asistencia IA 24/7", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    bullets = [
        ("Expedientes SATJE en Vivo", "Juicios individuales con fechas de audiencia, jueces y bitácora procesal."),
        ("Asistente Jurídico con IA", "Traduce providencias y notificaciones oscuras a lenguaje claro y sencillo."),
        ("Aula Virtual de Prevención", "Módulos de capacitación ciudadana en derecho penal, laboral y familiar."),
        ("Facturación Electrónica SRI", "Comprobantes digitales y control de pagos certificados.")
    ]
    by = 360
    for title, desc in bullets:
        draw.rounded_rectangle([lx, by, lx + 740, by + 90], radius=16, fill=(18, 38, 34, 210), outline=(201, 154, 91, 100), width=1)
        draw.text((lx + 25, by + 16), title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((lx + 25, by + 48), desc, fill=COLOR_MUTED, font=FONT_SANS_REG)
        by += 105

    curr_screen = M_USER if progress < 0.5 else M_USER_SCROLL
    scroll = (progress * 1.5) % 1.0
    phone = render_phone_mockup(curr_screen, scroll_pct=scroll * 0.35)
    frame.paste(phone, (1260, 110), phone)

    return frame

def scene_5_mobile_empresas_abogados(progress):
    # Scene 5: Portales B2B & Letrados en Celular (24 - 30s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "5. PORTALES EMPRESAS & LETRADOS")

    lx = 100
    draw.rounded_rectangle([lx, 150, lx + 360, 185], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 158), "GESTIÓN CORPORATIVA Y LITIGANTES", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 210), "Empresas B2B & Letrados", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 280), "Blindaje mercantil y control de litigios", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    bullets = [
        ("Portal Corporativo Empresas", "Gestión de contratos mercantiles de alta complejidad y compliance preventivo."),
        ("Auditoría Laboral Societaria", "Control de desvinculaciones, mediaciones y protección de directorios."),
        ("Tablero del Abogado Litigante", "Agenda judicial de audiencias orales, bitácora y casación penal."),
        ("Coordinación de Equipos", "Asignación de causas según especialidad y carga de trabajo del letrado.")
    ]
    by = 360
    for title, desc in bullets:
        draw.rounded_rectangle([lx, by, lx + 740, by + 90], radius=16, fill=(18, 38, 34, 210), outline=(201, 154, 91, 100), width=1)
        draw.text((lx + 25, by + 16), title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((lx + 25, by + 48), desc, fill=COLOR_MUTED, font=FONT_SANS_REG)
        by += 105

    curr_screen = M_EMPRESAS if progress < 0.5 else M_ABOGADO
    scroll = (progress * 1.3) % 1.0
    phone = render_phone_mockup(curr_screen, scroll_pct=scroll * 0.3)
    frame.paste(phone, (1260, 110), phone)

    return frame

def scene_6_desktop_admin(progress):
    # Scene 6: Panel de Administración en PANTALLA DE ESCRITORIO (30 - 38s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "6. PANEL ADMINISTRACIÓN (PANTALLA DE ESCRITORIO)")

    # Desktop frame centered taking large width
    # In the first half, show dashboard top; in second half show CRM leads with WhatsApp buttons!
    curr_screen = D_ADMIN_TOP if progress < 0.45 else D_ADMIN_CRM
    scroll = (progress * 1.5) % 1.0 if progress >= 0.45 else 0.0

    desk = render_desktop_mockup(curr_screen, scroll_pct=scroll * 0.4)
    frame.paste(desk, (100, 100), desk)

    # Highlight Banner at bottom
    draw.rounded_rectangle([140, 940, WIDTH - 140, 1030], radius=20, fill=(14, 34, 30, 240), outline=COLOR_GOLD, width=2)
    
    # 3 Feature Pills inside bottom banner
    draw.text((170, 955), "CONTROL DE LEADS DEL LANDING", fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)
    draw.text((170, 985), "Registro inmediato de prospectos con teléfono y área legal", fill=COLOR_WHITE, font=FONT_SANS_SMALL)

    draw.text((740, 955), "BOTONES DIRECTOS DE WHATSAPP", fill=(52, 199, 89), font=FONT_MONO_BOLD)
    draw.text((740, 985), "Contacto en 1-clic con el cliente desde la bandeja CRM", fill=COLOR_WHITE, font=FONT_SANS_SMALL)

    draw.text((1350, 955), "GESTIÓN SATJE & CONCILIACIÓN", fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)
    draw.text((1350, 985), "Control total de expedientes y estados de causas", fill=COLOR_WHITE, font=FONT_SANS_SMALL)

    return frame

def scene_7_cierre(progress):
    # Scene 7: Cierre Institucional & Contacto (38 - 42s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)
    draw_top_bar(draw, "VIS LEGAL ABOGADOS & LEGALTECH")

    logo_sz = 140
    lr = LOGO_IMG.resize((logo_sz, logo_sz), Image.Resampling.LANCZOS)
    frame.paste(lr, (WIDTH//2 - logo_sz//2, 170), lr)

    draw.text((WIDTH//2 - 340, 330), "VIS LEGAL ABOGADOS", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((WIDTH//2 - 430, 410), "Excelencia Jurídica, Litigio Oral & Soluciones Digitales", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    # 3 Summary Cards
    cards = [
        ("Web Pública Responsive", "Diseño Apple Luxury, dock háptico flotante y SEO/GEO doctrinal."),
        ("Ecosistema 4-en-1", "Portales activos para Clientes, Empresas B2B, Letrados y Dirección."),
        ("CRM de Leads & WhatsApp", "Monitoreo en tiempo real de prospectos y contacto en un solo toque.")
    ]
    cw = 480
    ch = 140
    start_x = (WIDTH - (cw * 3 + 40 * 2)) // 2
    cy = 500

    for i, (c_title, c_desc) in enumerate(cards):
        cx = start_x + i * (cw + 40)
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=20, fill=(18, 42, 38, 230), outline=COLOR_GOLD, width=1)
        draw.text((cx + 25, cy + 24), c_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((cx + 25, cy + 65), c_desc, fill=COLOR_MUTED, font=FONT_SANS_REG)

    # Big Contact Box
    draw.rounded_rectangle([WIDTH//2 - 500, 700, WIDTH//2 + 500, 810], radius=24, fill=(16, 45, 41), outline=COLOR_GOLD, width=2)
    draw.text((WIDTH//2 - 450, 725), "Sede Central: Quito, Ecuador   |   WhatsApp Oficial: (+593) 99 178 6275", fill=COLOR_WHITE, font=FONT_SANS_BOLD)
    draw.text((WIDTH//2 - 240, 765), "Portal Oficial: vislegalabogados.com", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)

    ft = "© 2026 VIS Legal S.A.S. (BIZ Legal S.A.S.) · República del Ecuador · Todos los derechos reservados."
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 980), ft, fill=(180, 200, 195), font=FONT_SANS_SMALL)

    return frame

def get_frame(frame_num):
    # Scene durations (in seconds):
    # S1: 6s (180 frames)
    # S2: 6s (180 frames)
    # S3: 6s (180 frames)
    # S4: 6s (180 frames)
    # S5: 6s (180 frames)
    # S6: 8s (240 frames)
    # S7: 4s (120 frames)
    # Total = 42s (1260 frames)
    
    scene_boundaries = [
        (0, 180, scene_1_mobile_home),
        (180, 360, scene_2_mobile_nosotros),
        (360, 540, scene_3_mobile_login),
        (540, 720, scene_4_mobile_user),
        (720, 900, scene_5_mobile_empresas_abogados),
        (900, 1140, scene_6_desktop_admin),
        (1140, 1260, scene_7_cierre)
    ]

    for idx, (start_f, end_f, renderer) in enumerate(scene_boundaries):
        if start_f <= frame_num < end_f:
            local_frame = frame_num - start_f
            duration = end_f - start_f
            progress = local_frame / float(duration)
            curr_img = renderer(progress)

            # Smooth cross-fade in the first 14 frames of scenes 2-7
            if local_frame < 14 and idx > 0:
                prev_renderer = scene_boundaries[idx - 1][2]
                prev_img = prev_renderer(1.0)
                alpha = local_frame / 14.0
                return Image.blend(prev_img.convert("RGB"), curr_img.convert("RGB"), alpha)

            return curr_img.convert("RGB")

    return scene_7_cierre(1.0).convert("RGB")

def main():
    print(f"Iniciando renderizado de Video Completo ({TOTAL_FRAMES} frames @ 30fps = {DURATION_SEC}s)...")
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    cmd = [
        FFMPEG_PATH,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-i", MUSIC_PATH,
        "-filter_complex", f"[1:a]afade=t=in:ss=0:d=1.5,afade=t=out:st={DURATION_SEC-2.5}:d=2.5,volume=0.35[a]",
        "-map", "0:v",
        "-map", "[a]",
        "-c:v", "libx264",
        "-profile:v", "main",
        "-level", "4.0",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", str(DURATION_SEC),
        "-movflags", "+faststart",
        OUTPUT_PATH
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame = get_frame(i)
        proc.stdin.write(frame.tobytes())
        if i % 120 == 0 or i == TOTAL_FRAMES - 1:
            print(f"Renderizado: {i}/{TOTAL_FRAMES} fotogramas ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"¡Video Maestro generado con éxito en: {OUTPUT_PATH}!")

if __name__ == "__main__":
    main()
