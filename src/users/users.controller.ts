import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    // Patch,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get("email/:email")
    async findOneByEmail(@Param("email") email: string): Promise<User> {
        try {
            return await this.usersService.findOneByEmail(email);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    delete(@Param("id") id: string) {
        return this.usersService.delete(+id);
    }
}
