<?php
require_once __DIR__ . '/../cors.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        get();
        break;
    case 'POST':
        post();
        break;
    case 'PUT':
        put();
        break;
    case 'DELETE':
        delete();
        break;
}

function get()
{
    echo json_encode('successful get request');
}

function post()
{
    echo json_encode('successful post request');
}

function put()
{
    echo json_encode('successful put request');
}

function delete()
{
    echo json_encode('successful delete request');
}
