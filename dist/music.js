const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "咖喱咖喱",
        artist: '牛奶咖啡',
        url: 'http://m10.music.126.net/20181119235320/a055cd7846ded184f193885cfc2364f6/ymusic/f2bd/a536/eacb/f9b87f00fecd868a24f4e2c851546776.mp3',
        cover: 'https://raw.githubusercontent.com/YSC168/eee/master/glgl.jpg',
      },
      {
        name: 'Sugar',
        artist: 'Maroon 5',
        url: 'http://m10.music.126.net/20181119235759/06b1fe2a44d4054518bc355a25204a83/ymusic/7388/4959/15fe/c527fa6d0aee9373b53566ea76b6fa3e.mp3',
        cover: 'https://raw.githubusercontent.com/YSC168/eee/master/sugar.jpg',
      },
      {
        name: 'Horizon',
        artist: 'Janji',
        url: 'http://m10.music.126.net/20181119235954/1efcb636ca1ec131be7cf387e2189c52/ymusic/040f/0159/0309/3e3911190e639ca177804cf119d8372c.mp3',
        cover: 'https://raw.githubusercontent.com/YSC168/eee/master/horizon.jpg',
      }
    ]
});