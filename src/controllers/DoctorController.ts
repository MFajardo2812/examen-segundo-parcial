import { Request, Response } from "express";
import { DoctorService } from "../services/DoctorService";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";

export class DoctorController {
  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = plainToClass(CreateDoctorDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors });
        return;
      }

      const doctor = await this.doctorService.createDoctor(dto);
      res.status(201).json(doctor);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const doctor = await this.doctorService.getDoctorById(id);
      res.status(200).json(doctor);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(200).json(doctors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBySpecialty(req: Request, res: Response): Promise<void> {
    try {
      const specialty = req.params.specialty as string;
      const doctors = await this.doctorService.getDoctorsBySpecialty(specialty);
      res.status(200).json(doctors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const dto = plainToClass(UpdateUserDto, req.body);
      const doctor = await this.doctorService.updateDoctor(id, dto);
      res.status(200).json(doctor);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deactivate(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      await this.doctorService.deactivateDoctor(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
