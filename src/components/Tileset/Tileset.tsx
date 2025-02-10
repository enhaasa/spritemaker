import styles from './Tileset.module.scss';
import { useContext } from 'react';

// Components
import Tile from '../Tile/Tile';

// Contexts
import { SpriteContext } from '../../contexts/sprite';

// Types
import { type Tileset as TTileset } from '../../hooks/useTilesets';

interface ITileset {
    tileset?: TTileset;
}

export default function Tileset({ tileset }: ITileset) {
    const { relevantTiles, selectedTileIndex } = useContext(SpriteContext);

    function handleTileClick(index: number) {
        selectedTileIndex.set(index);
    }
    
    return (
        <div 
            className={styles.container}
            style={{
                gridTemplateColumns: `repeat(${tileset?.width}, 1fr)` 
            }}
        >
            {relevantTiles.map((tile, index: number) => (
                <Tile 
                    key={`Tile-${index}`} 
                    tile={tile} 
                    tileset={tileset!}
                    onClick={() => {handleTileClick(index)}}
                    isActive={selectedTileIndex.get === index}
                />
            ))}
        </div>    
    );
}
