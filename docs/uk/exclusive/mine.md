# Getting Started with Cryptocurrencies

This section will briefly describe some basic concepts of cryptocurrencies, and our interpretation. At the same time, readers will be taught how to enter the world of cryptocurrencies on Arch Linux. When it comes to cryptocurrency and mining, many Chinese readers have deep misunderstandings and prejudices about cryptocurrency and mining, which is actually related to the propaganda orientation of the national government and its controlled media and self-media. We don't want our readers to be fooled, so some explanation will be given in this article.

## What is cryptocurrency

Cryptocurrency is a medium of exchange that uses cryptographic principles to secure transactions and control the creation of transaction units. This Wikipedia-style description is more difficult to understand. We try to describe in simpler language. The originator of cryptocurrencies is Bitcoin (BTC), which originated in 2009. In the genesis block of Bitcoin, the sentence `The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.` is embedded. This satirizes the traditional financial industry, while stating the position of the founder Satoshi Nakamoto. Cryptocurrencies that conform to the concept of Bitcoin generally have the following characteristics.

- Decentralization, the distribution and decision-making of currency is not determined by centralized organizations, such as governments, banks and other organizations in any centralized form. By participating in mining, you can get a share of your own income.
- Under the premise of correct use, the personal privacy of users can generally be protected to a great extent.
- The currency itself is **truly** held by its owner, truly realizing the inviolability of private property. The owner of the currency holds the private key, and others without the private key cannot seize, freeze, or confiscate their cryptocurrency assets.

## Why use cryptocurrency

As supporters of the free software movement, we also support the use of cryptocurrencies for the following reasons:

- First, use cryptocurrencies to resist ubiquitous surveillance and auditing. In some countries, various payment methods that are widely used have been completely bound with real names, and comprehensive surveillance and review have been carried out, and personal privacy is not guaranteed at all. Using cryptocurrencies is a great way to protect your own privacy. Even if you don't use cryptocurrencies such as XMR that can guarantee a high degree of privacy, just using (correctly used) ordinary cryptocurrencies can protect your personal privacy to a large extent.
- Second, since fiat currencies in some countries have little or no credit, the use of cryptocurrencies provides protection against this risk as a tool for asset diversification. Even though many governments and various celebrities continue to ban and deny cryptocurrencies, cryptocurrencies have survived more than ten years. Is fiat currency stable? Readers of this question can think about the changes in the purchasing power of fiat currency in some countries over the past few decades. What is the reason for some countries to completely ban cryptocurrencies? Readers should be able to have their own understanding. Holding cryptocurrencies that are widely circulated around the world can improve your ability to resist legal currency risks and protect your rights.
- Third, even without cryptocurrencies, terrorism, fraud and money laundering are still widespread in the world. Just because cryptocurrencies can be used for these purposes, it cannot be blamed on cryptocurrencies. This is absurd logic. People or organizations generally have other purposes.

Why are some people against cryptocurrencies?

- First, cryptocurrencies are seen in some totalitarian governments as a threat to their dictatorship. They are extremely dangerous and uncontrollable, so a total ban is required.
- Second, cryptocurrencies have formed a relatively large trading market, which has had a certain impact and impact on the traditional financial industry, so some business representatives led by Buffett are openly opposed to cryptocurrencies.
- Third, the use of cryptocurrencies in terrorism, fraud and money laundering, and the more marginal reasons that cryptocurrencies are not environmentally friendly.

## Enter the world of cryptocurrencies on Arch Linux

### Wallet and address

If you want to use cryptocurrency, you first need to have a wallet. Currently, the most widely used browser wallet is [Metamask](https://metamask.io/), which can be used by installing the Metamask plugin in the extension store of the browser you are using. The browser wallet allows you to conveniently use the current massive decentralized programs, including many financial applications, communities, games, etc., but generally speaking, its security is not as good as other non-custodial wallets and cold wallets.

The selection of wallets and the acquisition of addresses on Arch Linux are described in detail in the chapter of [Modern Privacy Protection Guide](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/anonymous_pay), and will not be repeated in this article.

If you need a channel to buy cryptocurrencies anonymously, consider using the service provided by [localmonero](https://localmonero.co/) to buy monero. The transfer between Monero addresses after purchase is anonymous and invisible to the outside world. To convert Monero to other currencies, use a non-mainland Chinese cryptocurrency exchange platform such as [changenow](https://changenow.io/).

### Mining

Mining is the most direct way to enter the cryptocurrency world, this section describes how to do cryptocurrency mining in Arch Linux.

Since most of our readers are from China, they have fewer and fewer means of purchasing cryptocurrencies through formal and secure channels. From the current point of view in 2022, there are only the following ways for them to obtain cryptocurrencies:

- Buy using exchanges that still allow Chinese users to trade
- Offline transactions
- Obtained by mining

A simple search reveals that there are exchanges that are still in use today, some with strong government backgrounds, with little guarantee of security. Even if you can buy and transfer through such exchanges, the records of holding, trading, and withdrawing to the chain related to your real-name authentication can be easily obtained. Actually, you should not use any centralized exchange.

Offline transactions are a more difficult and riskier way, which should not need to be repeated.

So to sum up, mining is the only safe and convenient way for people in oppressed countries to obtain cryptocurrency.

If you don't know anything about cryptocurrencies, you can refer to the [Binance Academy](https://academy.binance.com/en/search?page=1) series of articles to get started, hundreds of articles ranging from low-level to high-level articles are available for you to read.

---

Before mining, there are some important matters that need to be reminded in advance in terms of safety and use:

- Due to the comprehensive prohibition and regulation of cryptocurrencies in individual countries, a global proxy, including proxy DNS, is required on the mining equipment. This not only allows you to connect to websites such as mining pools, but also helps you hide your activity on cryptocurrency-related websites from being monitored by ISPs or government agencies. Here you can use v2rayA, which allows you to remotely manage the network of mining rigs through a browser without installing any GUI program on the mining rig.
- After adding a new device, it may be necessary to remove the motherboard BIOS battery to discharge, note that the system time will reset after discharge, which will make v2ray unusable. In this case, remember to recalibrate the system time first.
- Control the electricity usage of your mining site within a reasonable range. If the electricity bill usage is too outrageous, it may arouse suspicion and surveillance by some government departments.
- In the motherboard BIOS settings, you need to enable the `Above 4G Decoding` option to support multiple (usually 4 or more) graphics cards. This setting is normally present in PCIE settings. This setting enables chipset 64bit compatibility hardware physical addressing, when turned off the BIOS can only use 32bit hardware physical addressing.
- In the motherboard BIOS settings, adjust the PCI-E speed to Gen2 or Gen1. Otherwise, the problem of not recognizing the graphics card may occur.

---

After obtaining your own cryptocurrency address, you need to choose a mining pool. To put it simply, cryptocurrency miners mine on their own, which is inefficient. Joining a mining pool and splitting is a more efficient way of mining. There are many mining pools, each with different fee collection methods and charging ratios. For beginners, choosing the [unmineable](https://unmineable.com/) mining pool is a good choice, and its interface is simple and easy to use.

After entering the mining pool, you can choose the currency you need to mine. Note that some of the coins that you can choose here are not actually mineable. It is not that you actually perform the mining operation of this currency, but that you mine the coins that can be mined such as Ethereum, and then the unmineable mining pool will convert the income into you. The chosen currency is then paid to you. For specific operations, please refer to the article on the unmineable website. After reaching the minimum amount required to withdraw, you can initiate a withdrawal in the mining pool. There is a certain waiting time for withdrawal, please be patient.

---

When mining with an Nvidia graphics card, you need to install [cuda](https://archlinux.org/packages/community/x86_64/cuda/) first.

When mining with an AMD graphics card, if you use the AMD open source mesa driver, you may not be able to run the mining software. The solution is to temporarily use the proprietary AMD driver [opencl-amd](https://aur.archlinux.org/packages/opencl-amd/). However the latest version of the opencl-amd driver in AUR may still not work, if you encounter this problem, the solution is to use the [older version 20.45 driver](https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=opencl-amd&id=99929da87153c0f36a2a9497c38221c12307ecfc). After downloading PKGBUILD, use makepkg to generate the package and install it. This may be required when using other AMD mining programs.

There are also many mining tools to choose from. [ethminer](https://github.com/ethereum-mining/ethminer) is free software using the GPL-3.0 protocol and is a general-purpose Ethereum mining software. In general, Ethereum mining is more efficient with GPUs. There are also some popular proprietary mining software such as LoLMiner and T-Rex. For specific operations, please refer to their official documentation.

[xmrig](https://github.com/xmrig/xmrig) can be used for XMR mining. xmrig is free software licensed under GPL-3.0. xmrig-cuda is a plugin for xmrig cuda backends, you can choose according to your needs.

---

Generally speaking, the mining program needs to be set to automatically restart and start automatically. For this, you can use supervisor to achieve this. First, install and start.

```bash
sudo pacman -S supervisor
sudo systemctl enable --now supervisord.service
```

Then, create a configuration file in the target directory, such as `/etc/supervisor.d/eth.ini`, and then restart the supervisord service for the configuration to take effect. In this way, the requirements of automatic restart and boot-up can be realized. Below is a sample configuration file.

```ini
[program:eth]
directory=/home/testuser
command=YOUR_MINE_COMMAND
autostart=true
autorestart=true
```

### Fan speed regulation in headless conditions

Adjusting the fan speed of the graphics card is a tricky thing when it is not connected to the monitor, that is, headless.

Set the fan speed of AMD graphics card. Install the software amdgpu-fan and enable the service. amdgpu-fan will automatically adjust the fan speed according to the graphics card temperature. Note that [the current version of AUR](https://github.com/zzkW35/amdgpu-fan/issues/2) has a problem that the boot cannot be automatically started to take effect. According to [Issue](https://github.com/zzkW35 /amdgpu-fan/issues/2), its upstream [source repository] (https://github.com/chestm007/amdgpu-fan) does not have this problem.

```
yay -S amdgpu-fan
sudo systemctl enable --now amdgpu-fan
```

For more information on setting the fan speed of AMD graphics cards, please refer to [Arch Wiki](https://wiki.archlinux.org/title/fan_speed_control#AMDGPU_sysfs_fan_control).

---

Mining with NVIDIA graphics cards also requires additional fan speed settings, otherwise the fan will not adjust the speed according to the temperature. Even if the temperature is high, it will run at a low speed. This problem still exists when deep learning and other operations are performed. . If you start the GUI, you can set the speed through nvidia-settings. The speed setting of the Nvidia graphics card depends on the X server, so by default, if the X server is not activated, the fan speed cannot be adjusted. The tool [coolgpus](https://github.com/andyljones/coolgpus) is available at this point, which works by setting up a temporary X server per GPU. It then cycles through the GPUs every few seconds and sets fan speeds based on their temperatures. When the script terminates, it returns control of the fan to the driver and cleans up the X server. The coolgpus installed by pip is located at `~/.local/bin/coolgpus`.

- https://ximikang.icu/2021/03/09/ubuntu%E7%B3%BB%E7%BB%9F%E8%B0%83%E8%8A%82GPU%E9%A3%8E%E6%89%87%E8%BD%AC%E9%80%9F

---

coolgpus does not work for some graphics cards, in this case, you can use [set_gpu_fans_public](https://github.com/boris-dimitrov/set_gpu_fans_public). After downloading set_gpu_fans_public, you need to change the paths of the `nvidia-smi` and `nvidia-settings` commands in the two scripts of cool_gpu and nvscmd to the correct path. In addition, you need to modify the path of the dir in cool_gpu to the correct path. The package [xorg-xinit](https://archlinux.org/packages/extra/x86_64/xorg-xinit/) is then required to be installed. Finally, create a symbolic link and start it with tcsh in its directory located in /opt, see its code comments for details.

- https://www.codeleading.com/article/26244997267/
- https://www.jianshu.com/p/ab956df5e40c

---

Ref:

- https://forums.developer.nvidia.com/t/set-fan-speed-without-an-x-server-solved/35627
- https://forums.developer.nvidia.com/t/fan-speed-without-x-headless-powermizer-drops-card-to-p8/37917
- https://github.com/boris-dimitrov/set_gpu_fans_public
- https://github.com/iaalm/GPUFanSpeed
- https://www.google.com/search?q=TOC-Faking-a-Head-for-a-Headless-X-Server+347

### Graphics card overclocking in headless conditions

In the case of starting the graphical interface, overclocking the Nvidia graphics card is relatively simple, please refer to [arch wiki](https://wiki.archlinux.org/title/NVIDIA/Tips_and_tricks#Overclocking_and_cooling) for details. This section describes overclocking Nvidia graphics cards in a headless environment without starting the GUI.

The general overclocking ideas related to Ethereum are: overclocking memory, down/locking the core, and limiting the maximum power if necessary.

For more complete steps, please refer to the article [Linux Overclocking Graphics Card Via Command Line](https://jybb.me/linux-overclock-graphic-card-via-cli), and follow the steps. Here are some additional considerations:

- When editing `/etc/X11/xorg.conf`, the value of `ConnectedMonitor` needs to be filled in according to the actual value in your own generated file. In ArchLinux its value is generally `Monitor0` instead of `DFP-0`.
- When setting different perf levels during overclocking, generally the value of [4] corresponds to the current preferred maximum performance level. The ratings shown in nvidia-smi do not seem to correspond to the numbers here. If you are not sure about your current level, try it from 1 to 4.
- If you are still not sure about the perf level, you can directly use the adjustments corresponding to all levels, such as `GPUMemoryTransferRateOffsetAllPerformanceLevels` and `GPUGraphicsClockOffsetAllPerformanceLevels`.
- If the overclocking command is executed directly in the terminal, the parameters following the -a option of nvidia-settings can be wrapped without single quotes, but if executed in a script, the parameters need to be wrapped with single quotes.
- Lock the core frequency of a graphics card with this command: `nvidia-smi -i 0 -lgc 1075`. This command limits the core frequency of the zeroth graphics card to 1075. Note that if the frequency limit is set too high, but the power or performance is insufficient, the frequency will drop and eventually settle at a value below the set lock frequency.
- Even with the same model of graphics card, the physique and type of video memory may be different. Therefore, you need to adjust slowly according to the actual physique of your graphics card to find the most stable overclocking parameters. The existing overclocking parameters on the Internet can only be used as a rough reference.
- The lighting problem of the graphics card, many 20, 30 series new graphics cards use I2C control, but the NVIDIA linux driver does not support it, the traditional control through the `GPULogoBrightness` parameter can no longer take effect. See [github issue](https://github.com/NVIDIA/nvidia-settings/issues/48)
- If overclocking is not possible, try restarting the lightdm service and overclocking again.

Ref:

- [ethminer overlock guide](https://github.com/ethereum-mining/ethminer/issues/456#issuecomment-370224878)
- [NVIDIA-SMI 系列命令总结](https://blog.csdn.net/handsome_bear/article/details/80903477)
- [nvidia-smi: Control Your GPUs](https://www.microway.com/hpc-tech-tips/nvidia-smi_control-your-gpus/)

---

AMD graphics cards are much easier to overclock than Nvidia graphics cards in a headless environment. Just refer to the wiki. For overclocking tools, it is recommended to use [amdgpu-clocks-git](https://aur.archlinux.org/packages/amdgpu-clocks-git).

Ref:

- [AMD RX 470(D) Linux 挖矿](https://reimu.moe/2021/03/10/AMD-RX470-D-Linux-Mining/)
- [Arch wiki](https://wiki.archlinux.org/title/AMDGPU#Overclocking)

---

### Firewall Protection

If you enable some monitoring panels for use in the intranet environment, you need to pay attention to opening the firewall protection, because the devices in your intranet may have malware, scan, monitor and report the ports and services in the network.

The ufw tool is used here for firewall protection. First, because it is easy to use, and second, because ufw does not conflict with v2raya, it can be used normally. firewalld does not work properly with v2raya by default.

```bash
sudo pacman -S ufw
sudo systemctl enable --now ufw

sudo ufw default deny #default deny

sudo ufw allow from YOUR_TRUST_LAN_IP #Only allow connections from your trusted intranet ip
sudo ufw allow ssh #Allow ssh so that the internal network and the external network can connect through nps ssh
sudo ufw allow 8024 #Allow the default bridge communication port of nps to work

sudo ufw enable #Enable after setting is complete
sudo ufw status #Check status
```

Ref: https://wiki.archlinux.org/title/Uncomplicated_Firewall

### Auxiliary commands

You can use the following command to check the identified graphics card numbers, this command will list the graphics card numbers that are actually recognized by the system.

```bash
ls /sys/class/drm | grep "^card[[:digit:]]$"
```

You can use the following command to view the details of each graphics card device

```bash
sudo lspci -vnn | grep VGA -A 12
```

You can use [speedtest-cli](https://archlinux.org/packages/community/any/speedtest-cli/) to test the network speed in the terminal

```bash
sudo pacman -S speedtest-cli
speedtest-cli
```
