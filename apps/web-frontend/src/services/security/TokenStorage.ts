export class TokenStorage {
    private static TOKEN_KEY: string = "draftbash_jwt_token";

    public static saveToken(token: string): void {
        try {
            localStorage.setItem(this.TOKEN_KEY, token);
        } catch (error) {
            console.error("Error saving token", error);
        }
    }

    public static getToken(): string | null {
        try {
            const token = localStorage.getItem(this.TOKEN_KEY);
            return token;
        } catch (error) {
            console.error("Error getting token", error);
            return null;
        }
    }

    public static removeToken(): void {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
        } catch (error) {
            console.error("Error deleting token", error);
        }
    }
}
