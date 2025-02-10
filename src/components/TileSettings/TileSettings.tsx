import styles from './TileSettings.module.scss';
import { useContext, useState, useEffect } from 'react';

// Contexts
import { SpriteContext } from '../../contexts/sprite';

// Types
import { type Tile as TTile } from '../../hooks/useTiles';

export default function TileSettings() {
    const { relevantTiles, selectedTileIndex } = useContext(SpriteContext);
    const [ data, setData ] = useState<TTile | null>(null);

    useEffect(() => {
        if (
            !relevantTiles ||
            selectedTileIndex.get === null
        ) return setData(null);

        const selectedTile = relevantTiles[selectedTileIndex.get];

        if (
            !selectedTile ||
            relevantTiles[selectedTile.position] === undefined
        ) return setData(null);

        setData(relevantTiles[selectedTileIndex.get]);
    }, [ relevantTiles, selectedTileIndex.get ]);

    function resetFields() {
        setData(relevantTiles[selectedTileIndex.get!]);
    }

    return (
        <div className={styles.container}>

            {data ?
                <>
                    <nav>
                        <button onClick={resetFields}>Reset</button>
                    </nav>

                    <div className={styles.form}>
                        <div>
                            <span>Name:</span>
                            <span>{data?.name}</span>
                        </div>
                        <div>
                            <span>Is Solid:</span>
                            <span>{data?.is_solid}</span>
                        </div>
                        <div>
                            <span>Slow Amount:</span>
                            <span>{data?.slow_amount}</span>
                        </div>
                    </div>
                </>
                :
                <div>
                    <button>Add Tile</button>
                </div>
            }
        </div>    
    );
}
