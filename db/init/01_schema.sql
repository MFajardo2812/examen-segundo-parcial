-- Habilita UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS simulacion_productos;
DROP TABLE IF EXISTS simulaciones;
DROP TABLE IF EXISTS productos_financieros;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  capital_disponible NUMERIC(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE productos_financieros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  costo NUMERIC(10,2) NOT NULL,
  porcentaje_retorno NUMERIC(5,2) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE simulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_simulacion TIMESTAMP NOT NULL DEFAULT NOW(),
  capital_disponible NUMERIC(10,2) NOT NULL,
  costo_total NUMERIC(10,2) NOT NULL,
  capital_restante NUMERIC(10,2) NOT NULL,
  ganancia_total NUMERIC(10,2) NOT NULL,
  retorno_total_porcentaje NUMERIC(10,2) NOT NULL,
  eficiencia_capital NUMERIC(10,2) NOT NULL,
  riesgo_total NUMERIC(10,2) NOT NULL DEFAULT 0,
  mensaje TEXT NOT NULL
);

-- Detalle persistente: evaluados + seleccionados + cálculos
-- (cumple “productos evaluados, seleccionados, cálculos de costo/ganancia/riesgo”)
CREATE TABLE simulacion_productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  simulacion_id UUID NOT NULL REFERENCES simulaciones(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  precio NUMERIC(10,2) NOT NULL,
  porcentaje_ganancia NUMERIC(10,2) NOT NULL,
  riesgo NUMERIC(10,2) NOT NULL DEFAULT 0,
  ganancia_esperada NUMERIC(10,2) NOT NULL,
  retorno_individual_porcentaje NUMERIC(10,2) NOT NULL,
  seleccionado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_simulaciones_usuario ON simulaciones(usuario_id);
CREATE INDEX idx_simulacion_productos_simulacion ON simulacion_productos(simulacion_id);
