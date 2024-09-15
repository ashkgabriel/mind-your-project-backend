import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaClient) {}

    async create(CreateProjectDto) {
        return this.prisma.project.create({
            data: CreateProjectDto,
        });
    }

    async findAll() {
        return this.prisma.project.findMany();
    }

    async findOne(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.prisma.project.findUnique({ where: { id } });

        if (!project) {
            throw new NotFoundException(
                `Projeto com o ID: ${id} não encontrado.`,
            );
        }
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
        });
    }

    async delete(id: number) {
        const project = await this.prisma.project.findUnique({ where: { id } });

        if (!project) {
            throw new NotFoundException(
                `Projeto com o ID: ${id} não encontrado.`,
            );
        }
        return this.prisma.project.delete({
            where: { id },
        });
    }
}
