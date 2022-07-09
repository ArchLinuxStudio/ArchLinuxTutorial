# Configure transparent proxy using Qv2ray+cgproxy

Global proxy, also known as transparent proxy. This section describes true, OS-level proxies, not just "global proxies" for all URLs in the browser. The reason why it is called a transparent proxy is that this system-level proxy is transparent to each application in the operating system, and the applications cannot perceive the existence of the proxy. The reason why it is called a global proxy obviously means an operating system-level, global proxy. These two terms are often used together in the Chinese context, and the term global agent can easily cause confusion.

The main text of this section is collected from [Qv2ray User Group](https://t.me/Qv2ray_chat), not original, we only update, improve and revise it based on it. [cgproxy project address](https://github.com/springzfx/cgproxy).

## Installation and setup

1. Install the `cgproxy` software. Installable directly at [AUR](https://aur.archlinux.org/packages/cgproxy/). Due to the reason that the Chinese mainland government blocks Github, you may not be able to install cgproxy through AUR in the normal yay way, so ArchLinuxStudio provides a set of packages that can be installed directly for you to use.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/cgproxy-0.19-1-x86_64.pkg.tar.zst
sudo pacman -U cgproxy-0.19-1-x86_64.pkg.tar.zst
```

> github.io is also blocked by the Chinese mainland government, but the blockade has not been very strong for the time being. If you get stuck during this process, you can try ctrl+c to terminate the command and try the download again, or you can try to change the network environment of the mobile phone hotspot to download again. When you configure the global proxy, you will no longer need to worry about any network blocking issues. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

2. Enable any door settings option in Qv2ray under Preferences - Inbound Settings.

   - The listening ipv4 address can be filled with `127.0.0.1` or `0.0.0.0`, the former is recommended. If a dual-stack proxy is required, fill in `::1` in the monitoring ipv6 address (if the monitoring ipv4 is filled with 0.0.0.0, you can leave it blank).
   - Select Full for sniffing, and check all three of Destination Override.
   - Mode select "tproxy".
   <!-- - If you want v2ray's built-in dns to take over the local dns in a transparent proxy environment, check "dns interception" under the `Connection Settings` tab. Note that in a transparent proxy environment, if the system dns or the built-in dns of v2ray is not configured properly, the system may not be able to resolve the domain name and thus cannot access the Internet normally. See the description below for details. -->

   If it is a complex configuration, you need to manually add the corresponding dokodemo-door inbound. Since the current version of the complex configuration does not provide the tproxy option, the tproxy mode needs to be implemented by editing json.

3. To configure `cgproxy`, edit `/etc/cgproxy/config.json`:

   - \*\*Add "/" (including quotation marks) in brackets in `cgroup_proxy`, `port` is changed to the port of the transparent proxy in Qv2ray preferences.
   - The default configuration of `cgproxy` is to proxy all tcp and udp, ipv4 and ipv6 traffic. If you do not want to proxy some (some) traffic, change the corresponding `enable_xxx` to false. Note that the configuration here should be consistent with the configuration in Qv2ray options (for example, if udp is not checked in Qv2ray options, be sure to change `enable_udp` to false).
   - If you want to provide a transparent proxy for other devices connected to the local gateway (such as devices connected to the wifi hotspot opened by the local machine) when the local machine acts as a gateway device, change `enable_gateway` to true.

4. (Important) The basic principle of transparent proxy is to intercept all the traffic sent by the system and transfer these traffic to the proxy tool, so as to realize the purpose of letting all the traffic of the system go through the proxy. At this time, in order to avoid an infinite loop of traffic (that is, the traffic sent by the proxy tool is transferred back to the proxy tool), the proxy tool needs to be excluded from the transparent proxy environment. There are two ways to achieve this:

   - Monitor the startup of the proxy tool via `execsnoop` ​​and automatically move it out of the transparent proxy environment:

     - The `cgproxy` software comes with `execsnoop` ​​support, which can be supported by the above `cgproxy` tested distributions.
     - Edit `/etc/cgproxy/config.json`, add "v2ray", "qv2ray" (including quotes and commas) in brackets in `program_noproxy`, so that the traffic from `qv2ray` and `v2ray` is not transparent acting. If your `v2ray` or `qv2ray` are not in `PATH`, you need to fill in their absolute path.

   - Let `qv2ray` move itself out of the transparent proxy environment every time you connect to a proxy node:

     - Install the Qvplugin-Command plugin and add a sentence to the "pre-connection" column in the plugin settings

       ```
       sh -c "cgnoproxy --pid $(pgrep -x qv2ray)"
       ```

       That's it.

5. (Important) If transparent proxy for udp is enabled (dns is also udp), add the appropriate privileges to the v2ray binary:

   ```
   sudo setcap "cap_net_admin,cap_net_bind_service=ep" /usr/bin/v2ray
   ```

   Otherwise udp's transparent proxy may have problems.

   > This command needs to be re-executed every time the v2ray binaries are updated.

6. Start the transparent proxy service: `systemctl start cgproxy.service` or `systemctl enable --now cgproxy.service`.

After the above steps are completed, the transparent proxy should be able to be used normally.

## DNS configuration instructions

If "dns interception" is checked and the transparent proxy of dns and udp is enabled, v2ray will intercept the request to the system dns and forward it to the built-in dns of v2ray, that is, let the built-in dns of v2ray take over the system dns. But v2ray built-in dns will follow routing rules.

If "dns interception" is not checked, although v2ray will not let the built-in dns take over the system dns, but if the transparent proxy of dns and udp is enabled, the system dns will also go through the transparent proxy into v2ray and follow the routing rules of v2ray.

Therefore, when the transparent proxy of dns and udp is enabled, if the dns of the system or the built-in dns of v2ray is not configured properly, it may cause the dns request to not be sent out, thus affecting the normal Internet access.

Because the common routing rule of qv2ray is to bypass domestic ip, foreign ip all go through proxy. In this case, the following two configurations are typical problematic dns configurations:

- The foreign common dns is configured as the first choice, but the proxy itself does not support udp (at this time, the udp traffic queried by dns cannot go out, and dns cannot be queried)
- Doh is configured to use the domain name as the preference. At this time, the domain name of doh cannot be resolved, so doh cannot be used.

Generally speaking, if you don't care who you send the dns query to, then in the case of bypassing the domestic ip, you only need to configure a domestic ordinary dns as the first choice to ensure that there will be no problems. If the proxy itself does not support udp and wants to use foreign dns, you can consider using doh using ip (such as `https://1.1.1.1/dns-query`, etc.).

If more complex dns configuration is required, it is recommended to refer to [upstream documentation](https://www.v2ray.com/chapter_02/04_dns.html), and select an appropriate dns configuration that will not affect normal Internet access.

---

When proxying is shown for apps like firefox, DNS requests are not made because those apps are aware of the proxy's existence. In the case of a transparent proxy, each application cannot perceive the existence of the proxy, so it will send its own dns request.

At this time, all tcp/udp traffic (including DNS queries) can be forwarded to v2ray through cgproxy. In this case, there must be DNS query traffic, so in order to ensure that the machine does not issue any DNS requests (this is for privacy and security), the following settings are required. At this point, two situations need to be discussed.

- If you do not perform any v2ray's built-in DNS settings and DNS interception, then DNS traffic will be sent out using the local DNS settings such as 8.8.8.8. In this case, no matter how v2ray is configured (global or diverted), as long as you ensure that the 8.8.8.8 The request can be made through the proxy.

- If v2ray intercepts dns traffic received through dokodemo-door to dns outbounds through routing rules like the following, then v2ray can direct DNS query traffic to the out bound of "dns-out", that is, dns-outbound "Intercept" and "Re-forward".

  ```json
  rules:
  {
  "inboundTag": [
  "tproxy-in-1",
  "tproxy-in-2"
  ],
  "outboundTag": "dns-out",
  "port": "53",
  "type": "field"
  },
  ```

  At this time, dns outbound should call the built-in DNS settings for resolution. If the v2ray built-in DNS is set to 1.1.1.1, the original DNS request for 8.8.8.8 will turn to 1.1.1.1 request (then the request for 1.1.1.1). will still follow your routing rules) and return the result to the application. You can verify by turning on qv2ray's more verbose log level.

If it is just to prevent the local machine from sending dns requests, fakedns can be completely omitted. Fakedns can indeed reduce a dns request under the condition of transparent proxy, which is indeed faster in theory. But there are also some articles that point out that there may be problems if all domain names are forged dns returns.

Digression: Using clientIP can solve the problem of using a proxy server to resolve DNS. If the network speed is slow when returning the URL of a foreign CDN, but the premise is that you trust the proxy server and DNS server to receive your local IP. For your security, it is not recommended to use it.

## Common problem

- After enabling the transparent proxy, it is impossible to access any external network, and the cpu usage of v2ray soars

  Maybe the traffic is stuck in an infinite loop, check if step 4 is configured correctly. If the configuration is OK, execute `systemctl status cgproxy.service` to see if there is any output such as `info: process noproxy pid msg: xxx`. If not, the cgproxy software or execsnoop is not working properly. Note that cgproxy software requires cgroup v2.

  Try to exit qv2ray, and then execute `cgnoproxy qv2ray` in the terminal to see if it returns to normal. If it returns to normal, it means that cgproxy is working normally, but execsnoop is not working normally. Since execsnoop is somewhat dependent on the kernel, users of distros not tested with cgproxy above are advised to use method 2 in step 4. In addition, for kde users, the 5.19+ version of plasma will set additional cgroups for programs started from krunner. Although the cgproxy software takes this into account, there are still rare occasions where the cgroups set by plasma may override the cgroups set by cgproxy. In this case, you can usually restart qv2ray at this time.

- When transparent proxy is enabled, (some) domains cannot be accessed

  It may be that dns cannot resolve (part of) the domain name. Generally, this kind of failure only occurs when dns and udp transparent proxy are enabled.

  Execute `dig unreachable domain name` in the terminal to see what error is reported:

  - If an error like `reply from unexpected source: 192.168.0.100#42050, expected 8.8.8.8#53` appears, check if the configuration in step 5 is correct.

  - If an error like `connection timed out; no servers could be reach` appears, it means that the traffic of the dns query cannot go out. In this case, the system dns or the built-in dns of v2ray is often misconfigured. Please check whether there are several improper configurations mentioned above. If "dns interception" is not checked, at this time, although v2ray will not use the built-in dns to take over the system dns, it will still let the system dns go through a transparent proxy, so as to follow the routing rules of v2ray. At this time, it is necessary to check whether the system dns is the previous one. The kinds of improper configurations mentioned.

- Can you use proxy application (for example, you can't use proxy when downloading BT)

  For native programs, yes, it can be implemented in two ways:

  - Implemented through `cgnoproxy`: For example, by executing `cgnoproxy qbittorrent` on the command line, the launched qbittorrent program will not go through the transparent proxy. For another example, if `cgnoproxy --pid 12345` is executed on the command line, the program with the pid of 12345 will no longer go through the transparent proxy after execution. Any application can be supported in this way.
  - Implemented through `/etc/cgproxy/config.json`: add the corresponding application in the brackets of `program_noproxy` in the configuration. This method only supports executable files and does not support various scripts. If you want to add clash and kde connect to the noproxy rule, you can complete this field as ["v2ray", "qv2ray", "clash", "/usr/lib/kdeconnectd"]. Note that after modifying `config.json`, you need to restart the cgproxy service to take effect, execute `systemctl restart cgproxy.service`.

  For other devices connected to the local gateway when the local machine is used as a gateway device, no, all traffic of those devices (except the traffic to the local machine) will inevitably go through the proxy.

- Slow response time in transparent proxy environment

  Because iptables redirects the corresponding traffic after the domain name is resolved into ip. Therefore, in a transparent proxy environment, accessing a domain name s may require at least 2 DNS resolutions (the system resolves once, and the v2ray offloading module resolves again after redirecting to v2ray). Therefore, the response is theoretically slower, and the magnitude of the slowdown depends on the response speed of the system dns and v2ray's dns.

- Error `too many open files` is reported after enabling UDP support

  The core problem is that the Linux system defines a series of limits, one of which is the maximum number of open files, and there are soft limits and hard limits. The specific limit results can be viewed through `ulimit -Sa` and `ulimit -Ha`. Generally speaking, the default soft limit open files value of arch is 1024, which is too small. The hard limit for open files is 524288, which is large enough. When you open too many web pages or turn on udp acceleration, the number of connections (the number of open files) can easily exceed the number of 1024, so it is limited. The solution is very simple, just modify the system-level configuration file about this limit, add the following line at the end of the /etc/security/limits.conf file, and then restart:

  ```bash
  * soft nofile 8192 #Don't drop the first asterisk
  ```

- Does not work properly with cgproxy when using docker/libvirt. For the solution, see [cgproxy issue3](https://github.com/springzfx/cgproxy/issues/3#issuecomment-637309706)

---

Ref:

1. [漫谈各种黑科技式 DNS 技术在代理环境中的应用](https://tachyondevel.medium.com/%E6%BC%AB%E8%B0%88%E5%90%84%E7%A7%8D%E9%BB%91%E7%A7%91%E6%8A%80%E5%BC%8F-dns-%E6%8A%80%E6%9C%AF%E5%9C%A8%E4%BB%A3%E7%90%86%E7%8E%AF%E5%A2%83%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8-62c50e58cbd0)
