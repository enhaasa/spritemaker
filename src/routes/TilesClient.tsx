import { ServiceClient } from "./ServiceClient";

export class TilesClient {
    private client = new ServiceClient('tiles');

    public async get() {
        return this.client.get();
    }
}