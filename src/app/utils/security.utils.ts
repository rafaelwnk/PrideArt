export class Security {
    public static setToken(data: string) {
        localStorage.setItem('pridearttoken', data);
    }

    public static getToken(): string | null {
        const data = localStorage.getItem('pridearttoken');
        if (data)
            return data;
        return null;
    }

    public static hasToken(): boolean {
        if(this.getToken())
            return true;
        return false;
    }

    public static clear() {
        localStorage.removeItem('pridearttoken');
    }
}