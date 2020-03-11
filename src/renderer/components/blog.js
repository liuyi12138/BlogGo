function getFileSize (fileByte) {
  var fileSizeByte = fileByte
  var fileSizeMsg = ''
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + ' KB'
  else if (fileSizeByte === 1048576) fileSizeMsg = '1 MB'
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + ' MB'
  else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1 GB'
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  else fileSizeMsg = '文件超过1TB'
  return fileSizeMsg
}

function add0 (m) {
  return m < 10 ? '0' + m : m
}

function getTime (timeNum) {
  var time = new Date(timeNum)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
}

async function getFoldersByPath (path, cookie) {
  var format = require('string-format')
  var request = require('request')
  let data = {'path': path, 'dirOnly': true, 'f': true, 'cstk': cookie.CSTK}
  let url = format('https://note.youdao.com/yws/api/personal/file?method=listEntireByParentPath&cstk={0}&keyfrom=web', cookie.CSTK)

  let HEADERS = {
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Cookie': format('YNOTE_PERS={0}; YNOTE_SESS={1}; YNOTE_LOGIN={2}; YNOTE_CSTK={3}', cookie.YNOTE_PERS, cookie.YNOTE_SESS, cookie.YNOTE_LOGIN, cookie.CSTK),
    'Accept': 'application/json, text/plain, */*',
    'Host': 'note.youdao.com',
    'Origin': 'https://note.youdao.com',
    'Referer': 'https://note.youdao.com/web/',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return new Promise(function (resolve, reject) {
    let folders = []
    request({
      url: url,
      method: 'POST',
      json: true,
      headers: HEADERS,
      form: data,
      gzip: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        for (let i = 0; i < body.length; ++i) {
          folders.push({
            name: body[i]['fileEntry']['name'],
            id: body[i]['fileEntry']['id']
          })
        }
        resolve(folders)
      }
      reject(error)
    })
  })
}

async function getAllFolders (rootPath, cookie) {
  let allPath = []
  allPath.unshift(rootPath)
  let allFodles = []

  while (allPath.length !== 0) {
    let tempPath = allPath.pop()
    if (tempPath.length > 1 && tempPath[1] === '/') {
      tempPath = tempPath.slice(1)
    }
    // console.log(tempPath)
    let tempFolders = await getFoldersByPath(tempPath, cookie)
    for (let i = 0; i < tempFolders.length; ++i) {
      let aPath = tempPath + '/' + tempFolders[i]['id']
      allPath.unshift(aPath)
      allFodles.push(tempFolders[i])
    }
  }
  return allFodles
}

async function getAllNotes (folder, cookie) {
  var format = require('string-format')
  var request = require('request')
  let url = format('https://note.youdao.com/yws/api/personal/file/{0}?all=true&cstk={1}&f=true&isReverse=false&keyfrom=web&len=30&method=listPageByParentId&sort=1', folder.id, cookie.CSTK)
  let HEADERS = {
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Cookie': format('YNOTE_PERS={0}; YNOTE_SESS={1}; YNOTE_LOGIN={2}; YNOTE_CSTK={3}', cookie.YNOTE_PERS, cookie.YNOTE_SESS, cookie.YNOTE_LOGIN, cookie.CSTK),
    'Accept': 'application/json, text/plain, */*',
    'Host': 'note.youdao.com',
    'Origin': 'https://note.youdao.com',
    'Referer': 'https://note.youdao.com/web/',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return new Promise(function (resolve, reject) {
    let notes = []
    request({
      url: url,
      method: 'GET',
      json: true,
      headers: HEADERS,
      gzip: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let noteData = body['entries']
        for (let i = 0; i < noteData.length; ++i) {
          if (noteData[i]['fileEntry']['name'].slice(-2) === 'md') {
            notes.push({
              name: noteData[i]['fileEntry']['name'],
              id: noteData[i]['fileEntry']['id'],
              timeForSort: noteData[i]['fileEntry']['modifyTimeForSort'],
              createTime: getTime(noteData[i]['fileEntry']['createTimeForSort'] * 1000),
              modifyTime: getTime(noteData[i]['fileEntry']['modifyTimeForSort'] * 1000),
              fileSize: getFileSize(noteData[i]['fileEntry']['fileSize']),
              folder: folder['name']
            })
          }
        }
        resolve(notes)
      }
      reject(error)
    })
  })
}

async function getNoteContent (note, cookie) {
  var format = require('string-format')
  var request = require('request')
  let url = format('https://note.youdao.com/yws/api/personal/file/{0}?method=download&read=true&cstk={1}', note.id, cookie.CSTK)
  let HEADERS = {
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Cookie': format('YNOTE_PERS={0}; YNOTE_SESS={1}; YNOTE_LOGIN={2}; YNOTE_CSTK={3}', cookie.YNOTE_PERS, cookie.YNOTE_SESS, cookie.YNOTE_LOGIN, cookie.CSTK),
    'Accept': 'application/json, text/plain, */*',
    'Host': 'note.youdao.com',
    'Origin': 'https://note.youdao.com',
    'Referer': 'https://note.youdao.com/web/',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  return new Promise(function (resolve, reject) {
    request({
      url: url,
      method: 'GET',
      json: true,
      headers: HEADERS,
      gzip: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body)
      }
      reject(error)
    })
  })
}

async function writeContent (content, path) {
  var fs = require('fs')
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, content, error => {
      if (error) reject(error)
      resolve(true)
    })
  })
}

export {
  getAllFolders, getAllNotes, getNoteContent, writeContent
}
