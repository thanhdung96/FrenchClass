import { Module } from "@nestjs/common";
import { SecurityController } from "./security.controller";
import { SecurityModule } from "@app/core/module/security/security.module";

@Module({
  imports: [SecurityModule],
  controllers: [SecurityController]
})
export class SecurityApiModule {}
