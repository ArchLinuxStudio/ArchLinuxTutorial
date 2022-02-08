# 虚拟货币挖矿

本节描述如何在 Arch Linux 中进行虚拟货币挖矿。

## 背景

一提到虚拟货币与挖矿，很多人对虚拟货币矿工恨之入骨，并对虚拟货币本身持怀疑和否认态度，当然，这和其所在国家政府的宣传导向有关，可以理解。对于虚拟货币矿工而言，他们当中的大多数人确实只为利润而从事这个行业，而对于我们来说，进行虚拟货币挖矿有两个主要理由。第一点，进行虚拟货币挖矿，以及后续的交易，可以帮助你避免无处不在的支付监控和管制，帮助你保证自己的隐私安全。第二点，使用虚拟货币可以当作另外的一种资产，当你所在的国家法币缺乏信用、并限制你获取外汇时，虚拟货币可以作为风险抵御的一种手段。

## 注意事项

由于个别国家对于虚拟货币的全面禁止与管制，如果你在这些个别国家从事挖矿，则需要注意如下几点：

- 在进行挖矿的设备上使用全局代理，包括代理 DNS。这不仅能够使你连接到矿池等网站，也可以帮助你隐藏自己正在访问虚拟货币相关网站的动作，从而避开 ISP 或者政府相关部门的监视。这里可以使用 v2raya，它可以使你通过浏览器远程管理挖矿设备的网络，而不用在挖矿设备上安装任何图形化界面程序。
- 在添加新设备之后，可能需要移除主板 BIOS 电池来放电，注意在放电后系统时间会重置，这会导致 v2ray 无法使用。这种情况下记得先重新校准系统时间。
- 控制你进行挖矿场所的电费使用情况在一个合理范围内。如果电费使用情况过于离谱，可能会引起某些政府部门的怀疑和监视。

## 钱包与地址

关于在 Arch Linux 上钱包的选择与地址的获取，在[现代隐私保护指南](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/anonymous_pay)的章节中有详细描述，本文不再赘述。

## 选择矿池

在获得自己的虚拟货币地址后，要进行矿池的选择。简单来说，虚拟货币矿工自行进行挖矿，效率是较为低下的。加入矿池，并进行分成是更具效率的挖矿方式。矿池有非常多，有着各自不同的手续费收取方式以及收取比例。本文选择[unmineable](https://unmineable.com/)矿池，其一个优点为完全不需要注册即可使用。

在进入矿池后，可以选择你需要进行挖矿的币种。注意，这里的币种选择不是你实际进行此币种的挖矿操作，而是你进行 Ethereum 的挖矿，然后 unmineable 矿池将收益转化成你所选择的币种再支付给你。

## 使用工具挖矿

挖矿工具也有很多以供选择，本文主要讲述 xmrig 用于 CPU 挖矿，LoLMiner/NBminer 进行 AMD GPU 挖矿、以及 t-rex 进行 Nvidia GPU 挖矿。一般来说，使用 GPU 挖矿效率更高。

### t-rex

使用 Nvidia 显卡挖矿时，需要首先安装 cuda。

t-rex 可从[github 下载地址](https://github.com/trexminer/T-Rex/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/trex-bin/) 安装。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 ethash 进行 TRX 的挖矿。

```bash
./t-rex -a ethash -o ethash-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner1#31ee-jt8k -p x
```

其中-a 参数指定算法。-o 指定矿池的 ip 和端口号，这些参数你可以在矿池页面找到。-u 参数指定币种、收币地址、主机名、以及优惠码，其中收币地址需要更换成你自身的地址，而使用优惠码可以减免 0.25%的手续费。

需要注意的是，t-rex 运行后会在本机 127.0.0.1:4067 开启控制面板，你可在其中进行各类信息的查看。如果想要在其他机器访问挖矿机器面板，则需额外指定`--api-bind-http 0.0.0.0:4067`参数，这样一来你就可以达到目的。

使用英伟达显卡挖矿也需要额外对风扇转速进行设置，否则风扇不会根据温度来调整转速，即使温度较高，也近会运行在较低的转速，这个问题在进行深度学习等操作时仍然存在。目前我们只确定可以通过图形化界面的 Nvidia-settings 进行转速设置，尚未找到有效的，不需要安装桌面环境，直接可在终端中进行风扇转速调整的方法。这是由于英伟达显卡的设置依赖 Xorg 造成的。在此提供一些资料以供参考，但是我们未能在 Arch Linux 上找到有效的，可以成功实施的解决方案。如果你成功在 Arch Linux 上完成了在无 Xorg 的环境下，纯终端配置风扇转速，欢迎你提交 pull request。

- https://forums.developer.nvidia.com/t/set-fan-speed-without-an-x-server-solved/35627
- https://forums.developer.nvidia.com/t/fan-speed-without-x-headless-powermizer-drops-card-to-p8/37917
- https://github.com/boris-dimitrov/set_gpu_fans_public
- https://github.com/iaalm/GPUFanSpeed
- https://www.google.com/search?q=TOC-Faking-a-Head-for-a-Headless-X-Server+347

### lolMiner

在使用 AMD 显卡进行挖矿时，需要注意目前各个挖矿算法对于 AMD 开源 mesa 驱动支持非常不到位，我们尝试过多款常见的 AMD 挖矿软件均无法运行，显示段错误。解决方案是使用专有 AMD 驱动 [opencl-amd](https://aur.archlinux.org/packages/opencl-amd/)。然而在 AUR 中最新版本的 opencl-amd 驱动仍无法作用，解决方案是使用[旧版的 20.45 版本的驱动程序](https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=opencl-amd&id=99929da87153c0f36a2a9497c38221c12307ecfc)。将 PKGBUILD 下载后使用 makepkg 生成包并安装。使用其他 AMD 挖矿程序时均需要此操作。

接下来需要对 AMD 显卡的风扇风速进行设定。安装软件 amdgpu-fan 并启用服务即可。amdgpu-fan 会根据显卡温度自动调整风扇转速。

```
yay -S amdgpu-fan
sudo systemctl enable --now amdgpu-fan
```

关于更多 AMD 显卡风扇转速的设置方法可参考 [Arch Wiki](https://wiki.archlinux.org/title/fan_speed_control#AMDGPU_sysfs_fan_control).

下载 [lolMiner](https://github.com/Lolliedieb/lolMiner-releases) 并运行：

```bash
./lolMiner --algo ETHASH --pool ethash-asia.unmineable.com:3333 --user ETH:0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.arcccc1#tosi-6k1y --ethstratum ETHPROXY pause --apihost 0.0.0.0  --apiport  2233
```

### nbminer

下载 [nbminer](https://github.com/NebuTech/NBMiner/releases) 并运行：

```bash
./nbminer -a ethash -o stratum+tcp://ethash-asia.unmineable.com:3333 -u ETH:0xxxxxxxxxxxxxxxxxxxxxxxxx.arcccc1#tosi-6k1y -log
```

### xmrig

xmrig 可从[github 下载地址](https://github.com/xmrig/xmrig/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/?O=0&SeB=nd&K=xmrig&outdated=&SB=n&SO=a&PP=50&do_Search=Go) 安装。注意，其有多个版本可供选择，如 xmrig-donateless 是去除内置 1%捐赠的版本，xmrig-cuda 是 xmrig cuda backends 的插件，你可以根据需要自行选择。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 RandomX 进行 TRX 的挖矿。

```bash
xmrig -o rx-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner2#31ee-jt8k -p x --1g
```

其中部分参数含义同上， --1g 参数为开启 1g 大页面的支持。

## 提现

在达到要求体现的最小限额后，你即可在矿池发起提现。提现有一定等待时间，需要耐心等待。

---

## 附加说明

TRON 网络自身会屏蔽一些 IP 地址，经过我们验证的有亚洲香港，新加坡，未经过我们验证的可能也有其他地区。如果你使用这些被屏蔽的地区的代理来使用 TRON 网络，操作 TRON 钱包，你可能会遇到如下的问题。在你想要给某人发送 TRON 钱包中的货币时，如 USDT,你的余额可能从你的余额的实际数值突然跳转至 0，这将使你无法继续发送货币给对方，解决办法如下。

使用一个欧盟地区的代理来进行以下操作。

1. 先从你的原有钱包里导出 TRON 钱包的私钥。
2. 在设置中重新下载备份文件。
3. 使用一个你未曾使用过虚拟货币钱包如 Guarda 的浏览器，重新进入钱包，选择"Restore or Import"选项
4. 选择"Import by currency"，然后将刚刚得到的 TRON 钱包的私钥填入其中

做完如上步骤后，再发送 USDT 即可一切正常。

另外一个可能的问题是，导入巨量的钱包时，上述问题可能重现。
