<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Arch Linux installation use tutorial - ArchTutorial - Arch Linux Studio<!-- {docsify-ignore-all} -->

Arch Linux installation using tutorials, updated daily in real time! This includes installation from Arch Linux, scientific access, transparent agency, graphics drive, use of day-to-day software, etc., with media production, programming, use of encrypted currency on ArchLinux for all the content you may need. Let Arch Linux become your usual system!

This book provides some of our experience in using Linux over the years and teaches people who need it. Another part of Linux:[GNU](https://www.gnu.org/home.zh-cn.html)  
New readers, please make sure you're done with your steps.`新手上路`in the**All**Read down later, otherwise problems may arise.

- Characteristics of the book
  - We have always placed the privacy and security of our readers first, and the use of free software can provide you with considerable safeguards. It is foolish and evil to raise so-called "practical" or "avoid ideological controversy" to question the free software movement.
  - The book provides a well-developed and reliable scientific access process for readers in areas where the Internet is blocked and censored, and we regret it very much if it is considered "unharmonious".
  - The book style is kept as concise as possible in order to increase the speed at which readers can load their websites. At the same time, we believe that fancy styles should not exist in a more serious book.
  - No bullshit. Just one set.**We think...**The more appropriate route is to keep the installation process as simple and non-exhaustive as possible. The book is Tutorial, not reference, and is located differently from the official wiki. Readers are requested to look at Arch Wiki or other relevant information. It's certainly right to know why, but filling in too much is not what a tutorian should do.
  - The book is developed using docsify and gitalk and is open to all web-sources. This site does not use any harmful tracker scripts, and downloads of documents provided do not perform any audit and surveillance.[Brave Browser](https://brave.com/zh/)Tracker detection and reading source code for testing validation.
  - Linux binary exchange:[Telegram Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://t.me/FSF_Ministry_of_Truth) ||| [Matrix Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://matrix.to/#/#ArchLinuxStudio:matrix.org)I don't know.

> **This book uses CC BY-NC-ND 4.0 protocol[[1]](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/68)I don't know. Welcome to Pull requests, but no commercial use or manipulation. Any downstream document is unauthorized and in breach of protocol.**

> Please do not provide feedback on issues related to this document from any group other than those mentioned above. It's going to be troubling and unpleasant for them.

## Why Linux?

In short, there are now three PC operating systems in the world, Windows, Linux and MacOS.

If you're a computer-related student or practitioner, you're highly advised to use Linux as your own day-to-day system. In the use of the Linux system, various aspects of computer knowledge can be accessed invisiblely, and in future work you will also have relevant advantages. MacOS in some respects (i.e. the difference between BSD and GNU/Linux aspects) is different from Linux operations, and because of its closed character, we do not recommend use. Windows has experienced extraordinary pain and problems in many programming environments. At the same time, Windows, like MacOS, is a closed-source system and strongly discourages the use of Windows for programming.

More importantly, GNU/Linux is an important product of the free software movement.[Free software movement](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BD%AF%E4%BB%B6%E8%BF%90%E5%8A%A8)The ultimate goal of rejecting proprietary software and promoting free software is to liberate everyone in the network world — every computer user. Everyone should have full control of the software being operated.[Free Software](https://www.gnu.org/philosophy/free-sw.zh-cn.html)There are four principles:

- Degree 0: The software must be freely run by the user, regardless of the purpose.
- Freedom 1: Users are free to learn and modify the software to help users complete their own calculations. As a prerequisite, users must have access to the source code of the software.
- Freedom 2: Users are free to distribute copies of the software, which can help.
- Freedom 3: Users are free to distribute modified copies of the software. This allows users to share improved software with the community as a whole for the benefit of others. As a prerequisite, users must have access to the source code of the software.

If you're just an ordinary user, you must have seen similar experiences of computers being loaded with hooligan software without your authorization. The proprietary software not only rapes users at various dimensions, but also contains unimaginable malicious functions. Important information, such as user data, privacy and so forth, can easily be collected and abused by large companies, a fact that is no longer contested by the public secrets of the industry. When specialized software has the same type of free software replacement, you are strongly advised to move to free software. The book will record proprietary and free software at the same time, because if proprietary software is completely rejected, it will stop many people directly from linux. This is not what we want. We want more people to be admitted to GNU/Linux, at least as a first step. But that does not mean that we support the use of proprietary software, and we hope that at least you can step into the Linux and gradually replace proprietary software with free software. The proprietary software is only summary in this book and will not be described in detail because we do not want you to rely on it for a long time. As long as some proprietary software has good enough free software alternatives, we'll remove the proprietary software from the curriculum. The proprietary software will be marked in this book.<sup>Monochrome</sup>or describe additional tags. If you're a capable developer, I'd rather you develop free software to replace some proprietary software.

Finally, Linux is an experience you can't miss if you want to try a system that's completely free, or if you like to explore things that are fresh and challenging.

## Why Arch Linux?

Most importantly, Arch Linux's software package is up to date, which is necessary for daily use, so you can enjoy the features of the new software in the first place without worrying about the old dependence on upgrades. The package it provides will make it easy for you to install rather than compile. In addition, the user warehouse AUR, driven by Arch Linux users around the world, provides a large amount of unofficial software for choice. Arch Linux has achieved an almost perfect balance between flexibility and ease.

Arch Linux can customize its system with super-high freedom, and it has the perfect system.[Documentation](https://wiki.archlinux.org/index.php/Main_page), so that most of the problems can be solved by viewing official documents. It is precisely because of the radical nature of its software update strategy that, if conditions permit, users are advised to update Arch Linux regularly. Failure to upgrade over a longer period of time may create problems (commonly known as`滚挂了`Although most of the problems can be remedied ex post, they are often updated. Meanwhile, watch Arch Linux.[NewsList](https://archlinux.org/news/)It will help you learn about the latest promotions.

## Support and donations

If this book helps you, please recommend to you that you have the friends you need, which is our greatest support!

We would be grateful if we could accept the donation of encrypted currency. With your support,ArchLinuxStudioCommunities will become more diverse and active.

- Donate with Monero: `43KJJZztPtBC7k8ZjJpuw7bThW1mUH6N947TeNxvsSHD7DywRN365WZ7qpSxVopSd7cg4PFjMuUewjfvATUtTKGQLMboU36`

<!-- windows是最好的Linux发行版？It's only a BORING joke. -->
