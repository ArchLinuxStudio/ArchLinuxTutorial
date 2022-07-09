# Power Control

For equipment with poor heat dissipation, power consumption control is very necessary. The power consumption control mentioned here does not mean to directly limit the frequency of the processor, but to probe the voltage of the processor to the maximum extent. While excavating the limit of the cpu physique, it can not only reduce heat, but also Maximize the effect of maintaining performance. In addition to the voltage drop, you can also try to reduce the power wall (also called TDP) of the processor. For example, considering this situation, when the CPU is at full turbo frequency, it does not need to be as much as the default. Power consumption to maintain, maybe reduce a few watts on the basis of the default power consumption, but also maintain full turbo frequency, so that the temperature can be further reduced. Limiting the power wall is different from lowering the voltage. If the parameters for limiting the power wall are low, it will inevitably lose more performance, but it is also a good method for equipment with poor heat dissipation.

## Undervolting CPU

[Official reference documentation](https://wiki.archlinux.org/index.php/Undervolting_CPU)

Under normal operation, lowering the voltage will generally not harm the CPU, and it is generally recommended to try from 50 mV, adding an extra 10 mV for each step-down attempt. Just make sure that the tasks in the system are properly saved before lowering the voltage. It is a rumor that reducing the CPU voltage on the Internet will "shrink the anus" [[1]](https://www.zhihu.com/question/62335676).

### Intel 4th Gen Core Haswell and newer CPUs

Using intel-undervolt, as the documentation says, can be stepped down. The meanings of the five parameters in the step-down part of the configuration file are as follows:

- 0: cpu core voltage
- 1: cpu core graphics card voltage
- 2: cpu cache voltage
- 3: System peripheral voltage, related to memory and other devices
- 4: Analog I/O Voltage

Generally speaking, only two voltages 0 and 2 can be adjusted.

After adjusting the voltage and applying, you can try to use the tool [s-tui](https://archlinux.org/packages/community/any/s-tui/) to test the oven, and observe the temperature, frequency, TDP The data.

After adjusting to a suitable step-down configuration, start its corresponding service.

```bash
sudo systemctl enable --now intel-undervolt
```

### Cpu before Intel 4th generation Haswell

The arch official document mentioned that the second-generation Core and previous CPUs can use PHC to reduce voltage. After testing, it cannot be used directly on i7-2760QM. It is necessary to add `intel_pstate=disable` to the kernel startup parameters to correctly identify the phc driver. [Reference 1](https://wiki.archlinux.org/index.php/CPU_frequency_scaling), which can be verified with the command `cpupower frequency-info`. Next, try to reduce the voltage. According to the archwiki operation, the phc_vid file cannot be changed, and its content is always 0, even if it has been changed to another value with vim. Maybe the cpu/motherboard BIOS doesn't support downclocking. I read the official documentation of phc-intel, and its instructions only support Core, Core 2 and previous cpu series, not Core i, which contradicts the description of archwiki.

For the three-generation Core Ivy bridge sandwiched in the middle, [there is a project](https://github.com/tiziw/iuvolt) says that the principle of intel-undervolt can be used to reduce voltage, but the test failed, so try to use PHC. still fails. At present, there should be no good way to step down the three-generation Core.

For older equipment bucks in this range, I won't spend more time exploring. If you know of a way to properly depressurize, please submit a PR, or [enter group discussion](https://t.me/FSF_Ministry_of_Truth).

ref: [[1]](https://www.reddit.com/r/intel/comments/8ubdsg/undervolting_intel_i5_3230m/) [[2]](https://forum.thinkpads.com/viewtopic.php?t=128707)

### AMD

Use amdctl in the wiki to try undervolting.

## Limit power wall

For the adjustment of the power wall, some motherboards provide setting items in the BIOS that can be adjusted directly. For motherboards without setting items, some motherboards lock the instantaneous and long-term power wall, and in this case, the power wall cannot be adjusted. Some motherboard BIOS does not provide power wall adjustment items, but it can still be set through the command line. Use the following command to check whether the motherboard can adjust the power wall.

```bash
grep . /sys/class/powercap/intel-rapl/intel-rapl:0/*
```

If you see an enable value of 1 in the output like the following, you can adjust it. The first row represents the existing power wall limit.

```bash
/sys/class/powercap/intel-rapl/intel-rapl:0/constraint_0_power_limit_uw:100000000
/sys/class/powercap/intel-rapl/intel-rapl:0/enabled:1
```

The specific adjustment steps refer to [this link](https://askubuntu.com/questions/1226254/set-max-tdp-of-intel-h-series-cpu). I will translate it when I have time.

Ref: [[1]](https://askubuntu.com/questions/1231091/tee-constraint-0-power-limit-uw-no-data-available),[[2]](https://miloserdov.org/?p=1932),[[3]](https://zhuanlan.zhihu.com/p/25537264)

In addition, intel-undervolt can also directly perform power wall limiting. If you see `package power limit is locked`, it means that this computer cannot change the power wall.
