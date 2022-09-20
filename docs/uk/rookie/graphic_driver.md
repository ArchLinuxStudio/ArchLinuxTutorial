# Graphics card driver

It's 2022 and the installation of graphics card drivers has become very easy on Arch Linux. This article distinguishes between core graphics cards and discrete graphics cards to describe the installation of graphics card drivers. **Note, make sure that you have installed and configured the scientific Internet according to the previous chapters of this tutorial, installed the necessary packages before proceeding down. certain operations, causing problems.**

> Open source drivers are recommended for all AMD graphics cards. It is recommended to use closed source drivers for NVIDIA graphics cards, because the performance of open source drivers for reverse engineering is too low, and this article only describes the installation of NVIDIA closed source drivers. If you support the free software movement, use Intel and AMD graphics cards with officially supported open source drivers whenever possible.

## HD Graphics

### Intel HD Graphics

[Official website documentation](https://wiki.archlinux.org/index.php/Intel_graphics)

Intel HD Graphics can install the following packages.

```bash
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel
```

> Many distributions written in the `xf86-video-intel`arch wiki do not recommend installing it, but use xorg's modesetting driver (that is, don't need to install anything). After our test, it is true that the default modesetting driver is relatively stable.

Note that vulkan is only supported on Intel HD 4000 and above.

### AMD HD Graphics

For AMD processors with HD graphics, you need to first determine what the graphics architecture is, and then decide what drivers to install. It is recommended to check on the [techpowerup website](https://www.techpowerup.com/), the information is very comprehensive. After determining the graphics card architecture, then decide what driver to install based on the architecture comparison [this document](https://wiki.archlinux.org/index.php/Xorg#AMD). **For old graphics cards with GCN2.0 and below architecture, you can directly install the open source ATI driver. The old closed source Catalyst driver will be abandoned in 2021. Do not use the open source AMDGPU driver for old graphics cards with GCN2.0 and below architectures, because it is only experimental and requires various custom kernel compilation options and configurations, which is very troublesome and not worth the loss.** For new models, namely GCN3 architecture and newer core graphics cards, you can directly install the open source driver AMDGPU, which is the following packages.

```bash
sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon libva-mesa-driver lib32-libva-mesa-driver mesa-vdpau lib32-mesa-vdpau
```

- For example, if your notebook cpu is the common AMD R7 4800U, then its core display is Vega 8. Through the query, it can be seen that it is the GCN 5.0 architecture, then you can choose to install the AMDGPU open source driver according to the official arch documentation.
- For another example, if your desktop cpu is the currently common Ryzen 5 3400G, then its core display is Vega 11. Through the query, it can be seen that it is the GCN 5.0 architecture, then you can choose to install the AMDGPU open source driver according to the official arch documentation.
- The older apu A10-9700 processor has a Radeon R7 core. Through the query, it can be seen that it is the GCN 2.0 architecture, then according to the official arch documentation, you choose to install the ATI open source driver.

## Discrete graphics card

This part will be divided into two cases where there is only a discrete graphics card (no core graphics) and both discrete graphics and core graphics.

### NVIDIA discrete graphics card

Newer models of discrete graphics cards can directly install the following packages. [Official Documentation](https://wiki.archlinux.org/index.php/NVIDIA)

```bash
sudo pacman -S nvidia nvidia-settings lib32-nvidia-utils #must be installed
```

If it is an old card from GeForce 630 or above to GeForce 920 or below, install [nvidia-470xx-dkms](https://aur.archlinux.org/packages/nvidia-470xx-dkms/)<sup>AUR</sup> and Its 32-bit support package. Using the dkms driver also requires headers.

```bash
yay -S nvidia-470xx-dkms nvidia-settings lib32-nvidia-470xx-utils linux-headers
```

For older cards from GeForce 630 to GeForce 400 series, install [nvidia-390xx-dkms](https://aur.archlinux.org/packages/nvidia-390xx-dkms/)<sup>AUR</sup> and Its 32-bit support package. Using the dkms driver also requires headers.

```bash
yay -S nvidia-390xx-dkms nvidia-settings lib32-nvidia-390xx-utils linux-headers
```

The old graphics card can directly use the [open source driver](https://wiki.archlinux.org/index.php/Nouveau).

```bash
sudo pacman -S mesa lib32-mesa xf86-video-nouveau
```

---

**Installing drivers on laptops with both HD Graphics and Nvidia discrete graphics is something that most people care about, and I will focus on it here.**

> Once again, please refer to the previous chapters of this book to configure the system before proceeding. Do not mix up multiple tutorials, **especially some outdated tutorials**. Special attention should be paid to ensure that the base-devel package is installed, the scientific Internet software is configured, and the X11 mode is used.

[NVIDIA dual graphics card mode official documentation](https://wiki.archlinux.org/index.php/NVIDIA_Optimus) /// [optimus-manager official documentation](https://github.com/Askannz/optimus-manager/wiki)

If it is a notebook computer with both a core graphics card and an NVIDIA graphics card, you also need to install each software package according to the above steps. In addition to this, optimus-manager needs to be installed. Easily switch between HD graphics and discrete graphics. optimus-manager provides three modes, which are using only discrete graphics, only using core graphics, and hybrid dynamic switching mode.

```bash
yay -S optimus-manager optimus-manager-qt
```

After the installation is complete, it can be used by restarting. After optimus-manager is installed, the service of optimus-manager will be enabled by default. You can check its status before restarting, and enable it manually if it is not enabled. After restarting, search for optimus-manager in the menu bar and click to use it. It can be set to automatically start at boot in its settings.

```bash
sudo systemctl enable optimus-manager
```

At this point, you should be able to switch the graphics card. If there is any problem, please read the documentation of optimus-manager, which has a detailed description. Since there are too many types of problems, this article will not describe them. The documentation of optimus-manager is very detailed, please check it yourself. Here are just a few of the more important considerations:

- If you need to switch between discrete graphics and core graphics mode, pay attention that you do not install various GPU monitoring plug-ins, they will prevent graphics card switching and cause unpredictable errors.
- Do not use the `Save to X Configuration file` button in the Nvidia Control Panel. will result in a configuration conflict.
- When switching between graphics cards, if the splash screen is stuck or black screen after re-login, you can try switching between tty1 and tty2.
- If after installing optimus manager and restarting, you are stuck on a black screen and cannot enter the system, it is very likely that you have encountered the common "ACPI ISSUE". In short, this is an implementation problem of the notebook manufacturer. You can try adding `acpi_osi=! acpi_osi="Windows 2009"` to the kernel boot parameters and try again. [[1]](https://github.com/Askannz/optimus-manager/wiki/FAQ,-common-issues,-troubleshooting#when-i-switch-gpus-my-system-completely-locks-up-i-cannot-even-switch-to-a-tty-with-ctrlaltfx)

Finally, let\'s talk about the dynamic switching mode in detail. In essence, it still uses the official [PRIME](https://wiki.archlinux.org/index.php/PRIME#PRIME_render_offload) method to switch the closed source drive. You need to set three environment variables, or use the command prime-run provided by the nvidia-prime package. The essence of both is the same, and three environment variables are set.

```bash
sudo pacman -S nvidia-prime
prime-run some_program #Use the prime-run prefix to run some programs with a discrete graphics
```

For readers of AMD core graphics + N card independent graphics, optimus-manager's support for this combination has been released, and the latest available version is 1.4.

---

**If you are not a user who strongly pursues energy efficiency control and pays attention to battery life, then you can look no further. If you are, then you need to try the correct power management method for your hardware and notebook model. The settings in this part may cause a black screen, and the trial process may be long, and various problems may also be encountered. Please decide whether to operate it according to your personal operation level**

What the power control does is ensure that the discrete graphics card is properly turned off in a graphics-only mode. In hybrid mode, the Nvidia module is actually always on in most cases, and the power control does not take effect. This thing is actually very complicated, because for different graphics card models and combinations of notebook models, the feasible solutions are different. In general, the most widely applicable approach is bbswitch. But it is still not recommended to install and use it in this way, because some specific hardware will cause problems, that is, black screen. It is recommended to follow the official documentation of optimus-manager step by step, try step by step, and finally find a suitable power management method for your own computer. **This [documentation](https://github.com/Askannz/optimus-manager/wiki/A-guide--to-power-management-options) must be read in detail!**

For Bbswitch suitable for most notebooks, here are the instructions for installation and use. First install the package bbswitch. If using other kernels, install the package bbswitch-dkms.

```bash
sudo pacman -S bbswitch #Install bbswitch switch mode
```

Next, right-click on the tray settings of optimus-manager and select Bbswitch from the switch method in the Optimus tab.

### AMD discrete graphics

The driver installation steps for AMD discrete graphics cards are actually the same for AMD core graphics cards. You need to determine the architecture first, and then select the correct driver to install. What really needs attention is how to switch between HD graphics and discrete graphics. You can use [PRIME](https://wiki.archlinux.org/title/PRIME#For_open_source_drivers_-_PRIME) to switch between dual graphics cards for open source drivers.

In addition, you can use `glmark2`, `DRI_PRIME=1 glmark2` to test the nuclear display and the independent display respectively, and choose the one with a higher score to use. Dedicated graphics can be used by adding `DRI_PRIME=1 mangohud %command%` to the startup prefix of steam games. (About [mangohud](/play/software?id=performancemonitoring)).

Another example of running steam games on a laptop with a discrete graphics card.

```bash
DRI_PRIME=1 steam steam://rungameid/570 #Run dota2
DRI_PRIME=1 steam steam://rungameid/730 #Run cs go
```

## Performance Testing

[Official Documentation](https://wiki.archlinux.org/index.php/benchmarking).

The most traditional and well-known way is to use the `glxgears` command for testing, which belongs to the [mesa-utils](https://www.archlinux.org/packages/extra/x86_64/mesa-demos/) package. However, it can only provide a simple test scene and frame number display, and only test a small part of the current OpenGL functions, which is obviously insufficient. We recommend the following two tools.

### glmark2

glmark provides a rich set of tests covering different aspects of graphics unit performance (buffering, architecture, lighting, textures, etc.), allowing for more comprehensive and meaningful testing. Frame rate is calculated separately for each test. Ultimately, the user receives a score based on all previous tests. On archlinux belongs to package [glmark2](https://aur.archlinux.org/packages/glmark2-git)<sup>AUR</sup>

### Unigine benchmark

The Unigine 3D engine is a more comprehensive benchmarking tool. There are five versions so far, from old to new are

- sanctuary (2007)
- tropics (2008)
- heaven (2009)
- valley (2013)
- superposition (2017)

The full version can be downloaded from [AUR](https://aur.archlinux.org/packages/?O=0&K=Unigine). They are all proprietary software.

## Graphics card information view

For NVIDIA graphics cards, the nvidia-settings package can comprehensively display graphics card-related information.

For AMD graphics cards, it is a little more troublesome, install the radeon-profile-git package through yay, and install its dependent radeon-profile-daemon, and finally start the process. That is, you can view the amd graphics card information in a graphical way. [github project address](https://github.com/marazmista/radeon-profile)

```bash
sudo systemctl enable --now radeon-profile-daemon.service
```

Be careful, don't make changes to auto low high in the lower left corner, there are bugs and it will get stuck. At the same time, the display of video memory usage may be wrong on some models of graphics cards.

## follow up

If you are an ordinary user, your system has been configured here. It doesn't matter if you don't know the command line, you can slowly explore the KDE desktop environment, remember to use the following commands or the Discover software to update the system.

```bash
sudo pacman -Syyu #Update the official repository
yay -Syyu #Update the official repository and AUR at the same time
```

Next, you can refer to the entertainment, office, multimedia and other chapters to learn more about the installation and use of the software. If you need to become a more professional person, then please read the advanced, and programming chapters.
