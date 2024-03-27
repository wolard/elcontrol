import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types';

//export const API_IP = "https://server.wolard.ovh:10001";
export const API_IP = process.env.REACT_APP_API_URL??"https://server.wolard.ovh:10001";
//export const API_IP = "http://192.168.1.185:1111";2
console.log("API_IP", API_IP);
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =io(API_IP!, {
  //autoConnect: false

});
