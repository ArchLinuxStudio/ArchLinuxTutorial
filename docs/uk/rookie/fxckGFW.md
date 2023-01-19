# School of Magic

> **[Right to access the Internet](https://en.wikipedia.org/wiki/%E8%A8%AA%E5%95%8F%E4%BA%92%E8%81%AF%E7%B6%B2%E6%AC%8A) believes that all people must have access to the Internet in order to exercise and enjoy their freedom of speech, freedom of communication, freedom of opinion, and other fundamental human rights. Any country or region that unreasonably restricts personal access to the Internet is a violation of basic human rights.**

**For your personal safety, do not use the Science Internet Client on any device with spyware proprietary software. These devices can be cell phones, PCs, etc. On mobile phones, there is precedent for authoritarian government regulators to easily get a list of the apps you have installed, and to correlate and query what you do and say through various means, and take further control. In theory, this is entirely possible on PC devices as well. If you must use WeChat, QQ and other proprietary software with espionage properties, please use it in a completely isolated physical device. Please read [Modern Privacy Protection Guide](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/) for more content, it is very important for your security!**

This section describes how to surf the web scientifically under linux. This section and subsequent global proxy chapters are **must read**. If you do not configure Scientific Internet, then you will encounter various problems in daily use, whether it is blocked resources or codes, or consulting related problem materials, you may not be able to download and browse. Everyone **must** configure Science Internet before proceeding.

## 1. Preparation of nodes

Simply put, a node is a mysterious link in the form of the following. No matter how you get these links, if you already have them, you can directly read the following section.

```txt
ss://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
vmess://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If you don't have these connections, you can deploy it yourself or buy a subscription to the airport.

If you deploy it yourself, you need to purchase a server on the free Internet and build a node yourself. This is not within the scope of this article, and only three high-quality articles from the GFW Report are provided for reference. But these articles have been blocked by GFW. We will provide some solutions to this problem later.

<!-- TODO GFW fucked GFW report! -->

- [How to deploy an anti-blocking Shadowsocks-libev server](https://gfw.report/blog/ss_tutorial/en/)
- [A practical guide to defending against GFW active detection](https://gfw.report/blog/ss_advise/en/)
- [How Shadowsocks is detected and blocked](https://gfw.report/talks/imc20/en/)

For server purchases, we provide a URL for reference: https://bitcoin-vps.com/ . bitcoin-vps provides a very detailed and up-to-date list of server providers that support the use of cryptocurrencies for payments to varying degrees, such as Bitcoin, Ethereum, and more. The advantage of paying with cryptocurrencies is that, with proper operation, you can fully protect your privacy. It is not safe to use real-name payment methods such as Alipay to purchase similar services. We hope that readers can recognize the value of cryptocurrencies in all aspects and realize that cryptocurrencies can exist as your privacy protectors.

---

If you purchase subscription services for airports, you can refer to their subscription process to get nodes. We have listed some of the more trusted airport services to choose from, but **WE DO NOT GIVE ANY WARRANTY**. It should be reminded that the airport service is a gray industry, and it is possible to stop the service at any time. It is recommended to pay monthly to avoid excessive losses. Regarding airport audit rules, our view is "I can not read, but you can't ban". As for the degree of airport audit, readers can make their own assessments according to their own actual situation.

- [GLaDOS](https://www.glados.rocks/landing/9FMKX-GYLMK-ZYIZW-5U3T0) After registration, use the activation code `9FMKX-GYLMK-ZYIZW-5U3T0` to activate the account and get free time. The advantage of GLaDOS is that it can be used for free upon check-in, and it operates for a long time and is more credible. In addition to that, GLaDOS is one of the few airports with a Trojan node. The downside is that the speed isn't great. For its audit rules, you can enter the background panel to view it yourself after registering an account. According to our tests, it is not audited strictly in accordance with the auditing rules.

---

If you don't want to spend any money, you can install software like [Psiphon](https://psiphon3.com/zh/index.html). Psiphon is free software.

If you use Psiphon, you can easily send an empty email to get@psiphon3.com to get the Psiphon download link. Psiphon application currently only supports Windows\Android\IOS\MacOS platform. When you can access the free Internet on these platforms, you can go to various channels to search for available nodes and proxy resources, such as [this](https://t.me/wtovpn) or [this](https://t.me/TG_Mtproxy_1). Note that using public nodes is at your own risk.

## 2. Installation

Qv2ray and V2rayA are two excellent general-purpose clients for scientific internet available on Linux. You can install both as a backup. Among them, V2rayA is a browser client, which can be accessed remotely on the browser side in a headless environment such as a server. Qv2ray is a classic C/S architecture desktop software developed with QT.

<!-- Each step in this section will be covered separately for Qv2ray 3.0 and V2rayA. -->

### v2ray

v2ray is a prerequisite for using Qv2ray and V2rayA. It needs to be installed first. In the previous section [Selection of Mirror Sources](uk/rookie/basic_install?id=_7-mirror-source-selection), we mentioned that readers should replace mirror sources in non-authoritarian countries as soon as possible to ensure their own security, ** here Before installing v2ray is the last time you can switch to a mirror source in a non-authoritarian country**. Install v2ray using a secure mirror source.

```bash
sudo pacman -S v2ray
```

If there is no faster or accessible secure mirror source to install v2ray in your network environment, you can execute the following command to install the v2ray installation package provided by ArchLinuxStudio.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/v2ray-4.44.0-1-x86_64.pkg.tar.zst
sudo pacman -U v2ray-4.44.0-1-x86_64.pkg.tar.zst
```

### V2rayA

V2rayA is a browser client that is very convenient to use. Since the author provides the download address in the wall, it can be installed directly in AUR. The service needs to be started after installation. V2rayA is updated frequently, developed actively, and its installation and use process are more friendly to novices. It is recommended for newcomers to use V2rayA for scientific Internet access.

```bash
yay -S v2raya-bin
sudo systemctl enable --now v2raya
```

Then search for v2raya in the KDE menu and click to open the browser page. After logging in, you can use it by adding a subscription. For more usage methods, please see [Official Documentation](https://v2raya.org/) and [Project Address](https://github.com/v2rayA/v2rayA)

### Qv2ray 3.0

For the same reasons as described in the previous section, due to the [Mainland Chinese government blocks Github](https://zh.wikipedia.org/wiki/%E5%AF%B9GitHub%E7%9A%84%E5%AE%A1%E6%9F%A5%E5%92%8C%E5%B0%81%E9%94%81#%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD), you probably cannot install [Qv2ray 3.0](https://github.com/Shadowsocks-NET/Qv2ray) through AUR in the normal yay way, so ArchLinuxStudio provides a set of ready-to-install packages for you to use. The bin repository of Qv2ray3.0 is at the AUR address: [qv2ray-static-nightly-bin](https://aur.archlinux.org/packages/qv2ray-static-nightly-bin). The dynamic link repository of Qv2ray3.0 is at the AUR address: [qv2ray-git](https://aur.archlinux.org/packages/qv2ray-git). The installation and use of Qv2ray is more complicated and is not recommended for novice users. It should be reminded that if you use a dynamically linked Qv2ray, you will need to manually rebuild Qv2ray after its related dependencies are updated.

```bash
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/qv2ray-git-3.0.0.rc1.r36.g0f1bf651-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/libqv2ray-git-r160.eb10006-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/qv2ray-plugin-interface-git-r88.b767b4c-1-x86_64.pkg.tar.zst
wget https://archlinuxstudio.github.io/ArchLinuxTutorial/res/uvw-2.11.0_libuv_v1.43-1-x86_64.pkg.tar.zst
sudo pacman -U *.pkg.tar.zst
```

> github.io is also blocked by the Chinese mainland government, but the blockade has not been very strong for the time being. If you get stuck during this process, you can try ctrl+c to terminate the command and try the download again, or you can try to change the network environment of the mobile phone hotspot to download again. When you configure the global proxy, you will no longer need to worry about any network blocking issues. We will continue to provide readers of this book with a reliable process for breaking through Internet censorship.

After installation, in Plugins, select V2ray V4 support, and set V2ray. Now that you can use it, you need to import the existing links or subscriptions according to the official documentation. For the rest of the details, please read [Qv2ray's documentation](https://qv2ray.net/). There are a few things to note:

- The form of VMESS MD5 and non-0 AlterID in Qv2ray3.0 is no longer supported. If the AlterID issued by your airport or node is non-0, it cannot be used. If the server supports it, you can change the AlterID to 0 to use the VMessAEAD form.
- Qv2ray3.0 has changed the airport's default subscription type to Specification: SIP008. If your airport subscription type is base64, you need to change SIP008 to base64 in Group->Subscription Settings->Subscription Type, otherwise you will not get any nodes in the subscription link.
- **If** you have used an old version of Qv2ray 2.x before, you need to delete the old version of Qv2ray and the incompatible configuration, and the old version of Qv2ray and the new version of Qv2ray cannot coexist.
  ```bash
  rm -rf ~/.config/qv2ray
  sudo pacman -R qv2ray-dev-git
  ```
- Qv2ray 3.0 is not compatible with the old plug-ins, the old Qv2ray 2.x old plug-ins cannot be used. Currently, Qv2ray 3.0 integrates the support of VMess, Shadowsocks and Trojan, and provides support for command line plugins, speed measurement plugins, Trojan-Go and Naive through [Plugin Repository](https://github.com/Shadowsocks-NET/QvPlugins). If you need to use one of the plugins, you need to compile it yourself and put it in the target directory `~.config/qv2ray/plugins/`. At the same time, ArchLinuxStudio also provides pre-compiled plug-ins for your convenience. The Trojan-Go plugin does not seem to be working properly at present, and the hostname and port cannot be resolved normally [[1]](https://github.com/Shadowsocks-NET/QvPlugins/issues/1). Of course, you can also compile the plugin yourself, uncomment the plugin you need to compile in CMakeLists.txt, and then compile it. For the compilation steps, please refer to the [workflow file](https://github.com/Shadowsocks-NET/QvPlugins/actions/runs/1156038253/workflow) of Actions of QvPlugins .
  - [Command Line Plugin](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-Command.so)
  - [Speed ​​Test Plugin](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-LatencyTest.so)
  - [Trojan-Go](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-TrojanGo.so)
  - [Naive](https://archlinuxstudio.github.io/ArchLinuxTutorial/res/QvPlugins/libQvPlugin-NaiveProxy.so)

## 3. Preliminary settings for the proxy

After going through the above steps, you should already have the SOCKS5 proxy and the address and port of the HTTP proxy. This section describes how to set up a proxy for some programs individually, but it should be reminded that this is not the recommended way to use it. If you are a daily heavy user of Linux, you should use the global proxy method that will be described later.

After the node is linked, you can set the proxy in KDE's `System Settings` -> `Network Settings` -> `Proxy`. Note that the proxy configuration in `system settings` is not followed by all applications in the KDE desktop environment. After testing, applications such as chrome/chromium/brave browsers and steam will follow KDE's system proxy settings. Applications that do not follow the system settings proxy also require separate proxy configuration. The following describes how to configure agents individually in several commonly used software.

- Firefox browser
  There is a proxy configuration in the settings options of the Firefox browser itself, and you can configure it.

- Terminal
  The proxy mode of the current terminal can be set through the export command. For example, using resources such as tldr or github raw requires setting an https proxy.

  ```bash
  export https_proxy=http://127.0.0.1:8889
  export http_proxy=http://127.0.0.1:8889
  export all_proxy=http://127.0.0.1:8889
  ```

  > The names of environment variables recognized by different terminal commands are different. For example, all_proxy is valid for curl, but not for wget. For details, please refer to the man page of each command.

- code OSS
  File => Preferences => Settings
  Search for proxy and fill in the http proxy address in it

-proxychains-ng
If for an application, KDE's global proxy does not take effect, exporting the ALL_PROXY variable in the terminal and then starting the application proxy from the terminal does not take effect, and the application itself does not have the option to configure the proxy. At this time, you can try to use proxychains-ng, it The proxy can be configured for a one-line command. It is a preloaded hook that allows to redirect TCP traffic for existing dynamic linkers through one or more SOCKS or HTTP proxies.

```bash
sudo pacman -S proxychains-ng
sudo vim /etc/proxychains.conf
```

Change the last line in the configuration file to the ip and port of the local proxy, such as `socks5 127.0.0.1 1089`

proxychains cannot support yay and some other programs, see [Incompatible with proxychains](https://github.com/Jguer/yay/issues/429)[proxychains4 with Go lang](https://github.com/rofl0r/proxychains-ng/issues/199). A transparent proxy can be used in this case.

## 4. A more comprehensive system-level global proxy

As can be seen from the above sections, it is very troublesome to set up a proxy for each software separately. If you use Linux as the main force, it is also necessary to configure a transparent proxy. If you use V2rayA, you can easily turn on the global proxy in the settings. If your technical level is not high, it is recommended that you use V2rayA's global proxy directly. If you use Qv2ray, please read the following section [Transparent Proxy](uk/rookie/transparentProxy).

In the case of global proxy, with UDP support turned on, DNS requests will also be intercepted and imported into v2ray, a more detailed description will be given in the next section.

## 5. Why do we not recommend the use of offload proxies? What are the possible dangers of offloading proxies?

In most scenarios, the shunt proxy refers to using a direct connection method when accessing domestic resources, and using a proxy connection when accessing foreign resources that are blocked. This way of using the network can be very convenient, but there are obvious dangers, but the public is almost unaware of the problem.

It is very easy to leak your own private information, including but not limited to IP address, browser and hardware fingerprint (which can almost uniquely mark your user's fingerprint), etc., and can use the information you use. The proxy IP corresponds to your own real IP.

For example, one of the most common examples is that a foreign website uses a Baidu statistics script. At this time, the corresponding information between your proxy IP and real IP can be easily matched by such a website, which is very dangerous.
Another example is some malicious emails. For example, you are using a foreign email service and receive a malicious email. This email contains some domestic resources such as pictures, so your real IP and other information can also be easily obtained.

There are more real examples than the above two, there are many similar situations. We have always fought for the privacy and security of the public, and we hope that in the future you will be able to forgo the use of shunt proxy network connections.
