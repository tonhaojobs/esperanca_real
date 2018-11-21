<?php

	//header('Content-Type: text/html; charset=utf-8');

	define('DS', DIRECTORY_SEPARATOR);
	define('SRC', "src");
	define('ROOT', dirname(__FILE__));
	
	define('METHOD', $_SERVER['REQUEST_METHOD']);
	define('URI', $_SERVER['REQUEST_URI']);
	define('HEADER', getallheaders());
	define('BODY', json_decode(file_get_contents("php://input")));
	
	require_once 'src/core/AutoLoad.php';
	/*
	* Define o array com os diretorios que deverão ser scanneados para a inclusão.
	*/
	$paths = array(
		SRC . DS . "controller",
		SRC . DS . "core",
		SRC . DS . "core". DS . "annotation",
		SRC . DS . "core". DS . "exception",
		SRC . DS . "core". DS . "http",
		SRC . DS . "core". DS . "security",
		SRC . DS . "entity",
		SRC . DS . "repository",
		SRC . DS . "service",
		SRC . DS . "utils",
		SRC . DS . "utils". DS . "annotations",
		SRC . DS . "utils". DS . "annotations". DS . "annotations"
	);
	
	$autoLoad = new AutoLoad($paths);
	$autoLoad->setPath(ROOT);
	$autoLoad->setExt('php');

	spl_autoload_register(array($autoLoad, 'loadFiles'));
	
	$controller = new HttpClient(METHOD, URI, HEADER, BODY);

?>