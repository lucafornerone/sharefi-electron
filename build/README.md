# Build: electron-packager for the different operating systems

## Purpose
This Node.js project allows you to create App's portable packages or installer files.


## Common prerequisites
* Node.js, if you have not, [download and install it](https://nodejs.org/en/download/); then install all required packages: `npm install`

* Angular, you can install it with: `npm install -g angular-cli`

# macOS

#### Prerequisites:
* Xcode
* [Python](https://www.python.org/downloads/mac-osx/)

#### Build options:
For macOS you can create a portable file (.app) or create the installer (.dmg), build scripts must be run from ./platforms/macos:

* Portable 64-bit, run:
`node build-darwin-portable-x64.js`

* Installer 64-bit, run:
`node build-darwin-installer-x64.js`

# Windows

#### Prerequisites:
* [Visual Studio](https://visualstudio.microsoft.com/), with "Desktop development with C++" workload
* [Python](https://www.python.org/downloads/windows/)
* [WixToolset](https://github.com/wixtoolset/wix3/releases), only for installer builds

#### Build options:
For Windows you can create a portable folder (with .exe, 64-bit or 32-bit) or create the installer (.msi, 64-bit or 32-bit), build scripts must be run from ./platforms/windows:

* Portable 64-bit, run:
`node build-windows-portable-x64.js`

* Portable 32-bit, run:
`node build-windows-portable-x86.js`

* Installer 64-bit, run:
`node build-windows-installer-x64.js`

* Installer 32-bit, run:
`node build-windows-installer-x86.js`

# Linux

#### Prerequisites:
* [Python](https://www.python.org/downloads/source/)
* rpm-build, only for .rpm, you can install it with: `dnf install rpm-build`
* [snapcraft](https://snapcraft.io/docs/installing-snapd) and [Multipass](https://multipass.run/), only for .snap

#### Dependencies:
* net-tools: [package](https://command-not-found.com/arp)

#### Build options:
For Linux you can create a installer for Debian-based distributions (.deb, 64-bit), a installer for Red Hat-based distributions (.rpm, 64-bit) or a Snap installer (.snap, 64-bit), build scripts must be run from ./platforms/linux:

* Debian-based Installer 64-bit, run:
`node build-debian-installer-x64.js`
* Red Hat-based Installer 64-bit, run:
`node build-redhat-installer-x64.js`
* Snap Installer 64-bit, run:
`node build-snap-installer-x64.js`

#### Uninstall:
Uninstallation differs depending on the distribution:

* Debian-based, run:
`sudo apt-get --purge remove sharefi-electron`
* Red Hat-based, run:
`rpm -qa | grep -i sharefi`,
then: `sudo rpm -e <package name>`
* Snap, run:
`sudo snap remove sharefi-electron`