<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Power control

For heat-dispersion equipment, power-use control is considered necessary. This means not limiting the frequency of the processor directly, but maximizing the downswing of the processor ' s voltage, while excavating the cpu body limits, as well as reducing heat and maximizing performance. In addition to the downtrenchment of the voltage, it may also be possible to try to reduce the power wall of the processor (often referred to as the TDP) by, for example, taking into account that, when cpu is full of wisdom, there is no need for the default amount of effort to sustain it, or perhaps to reduce it by a few watts on the basis of the default power consumption, which would further reduce the temperature. The restriction of power walls is different from the downward detection of voltage, and limiting the parameters of power walls would inevitably result in a greater loss of performance, but this is also a good way to spread overheating equipment.

## -Turn down.

[Official reference documents](https://wiki.archlinux.org/index.php/Undervolting_CPU)

If properly operated, the reduction of voltage does not normally harm cpu, and it is generally recommended to try from 50 mV with an additional 10 mV at a time. Just ensure that all tasks in the system are properly preserved before the voltage is reduced. There's a rumor on the Internet that the reduction of the cpu voltage is a rumor.[[1]](https://www.zhihu.com/question/62335676)I don't know.

### Intel, four generations cool, Haswell and updated cpu

Use intel-undervolt, as stated in the document. The five parameters of the pressure-relief component in its configuration file mean the following:

- 0:cpu core voltage
- 1: cpu core card voltage
- 2: cpu Cache voltage
- 3: System perimeter voltage, associated with memory, etc.
- 4: Simulation I/O voltage

In general, only 0 and 2 voltages can be adjusted.

After adjusting the voltage, use it.[s-tui](https://archlinux.org/packages/community/any/s-tui/)This tool is used to test the oven while observing temperature, frequency, TPP data.

After adjusting to a suitable pressure-relief configuration, open the service.

```bash
sudo systemctl enable --now intel-undervolt
```

### Intel, 4rd generation of coolness.

Arch official documents mention that two generations of wise and former cpu can use PHC to depress pressure. Tested, not directly usable on i7-2760QM, need to be added to the inner core activation parameters`intel_pstate=disable`..to correctly identify phc-driver,[Reference 1](https://wiki.archlinux.org/index.php/CPU_frequency_scaling)command`cpupower frequency-info`Authentication. A pressure-relief attempt is then made to change the phc vid file to 0, even if it has been changed to another value using vim. Maybe cpu/master board BIOS doesn't support down frequency. Reads the phc-intel official document whose description only supports the cool, wise2 and previous cpu series and does not support the wise i, which contradicts the description of the arachwiki.

Ivy Bridge,[Projects](https://github.com/tiziw/iuvolt)Says you can use the intel-undervolt principle for pressure relief, but the test failed and the attempt to use the PHC method failed. There should be no good way to bring down three generations of coolness.

I will not spend more time exploring the pressure relief of old equipment in this range. If you know there's a way to depress, welcome to the PR, or[Group discussion](https://t.me/FSF_Ministry_of_Truth)I don't know.

ref: [[1]](https://www.reddit.com/r/intel/comments/8ubdsg/undervolting_intel_i5_3230m/) [[2]](https://forum.thinkpads.com/viewtopic.php?t=128707)

### AMD

You can try to depress the pressure according to wiki using amdctl.

## Lower power wall.

For the adjustment of power walls, some main panels provide settings in BIOS that can be adjusted directly. For the main panel, which does not have an item, the main panel is the locking of the instant and long-term power wall, which cannot be adjusted. The master plate BIOS does not provide power wall adjustments, but can still be set by command line. The following command allows to see whether the main plate can adjust the power wall.

```bash
grep . /sys/class/powercap/intel-rapl/intel-rapl:0/*
```

An adjustment can be made if the following value is found in the output. The current power wall limits for the first line of representation.

```bash
/sys/class/powercap/intel-rapl/intel-rapl:0/constraint_0_power_limit_uw:100000000
/sys/class/powercap/intel-rapl/intel-rapl:0/enabled:1
```

Reference to specific adjustment steps[This link.](https://askubuntu.com/questions/1226254/set-max-tdp-of-intel-h-series-cpu)I don't know. I'll translate it when I have time.

Ref: [[1]](https://askubuntu.com/questions/1231091/tee-constraint-0-power-limit-uw-no-data-available),[[2]](https://miloserdov.org/?p=1932),[[3]](https://zhuanlan.zhihu.com/p/25537264)

In addition, intel-undervolt can directly limit power walls. As you can see`package power limit is locked`, which indicates that the computer cannot change the power wall.
