import { Encrypter } from "@/domain/projectname/application/cryptography/encrypter";
import { JwtService } from "@nestjs/jwt";
export declare class JwtEncrypter implements Encrypter {
    private jwtService;
    constructor(jwtService: JwtService);
    encrypt(payload: Record<string, unknown>): Promise<string>;
}
