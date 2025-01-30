import { ServiceClient } from "./ServiceClient";

export class TilesetsClient {
    private client = new ServiceClient('tilesets');

    public async get() {
        console.log(await this.client.get());

        return this.client.get();
    }
}