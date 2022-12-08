# Office Routine

This chapter records the software and configuration required for daily office work. At the same time, it includes the configuration and use of various instant messaging software, network disk, remote assistance and other software.

> Well-known closed-source proprietary IM software in China, such as QQ and WeChat, have different degrees of espionage (actually, not only IM software, but almost all large domestic Internet APPs you can see in China have serious espionage behavior. Its name is: user behavior monitoring or user portrait description). Shameless acts such as collecting user information, scanning user mobile phone storage, monitoring pasted content, and recording mobile phone installed APP lists have almost become open secrets in the industry. In addition to its own evildoing, this type of proprietary spyware also works with authoritarian governments to persecute and hunt down pro-democracy activists and dissidents. At the same time, Tencent has spared no effort to block third-party clients, resulting in no stable and usable version. Tencent released the official version of LinuxQQ in 2020, and its quality can be described as appalling. **We do not support your use of proprietary spy messenger software such as QQ or WeChat as your primary means of communication. This tutorial also does not provide any support. **

> The European Union has promulgated the [GDPR General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) in recent years, and major domestic well-known Internet software companies must strictly abide by the uploaded data when developing overseas software , user privacy and other regulations. However, when developing the Chinese domestic version, it uploads all the personal privacy data that it can obtain as much as possible, which is shameless and evil. We want as many people as possible to resist using this proprietary software.

> It is unrealistic to hope that everyone will boycott or give up such malicious proprietary software, if you cannot give up using these software, we can only hope that you can use them in a relatively safe and isolated environment, such as one without any sensitive individuals Information is used in isolated physical devices. Using free and open source, privacy-conscious messaging software is always the right choice.

## Instant messaging

**We strongly recommend that you use open source and free communication software for your own freedom and the freedom of those around you.**

### Classification of instant messaging software

In addition to the p2p mode, instant messaging software is divided into client software and server software. You should choose open source client software to use. As for the server, unless you plan to deploy the server program yourself, it is meaningless to discuss whether the server of an instant messaging software is open source, because no one will ever know whether the deployed code is the claimed code.

In addition to whether it is an open source and free software, instant messaging software can be divided into three categories in the form of its server deployment.

- The first category is completely centralized communication software, the server of these software is fully controlled by the operating company and provides services to users. Typical examples are WeChat, QQ, Telegram, Signal, and Keybase.
- The second category is distributed, federated communication software. The operating companies or organizations of these software generally provide official servers, but at the same time support any person or organization to deploy servers by themselves. At the same time, these servers can communicate with each other. A typical example is the Matrix-based communication software Element.
- The third category is completely decentralized, p2p communication software. These software basically do not need any server to provide services (there may be a small number of bootstrap nodes, but they do not provide any services except bootstrap), but the two communicating parties communicate directly with each other. This is the most liberal mode, but at the same time offers more limited functionality. A typical example is the communication software qTox based on the Tox protocol.

Below are some of our recommended communication software.

### Telegram

Telegram, commonly known as Telegram in Chinese, is an open source communication software widely used in the world, focusing on privacy protection and single-person communication encryption. We always remind readers that companies should not be trusted to be evil, but some very few companies have proven themselves to be more trustworthy over time, such as Lavabit and Telegram. If you haven't done extremely sensitive activities, Telegram seems to be trustworthy for now. Please do not use the +86 phone number in China to register with Telegram, **please register with a virtual phone**, this is for your safety. If you can buy a Google Voice virtual phone account with cryptocurrency, you can say "I want to buy a Google Voice account" in the [group](https://t.me/FSF_Ministry_of_Truth), and our administrator will chat with you privately chat to assist with your purchase. Alternatively, you can also directly contact our [admin](https://t.me/LLC_XMR) to make a purchase. After registration, you need to set the following settings in `Privacy and Security` in Telegram settings to ensure your privacy:

- Who can see my phone number in Phone number is set to Nobody;
- Who can find me by my number in Phone number is set to My contacts;
- Turn off Sync contact in Contacts section (only on mobile);
- Turn off Suggest Frequent Contacts in the Contacts section (mobile only);
- Click Delete synced contacts in the Contacts section, so that even if there is a contact before, it cannot be linked to you again (only on mobile);

> Note that the above three can only be operated on the mobile phone, it is recommended to complete the Android emulator in Arch Linux. Or operate it on a clean, open-source trusted ROM that doesn't have any Chinese closed-source spyware installed, because if you use a Chinese phone manufacturer's closed-source operating system and closed-source spyware , they can capture your installation of Telegram, and may cooperate with authoritarian governments to further monitor or even arrest you.

Install Telegram on Arch Linux with the following command:

```bash
sudo pacman -S telegram-desktop
```

> Any technology is always a double-edged sword. It is a fact that terrorist activities and scams are carried out on Telegram, and Telegram officials are also carrying out continuous bans. But the significance of its existence cannot be denied or questioned for these reasons. Telegram also provides a reliable platform for dissidents and pro-democracy activists in authoritarian and authoritarian countries to communicate and operate. You definitely don't want to be an accomplice to the governments of these dictatorships.

Finally, if the device you are currently using is very sensitive, you will need to turn off automatic media downloads in Settings, Advanced. In fact, the safest way is to use Telegram without installing it on sensitive devices.

### Element

Element is a distributed, federated instant messaging application client based on the open source Matrix protocol. Its corresponding server-side synapse is also free software, and you can deploy the server-side program yourself.

```bash
sudo pacman -S element-desktop
```

The biggest advantage of Element over Telegram is that its server program is open source and free, and can be deployed by itself. If you deploy it yourself, you can ensure that when you communicate with others, you can not only be sure that the client you are using is secure, but also that the server you are using is secure. In addition to this, Element supports end-to-end encryption of group chats, which Telegram does not.

It can be seen from the deployment situation that Element can achieve higher security than Telegram by deploying its own server. If you are doing extremely sensitive online activities, using Element and deploying synapse yourself is a better option than Telegram. However, when deploying the server program, more energy and money must be expended to maintain it.

Element also provides the official server matrix.org for free use by users. If the services they deploy are indeed the parts of the code they claim to be, then those servers will only be able to access some of the user's metadata with end-to-end encryption. Such as online time and communication objects. If you deploy the server yourself, this metadata is also in your own hands. It should be reminded that if you deploy the server yourself and have high requirements for privacy and security, then the members of the end-to-end encryption group that exists on the self-deployed server should all be registered on your own server. Users registered on other servers, such as matrix.org, should be banned from joining your own groups. Because if they join, the metadata and encrypted chat data in the group on your self-deployed server will flow to other servers, which is a danger.

### qTox

qTox is an end-to-end encrypted instant messaging tool based on the tox protocol. In addition to the basic functions of tox, qTox also implements the function of offline message sending. The original idea of ​​tox was to create an instant messenger that could run without the use of a central server, with peer-to-peer, end-to-end encryption, to ensure the confidentiality and security of user communications. However, it is precisely because of its characteristics that qTox provides limited functions, such as groups in qTox. If someone goes offline, he cannot receive group information during the offline period.

```bash
sudo pacman -S qtox
```

qTox will generate a Tox ID when registering, this ID is used to add friends, and the user IP information at the time of registration exists in this ID, which is used as a way to connect in the future. The connection method of qTox is as follows. First, qTox will connect to some [startup nodes](https://nodes.tox.chat/), these startup nodes will obtain your current IP and provide you with the IP of the object you want to communicate with . If the initiating node does not have the IP of the object you want to communicate with, it will try to connect using the IP in the peer's Tox ID. If the connection cannot be established, it will fail. The reason why qTox is blocked in China may be because the Chinese government blocks all startup nodes, and because most people do not have a stable and reachable public network IP, it is impossible to establish a connection correctly without overturning the wall.

### IRC

IRC, Internet Relay Chat, is an ancient communication method that is still widely used in the open source community. Common clients include WeeChat and Emacs' erc.

```bash
sudo pacman -S weechat
```

### Screen sharing

In addition to the above software, you can try to use [scrcpy](https://archlinux.org/packages/community/x86_64/scrcpy/) for screen projection of other mobile communication software on the computer.
You can also use [KDE Connect](https://archlinux.org/packages/extra/x86_64/kdeconnect/) to get Android notifications on your computer.

## Office kit

The main two options are [LibreOffice](https://wiki.archlinux.org/index.php/LibreOffice) and [onlyoffice](<https://aur.archlinux.org/packages/onlyoffice-bin/)>) <sup>AUR</sup>. We recommend that you use the open source LibreOffice and onlyoffice, rather than the proprietary software WPS, the first two of which are currently very easy to install.

```bash
sudo pacman -S libreoffice-still #stable
sudo pacman -S libreoffice-fresh #Trial version
yay -S onlyoffice-bin
```

To read some old chm documentation, install `kchmviewer`.

```bash
sudo pacman -S kchmviewer
```

## Printer

For daily office, a printer is very necessary. In addition, we recommend readers to maintain a paper password, including that you can print out the private key in your cryptocurrency wallet and save it, which is a very good solution. For the brand of printer, we recommend using HP printers. Its support for Linux is very comprehensive, you can go to its [website](https://hplipopensource.com/) to check the supported devices and other details. On Arch Linux, install the packages hplip and cups and use them after starting the service.

```bash
sudo pacman -S hplip
sudo pacman -S cups
sudo systemctl enable --now cups.service
```

## Notebook

Joplin is a simple markdown notebook with basic features like tags and hierarchies. And has two versions of cli and desktop. Its LICENSE is MIT .

```
yay -S joplin #cli
yay -S joplin-desktop #desktop
```

Trilium is an open source electronic note-taking software, which supports the import of markdown and evernote formats, and supports the export of markdown and html formats. It has functions such as labels, unlimited levels, relationship diagrams, and history records, based on CKEditor's WYSIWYG markdown editor. And support to build your own on the server. Its LICENSE is AGPL 3.0 .

```
yay -S trilium-bin
yay -S trilium-server-bin
```

## eBooks

The pdf can be opened directly with a browser, or other dedicated reading software, such as [okular](https://archlinux.org/packages/extra/x86_64/okular/) or [calibre](https://archlinux.org/packages/community/x86_64/calibre/). okular can be very laggy when opening large epubs, and the pictures are blurry, [Foliate](https://archlinux.org/packages/community/x86_64/foliate/) is a better choice for reading epubs.

## RSS reader

The RSS reader newsflash is the spiritual successor to feedreader, supports reading of native RSS feeds and the RSS API, and is written in Rust. Currently feedreader is no longer maintained. You can also use liferea.

```
sudo pacman -S newsflash
```

## Document management

JabRef is an open source document management software written in java and works well with LaTeX. It can cooperate with vim, Emacs, and manage documents in bib format.

```
yay -S jabref
```

Zotero is an open-source, Firefox-based solution that can be referenced via the VSCode plugin and vim plugin. The beta version features note taking and built-in PDF reader.

```
yay -S zotero
yay -S zotero-beta # with notes and built-in PDF reader
```

## Screenshot

It is recommended to use flameshot flame screenshots

```
sudo pacman -S flameshot
```

The command for the shortcut key is `flameshot gui`, which can be added to the KDE settings to set the shortcut keys to the keys you are familiar with. Or try another popular screenshot software from KDE [spectacle](https://archlinux.org/packages/extra/x86_64/spectacle/)

## Download & storage

> Do not use any domestic network disk to store your personal data, they can dispose of all your data at will according to the "relevant terms and regulations", or the spiritual awareness of "self-castration", after carefully reading their user agreement , you will feel creepy. The wall country network disk can only be used to store irrelevant junk data.

> Do not use similar software such as Thunder and Cyclone. Regarding the principle of BT and the evil deeds of Thunder, you can refer to the article [Why is the China BT environment so bad? ](https://zhuanlan.zhihu.com/p/87193566)

- [Mega](https://aur.archlinux.org/packages/megasync/)<sup>AUR</sup> New Zealand's old privacy-conscious online disk, you can also use the [web version](https://mega.nz/fm/dashboard)
  > There may be some controversies about the Mega network disk, but choosing Mega is still choosing some network disks that cooperate with authoritarian governments very happily. The conclusion is very obvious.
- [onedrive](https://aur.archlinux.org/packages/onedrive-abraunegg/)<sup>AUR</sup> The online disk business founded by Microsoft, there is a command line client under linux
- [qbtorrent-enhance-version](https://aur.archlinux.org/packages/qbittorrent-enhanced/)<sup>AUR</sup> Enhanced version of the old BT client, support filling in the tracker URL for pulling It is better to use it with the [TrackersListCollection project](https://github.com/XIU2/TrackersListCollection).

## Picture Viewer

[gwenview](https://archlinux.org/packages/extra/x86_64/gwenview/) has been installed in the section on desktop environment and necessary applications, which can basically meet the needs of daily picture viewing. If you need another quick viewing software, you can try the following software.

- [feh](https://www.archlinux.org/packages/extra/x86_64/feh/)
- [nomacs](https://www.archlinux.org/packages/community/x86_64/nomacs/)

## Common System Components

There are many implementations of various gadgets needed in daily office work, among which there are many in KDE's suites, which can be inquired by yourself. Here are just a few commonly used examples.

- [Kcalc](https://archlinux.org/packages/extra/x86_64/kcalc/) calculator
- [Kamoso](https://archlinux.org/packages/extra/x86_64/kamoso/) camera
- [Cheese](https://archlinux.org/packages/extra/x86_64/kamoso/) Eggplant Camera
- [KTimer](https://archlinux.org/packages/extra/x86_64/ktimer/) countdown executor

## Remote Assistance

To connect to a Windows remote machine, you can use the open source [freerdp](https://archlinux.org/packages/community/x86_64/freerdp/) protocol, in conjunction with the open source implementation [Xrdp](https://wiki.archlinux.org/title/Xrdp), or [Rdesktop](https://wiki.archlinux.org/title/Rdesktop).

To connect to a Linux server, ssh is sufficient for most scenarios.

If the above solutions do not satisfy you, then you can try the free proprietary software [teamviewer](https://aur.archlinux.org/packages/teamviewer/)<sup>AUR</sup>, its perfect function is basically Can meet all needs. It should be noted that after installation, you need to start the service according to the prompts.

```bash
sudo systemctl enable --now teamviewerd
```
