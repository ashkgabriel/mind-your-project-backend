import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                dueDate: new Date(createTaskDto.dueDate),
            },
        });
    }

    async findAll() {
        return this.prisma.task.findMany();
    }

    async findOne(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        return this.prisma.task.update({
            where: { id },
            data: {
                ...updateTaskDto,
            },
        });
    }

    async delete(id: number) {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}
