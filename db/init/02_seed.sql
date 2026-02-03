INSERT INTO usuarios (nombre, email, capital_disponible) VALUES
('Juan Perez',  'juan.perez@email.com', 5000.00),
('Maria Garcia','maria.garcia@email.com', 8000.00),
('Carlos Lopez','carlos.lopez@email.com', 2000.00),
('Ana Torres',  'ana.torres@email.com', 1200.00),
('Luis Romero', 'luis.romero@email.com', 3500.00);

INSERT INTO productos_financieros (nombre, descripcion, costo, porcentaje_retorno, activo) VALUES
('Fondo Acciones Tech', 'Fondo de inversión en acciones tecnológicas', 1000.00, 8.50, TRUE),
('Bonos Corporativos AAA', 'Bonos corporativos de alta calificación', 500.00, 5.25, TRUE),
('ETF Global', 'ETF diversificado global', 1500.00, 12.00, TRUE),
('Fondo de Dividendos', 'Fondo enfocado en dividendos estables', 800.00, 6.75, TRUE),
('Bonos del Tesoro', 'Bonos gubernamentales de bajo riesgo', 1200.00, 4.50, TRUE),
('Cuenta de Ahorro', 'Instrumento conservador con retorno bajo', 0.00, 1.50, TRUE),
('Crowdfunding Regul.','Inversión en proyectos regulados', 300.00, 9.00, TRUE),
('Cobertura FX', 'Cobertura frente a variaciones cambiarias', 400.00, 3.75, FALSE);
