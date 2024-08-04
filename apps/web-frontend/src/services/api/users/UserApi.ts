import { apiClient } from "../config";
import { User, UserCreationRequest, UserTokenResponse } from "types/users";

export class UserApi {
    public static async signInUser(userData: UserCreationRequest): Promise<UserTokenResponse> {
        try {
            const response = await apiClient.post<UserTokenResponse>("/users/tokens", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static async getUsersByUsername(username: string, excludeUserId: number): Promise<User[]> {
        try {
            const response = await apiClient.get<{users: User[]}>(`/users?username=${username}&exclude_user_id=${excludeUserId}`);
            return response.data.users;
        } catch (error) {
            throw error;
        }
    }

    public static async createUser(userData: UserCreationRequest): Promise<UserTokenResponse> {
        try {
            const response = await apiClient.post<UserTokenResponse>("/users", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}