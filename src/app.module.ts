import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { ProjectsModule } from "./projects/projects.module";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TasksService } from "./tasks/tasks.service";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        PrismaModule,
        ProjectsModule,
        TasksModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController, TasksController, AuthController],
    providers: [AppService, PrismaService, TasksService, AuthService],
})
export class AppModule {}
