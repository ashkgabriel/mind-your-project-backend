import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }
    async findOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async delete(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return this.prisma.user.delete({ where: { id } });
    }
}
