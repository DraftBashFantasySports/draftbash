interface DecodedToken {
    [key: string]: any;
}

export function decodeJwt(token: string | null): DecodedToken | null {
    try {
        if (token === null) {
            return null;
        }
        const base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        // Add padding if needed
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }

        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch (error) {
        console.error(error);
        return null;
    }
}
