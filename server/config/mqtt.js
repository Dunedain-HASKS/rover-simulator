import mqtt from 'mqtt';

const subscriber = async () => {

    let client = mqtt.connect('mqtt://broker.hivemq.com');

    client.on('connect', ()=> {
        client.subscribe('daiict/robotics/iot');
        console.log('Connected to MQTT broker');
    })

    client.on('message', (topic, message) => {
        console.log(`Received message from ${topic}: ${message}`);
    })
}

export default subscriber;