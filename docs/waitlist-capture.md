# Waitlist capture operativa

Este proyecto ahora captura leads desde el formulario principal sin depender del `action="/waitlist"` del navegador.

## Flujo actual

1. El formulario de la landing envía el correo por JavaScript usando `submitWaitlistLead`.
2. Si existe `VITE_WAITLIST_ENDPOINT`, se intenta un `POST` JSON con:
   - `email`
   - `createdAt`
   - `source: "landing"`
3. Si ese endpoint no está configurado o falla, se guarda una copia local en `localStorage` bajo la clave:
   - `myquota.waitlist.leads`

## Operación mínima garantizada

- **Remota (preferida):** configurar `VITE_WAITLIST_ENDPOINT` en el entorno de despliegue.
- **Fallback operable:** la app conserva el lead en `localStorage` para no perder registros mientras se recupera el endpoint remoto.

## Nota de producto

Los mensajes mostrados al usuario distinguen entre registro remoto y registro en fallback local, con texto en español neutral.
