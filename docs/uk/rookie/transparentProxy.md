<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Use Qv2ray+cgproxy to configure transparent agents

Global Agent, Transparent Agent. This section refers to real, operating system-level agents rather than only "global agents" for all web sites in the browser. Transparent agents are called transparent agents because the system-level agents are not aware of their presence because they are equally transparent in their application in the operating system. It is clearly intended to be a global agent at the operating system level. The two terms are often used simultaneously in the Chinese context and the term global agent is prone to confusion.

The main body of this section is from[Qv2ray user Group](https://t.me/Qv2ray_chat)It is not the original; it is the basis on which we update, refine and amend.[cgproxy project address](https://github.com/springzfx/cgproxy)I don't know.

## Installation and Settings

1. Install`cgproxy`Software. It's right there.[AUR](https://aur.archlinux.org/packages/cgproxy/)Install on it. Because the mainland Chinese government has blocked Github, you may not be able to install cgproxy through the AUR in a normal way, so ArchLinuxStudio provides a package that can be installed directly for your use.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/cgproxy-0.19-1-x86_64.pkg.tar.zst
sudo pacman -U cgproxy-0.19-1-x86_64.pkg.tar.zst
```

> Gythub.io is also under blockade by the mainland Chinese government, although the blockade is not strong yet. If you are stuck in this process, you can try to download the ctrl+c command again, or try to retick the network environment of the mobile phone hotspot. When you have a global agent, you will no longer have to worry about any cyber-blocking. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

2. Enables any door setting options at the bottom of Qv2ray's Preferences - Enter Settings.

   - Listen to ipv4 addresses to fill in`127.0.0.1`or`0.0.0.0`The former is recommended. If you need a double inn agent, fill in the ipv6 address`::1`(If the listening ipv4 is filled with 0.0.0.0, it may not be filled in).
   - Sniffing for Full, Destining Override's three selections.
   - Mode selection "tproxy".
   <!-- - 如果希望在透明代理环境里让 v2ray 的内置 dns 接管本地 dns，则勾选`连接设置`选项卡下的“dns 拦截”。注意，在透明代理环境下，如果系统 dns 或 v2ray 的内置 dns 配置不当，可能导致系统无法解析域名从而无法正常上网。详见后文说明。 -->

   If you have a complex configuration, you need to add the corresponding dokodemo-door manually. Since the current complex version of the configuration does not provide troxy options, the troxy mode needs to be done by editing json.

3. Configure`cgproxy`, Edit`/etc/cgproxy/config.json`:

   - **Yes.`cgroup_proxy`Add "/" in parentheses (includes quotation marks)**I don't know.`port`Change to the port of the transparent agent in the Qv2ray preferences.
   - `cgproxy`The default configuration is the flow of all tcp and udp, ipv4 and ipv6, which corresponds if you do not want to represent some of the traffic(s)`enable_xxx`was replaced by false. Note that the configuration here is consistent with the configuration in the Qv2ray option (e. g. Qv2ray does not tick udp in the Qv2ray option, and this must be`enable_udp`Replace with false.
   - If it is hoped that other devices connected to this gateway (e.g., wifi hotspots connected to this device) will also be provided transparent agents when the machine acts as a gateway device, it will`enable_gateway`Change to True.

4. The rationale for (important) transparency agents is to intercept all flows from the system and transfer them to proxy tools, thus achieving the goal of making all flows from the system proxy. At this point, in order to avoid a dead-end cycle of traffic (i.e., the flow of proxy tools is then shifted back into proxy tools), the proxy tools need to be excluded from the transparent proxy environment. This can be achieved in two ways:

   - Pass.`execsnoop`Monitor the launch of proxy tools and automatically move them outside the transparent proxy environment:

     - `cgproxy`Bring your software.`execsnoop`Support, above`cgproxy`A tested distribution can be supported.
     - Edit`/etc/cgproxy/config.json`Yes.`program_noproxy`Add "v2ray", "qv2ray" in parentheses to enable`qv2ray`and`v2ray`The flow is not channelled through transparent agents. If it's yours...`v2ray`or`qv2ray`No, I'm not.`PATH`, you have to fill out their absolute path.

   - On each connection to the proxy node, let`qv2ray`You move yourself outside the transparent proxy environment:

     - Install Qvplugin-Command plugin, add a sentence to the "pre-convention" column in the plugin settings

       ```
       sh -c "cgnoproxy --pid $(pgrep -x qv2ray)"
       ```

       It's okay.

5. (Immediate) If transparent agents (dns and drp) for udp are enabled, add the corresponding privileges to v2ray binary files:

   ```
   sudo setcap "cap_net_admin,cap_net_bind_service=ep" /usr/bin/v2ray
   ```

   Otherwise, there might be problems with the udp transparency agent.

   > This command needs to be re-executed every time a v2ray binary file is updated.

6. Other Organiser`systemctl start cgproxy.service`or`systemctl enable --now cgproxy.service`I don't know.

Once these steps have been completed, transparent agents should be used properly.

## dns profile description

If the "dns intercept" is ticked and transparent agents for dns and drp are enabled, v2ray intercepts requests for dns and forwards them to the built-in dns of v2ray, i.e. gives the built dns of v2ray to take over the system. But v2ray built-in dns will follow the route.

If the "dns intercept" is not ticked, then v2ray will not allow the built-in dns to take over the system dns, but if transparent agents for dns and drp are enabled, the system dns will follow the V2ray and follow the V2ray route.

Therefore, when transparent agents for dns and drp are enabled, the system dns or v2ray's built-in dns are not properly configured, which may result in dns requests not being sent out, thus affecting normal Internet access.

Since qv2ray's common route rule is to bypass the domestic p, the foreign p is represented. In this case, the following two configurations are typical of problematic dns configurations:

- Configure normal Dns foreign preference, but the agent does not support dupp (dns query udp flow is not available at this time, dns cannot query)
- Configures doh as the preferred use of domain names. Doh's domain name cannot be deciphered at this time, and therefore cannot be used.

In general, if the dns query is not intended to be sent to anyone, then, in the case of the circumvention of the domestic ip, it is only necessary to have a domestic ordinary dns as the preferred option to ensure that no problem arises. If the agent himself does not support dupp and wishes to use dns abroad, then use doh using ip (e. g.`https://1.1.1.1/dns-query`Wait.

If more complex dns configuration is needed, suggest reference[Upper Document](https://www.v2ray.com/chapter_02/04_dns.html), and select the appropriate dns configuration that does not affect normal Internet access.

---

When displaying a setup agent for applications such as firefox, these applications do not make a DNS request because they know the agent exists. In the case of transparent agents, each application is unaware of their existence and therefore sends its own dns request.

This will transfer all tcp/dp traffic (including DNS queries) to v2ray via cgproxy. As the DNS query flow is bound to arise in this case, the following settings are required to ensure that no DNS requests are made (this is for privacy and security). At this point, there are two types of discussions.

- If no v2ray built-in DNS settings and DNS intercepts are performed, then DNS traffic will be distributed using its own DNS set-up as 8.8.8.8, regardless of how the v2ray is configured (overall or split), as long as it is guaranteed that the request for 8.8.8.8.8 can be sent through the agent.

- If the v2ray intercepts the dns traffic to dns outbounds via the following router rules, then v2ray can direct the DNS query flow out of dns-out, i.e. "stop" and "retransmittal" by dns-outbound.

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

  At this point, dns outboard should call the built-in DNS settings for resolution, and if the v2ray built DNS is set to 1.1.1.1, then the original DNS request for 3.8.8.8 will turn to the 1.1.1 request (which will then follow your route rules for 1.1.1) and return the result to the application. You can verify by opening qv2ray more detailed log level.

If it's just to stop this dns request, it's completely possible not to use fakedns. Makedns do reduce dns requests once under conditions of transparent representation, and in theory do. However, there are also articles that point out that the return of dns may be problematic if all domain names are forged.

Extracurricular remarks: Using a proxy server can solve the problem of the slowness of the network if you return to the CDN site abroad, but only if you trust the proxy server and the DNS server to receive your local IP, which is not recommended for your safety.

## Common problems

- Unable to access any extranets when transparent agents are enabled, and v2ray cpu occupancy surges litres

  Maybe the flow is in a dead cycle, checking step 4 for proper configuration. If the configuration is clear, execute.`systemctl status cgproxy.service`See if there's anything like that.`info: process noproxy pid msg: xxx`Something like that. If not, indicate that cgproxy software or execsnoop is not working properly. Note that cgproxy software requires cgroup v2.

  Try exit qv2ray, then execute in terminal`cgnoproxy qv2ray`See if it's back to normal, if it's back to normal, which means cgproxy works normally, except the execsnoop doesn't work normally. Since execsnoop relies to some extent on kernels, it is recommended to use step 2 of the above-mentioned cgproxy test. Also, for kde users, the plasma version of 5.19+ sets an extra cgroup for the program started from krunner, although the cgproxy software takes this into account, there are very few instances where the cgroup set by plasma may have covered the cgroxy set-up, and then reset the qv2ray.

- Unable to access (partial) domain name when transparent agent is enabled

  Could be dns cannot resolve (partial) domain names. Usually this failure occurs only when dns and drp transparent agents are enabled.

  Organisation`dig 无法访问的域名`See what's wrong:

  - If it's similar`reply from unexpected source: 192.168.0.100#42050, expected 8.8.8.8#53`, check step 5 for proper configuration.

  - If it's similar`connection timed out; no servers could be reache`, which indicates that the flow of dns queries is not available, often at a time when the system dns or v2ray is insufficiently configured. Please check if there are several inappropriate configurations mentioned above. If the "dns intercept" is not ticked, then at this point v2ray, while not using the built-in dns to take over the system dns, it will still allow the system dns to walk transparent agents, thus following the v2ray route rules, and will need to check whether the system dns are the types of inappropriate configurations mentioned above.

- Whether the agent can be applied (e.g. not to leave when downloading BT)

  This may be done in two ways:

  - Pass.`cgnoproxy`Achieved: e.g., executed in command line`cgnoproxy qbittorrent`The qbittorrent program that's started won't be transparent. For example, in the command line`cgnoproxy --pid 12345`After implementation, the pid 12345 program no longer uses transparent representation. This approach could support any application.
  - Pass.`/etc/cgproxy/config.json`Achieved: in configuration`program_noproxy`Insert the corresponding application in brackets. This approach supports only enforceable documents and not scripts. If you want to add clash and kde connect to the noproxy rule, then complete the field with ["v2ray", "qv2ray", "clash", "/usr/lib/kdeconectd". Watch out for modifications.`config.json`After that, the cgproxy service needs to be restarted to be effective and implemented`systemctl restart cgproxy.service`It's okay.

  For other equipment that is connected to the gateway when it is used as a gateway device, it is not possible to do so, and all traffic to those devices (other than that to which they are connected) is bound to be represented.

- Slower response in a transparent proxy environment

  As iptables is re-directed only after the domain name is analyzed to ip. Therefore, in a transparent proxy environment, access to a domain name s may require the resolution of at least two dns (system resolution once, re-direction to v2ray after v2ray). The response is therefore theoretically slower, depending on the speed of the system dns and v2ray dns.

- Report errors after opening UDP support`too many open files`

  The core issue is that the Linux system defines a series of limitations, one of which is the maximum number of files to open, with soft and hard limits, which can be achieved with a specific limitation result`ulimit -Sa`and`ulimit -Ha`Look. In general, the default soft limit for aarch is 1024, which is too small. The value of hard-limited open files is 524288, which is large enough. The number of connections (number of files opened) can easily exceed the number 1024, so it is restricted. The solution is simple, with only the following line added at the end of the system-level configuration file on this limitation, and then restart:

  ```bash
  *   soft    nofile  8192  #不要落下了最前面的星号
  ```

- Using docker/ libvirt is not properly used with cgproxy. See you at the solution.[cgproxy issue3](https://github.com/springzfx/cgproxy/issues/3#issuecomment-637309706)

---

Ref:

1. [Talk about all kinds of black technology DNS technology applications in proxy environments](https://tachyondevel.medium.com/%E6%BC%AB%E8%B0%88%E5%90%84%E7%A7%8D%E9%BB%91%E7%A7%91%E6%8A%80%E5%BC%8F-dns-%E6%8A%80%E6%9C%AF%E5%9C%A8%E4%BB%A3%E7%90%86%E7%8E%AF%E5%A2%83%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8-62c50e58cbd0)
