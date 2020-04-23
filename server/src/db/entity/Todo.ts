import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type TodoOptions = {
  text: string;
  complete: boolean;
};

@Entity()
export class Todo implements TodoOptions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  complete!: boolean;

  constructor(options: TodoOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }
}
