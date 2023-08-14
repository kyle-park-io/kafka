import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-client",
  brokers: [
    "kyle-kafka-kafka01.foo.bar:9092",
    "kyle-kafka-kafka02.foo.bar:9092",
    "kyle-kafka-kafka03.foo.bar:9092",
  ],
});

const consumer = kafka.consumer({
  groupId: "kafka-consumer",
});

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "A", fromBeginning: true });
  await consumer.subscribe({ topic: "B", fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic: topic,
        partition: partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      await consumer.commitOffsets([
        {
          topic: topic,
          partition: partition,
          offset: (Number(message.offset) + 1).toString(),
        },
      ]);
    },
  });
};

run();
