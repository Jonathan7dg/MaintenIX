# MaintenIX — prototipo funcional en Flask + PostgreSQL (Supabase)

Aplicación web para gestión de mantenimiento de Mi Ropa Favorita.

## Requisitos
- Python 3.10 o superior
- Navegador moderno
- Una base de datos PostgreSQL (se usa un proyecto de Supabase) y la variable de entorno `DATABASE_URL`

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

## Desplegar en Render (plan free)
1. Subí este repositorio a GitHub.
2. En Render, creá un **Blueprint** (New > Blueprint) y apuntá al repo; Render leerá `render.yaml` (plan **free**, sin disco).
3. Variables de entorno (Render las pide al aplicar el Blueprint):
   - `DATABASE_URL`: cadena de conexión de Supabase (Dashboard → Project Settings → Database → Connection string → **URI**). **Requerida.**
   - `MAINTENIX_SECRET_KEY`: Render la genera automáticamente.
4. Build `pip install -r requirements.txt`; Start `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120`.

> La base de datos es **PostgreSQL de Supabase**, así que los datos sobreviven a los redeploys y al *spin-down* del plan free de Render. Las **evidencias** (archivos subidos) se guardan en el disco efímero de Render y se pierden en cada deploy/reinicio.
>
> Esta app usa 1 worker de gunicorn; no escales el servicio a varias instancias.

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
Los datos se guardan en **PostgreSQL (Supabase)**, indicado por la variable `DATABASE_URL`. Las evidencias subidas se guardan en `instance/uploads/` (local/efímero). Para respaldar la base usá el panel de Supabase (Database → Backups) o `pg_dump "$DATABASE_URL" > backup.sql`.

## Limitaciones conocidas de esta primera versión
- La aplicación usa PostgreSQL; configurá `DATABASE_URL` antes de correrla.
- La subida de evidencias es almacenamiento local, no almacenamiento en nube.
- Las notificaciones por correo no están activadas; requiere configurar un proveedor SMTP y credenciales.
- No incluye todavía exportación a Excel/PDF, importación desde Excel ni registro de lecturas periódicas de horas de operación.
- MTBF/MTTR y disponibilidad son indicadores iniciales y dependen de la calidad de las fechas de fallas, reparación y horas de parada registradas. Revisá las definiciones con tu asesor antes de usarlos en un informe académico.
- El modo demo evita cargar datos de ejemplo si ya existe algún equipo. Los registros demo deben distinguirse de los datos reales en una fase siguiente.

## Seguridad
Este código es un punto de partida ejecutable, no una versión endurecida para exposición pública. No lo publiques en internet sin revisar CSRF, política de contraseñas, límites de acceso a archivos, validación, sesiones, copias de seguridad y configuración de producción.
