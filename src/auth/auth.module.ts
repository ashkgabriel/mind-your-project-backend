import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "defaultSecret",
            signOptions: { expiresIn: "60m" },
        }),
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
