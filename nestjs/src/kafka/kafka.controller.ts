import { Controller, Logger } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import {
  ClientKafka,
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';

@Controller()
export class KafkaController {
  private readonly logger = new Logger('kafka');

  constructor(private readonly kafkaService: KafkaService) {}

  @MessagePattern('A')
  async a(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    let topic;
    let partition;
    let offset;
    let consumer;
    try {
      topic = context.getTopic();
      partition = context.getPartition();
      offset = context.getMessage().offset;
      consumer = context.getConsumer();

      this.logger.log(
        'Get Message : ',
        JSON.stringify(
          {
            topic: topic,
            partition: partition,
            offset: offset,
            message: message,
            consumer: consumer,
          },
          undefined,
          2,
        ),
      );
    } catch (err) {
      throw err;
    }
  }
}
