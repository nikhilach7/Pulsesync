import pika
import os
import json
from app.models.models import Signal
from app.services.db import get_db_session
from loguru import logger

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", 5672))
QUEUE_NAME = "signals"

def process_signal(signal_data):
    db = next(get_db_session())
    try:
        # Here you could add further processing, alerting, etc.
        logger.info(f"Processed signal: {signal_data}")
    except Exception as e:
        logger.error(f"Worker failed: {e}")
    finally:
        db.close()

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)
    def callback(ch, method, properties, body):
        signal_data = json.loads(body)
        process_signal(signal_data)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback)
    logger.info("Worker started, waiting for messages...")
    channel.start_consuming()

if __name__ == "__main__":
    main()
