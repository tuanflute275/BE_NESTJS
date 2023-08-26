import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        console.log('Exceptions ', exception);
        super.catch(exception, host);
    }
}