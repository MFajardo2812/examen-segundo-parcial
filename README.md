# AndesFin - Microservicio de Simulación de Inversiones

Microservicio para la fintech ficticia *AndesFin*. Permite:
- Consultar usuarios
- Consultar productos financieros activos
- Ejecutar simulaciones de inversión (selección óptima de productos con un capital dado)
- Consultar historial de simulaciones por usuario

## Tecnologías
- Node.js + TypeScript
- Express
- PostgreSQL
- TypeORM (ORM obligatorio)
- Docker Compose (DB + API + init SQL automático)

## Ejecución (Docker - recomendado)
### 1) Levantar todo (DB + API) con init SQL automático
```bash
docker compose up --build
