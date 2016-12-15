<template>
  <div class="hello">
    <input v-model="msg" />
    <button @click="send">发送</button>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CHAT from '../api/Chat'

  export default {
    name: 'Danmu',
    data () {
      return {
        CHAT,
        msg: ''
      }
    },
    created () {
      $.fn.barrager = function (barrage) {
        barrage = $.extend({
          close: true,
          bottom: 0,
          max: 10,
          speed: 6,
          color: '#fff',
          old_ie_color: '#000000'
        }, barrage || {})
        var time = new Date().getTime()
        var barragerId = 'barrage_' + time
        var id = '#' + barragerId
        var divBarrager = $("<div class='barrage' id='" + barragerId + "'></div>").appendTo($(this))
        var windowHeight = $(window).height() - 100
        var bottom = (barrage.bottom === 0) ? Math.floor(Math.random() * windowHeight + 40) : barrage.bottom
        divBarrager.css('bottom', bottom + 'px')
        var divBarragerBox = $("<div class='barrage_box cl'></div>").appendTo(divBarrager)
        if (barrage.img) {
          divBarragerBox.append("<a class='portrait z' href='javascript:;'></a>")
          var img = $("<img src='' >").appendTo(id + ' .barrage_box .portrait')
          img.attr('src', barrage.img)
        }

        divBarragerBox.append(" <div class='z p'></div>")
        if (barrage.close) {
          divBarragerBox.append(" <div class='close z'></div>")
        }
        var content = $("<a title='' href='' target='_blank'></a>").appendTo(id + ' .barrage_box .p')
        content.attr({
          'href': barrage.href,
          'id': barrage.id
        }).empty().append(barrage.info)
        console.log(barrage.info)
        console.log(content)
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0 || navigator.userAgent.indexOf('MSIE 7.0') > 0 || navigator.userAgent.indexOf('MSIE 8.0') > 0) {
          content.css('color', barrage.old_ie_color)
        } else {
          content.css('color', barrage.color)
        }
        var i = 0
        divBarrager.css('margin-right', i)
        var looper = setInterval(barrager, barrage.speed)
        function barrager () {
          var windowWidth = $(window).width() + 600
          if (i < windowWidth) {
            i += 1
            $(id).css('margin-right', i)
          } else {
            $(id).remove()
            return false
          }
        }
        divBarragerBox.mouseover(function () {
          clearInterval(looper)
        })

        divBarragerBox.mouseout(function () {
          looper = setInterval(barrager, barrage.speed)
        })
        $(id + '.barrage .barrage_box .close').click(function () {
          $(id).remove()
        })
      }
      $.fn.barrager.removeAll = function () {
        $('.barrage').remove()
      }
      if (window.localStorage) {
        console.log('浏览支持localStorage')
      } else {
        console.log('浏览暂不支持localStorage')
      }
      // if (window.localStorage) {
      window.localStorage.setItem('name', CHAT.genUid())
      window.localStorage.setItem('color', CHAT.randomColor())
      window.localStorage.setItem('photo', CHAT.randomPhoto())
      window.localStorage.setItem('userid', CHAT.genUid())
      // }
      CHAT.init('name')
    },
    methods: {
      send: function () {
        CHAT.submit(this.msg)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    bottom: 0px;
    position: absolute;
    width: 100%;
    height: 60px;
  }
  .hello input{
    height: 30px;
    width: 80%;
  }
  .hello button{
    height: 36px;
    width: 14%;
  }
</style>
