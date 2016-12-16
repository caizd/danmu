 <template>
    <div class="hello">
      <div class="msg"><input v-model="msg" value="" /></div>
      <div class="button" @click="send">发送</div>
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
        var width = parseInt(divBarrager.css('width'))
        var windowWidth = $(window).width() + width
        var speed = 100
        var t = windowWidth / speed
        divBarrager.css('transition', 'margin-right ' + t + 's linear')
        console.log('width' + width)
        divBarrager.css('right', -width)
        divBarragerBox.css('width', width)
        divBarrager.css('margin-right', windowWidth)
        setTimeout(function () { $(id).remove() }, t * 1000)
//        var looper = setInterval(barrager, barrage.speed)
//        function barrager () {
//          var windowWidth = $(window).width() + width
//          if (i < windowWidth) {
//            i += 1
//            $(id).css('margin-right', i)
//          } else {
//            $(id).remove()
//            clearInterval(looper)
//          }
//        }
//        console.log(navigator.userAgent.indexOf('MicroMessenger'))
//        if (!(navigator.userAgent.indexOf('MicroMessenger') > 0)) {
//          divBarragerBox.mouseover(function () {
//            clearInterval(looper)
//          })
//          divBarragerBox.mouseout(function () {
//            looper = setInterval(barrager, barrage.speed)
//          })
//        }
//        $(id + '.barrage .barrage_box .close').click(function () {
//          $(id).remove()
//        })
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
    border-top: 1px solid #dfdfdf;
    padding: 5px 0px;
    background-color: #f0f0f0;
    width: 100%;
  }
  .hello .msg{
    margin: 0px 110px 0px 15px;
    border: 1px solid #dfdfdf;
    height: 32px;
    border-radius: 3px;
    overflow: hidden;
  }
  .hello .msg input{
    width: 100%;
    font-size: 18px;
    display: block;
    border: none;
    height: 30px;
    color: #333;
  }
  .hello .button{
    height: 32px;
    width: 80px;
    float: right;
    border: 1px solid #dfdfdf;
    font-size: 24px;
    margin: -34px 15px 0px 15px;
    line-height: 32px;
    border-radius: 3px;
    color: #666;
  }
</style>
