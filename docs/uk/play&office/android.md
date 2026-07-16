<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Android brusher.

[Arch Wiki Andre](https://wiki.archlinux.org/index.php/android)

## Why did you brush it?

Almost any of the mobile phone brands that are currently visible on the market, except for its own magic closed-source Android system, pre-positions a series of out-of-work applications, such as browsers, mailing lists, application markets, etc. These applications are closed-source software and are developed by mobile phone manufacturers. There are serious problems here, and these magic systems and closed-source applications are likely to perform various espionage functions, monitor users and audit them. It has been reported that both Mi and Hua mobile phones report user searches and browsing, matching keywords such as "Tibetan freedom", "Taiwan independence", "democratic freedom" and so on, and that these keywords may be encrypted in hundreds. For these reasons, users have to re-paint their mobile phone systems, and the choice of an open-source, reliable ROM will guarantee their privacy and safety. At the hardware level, there is also the possibility of auditing and monitoring, but there are currently no clear and reliable reports that allow for the selection of mobile phones in the name of the country where the person is physically present, if available.

> China’s mainland producers, such as Hong Hongmong and Miui, have a growing risk of working with powerful governments, and at the operational system level, the integration of so-called “counter-fraud systems” is almost a matter of arrows. There is no clear evidence of hardware-level monitoring and auditing. For your privacy and safety, if these manufacturers' mobile phones cannot be painted on their own, then you need to refuse to use their products.

At the same time, a large number of advertisements are prevalent in pre-dressed ROMs by continental manufacturers, with the largest numbers of "cell phones " and "miui" domestic editions, and a large number of advertisements will fill the system's notice boards, causing poor user experience, although they can be closed by freezing the corresponding software. However, as time passed, the manufacturers gradually blocked the road, locking out advertising software such as “cell phone housekeepers”, “software stores”, “smart XX”, “system desktops”, “thematic stores”, and prohibiting freezing without root privileges, even adb shell, which is widespread in “ColorOS”, “OriginOS/Funtouchos”, “cell phone Hong/MagicUI”. Moreover, in MIUI, while the shell allows the freezing of some advertising software, the freeze may result in the rebooting of the system and the death of the system on the second screen, known as "Cami", which is inexcusable.

Finally, the continental version of many continental manufacturers' magic ROMs will have some "rogue behaviour", and it is more aggressive at the moment to "lock the default application" and especially to "start the desktop".

Even though malicious applications may induce users to set them up as default applications and then engage in malicious acts such as extortion and fraud against users, does the user not have the capacity to judge this? You think the users are stupid?**All human beings are born free and equal in dignity and rights.**Why deprive users of the right to freely change the default application of the system, is it to promote their own ads, which are flying far behind the application of other excellent free software? So you don't want any money? It's hard to see why people who use mobile phones have been using these features on the mainland ROM, but they don't have them abroad. And he took himself for a fool? "What is the evil of the beast?"

At the same time, the ‘purity mode’ that appeared in the ‘cell phone number 3’ and the ‘ColorOS’ that was installed with a mandatory OPPO account and could not be shut down are ‘rogues’.

The best way to buy a mobile phone is to buy open BootLoader unlocked (the premise of a brush) and to have an available open core (the condition of a third-party open source ROM fit), a hotter machine, such as millet/red rice, Google Pixel, Realme, Fairphone, etc., so as not to open up a BotLoader unlocked, or to have a bad use of the official system, such as Hua Wing/Glory (if it's difficult, it's hell class), Vivo/iQO (there is no difficulty, since almost all models are unpainted), etc., so that official twrp and well-known ROM packages can be easily found when brushing a machine[PixelExperience](https://get.pixelexperience.org/devices)I don't know.[LineageOS](https://lineageos.org/)I don't know.[crDroid](https://crdroid.net/)I don't know.[Resurrection Remix](https://resurrectionremix.com/)(No, the government has stopped)[Havoc-OS](https://havoc-os.com/)I don't know.[ArrowOS](https://arrowos.net/)I don't know.[Evolution X](https://evolution-x.org/)(Although it's more functional, there's been "kang" behavior, misusing it)[dotOS](https://www.droidontime.com/devices)I don't know.[grapheneos](https://grapheneos.org/)And so, we all call it "genius." In the case of colder brands or cold-door models, major official primary sites may not provide ROM, but only personally modified twrp and above-mentioned ROM packages unofficial ROM, typically search for mobile phones or mobile phone codes +ROMs such as "Xiaomi Redmi K60 Pro ROM" or "mi socrates rom" or, if necessary,[XDA Forum](https://forum.xda-developers.com/)There will be relatively more resources. The security of such individual versions is generally not problematic, but stability is more difficult to say and more bugs may emerge. It's also possible that you can go all over the Internet and not find the twrp and ROM of the cold machine. With regard to hardware, it is generally recommended to buy the phones of the high-channel platform, and not the UNDG platform, because more ROM versions are suitable for high-channel hardware (high-channel packages), while the ease and simplicity of the bricks following problems in the equipment brushing process of the UNDG platform are not as simple as the high-channel platform (high-channels can be saved as long as the hardware is not broken).

First of all, we need to install an Android tool kit on linux.

```bash
sudo pacman -S android-tools
```

## Unlock Bootloader

Once again, we are reminded to purchase or use a brand of a mobile phone that is officially available and unlocked. Typically, brands like Mi provide the means and tools for unlocking Botloader, but Mi's unlocking tools are basically used under Microsoft Windows. You can only operate on a Windows computer, or on a virtual machine.

Besides, if you can get it, or get it through a very jack-up, a Botloader decoder code (the most of which is for equipment, it takes money or a cut-off machine), you can also use adb to decorate in fastboot mode.

```bash
$ adb reboot bootloader #手机先链接电脑，重启到fastboot
$ fastboot oem unlock 1234567890ABCDEF #在fastboot模式下解锁，要加上正确的16位解锁码才能解锁，否则会出现类似以下报错
FAILED (remote: 'check password failed!')
fastboot: error: Command failed
```

## Brush twrp and perform brushes

No official twrp device, available[unofficialtwrp](https://unofficialtwrp.com/devices/)Check if there is any.

There are several forums and websites to see if there is no relevant information.

- xda https://forum.xda-developers.com/
- https://androidfilehost.com/Search, develop code + name of system you want

The normal twrp version is related to the ROM package, and the brushes confirm that your two versions are compatible, otherwise the brushing process may report strange errors such as:

Go download your type of twrp. Yes.[Network of officials](https://twrp.me/Devices/)Search your type, download. If you don't see your type, it's not officially supported, you need to search for someone else's version. Connect your cell phone to your computer, so that you can connect to the USB 2.0 interface, otherwise there may be compatibility problems.

Allow cell phones to enter pastboot mode, for non-Chinese equipment, open terminals on computers, execute

```bash
fastboot flash recovery ./path/of/your-twrp.img

fastboot boot ./path/of/your-twrp.img
```

Once the terminal is completed, the hand is automatically restarted to Recovery. Attention here.`fastboot reboot`It can be restarted, but many devices will automatically overwhelm the custom recovery that you have painted on the first start, so that direct reboot may discover that the start is still official recovery, not just painted, and that some ROMs may even miss something like the official system. In order to prevent this from happening, re-entry via hardware buttons on the mobile phone will be restarted, and TWRP will call ROM to check to prevent ROM from replacing TWRP.[[1]](https://twrp.me/xiaomi/xiaomimi5.html)

The remaining steps are normal entry twrp, double-cleaning, brushing.

> Sometimes double-cleaning or going into twrp may see errors, clean up with advanced, change the format from ext4 and go back to ext4 may solve them.

Additional commands:

```bash
$ adb shell #打开adb shell
$ adb root #在手机已经root的情况下打开root权限的adb shell
```

## Remove Network Limit Hint

Google has introduced the Captive Portal mechanism since Android 5.0, which is used mainly to detect whether the WiFI network authentication is normal, and the default check is on a Google wall outside server. The presence of this service in a wall-based environment, when it is used in an internationally common type of anatomy, suggests that the network is restricted, even if services such as Shadowsocks have been opened. To address this problem, you can use the adb command to modify the access detection server to google.cn.

```
adb shell settings put global captive_portal_server www.google.cn
adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
adb shell settings put global captive_portal_mode 0
```

Finally, we can switch the flight mode and then go back.

## Paint Google Packages

Some scenes require Google Play and Google packages. Some of the options are:[opengapps](https://opengapps.org/)I don't know.[nikgapps](https://nikgapps.com/)and[Package provided by lineageos](https://wiki.lineageos.org/gapps)I don't know. It is generally recommended to be more stable, but its current update seems to have stalled. Nickgapps can customise themselves.

## Unlock root privileges

If your equipment is usable,[KernelSU](https://kernelsu.org/zh_CN/)In the first place, KernelSU is recommended because KernelSU operates in the inner nuclear space, with greater control over user space applications and a very low probability of detection.

For devices that cannot use KernelSU, use Magisk to unlock root privileges. In it.[Official Release Interface](https://github.com/topjohnwu/Magisk/releases)Downloads the Magisk apk file and renames it as .zip suffix. Then copy it to the cell phone and finally enter the twrp brush into this zip package.

For the equipment below Android 5.1, if Magisk is unable to run or is in trouble, try[SuperSU](https://supersuroot.org/)I don't know. Note: This application belongs to**Proprietary software**, has been discontinued and is not recommended unless absolutely necessary

Ref:

- [Mi brusher tutorial](http://www.romleyuan.com/news/readnews?newsid=938)

Detailed brusher tutorial reference[Brusher Guide](https://jesse205.github.io/FlashAndroidDevicesGuidelines/)I don't know.
