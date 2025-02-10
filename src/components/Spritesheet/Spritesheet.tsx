import styles from './Spritesheet.module.scss';
import { useContext } from 'react';

// Components
import Tileset from '../Tileset/Tileset';

// Contexts
import { SpriteContext } from '../../contexts/sprite';

export default function Spritesheet() {

    const { tilesets, selectedTilesetIndex, selectedTileIndex } = useContext(SpriteContext);

    function handleSelectTileset(index: number) {
        selectedTilesetIndex.set(index);
        selectedTileIndex.set(null);
    }

    return (
        <div className={styles.container}>
            <nav>
                {tilesets.get?.map((tileset, index: number) => (
                    <button 
                        key={`TilesetButton-${index}`}
                        onClick={() => handleSelectTileset(index)}
                        disabled={index==selectedTilesetIndex.get}
                    >
                        {tileset.name}
                    </button>
                ))}
            </nav>
            <div className={styles.tilesetWrapper}>
                <Tileset tileset={tilesets.get?.[selectedTilesetIndex.get!]} />
            </div>
        </div>    
    );
}


