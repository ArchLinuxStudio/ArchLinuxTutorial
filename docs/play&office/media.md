# 视频影音

本节记录在 arch linux 上观看影视，收听音乐等相关信息。

## 在线听歌与音频播放器

网络音乐收听可以使用网易或腾讯出品的[网易云音乐](https://aur.archlinux.org/packages/netease-cloud-music/)，[qq 音乐](https://aur.archlinux.org/packages/qqmusic-bin/)，但它们都年久失修，或者质量惨不忍睹。显然这些大公司是不会愿意向 Linux 桌面投放精力的，我们更推荐你来使用维护更到位的自由软件。

[yesplaymusic](https://github.com/qier222/YesPlayMusic) 是一款全平台的开源听歌软件，颜值高、无社交功能，并且是全网资源整合，推荐使用

```bash
yay -S yesplaymusic
```

[listen1](https://github.com/listen1/listen1_desktop) 是一款老牌的听歌软件，功能完善，同样资源全网整合，推荐使用

```bash
yay -S listen1-desktop-appimage
```

[Electron Netease Cloud Music](https://github.com/Rocket1184/electron-netease-cloud-music) 是一款用 Electron 和 Vue 编写的网易云音乐 Linux 客户端，支持歌曲下载，这是它的优势，但是曲库没有前两款软件齐全。

```bash
yay -S electron-netease-cloud-music
```
[FeelUOwn](https://github.com/feeluown/FeelUOwn) 是一个符合 Unix 哲学的跨平台的音乐播放器，安装简单，新手友好，默认提供国内各音乐平台插件。

```bash
yay -S feeluown
# 按需安装以下插件
yay -S feeluown-local feeluown-netease feeluown-qqmusic feeluown-kuwo
```

## 视频播放器

本地音视频播放一般使用 vlc 或 mpv

```bash
sudo pacman -S vlc #VLC 播放器
sudo pacman -S mpv #MPV 播放器
```

除此之外，如果你想收看在线影视资源，[zy-player](https://aur.archlinux.org/packages/zy-player-bin/)是一个很好的选择，它是一个跨平台视频资源播放器, 整合全网资源，可以播放一些电影。
