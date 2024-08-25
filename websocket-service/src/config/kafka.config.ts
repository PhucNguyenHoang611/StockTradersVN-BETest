import { ConfigService } from "@nestjs/config";
import { KafkaOptions, Transport } from "@nestjs/microservices";

export const createKafkaConfig = (
  configService: ConfigService
): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [configService.get("KAFKA_BROKER")]
    },
    consumer: {
      groupId: configService.get("KAFKA_GROUP_ID")
    }
  }
});
