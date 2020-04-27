import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

import {
  IsInt,
  IsString,
  IsBoolean,
  validate,
  IsOptional,
} from "class-validator";
import { getRepository, createQueryBuilder } from "typeorm";
import { Todo, TodoOptions } from "../db/entity/Todo";

class TodoValidation implements TodoOptions {
  @IsInt()
  id!: number;

  @IsOptional({ groups: ["put"] })
  @IsString({ groups: ["post", "put"] })
  text!: string;

  @IsOptional({ groups: ["put"] })
  @IsBoolean({ groups: ["post", "put"] })
  complete!: boolean;
}

@JsonController("/todos")
export class TodoController {
  @Get()
  getAll() {
    return getRepository(Todo).find();
  }

  @Get("/:id")
  getOne(@Param("id") id: TodoValidation) {
    return getRepository(Todo).findOne(id);
  }

  @Post()
  post(
    @Body({ validate: { groups: ["post"], skipMissingProperties: true } })
    { text, complete }: TodoValidation
  ) {
    return getRepository(Todo).save({ text, complete });
  }

  @Put("/:id")
  put(
    @Param("id") id: TodoValidation,
    @Body({ validate: { groups: ["put"], skipMissingProperties: true } })
    todo: TodoValidation
  ) {
    if (Object.keys(todo).length === 0) throw new Error("Nothing to update");

    return getRepository(Todo)
      .createQueryBuilder()
      .update(Todo)
      .set(todo)
      .where("id = :id", id)
      .execute();
  }

  //TODO handle typeorm response
  @Delete("/:id")
  async remove(@Param("id") id: TodoValidation) {
    return await getRepository(Todo).delete(id);
  }
}
