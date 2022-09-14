# Arch Linux Installation and Usage Tutorial - ArchTutorial - Arch Linux Studio <!-- {docsify-ignore-all} -->

> Notice: English translation is still in progress, documentation is now incomplete. Welcome to submit pull requests for translations.

Arch Linux installation and usage tutorials, updated daily in real time! From Arch Linux installation, breaking through internet censorship and blockades, transparent proxies, graphics drivers, everyday software use and more, plus everything you might need for media production, programming, crypto currency usage in ArchLinux and more. Make Arch Linux your go-to system!

This book provides some of our experience of using Linux over the years and teaches it to those who need it. Another part that is inseparable from Linux: [GNU](https://www.gnu.org/home.zh-cn.html).

New readers should make sure that you have followed the steps in the `Start from Scratch` chapter before reading on, otherwise there may be problems.

- Features of this book
  - The privacy and security of our readers is always our top priority, and using free software can provide you with a considerable amount of protection. People or organisations who challenge the free software movement on the basis of so-called "practicality" or "avoiding ideological controversy" are foolish and evil.
  - This book provides a robust and reliable process for breaking out of blocked and censored areas of the Internet, and we regret if anyone considers it "inharmonious".
  - The style of this book is kept as simple as possible to improve the loading speed of the reader's website. At the same time, we believe that fancy styling should not be present in a more serious book.
  - No nonsense, just a set of directions **we think** is more appropriate, keeping the installation process as simple as possible and not exhaustive. This book is a tutorial, not a reference, and is not the same as the official wiki. For more information, please check the Arch Wiki or consult the related materials. It is right to know what you know, but it is not a tutorial work to fill in too much information.
  - The book is developed using docsify and gitalk, and the source code of the site is fully open source, so feel free to leave comments and discuss. The site also does not use any harmful tracker scripts and the files provided for download are not audited or monitored in any way, you can verify this by using the [Brave browser](https://brave.com/zh/) and reading the source code.
  - Linux and ACG [Telegram Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://t.me/FSF_Ministry_of_Truth) ||| [Matrix Group:ArchLinuxStudio🇨🇦🏳️‍⚧️🏳️‍🌈](https://matrix.to/#/#ArchLinuxStudio:matrix.org)

> **This book is available under the CC BY-NC-ND 4.0 license[[1]](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/68). Pull requests are welcome, but commercial use and interpretation is prohibited. Any "downstream documentation" is unauthorised and in breach of the license.**

> Please do not give feedback about this document in any groups other than those listed above. This will cause them distress and unpleasantness.

## Why use Linux?

To put it simply, there are three popular PC operating systems in the world today, Windows, Linux and macOS.

If you are a student or practitioner of a computer-related subject, it is highly recommended that you use Linux as your daily system. Using Linux will give you invisible exposure to all aspects of computing and will give you an advantage in your future career. macOS does not operate in the same way as Linux in some respects (i.e. roughly the differences between BSD and GNU/Linux) and is not recommended due to its closed nature. Windows is extremely painful and problematic to set up in many programming environments and is strongly discouraged for the same reason of macOS.

More importantly, GNU/Linux is a relevant and important product of the free software movement. The [free software movement](https://en.wikipedia.org/wiki/Free_software_movement) rejects proprietary software and promotes free software, Its ultimate goal is to free everyone in the networked world - every computer user. Everyone should have full control over the software they run. [Free Software](https://www.gnu.org/philosophy/free-sw.en.html) has four principles.

- The freedom to run the program as you wish, for any purpose (freedom 0).
- The freedom to study how the program works, and change it so it does your computing as you wish (freedom 1). Access to the source code is a precondition for this.
- The freedom to redistribute copies so you can help others (freedom 2).
- The freedom to distribute copies of your modified versions to others (freedom 3). By doing this you can give the whole community a chance to benefit from your changes. Access to the source code is a precondition for this.

If you are just an ordinary user, you have seen similar experiences of having your computer loaded with reams of rogue software without your authorisation. Proprietary software not only rapes the user in every dimension, but also contains unimaginable malicious features. It is an open secret in the industry that user data, privacy and other important information can be easily collected and misused by large companies. It is highly recommended that you migrate to free software when proprietary software has a suitable free software alternative. This book will document both proprietary software and free software, because to abandon proprietary software altogether would surely keep a lot of people out of linux directly, which is not what we want, and we want to bring more people into GNU/Linux first, at least as a first step. But this does not mean that we support the use of proprietary software, we want you to at least get started with linux and gradually replace proprietary software with free software. Proprietary software is only briefly documented in this book, not described in detail, because we don't want you to be dependent on it for a long time. We will remove proprietary software from this tutorial whenever a sufficiently good free software alternative becomes available for that proprietary software. Proprietary software will be corner marked <sup>proprietary</sup> or described with additional marks throughout this book. If you are a competent developer, it is preferred that you develop free software that replaces some proprietary software.

Finally, if you want to try a completely free system, or if you like to explore new and challenging things, Linux is also an experience you can't miss.

## Why use Arch Linux?

Most importantly, Arch Linux packages are up-to-date, which is essential for everyday use, so you can be the first to enjoy the features of new software without the hassle of outdated dependencies when upgrading software. The binary packages are provided so that you can easily install and use them without having to compile them yourself. In addition, the user repository AUR is driven by Arch Linux users from all over the world and offers a huge selection of unofficial software.Arch Linux strikes an almost perfect balance between flexibility and ease of use.

Arch Linux allows you to customise your system with a high degree of freedom and has the most comprehensive [documentation](https://wiki.archlinux.org/index.php/Main_page), making it possible to solve most problems by checking the official documentation. Because of its aggressive software update policy, it is recommended that users update Arch Linux as often as possible. No update over a longer period of time can cause problems, and while most problems can be remedied afterwards by rescue, it is better to update frequently. Also, keeping an eye on the Arch Linux [news list](https://archlinux.org/news/) will help keep you up to date with the latest update notes.

## Support & Donations

If this book has been helpful to you, please recommend it to your friends who need it, this is the greatest support to us!

We would be very grateful if receive digital currency donations. With your support, the ArchLinuxStudio community will become even more enriched and active.

- Donate with Bitcoin: `1Lth3oca4WnMnTnwHBcDLkEqniA2pBxkeC`
- Donate with Ethereum: `0x5A218a8d570d9947f42e0a4916ece7a60A181c2d`
- Donate with Litecoin: `LdJXzaSzzrAxfKJdj5effRLcC7k1TbuXJ8`
- Donate with Monero: `43KJJZztPtBC7k8ZjJpuw7bThW1mUH6N947TeNxvsSHD7DywRN365WZ7qpSxVopSd7cg4PFjMuUewjfvATUtTKGQLMboU36`
