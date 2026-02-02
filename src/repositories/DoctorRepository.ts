import { AppDataSource } from "../config/database";
import { Doctor } from "../entities/Doctor.entity";

export class DoctorRepository {
  private repository = AppDataSource.getRepository(Doctor);

  async create(data: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.repository.create(data);
    return await this.repository.save(doctor);
  }

  async findById(id: string): Promise<Doctor | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Doctor[]> {
    return await this.repository.find({ where: { isActive: true } });
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByIdentification(identificationNumber: string): Promise<Doctor | null> {
    return await this.repository.findOne({ where: { identificationNumber } });
  }

  async findByLicense(licenseNumber: string): Promise<Doctor | null> {
    return await this.repository.findOne({ where: { licenseNumber } });
  }

  async findBySpecialty(specialty: string): Promise<Doctor[]> {
    return await this.repository.find({ where: { specialty, isActive: true } });
  }

  async update(id: string, data: Partial<Doctor>): Promise<Doctor> {
    await this.repository.update(id, data);
    const updated = await this.findById(id);
    if (!updated) throw new Error("Doctor not found after update");
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.update(id, { isActive: false });
  }
}
