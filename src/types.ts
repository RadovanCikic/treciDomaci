

export interface User {
    name: string,
    email: string,
}

export interface UserRes {
    user: User,
    token: string
}