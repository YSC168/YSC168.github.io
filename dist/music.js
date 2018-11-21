const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    audio: [
       
        {
        name: 'Sugar',
        artist: 'Maroon 5',
        url: 'https://link.hhtjim.com/163/29019227.mp3',
        cover: 'https://raw.githubusercontent.com/YSC168/eee/master/sugar.jpg',
      },
      {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.lrc',
            theme: '#505d6b'
        }, 
         {
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
            theme: '#ebd0c2'
        }

    ]
});