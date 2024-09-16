import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [TasksController],
    providers: [TasksService, PrismaService],
})
export class TasksModule {}
