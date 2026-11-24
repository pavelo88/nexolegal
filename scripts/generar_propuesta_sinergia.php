<?php
/**
 * Generador de Propuesta Ejecutiva en PDF para SinergIA Tech (VIS Legal Abogados)
 * 
 * Este script PHP genera la propuesta de valoración e inversión de 10 páginas
 * con diseño de alta fidelidad, carátula ejecutiva y encabezado corporativo.
 * Compatible con Dompdf, mPDF o renderizado HTML directo para impresión/PDF.
 */

// Configuración de la empresa y propuesta
$empresa = [
    'nombre' => 'SinergIA Tech',
    'slogan' => 'Tecnología e Inteligencia Artificial aplicada',
    'ubicacion' => 'Quito, Ecuador',
    'año' => '2026',
    'web' => 'www.sinergiatech.com'
];

$cliente = [
    'nombre' => 'VIS Legal Abogados & LegalTech',
    'contacto' => 'Dr. José Aimacaña',
    'fecha' => '27 de Octubre de 2026'
];

$entregables = [
    ['item' => 'Diseño de experiencia y planificación', 'desc' => 'Estructura de la portada y de cada portal, y recorrido del cliente.', 'valor' => 160],
    ['item' => 'Sitio web de presentación', 'desc' => 'Portada, quiénes somos, servicios, metodología, preguntas frecuentes y contacto.', 'valor' => 360],
    ['item' => 'Portal y panel administrativo', 'desc' => 'Dirección (/admin), despacho del abogado (/abogado) y portal empresarial (/empresas), con navegación móvil.', 'valor' => 420],
    ['item' => 'Registro y acceso', 'desc' => 'Ingreso por rol, confirmación de correo y recuperación de acceso.', 'valor' => 360],
    ['item' => 'Clientes y expedientes', 'desc' => 'Portal del suscriptor (/user): seguimiento de juicios y avances compartidos.', 'valor' => 520],
    ['item' => 'Asistente de inteligencia artificial', 'desc' => 'Preguntas frecuentes, orientación inicial y derivación de solicitudes al equipo.', 'valor' => 480],
    ['item' => 'Privacidad y preferencias', 'desc' => 'Política de privacidad, términos y banner de cookies conforme a la LOPDP.', 'valor' => 180],
    ['item' => 'Pagos para Ecuador', 'desc' => 'PayPal, y preparación de Deuna y Kushki para su conexión posterior.', 'valor' => 390],
    ['item' => 'Revisión final y publicación', 'desc' => 'Revisión de recorridos y puesta en línea.', 'valor' => 260],
];

$subtotal = array_sum(array_column($entregables, 'valor'));
$descuento = 640;
$total = $subtotal - $descuento;

function money($n) {
    return '$' . number_format($n, 2, ',', '.');
}

// Generar vista HTML lista para imprimir o compilar a PDF con Dompdf
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Propuesta de Valoración e Inversión | SinergIA Tech</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 20mm 20mm 20mm;
            @top-center { content: ""; }
            @bottom-center { content: ""; }
        }
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            color: #20354C;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 10pt;
            line-height: 1.45;
        }
        .page {
            page-break-after: always;
            position: relative;
            min-height: 257mm;
            box-sizing: border-box;
        }
        .page:last-child {
            page-break-after: avoid;
        }
        
        /* HEADER CORPORATIVO */
        .header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #DCE6EC;
            padding-bottom: 8px;
            margin-bottom: 24px;
            position: relative;
        }
        .header-bar::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 50px;
            height: 2px;
            background: #00BBCD;
        }
        .logo-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo-symbol {
            height: 38px;
            width: auto;
        }
        .logo-brand {
            font-size: 16pt;
            font-weight: 700;
            color: #092347;
            line-height: 1.1;
        }
        .logo-brand span.ia { color: #007EBB; }
        .logo-brand span.tech {
            font-size: 8pt;
            color: #52667B;
            letter-spacing: 2px;
            margin-left: 6px;
        }
        .logo-slogan {
            font-size: 7.5pt;
            color: #0088A3;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .header-right {
            text-align: right;
        }
        .header-right .doc-type {
            font-size: 8.5pt;
            font-weight: 700;
            color: #092347;
        }
        .header-right .client-tag {
            font-size: 7.5pt;
            color: #52667B;
        }

        /* FOOTER CORPORATIVO */
        .footer-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #DCE6EC;
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            font-size: 8pt;
            color: #52667B;
        }

        /* CARÁTULA */
        .cover-top-ribbon {
            height: 5px;
            background: linear-gradient(90deg, #092347 0%, #00BBCD 30%, #092347 100%);
            margin: -20mm -20mm 25mm -20mm;
        }
        .cover-logo-lockup {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 40px;
        }
        .cover-symbol {
            height: 70px;
        }
        .cover-brand-title {
            font-size: 32pt;
            font-weight: 800;
            color: #092347;
            line-height: 1;
        }
        .cover-brand-title span.ia { color: #007EBB; }
        .cover-brand-title span.tech {
            font-size: 14pt;
            color: #52667B;
            letter-spacing: 3px;
            margin-left: 10px;
        }
        .cover-slogan {
            font-size: 10pt;
            font-weight: 700;
            color: #0088A3;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }
        .eyebrow {
            font-size: 9pt;
            font-weight: 700;
            color: #007EBB;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .cover-title {
            font-size: 30pt;
            font-weight: 800;
            color: #092347;
            line-height: 1.15;
            margin-bottom: 6px;
        }
        .cover-meta {
            font-size: 8.5pt;
            font-weight: 700;
            color: #52667B;
            margin-bottom: 24px;
        }
        .cover-heading {
            font-size: 20pt;
            font-weight: 700;
            color: #092347;
            line-height: 1.25;
            margin-bottom: 12px;
        }
        .cover-sub {
            font-size: 11pt;
            color: #52667B;
            max-width: 600px;
            line-height: 1.5;
            margin-bottom: 30px;
        }
        .investment-card {
            background: #092347;
            border-left: 5px solid #00BBCD;
            color: #ffffff;
            padding: 20px 24px;
            border-radius: 4px;
            margin-top: 15px;
        }
        .investment-tag {
            font-size: 9pt;
            font-weight: 700;
            color: #00BBCD;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
        }
        .investment-price {
            font-size: 32pt;
            font-weight: 800;
            color: #ffffff;
            line-height: 1;
            margin-bottom: 10px;
        }
        .investment-price span {
            font-size: 14pt;
            font-weight: 400;
            opacity: 0.85;
        }
        .investment-detail {
            font-size: 9pt;
            color: #E2EEF5;
            line-height: 1.4;
        }

        /* TABLAS Y TARJETAS */
        table.styled-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 9pt;
        }
        table.styled-table th {
            background: #092347;
            color: #00BBCD;
            font-weight: 700;
            text-align: left;
            padding: 9px 12px;
            border-bottom: 2px solid #00BBCD;
            font-size: 8.5pt;
        }
        table.styled-table td {
            padding: 9px 12px;
            border-bottom: 1px solid #DCE6EC;
            vertical-align: top;
        }
        table.styled-table tr:nth-child(even) {
            background: #F2F6F9;
        }
        .card {
            background: #F2F6F9;
            border-left: 4px solid #007EBB;
            padding: 14px 16px;
            border-radius: 3px;
            margin: 14px 0;
        }
        .card-title {
            font-weight: 700;
            font-size: 10.5pt;
            color: #092347;
            margin-bottom: 4px;
        }
        .card-body {
            font-size: 9.3pt;
            color: #20354C;
            line-height: 1.4;
        }
    </style>
</head>
<body>

    <!-- ================= PÁGINA 1: CARÁTULA ================= -->
    <div class="page">
        <div class="cover-top-ribbon"></div>
        
        <div class="cover-logo-lockup">
            <img src="../entrega_sinergia/marca/sinergia-s-cropped.png" alt="SinergIA" class="cover-symbol">
            <div>
                <div class="cover-brand-title">
                    Sinerg<span class="ia">IA</span><span class="tech">TECH</span>
                </div>
                <div class="cover-slogan"><?= htmlspecialchars($empresa['slogan']) ?></div>
            </div>
        </div>

        <div class="eyebrow">PROPUESTA ESTRATÉGICA DE VALORACIÓN E INVERSIÓN</div>
        <div class="cover-title">Preparado para<br><?= htmlspecialchars($cliente['nombre']) ?></div>
        <div class="cover-meta"><?= strtoupper($cliente['nombre']) ?> · <?= strtoupper($cliente['fecha']) ?></div>

        <div class="cover-heading">Una plataforma lista para<br>presentar y operar su firma.</div>
        <div class="cover-sub">
            Valoración técnica de la plataforma web, explicación detallada de cada sección y portal por rol, y la inversión preferencial por entregable.
        </div>

        <div class="investment-card">
            <div class="investment-tag">INVERSIÓN PREFERENCIAL DE LANZAMIENTO</div>
            <div class="investment-price"><?= money($total) ?> <span>sin IVA</span></div>
            <div class="investment-detail">
                <strong>Subtotal entregables:</strong> <?= money($subtotal) ?> · <strong>Descuento comercial directo:</strong> -<?= money($descuento) ?><br>
                Precio final de la implementación del alcance descrito en este documento.
            </div>
        </div>

        <div class="footer-bar">
            <span>SinergIA Tech · Soluciones de Software & LegalTech de Alto Impacto</span>
            <span><?= htmlspecialchars($empresa['ubicacion']) ?> · <?= htmlspecialchars($empresa['año']) ?></span>
        </div>
    </div>

</body>
</html>
