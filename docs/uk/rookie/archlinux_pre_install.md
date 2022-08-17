# Preparation before installation

Since UEFI has been popular for more than ten years, the installation will be carried out in the form of UEFI+GPT, and the traditional BIOS method will not be repeated.

## 0. Use of terminal editor vim

In the process of installing Arch Linux, you need to use the vim editor. If you don't know how to use it, here is a brief introduction. You need to master the following basic operations. For a practical environment, you can find an online Linux experience environment to try vim, such as [copy.sh](https://copy.sh/v86/?profile=archlinux). Note that because it is an online environment, the performance is poor, and you need to wait patiently when executing the vim command.

```bash
vim 1.txt #Create and edit a file named 1.txt
```

You can see that an empty interface is entered. You are now in vim's `command mode`. In `command mode`, you can use some shortcuts to manipulate text.
Now we enter `a` to enter vim's `edit mode`, enter any text at this time, and you can edit it.
After the input is complete, we can press the Esc key to exit from `edit mode` to `command mode`. At this point, enter `:wq` to save and exit vim.
Here are some commonly used commands in command mode

```bash
:wq # save and exit
:q! # do not save, force quit
dd # delete a line
2dd # delete two lines
gg # go back to the first line of text
shift+g # go to the last line of text
/xxx # Search for the content 'xxx' in the text, press Enter to search, press the n key to go to the next one
?xxx # reverse search
```

Extended link: Readers who need a complete tutorial can enter the command `vimtutor` in the terminal to learn the complete vim tutorial.

## 1. Ensure the network environment

If you can use the network cable from the router to directly access the Internet by dhcp, then you don't need to prepare anything. If your environment can only use wireless network installation, you need to change the wifi name you use to an English name you can remember in advance. Because **installation cannot display and enter the Chinese name of the wifi**, you will see a bunch of blocks that you don't know what it is, and during the installation process you will not be able to enter the Chinese name of the wifi to connect. Although some tedious steps can solve the problem of terminal Chinese, it is obviously unnecessary to do so when installing Arch Linux.

Secondly, there are hardware switches or keyboard controls for wireless network cards on some laptops. After booting, you need to ensure that your wireless network card hardware switches are turned on before installation.

## 2. Burn the bootable USB

Prepare a USB disk with a size of more than 2G, and burn a boot disk for installation. Install the mirror iso to download at the [download page](https://archlinux.org/download/), you need to download the newest iso, choose to download through a magnet link or torrent, after the download is complete, you also need to download the `PGP signature` signature file on the archlinux download page ( Do not download the signature file from the mirror source), put the signature file and the iso image in the same folder, and then perform the signature verification of the image to ensure that the downloaded image is complete, error-free and untampered. If you are using Linux, execute the following command to make sure the output is well signed. The specific image name can be modified according to the name. If you use another system, please search for a way to verify the signature by yourself.

```bash
gpg --keyserver-options auto-key-retrieve --verify archlinux-202x.0x.01-x86_64.iso.sig
```

Note that the signature verification here is **very important**, which can ensure that your installation image has not been tampered with, and can also ensure that you use the correct public key to verify the installation package when you use the installation disk to install the system.

---

It is recommended to use [ventoy](https://www.ventoy.net/cn/doc_start.html) or [Rufus](https://rufus.ie/) or [etcher](https://github.com/balena-io/etcher) to burn to USB. All three are free software. Please check the specific operation by yourself, it is very simple.

Under Linux, you can directly use the dd command to burn. Note that the parameter of of is sdx, not sdx1 sdx2 etc.

```bash
sudo dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx status=progress oflag=sync
```

> bs=4M specifies a reasonable file input and output block size.
> status=progress is used to output general information about the burning process.
> oflag=sync is used to control behavior when writing data. Make sure that the data and metadata are actually written to disk at the end of the command, rather than just being written to the cache and returning.

## 3. Enter the motherboard BIOS to set

Insert the USB stick and turn it on. When booting, press F2/F8/F10/DEL (depending on your motherboard model, please refer to the relevant information of your motherboard) to enter the motherboard's BIOS setting interface.

## 4. Turn off Secure Boot in the motherboard settings

In a tab like `security`, find an option called Secure Boot (the name may vary slightly), select Disable to disable it.

## 5. Adjust the boot method to UEFI

In some old motherboards, it is necessary to adjust the boot mode to UEFI instead of traditional BIOS/CSM. In a tab called something like `boot`, find an option called something like Boot Mode, make sure to adjust it to UEFI only, not legacy/CSM.

## 6. Adjust the hard disk boot order

In a tab called `boot`, find a setting option called Boot Options (the name may be slightly different), and adjust the boot order of the USB stick to the first place.

## 7. Ready to install

Finally, save the BIOS settings and exit, the general key is F10. At this point, the system restarts, and you should have entered the installation interface of archlinux.
