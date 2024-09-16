import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
