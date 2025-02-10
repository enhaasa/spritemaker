import { useState, useEffect } from "react";

// Clients
import { TilesClient } from "../routes/TilesClient";

export type Tile = {
    id: number,
    uuid: string,
    tileset_id: number,
    name: string,
    position: number,
    is_solid: boolean,
    slow_amount: number,
}

const client = new TilesClient();

export default function useTiles() {
    const [ data, setData ] = useState<Tile[] | null>(null);

    async function init() {
        setData(await client.get());
    }

    useEffect(() => {init()}, []);

    return { get: data }
}