<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# The Magic Academy.

> **[Access to the Internet](https://zh.wikipedia.org/wiki/%E8%A8%AA%E5%95%8F%E4%BA%92%E8%81%AF%E7%B6%B2%E6%AC%8A)All persons must be able to access the Internet in order to exercise and enjoy their freedom of expression, communication, opinion and other fundamental human rights. Unjustified restrictions on individual access to the Internet in any country or region are a violation of fundamental human rights.**

**For your safety, do not use science online clients on any equipment with proprietary software of a spy nature. These devices can be cell phones, PC, etc. On the mobile phone, the authorities of a powerful government have easy access to the list of applications that you have installed, and can link and consult by various means about what you do and what you say and take further control, which is a precedent. Theoretically, this possibility also exists on PC equipment. If you have to use proprietary software of a spy nature such as QQ, use it in a completely isolated physical device. Read more.[Modern privacy protection guidelines](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/)It's very important to your safety!**

This section describes how scientific Internet access can take place under linux. This section and subsequent global proxy chapters**Other Organiser**I don't know. If science is not configured to go online, you will encounter problems in your daily use, whether it be blocked resources or codes or access to relevant information, and you may be unable to download and browse. Everyone.**Yes.**Let's get science online and continue.

## Preparation of nodes

Simply put, nodes are mystical links like the following, regardless of how you get these connections, and if you already have them, you can read the following subsection directly.

```txt
ss://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
vmess://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If you do not have these connections, you can deploy or purchase airport subscriptions.

If you are self-deployed, you need to buy and build your own servers on the Free Internet, which is outside the scope of this paper and provides only three high-quality articles from the GFW Report. But these articles have been blocked by the GFW. We will then provide some solutions to this problem.

<!-- TODO GFW fucked GFW report! -->

- [How to deploy a Shadowsocks-libev server against the blockade](https://gfw.report/blog/ss_tutorial/zh/)
- [Defense GFT Practical Guide to Active Detection](https://gfw.report/blog/ss_advise/zh/)
- [How did Shadowsocks be tested and blocked?](https://gfw.report/talks/imc20/zh/)

For server purchases, we provide a web site for information:https://bitcoin-vps.com/I don't know. Bitcoin-vps provides a very detailed and up-to-date list of servers that support, to varying degrees, the use of encrypted currency for payment, such as bitcoin, the Ether Workshop, etc. The advantage of using encrypted currency is that, on the basis of proper operation, you can fully guarantee your privacy. It is not safe to buy similar services by using real-name means of payment such as money, and we hope that readers will recognize the value of encrypted money in every respect and the existence of encrypted money as your privacy protector.

---

If you purchase airport subscriptions, you can consult their subscription process to get nodes. We'll list some of the more credible airfield services for options, but...**We don't give any guarantees.**I don't know. It should be recalled that airport services are in the grey industry, with the possibility of stopping services at any time, and are recommended for purchase on a monthly basis to avoid excessive losses. With regard to airport auditing rules, our point is, "I can't look, but you can't ban it." The level of airport audit can be assessed by the reader on its own merits.

- [GLaDOS](https://www.glados.rocks/landing/9FMKX-GYLMK-ZYIZW-5U3T0)After registration in mailbox, use active code`9FMKX-GYLMK-ZYIZW-5U3T0`Upon activation of the account number, you can get a free trial run of five days and a 10-GB trial flow. GlaDOS has the advantage of being free of charge, operating longer and more credible. Besides, GlaDOS is one of the few airports with Trojan node. The disadvantage is that speed is not very fast. Its audit rules allow for self-examination by entering the rear panel after registration. Based on our tests, it did not conduct audits strictly in accordance with the audit rules.

---

If you don't want to spend anything, you can install it.[Saifeng.](https://psiphon3.com/zh/index.html)This kind of software. Saif is free software.

If you use racing, it's easy to send empty mail. Present.get@psiphon3.comto get a download of the link. Xyphoon applications currently only support Windows\Android\IOS\MacOS platforms. When you have access to the free Internet on these platforms, you can search for available nodes and proxy resources through various channels, such as:[Here.](https://t.me/wtovpn)Or...[Here.](https://t.me/TG_Mtproxy_1)I don't know. Note that the use of a public node entails taking the risk itself.

## 2. Installation

Qv2ray and V2rayA are two excellent scientific Internet users available on Linux. You can install both for backup. V2rayA is a browser client that can be accessed remotely at the browser end in a server, such as a headless environment. Qv2ray is a classic C/S architecture desktop-end software developed using QT.

<!-- 本节的每个步骤都将分为 Qv2ray 3.0 和 V2rayA 分别讲述。 -->

### v2ray

v2ray is a prerequisite for using Qv2ray and V2rayA. Installation is required first. In front.[Mirror Source Selection](/uk/rookie/basic_install?id=_7镜像源的选择)In one section, we mention that readers should change the mirror sources of non-authoritarian countries as soon as possible to ensure their own safety.**This is the last time you've changed the mirror source of a non-powerful country before you install v2ray here.**I don't know. Install v2ray using a secure mirror source.

```bash
sudo pacman -S v2ray
```

If, in your network environment, there is no faster or accessible security mirror source to install v2ray, you can execute the following order to install the ArchLinuxStudio v2ray package for you.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/v2ray-4.44.0-1-x86_64.pkg.tar.zst
sudo pacman -U v2ray-4.44.0-1-x86_64.pkg.tar.zst
```

### V2rayA

V2rayA is a browser client that is very user-friendly. As the author provides a downloading address inside the wall, it can be installed directly in the AUR. The service needs to be activated after installation. V2rayA is frequently updated, developed and active, and its installation and use processes are more user-friendly, recommending new people to use V2rayA for scientific Internet access.

```bash
yay -S v2raya-bin
sudo systemctl enable --now v2raya
```

Then search for v2raya in the KDE menu and click on the browser page. Click to add a subscription to it. See more ways to use it.[Official documents](https://v2raya.org/)and[Project Address](https://github.com/v2rayA/v2rayA)

### Qv2ray 3.0

for the same reasons as in the previous section[China mainland government blockade Github](https://zh.wikipedia.org/wiki/%E5%AF%B9GitHub%E7%9A%84%E5%AE%A1%E6%9F%A5%E5%92%8C%E5%B0%81%E9%94%81#%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD), you may not be able to install it through AUR in a normal way[Qv2ray 3.0](https://github.com/Shadowsocks-NET/Qv2ray), so ArchLinuxStudio provides a package that can be installed directly for you. The bin repository for Qv2ray3.0 is the address of the AUR:[qv2ray-static-nightly-bin](https://aur.archlinux.org/packages/qv2ray-static-nightly-bin)I don't know. The dynamic link repository for Qv2ray3.0 is the address of AUR:[qv2ray-git](https://aur.archlinux.org/packages/qv2ray-git)I don't know. The installation and use of Qv2ray is complex and not recommended for start-up. You need to be reminded that if you use the dynamic link Qv2ray, you need to rebuild Qv2ray manually after it is updated.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/qv2ray-git-3.0.0.rc1.r36.g0f1bf651-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/libqv2ray-git-r160.eb10006-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/qv2ray-plugin-interface-git-r88.b767b4c-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/uvw-2.11.0_libuv_v1.43-1-x86_64.pkg.tar.zst
sudo pacman -U *.pkg.tar.zst
```

> Gythub.io is also under blockade by the mainland Chinese government, although the blockade is not strong yet. If you are stuck in this process, you can try to download the ctrl+c command again, or try to retick the network environment of the mobile phone hotspot. When you have a global agent, you will no longer have to worry about any cyber-blocking. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

When installed in Plugins, select V2ray V4 support and make V2ray settings. Now that you're ready to use, you need to import existing links or subscriptions from official documents, with more details to read.[Document for Qv2ray](https://qv2ray.net/)I don't know. The following are some of the concerns:

- The form VMESS MD5 and non-0 AlterID in Qv2ray3.0 is no longer supported if the AlterID that comes from your airport or node is not 0 and cannot be used. If the service supports, you can change AlterID to 0 to use VMessAEAD.
- Qv2ray3.0 has changed the default subscription type at the airport to the norm: SIP008. If your airport subscription type is base64, you need to change SIP008 to base64 in the group-> Subscription Settings-> Subscription type, otherwise you will not be able to get a node in any subscription link.
- **If**You have previously used an old version of 2.x Qv2ray, and you need to delete the old version of Qv2ray and the incompatible configuration, while the old version of Qv2ray cannot coexist with the new version of Qv2ray.
  ```bash
  rm -rf ~/.config/qv2ray
  sudo pacman -R qv2ray-dev-git
  ```
- Qv2ray 3.0 is not compatible with the old version of the plugin and the old Qv2ray 2.x version is not usable. Now Qv2ray 3.0 is supported by VMess, Shadowsocks and Trojan and is passed[Plugin repository](https://github.com/Shadowsocks-NET/QvPlugins)Provides command line plugins, speed measurement plugins, Trojan-Go and Naive support. If you need to use the plugin, you need to compile it and place it in the target directory.`~.config/qv2ray/plugins/`I don't know. Also, ArchLinuxStudio provides pre-compiled plugins for your convenience. Of which trojan-Go plugins do not seem to be currently in use, with hostname and port not being properly parsed[[1]](https://github.com/Shadowsocks-NET/QvPlugins/issues/1)I don't know. Of course, you can also compile your own plugins and remove the comments on the plugins you need to compile in CMakeLists.txt and then compile them. The steps to compile are based on QvPlugins' Actions.[workflow file](https://github.com/Shadowsocks-NET/QvPlugins/actions/runs/1156038253/workflow)I don't know.
  - [Command Line Plugin](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-Command.so)
  - [Speed Plugin](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-LatencyTest.so)
  - [Trojan-Go](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-TrojanGo.so)
  - [Naive](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-NaiveProxy.so)

## 3. Preliminary placement of agents

After the above steps, you should have the addresses and ports of SOCKS5 and HTTP agents. This sub-section describes how to set up separate program agents, but it needs to be reminded that this is not our recommended method of use, and if you are a daily heavy user of Linux, you should use the global agent approach that will be described later.

After the node link you can use in KDE`系统设置` -> `网络设置` -> `代理`. Attention.`系统设置`The proxy configuration is not always followed in the KDE desktop environment, and applications such as chrome/chromium/brave browsers and steam will follow the KDE system agent settings. Applications that do not follow the system settings agent also require a separate proxy configuration. The manner in which the agents are individually configured in several commonly used software is described below.

- Firefox Browser  
  A proxy configuration exists in the fire fox browser ' s own settings and is sufficient.

- Terminal  
  You can set the current terminal proxy through an export command. For example, the use of resources such as tldr or github Raw requires the setting up of the https proxy.

  ```bash
  export https_proxy=http://127.0.0.1:8889
  export http_proxy=http://127.0.0.1:8889
  export all_proxy=http://127.0.0.1:8889
  ```

  > Environmental variables that are identified in different terminal commands differ, e. g. all proxy is valid for curl, while wget is not. See the man page of each command.

- code OSS  
   File => Preference => Settings  
   Search for proxy, fill in the http proxy address

- proxychains-ng  
  If the global agent for KDE is not effective for an application, nor is the application agent activated at the terminal with the AL PROXY variable at the terminal, and the application does not have its own option to configure the agent, then try using proxychains-ng, which can configure the one-line command agent. It is a preloaded Hook allowing TCP traffic to be redirected through one or more SONKS or HTTP agents to existing dynamic link programs.

  ```bash
  sudo pacman -S proxychains-ng
  sudo vim /etc/proxychains.conf
  ```

  Change the last line of the profile to the ip and port of the local agent, e. g.`socks5 127.0.0.1 1089`

  Proxychains cannot support yay and other programs, as detailed[Incompatible with proxychains](https://github.com/Jguer/yay/issues/429)[proxychains4 with Go lang](https://github.com/rofl0r/proxychains-ng/issues/199)I don't know. In this case, transparent agents can be used.

## 4. More comprehensive system-level global agent

As can be seen from the above sections, it is difficult to set up separate agents for each software. If you use Linux as the main force, then it is necessary to have transparent agents, and if you use V2rayA, then you can easily open the global agent in the settings. If you're not technical enough, suggest you use V2rayA's global agent directly. If you use Qv2ray, read the following[Transparent Agent](rookie/transparentProxy)Section.

In the case of a global agent, open UDP support and the DNS request will also be intercepted and imported into v2ray, a more detailed description will be given in the following section.

## Why do we not recommend the use of diversion agents? What's the danger of diversion?

In most scenarios, diversion agents are used in direct connection when visiting domestic resources, and in connection with visits to resources that are walled abroad. The use of such networks is indeed very convenient, but there are obvious dangers, yet the public is almost unaware of the problem.

The way you use a diversion agent is very easy to divulge your own privacy information, including, but not limited to, IP addresses, browsers and hardware fingerprints (almost the only one that can mark your user's fingerprints), and to match your agent IP with your own real IP.

One of the most common examples, for example, is the use of a 100-degree statistical script on a website outside the country, where it is very dangerous that your agent IP can easily be matched with real IP information.
Another example is some kind of malicious mail, such as you're using a mail box service abroad to receive a malicious mail, where some domestic resources are embedded, like pictures, so you can easily access information like your real IP.

There are more than two real examples, and there are many similar cases. We have been fighting for the privacy and security of the public, hoping that in the future you can abandon the use of network connections with diversion agents.
