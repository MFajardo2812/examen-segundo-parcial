import { Entity, Column } from "typeorm";
import { Person } from "./Person.entity";

@Entity("patients")
export class Patient extends Person {
  @Column({ type: "varchar", length: 10, nullable: true })
  bloodType?: string;

  @Column({ type: "text", nullable: true })
  allergies?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  emergencyContact?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  emergencyPhone?: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasAllergies(): boolean {
    return !!this.allergies && this.allergies.trim().length > 0;
  }
}
