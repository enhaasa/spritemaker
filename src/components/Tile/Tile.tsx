import styles from './Tile.module.scss';

import { type Tile as TTile } from '../../hooks/useTiles';
import { type Tileset } from '../../hooks/useTilesets';

interface ITile {
    tile: TTile | null;
    tileset: Tileset;
}

export default function Tile({ tile, tileset }: ITile) {

    return (
        <div 
            className={styles.container}
            style={{
                height: tileset.tile_height_px, 
                width: tileset.tile_width_px,
            }}
        >
            {tile && tile.name}
        </div>    
    );
}
