<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Video audio

This section is recorded on Arch Linux watching videos and listening to music and other related information.

## Online Audio and Audio Player

Online music listeners can use Internet access or e-mail products.[Internet cloud-like music](https://aur.archlinux.org/packages/netease-cloud-music/)I don't know.[qq Music](https://aur.archlinux.org/packages/qqmusic-bin/)However, they are both old and poor or of poor quality. Obviously, these big companies will not be willing to invest their energy on Linux desktops, and we recommend that you use free software to maintain better.

[yesplaymusic](https://github.com/qier222/YesPlayMusic)It's a platform-wide open-source singing software with high-value, non-social features and a web-based resource integration recommended for use

```bash
yay -S yesplaymusic
```

[listen1](https://github.com/listen1/listen1_desktop)It's an old musical software, fully functional, and the same resources are integrated and recommended for use.

```bash
yay -S listen1-desktop-appimage
```

[Electron Netease Cloud Music](https://github.com/Rocket1184/electron-netease-cloud-music)It is an online cloudy music Linux client that supports the downloading of songs, written by Electron and Vue, which is its advantage, but the curve library is not fully equipped with the first two.

```bash
yay -S electron-netease-cloud-music
```
[FeelUOwn](https://github.com/feeluown/FeelUOwn)It is a cross-platform music player with a simple, newer, newer setup, defaulting on the country ' s music platforms.

```bash
yay -S feeluown
# 按需安装以下插件
yay -S feeluown-local feeluown-netease feeluown-qqmusic feeluown-kuwo
```

## Video Player

Use vlc or mpv for local audio and video play

```bash
sudo pacman -S vlc #VLC 播放器
sudo pacman -S mpv #MPV 播放器
```

Besides, if you want to watch online video resources,[zy-player](https://aur.archlinux.org/packages/zy-player-bin/)It's a good choice, it's a cross-platform video resource player that integrates the entire web resources and can play some movies.
