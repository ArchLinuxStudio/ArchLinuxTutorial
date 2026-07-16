<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Live and multimedia production

This section will list the various types of high-quality software required for the direction of multimedia production, including for live broadcasting, video clipping, image editing and drawing.

## Live roller and Scrambling Scrambling.

Live and recorded on linux[obs-studio](https://www.archlinux.org/packages/community/x86_64/obs-studio/)Done, usage is largely consistent with Windows.

b The screen is available for live broadcast.[Scrap Library](https://www.danmaku.live/)It's a complicated history. V1 is in the warehouse.[Here.](https://github.com/pandaGao/bilibili-live-helper)But the author says no more updates. The author of the v2 version is currently not open and says later[It won't be updated.](https://t.bilibili.com/378501835576827480)I don't know. AUR:[bilibili-live-helper-bin](https://aur.archlinux.org/packages/bilibili-live-helper-bin/)I don't know.

There's one more.[bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat)It's a projectile of a browser, and it's modelled on youtube's screen style, and it's the basis of a lot of projectile software, which is used directly on web. Other platforms like B live, twitch, but you need to look for different bullet plugs, for example, on twitch.[This article.](https://www.bilibili.com/read/cv10092277/)I don't know.

> The default obs-studio in the official repository of bilibili-live-chat, etc., does not have this function, if you want to use bilibili-live-chat, install the AUR[obs-studio-browser](https://aur.archlinux.org/packages/obs-studio-browser/)

If you use a newer British Vidak card, you can use the NVENC encoder, which will significantly reduce the pressure of cpu during live broadcasting or recording, as can be seen in more detail.[NVIDIA NVENC OBS Guide](https://www.nvidia.cn/geforce/guides/broadcasting-guide/)

Note that if you use qv2ray+cgproxy to open a transparent agent, add obs to /etc/cgproxy/config.json 's program noproxy value.

## Video production clips and effects

Video clips and production recommendations for free software[shotcut](https://www.archlinux.org/packages/community/x86_64/shotcut/)I don't know. It meets most of the video editing needs. Same software and...[kdenlive](https://www.archlinux.org/packages/extra/x86_64/kdenlive/)and[mkvtoolnix](https://archlinux.org/packages/extra/x86_64/mkvtoolnix-gui/)I don't know.

Some KDE aids are useful when video recording. Found Workspace Behaviour - > Desktop special effects in KDE system settings, ticked for accessibility`鼠标定位`and`鼠标点击动效`Two, and use. Both settings highlight mouse positions and click effects in video production and are useful for video production.

For keyboard input, you can install packages[screenkey](https://archlinux.org/packages/community/any/screenkey/), it can display the keyboard typer on the display screen, which is equally useful for video production.

## Mapping, cartography and restoration

Can not open message[gimp](https://www.archlinux.org/packages/extra/x86_64/gimp/)I don't know. If you need to match the tab, you can use it.[krita](https://www.archlinux.org/packages/extra/x86_64/krita/), krita also provides some mapping. Vector picture operation available[inkscape](https://www.archlinux.org/packages/extra/x86_64/inkscape/)

[Aseprite](https://www.aseprite.org/)It's a pixel art drawing tool that can be installed with yay[aseprite](https://aur.archlinux.org/packages/aseprite/)I don't know.

[RawTherapee](https://archlinux.org/packages/community/x86_64/rawtherapee/)is a free open source cross-platform RAW image processor.

[hugin](https://archlinux.org/packages/community/x86_64/hugin/)It is an open source software that allows images to be synthesized in depth, and images to be spelled together, which replaces the photoShop automatic alignment layer and automatically merge layer.

As for format conversion, it is available[imagemagick](https://archlinux.org/packages/extra/x86_64/imagemagick/)for the conversion of the convert function between photo formats.

Hand-painting and various hand-written needs that can be tried[rnote](https://archlinux.org/packages/community/x86_64/rnote/)

## Modelling

- [blender](https://archlinux.org/packages/community/x86_64/blender/)Strong 3D modelling software
- [Sweet Home 3D](https://archlinux.org/packages/community/x86_64/sweethome3d/)Sweet Home 3D is a free home-based assistive design software. It helps you to design and set your furniture through a two-dimensional home plan. It also provides a three-dimensional view of the entire layout.
- [Synfig Studio](https://archlinux.org/packages/community/x86_64/synfigstudio/)Synfig Studio is a free open source 2D animation software used to create animations of film quality using vectors and bitmap drawings.

## Audio

The following software is available for specialized audio production.

- [Kwave](https://archlinux.org/packages/extra/x86_64/kwave/)Kwave is a free and open-source audio editing software developed by KDE to record, play, import and edit many audio files, including multi-channel files.
- [lmms](https://archlinux.org/packages/community/x86_64/lmms/)LMMS is a free open source and cross-platform composer. Music is created through the production of melody and rhythm, synthesis and mixing of audio, organization of audio clips, etc.
- [carla](https://archlinux.org/packages/community/x86_64/carla/)Carla is a fully functional modular audio plugin host that supports many audio drives and plugin formats.
- [Ardour](https://archlinux.org/packages/community/x86_64/ardour/)Ardour is a free open source software that allows you to record, edit and mix on Linux.
- [vcvrack](https://aur.archlinux.org/packages/vcvrack-bin/)VCV Rack is an open-source, visualized, modular sound synthesiser.
- [Mixxx](https://archlinux.org/packages/community/x86_64/mixxx/)Mixx is a tool for DJ to use digital music files for creative live mixing.
- [MuseScore](https://archlinux.org/packages/community/x86_64/lmms/)MuseScore is a free open source spectroscopy software developed by Muse Group across platforms.
- [SoundConverter](https://archlinux.org/packages/community/any/soundconverter/)SoundConverter is an audio file converter for the GNOME desktop (this does not affect use in the Plasma desktop environment).
- [Reaper](https://archlinux.org/packages/community/x86_64/reaper/)REAPER is a complete computer digital audio production software that provides a complete set of multi-track audio and MIDI audio recordings, editing, processing, mixing and mother-tape production tools. 

## UI/UX Design

- [figma-linux](https://github.com/Figma-Linux/figma-linux)Figma online version, or use an unofficial Linux figma desktopend
- [Akira](https://aur.archlinux.org/packages/akira/)UI/UX Design Linux Native Application with Vala and GTK

## Subtitle Production

In general, a video with a srt subtitle on the outside is more common. Here's how to add subtitles to the YouTube video.  
The first thing to do is download a video subtitle, which can be expanded by a program:[YouTubeTM Double Subtitles](https://chrome.google.com/webstore/detail/youtube-dual-subtitles/hkbdddpiemdeibjoknnofflfgbgnebcm)You can download the subtitle files you need. If you have more convenient downloads, you're welcome to tell us.  
This is followed by a re-blue of subtitles and videos. MKVToolNix can only do those separate subtitles, but some video sites, such as site B, need to be uploaded, and for better compatibility, it is recommended that videos and files be re-recorded. Operation with ffmpeg:

```bash
ffmpeg -i input.mp4 -vf subtitles=input.srt output.mp4
```

If bilingual subtitles (which are displayed instead of subtitle tracks) are required, when youtube chooses to translate automatically, clicking on Chinese, such as video support, will result in the download of bilingual subtitles. If the video does not support the downloading of bilingual subtitles, you can use two ffmpeg commands, the first main subtitles and the second subtitles. The first operation uses MarginV to distinguish vertically. More parameters to refer to ffmpeg documents.

```bash
ffmpeg -i hack.mp4 -strict -2 -vf subtitles=hack_zh.srt:force_style='Fontsize=20\,Fontname=FZYBKSJW--GB1-0\,MarginV=30\,Bold=-1\,BorderStyle=1' -qscale:v 3 hack_with_zh.mp4
ffmpeg -i hack_with_zh.mp4 -strict -2 -vf subtitles=hack_en.srt:force_style
='Fontsize=15\,Fontname=FZYBKSJW--GB1-0\,Bold=-1\,BorderStyle=1' -qscale:v 3 hack_with_double_subtitles.mp4
```

In addition, ffmpeg can perform many operations such as transcode, which is a very powerful tool and an important component of many audio and video software. More on ffmpeg self-searchable.

## The material from the visual novel.

Most commonly used[GARbro](https://github.com/morkt/GARbro), but it can't be used properly under linux through the wine. This provides a cross-platform gal game content extraction tool[arc_unpacker](https://aur.archlinux.org/packages/arc_unpacker-git/)I don't know. Detailed usage allows you to view its gthub.

<!-- 如果你需要功能更加强大的软件，可以尝试免费使用的专有软件[davinci-resolve](https://aur.archlinux.org/packages/davinci-resolve/)<sup>AUR</sup>或者其收费版[davinci-resolve-studio](https://aur.archlinux.org/packages/davinci-resolve-studio/)<sup>AUR</sup>。达芬奇是一个特效、剪辑、调色、配音的综合体软件。需要注意的是，Linux 下免费版达芬奇支持的编解码格式有限[[1]](https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_15_Supported_Codec_List.pdf)。

> 因为达芬奇没有编译入 fcitx 模块，所以无法输入中文。正常来说只能等待新版达芬奇加入这个模块。喜欢折腾的可以尝试下老 K 给出的[魔改解决方案](https://www.csslayer.info/wordpress/fcitx-dev/a-case-study-how-to-compile-a-fcitx-platforminputcontext-plugin-for-a-proprietary-software-that-uses-qt-5/) -->
