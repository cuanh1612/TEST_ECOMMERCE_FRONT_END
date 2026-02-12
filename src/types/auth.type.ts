export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    email: string
    password: string
    confirmPassword: string
}

export interface LoginResponse {
    access_token: string
}