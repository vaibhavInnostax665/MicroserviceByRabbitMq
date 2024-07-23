import amqp from "amqplib/callback_api.js";
import axios from "axios";

export const getAll = async (req, res) => {
  try {
    let data = null;
    await axios
      .get("http://localhost:6000/provider/")
      .then(console.log("Provider api called"))
      .catch("error in calling of provider api");

    const conn = await new Promise((resolve, reject) => {
      amqp.connect("amqp://localhost", (err, connection) => {
        if (err) reject(err);
        resolve(connection);
      });
    });

    const ch1 = await new Promise((resolve, reject) => {
      conn.createChannel((err, channel) => {
        if (err) reject(err);
        resolve(channel);
      });
    });

    const queue = "consumer-provider-queue";

    await ch1.assertQueue(queue, { durable: false });

    await new Promise((resolve, reject) => {
      ch1.consume(queue, (msg) => {
        console.log(msg.content.toString());
        data = JSON.parse(msg.content.toString());
        console.log("before", data);
        ch1.ack(msg);
        resolve(data);
      });
    });

    console.log("after ", data);
    res.send({ message: "consumer controller", data: data });
  } catch (error) {
    console.error("Error in consumer:", error);
    res.status(500).send("Error in consumer");
  }
};
