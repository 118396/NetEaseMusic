$(function () {
    $.get('/lyric.json').then(function (object) {
        let {
            lyric
        } = object
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function (string, index) {
            let matches = string.match(regex)
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }

        })
        let $lyric = $('.lyric')
        array.map(function (object) {
            if (!object) {
                return
            }
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    })
    let audio = document.createElement('audio')
    audio.src = 'http://dl.stream.qqmusic.qq.com/C400001XdWPc3zSK8E.m4a?guid=7535486840&vkey=41F9CEB5760C3BC852008A4755723EEB5C1E1FDC2A368ED2191D526B36547889A28BC512FA8724379D49FCF3C4360AC4E4DBD44EE0848701&uin=0&fromtag=38'
    audio.oncanplay = function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('touchstart', function(){
        audio.pause()
        $('.disc-container').removeClass('playing')        
    })
    $('.icon-play').on('touchstart', function(){
        audio.play()
        $('.disc-container').addClass('playing')        
    })
})