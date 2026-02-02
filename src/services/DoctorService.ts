import { DoctorRepository } from "../repositories/DoctorRepository";
import { CreateDoctorDto } from "../dtos/CreateDoctorDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";
import { Doctor } from "../entities/Doctor.entity";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async createDoctor(dto: CreateDoctorDto): Promise<Doctor> {
  const existingEmail = await this.doctorRepository.findByEmail(dto.email);
  if (existingEmail) {
    throw new Error(`Doctor with email ${dto.email} already exists`);
  }

  const existingId = await this.doctorRepository.findByIdentification(dto.identificationNumber);
  if (existingId) {
    throw new Error(`Doctor with identification ${dto.identificationNumber} already exists`);
  }

  const existingLicense = await this.doctorRepository.findByLicense(dto.licenseNumber);
  if (existingLicense) {
    throw new Error(`Doctor with license ${dto.licenseNumber} already exists`);
  }

  // Convertir string a Date
  const doctorData = {
    ...dto,
    dateOfBirth: new Date(dto.dateOfBirth),
  };

  return await this.doctorRepository.create(doctorData);
}


  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return await this.doctorRepository.findAll();
  }

  async getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
    return await this.doctorRepository.findBySpecialty(specialty);
  }

  async updateDoctor(id: string, dto: UpdateUserDto): Promise<Doctor> {
    const doctor = await this.getDoctorById(id);

    if (dto.email && dto.email !== doctor.email) {
      const existingEmail = await this.doctorRepository.findByEmail(dto.email);
      if (existingEmail) {
        throw new Error(`Email ${dto.email} is already in use`);
      }
    }

    return await this.doctorRepository.update(id, dto);
  }

  async deactivateDoctor(id: string): Promise<void> {
    await this.getDoctorById(id);
    await this.doctorRepository.softDelete(id);
  }
}
