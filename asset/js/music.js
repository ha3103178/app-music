const PlAYER_STORAGE_KEY = 'Playlist Song'

const player = document.querySelector('.player')
const nameSong = document.querySelector('.play-name-song')
const cd = document.querySelector('.cd')
const cdThumb = document.querySelector('.cd-thumb')
const audio = document.querySelector('#audio')
const playBtn = document.querySelector('.btn-toggle-play')
const progress = document.querySelector('#progress')
const nextBtn = document.querySelector('.btn-next')
const prevBtn = document.querySelector('.btn-prev')
const randomBtn = document.querySelector('.btn-random')
const repeatBtn = document.querySelector('.btn-repeat')
const playlist = document.querySelector('.playlist')    
const playDuration = document.querySelector('.player-duration')
const playRemaining = document.querySelector('.player-remaining')



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
      {
        name: "Nevada",
        singer: "Vicetone, Cozi Zuehlsdorff",
        path: "./asset/mp3/Nevada-Monstercat-6983746.mp3",
        image: "./asset/img/nevada.jpg"
      },
      {
        name: "Summertime",
        singer: "K-391",
        path: "./asset/mp3/Summertime-K391.mp3",
        image: "./asset/img/summertime.jpg"      
      },
      {
        name: "Monody",
        singer: "TheFatRat, Laura Brehm",
        path: "./asset/mp3/Monody-TheFatRatLauraBrehm-4174394.mp3",
        image: "./asset/img/monody.jpg"      
      },
      {
        name: "Mơ hồ",
        singer: "Bùi Anh Tuấn",
        path: "./asset/mp3/Mơ_hồ.mp3",
        image: "./asset/img/mơ hồ.jpg"      
      },
      {
        name: "Lemon Tree",
        singer: "Fools Garden",
        path: "./asset/mp3/LemonTree-FoolsGarden_45ena.mp3",
        image: "./asset/img/lemon tree.jpg"      
      },
      {
        name: "Lemon Tree",
        singer: "Fools Garden",
        path: "./asset/mp3/LemonTree-FoolsGarden_45ena.mp3",
        image: "./asset/img/lemon tree.jpg"      
      },
      {
        name: "Nevada",
        singer: "Vicetone, Cozi Zuehlsdorff",
        path: "./asset/mp3/Nevada-Monstercat-6983746.mp3",
        image: "./asset/img/nevada.jpg"
      },
      {
        name: "Summertime",
        singer: "K-391",
        path: "./asset/mp3/Summertime-K391.mp3",
        image: "./asset/img/summertime.jpg"      
      },
      {
        name: "Monody",
        singer: "TheFatRat, Laura Brehm",
        path: "./asset/mp3/Monody-TheFatRatLauraBrehm-4174394.mp3",
        image: "./asset/img/monody.jpg"      
      },
      {
        name: "Mơ hồ",
        singer: "Bùi Anh Tuấn",
        path: "./asset/mp3/Mơ_hồ.mp3",
        image: "./asset/img/mơ hồ.jpg"      
      },
      {
        name: "Lemon Tree",
        singer: "Fools Garden",
        path: "./asset/mp3/LemonTree-FoolsGarden_45ena.mp3",
        image: "./asset/img/lemon tree.jpg"      
      },
      {
        name: "Lemon Tree",
        singer: "Fools Garden",
        path: "./asset/mp3/LemonTree-FoolsGarden_45ena.mp3",
        image: "./asset/img/lemon tree.jpg"      
      }
    ],
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PlAYER_STORAGE_KEY)
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `;
        });
        document.querySelector(".playlist").innerHTML = htmls.join("");
    },
    defineProperties: function() {
      Object.defineProperty(this, 'currentSong', {
        get: function() {
            return this.songs[this.currentIndex]
        }
      })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        
        // xử lý cd
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
            }
        }

        // phát bài hát
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        
        //pause bài hát 
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi next song
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }   else{
                _this.nextSong() 
            }
            audio.play()    
            _this.render()
        }

        // Khi prev song
        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }   else{
                _this.prevSong() 
            }
            audio.play()    
            _this.render()
        }

        // random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent 

                const currentMinute = Math.floor(audio.currentTime / 60);
                const currentSecond = Math.floor(audio.currentTime % 60);
                playDuration.textContent = `0${currentMinute}:${currentSecond > 9 ? currentSecond : '0' + currentSecond}`;

            }
        }

        // Xử lí khi tua
        progress.oninput = function(e) {
            const seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime
        }

        //  repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play()
            }else {
                nextBtn.click()
            }            
        }

        // Khi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if(songNode || e.target.closest('.option')) {
                // khi click song
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }

            // khi click option
        }

        audio.onloadeddata = function() {
            _this.songTime = audio.duration.toFixed()
            const second = _this.songTime % 60;
            playRemaining.textContent = `0${Math.floor(_this.songTime / 60)}:${second > 9 ? second : '0' + second}`;
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            if ((this.currentIndex) <= 2) {
                document.querySelector('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            } else {
                document.querySelector('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }
        }, 400)
    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        this.scrollToActiveSong()
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length - 1){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0 ){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    repeatSong: function() {
        this.loadCurrentSong()
    },
    start: function() {
        this.loadConfig();

        this.defineProperties();

        this.handleEvents();

        this.loadCurrentSong(); 

        // render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
}

app.start();
playRemaining.textContent = 123
