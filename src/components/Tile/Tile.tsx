/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Tile.module.scss';

import { type Tile as TTile } from '../../hooks/useTiles';
import { type Tileset } from '../../hooks/useTilesets';

interface ITile {
    tile: TTile | null;
    tileset: Tileset;
    onClick: () => any;
    isActive: boolean;
}

export default function Tile({ tile, tileset, onClick, isActive }: ITile) {

    function handleClick() {
        onClick();
    }

    return (
        <button 
            className={`${styles.container} ${isActive ? styles.active : ''}`}
            onClick={handleClick}
            style={{
                height: tileset.tile_height_px, 
                width: tileset.tile_width_px,
            }}
        >
            {tile && tile.name}
        </button>    
    );
}
