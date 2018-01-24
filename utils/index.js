var fs = require('fs');
module.exports = {
  async readFile(name) {
    //用法   ctx.body = await utils.readFile();
    let res = {};
    await new Promise((resolve, reject) => {
      if (name) {
        fs
          .readFile(`./json/${name}.json`, 'utf8', function (err, data) {
            if (err) {
              res = {
                status: 0,
                msg: "读取文件出错"
              }
            } else {
              res = {
                status: 1,
                res: JSON.parse(data)
              }
            }
            resolve()
          })
      } else {
        res = {
          status: 0,
          msg: "参数为空"
        }
        resolve()
      }
    })
    return res;
  },
  async writeFile(name, data) {
    let res;
    var oldData = await this.readFile(name);
    await new Promise((resolve, reject) => {
      if (oldData.status == 1) {
        let saveData = oldData.res;
        saveData.push(data);
        fs.writeFile(`./json/${name}.json`, JSON.stringify(saveData), function (err) {
          if (err) {
            res = {
              status: 0,
              msg: "添加失败"
            };
          } else {
            res = {
              status: 1,
              msg: "添加成功"
            }
          }
          resolve()
        })
      } else {
        res = oldData
        resolve()
      }

    })
    return res;
  }
}
