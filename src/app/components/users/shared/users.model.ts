

export interface UserRole {
    label: string;
    value: string;
}

export interface User {
    id?: number;
    nombre?: string;
    email?: string;
    role?: UserRole;
    password?: string;
    is_active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserResponse {
    message: string;
    data: User;
}

export interface UsersResponse {
    message: string;
    data: {
        count: number;
        rows: User[];
    };
}

export interface MessageResponse {
    message: string;
}
