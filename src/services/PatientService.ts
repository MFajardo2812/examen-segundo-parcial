import { PatientRepository } from "../repositories/PatientRepository";
import { CreatePatientDto } from "../dtos/CreatePatientDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";
import { Patient } from "../entities/Patient.entity";

export class PatientService {
  private patientRepository: PatientRepository;

  constructor() {
    this.patientRepository = new PatientRepository();
  }

  async createPatient(dto: CreatePatientDto): Promise<Patient> {
  const existingEmail = await this.patientRepository.findByEmail(dto.email);
  if (existingEmail) {
    throw new Error(`Patient with email ${dto.email} already exists`);
  }

  const existingId = await this.patientRepository.findByIdentification(dto.identificationNumber);
  if (existingId) {
    throw new Error(`Patient with identification ${dto.identificationNumber} already exists`);
  }

  // Convertir string a Date
  const patientData = {
    ...dto,
    dateOfBirth: new Date(dto.dateOfBirth),
  };

  return await this.patientRepository.create(patientData);
}

  async getPatientById(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async getAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }

  async updatePatient(id: string, dto: UpdateUserDto): Promise<Patient> {
    const patient = await this.getPatientById(id);

    if (dto.email && dto.email !== patient.email) {
      const existingEmail = await this.patientRepository.findByEmail(dto.email);
      if (existingEmail) {
        throw new Error(`Email ${dto.email} is already in use`);
      }
    }

    return await this.patientRepository.update(id, dto);
  }

  async deactivatePatient(id: string): Promise<void> {
    await this.getPatientById(id);
    await this.patientRepository.softDelete(id);
  }
}
