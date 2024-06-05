# Builds for the different operating systems

## Purpose
This Node.js project allows you to create App's portable packages or installer files.


## Common prerequisites
* Node.js v18.x, if you have not, [download and install it](https://nodejs.org/en/download/); then install all required packages: `npm install`

* Angular, you can install it with: `npm install -g angular-cli`

# macOS

#### Prerequisites:
* Xcode

#### Portable prerequisites:
* Set apple id, password and team id in `/build/package.json` on `build:darwin-portable-x64` script

#### MAS prerequisites:
* Set app bundle id and build version in `/build/package.json` on `build:darwin-mas` script
* Set provisioning profile and team id in `/build/scripts/darwin/sign.js`
* Set team id and project path in `/build/scripts/darwin/resign-package.sh`
* Set team id and app bundle id in `/build/platforms/macos/mas/entitlements.mas.plist`

#### Build options:
For macOS you can create a portable file (.app), create the installer (.dmg) or MAS installer (.pkg), build scripts must be run from ./platforms/macos:

* Portable 64-bit, run:
`node build-darwin-portable-x64.js`

* Installer 64-bit, run:
`node build-darwin-installer-x64.js`

* Mac App Store, run:
`node build-darwin-mas.js`

# Windows

#### Prerequisites:
* [Visual Studio](https://visualstudio.microsoft.com/), with "Desktop development with C++" workload
* [Python](https://www.python.org/downloads/windows/)
* [WixToolset](https://github.com/wixtoolset/wix3/releases), add `C:\Program Files (x86)\WiX Toolset v3.x\bin` to Path in Environment Variables, System variables - only for installer builds
#### Store prerequisites:
* Run `npm install -g electron-windows-store`
* From PowerShell run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`
* Set Identity Name, Identity Publisher and Version in `/resources/windows-store-manifest.xml`

#### Build options:
For Windows you can create a portable folder (with .exe, 64-bit or 32-bit), create the installer (.msi, 64-bit or 32-bit) or create an .appx for Microsoft Store, build scripts must be run from ./platforms/windows:

* Portable 64-bit, run:
`node build-windows-portable-x64.js`

* Portable 32-bit, run:
`node build-windows-portable-x86.js`

* Installer 64-bit, run:
`node build-windows-installer-x64.js`

* Installer 32-bit, run:
`node build-windows-installer-x86.js`

* Microsoft Store, run:
`node build-windows-store-x64.js`

# Linux

#### Prerequisites:
* [Python](https://www.python.org/downloads/source/)
* rpm-build (`dnf install rpm-build`) - only for .rpm
* [Multipass](https://multipass.run/), [snapcraft](https://snapcraft.io/snapcraft) (channel 7.x/stable) and electron-builder (run `npm install -g electron-builder`) - only for .snap

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