# LVM（Logical Volume Manager）
相比传统分区，LVM可以自由更改储存空间大小。

## 术语
### PE(Physical Extent)
物理块

每一个物理卷PV被划分为称为PE（Physical Extents）的基本单元，具有唯一编号的PE是可以被LVM寻址的最小单元。PE的大小是可配置的，默认为4MB。所以物理卷（PV）由大小等同的基本单元PE组成。

### PV(Physical Volume)
物理卷

指磁盘分区或从逻辑上与磁盘分区具有同样功能的设备（如RAID），是LVM的基本存储逻辑块，但和基本的物理存储介质（如分区、磁盘等）比较，却包含有与LVM相关的管理参数。

### VG(Volume Group)
巻组

类似于非LVM系统中的物理磁盘，其由一个或多个物理卷PV组成。可以在卷组上创建一个或多个LV（逻辑卷）。

### LV(Logical Volume)
逻辑卷

类似于非LVM系统中的磁盘分区，逻辑卷建立在卷组VG之上。在逻辑卷LV之上可以建立文件系统（比如/home或者/usr等）。


## 过程
![lvm](./assets/lvm.png)


- 将物理储存介质分区
- 将分区转化为(PE构成的)PV
- 将PV中的PE全部放入VG中
- 从VG取出相应PE结合成LV
- 格式化LV成为新的文件系统

## CLI操作

### 创建LVM
1.将物理磁盘初始化为物理卷

将想要处理的分区创建成PV  
(创建PV的过程是将分区划分成PE,partition和PV名字没有改变)

`pvcreate /dev/<$partition_name1> /dev/<$partition_name2> ...`

partition1->pv1  
partition2->pv2  
...


2.并将PV加入巻组中

巻组名若存在,则将PV加入巻组中  
巻组名若不存在,则创建新的巻组并将PV加入巻组中

`vgcreate <$vg_name> /dev/<$pv_name1> /dev/<$pv_name2> ...`  

add pv1 pv2 and ... to vg

3.基于巻组创建逻辑卷

`lvcreate -n <$lv_name> -L <$capacity_size> <$vg_name>`  
`lvcreate -n <$lv_name> -l <$percentage>free <$vg_name>`

such as:mp
`lvcreate -n swap —L 16G vg`  
`lvcreate -n root -l 100%free vg`

Select a section to create a logical volume

4.为创建好的逻辑卷创建文件系统

`<$mkfs_cmd> /dev/<$vg_name>/<$lv_name>`

5.将格式化的逻辑卷挂载使用

`mount /dev/<$vg_name>/<$lv_name> <$mount_point>`

### 查看LVM
1. 查看物理卷  
`pvdisplay`  
`pvs`

2. 查看巻组  
`vgdisplay`  
`vgs`

3. 查看逻辑卷  
`lvdisplay`  
`lvs`

### 删除LVM
1. 删除LV  
`lvremove /dev/<$vg_name>/<$lv_name>`

2. 删除VG  
`vgremove <$vg_name>`

3. 删除PV  
`pvremove /dev/<$pv_name>`

### 拉伸逻辑卷
**不需要取消挂载**

1. 保证VG有足够的空间  
`vgdisplay`

2. 扩充逻辑卷  
`lvextend -L +<$capacity_size> /dev/<$vg_name>/<$lv_name>`

3. 查看扩充后LV大小  
`lvdisplay`

4. 更新文件系统  
`resize2fs /dev/<$vg_name>/<$lv_name>`

5. 查看更新后的文件系统  
`df -h`

### 拉伸巻组

1. 将要添加到VG的硬盘格式化为PV  
`pvcreate /dev/<$partition_name>`

2. 将新的PV添加到指定巻组中  
`vgcreate <$vg_name> /dev/<$vg_name>`

3. 查看扩充后VG大小  
`vgdisplay`

### 缩小逻辑卷
**需要取消挂载**

1. 卸载已经挂载的逻辑卷  
`umount /dev/<$vg_name>/<$lv_name>`

2. 缩小文件系统  
`resize2fs /dev/<$vg_name>/<$lv_name> <$capacity_size>`

3. 缩小LV  
`lvreduce -L -<$capacity_size> /dev/<$vg_name>/<$pv_name>`

4. 查看缩小后的LV  
`lvdisplay`

5. 挂载  
`mount /dev/<$vg_name>/<$lv_name> <$mount_point>`

### 缩小巻组

1. 将PV从巻组中移除  
`vgreduce <$vg_name> /dev/<$pv_name>`

2. 查看缩小后的巻组大小  
`vgdisplay`


## 实际应用的问题

### 当你使用lvm进行分区后系统并不能识别操作系统
需要修改`vim /etc/mkinitcpio.conf`  
在`HOOKS="..."`中添加`lvm2`  
然后执行`mkinitcpio -p linux`  
而且后续更新可能需要重新`mkinitcpio -p linux`

lvm需要安装lvm2  
`pacman -S lvm2`
 
具体功能不明
修改lvm2配置文件  
`vim /etc/lvm/lvm.conf`  
`use_lvmetad = 0`  
change this from `1` to `0`

### 关机速度很慢
需要更改LVM2
`sudo nvim /etc/systemd/system/lvm2-lvmetad.service`

在`[Unit]`内添加  
`Before=shutdown.target`  




