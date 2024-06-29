"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenUseCase = void 0;
class VerifyTokenUseCase {
    constructor(credentialRepository, jwtAuthRepository) {
        this.credentialRepository = credentialRepository;
        this.jwtAuthRepository = jwtAuthRepository;
    }
    execute(token) { }
}
exports.VerifyTokenUseCase = VerifyTokenUseCase;
