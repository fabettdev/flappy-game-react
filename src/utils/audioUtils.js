import { Howl, Howler } from 'howler';

const splashSoundtrack = new Howl({
    src: ["/watery_cave.mp3"],
    loop: true,
    volume: 0.5,
    autoplay: true
})

const gameSoundtrack = new Howl({
    src: ["/game_music.mp3"],
    loop: true,
    volume: 0.3
})

const jumpSound = new Howl({
    src: ["/jump_sound.mp3"],
})

const waterJump = new Howl({
    src: ["/water_jump.wav"],
    volume: 0.2,
})

export function audioStart() {
    splashSoundtrack.play()
}

export function audioStop() {
    splashSoundtrack.stop()
}

export function gameStart() {
    gameSoundtrack.stop()
    splashSoundtrack.stop()
    gameSoundtrack.stop()
    waterJump.play()
    gameSoundtrack.play()
}

export function gameStop() {
    gameSoundtrack.stop()
}

export function jumpEffect() {
    jumpSound.play()
}