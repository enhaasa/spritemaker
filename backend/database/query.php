<?php

function query($query)
{
    $results = null;

    try {
        $db = new PDO('sqlite:' . __DIR__ . '/database.db');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $results = $db->query($query)->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }

    return $results;
}
