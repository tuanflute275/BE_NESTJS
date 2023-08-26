import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}