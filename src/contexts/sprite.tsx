/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useMemo } from 'react';

// Hooks
import useTilesets from '../hooks/useTilesets';
import useTiles from '../hooks/useTiles';

// Types
import { type Tile as TTile } from '../hooks/useTiles';

type RelevantTile = TTile | null;

export interface ISpriteContext {
    tilesets: ReturnType<typeof useTilesets>;
    tiles: ReturnType<typeof useTiles>;
    relevantTiles: RelevantTile[];
    selectedTilesetIndex: {
        get: number | null,
        set: React.Dispatch<React.SetStateAction<number | null>>
    };
    selectedTileIndex: {
        get: number | null,
        set: React.Dispatch<React.SetStateAction<number | null>>
    };
}

const SpriteContext = createContext<ISpriteContext>({} as ISpriteContext);

function SpriteContextProvider({ children }: any) {
    const [ selectedTilesetIndex, setSelectedTilesetIndex ] = useState<number | null>(null);
    const [ selectedTileIndex, setSelectedTileIndex ] = useState<number | null>(null)

    const tilesets = useTilesets();
    const tiles = useTiles();

    const relevantTiles = useMemo(() => {
        if (
            selectedTilesetIndex === null || 
            tilesets.get === null ||
            tiles.get === null
        ) return [];

        const tileset = tilesets.get[selectedTilesetIndex];

        const totalTiles: RelevantTile[] = [];
        const amount = (tileset?.height ?? 0) * (tileset?.width ?? 0);

        for (let i = 0; i < amount; i++) {
            const exisitingTileIndex = tiles.get.findIndex(t => t.position === i) ?? -1;

            if (exisitingTileIndex >= 0 && tiles.get[exisitingTileIndex].tileset_id === tileset.id) {
                totalTiles.push(tiles.get[exisitingTileIndex]);
            } else {
                totalTiles.push(null);
            }
        }


        return totalTiles;
    }, [ selectedTilesetIndex, tilesets.get, tiles.get ]);

    useEffect(() => {
        if (!tilesets.get || tilesets?.get.length === 0) return;

        setSelectedTileIndex(0);
    }, [tilesets.get]);

    return (
        <SpriteContext.Provider value={{
            tilesets,
            tiles,
            relevantTiles,
            selectedTilesetIndex: {
                get: selectedTilesetIndex,
                set: setSelectedTilesetIndex
            },
            selectedTileIndex: {
                get: selectedTileIndex,
                set: setSelectedTileIndex
            }
        }}>
            {children}
        </SpriteContext.Provider>
    )
}

export { SpriteContextProvider, SpriteContext };