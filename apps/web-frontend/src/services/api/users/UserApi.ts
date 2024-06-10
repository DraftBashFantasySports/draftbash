import { apiClient } from "../config";
import { UserCreationRequest, UserTokenResponse } from "./types";

export class UserApi {
    public static async signInUser(userData: UserCreationRequest): Promise<UserTokenResponse> {
        try {
            const response = await apiClient.post<UserTokenResponse>("/users/tokens", userData);
            return response.data;
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