import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.tasksService.findOne(+id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(+id, updateTaskDto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.tasksService.delete(+id);
    }
}
