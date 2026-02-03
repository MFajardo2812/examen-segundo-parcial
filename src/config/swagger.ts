export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "AndesFin API",
    version: "1.0.0"
  },
  paths: {
    "/usuarios": {
      get: {
        summary: "Listar todos los usuarios",
        responses: { "200": { description: "OK" } }
      }
    },
    "/productos": {
      get: {
        summary: "Listar todos los productos activos",
        responses: { "200": { description: "OK" } }
      }
    },
    "/simulaciones": {
      post: {
        summary: "Realizar una simulación de inversión",
        responses: { "200": { description: "OK" } }
      }
    },
    "/simulaciones/{usuarioId}": {
      get: {
        summary: "Consultar simulaciones de un usuario",
        parameters: [{ name: "usuarioId", in: "path", required: true }],
        responses: { "200": { description: "OK" } }
      }
    }
  }
};

