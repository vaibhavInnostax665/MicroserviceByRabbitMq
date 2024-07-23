import amqp from "amqplib/callback_api.js"
export const postController = async (req, res) => {
    const data = {
        "name": "Joe",
        "Series": "Friends"
    };

    try {
        console.log("try blockk");
      
        amqp.connect('amqp://localhost', function (err, conn) {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: "Failed to connect to RabbitMQ" });
            }

          
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.error(err);
                    conn.close(); 
                    return res.status(500).send({ error: "Failed to create channel" });
                }

                const queue = "consumer-provider-queue";

                ch.assertQueue(queue,{durable:false  });

                const msg = Buffer.from(JSON.stringify(data));

                ch.sendToQueue(queue, msg);

                console.log("Message sent to queue:", msg.toString());


                // setTimeout(function () {
                //     ch.close();
                //     conn.close();
                // }, 500);
            });
        });


        return res.send({ "msg": "provider controller", "data": data });

    } catch (error) {
        console.error("Error in provider:", error);
        return res.status(500).send("Error in provider");
    }
};