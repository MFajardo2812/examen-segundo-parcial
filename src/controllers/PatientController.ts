import { Request, Response } from "express";
import { PatientService } from "../services/PatientService";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreatePatientDto } from "../dtos/CreatePatientDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";

export class PatientController {
  private patientService: PatientService;

  constructor() {
    this.patientService = new PatientService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToClass(CreatePatientDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors });
        return;
      }

      const patient = await this.patientService.createPatient(dto);
      res.status(201).json(patient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const patient = await this.patientService.getPatientById(id);
      res.status(200).json(patient);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.patientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = plainToClass(UpdateUserDto, req.body);
      const patient = await this.patientService.updatePatient(id, dto);
      res.status(200).json(patient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deactivate(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await this.patientService.deactivatePatient(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
