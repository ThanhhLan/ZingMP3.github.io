const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'ZingMP3';


// Slide
const slides = $('.slides');
const arrowPrev = $('.arrow--left');
const arrowNext = $('.arrow--right');
const wrappperBox = $('.slide__container');
const listSlides = $$('.slide__item');

// Bài hát, albums mới phát hành
const tabTitle = $$('.new__release-title');
const panes = $$('.tab-pane ');

// Zingchart
const lineChart = document.getElementById('line_chart').getContext("2d")

// Bật sang trang khám phá hoặc cá nhân
const headerTitle = $$('.header__menu-item1');
const bodyList = $$('.body-item')

// music bar
const player = $('.music--bar')
const playList = $('.listSong')
const songImage = $('.info-song--img')
const songName = $('.info-song--name')
const songSinger = $('.info-song-singer--name')
const audio = $('#audio')
const timeEnd = audio.duration;
const timeSong = $$('.time_song')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const currentTime = $('.current-time')
const durationTime = $('.duration-time')
const volumeIcons = $('.volume-icon-wrap')
const volumeProgress = $('#progress2')

// toast
const mainToast = $('#toast')

// Quảng cáo
const advertisement = $('.advertisement');
const advertisementClose = $('.advertisement-close');

const app = {
    
    // ---------------- Music Bar -----------------
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs:[
        {
            name: 'Anh yêu vội thế',
            singer: 'LaLa Trần',
            path: './assets/music/anhyeuvoithe.mp3',
            image: './assets/img/song1.jpg',
            duration: '04:50'
        },
        {
            name: 'Ai chung tình được mãi',
            singer: 'Đinh Tùng Huy, ACV',
            path: './assets/music/aichungtinhduocmai.mp3',
            image:'./assets/img/song2.jpg',
            duration: '05:35'
        },
        {
            name: 'Cuộc sống em ổn không',
            singer: 'Anh Tú',
            path: './assets/music/cuocsongemonkhong.mp3',
            image:'./assets/img/playlist1.jpg',
            duration: '05:44'
        },
        {
            name: 'Suy nghĩ trong anh',
            singer: 'Khắc Việt',
            path: './assets/music/suynghitronganh.mp3',
            image:'./assets/img/song8.jpg',
            duration: '05:11'
        },
        {
            name: 'Đào nương',
            singer: 'Hoàng Vương',
            path: './assets/music/daonuong.mp3',
            image:'./assets/img/song3.jpg',
            duration: '04:19'
        },
        {
            name: 'Lỡ yêu người đậm sâu',
            singer: 'ZIN MEDIA, Linh Hương Luz',
            path: './assets/music/loyeunguoidamsau.mp3',
            image:'./assets/img/song4.jpg',
            duration: '03:04'
        },
        {
            name: 'Hôm nay em cưới rồi',
            singer: 'Khải Đăng',
            path: './assets/music/homnayemcuoiroi.mp3',
            image:'./assets/img/song9.jpg',
            duration: '05:04'
        },
        {
            name: 'Em là con thuyền cô đơn',
            singer: 'Thái Học',
            path: './assets/music/emlaconthuyencodon.mp3',
            image:'./assets/img/song6.jpg',
            duration: '05:10'
        },
        {
            name: 'Xem như anh chẳng may',
            singer: 'Chu Thúy Quỳnh',
            path: './assets/music/xemnhuanhchangmay.mp3',
            image:'./assets/img/song5.jpg',
            duration: '05:05'
        },
        {
            name: 'Attention',
            singer: 'Charlie Puth',
            path: './assets/music/attention.mp3',
            image:'./assets/img/song10.jpg',
            duration: '03:32'
        },
        {
            name: 'Hỏi vợ ngoại thành',
            singer: 'Mai Tuấn, Hoàng Châu',
            path: './assets/music/hoivongoaithanh.mp3',
            image:'./assets/img/song11.jpg',
            duration: '05:36'
        },
        {
            name: 'Con đường xưa em đi',
            singer: 'Lưu Ánh Loan, Lê Sang',
            path: './assets/music/conduongxuaemdi.mp3',
            image:'./assets/img/song12.jpg',
            duration: '04:46'
        },
        {
            name: 'Người đi ngoài phố',
            singer: 'Lệ Quyên',
            path: './assets/music/nguoidingoaipho.mp3',
            image:'./assets/img/song13.jpg',
            duration: '04:22'
        },
        {
            name: 'Người tình mùa đông',
            singer: 'Hồ Quang Hiếu',
            path: './assets/music/nguoitinhmuadong.mp3',
            image:'./assets/img/song14.jpg',
            duration: '04:57'
        },
        {
            name: 'Sầu tím thiệp hồng',
            singer: 'Quang Lê, Lệ Quyên',
            path: './assets/music/sautimthiephong.mp3',
            image:'./assets/img/song15.jpg',
            duration: '04:48'
        },
    ],


    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    
    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `
            <tr class="content">
                <td class="song">
                    <i class="fa-solid fa-music"></i>
                    <img src="${song.image}" class="song-img ${index === app.currentIndex ? 'active' :''}" data-index="${index}">
                    <div class="playlist-info-song">
                        <h3 class="name-song">${song.name}</h3>
                        <p class="name-singer">${song.singer}</p>
                    </div>
                </td>
                <td class="album">
                    ${song.name}
                </td>
                <td class="time">
                    <i class="icon-like fa-solid fa-heart"></i>
                    <p class="time-song">${song.duration}</p>
                </td>
            </tr>
            `
        })
        playList .innerHTML = htmls.join('\n')
    },

    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        });
    },

    handleEvents: function(){
        const _this = this;
        // Phát nhạc
        playBtn.onclick = function (){
            if(_this.isPlaying){               
                audio.pause();
            }
            else{                
                audio.play();                
            }
        }

        // khi bài hát được phát
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing');
        }

        //khi bài hát bị pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercentage = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercentage
            }
            _this.displayRemainTime();
        }

        // khi tua bài hát
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }

        // next bài hát
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.nextSong();
            }
            audio.play();
            _this.render();
        }

        // prev bài hát
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.prevSong();
            }
            audio.play();
        }

        // random bài hát
        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // xử lý next sau khi bài hát kết thúc
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }
        }

        // lặp lại một bài hát
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat ;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat );
        }


        // lắng nghe và click vào playlist
        playList.onclick = function(e){
            const songNode = e.target.closest('.song-img:not(.active)');//xử lý khi click vào song
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();

            }
        }


        // Bật tắt volume
        volumeIcons.onclick = function(){
            _this.isMute = !_this.isMute;
            player.classList.toggle("active", _this.isMute);
            if(_this.isMute){
                audio.volume = 0;
                volumeProgress.value = 0;
            }
            else{
                audio.volume = _this.volume/100;
                volumeProgress.value = _this.volume
            }
        }

        // tăng giảm âm lượng
        volumeProgress.onchange = function(e){
            _this.volume = e.target.value;
            audio.volume = e.target.value/100;
            _this.setConfig('isMute', _this.isMute);
            if(e.target.value == 0){
                player.classList.add('active');
                _this.isMute = true;
            }
            else{
                player.classList.remove('active');
                _this.isMute = false;
            }

        }


        //toast
        $$('.js__toast').forEach((item,index) => {
            item.onclick  = function(){
                _this.showToast();
            }
        })


    },

    loadCurrentSong: function(){        
        songImage.src = this.currentSong.image;
        songName.textContent = this.currentSong.name;
        songSinger.textContent = this.currentSong.singer;
        this.displayDurationTime();
        audio.src = this.currentSong.path
    },

    loadConfig: function(){
        app.isRandom = this.config.isRandom
        app.isRepeat = this.config.isRepeat
        
    },

    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            _this.currentSong = 0;
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            _this.currentSong = this.songs.length;
        }
        this.loadCurrentSong()
    },

    playRandomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex)

        app.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    //định dạng thời gian
    formatTime: function(number) {
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes *60);
        return `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
    },

    // hiển thị thời gian
    displayRemainTime: function(){
        currentTime.textContent = this.formatTime(audio.currentTime)
    },


    displayDurationTime: function(){
        durationTime.textContent = this.currentSong.duration;
    },


    // ------------- Hiệu ứng slideshow ------------- 
    makeSlides: function(amountSlideAppear){
        const widthItemAndMargin = slides.offsetWidth / amountSlideAppear;
        let widthAllBox = widthItemAndMargin * listSlides.length;
        wrappperBox.style.width = `${widthAllBox}px`;

        listSlides.forEach(slide => {
            slide.style.marginRight = `25px`;
            slide.style.width = `${widthItemAndMargin - 25}px`;
        });

        let count = 0;
        let spacing = widthAllBox - widthItemAndMargin * amountSlideAppear;


        //PrevSlides
        arrowPrev.addEventListener('click', () => {
            count += widthItemAndMargin;
            if(count > spacing){
                count = 0;
            }
            wrappperBox.style.transform = `translateX(${-count}px)`;
        });


            //NextSlides
            arrowNext.addEventListener('click', () => {
            count -= widthItemAndMargin;
            if(count < 0){
                count = spacing;
            }
            wrappperBox.style.transform = `translateX(${-count}px)`;
        });


    },


    // ---------------- Tabs Songs, Albums ----------------
    tabUi: function(){
        tabTitle.forEach((tab, index) => {
            const pane = panes[index];

            tab.onclick = function(){
                $('.new__release-title.active').classList.remove('active');
                $('.tab-pane.active').classList.remove('active');

                this.classList.add('active');
                pane.classList.add('active');
            }
        })
    },


    // ---------------- Body item (Discovered, Individual) ----------------
    bodyUI: function(){
        headerTitle.forEach((tab, index) => {
            const bodyItem = bodyList[index];

            tab.onclick = function (){
                $('.header__menu-item1.active').classList.remove('active');
                $('.body-item.active').classList.remove('active');

                this.classList.add('active');
                bodyItem.classList.add('active');
            }

        })
    },


    // ---------------- Toast Message ----------------
    
    showToast: function(){
        if(mainToast){
            const toast = document.createElement('div');
            toast.classList.add('toast')
            
            // auto remove toast
            const autoRemoveID = setTimeout(function(){
                mainToast.removeChild(toast);
            },3000);
            
            //remove toast
            toast.onclick = function(e){
                if(e.target.closest('.toast__close')){
                    mainToast.removeChild(toast);
                    clearTimeout(autoRemoveID);
                }
            }

            toast.style.animation = `slideToLeft ease 0.3s, fadeOut linear 1s 3s forwards`;
            toast.innerHTML = `
            <div class="toast__icon">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <div class="toast__body">
                <p class="toast__msg">Chức năng này đang xử lý, vui lòng quay lại sau!</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            `;
            mainToast.appendChild(toast);

        }
    },

    // ---------------- ZingChart ----------------
    zingChart: function(){
        const labels = [ '23:00','01:00','03:00','05:00','07:00','09:00','11:00','13:00','15:00','17:00','19:00','21:00'];
        const data ={
            labels: labels,
            datasets: [
                {
                    label: 'Em nên dừng lại',
                    backgroundColor: '#ffffff',
                    borderColor:  'blue',                   
                    data: [ 29,28,29,31,34,33,33,32,30,32,31,32],
                    tension: 0.5,
                    color: '#ebe6e6'
                    
                },
                {
                    label: 'Vì mẹ anh bắt chia tay',
                    backgroundColor: '#ffffff',
                    borderColor:  'green',
                    data: [ 28,29,30,32,33,32,32,31,29,30,31,31],
                    tension: 0.5,
                    color: '#ebe6e6'


                },

                {
                    label: 'Thương em',
                    backgroundColor: '#ffffff',
                    borderColor:  'red',
                    data: [ 27,29,30,30,32,31,30,29,28,29,30,29],
                    tension: 0.5
                },
                        
            ],
            
        }
        window.onload = new Chart(lineChart,{
            type: 'line',
            data: data,
            responsive: true,
        })
    },    
 

    
    // hiển thị quảng cáo  
    showAdvertisement: function(){
        advertisement.classList.add('open');
        const autoTime = setInterval(function(){
            advertisement.classList.remove('open');
        }, 10000);

        advertisementClose.onclick = function(){
            advertisement.classList.remove('open');
            clearInterval(autoTime);
        }  

    }, 

    start: function (){
        this.loadConfig();
        this.defineProperties(); // định nghĩa các thuộc tính cho object
        this.render();
        this.handleEvents(); // xử lý các sự kiện
        this.loadCurrentSong(); //thông tin bài hát đầu tiên khi chạy
        this.playRandomSong(); //
        this.displayDurationTime();

        this.bodyUI();
        this.tabUi();
        this.makeSlides(3);
        this.zingChart();
        this.showAdvertisement();

        

        //hiển thị trạng thái ban đầu của btn Repeat, Random
        randomBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle('active', app.isRepeat);
    }
}

app.start();
