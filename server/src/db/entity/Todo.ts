import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type TodoOptions = {
  text: string;
  complete: boolean;
  startsAt: Date;
};

@Entity()
export class Todo implements TodoOptions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  complete!: boolean;

  @Column({ type: "datetime" })
  startsAt!: Date;

  constructor(options: TodoOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }
}
