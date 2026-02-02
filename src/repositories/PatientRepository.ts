import { AppDataSource } from "../config/database";
import { Patient } from "../entities/Patient.entity";

export class PatientRepository {
  private repository = AppDataSource.getRepository(Patient);

  async create(data: Partial<Patient>): Promise<Patient> {
    const patient = this.repository.create(data);
    return await this.repository.save(patient);
  }

  async findById(id: string): Promise<Patient | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Patient[]> {
    return await this.repository.find({ where: { isActive: true } });
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByIdentification(identificationNumber: string): Promise<Patient | null> {
    return await this.repository.findOne({ where: { identificationNumber } });
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    await this.repository.update(id, data);
    const updated = await this.findById(id);
    if (!updated) throw new Error("Patient not found after update");
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.update(id, { isActive: false });
  }
}

