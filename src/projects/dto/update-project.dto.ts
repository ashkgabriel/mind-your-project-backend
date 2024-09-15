import {
    IsString,
    IsOptional,
    IsDate,
    IsNotEmpty,
    // IsEmpty,
} from "class-validator";

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;
}
