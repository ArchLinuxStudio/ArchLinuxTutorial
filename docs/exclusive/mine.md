# 加密货币入门

本节将简述加密货币的一些基本概念，以及我们的解读。同时，将教授读者如何在 Arch Linux 上进入加密货币的世界。一提到加密货币与挖矿，很多中国读者对加密货币与挖矿有着很深的误解与偏见，这实际上与其国家政府及其控制的媒体、自媒体的宣传导向有关。我们不希望我们的读者被蒙蔽，所以在本文中将进行一些解释。

## 什么是加密货币

加密货币是一种使用密码学原理来确保交易安全及控制交易单位创造的交易介质。这种维基百科式的描述较难懂。我们尝试用更简单的语言进行描述。加密货币的鼻祖是比特币(BTC)，其始发与 2009 年。在比特币的创世区块中，嵌入了一句话`The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.`。这对传统金融行业进行了讽刺，同时表明了创始人中本聪的立场。符合比特币理念的加密货币一般都有如下特点。

- 去中心化，货币的分布和决策不由中心化的组织，如政府，银行等任何集权形式的组织决定。参与挖矿，就能得到属于自己的一份收益。
- 在正确使用的前提下，一般都能很大程度的保护使用者的个人隐私。
- 货币本身**真正**由其拥有者所持有，真正实现了私有财产不可侵犯。货币的拥有者持有私钥，其他没有私钥的人无法扣押、冻结、没收其加密货币资产。

## 为什么使用加密货币？

作为自由软件运动的支持者，我们同时支持使用加密货币，原因如下：

- 第一，使用加密货币对于无处不在的监视与审计进行反抗。在一些国家中，各种应用广泛的支付手段已经被完全绑定实名，以及进行了全面的监视与审查，个人隐私丝毫没有保障。使用加密货币可以很好的保护你自身的隐私。即使不使用 XMR 等能够高度保证隐私的加密货币，仅仅只使用(正确的使用)普通加密货币也能在很大程度上保障你个人的隐私。
- 第二，因为一些国家的法定货币没有或几乎没有信用，使用加密货币可以抵御这种风险，作为资产多样化的一种工具。即使很多政府以及各类名流不断的对加密货币进行禁止和否定，加密货币依然安然度过了十余个年头。法币是否稳定？这个问题读者可以自行思考一些国几十年来法币购买力的变化，一些国家全面禁止加密货币起因何在？读者们应该能够有自己的理解。持有在全世界广泛流通的加密货币，能够提升你在抵御法币风险时的能力，保障自身的权益。
- 第三，即使没有加密货币，恐怖主义、诈骗与洗钱仍然广泛存在于世界，不能因为加密货币可以用于这些用途，就将其归罪与加密货币，这是荒唐的逻辑，提出此类观点的人或组织一般都存在其他的目的。

为什么有人反对加密货币？

- 第一，加密货币在某些极权政府中被视为会威胁其独裁统治的存在，是极其危险与不可控的，所以要进行全面禁止。
- 第二，加密货币已经形成较为庞大的交易市场，其已经对传统的金融行业产生了一定的影响与冲击，所以以巴菲特为首的部分商界代表公开反对加密货币。
- 第三，加密货币在恐怖主义、诈骗与洗钱方面的应用，以及加密货币不环保等较为边缘的理由。

## 在 Arch Linux 上进入加密货币的世界

### 钱包与地址

如果要使用加密货币，首先要拥有一个钱包。目前来说使用最广泛的浏览器钱包是[Metamask](https://metamask.io/)，在你所使用的浏览器的扩展商店中，安装 Metamask 插件即可使用。浏览器钱包可以使你方便的使用目前海量的去中心化程序，包括很多金融应用以及社区、游戏等，但是一般来说其安全性并不如其他非托管式钱包以及冷钱包。

关于在 Arch Linux 上钱包的选择与地址的获取，在[现代隐私保护指南](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/anonymous_pay)的章节中有详细描述，本文不再赘述。

如果你需要匿名购买加密货币的渠道，可以考虑使用[localmonero](https://localmonero.co/)提供的购买门罗币的服务。在购买后门罗币地址间的互转是匿名的，对外部不可见的。如需转换门罗币至其他币种，以使用非中国大陆的加密货币兑换平台如[changenow](https://changenow.io/)。

### 挖矿

挖矿是进入加密货币世界最直接的方式，本节描述如何在 Arch Linux 中进行加密货币挖矿。

由于我们的读者大多来自中国，他们通过正规且安全的渠道购买加密货币的手段已经越来越少，从 2022 年目前来看，他们可以获取加密货币的途径只有以下几种：

- 使用仍允许中国用户进行交易的交易所进行买入
- 线下交易
- 通过挖矿获取

通过简单的搜索即可发现，目前仍可使用的交易所，某些具有强劲的政府背景，这样的交易所几乎无法保证安全。即使你可以通过此类交易所进行买入与转出，与你实名认证相关的持有、交易、提现到链的记录也可以被轻松获取。实际上，你不应该使用任何中心化交易所。

线下交易则是更难，而且风险更高的方式，这一点应该无需赘述。

所以综上所述，挖矿是对于处在被压迫的国家或地区的人们**唯一**安全且方便的获取加密货币的方式。

如果你对于加密货币一无所知，可以参考[币安学院](https://academy.binance.com/zh/search?page=1)的系列文章入门，数百篇从低阶到高阶的文章可以供你阅读。

---

在进行挖矿前，在安全方面与使用方面，均有一些重要事项需要提前提醒：

- 由于个别国家对于加密货币的全面禁止与管制，在进行挖矿的设备上需要使用全局代理，包括代理 DNS。这不仅能够使你连接到矿池等网站，也可以帮助你隐藏自己正在访问加密货币相关网站的动作，从而避开 ISP 或者政府相关部门的监视。这里可以使用 v2rayA，它可以使你通过浏览器远程管理挖矿设备的网络，而不用在挖矿设备上安装任何图形化界面程序。
- 在添加新设备之后，可能需要移除主板 BIOS 电池来放电，注意在放电后系统时间会重置，这会导致 v2ray 无法使用。这种情况下记得先重新校准系统时间。
- 控制你进行挖矿场所的电费使用情况在一个合理范围内。如果电费使用情况过于离谱，可能会引起某些政府部门的怀疑和监视。
- 主板 BIOS 设置中，需要开启`Above 4G Decoding`选项以支持多张(一般为 4 张以上)图形显示卡。此设置一般存在于 PCIE 设置中。此设置启用芯片组 64bit 兼容性硬件物理寻址，在关闭时 BIOS 只能使用 32bit 硬件物理寻址。
- 主板 BIOS 设置中，将 PCI-E 速率调整为 Gen2 或 Gen1。否则可能发生无法识别显卡的问题。

---

在获得自己的加密货币地址后，要进行矿池的选择。简单来说，加密货币矿工自行进行挖矿，效率是较为低下的。加入矿池，并进行分成是更具效率的挖矿方式。矿池有非常多，有着各自不同的手续费收取方式以及收取比例。对于新手来讲，选择[unmineable](https://unmineable.com/)矿池是不错的选择，它的界面简单易用。

在进入矿池后，可以选择你需要进行挖矿的币种。注意，这里可以选择的一些实际不能挖矿的币种，不是你实际进行此币种的挖矿操作，而是你进行 Ethereum 等可以挖掘币种的挖矿，然后 unmineable 矿池将收益转化成你所选择的币种再支付给你。具体的操作可以参考 unmineable 网站的文章。在达到要求提现的最小限额后，你即可在矿池发起提现。提现有一定等待时间，需要耐心等待。

---

使用 Nvidia 显卡挖矿时，需要首先安装 [cuda](https://archlinux.org/packages/community/x86_64/cuda/)。

在使用 AMD 显卡进行挖矿时，如果你使用 AMD 开源 mesa 驱动则有可能无法运行挖矿软件。解决方案是暂时使用专有 AMD 驱动 [opencl-amd](https://aur.archlinux.org/packages/opencl-amd/)。然而在 AUR 中最新版本的 opencl-amd 驱动仍可能无法作用，如果你遇到此问题，解决方案是使用[旧版的 20.45 版本的驱动程序](https://aur.archlinux.org/cgit/aur.git/plain/PKGBUILD?h=opencl-amd&id=99929da87153c0f36a2a9497c38221c12307ecfc)。将 PKGBUILD 下载后使用 makepkg 生成包并安装。使用其他 AMD 挖矿程序时均可能需要此操作。

挖矿工具也有很多以供选择，[ethminer](https://github.com/ethereum-mining/ethminer)则是使用 GPL-3.0 协议的自由软件，是一款通用的以太坊挖矿软件。一般来说，使用 GPU 进行 Ethereum 挖矿效率更高。另外还存在一些流行的专有挖矿软件如 LoLMiner 以及 T-Rex。具体的操作可以参考他们的官方文档。

[xmrig](https://github.com/xmrig/xmrig) 可用于 XMR 的挖矿。xmrig 是使用 GPL-3.0 许可的自由软件。xmrig-cuda 是 xmrig cuda backends 的插件，你可以根据需要自行选择。

---

一般来说，挖矿程序需要设置为自动重启与开机自启，对于这点可以使用 supervisor 来实现，首先进行安装与启动

```bash
sudo pacman -S supervisor
sudo systemctl enable --now supervisord.service
```

随后，在目标目录下建立配置文件，如`/etc/supervisor.d/eth.ini`，随后重启 supervisord 服务使配置生效。这样即可实现自动重启与开机自启的需求。如下是一个样例配置文件。

```ini
[program:eth]
directory=/home/testuser
command=YOUR_MINE_COMMAND
autostart=true
autorestart=true
```

### Headless 条件下的风扇转速调节

在不接入显示器，也即 Headless 的条件下，显卡风扇转速的调节是一件棘手的事情。

对 AMD 显卡的风扇风速进行设定。安装软件 amdgpu-fan 并启用服务即可。amdgpu-fan 会根据显卡温度自动调整风扇转速。注意，[AUR 当前的版本](https://github.com/zzkW35/amdgpu-fan/issues/2)存在开机无法自动启动生效的问题，根据[Issue](https://github.com/zzkW35/amdgpu-fan/issues/2)描述，其上游[源仓库](https://github.com/chestm007/amdgpu-fan)不存在此问题。

```
yay -S amdgpu-fan
sudo systemctl enable --now amdgpu-fan
```

关于更多 AMD 显卡风扇转速的设置方法可参考 [Arch Wiki](https://wiki.archlinux.org/title/fan_speed_control#AMDGPU_sysfs_fan_control).

---

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

### Headless 条件下的显卡超频

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
- 若无法进行超频，可以尝试重新启动 lightdm 服务，再进行超频。

Ref:

- [ethminer overlock guide](https://github.com/ethereum-mining/ethminer/issues/456#issuecomment-370224878)
- [NVIDIA-SMI 系列命令总结](https://blog.csdn.net/handsome_bear/article/details/80903477)
- [nvidia-smi: Control Your GPUs](https://www.microway.com/hpc-tech-tips/nvidia-smi_control-your-gpus/)

---

AMD 显卡 headless 环境下超频相较 Nvidia 显卡则容易很多，参考 wiki 即可，对于超频工具，推荐使用[amdgpu-clocks-git](https://aur.archlinux.org/packages/amdgpu-clocks-git)。

Ref:

- [AMD RX 470(D) Linux 挖矿](https://reimu.moe/2021/03/10/AMD-RX470-D-Linux-Mining/)
- [Arch wiki](https://wiki.archlinux.org/title/AMDGPU#Overclocking)

---

### 防火墙防护

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

### 辅助命令

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
