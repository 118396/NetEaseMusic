$(function () {
        $.get('./songs.json').then(function (response) {
            let items = response
            items.forEach((i) => {
                let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                <h3>${i.name}</h3>
                <p>${i.singer} - ${i.album}</p>
                    <svg class="play">
                        <use xlink:href="#icon-play-circled"></use>
                    </svg>
                </a>
            </li>
            `)
                $('#lastestMusic').append($li)
            })
            $('#lastestMusicloading').remove()
        })


    $('.siteNav').on('click', 'ol.tabItems>li', function (e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
       let index = $li.index()
        $li.trigger('tabChange', index)
        $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
    })
    $('.siteNav').on('tabChange', function (e, index) {
        let $li = $('.tabContent > li').eq(index)
        if ($li.attr('data-downloaded') === "yes") {// 一但发现被下载过，就不用再下载了 
            return 
        }
        
        if (index === 1) {
            $.get('./page2.json').then((response) => {
                $li.text(response.content)
                $li.attr('data-downloaded', "yes") 
            })
        } else if (index === 2) {
            return
            $.get('./page3.json').then((response) => {
                $li.text(response.content)
                $li.attr('data-downloaded', "yes")
            })
        }
    })

    let timer = undefined
    $('#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') { return }

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output').text(result.map((r) => r.name).join(','))
                } else {
                    $('#output').text('没有结果')
                }
            })
        }, 300)
    })

    function search(keyword) {
        return new Promise((resolve, reject) => {
            var database = [
                { "id": 1, "name": "约定", },
                { "id": 2, "name": "阿楚姑娘", },
                { "id": 3, "name": "成都", },
                { "id": 4, "name": "火柴天堂", },
                { "id": 5, "name": "野子", },
                { "id": 6, "name": "左边", },
                { "id": 7, "name": "沧海一声笑", },
                { "id": 8, "name": "红昭愿", },
                { "id": 9, "name": "大鱼", },
                { "id": 10, "name": "烹爱", }
            ]
            // return database.filter(()=> { item.name.indexOf(keyword)>=0 })
            let result =  database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function(){
                resolve(result)
            },(Math.random()*200 + 1000)) //0.5s ~ 1.5s
        })
    }
    window.search = search
})

