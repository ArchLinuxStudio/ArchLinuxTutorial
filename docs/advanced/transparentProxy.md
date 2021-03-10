# 使用 Qv2ray+cgproxy 配置透明代理（仅限 Linux）

本文原本收集自 [Qv2ray 用户组](https://t.me/qv2ray)，`非群主书写`，群主仅在其基础上进行更新与修正。[项目源地址](https://github.com/springzfx/cgproxy)。

1. 在“首选项-入站设置”的下方启用透明代理选项。

   - 监听 ipv4 地址可填 127.0.0.1 或 0.0.0.0，建议前者。若需双栈代理，则在监听 ipv6 地址填上[::1]（如果监听 ipv4 填了 0.0.0.0 则可不填）。
   - 在“网络模式”中勾选需要透明代理的协议。模式选择“tproxy”。
   - 如果希望在透明代理环境里让 v2ray 的内置 dns 接管本地 dns，则勾选`连接设置`选项卡下的“dns 拦截”。这里建议勾选，因为你的网络环境很大可能性需要正确的 dns 解析，比如 github raw 在多数地区均不可访问。注意，在透明代理环境下，如果系统 dns 或 v2ray 的内置 dns 配置不当，可能导致系统无法解析域名从而无法正常上网。详见后文说明。

   如果是复杂配置，则需要手动添加相应的 dokodemo-door 入站。由于目前版本复杂配置并没有提供 tproxy 选项，因此 tproxy 模式需要通过编辑 json 来实现。

2. 安装`cgproxy`软件

   - `cgproxy`软件已在 archlinux, fedora 32, ubuntu 18.04, ubuntu 20.04, deepin 15.11, deepin v20 beta 发行版中测试过。
   - Archlinux 用户可直接在 AUR 上安装，deb 或 rpm 系发行版用户可从[github](https://github.com/springzfx/cgproxy/releases)上下载安装包。非以上发行版用户，可自行从[github](https://github.com/springzfx/cgproxy)上获取代码自行编译。

3. 配置`cgproxy`，编辑`/etc/cgproxy/config.json`：

   - 在`cgroup_proxy`中括号里加上"/"（包含引号），`port`改为 Qv2ray 首选项里的透明代理的端口。
   - `cgproxy`默认配置是代理所有 tcp 和 udp，ipv4 和 ipv6 的流量，如果不希望代理其中的某种（些）流量，则将对应的`enable_xxx`改为 false。注意这里的配置要和 Qv2ray 选项里的配置一致（如，Qv2ray 选项里没有勾选 udp，则这里务必把`enable_udp`改为 false）。
   - 如果希望当本机作为网关设备时为连接到本机网关的其他设备（如连接到本机开设的 wifi 热点的设备）也提供透明代理，则把`enable_gateway`改为 true。

4. （重要）透明代理的基本原理是拦截系统发出的所有流量，并将这些流量转到代理工具里，从而实现让系统所有流量都走代理的目的。此时，为了避免流量出现死循环（即代理工具发出的流量又转回到代理工具里），需要将代理工具排除在透明代理环境外面。有两种方式可以实现这一点：

   - 通过`execsnoop`监控代理工具的启动，并自动将其移至透明代理环境外面：

     - `cgproxy`软件自带`execsnoop`支持，以上`cgproxy`测试过的发行版均可支持。
     - 编辑`/etc/cgproxy/config.json`，在`program_noproxy`中括号里加上"v2ray","qv2ray"（包含引号和逗号），以使`qv2ray`和`v2ray`发出的流量不经过透明代理。如果你的`v2ray`或`qv2ray`不在`PATH`里，则需要填写它们的绝对路径。

   - 在每次连接代理节点时，让`qv2ray`自己把自己移到透明代理环境外面：

     - 安装 Qvplugin-Command 插件，在插件设置里的“pre-connection”栏里加上一句

       ```
       sh -c "cgnoproxy --pid $(pgrep -x qv2ray)"
       ```

       即可。

5. （重要）如果启用了 udp 的透明代理（dns 也是 udp），则给 v2ray 二进制文件加上相应的特权：

   ```
   sudo setcap "cap_net_admin,cap_net_bind_service=ep" /path/of/your/v2ray
   ```

   否则 udp 的透明代理可能会出问题。

   > 如果每次更新了 v2ray 二进制文件，都需要重新执行此命令。

6. 启动透明代理服务：`systemctl start cgproxy.service`或`systemctl enable --now cgproxy.service`。

以上步骤完成后，透明代理应该能正常使用了。

##### dns 配置说明

如果勾选了“dns 拦截”，且启用了 dns 和 udp 的透明代理，则 v2ray 会拦截对系统 dns 的请求，并将其转发到 v2ray 的内置 dns 里，即让 v2ray 内置 dns 接管系统 dns。但 v2ray 内置 dns 是会遵循路由规则的。

如果没勾选“dns 拦截”，则 v2ray 虽然不会让内置 dns 接管系统 dns，但如果启用了 dns 和 udp 的透明代理，则系统 dns 也会走透明代理进 v2ray，并遵循 v2ray 的路由规则。

因此，在启用了 dns 和 udp 的透明代理时，若系统 dns 或 v2ray 的内置 dns 配置不当，可能导致 dns 请求发不出去，从而影响正常上网。

由于 qv2ray 默认的路由规则是绕过国内 ip，国外 ip 均走代理。在这个情形中，以下两个配置是典型的有问题的 dns 配置方式：

- 配置了国外普通 dns 作为首选，但代理本身不支持 udp（此时 dns 查询的 udp 流量出不去，dns 无法查询）
- 配置了使用域名的 doh 作为首选（此时 doh 的域名无法解析，从而 doh 也无法使用）

一般而言，如果并不在意将 dns 查询发给谁，那么，在绕过国内 ip 的情况下，只需要配置一个国内普通 dns 作为首选即可保证不会出问题。若代理本身不支持 udp，又希望使用国外 dns，则可以考虑使用使用 ip 的 doh（如`https://1.1.1.1/dns-query`等）。

如果需要更复杂的 dns 配置，建议参考[上游文档](https://www.v2ray.com/chapter_02/04_dns.html)，并选择合适的不会影响正常上网的 dns 配置。

##### 常见问题

- 启用透明代理后无法访问任何外网，且 v2ray 的 cpu 占用率飙升

  可能是流量陷入死循环了，检查第 4 步有没有正确配置。如果配置没问题，执行`systemctl status cgproxy.service`看下有没有诸如`info: process noproxy pid msg: xxx`之类的输出。如果没有，则说明 cgproxy 软件或 execsnoop 没有正常工作。注意 cgproxy 软件需要 cgroup v2。

  尝试退出 qv2ray，随后在终端里执行`cgnoproxy qv2ray`看是否恢复正常，如恢复正常，说明 cgproxy 正常工作，只是 execsnoop 没有正常工作。由于 execsnoop 一定程度上依赖于内核，非上述 cgproxy 测试过的发行版用户，建议使用第 4 步中的第 2 种方法。另外，对 kde 用户，5.19+版的 plasma 会给从 krunner 里启动的程序额外设置 cgroup，尽管 cgproxy 软件考虑到了这一点，但仍有极少数场合可能出现 plasma 设置的 cgroup 覆盖掉了 cgproxy 设置的 cgroup 的情况，此时通常重启一下 qv2ray 即可。

- 启用透明代理后，无法访问（部分）域名

  可能是 dns 无法解析（部分）域名。一般这种故障只发生在启用了 dns 及 udp 透明代理的时候。

  终端里执行`dig 无法访问的域名`看下报什么错：

  - 若出现类似`reply from unexpected source: 192.168.0.100#42050, expected 8.8.8.8#53`的报错，则检查第 5 步的有没有正确配置。

  - 若出现类似`connection timed out; no servers could be reache`的报错，则说明 dns 查询的流量出不去，此时往往是系统 dns 或 v2ray 内置 dns 配置不当。请检查是否出现了前文提到的几种不当配置。如果没有勾选“dns 拦截”，则此时 v2ray 虽然不会用内置 dns 接管系统 dns，但它仍然会让系统 dns 走透明代理，从而遵循 v2ray 的路由规则，此时需要检查系统 dns 是否是前文提到的那几种不当配置。

- 能不能分应用代理（如，下载 BT 时不能走代理）

  对于本机的程序，可以，可通过两种方式实现：

  - 通过`cgnoproxy`实现：如，在命令行中执行`cgnoproxy qbittorrent`，启动的 qbittorrent 程序就不会走透明代理。又如，在命令行中执行`cgnoproxy --pid 12345`，执行之后 pid 为 12345 的程序就不再走透明代理。这种方式可支持任何应用。
  - 通过`/etc/cgproxy/config.json`实现：在配置里的`program_noproxy`中括号里加上相应的应用即可。这种方式只支持可执行文件，不支持各种脚本。如希望把 clash 与 kde connect 加入 noproxy 规则，则在把此字段补全成["v2ray", "qv2ray", "clash", "/usr/lib/kdeconnectd"]即可。注意修改`config.json`之后，需要重启 cgproxy 服务才能生效，执行`systemctl restart cgproxy.service`即可。

  对于当本机作为网关设备时为连接到本机网关的其他设备，不行，那些设备的所有流量（到本机的流量除外）都必然会走代理。

- 透明代理环境中响应速度变慢

  由于 iptables 是在域名解析成 ip 之后，才对相应的流量进行重定向。因此，在透明代理环境中，访问一个域名 s 可能会需要解析至少 2 次 dns（系统解析一次，重定向到 v2ray 之后 v2ray 分流模块再解析一次）。因此，响应理论上是会变慢一点的，变慢的幅度取决于系统 dns 及 v2ray 的 dns 的响应速度。

- 开启 UDP 支持后报错`too many open files`

  核心问题是，Linux 系统定义了一系列限制，其中一种限制是最大打开文件数，并且有软限制和硬限制，具体的限制结果可以通过`ulimit -Sa`和`ulimit -Ha`查看。一般来说 arch 默认的软限制 open files 的值为 1024，这个数值太小。硬限制的 open files 的值为 524288，这个数值够大了。打开网页过多，或者开启 udp 加速的时候，连接数（打开的文件数）很容易超过 1024 这个数，所以就被限制住了。解决办法很简单，只需要修改系统级别的关于这个限制的配置文件，在/etc/security/limits.conf 文件的最末尾，加上下面这行，然后重启即可：

  ```bash
  *   soft    nofile  8192  #不要落下了最前面的星号
  ```

- 终端 wget/curl/npm/yarn 访问被墙的 https 资源(如 github raw)报错 443
  DNS 的问题，打开 Qv2ray 的 DNS 拦截和 cgproxy 的 dns 选项。或者 export https_proxy 环境变量。
