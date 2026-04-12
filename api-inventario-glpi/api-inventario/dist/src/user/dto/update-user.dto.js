import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const openapi = __require("@nestjs/swagger");
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
//# sourceMappingURL=update-user.dto.js.map