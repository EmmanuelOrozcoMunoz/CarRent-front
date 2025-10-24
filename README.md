
# Angular Dashboard Template (FastAPI-ready)

Plantilla Angular (skeleton) con:
- Sidebar
- Grid para mostrar `/contratos` desde FastAPI
- Login que guarda token en localStorage
- AuthGuard para proteger rutas

## Pasos para usar
1. Descargar y descomprimir el proyecto.
2. Ejecutar en la carpeta del proyecto:
   ```bash
   npm install
   npm install -g @angular/cli   # si no tienes angular cli
   ng serve
   ```
3. Angular correrá normalmente en http://localhost:4200.
4. Cambia la URL base en `src/app/services/api.service.ts` si tu backend usa otro puerto.

---
Esta plantilla es un **esqueleto**: después de `npm install` puede que necesites ajustar versiones o dependencias según tu entorno.
