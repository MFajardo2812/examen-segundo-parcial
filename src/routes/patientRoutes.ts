import { Router } from "express";
import { PatientController } from "../controllers/PatientController";

const router = Router();
const patientController = new PatientController();

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Crear nuevo paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - identificationNumber
 *               - dateOfBirth
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: María
 *               lastName:
 *                 type: string
 *                 example: González
 *               email:
 *                 type: string
 *                 example: mgonzalez@email.com
 *               identificationNumber:
 *                 type: string
 *                 example: "0987654321"
 *               phone:
 *                 type: string
 *                 example: "0998765432"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-03-20"
 *               bloodType:
 *                 type: string
 *                 example: O+
 *               allergies:
 *                 type: string
 *                 example: Penicilina
 *               emergencyContact:
 *                 type: string
 *                 example: Juan González
 *               emergencyPhone:
 *                 type: string
 *                 example: "0912345678"
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *       400:
 *         description: Error de validación o email duplicado
 */
router.post("/", (req, res) => patientController.create(req, res));

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Listar todos los pacientes activos
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get("/", (req, res) => patientController.getAll(req, res));

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Obtener paciente por ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 */
router.get("/:id", (req, res) => patientController.getById(req, res));

/**
 * @swagger
 * /patients/{id}:
 *   patch:
 *     summary: Actualizar paciente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               allergies:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado
 */
router.patch("/:id", (req, res) => patientController.update(req, res));

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Desactivar paciente
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Paciente desactivado
 */
router.delete("/:id", (req, res) => patientController.deactivate(req, res));

export default router;
