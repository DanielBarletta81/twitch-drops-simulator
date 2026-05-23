export class Broadcaster {
  constructor(wss) {
    this.wss = wss;
  }

  broadcast(payload) {
    const message = JSON.stringify(payload);

    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  }

  clientCount() {
    return this.wss.clients.size;
  }
}