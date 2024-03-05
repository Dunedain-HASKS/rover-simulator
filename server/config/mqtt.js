import mqtt from "mqtt";
import createRover from "../controller/roverController.js";

const subscriber = async () => {
  let client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on("connect", () => {
    client.subscribe("daiict/robotics/iot");
    console.log("Connected to MQTT broker");
  });

  client.on("message", async (topic, message) => {
    console.log(`Received message from ${topic}: ${message}`);

    let dataValues = message.toString().split(',');

    // Use the values as needed, e.g., convert them to numbers
    let data = {
      value1: parseFloat(dataValues[0]),
      value2: parseFloat(dataValues[1])
    };

    console.log(data);
    // await createRover(data);
  });
};

export default subscriber;
