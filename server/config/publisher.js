import mqtt from "mqtt";

const publisher = async () => {
  console.log("Publisher is running");
  let mqttConnection = mqtt.connect("mqtt://broker.hivemq.com");
  
  mqttConnection.on("connect", () => {
    console.log("Connected to MQTT broker");
    let messg = [
      {
        // latitude: 23.123,
        // longitude: 72.123,
        // timestamp: "2021-08-01T12:00:00.000Z",
        x: 0,
        y: 0,
        z: 0
      },
    ];
    console.log("Publishing message to topic daiict/robotics/acc");
    console.log(JSON.stringify(messg));
    mqttConnection.publish("daiict/robotics/acc", JSON.stringify(messg));
  });
};

export default publisher;
