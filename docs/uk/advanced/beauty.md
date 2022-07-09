# System beautification

This article describes how to configure the KDE desktop environment to look more aesthetically pleasing.
Principle: Landscaping should not take a lot of time and toss, which is neither practical nor meaningful. The most cost-effective landscaping in the least amount of time is always the first principle.
In the beautification part, you need to set the proxy before using the `system settings` function, such as downloading themes. Otherwise, the internet speed will be very slow or even unusable.
After testing, it is necessary to redirect network connections to the proxy through proxychains or setting up a global transparent proxy.

```bash
proxychains systemsettings5 #Open system settings through proxy
```

> Before and after the KDE-related software update, there have been problems of unstable/stuck third-party themes. Again, don't beautify the magic changes too much, which will add more uncertainty and reduce the stability of your desktop.

## Wallpapers

Right-click on the desktop and select `Configure Desktop`. In the new window that appears in the lower right corner, select `Add Picture` to select the picture you want. The 'Position' item selects 'Scale, maintain proportion', and the 'Background' item selects 'Blur'. This way you can have a beautiful desktop wallpaper that is proportional and has Gaussian blur on the edges.

## System themes

Using a high-quality system theme can directly improve the aesthetics of the system. _System settings_ > _Appearance_ > _Global themes_ > _Get a new global theme_ , search for the theme layan, and set it. By the way, the author of this theme, vinceliuice, is a big Chinese and a designer. The quality of the themes and icons he designs are very high, you can go to his [homepage](https://www.pling.com/u/vinceliuice/) to rate and like him.

> If the Windows key cannot call out the menu after switching themes, you can right-click in the lower left corner, configure the program launcher, and reset the `windows+F1` key in the keyboard shortcuts, and the Windows key will be displayed as the Meta key.

## Window decoration

In _system settings_ > _appearance_ > _window decoration_, get the new window decoration, search for layan, and apply it.

## System icons

If the icons in the theme don't satisfy you, you can choose some custom icons. _System Settings_ > _Appearance_ > _Icons_ > _Get New Icon Theme_ , search for the icon name Tela-icon-theme, and install it.

## SDDM themes

You should note that the default login screen when entering a password is ugly and can be replaced here as well. _System Settings_ > _Startup and Shutdown_ > _Login Screen (SDDM)_ > _Get New Login Screen_ , search for SDDM theme layan and set it

## Splashscreen

The welcome screen after the login interface can be beautified. _System Settings_ > _Appearance_ > _Welcome Screen_ > _Get New Welcome Screen_ , search for miku to set it up. This `Snowy Night Miku` is the initial interface of the best looking two-spined ape attribute we have searched. In addition, there is a big guy who has made some welcome screens of the second dimension theme, but the quality is average, here is his [home page](https://www.pling.com/u/thevladsoft/).

## Desktop plugin

Right-click an empty space on the taskbar, select Edit Panel, and add widgets.

- Netspeed widget network speed component, this is very practical
- simple system monitor system information
- todolist task component

Then you can pin the software you often use to the taskbar.

After the KDE Plasma 5.22.1 update, an additional installation of ksysguard is required to ensure the proper functioning of the desktop plugin. [[1]](https://github.com/dfaust/plasma-applet-netspeed-widget/issues/28)

## Mixer

_System Settings_ > _Display and Monitoring_ > _Mixer_ Turn on the mixer

## Terminal style settings

Open konsole, go to _settings_ > _edit current scheme_ > _appearance_ , select `Red-Black` to apply and confirm.

## Kvantum Manager

Themes work with Kvantum Manager to achieve better results.

```bash
sudo pacman -S kvantum
```

Download Layan's Kvantum theme from [here](https://www.pling.com/p/1325246/) and unzip it. Open Kvantum Manager, select the theme and install it, then select Layan in `Change/Delete Theme`, Use this theme. Finally, in the system settings, select kvantum in the application style in the appearance.

> If the transparent effect is not displayed, make sure that the global scale of KDE is an integer multiple. Or try toggling the openGL settings in the mixer.

## GRUB themes

[Official Documentation](https://wiki.archlinux.org/title/GRUB/Tips_and_tricks#Theme)

Select and download the GRUB theme you want at [pling](https://www.pling.com/browse/cat/109/order/latest/), such as this [two-stinged salamander theme](https://www.pling.com/p/1526503/). Next, `cd` into the unzipped folder, open konsole and enter

```bash
sudo cp -r . /usr/share/grub/themes/Nino
```

to place the theme in the system's GRUB default folder.
Then edit the `/etc/default/grub` file, find the `#GRUB_THEME=` line, remove the previous comment, and point to the theme's `theme.txt` file. which is

```bash
#GRUB_THEME=
GRUB_THEME="/usr/share/grub/themes/Nino/theme.txt" #After modification
```

and then type in the terminal

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Update GRUB and restart.

## Boot animation

[Plymouth](https://fedoraproject.org/wiki/Releases/FeatureBetterStartup) is a project from the Fedora community that provides the function of beautifying the startup GUI. If necessary, you can refer to the [official document](<https:/ /wiki.archlinux.org/title/Plymouth_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>) to configure. Novices are not advised to spend too much time on this configuration.

---

The rest of the KDE desktop has many configuration items, you can explore by yourself.
