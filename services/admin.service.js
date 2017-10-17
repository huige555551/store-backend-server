const config = require('../config.json')
const mongoose = require('mongoose')
const Admin = require('../models/admin.model.js')
const md5 = require('md5')
const util = require('../common/util')
mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject
service.getRowObjectByName = getRowObjectByName

module.exports = service

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Admin.find().populate('role').skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Admin.count()
  result.page = page
  return result
}

async function editRowObject(id, rowObj) {
  const result = await Admin.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll() {
  const result = await Admin.find()
  return result
}

async function getRowObject(id) {
  let admin = await Admin.findById(id).populate({ path: 'role', populate: { path: 'permissionList' }})
  admin._doc.avatar = {imageKey: admin._doc.avatarKey, imageUrl: util.getPrivateDownloadUrl(admin._doc.avatarKey, 'imageView2/2/w/200/h/100')}
  return admin
}

async function getRowObjectByName(name) {
  return await Admin.findOne(name)
}

async function deleteRowObject(id) {
  return await Admin.findByIdAndRemove(id)
}

async function addRowObject(rowObj) {
  const admin = await Admin.findOne({username: rowObj.username})
  if (admin) {
    return '用户名已经存在'
  }
  rowObj.password = md5(rowObj.password)
  var item = new Admin(rowObj)
  return await item.save()
}

