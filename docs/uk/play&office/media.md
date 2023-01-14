# Audio & Video

This section records related information about watching movies and listening to music on arch linux.

## Online music and audio player

To listen to online music, you can use [Netease Cloud Music](https://aur.archlinux.org/packages/netease-cloud-music/), [qq Music](https://aur.archlinux.org/packages/qqmusic-bin/) produced by NetEase or Tencent , but they are either in disrepair or of poor quality. Obviously these big companies are not willing to invest their energy in the Linux desktop, and we recommend you to use free software that is better maintained.

[yesplaymusic](https://github.com/qier222/YesPlayMusic) is a full-platform open source music listening software, with high appearance, no social functions, and integration of whole network resources, it is recommended to use

```bash
yay -S yesplaymusic
```

[listen1](https://github.com/listen1/listen1_desktop) is an old-fashioned music listening software with complete functions. The same resources are integrated across the entire network. It is recommended to use

```bash
yay -S listen1-desktop-appimage
```

[Electron Netease Cloud Music](https://github.com/Rocket1184/electron-netease-cloud-music) is a Netease Cloud Music Linux client written with Electron and Vue, which supports song download, which is its advantage , but the music library is not as complete as the first two software.

```bash
yay -S electron-netease-cloud-music
```

[FeelUOwn](https://github.com/feeluown/FeelUOwn) is a cross-platform music player that conforms to the Unix philosophy. It is easy to install, novice-friendly, and provides plug-ins for various domestic music platforms by default.

```bash
yay -S feeluown
# Install the following plugins as needed
yay -S feeluown-local feeluown-netease feeluown-qqmusic feeluown-kuwo
```

## Video player

Local audio and video playback generally uses vlc or mpv

```bash
sudo pacman -S vlc #VLC player
sudo pacman -S mpv #MPV player
```

Besides, if you want to watch online video resources, [zy-player](https://aur.archlinux.org/packages/zy-player-bin/) is a good choice, it is a cross-platform Video resource player, integrates the whole network resources, can play some movies.
