import { Injectable } from "@nestjs/common";
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
            secretOrKey: process.env.JWT_SECRET || "defaultSecret",
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        return this.usersService.findOneByEmail(payload.email);
    }
}
