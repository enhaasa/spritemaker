import { useState, useEffect } from "react";

// Clients
import { TilesetsClient } from "../routes/TilesetsClient";

// Types
import { type Tile } from "./useTiles";

export type Tileset = {
    id: number,
    name: string,
    height: number,
    width: number,
    tile_height_px: number,
    tile_width_px: number,
    tiles: Tile[]
}

const client = new TilesetsClient();

export default function useTilesets() {
    const [ data, setData ] = useState<Tileset[] | null>(null);

    async function init() {
        setData(await client.get());
    }

    useEffect(() => {init()}, []);

    return {
        get: data
    }
}