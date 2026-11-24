import os
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT, TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, Image, KeepTogether)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# ----------------------------------------------------------------- RUTAS
JUD = Path(r'C:/Users/pablo/Documents/Judicial')
CAP = JUD / 'entrega_sinergia/capturas'
BRAND_DIR = JUD / 'entrega_sinergia/marca'
BRAND_DIR.mkdir(parents=True, exist_ok=True)

ORIGINAL_SYMBOL = BRAND_DIR / 'sinergia-s-original-transparente.png'
CROPPED_SYMBOL = BRAND_DIR / 'sinergia-s-cropped.png'

# Generar versión recortada del símbolo si no existe
if not CROPPED_SYMBOL.is_file():
    from PIL import Image as PILImage
    img = PILImage.open(ORIGINAL_SYMBOL)
    cropped = img.crop(img.getbbox())
    cropped.save(CROPPED_SYMBOL)

OUT = JUD / 'entrega_sinergia/Propuesta_Valoracion_Inversion_VIS_Legal_SinergIA_Tech.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)

# ----------------------------------------------------------------- TIPOGRAFÍA
for name, filename in [('Segoe', 'segoeui.ttf'), ('SegoeBold', 'segoeuib.ttf'), ('SegoeI', 'segoeuii.ttf')]:
    font_path = Path('C:/Windows/Fonts') / filename
    if font_path.exists():
        pdfmetrics.registerFont(TTFont(name, str(font_path)))
    else:
        pdfmetrics.registerFont(TTFont(name, str(Path('C:/Windows/Fonts/segoeui.ttf'))))

pdfmetrics.registerFontFamily('Segoe', normal='Segoe', bold='SegoeBold', italic='SegoeI', boldItalic='SegoeBold')

# ----------------------------------------------------------------- PALETA OFICIAL
NAVY = colors.HexColor('#092347')      # Azul corporativo profundo SinergIA
BLUE = colors.HexColor('#007EBB')      # Azul IA de la marca
CYAN = colors.HexColor('#00BBCD')      # Cian acento tecnológico
TEAL = colors.HexColor('#0088A3')      # Verde azulado elegante
INK = colors.HexColor('#20354C')       # Texto principal de alta legibilidad
MUTED = colors.HexColor('#52667B')     # Gris medio técnico
PALE = colors.HexColor('#F2F6F9')      # Fondo suave de tarjetas y tablas
LINE = colors.HexColor('#DCE6EC')      # Bordes y líneas sutiles
WHITE = colors.white
GOLD = colors.HexColor('#C99A5B')      # Acento institucional VIS Legal

W, H = A4  # 210 x 297 mm

# ----------------------------------------------------------------- ESTILOS
styles = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='SegoeBold', fontSize=8.5, leading=12, textColor=BLUE, spaceAfter=8),
    'title': ParagraphStyle('title', fontName='SegoeBold', fontSize=29, leading=34, textColor=NAVY, spaceAfter=14),
    'meta_date': ParagraphStyle('meta_date', fontName='SegoeBold', fontSize=8, leading=11, textColor=MUTED, spaceAfter=12),
    'heading': ParagraphStyle('heading', fontName='SegoeBold', fontSize=21, leading=26, textColor=NAVY, spaceAfter=10),
    'sub': ParagraphStyle('sub', fontName='Segoe', fontSize=11.5, leading=17, textColor=MUTED, spaceAfter=14),
    'body': ParagraphStyle('body', fontName='Segoe', fontSize=9.5, leading=14, textColor=INK, spaceAfter=6),
    'small': ParagraphStyle('small', fontName='Segoe', fontSize=8.2, leading=12, textColor=MUTED, spaceAfter=4),
    'card_title': ParagraphStyle('card_title', fontName='SegoeBold', fontSize=10.5, leading=13.5, textColor=NAVY, spaceAfter=3),
    'card_body': ParagraphStyle('card_body', fontName='Segoe', fontSize=9.2, leading=13.5, textColor=INK),
    'white_tag': ParagraphStyle('white_tag', fontName='SegoeBold', fontSize=8.5, leading=12, textColor=CYAN),
    'offer_price': ParagraphStyle('offer_price', fontName='SegoeBold', fontSize=28, leading=34, textColor=WHITE),
    'offer_desc': ParagraphStyle('offer_desc', fontName='Segoe', fontSize=8.8, leading=13, textColor=colors.HexColor('#E2EEF5')),
    'cell': ParagraphStyle('cell', fontName='Segoe', fontSize=8.5, leading=12, textColor=INK),
    'cellb': ParagraphStyle('cellb', fontName='SegoeBold', fontSize=8.5, leading=12, textColor=NAVY),
    'cell_tag': ParagraphStyle('cell_tag', fontName='SegoeBold', fontSize=8, leading=11, textColor=BLUE),
    'price': ParagraphStyle('price', fontName='SegoeBold', fontSize=8.8, leading=12.5, textColor=NAVY, alignment=TA_RIGHT),
    'priceb': ParagraphStyle('priceb', fontName='SegoeBold', fontSize=10, leading=14, textColor=NAVY, alignment=TA_RIGHT),
}

def p(s, style='body'):
    return Paragraph(s, styles[style])

def space(n):
    return Spacer(1, n * mm)

def money(n):
    return f'${n:,.2f}'.replace(',', 'X').replace('.', ',').replace('X', '.')

# ----------------------------------------------------------------- NUMBERED CANVAS
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        page_num = self._pageNumber
        if page_num == 1:
            # ----------------- PORTADA (COVER) -----------------
            self.saveState()
            # Banda superior elegante de acento
            self.setFillColor(NAVY)
            self.rect(0, H - 4.5 * mm, W, 4.5 * mm, fill=1, stroke=0)
            self.setFillColor(CYAN)
            self.rect(20 * mm, H - 4.5 * mm, 35 * mm, 4.5 * mm, fill=1, stroke=0)
            
            # Pie de portada (limpio, sin número de página)
            self.setStrokeColor(LINE)
            self.setLineWidth(0.6)
            self.line(20 * mm, 16 * mm, W - 20 * mm, 16 * mm)
            self.setFont('Segoe', 8)
            self.setFillColor(MUTED)
            self.drawString(20 * mm, 11 * mm, 'SinergIA Tech  ·  Soluciones de Software & LegalTech de Alto Impacto')
            self.drawRightString(W - 20 * mm, 11 * mm, 'Quito, Ecuador  ·  2026')
            self.restoreState()
        else:
            # ----------------- PÁGINAS INTERIORES -----------------
            self.saveState()
            # Encabezado: Logo unificado (Símbolo + SinergIA TECH + Slogan)
            sym_h = 10.5 * mm
            sym_w = sym_h * 399 / 575
            sym_x = 20 * mm
            sym_y = H - 12 * mm - sym_h
            self.drawImage(str(CROPPED_SYMBOL), sym_x, sym_y, width=sym_w, height=sym_h, mask='auto')

            # Wordmark exacto: Sinerg (NAVY) + IA (BLUE)
            text_x = sym_x + sym_w + 3.5 * mm
            self.setFont('SegoeBold', 13.5)
            self.setFillColor(NAVY)
            self.drawString(text_x, H - 17.5 * mm, 'Sinerg')
            sinerg_w = pdfmetrics.stringWidth('Sinerg', 'SegoeBold', 13.5)
            self.setFillColor(BLUE)
            self.drawString(text_x + sinerg_w, H - 17.5 * mm, 'IA')
            
            # Badge TECH
            ia_w = pdfmetrics.stringWidth('IA', 'SegoeBold', 13.5)
            self.setFont('SegoeBold', 7)
            self.setFillColor(MUTED)
            self.drawString(text_x + sinerg_w + ia_w + 3 * mm, H - 17.5 * mm, 'TECH')

            # Slogan pequeño en el encabezado
            self.setFont('Segoe', 6.5)
            self.setFillColor(TEAL)
            self.drawString(text_x, H - 21.5 * mm, 'Tecnología e Inteligencia Artificial aplicada')

            # Encabezado derecho
            self.setFont('SegoeBold', 8)
            self.setFillColor(NAVY)
            self.drawRightString(W - 20 * mm, H - 16.5 * mm, 'PROPUESTA DE VALORACIÓN E INVERSIÓN')
            self.setFont('Segoe', 7.5)
            self.setFillColor(MUTED)
            self.drawRightString(W - 20 * mm, H - 21 * mm, 'VIS LEGAL ABOGADOS & LEGALTECH')

            # Línea divisoria de encabezado con acento cian
            self.setStrokeColor(CYAN)
            self.setLineWidth(1.5)
            self.line(20 * mm, H - 24.5 * mm, 38 * mm, H - 24.5 * mm)
            self.setStrokeColor(LINE)
            self.setLineWidth(0.6)
            self.line(38 * mm, H - 24.5 * mm, W - 20 * mm, H - 24.5 * mm)

            # Pie de página interior
            self.setStrokeColor(LINE)
            self.setLineWidth(0.6)
            self.line(20 * mm, 16 * mm, W - 20 * mm, 16 * mm)
            self.setFont('Segoe', 8)
            self.setFillColor(MUTED)
            self.drawString(20 * mm, 11 * mm, 'SinergIA Tech  |  Preparado para VIS Legal Abogados')
            self.drawRightString(W - 20 * mm, 11 * mm, f'Página {page_num} de {total_pages}')
            self.restoreState()

# ----------------------------------------------------------------- COMPONENTES VISUALES
def card(title, body):
    t = Table([[p(title, 'card_title')], [p(body, 'card_body')]], colWidths=[170 * mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PALE),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (0, 0), 9),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 8),
        ('LINEBEFORE', (0, 0), (0, -1), 3, BLUE),
    ]))
    return t

def grid(header, rows, widths, right_cols=()):
    data = [[p(h, 'white_tag') for h in header]]
    for r in rows:
        fila = []
        for i, v in enumerate(r):
            if i in right_cols:
                fila.append(p(v, 'price'))
            elif i == 0:
                fila.append(p(v, 'cellb'))
            elif i == len(r) - 1 and len(r) == 3:
                fila.append(p(v, 'cell_tag'))
            else:
                fila.append(p(v, 'cell'))
        data.append(fila)
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [PALE, WHITE]),
        ('LINEBELOW', (0, 0), (-1, 0), 1.2, CYAN),
        ('LINEBELOW', (0, 1), (-1, -1), 0.5, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    return t

def captura(nombre, descripcion, ancho_mm=170):
    img_path = CAP / nombre
    ancho = ancho_mm * mm
    alto = ancho * 900 / 1440
    img = Image(str(img_path), width=ancho, height=alto)
    
    # Enmarcar la captura en una tabla con borde sutil para darle acabado de ventana
    frame = Table([[img], [p(descripcion, 'small')]], colWidths=[ancho])
    frame.setStyle(TableStyle([
        ('BOX', (0, 0), (0, 0), 0.8, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (0, 0), 0),
        ('TOPPADDING', (0, 1), (0, 1), 4),
        ('BOTTOMPADDING', (0, 1), (0, 1), 2),
    ]))
    return KeepTogether([frame])

def make_cover_logo():
    # S-Symbol: alto = 26mm, ancho = 26 * 399 / 575 = 18.04mm
    sym_h = 26 * mm
    sym_w = sym_h * 399 / 575
    sym_img = Image(str(CROPPED_SYMBOL), width=sym_w, height=sym_h)

    p_text = Paragraph(
        '<font color="#092347" size="26"><b>Sinerg</b></font><font color="#007EBB" size="26"><b>IA</b></font>'
        '&nbsp;&nbsp;<font color="#52667B" size="10.5"><b>T E C H</b></font><br/>'
        '<font color="#0088A3" size="8.5"><b>TECNOLOGÍA E INTELIGENCIA ARTIFICIAL APLICADA</b></font>',
        ParagraphStyle('CoverLogoText', fontName='Segoe', leading=15.5)
    )

    logo_table = Table([[sym_img, p_text]], colWidths=[sym_w + 3 * mm, 170 * mm - (sym_w + 3 * mm)])
    logo_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return logo_table

# ----------------------------------------------------------------- DATOS COMERCIALES
ENTREGABLES = [
    ('Diseño de experiencia y planificación', 'Estructura de la portada y de cada portal, y recorrido del cliente.', 160),
    ('Sitio web de presentación', 'Portada, quiénes somos, servicios, metodología, preguntas frecuentes y contacto.', 360),
    ('Portal y panel administrativo', 'Dirección (/admin), despacho del abogado (/abogado) y portal empresarial (/empresas), con navegación móvil.', 420),
    ('Registro y acceso', 'Ingreso por rol, confirmación de correo y recuperación de acceso.', 360),
    ('Clientes y expedientes', 'Portal del suscriptor (/user): seguimiento de juicios y avances compartidos.', 520),
    ('Asistente de inteligencia artificial', 'Preguntas frecuentes, orientación inicial y derivación de solicitudes al equipo.', 480),
    ('Privacidad y preferencias', 'Política de privacidad, términos y banner de cookies conforme a la LOPDP.', 180),
    ('Pagos para Ecuador', 'PayPal, y preparación de Deuna y Kushki para su conexión posterior.', 390),
    ('Revisión final y publicación', 'Revisión de recorridos y puesta en línea.', 260),
]
SUBTOTAL = sum(i[2] for i in ENTREGABLES)
assert SUBTOTAL == 3130
DESCUENTO = 640
TOTAL = SUBTOTAL - DESCUENTO
assert TOTAL == 2490
IVA = round(TOTAL * 0.15, 2)
TOTAL_IVA = TOTAL + IVA

# ----------------------------------------------------------------- STORY (10 PÁGINAS)
story = []

# ================================================================= PÁGINA 1: CARÁTULA
story += [
    space(6),
    make_cover_logo(),
    space(16),
    p('PROPUESTA ESTRATÉGICA DE VALORACIÓN E INVERSIÓN', 'eyebrow'),
    p('Preparado para<br/>VIS Legal Abogados', 'title'),
    p('VIS LEGAL ABOGADOS & LEGALTECH  ·  27 OCTUBRE 2026', 'meta_date'),
    space(4),
    p('Una plataforma lista para<br/>presentar y operar su firma.', 'heading'),
    p('Valoración técnica de la plataforma web, explicación detallada de cada sección y portal por rol, '
      'y la inversión preferencial por entregable.', 'sub'),
    space(8),
]

# Tarjeta de Oferta en la Carátula (Luxury Fintech)
offer = Table([
    [p('INVERSIÓN PREFERENCIAL DE LANZAMIENTO', 'white_tag')],
    [Paragraph('$2.490,00 <font size="14">sin IVA</font>', styles['offer_price'])],
    [Paragraph('<b>Subtotal entregables:</b> $3.130,00  ·  <b>Descuento comercial directo:</b> -$640,00<br/>'
               'Precio final de la implementación del alcance descrito en este documento.',
               styles['offer_desc'])]
], colWidths=[170 * mm])
offer.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), NAVY),
    ('LEFTPADDING', (0, 0), (-1, -1), 16),
    ('RIGHTPADDING', (0, 0), (-1, -1), 16),
    ('TOPPADDING', (0, 0), (0, 0), 12),
    ('BOTTOMPADDING', (0, -1), (-1, -1), 12),
    ('LINEBEFORE', (0, 0), (0, -1), 4, CYAN),
]))
story += [offer, PageBreak()]

# ================================================================= PÁGINA 2: VALORACIÓN GENERAL
story += [
    p('01 / VALORACIÓN GENERAL', 'eyebrow'),
    p('Una imagen sólida y<br/>una experiencia clara.', 'heading'),
    p('Evaluamos la plataforma por lo que vive el visitante, el cliente y el equipo de la firma. '
      'Cada área ha sido analizada para maximizar confianza, retención y conversión jurídica.', 'sub'),
    space(2),
]
valoracion = [
    ('Diseño y primera impresión', 'Fotografía real del abogado, paleta sobria y tipografía elegante. Transmite seriedad desde la primera pantalla.'),
    ('Claridad del mensaje', 'Propuesta de valor directa y botones visibles para hablar con un abogado, solicitar diagnóstico o escribir por WhatsApp.'),
    ('Experiencia en celular', 'Barra inferior fija con acceso rápido a servicios, asistente, portal, blog y WhatsApp, con botones cómodos al pulgar.'),
    ('Portales por rol', 'Cuatro espacios separados según su función: dirección, suscriptor, abogado y empresa. Cada uno tiene su propia navegación.'),
    ('Privacidad y cookies', 'Aviso de privacidad y banner de cookies con consentimiento por categoría, conforme a la Ley Orgánica de Protección de Datos Personales de Ecuador.'),
]
story += [
    grid(['ÁREA', 'LO QUE SE VE EN LA PLATAFORMA'], valoracion, [48 * mm, 122 * mm]),
    space(6),
    card('VALORACIÓN GLOBAL DE LA PLATAFORMA',
         'La plataforma alcanza un nivel sobresaliente de madurez visual y arquitectónica, quedando lista para '
         'la revisión final junto con los socios de la firma como paso previo a su despliegue en producción. '
         'Las cifras y nombres mostrados en las capturas son de demostración procesal.'),
    PageBreak()
]

# ================================================================= PÁGINA 3: CAPTURA PORTADA
story += [
    p('01.1 / INTERFAZ PÚBLICA PRINCIPAL', 'eyebrow'),
    p('Presencia digital y autoridad de la firma.', 'heading'),
    p('Diseño institucional de alto impacto: hero dinámico con fotografía de estudio, áreas de práctica, '
      'formulario de diagnóstico preliminar y acceso permanente a WhatsApp y asistente de IA.', 'sub'),
    space(2),
    captura('landing_escritorio_inicio.png', 'Captura: portada pública (/), primera pantalla en computadora de escritorio.'),
    space(5),
    card('ASPECTOS CLAVE DE LA PORTADA',
         '• Máscara de lectura inteligente para proteger el contraste tipográfico sobre la imagen del abogado.<br/>'
         '• Tiempos de carga ultrarrápidos (Core Web Vitals optimizados) y diseño completamente responsivo.<br/>'
         '• Cumplimiento integral LOPDP Ecuador con banner de consentimiento granular.'),
    PageBreak()
]

# ================================================================= PÁGINA 4: ANÁLISIS DE LA PORTADA
story += [
    p('02 / PORTADA PÚBLICA: QUÉ HACE CADA SECCIÓN', 'eyebrow'),
    p('La portada, paso a paso.', 'heading'),
    p('Cada componente del landing page explicado de forma clara y directa, de arriba hacia abajo.', 'sub'),
    space(2),
]
secciones_portada = [
    ('Menú superior', 'Botones para ir a cada parte de la página y para entrar a la app. En celular se abre con el ícono de tres líneas.', 'Sitio web'),
    ('Inicio (primera pantalla)', 'Foto del abogado y el mensaje principal: defensa legal y litigios de alto impacto. Tiene botones para hablar con un abogado y para conocer las áreas.', 'Sitio web'),
    ('Franja de confianza', 'Frases cortas que dan seguridad: la evaluación inicial está sujeta a revisión, la información es confidencial y la firma tiene sede en Quito con cobertura nacional.', 'Sitio web'),
    ('Quiénes somos', 'Historia de la firma, presentación del socio fundador y misión, visión y valores.', 'Sitio web'),
    ('Servicios (áreas de práctica)', 'Cuatro áreas: Litigios y defensa penal, Mercantil y empresas, Familia y sucesiones, Laboral y regulatorio. Cada tarjeta invita a consultar el caso.', 'Sitio web'),
    ('Diagnóstico preliminar y consulta', 'Formulario para pedir un diagnóstico inicial. La persona deja sus datos y recibe una referencia de seguimiento.', 'Sitio web y registro'),
    ('Metodología', 'Cómo trabaja la firma: menos incertidumbre y mayor contundencia procesal. Empieza por el diagnóstico de tu caso y da acceso al portal privado.', 'Sitio web'),
    ('Preguntas frecuentes', 'Cuatro preguntas clave: cómo iniciar una consulta, qué diferencia a la firma, si atienden fuera de Quito y si hay planes continuos. Se abren con un clic.', 'Sitio web'),
    ('Contacto', 'Teléfono y WhatsApp, correo, sede en Quito y un formulario para pedir asesoría o presupuesto.', 'Sitio web'),
    ('Pie de página', 'Enlaces a privacidad, términos, blog, áreas de práctica y acceso de clientes y profesionales.', 'Privacidad y preferencias'),
    ('Botones flotantes', 'WhatsApp para atención inmediata y el asistente de inteligencia artificial para orientación inicial con información aprobada por la firma.', 'Asistente de IA'),
    ('Banner de cookies', 'Pide permiso para usar cookies y permite aceptar solo lo necesario, con total control del visitante.', 'Privacidad y preferencias'),
]
story += [
    grid(['SECCIÓN', 'QUÉ ES, EN PALABRAS SIMPLES', 'PARTE DE'], secciones_portada, [42 * mm, 98 * mm, 30 * mm]),
    PageBreak()
]

# ================================================================= PÁGINAS 5 A 8: LOS 4 PORTALES
portales = [
    ('03.1 / PORTAL DE DIRECCIÓN Y CRM',
     '/admin: Panel de la dirección del bufete', 'admin_escritorio_inicio.png',
     'Para quién: Administrador y dirección general de la firma.',
     'Qué hace: muestra de un vistazo las causas activas, las audiencias de la semana, los clientes nuevos que llegan desde la web, la facturación y las alertas de providencias con plazo fatal. Desde aquí se gestionan los abogados, las asignaciones y el embudo CRM de prospectos.',
     'Secciones clave: Dashboard ejecutivo, Expedientes y causas, Directorio B2B, Supervisión de abogados, Buzón SATJE con IA y Configuración general.'),
    ('03.2 / PORTAL DEL CLIENTE Y SUSCRIPTOR',
     '/user: Portal del suscriptor y del cliente', 'user_escritorio_inicio.png',
     'Para quién: Clientes particulares, familias con membresía y patrocinados con causas abiertas.',
     'Qué hace: muestra la membresía activa y su próxima renovación, los juicios en seguimiento procesal, la fecha de próxima audiencia, consultas mensuales disponibles y accesos directos al abogado asignado, asistente IA y facturación electrónica.',
     'Secciones clave: Mis juicios en curso, Estado de membresía, Academia preventiva, Mi abogado titular y Asistente IA.'),
    ('03.3 / DESPACHO DEL ABOGADO LITIGANTE',
     '/abogado: Despacho de litigio de campo', 'abogado_escritorio_inicio.png',
     'Para quién: Abogados patrocinadores y litigantes del bufete.',
     'Qué hace: lista los términos judiciales por vencer ordenados cronológicamente por urgencia. Si restan menos de 24 horas, la alerta se resalta en rojo. Incluye gestión de causas asignadas, agenda de audiencias y un asistente redactor de minutas procesales.',
     'Secciones clave: Semáforo de términos COGEP, Causas asignadas, Agenda procesal de audiencias y Redactor inteligente.'),
    ('03.4 / PORTAL CORPORATIVO B2B',
     '/empresas: Portal corporativo para empresas', 'empresas_escritorio_inicio.png',
     'Para quién: Gerencia legal corporativa, directores y talento humano de empresas clientes.',
     'Qué hace: consolida la matriz de riesgo legal de la corporación, litigios mercantiles en curso, contratos comerciales auditados y causas laborales o de mediación. Cada empresa accede bajo estricto aislamiento de datos (multi-tenant) con control de sub-usuarios.',
     'Secciones clave: Matriz ejecutiva de riesgos, Contratos comerciales, Contingencias laborales y Administración de accesos.'),
]

for idx, (eyebrow, titulo, img, quien, que, secciones) in enumerate(portales):
    bloque = [
        p(eyebrow, 'eyebrow'),
        p(titulo, 'heading'),
        card(quien, f'{que}<br/><br/><b>{secciones}</b>'),
        space(4),
        captura(img, f'Captura de pantalla: interfaz de {titulo.split(":")[0]} en resolución de escritorio.'),
    ]
    story += bloque + [PageBreak()]

# ================================================================= PÁGINA 9: INVERSIÓN POR ENTREGABLE
story += [
    p('04 / INVERSIÓN POR ENTREGABLE', 'eyebrow'),
    p('Una inversión clara,<br/>con alcance definido.', 'heading'),
    p('Cada módulo de la portada pública y de los portales está respaldado por un entregable técnico valorado. '
      'El importe final refleja la tarifa preferencial con descuento comercial directo de lanzamiento.', 'sub'),
    space(2),
]
rows = [[nombre, desc, money(valor)] for nombre, desc, valor in ENTREGABLES]
story += [
    grid(['ENTREGABLE', 'ALCANCE TÉCNICO INCLUIDO', 'VALOR'], rows, [52 * mm, 90 * mm, 28 * mm], right_cols=(2,)),
    space(5)
]

totales = Table([
    [p('Valor regular de los entregables', 'body'), p(money(SUBTOTAL), 'price')],
    [p('Descuento comercial de lanzamiento (Incentivo de arranque)', 'body'), p('- ' + money(DESCUENTO), 'price')],
    [p('<b>TOTAL PREFERENCIAL DE IMPLEMENTACIÓN (sin IVA)</b>', 'body'), p(money(TOTAL), 'priceb')],
], colWidths=[140 * mm, 30 * mm])
totales.setStyle(TableStyle([
    ('BACKGROUND', (0, 2), (-1, 2), PALE),
    ('LINEABOVE', (0, 2), (-1, 2), 1.2, CYAN),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story += [
    totales,
    space(3),
    p('Valores expresados en dólares de los Estados Unidos de América (USD), sin incluir IVA.', 'small'),
    PageBreak()
]

# ================================================================= PÁGINA 10: CONDICIONES COMERCIALES
story += [
    p('CONDICIONES COMERCIALES Y SIGUIENTES PASOS', 'eyebrow'),
    p('Todo lo necesario para decidir.', 'heading'),
    space(2),
    card('FORMA DE PAGO PREFERENCIAL (sin IVA)',
         '• <b>50% al inicio:</b> $1.245,00 (activación de proyecto y arquitectura inicial).<br/>'
         '• <b>30% contra versión de revisión:</b> $747,00 (entrega de portales y flujos operativos).<br/>'
         '• <b>20% al publicar en producción:</b> $498,00 (despliegue definitivo y entrega técnica).'),
    space(3),
    card('PLAZO ESTIMADO DE EJECUCIÓN',
         '<b>25 días hábiles</b> computados a partir de la confirmación inicial y entrega de credenciales, perfiles y material básico de la firma.'),
    space(3),
    card('ACOMPAÑAMIENTO Y MANTENIMIENTO OPCIONAL',
         '<b>$180,00 sin IVA al mes</b>: incluye hasta 8 horas mensuales para ajustes, soporte preventivo y actualizaciones técnicas. Horas adicionales: $25,00 sin IVA cada una.'),
    space(3),
    card('QUÉ INCLUYE LA INVERSIÓN',
         'Sitio web institucional completo, los cuatro portales por rol (/admin, /user, /abogado, /empresas), seguimiento procesal, asistente IA configurado con conocimiento de la firma, pasarela PayPal y preparación para Deuna/Kushki, privacidad LOPDP, cookies y puesta en producción.'),
    space(3),
    card('QUÉ NO INCLUYE (Servicios de terceros contratados por la firma)',
         'Dominio web, hosting en nube (Vercel/Supabase), casilleros de correo corporativo, consumo de API de IA (OpenAI/Anthropic) y pasarelas bancarias locales.'),
    space(3),
    card('SIGUIENTES PASOS',
         '1. Aprobación formal de la propuesta y confirmación del alcance.<br/>'
         '2. Coordinación de fecha de inicio y recepción de insumos.<br/>'
         '3. SinergIA Tech acompaña cada hito hasta la publicación exitosa.')
]

# ----------------------------------------------------------------- CONSTRUCCIÓN DEL DOCUMENTO
doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    leftMargin=20 * mm,
    rightMargin=20 * mm,
    topMargin=30 * mm,
    bottomMargin=22 * mm,
    title='Valoración y propuesta de inversión VIS Legal | SinergIA Tech',
    author='SinergIA Tech',
    subject='Valoración técnica y propuesta de inversión integral para VIS Legal Abogados'
)

doc.build(story, canvasmaker=NumberedCanvas)

print(f'PDF generado exitosamente en: {OUT}')
print(f'Subtotal: {money(SUBTOTAL)} | Descuento: -{money(DESCUENTO)} | Total: {money(TOTAL)}')
