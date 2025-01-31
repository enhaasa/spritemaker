-- Create tilesets table
CREATE TABLE IF NOT EXISTS tilesets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    height INT,
    width INT,
    tile_height_px INT,
    tile_width_px INT
);

-- Create tiles table
CREATE TABLE IF NOT EXISTS tiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT,
    tileset_id INTEGER,
    name TEXT,
    position INT,
    is_solid BOOL,
    slow_amount INT,
    FOREIGN KEY (tileset_id) REFERENCES tilesets(id) ON DELETE CASCADE
);

-- Populating some sample tilesets
INSERT INTO tilesets (name, height, width, tile_height_px, tile_width_px)
VALUES ('Sample Set 1', 8, 8, 32, 32);
    
INSERT INTO tilesets (name, height, width, tile_height_px, tile_width_px)
VALUES ('Sample Set 2', 10, 10, 64, 32);

WITH ts1 AS (SELECT id FROM tilesets WHERE name = 'Sample Set 1' LIMIT 1),
     ts2 AS (SELECT id FROM tilesets WHERE name = 'Sample Set 2' LIMIT 1)

INSERT INTO tiles (uuid, tileset_id, name, position, is_solid, slow_amount)
VALUES
    ('test-uuid-water', (SELECT id FROM ts1), 'Water', 24, false, 3),
    ('test-uuid-grass', (SELECT id FROM ts1), 'Grass', 44, false, 0),
    ('test-uuid-rock', (SELECT id FROM ts2), 'Rock', 64, true, 0);
