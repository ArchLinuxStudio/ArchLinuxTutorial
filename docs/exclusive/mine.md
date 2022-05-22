# 加密货币挖矿

本节描述如何在 Arch Linux 中进行加密货币挖矿。一提到加密货币与挖矿，很多中国读者对加密货币与挖矿有着很深的误解与偏见，这实际上与其国家政府及其控制的媒体、自媒体的宣传导向有关。我们不希望我们的读者被蒙蔽，所以在本文中将进行一些解释。

为什么有人反对加密货币？第一，加密货币在某些威权政府中被视为会威胁其独裁统治的存在，是极其危险与不可控的，所以要进行全面禁止。第二，加密货币已经形成相当庞大的交易市场，其已经对传统的金融行业产生了一定的影响与冲击，所以以巴菲特为首的部分商界代表公开反对加密货币。第三，加密货币在恐怖主义、诈骗与洗钱方面的应用，以及加密货币不环保等较为边缘的理由。

我们为何支持加密货币？第一，使用加密货币对于无处不在的监视与审计进行反抗。在一些国家中，各种应用广泛的支付手段已经被完全绑定实名，以及进行了全面的监视与审查，个人隐私丝毫没有保障。使用加密货币可以很好的保护你自身的隐私。即使不使用 XMR 等能够高度保证隐私的加密货币，仅仅只使用(正确的使用)普通加密货币也能在很大程度上保障你个人的隐私。第二，加密货币可以作为对抗法币的不稳定性，资产多样化的一种工具。即使很多政府以及各类名流不断的对加密货币进行禁止和否定，加密货币依然安然度过了十余个年头。法币是否稳定？这个问题读者可以自行思考一些国家二十年来法币购买力的变化，一些国家全面禁止加密货币起因何在？读者们应该能够有自己的理解。持有在全世界广泛流通的加密货币，能够提升你在抵御法币风险时的能力，保障自身的权益。第三，即使没有加密货币，恐怖主义、诈骗与洗钱仍然广泛存在于世界，不能因为加密货币可以用于这些用途，就将其归罪与加密货币，这是荒唐的逻辑，提出此类观点的人或组织一般都存在其他的目的。

我们为何支持加密货币挖矿？由于我们的读者大多来自中国，他们通过正规且安全的渠道购买加密货币的手段已经越来越少，从 2022 年目前来看，他们可以获取加密货币的途径只有以下几种：

- 使用仍允许中国用户进行交易的交易所进行买入
- 线下交易
- 通过挖矿获取

通过简单的搜索即可发现，目前仍可使用的交易所，某些具有强劲的政府背景，这样的交易所几乎无法保证安全。即使你可以通过此类交易所进行买入与转出，与你实名认证相关的持有、交易、提现到链的记录也可以被轻松获取。实际上，你不应该使用任何中心化交易所。

线下交易则是更难，而且风险更高的方式，这一点应该无需赘述。

所以综上所述，挖矿是对于处在被压迫的国家或地区的人们**唯一**安全且方便的获取加密货币的方式。

如果你对于加密货币一无所知，可以参考[币安学院](https://academy.binance.com/zh/search?page=1)的系列文章入门，数百篇从低阶到高阶的文章可以供你阅读。

## 注意事项

在进行挖矿前，在安全方面与使用方面，均有一些重要事项需要提前提醒：

- 由于个别国家对于加密货币的全面禁止与管制，在进行挖矿的设备上需要使用全局代理，包括代理 DNS。这不仅能够使你连接到矿池等网站，也可以帮助你隐藏自己正在访问加密货币相关网站的动作，从而避开 ISP 或者政府相关部门的监视。这里可以使用 v2raya，它可以使你通过浏览器远程管理挖矿设备的网络，而不用在挖矿设备上安装任何图形化界面程序。
- 在添加新设备之后，可能需要移除主板 BIOS 电池来放电，注意在放电后系统时间会重置，这会导致 v2ray 无法使用。这种情况下记得先重新校准系统时间。
- 控制你进行挖矿场所的电费使用情况在一个合理范围内。如果电费使用情况过于离谱，可能会引起某些政府部门的怀疑和监视。
- 主板 BIOS 设置中，需要开启`Above 4G Decoding`选项以支持多张(一般为 4 张以上)图形显示卡。此设置一般存在于 PCIE 设置中。此设置启用芯片组 64bit 兼容性硬件物理寻址，在关闭时 BIOS 只能使用 32bit 硬件物理寻址。
- 主板 BIOS 设置中，将 PCI-E 速率调整为 Gen2 或 Gen1。否则可能发生无法识别显卡的问题。

## 钱包与地址

关于在 Arch Linux 上钱包的选择与地址的获取，在[现代隐私保护指南](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/anonymous_pay)的章节中有详细描述，本文不再赘述。

## 选择矿池

在获得自己的加密货币地址后，要进行矿池的选择。简单来说，加密货币矿工自行进行挖矿，效率是较为低下的。加入矿池，并进行分成是更具效率的挖矿方式。矿池有非常多，有着各自不同的手续费收取方式以及收取比例。对于新手来讲，选择[unmineable](https://unmineable.com/)矿池是不错的选择，它的界面简单易用。

在进入矿池后，可以选择你需要进行挖矿的币种。注意，这里可以选择的一些实际不能挖矿的币种，不是你实际进行此币种的挖矿操作，而是你进行 Ethereum 等可以挖掘币种的挖矿，然后 unmineable 矿池将收益转化成你所选择的币种再支付给你。

## 使用工具挖矿

挖矿工具也有很多以供选择，本文主要讲述 xmrig 用于 CPU 挖矿，LoLMiner 进行 AMD GPU 挖矿、以及 t-rex 进行 Nvidia GPU 挖矿。[ethminer](https://github.com/ethereum-mining/ethminer)则是使用 GPL-3.0 协议的自由软件，是一款通用的以太坊挖矿软件。一般来说，使用 GPU 进行 Ethereum 挖矿效率更高。

### xmrig

xmrig 可从[github 下载地址](https://github.com/xmrig/xmrig/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/?O=0&SeB=nd&K=xmrig&outdated=&SB=n&SO=a&PP=50&do_Search=Go) 安装。xmrig 是使用 GPL-3.0 许可的自由软件。xmrig-cuda 是 xmrig cuda backends 的插件，你可以根据需要自行选择。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 RandomX 进行 TRX 的挖矿。

```bash
xmrig -o rx-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner1 -p x --1g
```

其中部分参数含义同上， --1g 参数为开启 1g 大页面的支持。

### T-Rex

使用 Nvidia 显卡挖矿时，需要首先安装 [cuda](https://archlinux.org/packages/community/x86_64/cuda/)。

T-Rex 可从[github 下载地址](https://github.com/trexminer/T-Rex/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/trex-bin/) 安装。T-Rex 是专有软件。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 ethash 进行 TRX 的挖矿。

```bash
./t-rex -a ethash -o ethash-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner1 -p x
```

其中-a 参数指定算法。-o 指定矿池的 ip 和端口号，这些参数你可以在矿池页面找到。-u 参数指定币种、收币地址、主机名、以及优惠码，其中收币地址需要更换成你自身的地址，而使用优惠码可以减免 0.25%的手续费。

需要注意的是，t-rex 运行后会在本机 127.0.0.1:4067 开启控制面板，你可在其中进行各类信息的查看。如果想要在其他机器访问挖矿机器面板，则需额外指定`--api-bind-http 0.0.0.0:4067`参数，这样一来你就可以达到目的。

使用英伟达显卡挖矿也需要额外对风扇转速进行设置，否则风扇不会根据温度来调整转速，即使温度较高，也近会运行在较低的转速，这个问题在进行深度学习等操作时仍然存在。如果你启动了图形化界面，则可通过 nvidia-settings 进行转速设置。英伟达显卡的转速设置依赖 X server 造成的，所以默认情况下，如果不启动 X server 则无法进行风扇调速。此时可以使用工具[coolgpus](https://github.com/andyljones/coolgpus)，其工作原理是，它会为每个 GPU 设置一个临时 X server。然后，它每隔几秒钟循环查看一次 GPU，并根据它们的温度设置风扇速度。当脚本终止时，它会将风扇的控制权返回给驱动程序并清理 X server。pip 安装的 coolgpus 位于`~/.local/bin/coolgpus`。

- https://ximikang.icu/2021/03/09/ubuntu%E7%B3%BB%E7%BB%9F%E8%B0%83%E8%8A%82GPU%E9%A3%8E%E6%89%87%E8%BD%AC%E9%80%9F

---

coolgpus 在一些显卡无法生效，这种情况下可以使用[set_gpu_fans_public](https://github.com/boris-dimitrov/set_gpu_fans_public)。下载 set_gpu_fans_public 后，需要更改其 cool_gpu 以及 nvscmd 两个脚本中 `nvidia-smi`以及`nvidia-settings` 命令的路径为正确路径，除此之外还需修改 cool_gpu 中 dir 的路径为正确路径。随后需要安装包[xorg-xinit](https://archlinux.org/packages/extra/x86_64/xorg-xinit/)。最后创建符号链接，在位于 /opt 其目录中用 tcsh 启动，详见其代码注释。

- https://www.codeleading.com/article/26244997267/
- https://www.jianshu.com/p/ab956df5e40c

---

Ref:

- https://forums.developer.nvidia.com/t/set-fan-speed-without-an-x-server-solved/35627
- https://forums.developer.nvidia.com/t/fan-speed-without-x-headless-powermizer-drops-card-to-p8/37917
- https://github.com/boris-dimitrov/set_gpu_fans_public
- https://github.com/iaalm/GPUFanSpeed
- https://www.google.com/search?q=TOC-Faking-a-Head-for-a-Headless-X-Server+347

### lolMiner

lolMiner 是专有软件。

在使用 AMD 显卡进行挖矿时，如果你使用 AMD 开源 mesa 驱动则有可能无法运行挖矿软件。解决方案是使用专有 AMD 驱动 [opencl-amd](https://aur.archlinux.org/packages/opencl-amd/)。然而在 AUR 中最新版本的 opencl-amd 驱动仍可能无法作用，如果你遇到此问题，解决方案是使用[旧版的 20.45 版本的驱动程序](https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=opencl-amd&id=99929da87153c0f36a2a9497c38221c12307ecfc)。将 PKGBUILD 下载后使用 makepkg 生成包并安装。使用其他 AMD 挖矿程序时均可能需要此操作。

接下来需要对 AMD 显卡的风扇风速进行设定。安装软件 amdgpu-fan 并启用服务即可。amdgpu-fan 会根据显卡温度自动调整风扇转速。注意，[AUR 当前的版本](https://github.com/zzkW35/amdgpu-fan/issues/2)存在开机无法自动启动生效的问题，根据[Issue](https://github.com/zzkW35/amdgpu-fan/issues/2)描述，其上游[源仓库](https://github.com/chestm007/amdgpu-fan)不存在此问题。

```
yay -S amdgpu-fan
sudo systemctl enable --now amdgpu-fan
```

关于更多 AMD 显卡风扇转速的设置方法可参考 [Arch Wiki](https://wiki.archlinux.org/title/fan_speed_control#AMDGPU_sysfs_fan_control).

下载 [lolMiner](https://github.com/Lolliedieb/lolMiner-releases) 并运行：

```bash
./lolMiner --algo ETHASH --pool ethash-asia.unmineable.com:3333 --user ETH:0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner1 --ethstratum ETHPROXY pause --apihost 0.0.0.0  --apiport YOUR_PORT
```

## 提现

在达到要求提现的最小限额后，你即可在矿池发起提现。提现有一定等待时间，需要耐心等待。

## 防火墙防护

如果你在内网环境中启用一些监控面板以便使用，则需要注意开启防火墙防护，因为你的内网中的设备，可能存在恶意软件，对网络中的端口、服务进行扫描、监视并上报。

这里采用 ufw 工具进行防火墙防护。第一，因为其使用简单，第二，因为 ufw 与 v2raya 无冲突，可正常使用。firewalld 默认情况下无法与 v2raya 同时正常使用。

```bash
sudo pacman -S ufw
sudo systemctl enable --now ufw

sudo ufw default deny #默认拒绝

sudo ufw allow from YOUR_TRUST_LAN_IP #只允许你信任的内网 ip 连接
sudo ufw allow ssh #允许 ssh 以便内网以及外网通过 nps 的ssh连接
sudo ufw allow 8024 #允许 nps 的默认网桥通信端口工作

sudo ufw enable #设置完成后启用
sudo ufw status #检查状态
```

Ref: https://wiki.archlinux.org/title/Uncomplicated_Firewall

## 辅助命令

你可用如下命令查看识别到的显卡编号，此命令将列出真正被系统识别可用的显卡编号。

```bash
ls /sys/class/drm | grep "^card[[:digit:]]$"
```

你可用如下命令查看各个显卡设备的详情

```bash
sudo lspci -vnn | grep VGA -A 12
```

你可用[speedtest-cli](https://archlinux.org/packages/community/any/speedtest-cli/)在终端下测试网速情况

```bash
sudo pacman -S speedtest-cli
speedtest-cli
```

## Nvidia 显卡 headless 环境超频

在启动图形界面的情况下，Nvidia 显卡超频较为简单，具体请参考[arch wiki](https://wiki.archlinux.org/title/NVIDIA/Tips_and_tricks#Overclocking_and_cooling)。本节讲述在不启动图形界面的情况下，也即 headless 环境下 Nvidia 显卡的超频操作。

以太坊相关一般的超频思路是：超显存，降/锁核心，有必要的情况下限制最大功率。

较为完整的步骤可以参考文章[Linux 透過命令行對顯示卡超頻](https://jybb.me/linux-overclock-graphic-card-via-cli)，按照其中的步骤执行即可。这里列出一些需要额外注意的事项:

- 在编辑`/etc/X11/xorg.conf`时，`ConnectedMonitor`的值需要根据你自身生成文件中的实际值来填写。在 ArchLinux 中其值一般为`Monitor0`而不是`DFP-0`。
- 在超频时对不同 perf 级别进行设置时，一般[4]的值对应的是当前偏好的最大性能等级。nvidia-smi 中显示的等级似乎并不和此处的数字对应。如果不确定当前等级，可以从 1 到 4 依次尝试。
- 如果你仍不确定 perf 等级，可以直接使用对应所有等级的调整，如`GPUMemoryTransferRateOffsetAllPerformanceLevels`以及`GPUGraphicsClockOffsetAllPerformanceLevels`。
- 如果在终端直接执行超频命令，nvidia-settings 的-a 选项后续的参数可以不加单引号包裹，但是如果在脚本中执行，需要用单引号包裹参数。
- 通过此命令锁定某个显卡的核心频率: `nvidia-smi -i 0 -lgc 1075`。此命令将第零张显卡的核心频率限制为 1075。注意，如将频率限制过高，但是功率或性能不足的情况下，频率会下降，并最终稳定在一个低于所设置的锁定频率的值上。
- 即使是相同型号的显卡，显存的体质、类型都可能不同。所以你需要根据自己显卡的实际体质来慢慢调整，找到最稳定的超频参数，网络上现有的超频参数仅能做一个大致的参考。
- 显卡的灯光问题，很多 20，30 系新显卡采用 I2C 控制，而英伟达 linux 驱动不支持，传统的通过`GPULogoBrightness`参数控制已经不能生效。详见[github issue](https://github.com/NVIDIA/nvidia-settings/issues/48)

Ref:

- [ethminer overlock guide](https://github.com/ethereum-mining/ethminer/issues/456#issuecomment-370224878)
- [NVIDIA-SMI 系列命令总结](https://blog.csdn.net/handsome_bear/article/details/80903477)
- [nvidia-smi: Control Your GPUs](https://www.microway.com/hpc-tech-tips/nvidia-smi_control-your-gpus/)

## AMD 显卡 headless 环境超频

AMD 显卡 headless 环境下超频相较 Nvidia 显卡则容易很多，参考 wiki 即可，对于超频工具，推荐使用[amdgpu-clocks-git](https://aur.archlinux.org/packages/amdgpu-clocks-git)。

Ref:

- [AMD RX 470(D) Linux 挖矿](https://reimu.moe/2021/03/10/AMD-RX470-D-Linux-Mining/)
- [Arch wiki](https://wiki.archlinux.org/title/AMDGPU#Overclocking)

---

## 附加说明

TRON 网络自身会屏蔽一些 IP 地址，经过我们验证的有亚洲香港，新加坡，未经过我们验证的可能也有其他地区。如果你使用这些被屏蔽的地区的代理来使用 TRON 网络，操作 TRON 钱包，你可能会遇到如下的问题。在你想要给某人发送 TRON 钱包中的货币时，如 USDT,你的余额可能从你的余额的实际数值突然跳转至 0，这将使你无法继续发送货币给对方，解决办法如下。

使用一个欧盟地区的代理来进行以下操作。

1. 先从你的原有钱包里导出 TRON 钱包的私钥。
2. 在设置中重新下载备份文件。
3. 使用一个你未曾使用过加密货币钱包如 Guarda 的浏览器，重新进入钱包，选择"Restore or Import"选项
4. 选择"Import by currency"，然后将刚刚得到的 TRON 钱包的私钥填入其中

做完如上步骤后，再发送 USDT 即可一切正常。

另外一个可能的问题是，导入巨量的钱包时，上述问题可能重现。
