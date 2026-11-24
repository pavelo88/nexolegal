import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_SEC = 25
TOTAL_FRAMES = DURATION_SEC * FPS

FFMPEG_PATH = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
MUSIC_PATH = r"C:\Users\pablo\.claude\skills\brag\assets\music\happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"
OUTPUT_PATH = r"C:\Users\pablo\Documents\Judicial\public\vis_legal_presentacion_cliente.mp4"

# Fonts
FONT_SERIF_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 64)
FONT_SERIF_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 44)
FONT_SERIF_H3 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 34)
FONT_SANS_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 28)
FONT_SANS_REG = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 22)
FONT_SANS_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 18)
FONT_MONO = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 18)

# Colors
COLOR_BG_DARK = (7, 25, 22)
COLOR_BG_EMERALD = (16, 45, 41)
COLOR_GOLD = (201, 154, 91)
COLOR_GOLD_LIGHT = (231, 199, 141)
COLOR_WHITE = (255, 255, 255)
COLOR_MUTED = (210, 225, 220)
COLOR_GREEN = (52, 199, 89)

# Preload assets
LOGO_IMG = Image.open(r"C:\Users\pablo\Documents\Judicial\public\logo.png").convert("RGBA")
SOCIO_IMG = Image.open(r"C:\Users\pablo\Documents\Judicial\public\abogado-jose-aimacana.webp").convert("RGBA")
FIRMA_IMG = Image.open(r"C:\Users\pablo\Documents\Judicial\public\vis-legal-firma.webp").convert("RGBA")

def create_base_gradient():
    base = Image.new("RGBA", (WIDTH, HEIGHT), COLOR_BG_DARK)
    draw = ImageDraw.Draw(base)
    # Radial dark emerald glow in top-center
    for r in range(HEIGHT, 0, -8):
        alpha = int(35 * (1 - r / HEIGHT))
        color = (23, 61, 54, alpha)
        draw.ellipse([WIDTH//2 - r*1.3, -r//3, WIDTH//2 + r*1.3, r*1.2], fill=color)
    return base

BASE_CANVAS = create_base_gradient()

def rounded_image(img, size, radius):
    img = img.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, size[0], size[1]], radius=radius, fill=255)
    res = Image.new("RGBA", size, (0, 0, 0, 0))
    res.paste(img, (0, 0), mask)
    return res

def render_scene_1(progress):
    # Scene 1: Portada Oficial & Identidad (0 - 5s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    # Logo central con resplandor dorado
    logo_size = 200
    logo_resized = LOGO_IMG.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    logo_x = WIDTH // 2 - logo_size // 2
    logo_y = 190

    # Glow detrás del logo
    draw.ellipse([logo_x - 30, logo_y - 30, logo_x + logo_size + 30, logo_y + logo_size + 30], fill=(201, 154, 91, 40))
    draw.ellipse([logo_x - 10, logo_y - 10, logo_x + logo_size + 10, logo_y + logo_size + 10], outline=COLOR_GOLD, width=3)
    frame.paste(logo_resized, (logo_x, logo_y), logo_resized)

    # Tag superior
    tag = "FIRMA JURÍDICA & LEGALTECH · REPÚBLICA DEL ECUADOR"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO)
    tag_w = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tag_w//2 - 20, 430, WIDTH//2 + tag_w//2 + 20, 465], radius=18, fill=(16, 45, 41, 200), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tag_w//2, 438), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    # Título Principal
    t1 = "VIS LEGAL ABOGADOS"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 500), t1, fill=COLOR_WHITE, font=FONT_SERIF_TITLE)

    # Subtítulo Dorado
    t2 = "Defensa de Alto Impacto, Litigio Penal & Plataforma Digital 24/7"
    bbox2 = draw.textbbox((0, 0), t2, font=FONT_SERIF_H3)
    draw.text((WIDTH//2 - (bbox2[2]-bbox2[0])//2, 590), t2, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_H3)

    # 3 Badges de Valor
    badges = [
        "Socio Fundador: Ab. José Aimacaña Mgtr.",
        "Sede Central: Quito · Guayaquil · Cobertura Nacional",
        "Ecosistema WebApp: Clientes, Empresas & Letrados"
    ]
    bx_start = 240
    for i, b in enumerate(badges):
        bx = bx_start + i * 490
        by = 700
        draw.rounded_rectangle([bx, by, bx + 460, by + 90], radius=18, fill=(18, 40, 36, 220), outline=(201, 154, 91, 120), width=1)
        draw.text((bx + 25, by + 32), b, fill=COLOR_WHITE, font=FONT_SANS_BOLD if i==0 else FONT_SANS_REG)

    # Footer note
    ft = "vislegalabogados.com · WhatsApp Oficial (+593) 99 178 6275"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 980), ft, fill=(180, 200, 195), font=FONT_SANS_SMALL)
    return frame

def render_scene_2(progress):
    # Scene 2: Socio Fundador (5 - 10s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    # Foto del Socio Fundador a la izquierda (en marco luxury con esquinas redondeadas)
    card_w, card_h = 520, 680
    cx, cy = 180, 200
    draw.rounded_rectangle([cx - 8, cy - 8, cx + card_w + 8, cy + card_h + 8], radius=28, fill=(201, 154, 91, 60), outline=COLOR_GOLD, width=2)
    socio_round = rounded_image(SOCIO_IMG, (card_w, card_h), radius=24)
    frame.paste(socio_round, (cx, cy), socio_round)

    # Badge de foto
    draw.rounded_rectangle([cx + 30, cy + card_h - 70, cx + card_w - 30, cy + card_h - 20], radius=14, fill=(7, 25, 22, 230), outline=COLOR_GOLD, width=1)
    badge_txt = "Ab. José Aimacaña Mgtr. · Socio Fundador"
    draw.text((cx + 50, cy + card_h - 58), badge_txt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)

    # Columna Derecha de Credenciales
    rx = 780
    # Tag
    draw.rounded_rectangle([rx, 180, rx + 240, 215], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((rx + 15, 188), "DIRECCIÓN JURÍDICA", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((rx, 235), "Ab. José Aimacaña Mgtr.", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((rx, 315), "Formación de Élite & Litigio Oral Especializado", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_H3)

    credentials = [
        ("Universidad Central del Ecuador", "Abogado de los Tribunales y Juzgados de la República."),
        ("Máster en Derecho Procesal Penal", "Especialización avanzada en litigio y garantías constitucionales."),
        ("Universidad de Alicante, España", "Maestrante en Argumentación Jurídica y filosofía del derecho."),
        ("Universidad Indoamérica", "Maestrante en Derecho Procesal y Litigación Oral."),
        ("Publicación Destacada", "«El doble conforme en Ecuador y una garantía procesal sin regulación expresa»")
    ]

    item_y = 390
    for title, desc in credentials:
        draw.ellipse([rx, item_y + 8, rx + 14, item_y + 22], fill=COLOR_GOLD)
        draw.text((rx + 30, item_y), title, fill=COLOR_WHITE, font=FONT_SANS_BOLD)
        draw.text((rx + 30, item_y + 36), desc, fill=COLOR_MUTED, font=FONT_SANS_REG)
        item_y += 82

    return frame

def render_scene_3(progress):
    # Scene 3: La Firma y Principios (10 - 15s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    # Foto de la Firma a la derecha
    fw, fh = 680, 500
    fx, fy = 1060, 260
    draw.rounded_rectangle([fx - 8, fy - 8, fx + fw + 8, fy + fh + 8], radius=26, fill=(201, 154, 91, 50), outline=COLOR_GOLD, width=2)
    firma_round = rounded_image(FIRMA_IMG, (fw, fh), radius=22)
    frame.paste(firma_round, (fx, fy), firma_round)

    # Columna Izquierda: Principios en Órbita
    lx = 180
    draw.rounded_rectangle([lx, 160, lx + 310, 195], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((lx + 15, 168), "FILOSOFÍA INSTITUCIONAL", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    draw.text((lx, 215), "La Firma VIS Legal", fill=COLOR_WHITE, font=FONT_SERIF_TITLE)
    draw.text((lx, 295), "Defensa implacable de derechos y relación fiable cliente-abogado.", fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_H3)

    pillars = [
        ("Talento e Innovación", "Cada causa es asumida como si fuera la única, combinando rigor dogmático, estudio exhaustivo e innovación tecnológica aplicada al derecho."),
        ("Confidencialidad, Lealtad y Ética", "Credo deontológico inquebrantable y sigilo profesional sagrado bajo amparo del Art. 335 del Código Orgánico de la Función Judicial."),
        ("Persistencia y Tenacidad Procesal", "Ningún asunto es imposible. Todo puede y debe lucharse con argumentos sólidos en cada instancia judicial del país.")
    ]

    py = 375
    for p_title, p_desc in pillars:
        draw.rounded_rectangle([lx, py, lx + 820, py + 125], radius=18, fill=(18, 38, 34, 210), outline=(201, 154, 91, 100), width=1)
        draw.text((lx + 30, py + 18), p_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        # Wrap desc
        words = p_desc.split(" ")
        line1 = " ".join(words[:11])
        line2 = " ".join(words[11:])
        draw.text((lx + 30, py + 56), line1, fill=COLOR_WHITE, font=FONT_SANS_REG)
        draw.text((lx + 30, py + 86), line2, fill=COLOR_MUTED, font=FONT_SANS_REG)
        py += 145

    return frame

def render_scene_4(progress):
    # Scene 4: Ecosistema Digital 4-en-1 (15 - 20s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    # Header central
    draw.rounded_rectangle([WIDTH//2 - 180, 110, WIDTH//2 + 180, 145], radius=12, fill=(16, 45, 41), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - 160, 118), "TECNOLOGÍA JURÍDICA 24/7", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    t = "Ecosistema Digital de 4 WebApps Especializadas"
    bbox = draw.textbbox((0, 0), t, font=FONT_SERIF_TITLE)
    draw.text((WIDTH//2 - (bbox[2]-bbox[0])//2, 165), t, fill=COLOR_WHITE, font=FONT_SERIF_TITLE)

    sub = "Demostración interactiva en línea: transparencia procesal y control total."
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_H3)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 245), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_H3)

    apps = [
        ("Portal Clientes", "SEGUIMIENTO SATJE", (59, 130, 246), [
            "• Expedientes procesales en tiempo real",
            "• Asistente IA para explicar providencias",
            "• Aula de prevención jurídica ciudadana",
            "• Facturas y pagos SRI certificados"
        ]),
        ("Portal Empresas", "BLINDAJE CORPORATIVO", (16, 185, 129), [
            "• Contratos de alta complejidad y compliance",
            "• Auditoría laboral y reestructuraciones",
            "• Monitoreo de riesgos regulatorios",
            "• Asesoría societaria en directorio"
        ]),
        ("Portal Letrados", "GESTIÓN DE LITIGIO", (245, 158, 11), [
            "• Tablero de causas y audiencias orales",
            "• Gestión de jurisprudencia y casación",
            "• Registro de bitácoras procesales",
            "• Coordinación de equipos litigantes"
        ]),
        ("Portal Dirección", "KPIs & AUDITORÍA", (168, 85, 247), [
            "• Métricas globales de efectividad jurídica",
            "• Auditoría de sigilo y tiempos de respuesta",
            "• Conciliaciones financieras al centavo",
            "• Visión estratégica nacional"
        ]),
    ]

    card_w = 380
    card_h = 440
    start_x = (WIDTH - (card_w * 4 + 30 * 3)) // 2
    cy = 340

    for i, (name, tag, col, bullets) in enumerate(apps):
        cx = start_x + i * (card_w + 30)
        draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=22, fill=(15, 36, 32, 230), outline=(201, 154, 91, 120), width=1)
        
        # Color pill
        draw.rounded_rectangle([cx + 25, cy + 25, cx + 25 + 170, cy + 55], radius=10, fill=(col[0], col[1], col[2], 60), outline=col, width=1)
        draw.text((cx + 35, cy + 32), tag, fill=col, font=FONT_MONO)

        draw.text((cx + 25, cy + 75), name, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.line([cx + 25, cy + 125, cx + card_w - 25, cy + 125], fill=(201, 154, 91, 80), width=1)

        by = cy + 150
        for b in bullets:
            draw.text((cx + 25, by), b, fill=COLOR_MUTED, font=FONT_SANS_REG)
            by += 48

        # Bottom button demo
        draw.rounded_rectangle([cx + 25, cy + card_h - 60, cx + card_w - 25, cy + card_h - 20], radius=12, fill=(20, 50, 44), outline=COLOR_GOLD, width=1)
        draw.text((cx + 70, cy + card_h - 48), "Acceso 1-Clic Demo →", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)

    # Note
    nt = "Accede a las 4 aplicaciones desde el botón «Tu app» en la web y móvil"
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 850), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_5(progress):
    # Scene 5: Experiencia Mobile & Contacto (20 - 25s)
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    # Logo central
    logo_size = 130
    logo_resized = LOGO_IMG.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    frame.paste(logo_resized, (WIDTH//2 - logo_size//2, 140), logo_resized)

    tag = "EXPERIENCIA DIGITAL APPLE LUXURY"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO)
    draw.text((WIDTH//2 - (bbox[2]-bbox[0])//2, 290), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    t = "Tu Asesoría Legal 24/7 en la Palma de la Mano"
    bbox_t = draw.textbbox((0, 0), t, font=FONT_SERIF_TITLE)
    draw.text((WIDTH//2 - (bbox_t[2]-bbox_t[0])//2, 335), t, fill=COLOR_WHITE, font=FONT_SERIF_TITLE)

    sub = "Plataforma WebApp instalable con dock háptico flotante y respuesta inmediata."
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_H3)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 420), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_H3)

    # 3 Tarjetas de Contacto & Sede
    cards = [
        ("Sede Central", "Quito, Pichincha, Ecuador", "Litigios en Corte Nacional y Judicaturas"),
        ("Atención Directa", "(+593) 99 178 6275", "WhatsApp Oficial y Guardia Procesal"),
        ("Portal Oficial", "vislegalabogados.com", "Explora la WebApp, Servicios y Blog")
    ]
    cw = 420
    ch = 180
    start_x = (WIDTH - (cw * 3 + 40 * 2)) // 2
    cy = 520

    for i, (c_title, c_val, c_sub) in enumerate(cards):
        cx = start_x + i * (cw + 40)
        draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=22, fill=(18, 42, 38, 230), outline=COLOR_GOLD, width=1)
        draw.text((cx + 30, cy + 28), c_title, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)
        draw.text((cx + 30, cy + 65), c_val, fill=COLOR_WHITE, font=FONT_SANS_BOLD)
        draw.text((cx + 30, cy + 115), c_sub, fill=COLOR_MUTED, font=FONT_SANS_REG)

    # Banner Final de Confianza
    draw.rounded_rectangle([WIDTH//2 - 450, 760, WIDTH//2 + 450, 850], radius=18, fill=(16, 45, 41), outline=COLOR_GOLD, width=2)
    cta = "VIS LEGAL ABOGADOS · EXCELENCIA JURÍDICA GARANTIZADA"
    bbox_cta = draw.textbbox((0, 0), cta, font=FONT_SANS_BOLD)
    draw.text((WIDTH//2 - (bbox_cta[2]-bbox_cta[0])//2, 792), cta, fill=COLOR_WHITE, font=FONT_SANS_BOLD)

    ft = "© 2026 VIS Legal S.A.S. (BIZ Legal S.A.S.) · República del Ecuador"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 940), ft, fill=(180, 200, 195), font=FONT_SANS_SMALL)

    return frame

def get_frame(frame_num):
    # Determine scene (5 scenes, 150 frames each)
    scene_idx = frame_num // 150
    local_frame = frame_num % 150
    progress = local_frame / 150.0

    renderers = [render_scene_1, render_scene_2, render_scene_3, render_scene_4, render_scene_5]
    renderer = renderers[min(scene_idx, len(renderers) - 1)]
    curr_img = renderer(progress)

    # Smooth transition cross-fade in the first 15 frames of scenes 1, 2, 3, 4
    if local_frame < 15 and scene_idx > 0:
        prev_renderer = renderers[scene_idx - 1]
        prev_img = prev_renderer(1.0)
        alpha = local_frame / 15.0
        return Image.blend(prev_img.convert("RGB"), curr_img.convert("RGB"), alpha)

    return curr_img.convert("RGB")

def main():
    print(f"Iniciando renderizado de {TOTAL_FRAMES} fotogramas (1920x1080 @ 30fps)...")
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    # FFmpeg command to stream raw video and mix background music
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
        "-filter_complex", "[1:a]afade=t=in:ss=0:d=1.5,afade=t=out:st=22.5:d=2.5,volume=0.35[a]",
        "-map", "0:v",
        "-map", "[a]",
        "-c:v", "libx264",
        "-profile:v", "main",
        "-level", "4.0",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "19",
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
        if i % 75 == 0 or i == TOTAL_FRAMES - 1:
            print(f"Progreso render: {i}/{TOTAL_FRAMES} fotogramas ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"¡Video generado con éxito en: {OUTPUT_PATH}!")

if __name__ == "__main__":
    main()
