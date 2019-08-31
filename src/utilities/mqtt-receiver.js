import {
    onConnection,
    onSubscriptionData,
    publishDataToTopic,
    subscribeToTopic,
    unsubscribeTopic
} from '../utilities/mqtt-client';
import conf from '../conf';


// onConnection(conf.app['mqttServer'], () => {
//     console.log('Connected');
//     subscribeToTopic('device_ack');
//     publishDataToTopic('device_command/Gateway_01', JSON.stringify({command: 'device on'}));
//     onSubscriptionData((topic, message) => {
//         console.log(topic + ': ' + message.toString());
//     });
// })


// PpqQjdOcZvdIUOJ^!*mb