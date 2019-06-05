<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);
// Adding dependencies
use Slim\App;
use Tuupola\Middleware\HttpBasicAuthentication;

return function (App $app) {
	
	$container = $app->getContainer();
	$container['logger'] = function($c) {
		$logger = new \Monolog\Logger('my_logger');
		$file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
		$logger->pushHandler($file_handler);
		return $logger;
	};

	$container["jwt"] = function ($container) {
		return new StdClass;
	};

	$app->add(new \Slim\Middleware\JwtAuthentication([
		"path" => "/",
		"logger" => $container['logger'],
		"secret" => "@33sp33r44nc44_R3344L",
		"rules" => [
			new \Slim\Middleware\JwtAuthentication\RequestPathRule([
				"path" => "/",
				"passthrough" => ["/not-secure/*"]
			]),
			new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
				"passthrough" => ["OPTIONS"]
			]),
		],
		"callback" => function ($request, $response, $arguments) use ($container) {
			$container["jwt"] = $arguments["decoded"];
		},
		"error" => function ($request, $response, $arguments) {
			$data["status"] = "error";
			$data["message"] = $arguments["message"];
			return $response
				->withHeader("Content-Type", "application/json")
				->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
		}
	]));

	$app->add(new \Slim\Middleware\HttpBasicAuthentication([
		"path" => "/api/token",
		"users" => [
			"user" => "password"
		]
	]));

	$app->add(new \Tuupola\Middleware\CorsMiddleware([
		"origin" => ["*"],
		"methods" => ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],    
		"headers.allow" => ["Origin", "Content-Type", "Authorization", "Accept", "ignoreLoadingBar", "X-Requested-With", "Access-Control-Allow-Origin"],
		"headers.expose" => [],
		"credentials" => true,
		"cache" => 0,
		"error" => function ($request, $response, $arguments) {
			return new UnauthorizedResponse($arguments["message"], 401);
		}
	]));
};