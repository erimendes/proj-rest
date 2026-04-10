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
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Role {\n  USER\n  ADMIN\n  MANAGER\n}\n\nmodel User {\n  id        Int       @id @default(autoincrement())\n  email     String    @unique\n  password  String\n  name      String?\n  role      Role      @default(USER)\n  createdAt DateTime  @default(now())\n  sessions  Session[]\n}\n\nmodel Session {\n  id           Int      @id @default(autoincrement())\n  userId       Int\n  user         User     @relation(fields: [userId], references: [id])\n  refreshToken String\n  userAgent    String?\n  ip           String?\n  createdAt    DateTime @default(now())\n  expiresAt    DateTime\n  revoked      Boolean  @default(false)\n}\n",
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
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"}],\"dbName\":null},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"revoked\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"sessions\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Session.findUnique\",\"Session.findUniqueOrThrow\",\"Session.findFirst\",\"Session.findFirstOrThrow\",\"Session.findMany\",\"Session.createOne\",\"Session.createMany\",\"Session.createManyAndReturn\",\"Session.updateOne\",\"Session.updateMany\",\"Session.updateManyAndReturn\",\"Session.upsertOne\",\"Session.deleteOne\",\"Session.deleteMany\",\"Session.groupBy\",\"Session.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"refreshToken\",\"userAgent\",\"ip\",\"createdAt\",\"expiresAt\",\"revoked\",\"equals\",\"not\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"name\",\"Role\",\"role\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "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-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAELBQAAPAAgGgAAPwAgGwAAPwAgOUAAAAABOkAAPgAhO0AAAAAEPEAAAAAEPUAAAAABPkAAAAABP0AAAAABQEAAAAABBQUAADwAIBoAAD0AIBsAAD0AIDkgAAAAATogADsAIQUFAAA8ACAaAAA9ACAbAAA9ACA5IAAAAAE6IAA7ACEIOQIAAAABOgIAPAAhOwIAAAAEPAIAAAAEPQIAAAABPgIAAAABPwIAAAABQAIAAAABAjkgAAAAATogAD0AIQsFAAA8ACAaAAA_ACAbAAA_ACA5QAAAAAE6QAA-ACE7QAAAAAQ8QAAAAAQ9QAAAAAE-QAAAAAE_QAAAAAFAQAAAAAEIOUAAAAABOkAAPwAhO0AAAAAEPEAAAAAEPUAAAAABPkAAAAABP0AAAAABQEAAAAABDgUAAEEAIBoAAEIAIBsAAEIAIDkBAAAAAToBAEAAITsBAAAABTwBAAAABT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAQg5AgAAAAE6AgBBACE7AgAAAAU8AgAAAAU9AgAAAAE-AgAAAAE_AgAAAAFAAgAAAAELOQEAAAABOgEAQgAhOwEAAAAFPAEAAAAFPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAAAABDgUAADwAIBoAAEQAIBsAAEQAIDkBAAAAAToBAEMAITsBAAAABDwBAAAABD0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAQs5AQAAAAE6AQBEACE7AQAAAAQ8AQAAAAQ9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAENBQAAPAAgGAAARgAgGQAAPAAgGgAAPAAgGwAAPAAgOQIAAAABOgIARQAhOwIAAAAEPAIAAAAEPQIAAAABPgIAAAABPwIAAAABQAIAAAABCDkIAAAAAToIAEYAITsIAAAABDwIAAAABD0IAAAAAT4IAAAAAT8IAAAAAUAIAAAAAQkuAABHADAvAAAcABAwAABHADAxAgA2ACE2QAA5ACFEAQA3ACFFAQA3ACFGAQA4ACFIAABISCIHBQAAPAAgGgAASgAgGwAASgAgOQAAAEgCOgAASUgiOwAAAEgIPAAAAEgIBwUAADwAIBoAAEoAIBsAAEoAIDkAAABIAjoAAElIIjsAAABICDwAAABICAQ5AAAASAI6AABKSCI7AAAASAg8AAAASAgKBAAAUQAgLgAASwAwLwAACQAQMAAASwAwMQIATAAhNkAAUAAhRAEATQAhRQEATQAhRgEATgAhSAAAT0giCDkCAAAAAToCADwAITsCAAAABDwCAAAABD0CAAAAAT4CAAAAAT8CAAAAAUACAAAAAQs5AQAAAAE6AQBEACE7AQAAAAQ8AQAAAAQ9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAELOQEAAAABOgEAQgAhOwEAAAAFPAEAAAAFPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAAAABQwEAAAABBDkAAABIAjoAAEpIIjsAAABICDwAAABICAg5QAAAAAE6QAA_ACE7QAAAAAQ8QAAAAAQ9QAAAAAE-QAAAAAE_QAAAAAFAQAAAAAEDSQAAAwAgSgAAAwAgSwAAAwAgDAMAAFQAIC4AAFIAMC8AAAMAEDAAAFIAMDECAEwAITICAEwAITMBAE0AITQBAE4AITUBAE4AITZAAFAAITdAAFAAITggAFMAIQI5IAAAAAE6IAA9ACEMBAAAUQAgLgAASwAwLwAACQAQMAAASwAwMQIATAAhNkAAUAAhRAEATQAhRQEATQAhRgEATgAhSAAAT0giTAAACQAgTQAACQAgAAAAAAAAAVEBAAAAAQFRAQAAAAEBUUAAAAABAVEgAAAAAQVRAgAAAAFXAgAAAAFYAgAAAAFZAgAAAAFaAgAAAAEFEgAAeQAgEwAAfAAgTgAAegAgTwAAewAgVAAAAQAgAxIAAHkAIE4AAHoAIFQAAAEAIAAAAAAAAVEAAABIAgsSAABpADATAABuADBOAABqADBPAABrADBQAABsACBRAABtADBSAABtADBTAABtADBUAABtADBVAABvADBWAABwADAHMQIAAAABMwEAAAABNAEAAAABNQEAAAABNkAAAAABN0AAAAABOCAAAAABAgAAAAUAIBIAAHQAIAMAAAAFACASAAB0ACATAABzACABCwAAeAAwDAMAAFQAIC4AAFIAMC8AAAMAEDAAAFIAMDECAAAAATICAEwAITMBAE0AITQBAE4AITUBAE4AITZAAFAAITdAAFAAITggAFMAIQIAAAAFACALAABzACACAAAAcQAgCwAAcgAgCy4AAHAAMC8AAHEAEDAAAHAAMDECAEwAITICAEwAITMBAE0AITQBAE4AITUBAE4AITZAAFAAITdAAFAAITggAFMAIQsuAABwADAvAABxABAwAABwADAxAgBMACEyAgBMACEzAQBNACE0AQBOACE1AQBOACE2QABQACE3QABQACE4IABTACEHMQIAXwAhMwEAWwAhNAEAXAAhNQEAXAAhNkAAXQAhN0AAXQAhOCAAXgAhBzECAF8AITMBAFsAITQBAFwAITUBAFwAITZAAF0AITdAAF0AITggAF4AIQcxAgAAAAEzAQAAAAE0AQAAAAE1AQAAAAE2QAAAAAE3QAAAAAE4IAAAAAEEEgAAaQAwTgAAagAwUAAAbAAgVAAAbQAwAAIEAAB2ACBGAABVACAHMQIAAAABMwEAAAABNAEAAAABNQEAAAABNkAAAAABN0AAAAABOCAAAAABBjECAAAAATZAAAAAAUQBAAAAAUUBAAAAAUYBAAAAAUgAAABIAgIAAAABACASAAB5ACADAAAACQAgEgAAeQAgEwAAfQAgCAAAAAkAIAsAAH0AIDECAF8AITZAAF0AIUQBAFsAIUUBAFsAIUYBAFwAIUgAAGdIIgYxAgBfACE2QABdACFEAQBbACFFAQBbACFGAQBcACFIAABnSCICBAYCBQADAQMAAQEEBwAAAAAFBQAIGAAJGQAKGgALGwAMAAAAAAAFBQAIGAAJGQAKGgALGwAMAQMAAQEDAAEFBQARGAASGQATGgAUGwAVAAAAAAAFBQARGAASGQATGgAUGwAVBgIBBwgBCAsBCQwBCg0BDA8BDREEDhIFDxQBEBYEERcGFBgBFRkBFhoEHB0HHR4NHh8CHyACICECISICIiMCIyUCJCcEJSgOJioCJywEKC0PKS4CKi8CKzAELDMQLTQW"
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