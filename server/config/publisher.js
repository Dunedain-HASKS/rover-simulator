import mqtt from "mqtt";

const publisher = async () => {
  console.log("Publisher is running");
  let mqttConnection = mqtt.connect("mqtt://127.0.0.1:8000");
  
  mqttConnection.on("connect", () => {
    console.log("Connected to MQTT broker");
    let messg = [
      {
        latitude: 23.123,
        longitude: 72.123,
        timestamp: "2021-08-01T12:00:00.000Z",
      },
    ];
    console.log("Publishing message to topic daiict/robotics/iot");
    mqttConnection.publish("daiict/robotics/iot", JSON.stringify(messg));
  });
};

export default publisher;
