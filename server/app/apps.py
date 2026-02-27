from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from . import pymongo
import json, time, hashlib
from bson import binary
from bson.objectid import ObjectId
from . import pyredis

def response(code: int, message: str, data: any = None):
    body = {'code': code, 'message': message, 'data': {}}
    if data is not None:
        if hasattr(data, '__dict__'):
            body['data'] = data.__dict__
        else:
            body['data'] = data
    return HttpResponse(json.dumps(body, sort_keys=True, ensure_ascii=False))


camps_data = [];

comments_data = [];


# 通用方法，在数组里找ID匹配的数据
def findCampByID( id):
    for i in range(len(camps_data)):
        if camps_data[i]['id'] == id:
            return camps_data[i];
    return None


# 通用方法，在数组里找ID匹配的数据,返回数组
def findCommentByCampID(id):
    coms = []
    for i in range(len(comments_data)):
        if comments_data[i]['campID'] == id:
            coms.append(comments_data[i])
    return coms


# 获取营地列表
@require_http_methods('GET')
def list(request):
    camps = []
    datas = pymongo.MongoDB.camps.find({}, {"_id":1, "title":1, "stars":1, "desc":1, "imgs":1}).sort("time", -1).limit(100)
    for data in datas:
        camps.append({
            "id": str(data["_id"]),
            "title": data["title"],
            "stars": int(data["stars"]),
            "desc": data["desc"],
            "imgs": data["imgs"],
        })
    return response(0, "ok", camps)


# 获取营地详情，输入参数为营地唯一ID
@require_http_methods('GET')
def detail(request):
    id = request.GET.get("id", "")

    camp = {}
    # 先查找redis缓存
    # 若缓存有数据，则直接返回内容
    detail = pyredis.GetCampDetail(id)
    if detail is not None:
        print("find by redis")
        return response(0, "ok", detail)
    # 若缓存没有数据，那就读取数据库，如果数据库有数据，则更新到缓存中，返回内容
    # 若有人评论，则删除缓存
    data = pymongo.MongoDB.camps.find_one({"_id": ObjectId(id)})
    if data is None:
        return response(1, "数据不存在")
    camp = {
        "id": str(data["_id"]),
        "user": data["user"],
        "title": data["title"],
        "stars": data["stars"],
        "desc": data["desc"],
        "lat": data["lat"],
        "lng": data["lng"],
        "address": data["address"],
        "comments": data["comments"],
        "time": int(data["time"]),
        "imgs": data["imgs"],
    }
    pyredis.SetCampDetail(id, camp)
    print("find by mongodb")
    return response(0, "ok", camp)


# 获取某个营地的评论列表，输入参数为营地唯一ID
@require_http_methods('GET')
def comments(request):
    campID = request.GET.get("campID", "")
    list = []
    datas = pymongo.MongoDB.comments.find({"campID": campID}).sort("time", -1).limit(5)
    for data in datas:
        list.append({
            "id": str(data["_id"]),
            "campID": data["campID"],
            "user": data["user"],
            "stars": int(data["stars"]),
            "time": int(data["time"]),
            "desc": data["desc"],
        })
    return response(0, "ok", list)


# 对某个营地新增评论，输入参数营地唯一ID + 评论的数据
# 使用post方法请求，输入数据结构为json
@require_http_methods('POST')
def commentAdd(request):
    print(request.body)
    if str(request.body, 'utf-8') == '':
        return response(1, "参数不能为空")

    comment = {
        "campID": "",
        "user": "",
        "stars": 0,
        "time": int(time.time()),
        "desc": "",
    }

    param = json.loads(request.body)
    print(param)
    if "campID" not in param or param["campID"] == "":
        return response(1, "参数campID不能为空")
    comment["campID"] = param["campID"]

    camp = pymongo.MongoDB.camps.find_one({"_id": ObjectId(param["campID"])})
    if camp is None:
        return response(1, "信息不存在")

    if "user" not in param or param["user"] == "":
        return response(1, "参数user不能为空")
    comment["user"] = param["user"]

    if "stars" not in param:
        return response(1, "参数stars不能为空")
    comment["stars"] = param["stars"]

    if "desc" not in param:
        return response(1, "参数desc不能为空")
    comment["desc"] = param["desc"]

    pymongo.MongoDB.comments.insert_one(comment)

    avgStars = int(((camp["stars"] * camp["comments"]) + comment["stars"])/(camp["comments"]+1))
    pymongo.MongoDB.camps.update_one({"_id": ObjectId(param["campID"])}, {"$inc":{"comments":1}, "$set":{"stars": avgStars}})

    pyredis.DelCampDetail(param["campID"])
    return response(0, "ok")


# 临时全局图片变量。 数据结构 dict， picID => {type:pic_type, body:pic_body}
pics = {}


# 图片上传接口
# {"_id": "{mongo的唯一ID}", "md5":"{唯一标识}", "type": "{类型}", "body":"{图片二进制内容}"}
@require_http_methods('POST')
def upload(request):
    f = request.FILES['file']

    body = f.read()
    md5 = hashlib.md5(body).hexdigest()
    typ = f.content_type

    # 查一下数据库里是否有同样的图片
    img = pymongo.MongoDB.images.find_one({"md5": md5})
    if img is not None:
        print("find md5 image")
        return response(0, "ok", {"id": str(img["_id"])})

    data = {"md5": md5, "type": typ, "body": binary.Binary(body)}

    # 插入一条数据
    ret = pymongo.MongoDB.images.insert_one(data)
    print("insert image")
    return response(0, "ok", {"id": str(ret.inserted_id)})

# 图片获取接口
@require_http_methods('GET')
def file(request):
    id = request.GET.get('id', "")
    img = pymongo.MongoDB.images.find_one({"_id": ObjectId(id)})
    if img is None:
        return response(100, "图片不存在")

    return HttpResponse(img['body'], img['type'])

# 营地新增
# 使用post方法请求，输入数据结构为json
@require_http_methods('POST')
def add(request):
    print(request.body)
    if str(request.body, 'utf-8') == '':
        return response(1, "参数不能为空")

    camp = {
        "user": "",
        "title": "",
        "stars": 0,
        "desc": "",
        "lat": 0,
        "lng": 0,
        "address": "",
        "comments": 0,
        "time": int(time.time()),
        "imgs": []
    }
    param = json.loads(request.body)
    print(param)

    if "title" not in param or param["title"] == "":
        return response(1, "参数title不能为空")
    camp["title"] = param["title"]

    if "user" not in param or param["user"] == "":
        return response(1, "参数user不能为空")
    camp["user"] = param["user"]

    if "stars" not in param:
        return response(1, "参数stars不能为空")
    camp["stars"] = param["stars"]

    if "desc" not in param:
        return response(1, "参数desc不能为空")
    camp["desc"] = param["desc"]

    if "lat" not in param or "lng" not in param:
        return response(1, "参数latlng不能为空")
    camp["lat"] = param["lat"]
    camp["lng"] = param["lng"]

    if "address" not in param:
        return response(1, "参数address不能为空")
    camp["address"] = param["address"]

    if "imgs" not in param:
        return response(1, "参数imgs不能为空")
    camp["imgs"] = param["imgs"]

    pymongo.MongoDB.camps.insert_one(camp)

    return response(0, "ok")
