#!/bin/bash

printf "......................\nresignAndPackage start\n\n"

# Name of your app.
APP="sharefi"
# Your Certificate name.
CERT="<keychain-certificate-name>"
# The path of your app to sign.
APP_PATH="<path-to-project>/release/mas/sharefi-mas-x64/$APP.app"
# The path to the location you want to put the signed package.
RESULT_PATH="<path-to-project>/release/mas/sharefi-mas-x64/$APP-mac_store.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: $CERT"
INSTALLER_KEY="3rd Party Mac Developer Installer: $CERT"
# The path of your plist files.
PARENT_PLIST="<path-to-project>/build/platforms/macos/mas/entitlements.mas.plist"
CHILD_PLIST="<path-to-project>/build/platforms/macos/mas/entitlements.mas.inherit.plist"
LOGINHELPER_PLIST="<path-to-project>/build/platforms/macos/mas/entitlements.mas.loginhelper.plist"
FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (GPU).app/Contents/MacOS/$APP Helper (GPU)"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (GPU).app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (Plugin).app/Contents/MacOS/$APP Helper (Plugin)"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (Plugin).app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (Renderer).app/Contents/MacOS/$APP Helper (Renderer)"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper (Renderer).app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"

printf "\nresignAndPackage end\n......................\n"