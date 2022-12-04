# Games amd entertainment

## Online game network acceleration

For playing online games on Linux, network acceleration has always been a problem, especially when playing some online games on external servers. Here are some ideas to speed up online games under Linux.

- Some airports will provide game nodes for online games. These nodes are specially optimized for games, restricting traffic and increasing the magnification. Generally, a better acceleration effect can be obtained. Cooperate with [transparent proxy](/advanced/transparentProxy) in Linux, and enable proxy acceleration for UDP traffic at the same time, you can get the effect of optimizing the network speed of online games.
- Some mid-range or high-end routers have built-in online game accelerators that are common in the market. If your router has this function, you can directly use the built-in accelerator of the router to accelerate the online game traffic of the machine. Or you can also use openwrt to install accelerator plugins that support openwrt. Do not use the NetEase uu router acceleration plug-in, it will mistakenly identify the Linux PC as an Android phone. According to its logic, if the device is identified as a mobile phone, it can only accelerate mobile games but not PC games. At present, the NetEase uu accelerator has removed the Linux PC from the recognition scope. If necessary, please use other brands of router acceleration plug-ins.
- Executing common online game acceleration clients on the market in a virtual machine or wine can theoretically accelerate. But at present, it is more complicated to implement, which is theoretically feasible, and more convenient tools may appear in the future. For the principle, please refer to [Wine to be researched topic: Make the virtual network card mode of the Windows version of the online game accelerator work under Linux](https://hu60.cn/q.php/xsBEbMHq-5hkgyEFTaIlwB-00AAA/bbs.topic.95016.html) and [Using the Windows version of the online game accelerator through a virtual machine in Linux](https://hu60.cn/q.php/bbs.topic.95932.html)

## Native Linux game

There are some natively supported games in Arch Linux official repository and AUR, listed below

- [shattered-pixel-dungeon](https://aur.archlinux.org/packages/shattered-pixel-dungeon/) Shattered Pixel Dungeon Survival Game
- [0ad](https://archlinux.org/packages/community/x86_64/0ad/) Known as the Age of Open Source Empires
- [openra](https://archlinux.org/packages/community/any/openra/) Open source implementation of Red Alert 1

## Steam

[Arch Wiki: Steam](https://wiki.archlinux.org/index.php/Steam)

Some fonts and drivers have already been configured in the `Getting Started` section. If you have installation problems, please check yourself.

In addition, if some games have problems starting or playing, you can use the terminal to use the `steam` command to start the steam client, and observe the terminal error when the game crashes. Generally, it is caused by the lack of a certain dependency, and you can install the dependency yourself according to the specific situation. At the same time, the official archlinux documentation also provides a [error page](https://wiki.archlinux.org/index.php/Steam/Game-specific_troubleshooting), which records some solutions to game crashes.

To install Steam <sup>Proprietary</sup>:

```bash
sudo pacman -S steam
```

Games on steam can be divided into two categories: those with native Linux support, and those played through [Steam Play](https://wiki.archlinux.org/index.php/Steam#Proton_Steam-Play). Steam Play (Proton) is based on Wine and allows you to play Windows-only games on Linux. Regarding the degree of playability of games on non-Linux platforms running through Steam Play, you can check the website [protondb](https://www.protondb.com/). If you have a problem with a game, you can also find fixes for each game posted by players on this site. Sometimes there may be problems with the latest version of Proton, in which case you can try other versions yourself.

In addition, there are also some official Proton fork versions on github, such as [Proton GE](https://github.com/GloriousEggroll/proton-ge-custom), which can support some additional ones, which are not officially supported or are not fully supported. game. The usage method is also very simple. According to the official documentation, download the compressed package of the release to the specified location, and restart steam to select a specific version of GE proton.

If some game launchers cannot be started, you can go to the game directory and try to directly execute the executable file of the game itself.

If you have any questions, you can also go to github to query. For example, Valve's [csgo repository](https://github.com/ValveSoftware/csgo-osx-linux/issues)

The recent steam official proton can not correctly detect the system's fsync, and still start the game in esync mode. Replacing the GE version of the proton correctly detects and launches the game with fsync mode.

> Game lock solution: keep your steam under the proxy of a country, such as Japan. First add a game to the shopping cart, change the country and region in the upper right corner of the shopping cart to Japan, and then go to the locked game, you can browse and purchase.

## Lutris

Based on Wine, Lutris provides solutions for a large number of games under Linux. It has already configured everything related to Wine for you, you only need to install and play. Generally very little additional configuration is required. Go to the [official website](https://lutris.net/) and search for the game you want to play in the upper right corner. After clicking to enter the game page, you can see that there is an install button on the right side of the corresponding version. After clicking, you can pull up Lurtis to install it. Before playing the game, you must install the [driver](https://github.com/lutris/docs/blob/master/InstallingDrivers.md) and [dependency](https://github.com/lutris/docs/blob/master/WineDependencies.md). Note that the two optional installation items vkd3d and lib32-vkd3d are not listed in these two documents. However, most large-scale games currently need to install these two packages, and readers need to add and install them as needed. At the same time, in lutris, you need to choose to open Esync or Fsync according to the container type.

On each game page of Lutris, there are generally reports uploaded by players. If you encounter a situation that cannot be run, you can read the historical issues in detail, including those that have been marked as resolved.

If you find that you are still unable to log into certain games, check your proxy settings. For example, if you have an account of the national server, but the proxy is linked to Japan, it is impossible to log in. You can change to a Hong Kong proxy and try again.

If you can't update the game, when you need to update the game, set the Wine version to the system's Wine staging version. If the latest wine-staging version still crashes, you can go back to the previously available container version. If you still can't update, you can try reinstalling the game launcher. After the update is complete, when you need to start the game, set the wine version to the version that comes with Lutris.

If you encounter a situation where you cannot start the flashback, you can try to start Lutris on the command line, and then start the game. If starting the game in the launcher still crashes, you can try to change the startup file of the Lutris container from the launcher to the executable file of the game itself. There is another more general way, you can use the Lutris function `Run EXE inside wine prefix`, and then select the game body to pass the verification to play the game. The location of `Run EXE inside wine prefix` is below Lutris, click on the wine glass, the last one.

If you are used to using various game plug-ins, you can also install them in the same container, and the general functions can be used normally.

## Wine

Installing and using native [Wine](https://wiki.archlinux.org/index.php/Wine) can also run windows games, but in many cases you need to deal with the dependency problems under Windows by yourself. The commonly used tool is [winetricks](https://archlinux.org/packages/multilib/x86_64/winetricks/). This method is time-consuming and labor-intensive, and it is fine to only run small games or gals that do not need to deal with dependencies.

Run winecfg on the terminal, you can open the wine settings page, and follow the terminal prompts to install the missing packages.

## Galgame

This section describes possible problems with running Galgame with Wine.

If there are font problems for some languages, the most straightforward way is to place the required fonts in the container's font directory. The default directory for wine is `~/.wine`.

Running games with Wine may have issues with missing [GStreamer](https://wiki.archlinux.org/title/GStreamer) plugins, such as

```bash
Missing decoder: Advanced Streaming Format (ASF) (video/x-ms-asf)
```

After installing each plug-in according to the Wiki, the error may still exist, this is because most Galgame requires 32-bit compatible library, and the gst32-bit compatible library in the official Multilib repository of arch linux is not complete, such as the missing `lib32-gst- plugins-ugly` this package, this package currently only exists in the AUR, but has fallen behind. ASF is present in this package, so the absence causes this error.

Ref:

- https://bbs.archlinux.org/viewtopic.php?id=249982
- https://archlinux.org/packages/?q=gst
- https://aur.archlinux.org/packages/lib32-gst-plugins-ugly

## Performance improvement

When playing some games, such as "Total War: THREE KINGDOMS", if you encounter performance problems, you can try to adjust the cpu frequency regulator[[1]](https://support.feralinteractive.com/docs/zh_cn/threekingdomstw/1.0.15/linux/faqs/?access=zooevrj6xb&utm_source=game_linux&utm_medium=link&utm_campaign=game_linux_threekingdomstw_support#i_linux_cpu_governor).

[GameMode](https://github.com/FeralInteractive/gamemode) is a comprehensive game performance adjustment software, which provides a variety of game performance optimization functions. If necessary, you can check the github page for details.

## Performance monitoring

Similar to the performance display part of MSI's Afterburner software, there is also a similar software on Linux that can monitor computer performance in games, named [MangoHud](https://github.com/flightlessmango/MangoHud). The usage can be found in the readme of this project. In ArchLinux, install the packages [mangohud](https://aur.archlinux.org/packages/mangohud) and [lib32-mangohud](https://aur.archlinux.org/packages/lib32-mangohud).

In addition, MangoHud officially provides a graphical parameter setting software [GOverlay](https://github.com/benjamimgois/goverlay#arch--manjaro--other-arch-derivatives), which can be installed by yourself.

## Optional kernel replacement

In general, kernel games with patches that use fsync will perform better. Especially in some wine games using .Net, fsync will have a significant performance improvement[[1]](https://github.com/ValveSoftware/Proton/issues/3706#issuecomment-636632984). At present, the fsync function is not added to the Linux kernel, and the zen kernel can be replaced.

```bash
sudo pacman -S linux-zen linux-zen-headers
```

After the installation is complete, update grub again.

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

> If you use NVIDIA graphics card, remember to change the driver to the corresponding dkms version. Generally speaking, newer graphics cards can install nvidia-dkms.

## Gamepad

Under normal circumstances, the handle can be used directly by connecting to the computer through a data cable. Handles that support wireless (DUALSHOCK® 3, DUALSHOCK® 4, Xbox 360, Xbox One, 8BitDo, etc.) can also be connected directly via Bluetooth without additional operation.

Although wireless controllers can generally be directly connected via Bluetooth, there is usually a large delay in doing so. Use the [Xbox Wireless Adapter](https://www.microsoftstore.com.cn/accessories/microsoft-xbox-wireless-adapter) for a near-wired low-latency experience.

In order to use the Xbox Wireless Adapter under Arch Linux, a third-party open source driver [xow](https://github.com/medusalix/xow) needs to be installed.

1. Install [xow](https://aur.archlinux.org/packages/xow-git/)<sup>AUR</sup>:

   ```sh
   yay -S xow
   ```

2. Start the `xcow` service:

   ```sh
   sudo systemctl enable xow.service
   ```

3. Restart the computer, insert the Xbox wireless adapter and pair with the Xbox controller

The actual experience is no different from that under Windows. Latency-sensitive audio games (such as [Meow Run](https://store.steampowered.com/app/774171/Muse_Dash/)) can fine-tune the offset value in the game settings.
