# Instrumentación - myquota landing

Eventos enviados al dataLayer:

- view_hero

  - payload: { event: 'view_hero', variant, source: 'hero', timestamp }

- ab_assignment

  - payload: { event: 'ab_assignment', variant, source: 'page_load', timestamp }

- signup_click

  - payload: { event: 'signup_click', source: 'hero', variant, timestamp }

- signup_submit

  - payload: { event: 'signup_submit', email_hash, variant, timestamp }

- signup_submit_error
  - payload: { event: 'signup_submit_error', email_hash, variant, timestamp }

Notas de validación en GTM:

1. Abrir Preview mode en GTM
2. Cargar la página y verificar que los eventos aparecen en la consola de Preview
3. En local también se imprimen mensajes en consola via console.debug

Privacidad:

- Nunca enviar emails en claro. Usamos hashEmail() antes de enviar a analytics.

Fallback queue:

- Si POST /waitlist falla, los correos se encolan en localStorage key `mq_waitlist`.
- Para procesar la cola en un servidor, se propone una función serverless que lea la cola del cliente o un endpoint administrativo.

Assets placeholders:

- /assets/logo1.svg, logo2.svg, logo3.svg son placeholders. Reemplazar por assets reales en /assets/logos/.
