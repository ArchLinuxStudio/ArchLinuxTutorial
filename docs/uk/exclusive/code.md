<!-- AUTO-GENERATED: edit the corresponding Chinese document instead. -->

# Programming software

It is not clear to many that Linux is almost the most suitable operating system for programming, and that its programming support for all directions (except for Microsoft and Apple's proprietary system programming) can save you much pain. This paper presents a high-quality software presentation on programming directions. We suggest that readers use free software for programming, and this section only lists free software.

## Front-end programming

For the front end, a browser and an IDE (or editor) are generally needed, with some additional web tools.

For IDE (or editor), you can use[OSS code](https://archlinux.org/packages/extra/x86_64/code/), it is constructed from open sources generated from official warehouses.[vscodium-bin](https://aur.archlinux.org/packages/vscodium-bin/)<sup>AUR</sup>is a community-driven vs code version.

> Microsoft has a binary construction that is actually proprietary. There are many misunderstandings here. More and more companies are finding ways to steal the beams.[[1]](https://carlchenet.com/you-think-the-visual-studio-code-binary-you-use-is-a-free-software-think-again/)

In the browser.[firefox](https://archlinux.org/packages/extra/x86_64/firefox/)I don't know.[chromium](https://archlinux.org/packages/extra/x86_64/chromium/)I don't know.[firefox-developer-edition](https://archlinux.org/packages/extra/x86_64/firefox-developer-edition/)I don't know.[brave](https://aur.archlinux.org/packages/brave-dev-bin/)<sup>AUR</sup>Many software options are available.

Network tools are often used[httptoolkit](https://aur.archlinux.org/packages/httptoolkit/)<sup>AUR</sup>(in lieu of charles), and[wireshark-qt](https://archlinux.org/packages/extra/x86_64/wireshark-qt/)I don't know.

And...[yarn](https://archlinux.org/packages/extra/any/yarn/)I don't know.[npm](https://archlinux.org/packages/extra/any/npm/)When the front end is used, you can also install it with a pacman.

## Backend Programming

Open source IDE of Jetbrains can be found at archlinux official repository if[IntelliJ Idea](https://archlinux.org/packages/extra/x86_64/intellij-idea-community-edition/)I don't know.[PyCharm](https://archlinux.org/packages/extra/x86_64/pycharm-community-edition/)Wait.  
Unopen-sourced Jetbrains products can also be found in the AUR community, e.g.[rubymine](https://aur.archlinux.org/packages/rubymine)I don't know.[webstorm](https://aur.archlinux.org/packages/webstorm)I don't know. However, only installation but not unloading may be provided, e.g.[jetbrains-toolbox](https://aur.archlinux.org/packages/jetbrains-toolbox)

> The Jetbrains product input method under linux will cause the cursor not to follow, and Jetbrains has not repaired the bug and the solution is:[Replace jbr](https://github.com/RikudouPatrickstar/JetBrainsRuntime-for-Linux-x64)

More traditional IDE.[Netbeans](https://archlinux.org/packages/extra/any/netbeans/)and eclipse, eclipse has many versions that can be searched for in the AUR.

With regard to programming languages themselves, let alone, except for c language and c++, which are supported by installed systems, java, node, etc. can be easily installed.

Can install clang and llvm in addition to the default installed gcc

There are also various options for database-related software.

- [Mysql Workbench](https://archlinux.org/packages/extra/x86_64/mysql-workbench/)
- [pgadmin4](https://archlinux.org/packages/extra/x86_64/pgadmin4/)
- [dbeaver](https://archlinux.org/packages/extra/x86_64/dbeaver/)
- [robo3t](https://aur.archlinux.org/packages/robo3t-bin/)<sup>AUR</sup>
- [RESP.app](https://aur.archlinux.org/packages/resp-app/)<sup>AUR</sup>(old redis-desktop-manager)
- [rdm-bin](https://aur.archlinux.org/packages/rdm-bin/)<sup>AUR</sup>Use this bin version if there is a problem with the compilation.

Installable for big data[hadoop](https://aur.archlinux.org/packages/hadoop/)<sup>AUR</sup>Wait a bag. If the package has not been updated for a long time or the package does not exist, such as hbase and hive, it can only be downloaded and configured on the official web.

About software testing,[junit](https://archlinux.org/packages/extra/any/junit/)It'll be easy to install the usual software, to match your favorite IDE.

## Andre Client Programming

So far, Andre's development has been consolidated.[Android Studio](https://aur.archlinux.org/packages/android-studio/)<sup>AUR</sup>Development. Of course traditional Eclipse can also be used. The commonly used Andre emulator is also available.[Anbox](https://wiki.archlinux.org/title/Anbox#Installation)or[Waydriod](https://wiki.archlinux.org/title/Waydroid#Installation)I don't know.

## Desktop Application Programming

The current trend in desktop development is that[electron](https://archlinux.org/packages/extra/x86_64/electron/)and[Qt](https://archlinux.org/packages/extra/x86_64/qt6-base/)Apply. Electron can be developed directly with OSS Code, Qt application[Qt Creator](https://archlinux.org/packages/extra/x86_64/qtcreator/)Development.

## Machine and in-depth learning

For machine learning programming, IDE can use the same software as the back-end programming. Machine learning.[jupyter-notebook](https://archlinux.org/packages/extra/any/jupyter-notebook/)And the relevant libraries that are needed[numpy](https://archlinux.org/packages/extra/x86_64/python-numpy/)I don't know.[sklearn](https://archlinux.org/packages/extra/x86_64/python-scikit-learn/)I don't know.[pandas](https://archlinux.org/packages/extra/x86_64/python-pandas/)Wait, you can also find it in the source. In the meantime,[tensorflow](https://archlinux.org/packages/extra/x86_64/tensorflow/)I don't know.[pytorch](https://archlinux.org/packages/?sort=&q=python-pytorch&maintainer=&flagged=)In-depth learning-related packages, such as the associated cuda support packages, can also be installed.

## Scientific calculations

[SageMath](https://www.sagemath.org/)Free, free mathematical software (named Sage) that supports research and teaching in algebra, geometry, numerics, cipherics, numerical computations and related fields can be used as an alternative to MATLAB. Sage's development model and Sage's own technology place great emphasis on openness, community, cooperation and collaboration: we are making cars, not re-engineering wheels. The overall objective of Sagemath is to provide a viable, free and free alternative to "4M" (i.e. Maple, Mathematica, Magma and Matlab). SageMath provides a uniform rewrite interface for most open-source software/registers in the current field of scientific computing, providing a type-compatible python syntax that can be described as a major achievement of the integration of open-source mathematical software. There is now a partial replacement for "4M".

[Arch Wiki](https://wiki.archlinux.org/title/SageMath) ||| [Chinese tutorials and documents](https://www.osgeo.cn/sagemath/index.html)

## Reverse Project

Can install famous[ghidra](https://archlinux.org/packages/extra/x86_64/ghidra/)As an alternative to IDA, more alternative options are available[alternativeto](https://alternativeto.net/software/ida/)I don't know. Besides, introduce a good hexadecimal editor. Device[Bless](https://archlinux.org/packages/extra/any/bless/)I don't know.
