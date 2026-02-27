from django.conf import settings
from pymongo import MongoClient

client = MongoClient(
    host=settings.DATABASES['MongoDB']['HOST'],
    port=int(settings.DATABASES['MongoDB']['PORT']),
)
MongoDB = client[settings.DATABASES['MongoDB']['NAME']]
MongoDB.command('ping')

print("connect mongodb success")