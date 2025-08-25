export interface ResponseLogin {
    success: boolean;
    content: Content;
    message: string;
    errors:  unknown[];
}

export interface Content {
    user:  User;
    token: string;
}

export interface User {
    id:       string;
    fullName: string;
    email:    string;
    role:     string;
}


export interface ResponTodos {
    content: Content;
    message: string;
    errors:  unknown[];
}

export interface Content {
    entries:   Todo[];
    totalData: number;
    totalPage: number;
}

export interface Todo {
    id?:        string;
    item:      string;
    userId:    string;
    isDone:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
