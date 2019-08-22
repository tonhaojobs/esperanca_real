<?php
// Routes
require_once 'core/BibliaService.php';

use Firebase\JWT\JWT;
use Tuupola\Base62;
use Slim\App;

return function (App $app) {
	
	$container = $app->getContainer();

	$app->post("/login", function($request, $response, $args){
		
		$data_ = $request->getParsedBody();
				
		$biblia = new \Service\BibliaService();
		
		$usuario = $data_['login']; 
		$senha = $data_['password'];
		$retorno = $biblia->login($usuario, $senha);
						
		if(!empty($retorno)) {
			
			$now = new DateTime();
			$future = new DateTime("+20 minutes");
			$server = $request->getServerParams();
			$jti = (new Base62)->encode(random_bytes(16));
			
			$payload = [
				"iat" => $now->getTimeStamp(),
				"exp" => $future->getTimeStamp(),
				"jti" => $jti,
				"sub" => $usuario
			];
		
			$secret = "@33sp33r44nc44_R3344L";
			$token = JWT::encode($payload, $secret, "HS256");
			
			$data["user"] = $retorno;
			$data["token"] = $token;
			$data["expires"] = $future->getTimeStamp();
			
			return $response->withStatus(201)
				->withHeader("Content-Type", "application/json")
				->withHeader('Access-Control-Allow-Origin', '*')
				->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
				->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
				->write(json_encode($data));
				
		} else {
			
			$data = ["status" => 403, "msg" => "Usuário e/ou Senha incorreto(s)"];
			
			return $response->withStatus(403)
				->withHeader("Content-Type", "application/json")
				->withHeader('Access-Control-Allow-Origin', '*')
				->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
				->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
				->write(json_encode($data));
		}
	});

	$app->get("/testamentos",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$data = $biblia->findAllTestamentos();

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/testamento/{id}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$id = $args['id'];
		$data = $biblia->findTestamentoById($id);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/livro/{id}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$id = $args['id'];
		$data = $biblia->findLivroById($id);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/livros/{id}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$id = $args['id'];
		$data = $biblia->findLivrosByTestamento($id);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/capitulo/{livro}/{capitulo}/{versao}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		
		$livro = $args['livro'];
		$capitulo = $args['capitulo'];
		$versao = $args['versao'];
		
		$data = $biblia->findCapitulo($livro, $capitulo, $versao);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/versao/{id}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$id = $args['id'];
		$data = $biblia->findVersaoById($id);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/versoes",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$data = $biblia->findAllVersoes();

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/historico/{usuario}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$usuario = $args['usuario'];
		$data = $biblia->getHistorico($usuario);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/historicoLivro/{usuario}/{livro}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$usuario = $args['usuario'];
		$livro = $args['livro'];
		$data = $biblia->getHistoricoByLivro($usuario, $livro);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->get("/historicoLivroCapitulo/{usuario}/{livro}/{capitulo}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		$usuario = $args['usuario'];
		$livro = $args['livro'];
		$capitulo = $args['capitulo'];
		$data = $biblia->getHistoricoByLivroCapitulo($usuario, $livro, $capitulo);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	
	$app->get("/search/{palavraChave}/{versao}",  function ($request, $response, $args) {

		$biblia = new \Service\BibliaService();
		
		$palavraChave = $args['palavraChave'];
		$versao = $args['versao'];
		
		$data = $biblia->search($palavraChave, $versao);

		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->post("/marcarCapitulo",  function ($request, $response, $args) {

		$data_ = $request->getParsedBody();
	
		$biblia = new \Service\BibliaService();
		
		$capitulo = $data_['capitulo']; 
		$livro = $data_['livro']; 
		$usuario = $data_['usuario'];
		$versao = $data_['versao'];
		
		$data = $biblia->createHistorico($usuario, $livro, $capitulo, $versao);
		
		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
			->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));	
	});
	
	$app->post("/cadastro",  function ($request, $response, $args) {

		$data_ = $request->getParsedBody();
	
		$biblia = new \Service\BibliaService();
		
		$primeiroNome = $data_['primeiroNome']; 
		$ultimoNome = $data_['ultimoNome']; 
		$email = $data_['email']; 
		$senha = $data_['senha'];
		
		$data = $biblia->cadastro($primeiroNome, $ultimoNome, $email, $senha);
		
		return $response->withStatus(200)
			->withHeader("Content-Type", "application/json")
			->withHeader('Access-Control-Allow-Origin', '*')
			->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	});
	
	$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
		$handler = $this->notFoundHandler; // handle using the default Slim page not found handler
		return $handler($req, $res);
	});
};
