// import mqtt from "mqtt";
// // import {createRover} from "../controller/roverController.js";

// import roverController from "../controller/roverController.js";
// import { createAccData } from "../controller/accDataController.js";
// const { createRover, getRoverLatestmqtt } = roverController;

// const subscriber = async () => {
//   let client = mqtt.connect("mqtt://broker.hivemq.com");
//   if (!client) {
//     console.log("MQTT broker not connected");
//     return;
//   }

//   client.on("connect", () => {
//     client.subscribe("daiict/robotics/acc");
//     console.log("Connected to MQTT broker acc");
//   });

//   client.on("message", async (topic, message) => {
//     console.log(`Received message from ${topic}: ${message}`);

//     console.log(message.toString());
//     // console.log(message.toString("utf-8"));
//     // console.log(message.toString('hex')); // View as hexadecimal
//     // console.log(message.toString('base64')); // View as base64
//     // console.log(message.toString('ascii')); // View as ASCII
//     // console.log(message.toString('latin1'));
//     // console.log(message.toString('binary'));
//     // console.log(message.toString('utf16le'));
//     // console.log(message.toString('ucs2'));

//     let dataValues = message.toString().split(',');

//     let data = {
//       acc_x: parseFloat(dataValues[0]),
//       acc_y: parseFloat(dataValues[1]),
//       acc_z: parseFloat(dataValues[2])
//     };

//     // console.log(data);

//     // console.log(latest);
//     // console.log("Creating new data");
//     // await createAccData(data);
//     // setInterval(() => {
//     //   console.log("Data inserted successfully");
//     // }, 10000);

//   });
// };

// export default subscriber;

import mqtt from "mqtt";
import roverController from "../controller/roverController.js";
import { createAccData } from "../controller/accDataController.js";

const { createRover, getRoverLatestmqtt } = roverController

const subscriber = async () => {
  let client = mqtt.connect("mqtt://broker.hivemq.com");
  if (!client) {
    console.log("MQTT broker not connected");
    return;
  }

  client.on("connect", () => {
    client.subscribe(["daiict/robotics/iot", "daiict/robotics/acc"], (err) => {
      if (!err) {
        console.log("Connected and subscribed to topics");
      }
    });
  });

  client.on("message", async (topic, message) => {
    console.log(`Received message from ${topic}: ${message}`);
    let dataValues, data;

    if (topic === "daiict/robotics/iot") {
      dataValues = message.toString().split(',');

      data = {
        latitude: parseFloat(dataValues[0]),
        longitude: parseFloat(dataValues[1])
      };
      data.latitude = data.latitude + 0.0785;
      data.longitude = data.longitude + 0.2489;
      console.log("gps");
      console.log(data);
      const latest = await getRoverLatestmqtt();
      if (latest && latest[0].latitude === data.latitude && latest[0].longitude === data.longitude) {
        console.log("Data already exists");
        return;
      }

      console.log("Creating new data for GPS coordinates");
      await createRover(data);
      console.log("Data inserted successfully");

    }

    if (topic === "daiict/robotics/acc") {
      dataValues = message.toString().split(',');

      data = {
        acc_x: parseFloat(dataValues[0]),
        acc_y: parseFloat(dataValues[1]),
        acc_z: parseFloat(dataValues[2])
      };

      console.log("accelerometer");
      console.log(data);
      console.log("Creating new data for accelerometer");
      await createAccData(data);
      console.log("Data inserted successfully");
    }
  });
};

export default subscriber;
