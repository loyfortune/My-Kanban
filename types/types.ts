export interface Task {
    id: string;
    status: string;
    name: string;
}

export interface Board {
    tasks: Task[];
    id: string;
    name: string
}