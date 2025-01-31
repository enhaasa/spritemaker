import styles from './Spritesheet.module.scss';
import { useContext, useState } from 'react';

// Components
import Tileset from '../Tileset/Tileset';

// Contexts
import { SpriteContext } from '../../contexts/sprite';

export default function Spritesheet() {

    const { tilesets } = useContext(SpriteContext);

    const [ selectedTilesetIndex, setSelectedTilesetIndex ] = useState(0);

    function handleSelectTileset(index: number) {
        setSelectedTilesetIndex(index);
    }

    return (
        <div className={styles.container}>
            <nav>
                {tilesets.get?.map((tileset, index: number) => (
                    <button 
                        key={`TilesetButton-${index}`}
                        onClick={() => handleSelectTileset(index)}
                        disabled={index==selectedTilesetIndex}
                    >
                        {tileset.name}
                    </button>
                ))}
            </nav>
            <div className={styles.tilesetWrapper}>
                <Tileset tileset={tilesets.get?.[selectedTilesetIndex]} />
            </div>
        </div>    
    );
}


