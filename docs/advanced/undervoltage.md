# 功耗控制

针对散热不好的设备，功耗控制显得非常必要。这里说的功耗控制不是指直接对处理器的频率做出限制，而是对处理器的电压进行最大限度的下探，在挖掘 cpu 体质的极限的同时，起到既能降低发热，又能最大限度保持性能的效果。除了电压的下探，同时也可以尝试对处理器的功率墙(又常被称为 TDP)做出降低的限制，比如考虑这种情况，在 cpu 满睿频时，其实不需要默认的那么多功耗来维持，也许在默认功耗的基础上减几瓦，也能维持满睿频，这样就又可以进一步降低温度。对功率墙进行限制不同于对电压进行下探，若限制功率墙的参数较低，这会不可避免的损失较多的性能，但是在散热过差的设备上这也是一个好办法。

## 电压下探

[官方参考文档](https://wiki.archlinux.org/index.php/Undervolting_CPU#Tools)

如果正常操作，降低电压一般不会损害 cpu，一般建议从 50 毫伏进行尝试，每次降压尝试多增加 10 毫伏。只要确保在降低电压前，系统中任务均被正确保存即可。网络上传言的降低 cpu 电压会"缩肛"是谣言[[1]](https://www.zhihu.com/question/62335676)。

### 英特尔 四代酷睿 Haswell 及更新 cpu

如文档中所说，使用 intel-undervolt 即可降压。对于其配置文件中降压部分的五个参数含义如下:

- 0:cpu 核心电压
- 1:cpu 核芯显卡电压
- 2:cpu 缓存电压
- 3:系统周边电压，与内存等设备相关
- 4:模拟 I/O 电压

一般来说只调整 0 和 2 两项电压即可。

在调整完电压，apply 之后，可以尝试使用 [s-tui](https://archlinux.org/packages/community/any/s-tui/) 这个工具进行烤机测试，同时观察温度、频率、TDP 的数据。

### 英特尔 四代酷睿 Haswell 之前的 cpu(待验证)

官方文档中提到，二代酷睿及以前的 cpu 可使用 PHC 的方式进行降压。经测试，目前的 phc-intel 工具并不能正确使用。经过排查定位到可能是尚未支持最新的 5.11 内核。对于夹在中间的三代酷睿 lvy bridge，[有项目](https://github.com/tiziw/iuvolt)称可以使用 intel-undervolt 的原理进行降压，但是经测试失败了，后续会尝试用 PHC 的方式试试看。

### AMD

我没有设备，TODO。

## 降低功率墙

对于功率墙的调整，有些主板在 BIOS 中提供了设置项可以直接调整。对于没有设置项的主板，有的主板是锁定了瞬时和长时功率墙，这种情况就无法调整功率墙了。有的主板 BIOS 随没有提供功率墙调整项，但依旧可以通过命令行设置。通过以下的命令可以查看主板是否可以调整功率墙。

```bash
grep . /sys/class/powercap/intel-rapl/intel-rapl:0/*
```

如果在输出中看到了如下的 enable 值为 1，即可以调整。第一行的代表现有的功率墙限制。

```bash
/sys/class/powercap/intel-rapl/intel-rapl:0/constraint_0_power_limit_uw:100000000
/sys/class/powercap/intel-rapl/intel-rapl:0/enabled:1
```

具体的调整步骤参考[这个链接](https://askubuntu.com/questions/1226254/set-max-tdp-of-intel-h-series-cpu)。有空的时候我再翻译整理。

Ref: [[1]](https://askubuntu.com/questions/1231091/tee-constraint-0-power-limit-uw-no-data-available),[[2]](https://miloserdov.org/?p=1932),[[3]](https://zhuanlan.zhihu.com/p/25537264)

此外，intel-undervolt 也可直接进行功率墙限制。
