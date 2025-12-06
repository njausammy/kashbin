# Kash Chain - Crypto Wallet App 💰

A mobile crypto wallet application built with Expo and React Native. Send USDT, cash in/out with M-Pesa, and pay at crypto-accepting merchants.

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
    yarn start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

- ✅ Phone + PIN authentication
- ✅ USDT wallet with balance tracking
- ✅ Send/Receive USDT
- ✅ Merchant payments
- ✅ Transaction history
- 🚧 KYC verification (in progress)
- 🚧 M-Pesa integration (planned)

## Documentation

- See `CURRENT_STRUCTURE.md` for current app architecture
- See `PHASE1_COMPLETE.md` for Phase 1 implementation details
- See `CLAUDE.md` for repository guidelines
- See `_archive/README.md` for archived features

## Build && Deployment
- eas build --platform android

- app:bundleRelease - This command generates an Android App Bundle (.aab) file, which is the recommended format for publishing apps on the Google Play Store.

- app:assembleRelease - This command generates a standard Android Package (.apk) file, which can be used for manual installation or publishing on alternative app stores.


[Android](https://expo.dev/artifacts/eas/cEV6icJQotpyzMD8SRvv97.apk)
[Backup](https://expo.dev/artifacts/eas/eQpwU6qmXgzdeuKCX6gjL8.apk)
