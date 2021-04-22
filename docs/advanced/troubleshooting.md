# 常见问题排除与解决

本结描述一些在日常使用过程中你很有可能遇到的问题，并提供解决方法。

### 关机时卡住很久，屏幕出现形如`A stop job is running for...(1m30s)`的信息

这是经常会遇到的关机卡住 1 分 30 秒的问题，一般来说这种情况是出现了某个进程在关机时不愿停止，需要等到超时时间到达强行停止。通用的解决办法是调整缩短这个等待时间，建议从 1 分 30 秒调整至 30 秒，30 秒已经足够几乎所有进程正常结束。

编辑 `/etc/systemd/system.conf`

```bash
sudo vim /etc/systemd/system.conf
```

找到其中`DefaultTimeoutStopSec`一项，将其前方的井号去掉，并赋值为 30s 即可。最后执行 daemon-reload 使其生效。

```bash
sudo systemctl daemon-reload
```

上述解决方案其实只是将这个等待时间缩小了，并没有解决实际问题。如果你想排查问题真正的原因所在，在关机时如果出现了`A stop job is running for...(1m30s)`的信息，耐心等待其结束关机，然后重新启动电脑，执行以下命令：

```bash
journalctl -p5
```

按/(斜杠键)搜索`Killing`关键字，找到你关机的时间附近所在的匹配行，你可以在附近看到到底是哪一个进程导致了 timeout,然后再去排查这个进程有什么问题即可。

ref: [[1](https://forum.manjaro.org/t/a-stop-job-is-running-for-user-manager-for-uid-1000-during-shutdown/37799)][[2](https://unix.stackexchange.com/questions/273876/a-stop-job-is-running-for-session-c2-of-user)]

### 磁盘容量不足的处理方式

一般使用 LVM 安装 Linux 系统则不用担心这种情况发生。但是我们使用的是传统的 ext4 经典分区方式。这种情况下一般建议在安装的开始就将根目录设置的大一些，如 100G。如果/home 分区大小不够了，可以新安装一块硬盘，将其挂载到你想要的位置，再按照`基础安装`的步骤中重新 genfstab 一下就行了。
