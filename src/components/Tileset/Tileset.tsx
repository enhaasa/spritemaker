import styles from './Tileset.module.scss';
import { useContext, useMemo, useState, useEffect } from 'react';

// Components
import Tile from '../Tile/Tile';

// Contexts
import { SpriteContext } from '../../contexts/sprite';

// Types
import { type Tileset as TTileset } from '../../hooks/useTilesets';
import { type Tile as TTile } from '../../hooks/useTiles';

type DisplayedTile = TTile | null;

interface ITileset {
    tileset?: TTileset;
}

export default function Tileset({ tileset }: ITileset) {
    const { tiles } = useContext(SpriteContext);
    const [ tilesToRender, setTilesToRender ] = useState<DisplayedTile[]>([]);

    const relevantTiles = useMemo(() => (
        tiles.get?.filter(tile => (tile.tileset_id === tileset?.id)) ?? []
    ), [tileset, tiles.get]);

    useEffect(() => {

        const totalTiles: DisplayedTile[] = [];

        const amount = (tileset?.height ?? 0) * (tileset?.width ?? 0);

        for (let i = 0; i < amount; i++) {
            const exisitingTileIndex = relevantTiles.findIndex(t => t.position === i) ?? -1;

            if (exisitingTileIndex >= 0) {
                totalTiles.push(relevantTiles[exisitingTileIndex]);
            } else {
                totalTiles.push(null);
            }
        }

        setTilesToRender(totalTiles);

    }, [ tileset, relevantTiles ]);
    
    return (
        <div 
            className={styles.container}
            style={{
                gridTemplateColumns: `repeat(${tileset?.width}, 1fr)` 
            }}
        >
            {tilesToRender.map((tile, index: number) => (
                <Tile 
                    key={`Tile-${index}`} 
                    tile={tile} 
                    tileset={tileset!}
                />
            ))}
        </div>    
    );
}
