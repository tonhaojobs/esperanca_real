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


	$app->add(new \Tuupola\Middleware\Cors([
		"logger" => $container["logger"],
		"origin" => ["*"],
		"methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
		"headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since"],
		"headers.expose" => ["Authorization", "Etag"],
		"credentials" => true,
		"cache" => 60,
		"error" => function ($request, $response, $arguments) {
			return new UnauthorizedResponse($arguments["message"], 401);
		}
	]));
};