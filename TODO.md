## Visit Reservation System - Implementation Steps

**Status: In Progress**

### Step 1: [✅ COMPLETE] Create lib/visits.ts

- Add getPropertyVisits(propertyId: string)
- Add createVisit(visitData)
- Add uploadIdCard(file) to Supabase storage

### Step 2: [✅ COMPLETE] Create app/reserve/page.tsx

- Form with prefilled property
- Calendar for date
- File upload for ID card
- Submit → upload → insert visit → redirect /account

### Step 3: [✅ COMPLETE] Update app/properties/page.tsx

- "Réserver une visite" → Link to /reserve?id=${id}
- Add "Visites" button → modal with visit list

### Step 4: [PENDING] Update app/property/[id]/page.tsx

- Add "Réserver une visite" button
- Add "Visites" button/modal

### Step 5: [PENDING] Test & Cleanup

- pnpm dev
- Test flow, Supabase inserts

**Next Step:** Step 3
