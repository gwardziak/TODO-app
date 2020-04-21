import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

type TodoOptions = {
  text: string;
  complete: boolean;
};

@Entity()
export class Todo {
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
