import * as SecureStore from "expo-secure-store";

export class TokenStorage {
    private static TOKEN_KEY: string = "draftbash_jwt_token";

    public static async saveToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(this.TOKEN_KEY, token);
        } catch (error) {
            console.error("Error saving token", error);
        }
    }

    public static async getToken(): Promise<string | null> {
        try {
            const token = await SecureStore.getItemAsync(this.TOKEN_KEY);
            return token;
        } catch (error) {
            console.error("Error getting token", error);
            return null;
        }
    }

    public static async deleteToken(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(this.TOKEN_KEY);
        } catch (error) {
            console.error("Error deleting token", error);
        }
    }
}
