import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || "defaultSecret", // Usar a chave secreta configurada
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findOneByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException("Invalid token"); // Lançar erro se o usuário não for encontrado
        }

        return user; // Retorna o usuário se for válido
    }
}
