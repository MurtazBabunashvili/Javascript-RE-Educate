import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    corst: '*'
})
export class GatewaySocket {
    @WebSocketServer() server: Server

    @SubscribeMessage('joinRoom')
    handleJoin(
        @MessageBody() data: {roomId:any; email: any},
        @ConnectedSocket() client: Socket
    ){
        console.log(`${data.email} joined ${data.roomId}`)
        client.join(data.roomId)
    }

    @SubscribeMessage('onPrivateMessage')
    handleMessage(@MessageBody() body: any) {
        this.server.to(body.roomId).emit('privateMessage', body)
    }
}