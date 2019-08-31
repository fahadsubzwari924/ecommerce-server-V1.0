import mqtt from 'mqtt'
import conf from '../conf';
import { isMQTTConnected } from '..';

var client = null;

export function onConnection(callback) {
    client = mqtt.connect(conf.app['mqttServer'], { password: 'utflabs', username: 'utflabs' })
    client.on('connect', callback)
}

function connect(callback) {
    client = mqtt.connect(conf.app['mqttServer'], { password: 'utflabs', username: 'utflabs' })
    client.on('connect', callback)
}

export function subscribeToTopic(topic) {
    client.subscribe(topic);
}

export function publishDataToTopic(topic, data) {
    console.log('Publishing to Topic: ' + topic);
    console.log('Publishing Data: ' + data);
    client.publish(topic, data);
}

export function onSubscriptionData(callback) {
    client.on('message', callback);
}

export function unsubscribeTopic(topic) {
    client.unsubscribe(topic);
}


