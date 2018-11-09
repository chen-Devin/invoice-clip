Page({
  data: {
    tab: 0,
    winWidth: 0,
    winHeight: 0,

    items: [],
    startX: 0, //开始坐标

    startY: 0,
    // tab切换  
    currentTab: 0,
    underwayList:[
      {
        company: '克利夫兰骑士',
        money: '600.05',
        data: '2003-05-26',
      },
      {
        company: '迈阿密热火',
        money: '1，600.45',
        data: '2010-9-26',
      },
      {
        company: '克利夫兰骑士',
        money: '2，400.45',
        data: '2014-9-26',
      }, 
      {
        company: '洛杉矶湖人',
        money: '3,356.25',
        data: '2018-7-24',
      }
    ],
    completedList: [
      {
        company: '迈阿密热火',
        money: '600.05',
        data: '2003-05-26',
      },
      {
        company: '芝加哥公牛',
        money: '1，600.45',
        data: '2015-9-26',
      },
      {
        company: '克利夫兰骑士',
        money: '3,356.25',
        data: '2017-5-24',
      }
    ]
  },
  delTtem:function (){
    console.log('点击了删除');
  },
  onLoad: function () {
    var that = this;


    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    for (var i = 0; i < this.data.underwayList.length; i++) {

      console.log(this.data.underwayList[i].money),
      this.data.items.push({
        // content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
        content:{
          company: this.data.underwayList[i].company,
          money: this.data.underwayList[i].money,
          data: this.data.underwayList[i].data,
        },

        isTouchMove: false //默认隐藏删除

      })
      console.log(this.data.items)

    }

    this.setData({

      items: this.data.items

    });








  },
  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },
  tab_click: function (e) {//点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },

  pendint_tab_click:function(){
    console.log('待处理');
  },
  ending_tab_click:function (){
    
  },


  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    console.log(this.data);
    this.data.items.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      items: this.data.items

    })

  },

  //滑动事件处理

  touchmove: function (e) {
    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      items: that.data.items

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {

    this.data.items.splice(e.currentTarget.dataset.index, 1)

    this.setData({

      items: this.data.items

    })

  }


})
