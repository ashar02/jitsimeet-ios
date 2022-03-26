#!/usr/bin/env bash

rm -rf ~/Library/Developer/Xcode/DerivedData/*
mkdir -p ios/sdk/out
xcodebuild clean \
    -workspace ios/jitsi-meet.xcworkspace \
    -scheme JitsiMeetSDK
xcodebuild archive \
    -workspace ios/jitsi-meet.xcworkspace \
    -scheme JitsiMeetSDK  \
    -configuration Release \
    -sdk iphonesimulator \
    -destination='generic/platform=iOS Simulator' \
    -archivePath ios/sdk/out/ios-simulator \
    VALID_ARCHS=x86_64 \
    ENABLE_BITCODE=NO \
    SKIP_INSTALL=NO \
    BUILD_LIBRARY_FOR_DISTRIBUTION=YES
xcodebuild archive \
    -workspace ios/jitsi-meet.xcworkspace \
    -scheme JitsiMeetSDK  \
    -configuration Release \
    -sdk iphoneos \
    -destination='generic/platform=iOS' \
    -archivePath ios/sdk/out/ios-device \
    VALID_ARCHS=arm64 \
    ENABLE_BITCODE=NO \
    SKIP_INSTALL=NO \
    BUILD_LIBRARY_FOR_DISTRIBUTION=YES
rm -rf ios/sdk/out/JitsiMeetSDK.xcframework
xcodebuild -create-xcframework \
    -framework ios/sdk/out/ios-device.xcarchive/Products/Library/Frameworks/JitsiMeetSDK.framework \
    -framework ios/sdk/out/ios-simulator.xcarchive/Products/Library/Frameworks/JitsiMeetSDK.framework \
    -output ios/sdk/out/JitsiMeetSDK.xcframework
rm -rf ios/sdk/out/WebRTC.xcframework
cp -a node_modules/react-native-webrtc/apple/WebRTC.xcframework ios/sdk/out

if [ -d ../jitsimeet-app/ios/Pods/JitsiMeetSDK/Frameworks ]; then
  echo "Copying to jitsimeet-app ..."
  rm -rf ../jitsimeet-app/ios/Pods/JitsiMeetSDK/Frameworks/WebRTC.xcframework
  rm -rf ../jitsimeet-app/ios/Pods/JitsiMeetSDK/Frameworks/JitsiMeetSDK.xcframework
  cp -a node_modules/react-native-webrtc/apple/WebRTC.xcframework ../jitsimeet-app/ios/Pods/JitsiMeetSDK/Frameworks/
  cp -a ios/sdk/out/JitsiMeetSDK.xcframework ../jitsimeet-app/ios/Pods/JitsiMeetSDK/Frameworks/
fi

if [ -d ../CircleIt/ios/Pods/JitsiMeetSDK/Frameworks ]; then
  echo "Copying to CircleIt ..."
  rm -rf ../CircleIt/ios/Pods/JitsiMeetSDK/Frameworks/WebRTC.xcframework
  rm -rf ../CircleIt/ios/Pods/JitsiMeetSDK/Frameworks/JitsiMeetSDK.xcframework
  cp -a node_modules/react-native-webrtc/apple/WebRTC.xcframework ../CircleIt/ios/Pods/JitsiMeetSDK/Frameworks/
  cp -a ios/sdk/out/JitsiMeetSDK.xcframework ../CircleIt/ios/Pods/JitsiMeetSDK/Frameworks/
fi