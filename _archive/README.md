# Archive - Original Niyaleo Features

This archive contains the original Niyaleo social/points/shopping features that were replaced during the fintech conversion to a crypto wallet app.

## Archive Date
December 5, 2025

## Reason for Archive
The app was converted from a social shopping/points platform to a crypto fintech wallet application. These features are no longer part of the core product but are preserved for reference.

---

## What's Archived

### 1. **niyaleo-original/contacts/**
Original social features for managing contacts, invites, referrals, and connections.

**Files moved:**
- `app/main/home/contacts/` (all screens)
- `src/components/home/contacts/` (all components)

**Features:**
- Contact management
- Referral system
- Invite system
- Connected users view
- Share points with contacts

---

### 2. **niyaleo-original/points/**
Original points transfer, redemption, and request system.

**Files moved:**
- `app/points/` (all screens)
- `src/components/points/` (all components)
- `src/components/home/points/` (deals, gifts, coupons, offers)

**Features:**
- Points transfer between users
- Redeem points at shops
- Enter redemption codes
- Request points
- View deals, gifts, coupons, offers

---

### 3. **niyaleo-original/shops/**
Original shop browsing and service discovery features.

**Files moved:**
- `src/components/home/shops/` (all components)

**Features:**
- Browse shops
- View shop details
- Service discovery
- Shop modals

**Note:** The `app/main/merchants/` screen was kept and converted to crypto merchant payments.

---

### 4. **niyaleo-original/cart/**
Original shopping cart system.

**Files moved:**
- `app/main/cart/` (all screens)

**Features:**
- Shopping cart
- Cart management

---

### 5. **niyaleo-original/services/**
Original services tab and discovery.

**Files moved:**
- `app/main/services/` (all screens)

**Features:**
- Service listings
- Service discovery

---

### 6. **niyaleo-original/icons/**
Icon components related to archived features.

**Files moved:**
- `cart.tsx`
- `coins.tsx`
- `coupons.tsx`
- `deals.tsx`
- `gifts.tsx`
- `invites.tsx`
- `points-solid.tsx`
- `points.tsx`
- `referrals.tsx`
- `services.tsx`

---

## What Was NOT Archived (Kept & Converted)

### ✅ Core Infrastructure (Kept)
- API client (`src/api/`)
- Authentication system (`src/api/authentication.ts`)
- Form components (`src/components/form/`)
- Utility functions (`src/utils/`)
- Hooks (`src/hooks/`)

### ✅ Converted to Fintech Features
- `app/main/home/` → Wallet dashboard
- `app/main/merchants/` → Crypto-accepting merchants (converted from shops)
- `app/main/profile/` → User profile (updated with KYC, wallet settings)

### ✅ New Fintech Features (Phase 1)
- `app/main/send/` - Send USDT
- `app/main/receive/` - Receive USDT
- `src/components/wallet/` - Wallet components (BalanceCard, TransactionList)
- New icons: `wallet.tsx`, `send.tsx`, `receive.tsx`, `merchant.tsx`

---

## Navigation Changes

### Before (5 tabs):
1. Home
2. Messages
3. Profile
4. Cart
5. Services

### After Cleanup (3 tabs):
1. Home (Wallet)
2. Merchants
3. Profile

### Future (5 tabs):
Will add back Send and Receive as dedicated tabs.

---

## Restoration Instructions

If any of these features need to be restored:

1. Copy the relevant folder from `_archive/niyaleo-original/` back to its original location
2. Restore the corresponding icon components from `_archive/niyaleo-original/icons/`
3. Update `app/main/_layout.tsx` to add the tab navigation
4. Check for API endpoint changes in `src/api/api.ts`
5. Test the restored feature thoroughly

---

## Related Documentation

- `PHASE1_COMPLETE.md` - Documents the fintech conversion (Phase 1)
- `CURRENT_STRUCTURE.md` - Current clean file structure after this cleanup
- `CLAUDE.md` - Repository overview and guidelines

---

**Archived by:** Claude Code - Cleanup & Foundation Phase
**Approved by:** User request for clean foundation before KYC implementation
