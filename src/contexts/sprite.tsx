/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useTilesets from '../hooks/useTilesets';
import useTiles from '../hooks/useTiles';

export interface ISpriteContext {
    tilesets: ReturnType<typeof useTilesets>
    tiles: ReturnType<typeof useTiles>
}

const SpriteContext = createContext<ISpriteContext>({} as ISpriteContext);

function SpriteContextProvider({ children }: any) {

    const tilesets = useTilesets();
    const tiles = useTiles();

    return (
        <SpriteContext.Provider value={{
            tilesets,
            tiles
        }}>
            {children}
        </SpriteContext.Provider>
    )
}

export { SpriteContextProvider, SpriteContext };