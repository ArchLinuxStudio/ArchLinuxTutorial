# 安卓刷机

[Arch Wiki Android Doc](https://wiki.archlinux.org/index.php/android)

## Why need Android Flashing

Among the mobile phone brands currently available on the market, in addition to its own magic-modified closed-source Android mobile phone system, almost any brand will be pre-installed with a series of factory applications, such as browsers, contacts, and application markets. These applications are all closed-source software developed and provided by various mobile phone manufacturers. There is a serious problem here. These magic-modified systems and closed-source application software may perform various espionage functions to monitor and audit users. According to reports, both Xiaomi and Huawei mobile phones will report users' searches and browsing, and if keywords such as "Tibet freedom", "Taiwan independence", "democracy and freedom" are matched, they will be encrypted and reported. These keywords may have Hundreds of thousands. Due to such reasons, users must re-flash the system of the mobile phone. Choosing an open source and reliable ROM to flash the mobile phone can protect their privacy and security. At the hardware level, there is also the possibility of auditing and monitoring, but there is no clear and reliable report yet.

> Manufacturers such as Huawei Hongmeng and Xiaomi's MIUI have the risk of cooperating with authoritarian governments, and this risk is currently increasing. From the perspective of the operating system, the integration of the so-called "anti-fraud system" is almost a matter of the arrow. Whether there will be hardware-level monitoring and auditing, there is no clear evidence yet. For your privacy and security, if these manufacturers' phones cannot be flashed into secure ROMs by themselves, then you need to refuse to use these manufacturers' products.

It is best to buy a mobile phone with a well-known brand and a popular model, so that you can easily find the official twrp and well-known ROM packages when flashing the phone, such as [Mojo](https://download.mokeedev.com/) , [LineageOS](https://lineageos.org/), [crDroid](https://crdroid.net/), [Resurrection Remix](https://resurrectionremix.com/), [PixelExperience](https://download.pixelexperience.org/devices) etc. If it is a relatively unpopular brand, the official may not provide ROM, and you can only find the personal modified twrp and the unofficial ROM of the above ROM package on the Internet. The search method is generally the code name of the mobile phone + ROM. The security of such a personal modification is more difficult to say, and it may also have more bugs. It is also possible that you have searched the whole network, but you cannot find twrp and ROM that can be used by unpopular models (referring to easy-to-use, non-hardware provider's official ROM). In terms of hardware, it is generally recommended to buy Qualcomm Snapdragon cpu, not MediaTek, because more ROM versions are compatible with Qualcomm hardware.

First you need to install the android toolkit on linux

```bash
sudo pacman -S android-tools
```

## Unlock bootloader

Again, a reminder to buy or use a phone brand that might unlock the bootloader. Generally speaking, for brands like Xiaomi, the official will provide ways and tools to unlock the bootloader, but these tools can only be used under windows. At this time, you can only use a windows operation, or use a virtual machine.

In addition, if you can get, or get the unlock code of the bootloader in a very hacky way, you can also use adb to unlock it in fastboot mode.

```bash
$ adb reboot bootloader #The mobile phone first connects to the computer and restarts to fastboot
$ fastboot oem unlock xxxxxxx #Unlock in fastboot mode, you must add the correct bl code to unlock, otherwise an error will be reported
FAILED (remote: 'check password failed!')
fastboot: error: Command failed
```

## Flash twrp and ROM

There is no official twrp device, you can check it at [unofficialtwrp](https://unofficialtwrp.com/devices/).

If there is no relevant information, there are several forums and websites you can look at

- xda https://forum.xda-developers.com/
- https://androidfilehost.com/ search development code + system name you want

Generally, the version of twrp has a corresponding relationship with the ROM package. Before flashing, make sure that your two versions are compatible, otherwise the flashing process may report strange errors, such as unable to mount /system

Go to download the twrp corresponding to your model. Search for your model on the [official website](https://twrp.me/Devices/) and download it. If you don't see your model, it means that it is not officially supported, and you need to search for the version modified by others. Connect the phone to the computer, be careful to connect it to the USB2.0 interface, otherwise there may be compatibility problems.

Put the phone into fastboot mode, open the terminal on the computer, and execute

```bash
fastboot flash recovery ./path/of/your-twrp.img
```

When you see the terminal has finished executing, you can restart the phone. Note here that executing `fastboot reboot` can restart, but many devices will automatically overwrite and replace the custom recovery you flashed at the first boot, so a direct restart will report an error that it is not an official system and similar information. To prevent this, reboot into recovery via a hardware key on the phone, and TWRP will patch the ROM to prevent the ROM from replacing TWRP. [[1]](https://twrp.me/xiaomi/xiaomimi5.html)

The remaining steps are to simply enter twrp, double-clear, and flash.

> Sometimes double-clear or enter twrp may see an error, use advanced cleaning, change the format from ext4, and then change back to ext4 may be solved

More commands:

```bash
$ adb shell #Open adb shell
$ adb root #Open adb shell with root privileges when the phone is already rooted
```

## About Huawei equipment

If you didn't get the password before Huawei closed the bl lock code application in 2018, then flashing will become basically impossible now, especially for new devices in the past year or so.

For older devices, try the following methods.

Download DC-unlocker for four euros, download it to your computer, check the device, log in, and try to unlock it to read the bl code. Not all devices will be successful, and some models, although on their support list, have not been successful. The process can be roughly referred to [this](https://www.forece.net/post/4886.htm). The reason found is that after a security patch after Android 8, DC unlocker can no longer read the bl code. Let's see if the update after DC can fix this problem.

Another way is to downgrade first and then unlock with DC. Downgrading through Firmware Finder can't be successful after trying, and can't get the detected update. It is said that **EMUI8.0.0.129** blocked other channels and rolled back. [Document 1](https://club.huawei.com/thread-15361104-1-1.html)[Document 2](https://cn.ui.vmall.com/thread-19813753-1-1.html)[Document 3](https://www.cnblogs.com/lsgxeva/p/13469490.html)

The feedback from Taobao's selling code is that Huawei's newer models cannot be unlocked to get BL.

There is also a [tutorial](https://www.52pojie.cn/thread-816065-1-1.html) to get the bl code in the hexadecimal by yourself, the premise is that you must get root first, which is in the new machine Basically impossible. You can try older models. Checking hex on linux is available with this software [Bless](https://www.archlinux.org/packages/community/any/bless/)

Finally, there is a github project [PotatoNV](https://github.com/mashed-potatoes/PotatoNV) for reference, which claims to unlock the bootloader of some models. Version under Linux: [PotatoNV-crossplatform](https://github.com/mashed-potatoes/PotatoNV-crossplatform)

---

Ref:

- [小米刷机教程](http://www.romleyuan.com/news/readnews?newsid=938)
