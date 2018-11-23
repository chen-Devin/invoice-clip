
Page({
  data: {
    userImageBase64:'',
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" }
    ]
  },
  confirmUpload(){
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.chooseImage({
      success: res => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
          }
        })

        //这是同步的方法，不过我不太喜欢用
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })

  }
})