import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module.js'
import { UserModule } from './user/user.module.js'
import { MonitoringModule } from './monitoring/monitoring.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    MonitoringModule
  ],
})
export class AppModule {}
