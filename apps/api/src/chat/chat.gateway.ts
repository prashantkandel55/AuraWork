import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';

interface ChatPayload {
  body: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@InjectRepository(ChatMessage) private readonly messagesRepo: Repository<ChatMessage>) {}

  handleConnection(client: Socket) {
    // In a full implementation, validate JWT from query params here
  }

  handleDisconnect(client: Socket) {
    // No-op for now
  }

  @SubscribeMessage('message:send')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: ChatPayload) {
    if (!payload.body?.trim()) return;

    const message = this.messagesRepo.create({
      tenantId: 'demo-tenant', // TODO: derive from auth
      senderUserId: 'demo-user',
      body: payload.body.trim(),
    });
    const saved = await this.messagesRepo.save(message);

    this.server.emit('message:new', {
      id: saved.id,
      body: saved.body,
      createdAt: saved.createdAt,
    });
  }
}

