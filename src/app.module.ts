import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { ProjectsModule } from "./projects/projects.module";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TasksService } from "./tasks/tasks.service";

@Module({
    imports: [ProjectsModule, PrismaModule, TasksModule],
    controllers: [AppController, TasksController],
    providers: [AppService, PrismaService, TasksService],
})
export class AppModule {}
