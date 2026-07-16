<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Daily operations

This chapter records the software and configuration required for daily office requirements. It also includes the configuration and use of various types of instant communication software and software such as diskettes and remote assistance.

> QQQ and well-known closed-source-specific IM software in China, such as Wesson, have different levels of espionage (in fact, not only IM software, but almost all of China's large Internet APPs that you can see have serious espionage in the name of user behavior monitoring or user image description). Collection of user information, scanning the contents of the user's mobile phone storage, monitoring the content of the paste, recording the shameful acts such as the installation of the APP list on the mobile phone have become almost public secrets in the industry. In addition to self-inflicted abuses, such proprietary spy software is colluded with the powerful Government in the persecution and pursuit of pro-democracy activists and dissidents. At the same time, the unremitting closure of third-party clients by the arraignment has not been accompanied by a stable version. The quality of the official version of LinuxQ, which was released in 2020, can be described in an outrageous manner.**We don't support your use of proprietary spy communication software like QQQ or micro-trust as your main means of communication. The Academy does not provide any support.**

> The EU has introduced it in recent years.[GDPR General Data Protection Regulations](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)In developing overseas versions of software, the country ' s leading Internet software companies are required to comply strictly with the requirements of uploading data, user privacy, etc. However, when developing China ' s domestic version, it is shameful and evil to upload, to the extent possible, all the user ' s personal privacy data that it can access. We hope that as many people as possible will resist the use of this proprietary software.

> It is unrealistic to hope that everyone will resist or abandon such malicious proprietary software, and if you cannot abandon its use, we can only hope that you can use it in a safer isolation environment, such as an isolated physical device without any sensitive personal information. The use of free and open-source, privacy-sensitive communications software has always been the right choice.

## Organisation

**We strongly recommend that you use open-source free communication software for your own freedom and for the freedom of those around you.**

### Classification of instant messaging software

Except for the p2p mode, instant messaging software is divided into client and service-end software. You should select an open source client software for use. For the service end, unless you intend to deploy the server program yourself, there is no point in discussing whether the service end of an instant communication software is open, as no one will ever know whether the code is being deployed or not.

In addition to whether or not it is open-source free software, instant messaging software can be divided into three categories in the form of its service-end deployment.

- The first is fully centralized communications software, whose servers are fully controlled by the operating enterprise and service users. Typical examples are Twitter, QQQ, Telegram, Signal and Keybase.
- The second category consists of distributed, federal communications software, the operating enterprises or organizations of which typically provide official servers, but at the same time support the self-deployment of servers by any person or organization. At the same time, these servers can communicate with each other. Typical examples are the Matrix-based communication software Element.
- The third category is completely decentralised, p2p communication software. The software is essentially not required for service delivery by any server (there may be a small number of lead nodes, but it does not provide any services, but rather direct communication between the two parties. This is the most liberal, but at the same time provides a more limited mode of functioning. Typical examples are tox-based communications software qTox.

Some of our more recommended communications software is described below.

### Telegram

Telegram, commonly referred to as telegraph, is an open-source communications software that is widely used worldwide, focusing on privacy protection and individual communications encryption. We have always reminded readers that business should not be bad, but some very few firms have proved, after time tests, that they are more trustworthy, such as Lavabit and Telegram. If you haven't been very sensitive, Telegram seems to be trustworthy. Please do not register with the +86 phone number in China.**Please register with the virtual phone.**It's for your safety. If you can buy Google Voice virtual phone accounts with encrypted money, you can.[Group](https://t.me/FSF_Ministry_of_Truth)It says, "I want to buy Google voice accounts," and we'll have our managers talking to you to help you finish your purchase. Or, you can contact us directly.[Administrator](https://t.me/LLC_XMR)Carry out purchases. After registration is completed, need to be in Telegram settings`Privacy and Security`The following settings are made to protect your privacy:

- Who can see my phone number set to nobody;
- Who can find me by my number set to my contacts;
- Close the Sync contact in the Contacts section (mechanized only on the mobile phone);
- Close the Suggest Frequent Practices in the Contacts section (mechanized only on the mobile phone);
- Click Delete synced contacts in the Contacts section, so that even previous contacts cannot be connected to you again (only on the mobile phone);

> Note that the three above can only be operated at the cellular end and it is recommended that they be done in the Anjo simulator in Arch Linux. Or a pure, open-sourced ROM, which does not operate on a mobile phone with any Chinese closed-source spy software, because if you use the closed-source operating system of a Chinese mobile phone manufacturer, as well as closed-source spy software, they can access your installation of Telegram and possibly cooperate with a powerful government in further surveillance and even arrest.

Install Telegram on Arch Linux by the following command:

```bash
sudo pacman -S telegram-desktop
```

> Any technology is always a double-edged sword. Terrorist and fraudulent activities on Telegram are a fact, and there is an ongoing ban on Telegram. However, the significance of their existence cannot be denied or questioned for these reasons. Telegram also provides a reliable platform for communication and activities between dissidents and pro-democracy activists in authoritarian and authoritarian countries. You don't want to be an accomplice to these authoritarian governments.

And finally, if the device you're using is very sensitive, then you need to set up a high-level medium to shut down the media for automatic download. In fact, the safest way is not to install Telegram on sensitive equipment.

### Element

Element is a distributed, federal, immediate communications client based on open source Matrix protocols. It's also free software, and you can deploy your own service-end program.

```bash
sudo pacman -S element-desktop
```

The greatest advantage of Element compared to Telegram is that its service-end program is open-source free and self-deployed. If self-deployed, this will ensure that when you communicate with others, you can determine not only that the client you use is safe, but also that the service end is safe. In addition, Element supports end-to-end encryption of group chats, which is not supported by Telegram.

As a result, it can be seen that, given the deployment situation, there is a greater degree of security available to Element than Telegram in the case of self-deployment services. If you're engaged in extremely sensitive online activities, using Element and self-positioning synapse is a better option than Telegram. However, the deployment of server procedures requires additional effort and funding to maintain them.

Element also provides an official server, matrix.org, for free use by users. If the service it deploys is indeed the part of the code it claims, then the servers can only access some users' metadata with end-to-end encryption. For example, on-line hours and contacts. If you deploy the servers, you will have the metadata in your own hands. It should be recalled that if a server is deployed on its own and there is a high level of privacy security requirement, members of the end-to-end encryption group that exists on a self-deployed server should be registered on your own server and users registered on other servers, such as matrix.org, should be barred from joining your own group. Because if they do, it's a danger that metadata from your self-deployed server and encrypted chat data will flow to other servers.

### qTox

qTox is an end-to-end encryption instant messaging tool based on the tox protocol. In addition to the basic function of tox, qTox also performs offline messaging. The original idea for tox is to create an instant communication tool that can run without using a central server, and to do point-to-point, end-to-end encryption to ensure the confidentiality and security of user communications. However, precisely because of its characteristics, qTox offers a more limited functionality, such as a group in qTox, which, if someone is offline, is unable to receive group information during offline.

```bash
sudo pacman -S qtox
```

qTox will generate Tox ID at the time of registration, which will be used to add friends and where the registered user IP information exists as a way to connect in the future. The qTox connection is as follows. First, qTox will connect some of the connections.[Start Node](https://nodes.tox.chat/)And these start points will get your current IP and give you the IP that you want to communicate with. If the node does not have the IP of the object you want to communicate, then you will try to connect with the IP of each other 's Tox ID. Failure to build a link. qTox has been blocked in China probably because the Chinese government has blocked all start-up nodes, and because most people do not have a stable public Internet IP, it is not possible to build a connection properly without going over the wall.

### IRC

IRC, Internet Relay Chat, is an age-old means of communication that is still widely used in open-source communities, with WeeChat and Emacs erc as common clients.

```bash
sudo pacman -S weechat
```

### Screen Sharing

Cell phone communication software on computer screens can be used to try.[scrcpy](https://archlinux.org/packages/extra/x86_64/scrcpy/)I don't know.

```
sudo pacman -S scrcpy
```

It's also recommended.[KDE Connect](https://archlinux.org/packages/extra/x86_64/kdeconnect/)Multi-end equipment interconnection.

```
sudo pacman -S kdeconnect
sudo pacman -S sshfs # 文件系统挂载，Dolphin完美集成
```

## Office packages

The main two options are:[LibreOffice](https://wiki.archlinux.org/index.php/LibreOffice)and[onlyoffice](https://aur.archlinux.org/packages/onlyoffice-bin/)<sup>AUR</sup>I don't know. We suggest that you use open-source LibreOffice and onlyoffice instead of proprietary WPS, which are already being installed very simply.

```bash
sudo pacman -S libreoffice-still   #稳定版
sudo pacman -S libreoffice-fresh   #尝鲜版
yay -S onlyoffice-bin
```

Read some old-fashioned cm documents that can be installed`kchmviewer`I don't know.

```bash
sudo pacman -S kchmviewer
```

## Printers

Printers are essential for day-to-day operations. In addition to that, we suggest that readers maintain a paper password, including that you print your encrypted private key in your money wallet, which is a very good idea. For printer brands, we suggest using HP printers. Its support for Linux is very comprehensive, and it can go away.[Website](https://hplipopensource.com/)See details of the equipment supported. On Arch Linux, install packages hplip and cups, which can be used when service starts.

```bash
sudo pacman -S system-config-printer
sudo pacman -S hplip
sudo pacman -S cups
sudo systemctl enable --now cups.service
```

## The notebook.

Joplin is a simple markdown notebook with basic features such as labels and hierarchy. And there are two versions of cli and desktop. Its LICENSE is MIT.

```
yay -S joplin # cli
yay -S joplin-desktop # desktop
```

Trilum is an open-source electron notebook software that supports the import of markdown and evernote formats, as well as the export formats of markdown and html. It has its own labels, infinity levels, relationship maps and historical records, based on what CKEditor can see as a markdown editor. And support building on the server. Its LICENSE is AGPL 3.0.

```
yay -S trilium-bin
yay -S trilium-server-bin
```

VNote is a free Qt-based open-source notebook application focused on Markdown. Its LICE is LGPL-3.0.

```
yay -S vnote
```

## Electronic books

pdf Opens directly with browsers or chooses other specialized reading software such as[okular](https://archlinux.org/packages/extra/x86_64/okular/)Or...[calibre](https://archlinux.org/packages/extra/x86_64/calibre/)I don't know. Okular will be very nice when opening large epub, and the picture is blurry.[Foliate](https://archlinux.org/packages/extra/x86_64/foliate/)It's better to read epub.

## RSS Reader

The RSS reader newsflash is the spiritual heir to feedreader, supporting local RSS sources and RSS API reading, written by Rust. Currently feedreader is no longer maintained. You can also use liferea.

```
sudo pacman -S newsflash
```

## Documentation management

Jabref is a good open source documentation management software developed by java and working with LaTeX that can work with vim, Emacs and manage the literature in bib format.

```
yay -S jabref
```

Zotero is an open-source application based on Firefox solutions, which can be referenced through VSCode plugins and vim plugins. Beta version has notes and built-in PDF readers.

```
yay -S zotero
yay -S zotero-beta #具有笔记和内置 PDF 阅读器
```

## Screenshot

Recommended flameshot flameshot

```
sudo pacman -S flameshot
```

The command for the shortcut key is`flameshot gui`, you can add shortcuts to the KDE settings. Or try another popular KDE-produced screenshot software.[spectacle](https://archlinux.org/packages/extra/x86_64/spectacle/)

## Download Storage

> Don't store your personal data on the Internet in any walled country, they can dispose of all your data according to "relevant provisions and regulations" or "self-embracing" mental awareness, and you'll feel creepy after reading their user agreements. Wall State grids can only be used to store irrelevant garbage data.

> Do not use similar software such as thunder and cyclones. An article about the principles of BT and the evils of thunder.[Why is the domestic B.T. environment so bad?](https://zhuanlan.zhihu.com/p/87193566)

- [Mega](https://aur.archlinux.org/packages/megasync/)<sup>AUR</sup>New Zealand's privacy-oriented old board is also available directly.[Web Version](https://mega.nz/fm/dashboard)
  > There may be some controversy about the Mega Internet, but the choice of Mega is rather one of those that work very well with powerful governments, and the conclusion is clear.
- [onedrive](https://aur.archlinux.org/packages/onedrive-abraunegg/)<sup>AUR</sup>Microsoft started a web business with an order line client under linux End
- [qbtorrent-enhance-version](https://aur.archlinux.org/packages/qbittorrent-enhanced/)<sup>AUR</sup>Old B.T. client enhancement to support URLs to fill in tracker for extraction and alignment[TrackersListCollection](https://github.com/XIU2/TrackersListCollection)Use better.

## Picture Browser

Installed in desktop environment and necessary applications section[gwenview](https://archlinux.org/packages/extra/x86_64/gwenview/)It basically meets the needs of the daily map. The following software can be tried if fast-looking software is required.

- [feh](https://www.archlinux.org/packages/extra/x86_64/feh/)
- [nomacs](https://aur.archlinux.org/packages/nomacs)

## Common System Component

Many of the small tools needed in the day-to-day operation are available, and many of the packages in KDE are available for self-search, with only a few examples commonly used here.

- [Kcalc](https://archlinux.org/packages/extra/x86_64/kcalc/)Calculator
- [Kamoso](https://archlinux.org/packages/extra/x86_64/kamoso/)Camera
- [Cheese](https://archlinux.org/packages/extra/x86_64/kamoso/)Cheese camera.
- [KTimer](https://archlinux.org/packages/extra/x86_64/ktimer/)Countdown Executioner

## Remote assistance

If you need to connect to Windows remote machines, you can use open source[freerdp](https://archlinux.org/packages/extra/x86_64/freerdp/)protocol, with open source[Xrdp](https://wiki.archlinux.org/title/Xrdp)or[Rdesktop](https://wiki.archlinux.org/title/Rdesktop)It's okay.

If you need a link to the Linux server, most scenes can be ssh.

If the above solution doesn't satisfy you, then try free proprietary software.[teamviewer](https://aur.archlinux.org/packages/teamviewer/)<sup>AUR</sup>Its well-functioning functions basically meet all needs. Care needs to be taken to start the service as indicated after installation.

```bash
sudo systemctl enable --now teamviewerd
```

## Virus protection

Linux is often considered incorrect because of its perfect design and open-source characteristics, which make it less susceptible to the virus and therefore less necessary to install anti-virus software. With the spread of Linux, more viruses are emerging against Linux. In addition, as Wine and Proton are increasingly used, the threat of viruses on Windows systems continues to increase in Linux. In Arch Linux, available[ClamAV](https://wiki.archlinux.org/title/ClamAV)Scan the system and then delete the virus files that exist. According to wiki, a more sophisticated virus scan can be performed with the addition of more virus characterization libraries, noting that if your file system is very large, the scanning process can last for dozens of hours. If you're interested in using the paid closed source software, according to our survey, the software is currently being updated and improved for the individual Linux PC end[Dr.Web](https://products.drweb.cn/home/linux/)You can use it yourself.
