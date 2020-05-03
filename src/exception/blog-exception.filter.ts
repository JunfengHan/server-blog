import {ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';
import {ErrorCode} from "./error-code";

export class BLOGException extends HttpException {
	constructor(errCode: number, message?: string, param?: [string]) {
		super({code: errCode, message: message || ErrorCode[errCode] || "interal error"}, 200);
	}
}

@Catch()
export class CatchTDException implements ExceptionFilter{
	private readonly logger = new Logger(CatchTDException.name);
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const message = request.body;
		let status;
		let error;
		
		if (exception instanceof HttpException) {
			status = exception.getStatus();
			error = exception.getResponse();
			this.logger.error(`Path: ${request.url}; Http Exception: ${JSON.stringify(error)}; Stack: ${exception.stack}`);
		}
		else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			error = "Internal Server Error";
			this.logger.error(`Path: ${request.url};Stack: ${exception.stack}`);
		}
		
		response
			.status(status)
			.json({
				error,
				rid: message.mid,
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
			});
	}
	
}
