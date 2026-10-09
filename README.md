# MaintenIX — prototipo funcional en Flask + SQLite

Aplicación web local para gestión de mantenimiento de Mi Ropa Favorita.

## Requisitos
- Python 3.10 o superior
- Navegador moderno

## Ejecutar en Windows
1. Extraé la carpeta del ZIP.
2. Abrí la carpeta `MaintenIX`.
3. Ejecutá `run_windows.bat`.
4. Cuando Flask inicie, abrí http://127.0.0.1:5000 en el navegador.

Si `py` no existe, instalá Python desde python.org y marcá la opción **Add Python to PATH**.

## Ejecutar en macOS/Linux
Desde una terminal, dentro de la carpeta del proyecto:
```bash
chmod +x run_mac_linux.sh
./run_mac_linux.sh
```
Luego abrí http://127.0.0.1:5000.

## Desplegar en Render
1. Subí este repositorio a GitHub.
2. En Render, creá un **Blueprint** (New > Blueprint) y apuntá al repo; Render leerá `render.yaml`.
   - Alternativa manual: New > Web Service, *Runtime* Python, *Build Command* `pip install -r requirements.txt`, *Start Command* `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120`.
3. Variables de entorno recomendadas:
   - `MAINTENIX_SECRET_KEY`: clave secreta (Render puede generarla).
   - `MAINTENIX_DATA_DIR`: carpeta persistente para la base de datos y evidencias (por defecto `instance`).
4. El `render.yaml` monta un disco persistente en `/var/data` y apunta `MAINTENIX_DATA_DIR` ahí, para que la base SQLite y las evidencias sobrevivan a los despliegues.

> Los **discos persistentes requieren un plan pago** (Starter o superior). En el plan *free* el sistema de archivos es efímero: la base y las evidencias se borran en cada deploy/reinicio. Para usar el plan gratis, quitá el bloque `disk` de `render.yaml` y la variable `MAINTENIX_DATA_DIR`, asumiendo que los datos no persisten.

> Esta app usa SQLite con 1 worker de gunicorn; no escales el servicio a varias instancias ni subas el número de workers.

## Cuenta inicial
- Correo: `admin@maintenix.local`
- Contraseña: `Admin123!`

**Cambiá esta contraseña y la clave secreta antes de cualquier despliegue real.** La cuenta inicial se crea solo si no existe una cuenta de encargado.

## Funciones incluidas
- Inicio de sesión y solicitud de registro con aprobación por el encargado.
- Roles: encargado, técnico y supervisor de producción.
- Dashboard con indicadores operativos y fallas por máquina.
- Inventario de equipos con criticidad y datos operativos.
- Órdenes de trabajo para mantenimiento preventivo, correctivo e inspecciones.
- Estados de órdenes, asignación, aprobación de cierre por el encargado y registro de tiempos/costos.
- Inventario de repuestos con stock mínimo y descuento de stock al asociarlos a una orden.
- Carga de fotos/documentos a las evidencias de una orden.
- Reportes de historial, mantenimientos vencidos, costos, fallas y paradas.
- Configuración de empresa, moneda, zona horaria y metas de indicadores.
- Datos de demostración opcionales; incluyen una máquina Sambo marcada como crítica, con especificaciones por confirmar.

## Persistencia y copias
La base de datos local se guarda en `instance/maintenix.db`. Las evidencias se guardan en `instance/uploads/`. Para hacer una copia de seguridad, cerrá la aplicación y copiá la carpeta `instance`.

## Limitaciones conocidas de esta primera versión
- La aplicación funciona localmente en una computadora; SQLite no está preparada para múltiples servidores simultáneos.
- La subida de evidencias es almacenamiento local, no almacenamiento en nube.
- Las notificaciones por correo no están activadas; requiere configurar un proveedor SMTP y credenciales.
- No incluye todavía exportación a Excel/PDF, importación desde Excel ni registro de lecturas periódicas de horas de operación.
- MTBF/MTTR y disponibilidad son indicadores iniciales y dependen de la calidad de las fechas de fallas, reparación y horas de parada registradas. Revisá las definiciones con tu asesor antes de usarlos en un informe académico.
- El modo demo evita cargar datos de ejemplo si ya existe algún equipo. Los registros demo deben distinguirse de los datos reales en una fase siguiente.

## Seguridad
Este código es un punto de partida ejecutable, no una versión endurecida para exposición pública. No lo publiques en internet sin revisar CSRF, política de contraseñas, límites de acceso a archivos, validación, sesiones, copias de seguridad y configuración de producción.
