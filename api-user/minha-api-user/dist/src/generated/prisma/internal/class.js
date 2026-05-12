"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.7.0",
    "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// --- MÓDULO DE USUÁRIOS ---\nmodel User {\n  id           String    @id @default(uuid())\n  email        String    @unique\n  password     String\n  name         String?\n  role         Role      @default(USER)\n  departamento String?\n  sessions     Session[]\n  createdAt    DateTime  @default(now())\n  updatedAt    DateTime  @updatedAt\n}\n\n// --- MÓDULO DE SESSÕES ---\nmodel Session {\n  id           Int      @id @default(autoincrement())\n  userId       String   @unique\n  user         User     @relation(fields: [userId], references: [id])\n  refreshToken String\n  userAgent    String?\n  ip           String?\n  createdAt    DateTime @default(now())\n  expiresAt    DateTime\n  revoked      Boolean  @default(false)\n}\n\n// --- ENUMS PARA PADRONIZAÇÃO ---\n\nenum Role {\n  USER\n  ADMIN\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"departamento\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"revoked\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"sessions\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Session.findUnique\",\"Session.findUniqueOrThrow\",\"Session.findFirst\",\"Session.findFirstOrThrow\",\"Session.findMany\",\"Session.createOne\",\"Session.createMany\",\"Session.createManyAndReturn\",\"Session.updateOne\",\"Session.updateMany\",\"Session.updateManyAndReturn\",\"Session.upsertOne\",\"Session.deleteOne\",\"Session.deleteMany\",\"_avg\",\"_sum\",\"Session.groupBy\",\"Session.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"refreshToken\",\"userAgent\",\"ip\",\"createdAt\",\"expiresAt\",\"revoked\",\"equals\",\"not\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"name\",\"Role\",\"role\",\"departamento\",\"updatedAt\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "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-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAELBQAAPAAgGAAAPwAgGQAAPwAgOUAAAAABOkAAPgAhO0AAAAAEPEAAAAAEPUAAAAABPkAAAAABP0AAAAABQEAAAAABBQUAADwAIBgAAD0AIBkAAD0AIDkgAAAAATogADsAIQUFAAA8ACAYAAA9ACAZAAA9ACA5IAAAAAE6IAA7ACEIOQIAAAABOgIAPAAhOwIAAAAEPAIAAAAEPQIAAAABPgIAAAABPwIAAAABQAIAAAABAjkgAAAAATogAD0AIQsFAAA8ACAYAAA_ACAZAAA_ACA5QAAAAAE6QAA-ACE7QAAAAAQ8QAAAAAQ9QAAAAAE-QAAAAAE_QAAAAAFAQAAAAAEIOUAAAAABOkAAPwAhO0AAAAAEPEAAAAAEPUAAAAABPkAAAAABP0AAAAABQEAAAAABDgUAAEEAIBgAAEIAIBkAAEIAIDkBAAAAAToBAEAAITsBAAAABTwBAAAABT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAQg5AgAAAAE6AgBBACE7AgAAAAU8AgAAAAU9AgAAAAE-AgAAAAE_AgAAAAFAAgAAAAELOQEAAAABOgEAQgAhOwEAAAAFPAEAAAAFPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAAAABDgUAADwAIBgAAEQAIBkAAEQAIDkBAAAAAToBAEMAITsBAAAABDwBAAAABD0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAQs5AQAAAAE6AQBEACE7AQAAAAQ8AQAAAAQ9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAENBQAAPAAgGAAAPAAgGQAAPAAgKgAARgAgKwAAPAAgOQIAAAABOgIARQAhOwIAAAAEPAIAAAAEPQIAAAABPgIAAAABPwIAAAABQAIAAAABCDkIAAAAAToIAEYAITsIAAAABDwIAAAABD0IAAAAAT4IAAAAAT8IAAAAAUAIAAAAAQsuAABHADAvAAAcABAwAABHADAxAQA3ACE2QAA5ACFEAQA3ACFFAQA3ACFGAQA4ACFIAABISCJJAQA4ACFKQAA5ACEHBQAAPAAgGAAASgAgGQAASgAgOQAAAEgCOgAASUgiOwAAAEgIPAAAAEgIBwUAADwAIBgAAEoAIBkAAEoAIDkAAABIAjoAAElIIjsAAABICDwAAABICAQ5AAAASAI6AABKSCI7AAAASAg8AAAASAgMBAAAUAAgLgAASwAwLwAACQAQMAAASwAwMQEATAAhNkAATwAhRAEATAAhRQEATAAhRgEATQAhSAAATkgiSQEATQAhSkAATwAhCzkBAAAAAToBAEQAITsBAAAABDwBAAAABD0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAQs5AQAAAAE6AQBCACE7AQAAAAU8AQAAAAU9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAEEOQAAAEgCOgAASkgiOwAAAEgIPAAAAEgICDlAAAAAATpAAD8AITtAAAAABDxAAAAABD1AAAAAAT5AAAAAAT9AAAAAAUBAAAAAAQNLAAADACBMAAADACBNAAADACAMAwAAUwAgLgAAUQAwLwAAAwAQMAAAUQAwMQIAVAAhMgEATAAhMwEATAAhNAEATQAhNQEATQAhNkAATwAhN0AATwAhOCAAUgAhAjkgAAAAATogAD0AIQ4EAABQACAuAABLADAvAAAJABAwAABLADAxAQBMACE2QABPACFEAQBMACFFAQBMACFGAQBNACFIAABOSCJJAQBNACFKQABPACFOAAAJACBPAAAJACAIOQIAAAABOgIAPAAhOwIAAAAEPAIAAAAEPQIAAAABPgIAAAABPwIAAAABQAIAAAABAAAAAAAAAVMBAAAAAQFTAQAAAAEBU0AAAAABAVMgAAAAAQVTAgAAAAFZAgAAAAFaAgAAAAFbAgAAAAFcAgAAAAEFEgAAdwAgEwAAegAgUAAAeAAgUQAAeQAgVgAAAQAgAxIAAHcAIFAAAHgAIFYAAAEAIAAAAAFTAAAASAILEgAAZwAwEwAAbAAwUAAAaAAwUQAAaQAwUgAAagAgUwAAawAwVAAAawAwVQAAawAwVgAAawAwVwAAbQAwWAAAbgAwBzECAAAAATMBAAAAATQBAAAAATUBAAAAATZAAAAAATdAAAAAATggAAAAAQIAAAAFACASAAByACADAAAABQAgEgAAcgAgEwAAcQAgAQsAAHYAMAwDAABTACAuAABRADAvAAADABAwAABRADAxAgAAAAEyAQAAAAEzAQBMACE0AQBNACE1AQBNACE2QABPACE3QABPACE4IABSACECAAAABQAgCwAAcQAgAgAAAG8AIAsAAHAAIAsuAABuADAvAABvABAwAABuADAxAgBUACEyAQBMACEzAQBMACE0AQBNACE1AQBNACE2QABPACE3QABPACE4IABSACELLgAAbgAwLwAAbwAQMAAAbgAwMQIAVAAhMgEATAAhMwEATAAhNAEATQAhNQEATQAhNkAATwAhN0AATwAhOCAAUgAhBzECAF8AITMBAFsAITQBAFwAITUBAFwAITZAAF0AITdAAF0AITggAF4AIQcxAgBfACEzAQBbACE0AQBcACE1AQBcACE2QABdACE3QABdACE4IABeACEHMQIAAAABMwEAAAABNAEAAAABNQEAAAABNkAAAAABN0AAAAABOCAAAAABBBIAAGcAMFAAAGgAMFIAAGoAIFYAAGsAMAADBAAAdAAgRgAAVQAgSQAAVQAgBzECAAAAATMBAAAAATQBAAAAATUBAAAAATZAAAAAATdAAAAAATggAAAAAQgxAQAAAAE2QAAAAAFEAQAAAAFFAQAAAAFGAQAAAAFIAAAASAJJAQAAAAFKQAAAAAECAAAAAQAgEgAAdwAgAwAAAAkAIBIAAHcAIBMAAHsAIAoAAAAJACALAAB7ACAxAQBbACE2QABdACFEAQBbACFFAQBbACFGAQBcACFIAABlSCJJAQBcACFKQABdACEIMQEAWwAhNkAAXQAhRAEAWwAhRQEAWwAhRgEAXAAhSAAAZUgiSQEAXAAhSkAAXQAhAgQGAgUAAwEDAAEBBAcAAAAAAwUACBgACRkACgAAAAMFAAgYAAkZAAoBAwABAQMAAQUFAA8YABIZABMqABArABEAAAAAAAUFAA8YABIZABMqABArABEGAgEHCAEICwEJDAEKDQEMDwENEQQOEgUPFAEQFgQRFwYUGAEVGQEWGgQaHQcbHgscHwIdIAIeIQIfIgIgIwIhJQIiJwQjKAwkKgIlLAQmLQ0nLgIoLwIpMAQsMw4tNBQ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map