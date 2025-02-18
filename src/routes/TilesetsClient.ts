import { ServiceClient } from "./ServiceClient";

export class TilesetsClient {
    private client = new ServiceClient('tilesets');

    public async get() {
        return this.client.get();
    }
}