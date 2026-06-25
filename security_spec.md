# Security Specification: Creation Interiors Firestore RBAC

In accordance with strict application security architectures, this specification defines the data invariants, adversarial payloads, and rules for the *Creation Interiors* database.

## 1. Core Data Invariants

1. **Authentication Boundary**: No anonymous operations. Users must be authenticated, and their email addresses must be validated (when email verification is required, `email_verified == true`).
2. **Product Catalogs (System-Controlled)**:
   - General buyers are allowed to `read` (get/list) products.
   - ONLY validated Admins (checked via `/admins/{userId}` existence) can write, update, or delete products.
3. **Purchasing & Orders**:
   - Customers can create orders but cannot set themselves as other users: the target `userId` inside the payload must match `request.auth.uid`.
   - Customers can read (`get` or `list`) their own order records (where `resource.data.userId == request.auth.uid`). No customer receives a blanket list of all store orders.
   - Admins can query and dispatch all orders.
   - Orders cannot be modified by users once posted (immutability of items, address, and cost details). Admins can update the `status` field.
4. **User Profiles**:
   - A user profile can only be written by the owner, where document ID matches `request.auth.uid`. No profile owner can self-assign `isAdmin` or other privileges.
5. **System admins**:
   - Stored in `/admins/{adminId}` and verified via `exists(/databases/$(database)/documents/admins/$(request.auth.uid))`.

---

## 2. The "Dirty Dozen" Payloads (Adversarial Targets)

The rules are engineered to deny these 12 malicious operations:

1. **Unauthenticated Read Attack**: Attempting to query `products` without login credentials.
2. **Catalog Highjacking (Create Product)**: Malicious client attempting to create a product.
3. **Catalog Theft (Delete Product)**: Malicious user trying to delete a sofa with regular credentials.
4. **Identity Spoofing (Order Injection)**: Authenticated user `UID_A` attempts to buy a bed with `userId = "UID_B"`.
5. **Blanket Order Scraping**: Regular user attempting to list ALL shop orders (`allow list` blanket request).
6. **Self-Appointed Administrator**: Client signs up and specifies `"isAdmin": true` inside `/users/{thisUserId}` profile to hijack managers console.
7. **Phantom Admin Escalation**: Attempting to write into `/admins/{myUserId}` directly.
8. **Negative Cost / Float Underflow**: Inserting an order with `totalPrice = -9999.0` to acquire a bill rebate.
9. **No-Address Hijacking**: Submitting an order without required telephone or address strings.
10. **Terminal State Locking Bypass**: Regular user attempts to modify an order's fulfillment status to "Delivered" unilaterally.
11. **Value Poisoning (Corrupt Types)**: Submitting a product addition with `price = "Fifty Thousand"` (String) to crash calculations on other client devices.
12. **Denial of Wallet Long-Name Injection**: Attempting to write a furniture name with size greater than 100 characters or containing malicious strings.

---

## 3. Test Runner Concept (`DRAFT_firestore.rules` validation)

All test cases are mapped to verify strict validation. Rules must catch missing payloads and size constraints immediately before conducting database evaluations.
