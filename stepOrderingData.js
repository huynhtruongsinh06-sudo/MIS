// Interactive Step Ordering Challenges Dataset
window.STEP_ORDERING_DATA = [
  {
    "id": "challenge-o2c-core",
    "title": "Challenge 1: Order-to-Cash (O2C) 7-Stage Core Cycle",
    "subtitle": "Order the high-level business stages of the Sales and Distribution cycle from start to finish.",
    "category": "Sales & Distribution",
    "difficulty": "Beginner",
    "correctOrder": [
      {
        "id": "o2c-1",
        "text": "Customer Inquiry & Quotation (Pre-Sales Non-binding & Binding Offers)",
        "stepNum": 1
      },
      {
        "id": "o2c-2",
        "text": "Sales Order Processing & Availability Check (ATP)",
        "stepNum": 2
      },
      {
        "id": "o2c-3",
        "text": "Credit Management Verification (FI-AR Credit Limit Check)",
        "stepNum": 3
      },
      {
        "id": "o2c-4",
        "text": "Delivery Processing (Picking, Packing & Shipping Staging)",
        "stepNum": 4
      },
      {
        "id": "o2c-5",
        "text": "Post Goods Issue (PGI - Legal Title Transfer & Inventory Reduction)",
        "stepNum": 5
      },
      {
        "id": "o2c-6",
        "text": "Billing & Invoicing (Customer Invoice & Accounts Receivable Posting)",
        "stepNum": 6
      },
      {
        "id": "o2c-7",
        "text": "Incoming Payment & Clearing (Settlement & Zero Customer Balance)",
        "stepNum": 7
      }
    ],
    "explanation": "The O2C cycle begins with pre-sales customer contacts (Inquiry/Quote), leads to confirmed Order and Credit verification, initiates warehouse Delivery Processing, legally transfers stock via Goods Issue (PGI), bills the customer, and concludes with Incoming Payment clearing."
  },
  {
    "id": "challenge-sd-14",
    "title": "Challenge 2: SD Case Study 14-Step Detailed Sequence",
    "subtitle": "Arrange the 14 actual hands-on steps executed in the SAP S/4HANA Sales Case Study.",
    "category": "Sales & Distribution",
    "difficulty": "Advanced",
    "correctOrder": [
      {
        "id": "sd-s1",
        "text": "Step 1: Create New Customer (Business Partner Master Data)",
        "stepNum": 1
      },
      {
        "id": "sd-s2",
        "text": "Step 2: Create Customer Request (Inquiry VA11)",
        "stepNum": 2
      },
      {
        "id": "sd-s3",
        "text": "Step 3: Create Customer Quotation (VA21 with 5% Discount)",
        "stepNum": 3
      },
      {
        "id": "sd-s4",
        "text": "Step 4: Create Sales Order Referencing Quotation (VA01)",
        "stepNum": 4
      },
      {
        "id": "sd-s5",
        "text": "Step 5: Check Stock Status (Initial Baseline MMBE)",
        "stepNum": 5
      },
      {
        "id": "sd-s6",
        "text": "Step 6: Track Sales Order (Future Supply Timeline)",
        "stepNum": 6
      },
      {
        "id": "sd-s7",
        "text": "Step 7: Start Delivery Process (Create Outbound Delivery VL01N)",
        "stepNum": 7
      },
      {
        "id": "sd-s8",
        "text": "Step 8: Track Sales Order (Fulfillment Stage Verification)",
        "stepNum": 8
      },
      {
        "id": "sd-s9",
        "text": "Step 9: Pick Materials and Post Goods Issue (VL02N / WL)",
        "stepNum": 9
      },
      {
        "id": "sd-s10",
        "text": "Step 10: Check Stock Status (Post-Goods Issue Deduction MMBE)",
        "stepNum": 10
      },
      {
        "id": "sd-s11",
        "text": "Step 11: Create Billing Document for Customer (VF01)",
        "stepNum": 11
      },
      {
        "id": "sd-s12",
        "text": "Step 12: Display Billing Document & Post Customer Invoice (VF03 / RV)",
        "stepNum": 12
      },
      {
        "id": "sd-s13",
        "text": "Step 13: Post Receipt of Customer Payment (F-28 / DZ Clearing)",
        "stepNum": 13
      },
      {
        "id": "sd-s14",
        "text": "Step 14: Review Document Flow & G/L Audit Trail (VA03)",
        "stepNum": 14
      }
    ],
    "explanation": "This sequence exactly tracks the 14 steps of the Global Bike SD case study. Each step builds logically upon predecessor document references, ending with complete document flow reconciliation."
  },
  {
    "id": "challenge-p2p-core",
    "title": "Challenge 3: Procure-to-Pay (P2P) 8-Stage Core Cycle",
    "subtitle": "Order the chronological procurement process from internal requirement to vendor cash outflow.",
    "category": "Materials Management",
    "difficulty": "Intermediate",
    "correctOrder": [
      {
        "id": "p2p-1",
        "text": "Purchase Requisition (Internal demand identified by warehouse or MRP)",
        "stepNum": 1
      },
      {
        "id": "p2p-2",
        "text": "Vendor Selection & Bidding (RFQs sent, quotations maintained & compared)",
        "stepNum": 2
      },
      {
        "id": "p2p-3",
        "text": "Purchase Order Creation (Legally binding commercial contract to vendor)",
        "stepNum": 3
      },
      {
        "id": "p2p-4",
        "text": "Notify Vendor (PO transmission via EDI, email, or print)",
        "stepNum": 4
      },
      {
        "id": "p2p-5",
        "text": "Vendor Shipment (Supplier prepares freight and dispatch)",
        "stepNum": 5
      },
      {
        "id": "p2p-6",
        "text": "Goods Receipt (Physical delivery, MIGO posting, inventory + GR/IR liability)",
        "stepNum": 6
      },
      {
        "id": "p2p-7",
        "text": "Invoice Verification (MIRO posting, 3-Way Match, GR/IR cleared, AP debt created)",
        "stepNum": 7
      },
      {
        "id": "p2p-8",
        "text": "Outgoing Payment to Vendor (F-53 bank wire, AP cleared, cash disbursed)",
        "stepNum": 8
      }
    ],
    "explanation": "Procurement starts internally with a Purchase Requisition, evaluates suppliers via RFQs, issues a legally binding PO, receives goods into inventory (crediting GR/IR), verifies the supplier invoice via 3-Way Match, and issues final payment."
  },
  {
    "id": "challenge-mm-milestones",
    "title": "Challenge 4: MM Case Study Major Milestones",
    "subtitle": "Arrange the critical lifecycle milestones of the 24-step Materials Management Case Study.",
    "category": "Materials Management",
    "difficulty": "Advanced",
    "correctOrder": [
      {
        "id": "mm-m1",
        "text": "Create Vendor Master (Mid-West Supply) and Trading Good Material (CHLK1###)",
        "stepNum": 1
      },
      {
        "id": "mm-m2",
        "text": "Create Purchase Requisition for 200 Chain Locks and Monitor MRP in MD04",
        "stepNum": 2
      },
      {
        "id": "mm-m3",
        "text": "Issue RFQs to 3 Vendors, Maintain Quotes, and Select Mid-West Supply in ME49",
        "stepNum": 3
      },
      {
        "id": "mm-m4",
        "text": "Create Standard Purchase Order 4500000088 Referencing Winning RFQ",
        "stepNum": 4
      },
      {
        "id": "mm-m5",
        "text": "Post Goods Receipt 1 (100 units into Quality Inspection) and Transfer to Unrestricted",
        "stepNum": 5
      },
      {
        "id": "mm-m6",
        "text": "Post First Supplier Invoice (MIRO 5105600287) with 3-Way Match Verification",
        "stepNum": 6
      },
      {
        "id": "mm-m7",
        "text": "Post Goods Receipt 2 (100 units direct to Unrestricted) and Second Invoice (5105600288)",
        "stepNum": 7
      },
      {
        "id": "mm-m8",
        "text": "Post Outgoing Payment (F-53 for $6,400.00) Settling Both Invoices and Verify Zero Balance",
        "stepNum": 8
      }
    ],
    "explanation": "These 8 milestones synthesize the 24-step MM case study from initial master data creation, competitive bidding, partial deliveries (with quality inspection vs direct release), double invoice verification, through full outgoing payment settlement."
  },
  {
    "id": "challenge-threeway-match",
    "title": "Challenge 5: 3-Way Match & GR/IR Clearing Flow",
    "subtitle": "Order the accounting ledger and document verification sequence during purchasing.",
    "category": "Financial Integration",
    "difficulty": "Intermediate",
    "correctOrder": [
      {
        "id": "match-1",
        "text": "Purchase Order Created: Price & Quantity established ($32/ea, 100 ea = $3,200). No accounting entry.",
        "stepNum": 1
      },
      {
        "id": "match-2",
        "text": "Goods Receipt Posted: Debit Inventory $3,200 | Credit GR/IR Clearing Account (9100000) $3,200.",
        "stepNum": 2
      },
      {
        "id": "match-3",
        "text": "Invoice Verification (MIRO): System compares PO price vs GR quantity vs Invoice amount.",
        "stepNum": 3
      },
      {
        "id": "match-4",
        "text": "Invoice Posted: Debit GR/IR Clearing Account (9100000) $3,200 | Credit Accounts Payable (3300000) $3,200.",
        "stepNum": 4
      },
      {
        "id": "match-5",
        "text": "Suspense Cleared: GR/IR Account balance returns to exactly $0.00.",
        "stepNum": 5
      },
      {
        "id": "match-6",
        "text": "Outgoing Payment Posted: Debit Accounts Payable (3300000) $3,200 | Credit Bank (1810000) $3,200.",
        "stepNum": 6
      }
    ],
    "explanation": "The 3-Way match balances the temporary liability created at Goods Receipt (GR/IR) against the final supplier invoice, before discharging the debt through cash disbursement from the bank account."
  }
];
