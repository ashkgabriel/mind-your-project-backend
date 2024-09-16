import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    // IsDate,
    Min,
    IsDateString,
} from "class-validator";

export enum TaskStatus {
    PENDENTE = "PENDENTE",
    EM_PROGRESSO = "EM_PROGRESSO",
    COMPLETO = "COMPLETO",
}

export enum TaskPriority {
    BAIXA = "BAIXA",
    MEDIA = "MEDIA",
    ALTA = "ALTA",
}

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority;

    @IsInt()
    @Min(0)
    @IsOptional()
    estimatedTime?: number;

    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsDateString()
    dueDate: string;

    @IsInt()
    responsibleId: number;

    @IsInt()
    projectId: number;
}
