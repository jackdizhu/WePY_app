/* eslint-disable */
import {get, post, httpRequest} from './http'
import {data, cookingType} from '@/data/data'
import { random, ImgUrlChange } from '@/utils/consts'
import store from '@/store/index'

const get_listRandom = function () {
  let arr = []
  for (let i = 0; i < cookingType.length; i++) {
    let type = cookingType[i].value
    let _data = data.filter((item) => {
      return item.type === type
    })
    let count = _data.length
    let page = random(0, count)
    let item = _data[page]
    arr.push(item)
  }
  return arr
}
const get_list = function () {
  let store_listData = store.state.listData
  let obj = {}
  for (let i = 0; i < cookingType.length; i++) {
    let type = cookingType[i].value
    let page = (store_listData[type] && store_listData[type].page) ? store_listData[type].page + 1 : 1
    let pagesize = 20
    let _data = data.filter((item) => {
      return item.type === type
    })
    let count = _data.length
    let maxPage = Math.ceil(count / pagesize)
    if (page > maxPage) {
      page = 1
    }
    let arr = _data.slice((page * 20 - pagesize), page * 20)
    obj[type] = {}
    obj[type].page = page
    obj[type].data = arr
  }
  return obj
}
const get_listData = function (page, type) {
  let store_listData = store.state.data
  let _data = data.filter((item) => {
    return item.type === type
  })
  let pagesize = 20
  let count = _data.length
  let maxPage = Math.ceil(count / pagesize)
  if (page > maxPage) {
    page = 1
  }
  let arr = _data.slice((page * 20 - pagesize), page * 20)
  console.log(arr, 'arr')
  return arr
}
const get_details = function (id) {
  let obj = void (0)
  let _data = data.find((item) => {
    return (item.id === id || item._id === id)
  })
  console.log(_data, id)
  obj = _data || {
    '_id': '5b7394189ca6b025ec494134',
    'img': 'https://s1.st.meishij.net/r/97/135/12346347/a12346347_153397872702953.jpg',
    'typeName': '川菜',
    'type': 'chuancai',
    'name': '正宗洋葱回锅肉',
    '__v': 0,
    'data': {
      'cookingMethod': ['食材：寇大香鲜椒豆瓣、二刀肉、洋葱、花椒粒、白糖、小榨菜籽油、生姜、大葱、食盐、味精等。', '将新鲜猪肉切成适量大小，放入水中开中火炖煮，添加葱段、姜片、花椒去除肉腥味。（如果没有大葱、生姜、花椒也可不加）', '二刀肉煮至筷子可以较为容易穿透猪肉时，即可捞出放凉并切成适度薄片，同时将洋葱洗净切片。（筷子可以穿透猪肉时即便是肉已煮熟，切片猪肉过厚或过薄）', '炒锅加热倒入小榨菜籽油，待油温渐高后放入花椒过热油。将切好的二刀肉放入锅中翻炒至肉片卷曲后，即可加入寇大香鲜椒豆瓣，并添加少量白糖。', '待放入的寇大香鲜椒豆瓣后继续翻炒入味即可', '放入洋葱片与回锅肉一同翻炒，直到洋葱去生炒熟再根据个人口味适当添加食盐、味精等即可出锅盛盘。', '完成'],
      'auxiliaryMaterials': ['花椒粒', '白糖', '小榨菜籽油', '生姜', '大葱', '食盐', '味精'],
      'mainMaterial': ['寇大香鲜椒豆瓣', '二刀肉', '洋葱']
    },
    'praise': '85.96%',
    'evaluate': '558'
  }
  return obj
}

let apiJson = {
  'version': '1.0',
  'test_get': '/test_get',
  'test_post': '/test_post',
  'test_get_list': '/test_get_list',
  'test_get_details': '/test_get_details',
  'mock': '/api/mock',
  'add': '/api/login',

  'init': '/init',
  'get_openId': '/get_openId',
  'get_cookingType': '/get_cookingType',
  'get_list': '/get_list',
  'get_listRandom': '/get_listRandom',
  'get_details': '/get_details'
}

export const api = {
  'test_get': (params) => get(apiJson.test_get, params),
  'test_post': (params) => get(apiJson.test_post, params),
  'test_get_list': (params) => get(apiJson.test_get_list, params),
  'test_get_details': (params) => get(apiJson.test_get_details, params),
  'mock': (params) => get(apiJson.mock, params),
  'add': (params) => get(apiJson.add, params),
  'init': (params) => get(apiJson.init, params),
  'get_openId': (params) => get(apiJson.get_openId, params),
  'get_cookingType': (params) => {
    return get(apiJson.get_cookingType, params)
      .catch(() => {
        return {data: cookingType}
      })
  },
  'get_list': (params) => {
    return get(apiJson.get_list, params)
      .catch(() => {
        console.log('---------------')
        return {data: get_listData(params.page, params.cookingType || 'chuancai')}
      })
  },
  'get_listRandom': (params) => {
    return get(apiJson.get_listRandom, params)
      .catch(() => {
        return {data: get_listRandom()}
      })
  },
  'get_details': (params) => {
    return get(apiJson.get_details, params)
      .catch(() => {
        return {data: get_details(params.id)}
      })
  }
}
