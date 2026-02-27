from django.conf import settings
import redis, json

if settings.DATABASES['Redis']['OPEN']:
    conn_pool = redis.ConnectionPool(
        host=settings.DATABASES['Redis']['HOST'],
        port=int(settings.DATABASES['Redis']['PORT']),
        decode_responses=True,
    )
    RedisCache = redis.Redis(connection_pool=conn_pool, decode_responses=True)
    RedisCache.ping()
    print("connect redis success")


# 定义一个key
def CampDetailKey(id):
    return "camp_detail_%s" % id


# 设置数据内容到redis
def SetCampDetail(id, detail):
    if settings.DATABASES['Redis']['OPEN']:
        key = CampDetailKey(id)
        value = json.dumps(detail, ensure_ascii=False)
        RedisCache.set(key, value, ex=3600)


# 从redis获取数据内容
def GetCampDetail(id):
    if settings.DATABASES['Redis']['OPEN']:
        key = CampDetailKey(id)
        detail = RedisCache.get(key)
        if detail is not None:
            return json.loads(detail)
    return None


#  从redis 删除数据
def DelCampDetail(id):
    if settings.DATABASES['Redis']['OPEN']:
        key = CampDetailKey(id)
        RedisCache.delete(key)