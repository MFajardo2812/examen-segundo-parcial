import { Entity, Column } from "typeorm";
import { Person } from "./Person.entity";

@Entity("doctors")
export class Doctor extends Person {
  @Column({ type: "varchar", length: 100 })
  specialty!: string;

  @Column({ type: "varchar", length: 50, unique: true })
  licenseNumber!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  consultationFee?: number;

  @Column({ type: "int", nullable: true })
  yearsOfExperience?: number;

  getFullName(): string {
    return `Dr. ${this.firstName} ${this.lastName}`;
  }

  getProfessionalTitle(): string {
    return `${this.getFullName()} - ${this.specialty}`;
  }
}
