import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-client",
  brokers: [
    "kyle-kafka-kafka01.foo.bar:9092",
    "kyle-kafka-kafka02.foo.bar:9092",
    "kyle-kafka-kafka03.foo.bar:9092",
  ],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();

  let result;

  result = await producer
    .send({
      topic: "A",
      messages: [{ value: "Hello KafkaJS user!" }],
    })
    .catch((err) => {
      console.log("error : ", err);
    });
  console.log(result);

  result = await producer
    .send({
      topic: "B",
      messages: [{ value: "Hello KafkaJS user!" }],
    })
    .catch((err) => {
      console.log("error : ", err);
    });
  console.log(result);
};

run();
