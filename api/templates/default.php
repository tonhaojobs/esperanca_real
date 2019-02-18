<?php 
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');  
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);