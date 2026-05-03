import pika
import os
import json

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", 5672))
QUEUE_NAME = "signals"

def publish_signal(signal):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    channel.basic_publish(
        exchange='',
        routing_key=QUEUE_NAME,
        body=json.dumps({
            "id": signal.id,
            "source": signal.source,
            "type": signal.type,
            "message": signal.message,
            "timestamp": str(signal.timestamp),
            "incident_id": signal.incident_id
        }),
        properties=pika.BasicProperties(delivery_mode=2)
    )
    connection.close()
