<?php
//Autoload
$loader = require 'vendor/autoload.php';

//Instanciando objeto
$app = new \Slim\Slim(array(
    'templates.path' => 'templates'
));

// Testamentos
$app->get('/testamentos/', function() use ($app){
	(new \controllers\Biblia($app))->findAllTestamentos();
});

$app->get('/livro/:id', function($id) use ($app){
	(new \controllers\Biblia($app))->findLivroById($id);
});

$app->get('/livros/:id', function($id) use ($app){
	(new \controllers\Biblia($app))->findLivrosByTestamento($id);
});

$app->get('/capitulo/:livro/:capitulo/:versao', function($livro, $capitulo, $versao) use ($app){
	(new \controllers\Biblia($app))->findCapitulo($livro, $capitulo, $versao);
});

$app->get('/versoes/', function() use ($app){
	(new \controllers\Biblia($app))->findAllVersoes();
});


/*
//Listando todas
$app->get('/pessoas/', function() use ($app){
	(new \controllers\Pessoa($app))->lista();
});

//get pessoa
$app->get('/pessoas/:id', function($id) use ($app){
	(new \controllers\Pessoa($app))->get($id);
});

//nova pessoa
$app->post('/pessoas/', function() use ($app){
	(new \controllers\Pessoa($app))->nova();
});

//edita pessoa
$app->put('/pessoas/:id', function($id) use ($app){
	(new \controllers\Pessoa($app))->editar($id);
});

//apaga pessoa
$app->delete('/pessoas/:id', function($id) use ($app){
	(new \controllers\Pessoa($app))->excluir($id);
});*/

//Rodando aplicação
$app->run();
