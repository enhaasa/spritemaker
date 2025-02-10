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
VALUES ('Sample Set 2', 10, 10, 64, 64);

-- Insert predefined sample tiles
INSERT INTO tiles (uuid, tileset_id, name, position, is_solid, slow_amount)
VALUES
    ('test-uuid-water', (SELECT id FROM tilesets WHERE name = 'Sample Set 1' LIMIT 1), 'Water', 24, false, 3),
    ('test-uuid-grass', (SELECT id FROM tilesets WHERE name = 'Sample Set 1' LIMIT 1), 'Grass', 44, false, 0),
    ('test-uuid-rock', (SELECT id FROM tilesets WHERE name = 'Sample Set 2' LIMIT 1), 'Rock', 64, true, 0);

-- Fill remaining tiles with NULL values using RECURSIVE method for Sample Set 1
WITH RECURSIVE numbers(n) AS (
    SELECT 0
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < (SELECT height * width - 1 FROM tilesets WHERE name = 'Sample Set 1')
)
INSERT INTO tiles (uuid, tileset_id, name, position, is_solid, slow_amount)
SELECT 
    NULL, (SELECT id FROM tilesets WHERE name = 'Sample Set 1' LIMIT 1), NULL, n, NULL, NULL
FROM numbers
WHERE n NOT IN (24, 44);

-- Fill remaining tiles with NULL values using RECURSIVE method for Sample Set 2
WITH RECURSIVE numbers(n) AS (
    SELECT 0
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < (SELECT height * width - 1 FROM tilesets WHERE name = 'Sample Set 2')
)
INSERT INTO tiles (uuid, tileset_id, name, position, is_solid, slow_amount)
SELECT 
    NULL, (SELECT id FROM tilesets WHERE name = 'Sample Set 2' LIMIT 1), NULL, n, NULL, NULL
FROM numbers
WHERE n NOT IN (64);
