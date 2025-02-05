import { HashComparer } from "@/domain/projectname/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/projectname/application/cryptography/hash-generator";
export declare class BcryptHasher implements HashGenerator, HashComparer {
    private HASH_SALT_LENGTH;
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
