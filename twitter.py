import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import secrets
from pykafka import KafkaClient


def getKafkaCkient():
    return KafkaClient(hosts='localhost:9092')


class StdOutListener(StreamListener):
    def on_data(self, data):
        print(data)
        message = json.loads(data)
        if message['place'] is not None:
            client = getKafkaCkient()
            topic = client.topics['twitter_data']
            producer = topic.get_sync_producer()
            producer.produce(data.encode('ascii'))
        return True

        def on_error(self, status):
            print(status)


if __name__ == "__main__":
    auth = OAuthHandler(secrets.API_KEY, secrets.API_SECRET_KEY)
    auth.set_access_token(secrets.ACCESS_TOKEN, secrets.ACCESS_TOKEN_SECRET)
    listener = StdOutListener()
    stream = Stream(auth, listener)
