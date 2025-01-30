export class ServiceClient {
    private readonly baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/routes'
    : `${window.location.origin}/apps/spritemaker/backend/routes`;

    private api: string;

    constructor(endpoint: string) {
        this.api = `${this.baseUrl}/${[endpoint]}.php`;
    }

    public async get() {
        const response = await fetch(this.api);

        return response.json();
    }

    public async post(body: Record<string, unknown>) {
        const response = await fetch(this.api, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.text();

        return data;
    }
}