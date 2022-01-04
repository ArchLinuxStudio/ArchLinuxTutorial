# 虚拟货币挖矿

本节描述如何在 Arch Linux 中进行虚拟货币挖矿。

## 背景

一提到虚拟货币与挖矿，很多人对虚拟货币矿工恨之入骨，并对虚拟货币本身持怀疑和否认态度，当然，这和其所在国家政府的宣传导向有关，可以理解。对于虚拟货币矿工而言，他们当中的大多数人确实只为利润而从事这个行业，而对与我们来说，进行虚拟货币挖矿有两个主要理由。第一点，进行虚拟货币挖矿，以及后续的交易，可以帮助你避免无处不在的支付监控和管制，帮助你保证自己的隐私安全。第二点，使用虚拟货币可以当作另外的一种资产，作为风险抵御的一种手段。

## 注意事项

由于个别国家对于虚拟货币的全面禁止与管制，如果你在这些个别国家从事挖矿，则需要注意如下几点：

- 在进行挖矿的设备上使用全局代理，包括代理 DNS。这不仅能够使你连接到矿池等网站，也可以帮助你隐藏自己正在访问虚拟货币相关网站的动作，从而避开 ISP 或者政府相关部门的监视。
- 控制你进行挖矿场所的电费使用情况在一个合理范围内。如果电费使用情况过于离谱，可能会引起某些政府部门的怀疑和监视。

## 钱包与地址

关于在 Arch Linux 上钱包的选择与地址的获取，在[现代隐私保护指南](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/anonymous_pay)的章节中有详细描述，本文不再赘述。

## 选择矿池

在获得自己的虚拟货币地址后，要进行矿池的选择。简单来说，虚拟货币矿工自行进行挖矿，效率是较为低下的。加入矿池，并进行分成是更具效率的挖矿方式。矿池有非常多，有着各自不同的手续费收取方式以及收取比例。本文选择[unmineable](https://unmineable.com/)矿池，其一个优点为完全不需要注册即可使用。

在进入矿池后，可以选择你需要进行挖矿的币种。注意，这里的币种选择不是你实际进行此币种的挖矿操作，而是你进行 Ethereum 的挖矿，然后 unmineable 矿池将收益转化成你所选择的币种再支付给你。

## 使用工具挖矿

挖矿工具也有很多以供选择，本文主要讲述 xmrig 用于 CPU 挖矿，以及 t-rex 进行 GPU 挖矿。一般来说，使用 GPU 挖矿效率更高。

### t-rex

t-rex 可从[github 下载地址](https://github.com/trexminer/T-Rex/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/trex-bin/) 安装。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 ethash 进行 TRX 的挖矿。

```bash
./t-rex -a ethash -o ethash-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner1#31ee-jt8k -p x
```

其中-a 参数指定算法。-o 指定矿池的 ip 和端口号，这些参数你可以在矿池页面找到。-u 参数指定币种、收币地址、主机名、以及优惠码，其中收币地址需要更换成你自身的地址，而使用优惠码可以减免 0.25%的手续费。

需要注意的是，t-rex 运行后会在本机 127.0.0.1:4067 开启控制面板，你可在其中进行各类信息的查看。如果想要在其他机器访问挖矿机器面板，则需额外指定`--api-bind-http 0.0.0.0:4067`参数，这样一来你就可以达到目的。

### xmrig

xmrig 可从[github 下载地址](https://github.com/xmrig/xmrig/releases)自行下载，也可从 [AUR](https://aur.archlinux.org/packages/?O=0&SeB=nd&K=xmrig&outdated=&SB=n&SO=a&PP=50&do_Search=Go) 安装。注意，其有多个版本可供选择，如 xmrig-donateless 是去除内置 1%捐赠的版本，xmrig-cuda 是 xmrig cuda backends 的插件，你可以根据需要自行选择。在安装完成后，可以使用如下命令进行挖矿。如下命令在亚洲矿池使用 RandomX 进行 TRX 的挖矿。

```bash
xmrig -o rx-asia.unmineable.com:3333 -u TRX:TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.miner2#31ee-jt8k -p x --1g
```

其中部分参数含义同上， --1g 参数为开启 1g 大页面的支持。

## 提现

在达到要求体现的最小限额后，你即可在矿池发起提现。提现有一定等待时间，需要耐心等待。
