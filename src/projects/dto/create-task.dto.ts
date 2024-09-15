export class CreateTastDto {
    name: string;
    description: string;
    priority?: string;
    estimatedTime?: number;
    status: string;
    dueDate: Date;
    projectId: number;
    responsibleId: number;
}
