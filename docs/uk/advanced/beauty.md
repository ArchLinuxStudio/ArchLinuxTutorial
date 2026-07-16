<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# System beautification

This is about how to configure the KDE desktop environment to look more beautiful.
Principle: beautification should not take a great deal of time, be neither useful nor meaningful. It has always been the first principle to take the least time to complete the best beautification.  
In the beautification section, the agent needs to be set up before it is used`系统设置`, and so on. Otherwise the net will be very slow or even unusable.
The network connection has to be redirected to the agent by proxychains or by setting up a global transparency agent.

```bash
proxychains systemsettings5 #通过代理打开系统设置
```

> Before and after KDE-related software updates, there was a problem with third-party thematic instability/Carton, and it was again emphasized that not to embellish magic too much, which would add more uncertainty and reduce your desktop stability.

## Wallpaper

Right button on desktop, select`配置桌面`I don't know. Select the lower right corner in the emerging window`添加图片`You can choose the picture you want. of which`位置`A choice 's scaling, keep ratio',`背景`A choice's obfuscated. So you can have a proportional, and on the edge of it is a beautiful desktop wallpaper with Gaussian blurry.

## System theme

The use of a high-quality system theme allows the system to improve its beauty in a linear manner._System Settings_ > _Appearance_ > _Global theme_ > _Get New Global Theme_, search theme playan, make settings. By the way, the author of this subject, Vinceliuice, is a Chinese man, a designer, whose design is of high quality, as well as the icon.[Home Page](https://www.pling.com/u/vinceliuice/)Ratings and praises for him.

> If the windows key does not pass out the menu after switching the theme, you can reset it in the keyboard shortcut with the bottom left right key, configure the program starter`windows+F1`Key, windows will be shown as Meta.

## Window Decoration

Yes._System Settings_ > _Appearance_ > _Window Decoration_, get a new window decoration, search for playan and apply it.

## System Icon

If the icon in the theme does not satisfy you, then you can select some custom icons._System Settings_ > _Appearance_ > _Icon_ > _Get New Icon Theme_, search the icon name Tela-icon-theme.

## SDDM Theme

You should be aware that the default login interface when entering the password is ugly and can be replaced here._System Settings_ > _Turn it on and off._ > _Login Screen (SDDM)_ > _Get New Login Screen_, search for SDDM theme playan and set it up

## Welcome screen (splashscreen)

A welcome screen can be glorified after the login interface._System Settings_ > _Appearance_ > _Welcome Screen_ > _Get New Welcome Screen_, search miku for settings. Here.`Snowy Night Miku`It's the first interface we've found of the best diaphragm properties. Besides, there's an older man who's made some binary screens, but it's his.[Home Page](https://www.pling.com/u/thevladsoft/)I don't know.

## Desktop Plugin

Right in the blank of the taskbar, select the edit panel, and add a widget.

- Netspeed widget, which is practical
- Todolist task component

Then you can just stick your usual software to the taskbar.

KDE Plasma 5.22.1 updates require the installation of additional ksysguards to ensure the proper operation of desktop plugins.[[1]](https://github.com/dfaust/plasma-applet-netspeed-widget/issues/28)

## Mixer

_System Settings_ > _Show and monitor_ > _Mixer_Open Mixer

## Terminal Style Settings

Open konsole,_Settings_ > _Edit the current scheme_ > _Appearance_, select`Red-Black`Apply confirmation is sufficient.

## Kvantum Manager

The theme-matched Kvantum Manager can do better.

```bash
sudo pacman -S kvantum
```

Yes.[Here.](https://www.pling.com/p/1325246/)Downloads the Kvantum theme of Layan and depresses. Open Kvantum Manager, select the theme and install it.`Change/Delete Theme`, Use this theye. Finally select kvantum in the application style of the system settings.

> Ensures that the global scaling ratio for KDE is multiple if the transparency effect is not shown. Or try to switch the settings of openGL in the mixer.

## GRUB Theme

[Official documents](https://wiki.archlinux.org/title/GRUB/Tips_and_tricks#Theme)

Yes.[pling](https://www.pling.com/browse/cat/109/order/latest/)Select to download the GRUB theme you want, like this.[It's a second-stroke theme.](https://www.pling.com/p/1526503/)I don't know. Next`cd`Open konsole input

```bash
sudo cp -r . /usr/share/grub/themes/Nino
```

to place the theme in the system GRUB default folder.
Then edit`/etc/default/grub`File found.`#GRUB_THEME=`One line, remove the notes and point to the subject.`theme.txt`Documentation. That's...

```bash
#GRUB_THEME=
GRUB_THEME="/usr/share/grub/themes/Nino/theme.txt" #修改后
```

And then enter at the terminal.

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Update GRUB and restart it.

## Let's do it.

[Plymouth](https://fedoraproject.org/wiki/Releases/FeatureBetterStartup)It's a project from the Fedora community that provides a glorification of the initial graphical interface, which can be consulted if needed[Official documents](<https://wiki.archlinux.org/title/Plymouth_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)Configure. No starters are advised to spend too much time on this configuration.

---

The rest of the KDE desktops have many configurations that you can explore on your own.
