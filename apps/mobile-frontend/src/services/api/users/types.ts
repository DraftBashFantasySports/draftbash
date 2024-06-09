export type UserCreationRequest = {
    username: string;
    email: string;
    password: string;
};

export type UserTokenResponse = {
    jwtToken: string;
    user: User;
};

export type User = {
    id: number;
    username: string;
    email: string;
}