import { ValueTransformer } from "typeorm";

export const numericTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? 0 : Number(value))
};
