import { Module } from '@nestjs/common';
import { GatewaySocket } from './gateway.socket';

@Module({ providers: [GatewaySocket] })
export class GatewayModule {}
