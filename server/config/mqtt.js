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

    let data = JSON.parse(message);
    console.log(data);
    await createRover(data);
  });
};

export default subscriber;
