# Programming

What many people don't know is that Linux is almost the most suitable operating system for programming, and its programming support for all directions is in place (except Microsoft and Apple's proprietary system programming), which can save you a lot of pain. This article introduces high-quality software introductions in various programming directions. We recommend that readers use free software for programming, and only free software is listed in this section.

## Front-end programming

For the front end, a browser and IDE (or editor) are generally required, with some network tools attached.

For IDE (or editor), you can use [OSS code](https://www.archlinux.org/packages/community/x86_64/code/), which is an open source build generated from the official repository. [vscodium-bin](https://aur.archlinux.org/packages/vscodium-bin/)<sup>AUR</sup> is a community driven version of vs code.

> Binary builds of Microsoft Visual Studio Code are actually proprietary software. Many people have misunderstandings here. Such tricks are increasingly being explored and used by more companies. [[1]](https://carlchenet.com/you-think-the-visual-studio-code-binary-you-use-is-a-free-software-think-again/)

On the browser side there are [firefox](https://archlinux.org/packages/extra/x86_64/firefox/), [chromium](https://archlinux.org/packages/extra/x86_64/chromium/), [firefox -developer-edition](https://www.archlinux.org/packages/community/x86_64/firefox-developer-edition/), [brave](https://aur.archlinux.org/packages/brave-dev-bin/)<sup>AUR</sup> and many other software to choose from.

Network tools often use [httptoolkit](https://aur.archlinux.org/packages/httptoolkit/)<sup>AUR</sup> (as a replacement for charles), and [wireshark-qt](https://archlinux.org/packages/community/x86_64/wireshark-qt/).

As for front-ends such as [yarn](https://www.archlinux.org/packages/community/any/yarn/), [npm](https://www.archlinux.org/packages/community/any/npm/) Common tools can also be installed with pacman.

## Back-end programming

Jetbrains' open source IDE can be found in the official archlinux repository, such as [IntelliJ Idea](https://www.archlinux.org/packages/community/x86_64/intellij-idea-community-edition/), [PyCharm](https://www.archlinux.org/packages/community/x86_64/pycharm-community-edition/), et al.
More traditional IDEs include [Netbeans](https://www.archlinux.org/packages/community/any/netbeans/) and eclipse, which has multiple versions and can be searched in the AUR.

There is no need to say much about the programming language itself, except that the C language and C++ are supported by the installed system, java, node, etc. can be easily installed.

In addition to the default installed gcc, you can also install clang and llvm for use

When it comes to database-related software, there are also a variety of options.

- [Mysql Workbench](https://www.archlinux.org/packages/community/x86_64/mysql-workbench/)
- [pgadmin4](https://www.archlinux.org/packages/community/x86_64/pgadmin4/)
- [dbeaver](https://www.archlinux.org/packages/community/x86_64/dbeaver/)
- [robo3t](https://aur.archlinux.org/packages/robo3t-bin/)<sup>AUR</sup>
- [RESP.app](https://aur.archlinux.org/packages/resp-app/)<sup>AUR</sup> (pre redis-desktop-manager)
- [rdm-bin](https://aur.archlinux.org/packages/rdm-bin/)<sup>AUR</sup> If there is a problem with the above compilation, use this bin version

For big data, packages such as [hadoop](https://aur.archlinux.org/packages/hadoop/)<sup>AUR</sup> can be installed. If the package has not been updated for a long time or the package does not exist, such as hbase and hive, you can only go to the official website to download and configure it yourself.

Regarding software testing, common software such as [junit](https://archlinux.org/packages/extra/any/junit/) can also be easily installed and used with your favorite IDE.

## Android client programming

At present, Android development has been unified to [Android Studio](https://aur.archlinux.org/packages/android-studio/)<sup>AUR</sup> for development. Of course traditional Eclipse can also be used. Common Android emulators can also use [Anbox](https://wiki.archlinux.org/title/Anbox#Installation) or [Waydriod](https://wiki.archlinux.org/title/Waydroid#Installation) .

## Desktop application programming

At present, the more popular desktop development is [electron](https://archlinux.org/packages/community/x86_64/electron/) and [Qt](https://archlinux.org/packages/extra/x86_64/qt6-base/) application. Electron can be developed directly with OSS Code, and Qt applications can be developed with [Qt Creator](https://www.archlinux.org/packages/extra/x86_64/qtcreator/).

## Machine Learning and Deep Learning

For programming in machine learning, the IDE can use the same software as in backend programming. Machine learning commonly used [jupyter-notebook](https://archlinux.org/packages/community/any/jupyter-notebook/) and required related libraries such as [numpy](https://archlinux.org/packages/extra/x86_64/python-numpy/), [sklearn](https://archlinux.org/packages/community/x86_64/python-scikit-learn/), [pandas](https://archlinux.org/packages/community/x86_64/python-pandas/), etc., can also be found in the source. Meanwhile, [tensorflow](https://archlinux.org/packages/community/x86_64/tensorflow/), [pytorch](https://archlinux.org/packages/?sort=&q=python-pytorch&maintainer=&flagged=) And deep learning related packages such as its related cuda support package can also be installed and used.

## Scientific Computing

[SageMath](https://www.sagemath.org/) (formerly Sage) is free, liberating mathematical software that supports research and teaching in algebra, geometry, number theory, cryptography, numerical computing, and related fields, and is available as Alternative to MATLAB. Both Sage's development model and Sage's own technology place a strong emphasis on openness, community, cooperation, and collaboration: we're building cars, not reinventing the wheel. The overall goal of Sagemath is to provide a viable, free, free alternative to the "4M" (i.e. Maple, Mathematica, Magma, and Matlab). SageMath rewrites the interface for most open source software/libraries in the field of scientific computing, and provides a python-compatible syntax, which can be said to be the culmination of open source mathematical software. At present, it can partially replace "4M".

[Arch Wiki](https://wiki.archlinux.org/title/SageMath) ||| [Chinese Tutorial and Documentation](https://www.osgeo.cn/sagemath/index.html)

## Reverse Engineering

The well-known [ghidra](https://archlinux.org/packages/community/x86_64/ghidra/) can be installed as an alternative to IDA. For more alternative options, please refer to [alternativeto](https://alternativeto.net/software/ida/). In addition, introduce a useful hex editor [Bless](https://archlinux.org/packages/community/any/bless/).
