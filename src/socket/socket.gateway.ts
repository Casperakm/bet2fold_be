import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9854)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor() { }

  afterInit(server: any) {
    console.log('Method not implemented.');
  }

  // On User Connect
  async handleConnection(client: Socket) {

    // await this.addSocketId(userId as string, client.id);

    console.log(`Connected with:`, client);

    // const receiverSocketId = await this.getSocketId(userId as string);
    // if (receiverSocketId)
    //   this.server.to(receiverSocketId).emit('connected_instance', {
    //     instance: process.env.NODE_INSTANCE_ID,
    //   });
  }

  // On User Disconnect
  async handleDisconnect(client: Socket) {
    // const userId = await this.removeUserId(client.id);
    // console.log(`Disconnected with:`, userId);
  }

  // utility functions used below to send messages

  sendMessageToAll(event: string, data: any) {
    this.server.emit(event, data.message);
  }

  async sendMessageSpecificUser(event: string, data: any) {
    // const receiverSocketId = await this.getSocketId(data.userId);
    // receiverSocketId.forEach((id) => {
    //   this.server.to(id).emit(event, data.message);
    // });
  }
}