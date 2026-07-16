<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Preparation for installation

Since UEFI has been available for more than 10 years, all installation will take the form of UEFI+GPT and will not be repeated in the traditional BIOS format.

## 0. Terminal editor vim usage

During the installation of Arch Linux, you need to use the vim editor, and if you don't use it, you need to start with a brief introduction. The environment of practice allows an online Linux experience environment to try, like,[copy.sh](https://copy.sh/v86/?profile=archlinux)I don't know. Note that because it is an online environment, performance is poor and the vim command is executed with patience.

```bash
vim 1.txt   #创建并编辑名为1.txt的文件
```

You can see an empty interface. You're in vim right now.`命令模式`I don't know. Yes.`命令模式`, you can use some shortcut instructions to operate the text.
Now we enter.`a`Entering vim`编辑模式`, enter any text at this time and you can edit it.
After the input is finished, we press the Esc key and you can start from`编辑模式`Quit To`命令模式`I don't know. Enter at this time`:wq`Can save and exit the vim.
Here are some of the commands that are used in command mode.

```bash
:wq     # 保存退出
:q!     # 不保存，强制退出
dd      # 删除一行
2dd     # 删除两行
gg      # 回到文本第一行
shift+g  # 转到文本最后一行
/xxx    # 在文中搜索内容'xxx' 回车搜索，按n键转到下一个
?xxx   # 反向搜索
```

Outreach links: readers who need a complete curriculum can enter commands in the terminal`vimtutor`To learn the full vim curriculum.

## 1. Ensuring a network environment

If you can use a router line that can be accessed directly through the Internet by dhcp, then you don't have to prepare anything. If your environment can only be installed with a wireless network, you need to change the name of your wifi to an English name you can remember. Because...**Unable to display and type Chinese names for installation**, you'll see a bunch of squares that don't know what they are, and you'll have no way of entering a Chinese wireless name to connect. Although some cumbersome steps could be taken to resolve the problem of the final Chinese language, it was clear that this was unnecessary when Arch Linux was installed.

Second, some laptops have hardware switches or keyboard controls on wireless webcards, which are required before installation.**Make sure your wireless card hardware switch is open.**I don't know.

## 2. Writing start-up disk

Prepares a flash drive above 2G and writes an installation starter. Install mirror iso in[Download Page](https://archlinux.org/download/)Download, note, you need to select the latest mirror download, the magnetic link or torrent download, and when the download is completed you need to download the page at archlinux Down Load`PGP signature`Signing file (do not download the signature file from mirror source), place the signature document and the iso mirror in the same folder, then verify the signature of the mirror to ensure that the downloaded mirror is complete, free of error and unmolerated. If you use Linux, perform the following commands to ensure that you export a good signature. The specific mirror name is changed by name. If you use another system, search for ways to authenticate your signature.

```bash
gpg --keyserver-options auto-key-retrieve --verify archlinux-202x.0x.01-x86_64.iso.sig
```

Attention. Signing check here.**Very important.**, which ensures that your installation mirrors are not tampered with and that you verify the installation package with the correct public key when using the installation disk.

---

Recommended for Windows[ventoy](https://www.ventoy.net/cn/doc_start.html)Or...[Rufus](https://rufus.ie/)Or...[etcher](https://github.com/balena-io/etcher)Do a good booking. All three are free software. The operations are self-explanatory and are very simple.

Linux can be written directly with the dd command. Note that the parameter of the of is sdx, not sdx1 sdx2 etc.

```bash
sudo dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx status=progress oflag=sync
```

> bs = 4M specifies a more rational file input output block size.  
> status=process is used to output the total message of the burn process.  
> oflag=sync to control behavioral characteristics when writing data. Ensures that data and metadata are actually written to disks at the end of the command, rather than returning as soon as you write the cache.

## 3. Access to the main panel for BIOS settings

Insert a flash drive and turn it on. Press the F2/F8/F10/DEL etc. (depending on your master plate model, see more about your main plate) to enter the BIOS interface on the main plate.

## 4. Closing the main panel settings

In a similar name`security`, select Disable to disable it.

## Adjustment of start-up mode to UEFI

In some old master boards, the start-up mode needs to be adjusted to UEFI rather than the traditional BIOS/CSM. In a similar name`boot`, a similar option named Boot Mode was found to ensure that it is adjusted to UEFI only instead of legacy/CSM.

## Reordering the start of hard drives

In a similar name`boot`, the settings named Boot Options (possibly slightly different names) are found, and the start order of the USB Disk is first.

## 7. Preparation for installation

Finally saves the BIOS settings and exits. The normal button is F10. This is when the system is restarted, and you should have entered the installation interface at archlinux by accident.
