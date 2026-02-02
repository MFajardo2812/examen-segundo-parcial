import { Router } from "express";
import { DoctorController } from "../controllers/DoctorController";

const router = Router();
const doctorController = new DoctorController();

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Crear nuevo médico
 *     tags: [Doctors]
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
 *               - specialty
 *               - licenseNumber
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Carlos
 *               lastName:
 *                 type: string
 *                 example: Mendoza
 *               email:
 *                 type: string
 *                 example: cmendoza@hospital.com
 *               identificationNumber:
 *                 type: string
 *                 example: "1234567890"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1980-05-15"
 *               specialty:
 *                 type: string
 *                 example: Cardiología
 *               licenseNumber:
 *                 type: string
 *                 example: MED-12345
 *               consultationFee:
 *                 type: number
 *                 example: 50.00
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/", (req, res) => doctorController.create(req, res));

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Listar todos los médicos activos
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get("/", (req, res) => doctorController.getAll(req, res));

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Obtener médico por ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado
 */
router.get("/:id", (req, res) => doctorController.getById(req, res));

/**
 * @swagger
 * /doctors/specialty/{specialty}:
 *   get:
 *     summary: Buscar médicos por especialidad
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: specialty
 *         required: true
 *         schema:
 *           type: string
 *         example: Cardiología
 *     responses:
 *       200:
 *         description: Lista de médicos de esa especialidad
 */
router.get("/specialty/:specialty", (req, res) => doctorController.getBySpecialty(req, res));

/**
 * @swagger
 * /doctors/{id}:
 *   patch:
 *     summary: Actualizar médico
 *     tags: [Doctors]
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
 *               consultationFee:
 *                 type: number
 *     responses:
 *       200:
 *         description: Médico actualizado
 */
router.patch("/:id", (req, res) => doctorController.update(req, res));

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Desactivar médico
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Médico desactivado
 */
router.delete("/:id", (req, res) => doctorController.deactivate(req, res));

export default router;
