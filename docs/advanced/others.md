# 其他可选配置

本节介绍一些 Arch Linux 的可选配置，它们不是必须的，你可以根据自身情况进行设置。

## 休眠(hibernate)设置

KDE 自身提供开箱即用的睡眠功能(sleep)，即将系统挂起到内存，消耗少量的电量。休眠(hibernate)会将系统挂起到交换分区或文件，几乎不消耗电量。如果 sleep 睡眠功能已可满足你的需求，不需要休眠到硬盘的功能，则可略过此步。

挂起到硬盘的映像大小一般最大为物理内存的 2/5,其值在/sys/power/image_size 中确定，故如果想使用休眠功能，swap 大小一般设置为物理内存的一半即可。[[1]](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate#About_swap_partition/file_size)

如果你需要休眠功能，那么 swap 文件不能位于/home 下，否则无法休眠。[[1]](https://wiki.archlinux.org/title/Power_management_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Suspend_and_hibernate_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BC%91%E7%9C%A0%E5%88%B0%E4%BA%A4%E6%8D%A2%E6%96%87%E4%BB%B6)

首先确认 swap 文件所在分区的 UUID 以及 swap 文件的偏移值

```bash
sudo findmnt -no UUID -T /swapfile #确认UUID
sudo filefrag -v /swapfile #确认物理偏移值 第一行数据中的第四列的值即为所需要的数据(包含两个句号)
```

随后将这两个参数加入内核启动参数中

```bash
sudo vim /etc/default/grub
```

找到 `GRUB_CMDLINE_LINUX_DEFAULT` 一行，在其值后添加类似如下两项数据，内容根据你自身的 UUID 以及偏移值确定。参数以空格分隔。

```conf
resume=UUID=9a940a0a-fa72-4973-9ccc-3eb93ad73b37 resume_offset=6418432..
```

配置完成后需要更新 grub 配置：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

---

除此之外，还需配置 initranfs 的 resume 钩子：

添加 resume 钩子，编辑 `/etc/mkinitcpio.conf` ，在 HOOKS 行添加 `resume` 值，注意，`resume` 需要加入在 udev 后。若使用了 LVM 分区，`resume` 需要加入在 lvm2 后。

使用 Intel CPU 并且为触摸板加载 `intel_lpss_pci` 模块的笔记本电脑，可能会在唤醒时发生内核崩溃（Caps Lock 灯闪烁），黑屏并无法成功唤醒。此时需要编辑 `/etc/mkinitcpio.conf`，在 MODULES 行添加 `intel_lpss_pci` 值

```conf
MODULES=(intel_lpss_pci)
```

最后重新生成 initramfs 镜像：

```bash
sudo mkinitcpio -P
```

## 异型字体设置

个人的设置是英文使用 Hack，中文使用 Noto Sans CJK SC。可以在系统设置->外观->字体中进行设置。如遇到`门复关`等字形现实为日型字体，有关用户全局级别更改日文异型字的设置，可参考[官方文档](<https://wiki.archlinux.org/index.php/Localization_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Simplified_Chinese_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E4%BF%AE%E6%AD%A3%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%98%BE%E7%A4%BA%E4%B8%BA%E5%BC%82%E4%BD%93%EF%BC%88%E6%97%A5%E6%96%87%EF%BC%89%E5%AD%97%E5%BD%A2>)
