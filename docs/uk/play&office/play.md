<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Entertainment software

## Webwalk speeds up.

Network acceleration has been a challenge for Internet trips on Linux, especially when some of the clothes are on the Net. Here's some ideas to speed up the Internet under Linux.

- Some airports provide Internet games nodes, which are specifically designed to optimize games, limit traffic and increase multipliers, and generally have a better acceleration effect. Cooperate in Linux[Transparent Agent](/uk/advanced/transparentProxy), while opening proxy acceleration for UDP traffic, you can optimize Internet speed.
- Some mid-end or high-end routers will incorporate some of the network accelerators that are common on the market. If you have this function on the router, you can directly use the internal accelerator accelerator to speed up the flow of your network. Or you can use openwrt to cooperate with the installation of accelerator plugins that support openwrt. Do not use the easy uu router acceleration plugin, which wrongly identifies Linux PC as an Android mobile phone, and according to its logic, if the device is identified as a cell phone, it can only speed up hand-swam and not the PC game. Currently, the web-based uu accelerator has removed Linux PC from the identification range, using other branded router accelerators if needed.
- Webwalking, which is common on the market at virtual machines or at Wine, can also theoretically accelerate the result. At present, however, implementation is complex and theoretically feasible, and more convenient tools may emerge in the future. It's about the principles.[Wine to study: Allows the Windows version of the web accelerator to work under Linux](https://hu60.cn/q.php/xsBEbMHq-5hkgyEFTaIlwB-00AAA/bbs.topic.95016.html)and[Use Windows version web accelerator in Linux via virtual machine](https://hu60.cn/q.php/bbs.topic.95932.html)

## Native Warehouse Game

Arch Linux Official Repository and AUR have some original supported games listed below

- [shattered-pixel-dungeon](https://aur.archlinux.org/packages/shattered-pixel-dungeon/)Broken pixel dungeon, survival game
- [0ad](https://archlinux.org/packages/extra/x86_64/0ad/)Called the Open Age of the Empire.
- [openra](https://archlinux.org/packages/community/any/openra/)Open source of Red 1 achieved

## Steam

[Official documents](https://wiki.archlinux.org/index.php/Steam)

Some fonts and drivers already`新手上路`chapter. Please check yourself if there are installation problems.

In addition, certain games can be used as end-uses if there are problems with starting or playing`steam`Commands to start the steam client and to observe terminal error when the game crashes. It is generally the result of a lack of some kind of dependency, which can be installed on its own, depending on the circumstances. In the meantime,archlinuxThe official file also provides one.[Wrong Page](https://wiki.archlinux.org/index.php/Steam/Game-specific_troubleshooting)Record some game crash solutions.

Install Steam<sup>Monochrome</sup>:

```bash
sudo pacman -S steam
```

The game on steam can be divided into those supported by Linux, and through[Steam Play](https://wiki.archlinux.org/index.php/Steam#Proton_Steam-Play)Play two categories. Steam Play (Proton) is based on Wine, which allows you to play a game upstream of Linux that only supports Windows platforms. A game on a non-Linux platform with a level of playability running through Steam Play, by[protondb](https://www.protondb.com/)This site is consulted. If there's a problem with playing a game, you can also find a way to modify the games that the players publish. Sometimes the latest version of Proton may have problems, so you can try other versions yourself.

In addition, there are official Proton versions of fork on github, such as[Proton GE](https://github.com/GloriousEggroll/proton-ge-custom), some extra games can be supported, officially not supporting or supporting imperfect games. It is also simple to use, according to official documents, to download releasing packages to a given location and to select a specific version of the GE programton after restarting steam.

If some game starters cannot start, you can try to directly execute the actionable files of the game body in the game directory.

There's something you can ask for. Like V Society[csgo repository](https://github.com/ValveSoftware/csgo-osx-linux/issues)

The recent steam official proton cannot correctly detect the system fsync, still starts the game in esync mode. The program that replaces the GE version can correctly detect and start the game using fsync mode.

> Game lock-up solution: Keep your steam under an agent of a country like Japan. Add a game to the shopping cart, change it to Japan in the upper right corner of the shopping cart, and then visit the game in the locked area, so you can browse and buy.

## Lutris

Lutris, based on Wine, offers a large number of game solutions under Linux. It's all you've got for Wine, all you need to do is set up a game. Usually, additional configurations are rarely required. Enter[Network of officials](https://lutris.net/)Search the top right for the game you want to play. Click on the game page to see an install button on the right side of the corresponding version, and when you click, you can pull up Lurtis for installation. Let's do this before we play.[Driver](https://github.com/lutris/docs/blob/master/InstallingDrivers.md)and[Dependency](https://github.com/lutris/docs/blob/master/WineDependencies.md)I don't know. Note that the two documents do not list the two optional installation items vkd3d and lib32-vkd3d, but most large games are currently required to install both packages and readers need to add them as needed. At the same time, in Lutris, the choice is to open Esync or Fsync according to the type of container.

In Lutris, there are generally player uploads on various games pages. If you cannot run, you can look at the history of Issue, including those already marked as solved.

Check your proxy settings if you find it still impossible to land some games. For example, you're a national uniform account, but the agent is Japanese. It's unlandable and can try again with a Hong Kong agent.

If you cannot update the game, set the Wine version to the system's Wine status version when you need to update the game. If the latest Wine-Stagging version is still flashing, you can return to the previously available container version. If it is still not possible to update, try to re-install the game starter. When the game needs to be started after updating, set the wine version to a Lutris custom version.

If you can't start a flashback, you can try to start Lutris on the command line and then start the game. If the game starts in the starter or goes off, you can try to change the Lutris container starter file from the starter to the executable of the game body. There's another more general way to use Lutris.`Run EXE inside wine prefix`, and then choose the game body to pass the validation.`Run EXE inside wine prefix`The position is below Lutris, click on the glass, last.

It is also possible to install in the same container if the various game plugins are customarily used.

## Native Wine

Installation with Native[Wine](https://wiki.archlinux.org/index.php/Wine)You can also run the Windows game, but in many cases you have to deal with your dependence under Windows.[winetricks](https://archlinux.org/packages/multilib/x86_64/winetricks/)I don't know. It's a time-consuming and labor-intensive way to run small games or gals that don't have to deal with dependency.

Terminal runs Winecfg, which opens the wine settings page, and installs the missing packages according to the terminal hint.

## Galgame

This subsection describes possible problems with Wine running Galgame.

If there is a font problem in some languages, the most immediate method is to place the required font in the font directory of the container. The default directory for Wine is`~/.wine`I don't know.

Play games with Wine may appear[GStreamer](https://wiki.archlinux.org/title/GStreamer)Problems with missing plugins, e.g.

```bash
Missing decoder: Advanced Streaming Format (ASF) (video/x-ms-asf)
```

Errors may remain after installation of various plugins according to Wiki, as most Galgame needs 32-bit compatibility libraries, while the current gst32-bit compatibility libraries in Arch Linux official Multilib repository are incomplete, such as currently missing`lib32-gst-plugins-ugly`This package, which currently exists only in AUR, has several problems with its PKGBUILD that make it impossible to install it directly. The ASF exists in this package and the missing cause this error. The solution is as follows:

First of all,`lib32-gst-plugins-ugly`One of the dependents.`lib32-lv2`There is a build spell check problem. Will`lib32-lv2`Repository line changes its PKGBUILD file when it arrives locally, removes its check section and then uses`makepkg -si`Manually install it.

Next,`lib32-gst-plugins-ugly`He relied on another bag.`lib32-shaderc`The package was built with the same error, and it wasn't necessary, so it was directly`lib32-gst-plugins-ugly`, and then manually install it.

Finally, query by Idd command, currently`lib32-gst-plugins-ugly`libvpx.so.8 is not available because of the current`lib32-libvpx`libvpx.so in the package has been updated to libvpx.so.9. This will solve the problem by creating a symbol link to libvpx.so.9.0.0 in/usr/lib32 folders. Similar problems could be resolved in descending order as the version did not match.

Ref:

- https://bbs.archlinux.org/viewtopic.php?id=249982
- https://archlinux.org/packages/?q=gst
- https://aur.archlinux.org/packages/lib32-gst-plugins-ugly
- https://docs.usebottles.com/faq/video-gstreamer-problems

## Performance enhancement

Turning off KDE 's synthesiser (Compositor) will significantly improve game performance and solve problems such as tearing images apart.

ref: https://linux-gaming.kwindu.eu/index.php?title=Improving_performance

Some games, such as Total War: THREE KINGDOMS, can try to regulate the cpu frequency regulator if they encounter performance problems[[1]](https://support.feralinteractive.com/docs/zh_cn/threekingdomstw/1.0.15/linux/faqs/?access=zooevrj6xb&utm_source=game_linux&utm_medium=link&utm_campaign=game_linux_threekingdomstw_support#i_linux_cpu_governor)I don't know.

[GameMode](https://github.com/FeralInteractive/gamemode)It is a comprehensive game performance adjustment software that provides multiple game performance optimization functions. You can look for details on the gethub page if you want.

## Performance monitoring

Similar to the performances shown in the microstar Afterburner software, Linux has a similar software that monitors the computer performances in the game called[MangoHud](https://github.com/flightlessmango/MangoHud)I don't know. Usage can be found on this item readme. In ArchLinux, install packages mangohud and lib32-mangohud.

In addition, MangoHud officially provides graphical parameter setting software[GOverlay](https://github.com/benjamimgois/goverlay#arch--manjaro--other-arch-derivatives), you can choose to install it.

## Optional core replacement

Generally, a kernel game using fsync's patch will perform better. Especially in some of the .Net-based wine games, fsyncs will be clearly enhanced.[[1]](https://github.com/ValveSoftware/Proton/issues/3706#issuecomment-636632984)I don't know. Currently, the Linux kernel does not have a fsync function and can replace the zen kernel.

```bash
sudo pacman -S linux-zen linux-zen-headers
```

grub can be updated once installed.

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> Remember to replace the driver with the corresponding dkms version, if you use the British Wyda spectrometer. Generally, newer graphic cards can be installed with nvidia-dkms.

## Game handle

The best handle for compatibility in Arch Linux is the Xbox handle, the rest of which is not recommended. If you connect with a wireless adapter, install it.[xone](https://github.com/medusalix/xone)I don't know. If you use Bluetooth connection, install[xpadneo](https://aur.archlinux.org/packages/xpadneo-dkms)I don't know. For Bluetooth connection, additional configuration is required.

1. The UserspaceHID first needs to be enabled, if not, the handle will not be properly connected and will start to recycle and disconnect, and the Xbox button will continue to blink. Edit profile:

```bash
vim /etc/bluetooth/input.conf
```

Get rid of it.`UserspaceHID`, and replace the value with the true.

2. This is followed by some settings in the main bluetooth configuration file so that xpadneo can work as expected and the input delay needs to be resolved. Edit main file:

```bash
vim /etc/bluetooth/main.conf
```

Replace the following parameter with the following value

```bash
[General]
Privacy = device
JustWorksRepairing = always
Class = 0x000100
FastConnectable = true

[LE]
MinConnectionInterval=7
MaxConnectionInterval=9
ConnectionLatency=0
```

Finally restart the computer and connect it.

ref: https://www.reddit.com/r/linux_gaming/comments/smxqm2/how_to_use_xpadneo_with_an_xbox_series_controller/

## Gamescope

Gamescope is an independent compositer of game development supported by Valve, which solves the problem of displaying some games, such as some that are fully screened when they open virtual desktops, but still do not reach full screen expansion (which remains the low resolution of the original game). Gamescope can be used in lutis. Gamescope is still in its early stages.

Note that Emescope must be driven by a closed source, a nvidia-open open source not supported. Besides, you have to add kernel parameters.`nvidia-drm.modeset=1`I don't know.

Gamescap's predecessor, Xephyr, is at a standstill.

See Gamescope documents for details:https://wiki.archlinux.org/title/Gamescope

## protonhax

Sometimes it is necessary to run other programs in the Proton container, such as the modifyr. The current Proton default does not meet this demand. Use here[protonhax](https://github.com/aoleg94/protonhax)to complete this other running program in the same Proton container as the game.

```bash
yay -S protonhax
```

Set in Game Run Parameter`protonhax init %COMMAND%`Implementation`protonhax ls`Gets the game running. Last used` protonhax run <appid> <path/to/program>`Run other programs in the target packaging. More use can be made of project warehouse pages.

Ref: https://www.reddit.com/r/linux_gaming/comments/pxs5es/running_a_second_program_inside_a_proton_prefix/?rdt=44318
