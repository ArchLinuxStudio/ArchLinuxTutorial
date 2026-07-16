<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Card Drive

It's 2022, and it's been very easy to install a graphic drive on Arch Linux. This paper distinguishes between two categories of nuclear core graphic cards and independent graphic cards, describing card-driven installation.**Note that by ensuring that you are equipped with scientific access in accordance with previous chapters of the Academy, that you have the necessary packages installed and then go down, and that you do not have multiple courses mixed up, you may have missed some of the operations of the Academy's pre-steps, thereby causing problems.**

> All AMD graphic cards recommend open source drivers. The British Weedness Card recommends the use of a closed source drive because of the low open source drive performance of the reverse project, and this paper only describes the British Weedness Drive installation. If you support the free software campaign, use, to the extent possible, the Intel and AMD graphic cards with the official support open source drive.

## Nuclear core graphics card

### Intel core card

[Official network documents](https://wiki.archlinux.org/index.php/Intel_graphics)

The Intel core card will be installed in the following packages.

```bash
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel
```

> `xf86-video-intel`Many of the distributions written in aarch wiki do not recommend their installation, but use xorg's modesetting drive (i.e. nothing). After our tests, it is true that the default modesetting drive is stable.

Note that only intel HD 4000 or more nuclei support vulkan.

### AMD core card

For AMD processors with nuclear core graphic cards, it is necessary first to determine what the Architecure is and then to decide what driver to install. Recommended in[Techpowerup website](https://www.techpowerup.com/)Inquiries are conducted and the information is very comprehensive. Once the frame of the graphic card is defined, it will be compared to the structure[This document](https://wiki.archlinux.org/index.php/Xorg#AMD)Decide what the driver is. ** For older graphic cards in GCN2.0 and below, the direct installation of open-source ATI drives is sufficient, and the previously closed-source old Catalest drives were abandoned in 2021. The old GCN2.0 and the following structures are not driven by open-source AMDGPU because they are of an experimental nature and require a variety of self-defined coding options and configurations, which are very cumbersome and cost-effective. ** For new types, i.e. GCN3 architecture and updated nuclear core graphic cards, it is sufficient to directly install the AMDGPU, i.e. the following packages.

```bash
sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon libva-mesa-driver lib32-libva-mesa-driver mesa-vdpau lib32-mesa-vdpau
```

- For example, your laptop cpu is now common AMD R7 4800 U, so it's marked Vega 8. By query, it is known that it is a GCN 5.0 structure, so you can choose to install an AMDGPU open source driver against anarch official document.
- And your desktop cpu, for example, is now common for the Rylon 5 3,400 G, and it's marked Vega 11. By query, it is known that it is a GCN 5.0 structure, so you can choose to install an AMDGPU open source driver against anarch official document.
- An older apu A10-9700 processor, and it's marked Radeon R7. By query, it is known that it is a GCN 2.0 structure, so you choose to install an ATI open source driver against anarch official document.

## Independent graphic card

This segment is divided into a presentation of the only independent graphic card (non-nucleus) and the simultaneous possession of an independent graphic card and a nuclear core graphic card.

### Imwida Independence Card

This section suggests looking at official documents and lists only the main graphic card series.[Official documents](https://wiki.archlinux.org/index.php/NVIDIA)

The newer independent graphic cards can be installed directly in the following packages.

```bash
sudo pacman -S nvidia nvidia-settings lib32-nvidia-utils #必须安装
```

If it's GeForce 630 or more to GeForce 920, install it.[nvidia-470xx-dkms](https://aur.archlinux.org/packages/nvidia-470xx-dkms/)<sup>AUR</sup>and its 32-bit support package. Use dkms to drive while needing heads.

```bash
yay -S nvidia-470xx-dkms nvidia-settings lib32-nvidia-470xx-utils linux-headers
```

If it's the GeForce 630 to the GeForce 400 series, install[nvidia-390xx-dkms](https://aur.archlinux.org/packages/nvidia-390xx-dkms/)<sup>AUR</sup>and its 32-bit support package. Use dkms to drive while needing heads.

```bash
yay -S nvidia-390xx-dkms nvidia-settings lib32-nvidia-390xx-utils linux-headers
```

The older card is directly used.[Open Source Driver](https://wiki.archlinux.org/index.php/Nouveau)It's okay.

```bash
sudo pacman -S mesa lib32-mesa xf86-video-nouveau
```

---

**The installation of a driver on a notebook with both a nuclear core card and a British independent card is a matter of concern to most people, and this is highlighted here.**

> Once again, remind us to set up a system based on the prefaces of this book and not to mix the curriculum.**Especially with some outdated curriculum.**I don't know. Particular attention needs to be paid to ensuring the installation of base-devel packages and the configuration of science-based online software, as well as the use of X11 mode.

[Official document of the In Weida Double-Specific Card Mode](https://wiki.archlinux.org/index.php/NVIDIA_Optimus) /// [optimus-manager official document](https://github.com/Askannz/optimus-manager/wiki)

In order to have both a nuclear core graphic card and a laptop unique to Inverda, it is equally necessary to install software packages in accordance with the above steps. It also requires the installation of optimus-manager. It can be easily switched between core and independent cards. Optimus-manager offers three models, single, single, and hybrid dynamic switching.

```bash
yay -S optimus-manager optimus-manager-qt
```

Restart is available when installation is complete. Upon completion of the optimus-manager installation, you can check your state before restarting, and manually place it as available. Search for optimus-manager in the menu bar after restarting. Sets the starter to start automatically in its settings.

```bash
sudo systemctl enable optimus-manager
```

At this point, you should be able to switch your graphic cards. If you have a problem, read the file of optimus-manager in detail. As there are too many questions, this paper does not describe them, and the document for optimus-manager is very detailed. Only a few more important concerns are listed here:

- If you need to switch between the single and the nuclei mode, be aware that you do not have all kinds of GPU monitoring plugins that can stop the card switching and lead to unexpected errors.
- Do not use Nvidia Control Panel`Save to X Configuration file`button. It leads to a conflict of configuration.
- When you switch between graphic cards, you can try to switch between tty1 tty2 if you are stuck or black screend after re-entry.
- If you install optimus manager and restart it, the black screen is dead, you can't get into the system, and it's probably the usual "ACPI ISSUE," which, in short, is a problem for laptop manufacturers. You can try to add a nuclear launch parameter to the internal core.`acpi_osi=! acpi_osi="Windows 2009"`Try it later.[[1]](https://github.com/Askannz/optimus-manager/wiki/FAQ,-common-issues,-troubleshooting#when-i-switch-gpus-my-system-completely-locks-up-i-cannot-even-switch-to-a-tty-with-ctrlaltfx)

Finally, the dynamic transition model is described in detail. In essence, it's official.[PRIME](https://wiki.archlinux.org/index.php/PRIME#PRIME_render_offload)Switches the closed source driven method. The same is true of the three environment variables that need to be set, or the command prime-run provided by the nvidia-prime package.

```bash
sudo pacman -S nvidia-prime
prime-run some_program #使用prime-run前缀来用独显运行某些程序
```

For AMD +N card unique readers, optimus-manager support for this portfolio is now published, the latest available version is 1.4.

---

**If you are not a strong energy efficiency control and battery life-oriented user, then you don't have to look down. If you are, then you need to try the right power management for your hardware and notebooks. This segment may lead to black screens, and the trial process may be long, and there may be problems.**

What power control does is to ensure that independent graphic cards are properly closed in a nuclear-only mode. In a hybrid mode, the Nvidia module is in fact always on and power control is not effective. It's really complicated, because there's a different combination of different graphic models and notebook models. In general, the most widely applied approach is bbswitch. However, it is still not recommended that it be installed in this manner, as certain particular hardware would be problematic, i.e. black screens. It is suggested here to follow the official file of optimus-manager step by step, and finally find the right way to manage the power of your own computer.**Here.[Documentation](https://github.com/Askannz/optimus-manager/wiki/A-guide--to-power-management-options)It has to be read in detail!**

Bbswitch, which applies to most notebooks, is used here. First install package bbswitch. If other kernels are used, the package bbswitch-dkms is installed.

```bash
sudo pacman -S bbswitch #安装 bbswitch 切换方式
```

Next right-click on the tray settings for optimus-manager. Switch method in Optimus tab selects Bbswitch.

### AMD independent graphic card

The AMD drive step is actually the same as the AMD core card, which requires the structure to be defined and the right driver installed to be selected. The real concern is how to switch between core and independent cards. Available[PRIME](https://wiki.archlinux.org/title/PRIME#For_open_source_drivers_-_PRIME)Double-point card switching for open-source drivers.

In addition, it is available`glmark2`I don't know.`DRI_PRIME=1 glmark2`Tests are conducted separately and individually, and one with a higher score is selected for use. Can be added to the start prefix of the steam game`DRI_PRIME=1 mangohud %command%`To use unique. (on[mangohud](/uk/play/software?id=性能监控)I don't know.

Another example of using an independent graphic card to run a steam game.

```bash
DRI_PRIME=1 steam steam://rungameid/570 #运行dota2
DRI_PRIME=1 steam steam://rungameid/730 #运行cs go
```

## Performance test

[Official documents](https://wiki.archlinux.org/index.php/benchmarking)I don't know.

The most traditional and well-known way to use it`glxgears`The order is tested and belongs to[mesa-utils](https://www.archlinux.org/packages/extra/x86_64/mesa-demos/)Bag. However, it only provides simple test scenes and frames showing that only a fraction of the current OpenGL functionality has been tested and that it is clearly inadequate. We recommend the following two tools.

### glmark2

Glomark offers a wealth of tests covering different aspects of graphic unit performance (buffering, building, lighting, texture, etc.), allowing for more comprehensive and meaningful testing. The frame rate is calculated separately for each test. Ultimately, the user obtained a score based on all previous tests. Package on archlinux[glmark2](https://aur.archlinux.org/packages/glmark2-git)<sup>AUR</sup>

### Unigine benchmark

The Unigine 3D engine is a more comprehensive benchmarking tool. So far, there are five versions, from old to new.

- sanctuary(2007)
- tropics(2008)
- heaven(2009)
- valley(2013)
- superposition(2017)

From[AUR](https://aur.archlinux.org/packages/?O=0&K=Unigine)Downloads all versions. They are proprietary software.

## Can not open message

In the case of Weeda Specs cards, this package provides a full display of the card information.

For AMD graphic cards, it's a little trouble to install the radeon-profile-git package by yay and install it with a radeon-profile-daemon-dependent process. , you can graphically view the amd graphic card information.[project address](https://github.com/marazmista/radeon-profile)

```bash
sudo systemctl enable --now radeon-profile-daemon.service
```

Note, do not change the auto low high in the lower left corner that bug will get stuck. At the same time, there may be errors in displaying visible occupancy on some models.

## Follow-up

If you're an ordinary user, your system is here. It's not too much to do with command lines, you can slowly explore this desktop environment for KDE, remember the following commands or Discover software upgrades.

```bash
sudo pacman -Syyu #更新官方仓库
yay -Syyu #同时更新官方仓库与AUR
```

Next, you can look at sections on entertainment, office, multimedia, etc. to see how more software is being installed and used. If you need to be a more professional person, read the progress and programming sections.
