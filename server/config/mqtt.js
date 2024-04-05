import mqtt from "mqtt";
// import {createRover} from "../controller/roverController.js";

import roverController from "../controller/roverController.js";
const { createRover, getRoverLatestmqtt } = roverController;

const subscriber = async () => {
  let client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on("connect", () => {
    client.subscribe("daiict/robotics/iot");
    console.log("Connected to MQTT broker");
  });

  client.on("message", async (topic, message) => {
    console.log(`Received message from ${topic}: ${message}`);

    let dataValues = message.toString().split(',');

    let data = {
      latitude: parseFloat(dataValues[0]),
      longitude: parseFloat(dataValues[1])
    };

    console.log(data);
    const latest = await getRoverLatestmqtt();
    if(latest && (latest[0].latitude === data.latitude && latest[0].longitude === data.longitude)){
      console.log("Data already exists");
      return;
    }
    console.log(latest);
    console.log("Creating new data");
    await createRover(data);
    setInterval(() => {
      console.log("Data inserted successfully");
    }, 10000);
  });
};

export default subscriber;
