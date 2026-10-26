# 🎓 MIS & SAP S/4HANA Master Study Platform (Zero to A+)
### 🏛️ VNU-HCM International University (HCMIU) &bull; School of Industrial Engineering & Management (IEM)
**Course Code:** `IS091IU` &bull; **Subject:** Management Information Systems with ERP Application  
**Curriculum Basis:** Global Bike Inc. (GBI), SAP S/4HANA 2023, Fiori 3.0, and TA Midterm Review Curriculum

---

## 🚀 Live Access & How to Run

You can open the web application immediately in **any modern web browser** (Chrome, Edge, Brave, Safari, Firefox):

### Option 1: Direct File Launch (No setup required)
Double-click or open in your browser:
```text
C:\Users\Dell\.gemini\antigravity\scratch\mis-sap-study-app\index.html
```

### Option 2: Local HTTP Server (Recommended)
Open PowerShell or Terminal and run:
```powershell
python -m http.server 8080 --directory "C:\Users\Dell\.gemini\antigravity\scratch\mis-sap-study-app"
```
Then navigate to: **`http://localhost:8080`**

---

## 🌟 Architecture & Core Features

### 1. 🗺️ Zero-to-A+ Progressive Learning Roadmap
Structured systematically from zero foundational knowledge to exam honors:
- **Level 1: Foundations of MIS & Information Systems** (MIS vs ERP vs SAP, 5-Component Framework, Moore's Law, Robert Reich's 4 Non-routine Cognitive Skills, Information Silos).
- **Level 2: Strategic Advantage, Porter's Models & Value Chain** (Porter's Five Forces with exam corporate cases, Porter's 4 Competitive Strategies Matrix, Primary vs. Support Value Chain activities).
- **Level 3: Global Bike Inc. (GBI) Enterprise Model** (John Davis & Peter Schwarz merger, Dallas & Heidelberg dual operations, US GAAP & IFRS accounting standards, prior weaknesses vs expected benefits).
- **Level 4: Materials Management (MM) & Procure-to-Pay (P2P)** (Client/Company Code/Plant hierarchy, Vendor FLVN00/FLVN01, Material Types HAWA/ROH/FERT, P2P 8 stages, 3-Way Match, GR/IR Clearing 9100000).
- **Level 5: Sales & Distribution (SD) & Order-to-Cash (O2C)** (Sales Area triad: Sales Org + Dist Channel + Division, Customer Master, 7-stage O2C cycle, Outbound Delivery vs Goods Issue, accounting entries).
- **Level 6: Financial Accounting (FI) Integration & Financial Statements** (Balance Sheet equation, Income Statement structure, Thao Company trial balance solution, AP vs AR matrix).

### 2. 📦 SD Case Study Guide (14 Steps &bull; Order-to-Cash)
Dedicated interactive study module covering every step executed for client **The Bike Zone ###**:
- **Step 1:** Create New Customer (BP Master Data)
- **Step 2:** Create Customer Request (Inquiry VA11)
- **Step 3:** Create Customer Quotation (VA21 with 5% Discount)
- **Step 4:** Create Sales Order Referencing Quotation (VA01)
- **Step 5:** Check Stock Status (Initial Baseline MMBE)
- **Step 6:** Track Sales Order (Future Supply Timeline)
- **Step 7:** Start Delivery Process (Create Outbound Delivery VL01N)
- **Step 8:** Track Sales Order (Fulfillment Stage Verification)
- **Step 9:** Pick Materials and Post Goods Issue (VL02N / WL) &rarr; *Includes COGS Debit & Inventory Credit T-Accounts*
- **Step 10:** Check Stock Status (Post-Goods Issue Deduction)
- **Step 11:** Create Billing Document for Customer (VF01)
- **Step 12:** Display Billing Document & Post Customer Invoice (VF03 / RV) &rarr; *Includes AR Debit & Revenue Credit T-Accounts*
- **Step 13:** Post Receipt of Customer Payment (F-28 / DZ Clearing) &rarr; *Includes Bank Debit & AR Credit T-Accounts*
- **Step 14:** Review Document Flow & G/L Audit Trail (VA03)

### 3. 🏭 MM Case Study Guide (24 Steps &bull; Procure-to-Pay)
Dedicated interactive study module covering all 24 procurement steps for supplier **Mid-West Supply ###** and trading good **CHLK1###**:
- Steps 1-3: Vendor Master & Trading Good HAWA creation & extension
- Steps 4-6: Stock display, Purchase Requisition (ME51N), and MRP monitoring (MD04)
- Steps 7-9: Competitive RFQ issuance (ME41), quote maintenance (ME47), and bid evaluation (ME49)
- Steps 10-11: Standard Purchase Order 4500000088 creation and inspection
- Steps 12-14: Goods Receipt 1 (into Quality Inspection) & Transfer Posting 321 to Unrestricted Use
- Steps 15-17: Supplier Invoice 1 (MIRO) with automated 3-Way Match & PO History check
- Steps 18-20: Goods Receipt 2 (direct to Unrestricted Use) & Supplier Invoice 2
- Steps 21-22: Outgoing Payment (F-53 for $6,400.00) & Vendor T-Account clearing verification
- Steps 23-24: Final PO History audit and General Ledger balance sheet reconciliation (1110000, 9100000, 3300000, 1810000)

### 4. ⚖️ FI Module & Financial Statements Simulator
- Interactive Balance Sheet & Income Statement calculation checks
- Thao Company trial balance step-by-step verification
- 12 sequential steps of the FI-AP Case Study (Cardinal Properties 130)

### 5. 📇 Active Recall Flashcards (66 Curated Cards)
- 5 categorized decks with 3D card flip animation:
  1. MIS Theory & Strategy (12 cards)
  2. MM & Procure-to-Pay (15 cards)
  3. SD & Order-to-Cash (15 cards)
  4. FI & ERP Accounting (12 cards)
  5. SAP T-Codes, Document Types & Fiori Apps (12 cards)
- Features: Shuffle, Next/Prev navigation, progress tracker.

### 6. 🔀 Step Ordering Practice Engine
- 5 interactive sequencing challenges:
  1. O2C 7-Stage Core Cycle
  2. SD Case Study 14-Step Detailed Sequence
  3. P2P 8-Stage Core Cycle
  4. MM Case Study 8 Major Milestones
  5. 3-Way Match & GR/IR Clearing Flow
- Interactive Up/Down position shifting, instant verification, and business logic explanations.

### 7. 📝 Midterm Mock Exam Simulation (45 Real Course Questions)
- 45 genuine midterm exam questions extracted from the course exam review and TA slide decks
- 4 multiple choice options per question
- Real-time 45-minute countdown timer
- Interactive Question Navigator (1..45 grid showing answered/unanswered states)
- Instant scoring, percentage calculation, and Letter Grade certification (A+, A, B, C, F)
- Comprehensive explanations for every question and option.

### 8. 🆔 Dynamic Student Number (`###`) Live Replacer
- Input your individual student number (e.g., `180` or `042`) in the top bar.
- Every partner name (`The Bike Zone ###`, `Mid-West Supply ###`), material ID (`DXTR1###`, `CHLK1###`), and search term across the entire app updates in real time!
- Persisted automatically via `localStorage`.

### 9. 🔊 Integrated Web Audio Sound Synthesizer
- Zero external MP3 downloads required—uses the Web Audio API to synthesize smooth click feedback, success chimes, card flip sounds, and celebratory victory fanfares.
