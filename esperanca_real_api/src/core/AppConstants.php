<?php

	interface AppConstants {
		
		const ROOT_APPLICATION = 'localhost';
		const PATH_APPLICATION = 'esperanca_real';
		const APPLICATION_CONTEXT = 'api';
		const PATH_CONTROLLER = 'src/controller';
		
		const GET_METHOD = 'GET';
		const POST_METHOD = 'POST';
		const PUT_METHOD = 'PUT';
		const DELETE_METHOD = 'DELETE';
		
		const TIMEZONE = 'Brazil/East';
		
		/* token constants*/
		const JWT_TOKEN_HEADER_TYPE = 'JWT';
		const JWT_TOKEN_HEADER_ALGORITHM = 'HS512';
		
		const JWT_TOKEN_PAYLOAD_ISS_DEV = 'localhost';
		const JWT_TOKEN_TYPE = 'bearer';
		
		
		const RESPONSE_JSON = 'application/json';
		const RESPONSE_HTML = 'text/html';
		/*const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';
		const RESPONSE_JSON_TEXT = 'application/json';*/
		
		
		/* HTTP STATUSES CODES */
		/* 1×× Informational */

		const CODE_STATUS_CONTINUE = 100;
		const CODE_STATUS_SWITCHING_PROTOCOLS = 101;
		const CODE_STATUS_PROCESSING = 102;
		
		/* 2×× Success */
		const CODE_STATUS_OK = 200;
		const CODE_STATUS_CREATED = 201;
		const CODE_STATUS_ACCEPTED = 202;
		/*const CODE_STATUS_ = 203 Non-authoritative Information
		const CODE_STATUS_ = 204 No Content
		const CODE_STATUS_ = 205 Reset Content
		const CODE_STATUS_ = 206 Partial Content
		const CODE_STATUS_ = 207 Multi-Status
		const CODE_STATUS_ = 208 Already Reported
		const CODE_STATUS_ = 226 IM Used*/
		
		/* 3×× Redirection */
		/*const CODE_STATUS_ = 300 Multiple Choices
		const CODE_STATUS_ = 301 Moved Permanently
		const CODE_STATUS_ = 302 Found
		const CODE_STATUS_ = 303 See Other
		const CODE_STATUS_ = 304 Not Modified
		const CODE_STATUS_ = 305 Use Proxy
		const CODE_STATUS_ = 307 Temporary Redirect
		const CODE_STATUS_ = 308 Permanent Redirect*/
		
		/* 4×× Client Error */
		const CODE_STATUS_BAD_REQUEST = 400;
		const CODE_STATUS_UNAUTHORIZED = 401;
		const CODE_STATUS_PAYMENT_REQUIRED = 402;
		const CODE_STATUS_FORBIDEN = 403;
		const CODE_STATUS_NOT_FOUND = 404;
		/*const CODE_STATUS_ = 405 Method Not Allowed
		const CODE_STATUS_ = 406 Not Acceptable
		const CODE_STATUS_ = 407 Proxy Authentication Required
		const CODE_STATUS_ = 408 Request Timeout
		const CODE_STATUS_ = 409 Conflict
		const CODE_STATUS_ = 410 Gone
		const CODE_STATUS_ = 411 Length Required
		const CODE_STATUS_ = 412 Precondition Failed
		const CODE_STATUS_ = 413 Payload Too Large
		const CODE_STATUS_ = 414 Request-URI Too Long
		const CODE_STATUS_ = 415 Unsupported Media Type
		const CODE_STATUS_ = 416 Requested Range Not Satisfiable
		const CODE_STATUS_ = 417 Expectation Failed
		const CODE_STATUS_ = 418 I'm a teapot
		const CODE_STATUS_ = 421 Misdirected Request
		const CODE_STATUS_ = 422 Unprocessable Entity
		const CODE_STATUS_ = 423 Locked
		const CODE_STATUS_ = 424 Failed Dependency
		const CODE_STATUS_ = 426 Upgrade Required
		const CODE_STATUS_ = 428 Precondition Required
		const CODE_STATUS_ = 429 Too Many Requests
		const CODE_STATUS_ = 431 Request Header Fields Too Large
		const CODE_STATUS_ = 444 Connection Closed Without Response
		const CODE_STATUS_ = 451 Unavailable For Legal Reasons
		const CODE_STATUS_ = 499 Client Closed Request
		const CODE_STATUS_ = 5×× Server Error
		const CODE_STATUS_ = 500 Internal Server Error
		const CODE_STATUS_ = 501 Not Implemented
		const CODE_STATUS_ = 502 Bad Gateway
		const CODE_STATUS_ = 503 Service Unavailable
		const CODE_STATUS_ = 504 Gateway Timeout
		const CODE_STATUS_ = 505 HTTP Version Not Supported
		const CODE_STATUS_ = 506 Variant Also Negotiates
		const CODE_STATUS_ = 507 Insufficient Storage
		const CODE_STATUS_ = 508 Loop Detected
		const CODE_STATUS_ = 510 Not Extended
		const CODE_STATUS_ = 511 Network Authentication Required
		const CODE_STATUS_ = 599 Network Connect Timeout Error*/
	}