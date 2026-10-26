// MM Case Study 24-Step Detailed Dataset
window.MM_CASE_STUDY_STEPS = [
  {
    "step": 1,
    "title": "Create Vendor (Business Partner)",
    "role": "Joyce Hausman (Contract Manager)",
    "app": "Manage Business Partner Master Data",
    "tcode": "BP",
    "module": "MM / FI Master Data",
    "time": "20 min",
    "images": [
      "assets/img/mm_image19.png"
    ],
    "purpose": "Create a new supplier master record for Mid-West Supply ### with financial and procurement views.",
    "businessLogic": "In SAP S/4HANA, vendors are maintained via the universal Business Partner (BP) model. Two critical roles are activated: FI Vendor (FLVN00) for company code US00 (defining reconciliation account 3300000 and payment terms) and Purchasing Vendor (FLVN01) for purchasing organization US00 (order currency USD, Incoterms FOB).",
    "systemImpact": "Generates unique internal Vendor Master Number (e.g. 1003339). Creates integration between purchasing and Accounts Payable.",
    "inputs": [
      {
        "field": "Business Partner Role",
        "value": "FLVN00 (FI Vendor) & FLVN01 (Purchasing Vendor)"
      },
      {
        "field": "Name 1",
        "value": "Mid-West Supply ###"
      },
      {
        "field": "Search Term 1",
        "value": "###"
      },
      {
        "field": "City / Country",
        "value": "Atlanta / US"
      },
      {
        "field": "Reconciliation Account",
        "value": "3300000 (Accounts Payable)"
      },
      {
        "field": "Check Double Invoice",
        "value": "Activated (Flags duplicate invoices)"
      },
      {
        "field": "Purchasing Org / Currency",
        "value": "US00 / USD"
      }
    ],
    "expectedOutput": "Business Partner master created with ID 1003###.",
    "tAccount": null,
    "qa": {
      "question": "What does the 'Check Double Invoice' setting do in the Vendor Master?",
      "answer": "It activates an automated internal control check during invoice entry (MIRO). SAP compares supplier, reference number, invoice date, currency, and amount. If an identical invoice exists, the system warns or blocks posting, preventing paying the supplier twice."
    }
  },
  {
    "step": 2,
    "title": "Create Material (Trading Good HAWA)",
    "role": "Sandeep Die (Warehouse Supervisor)",
    "app": "Create Material / Manage Product Master Data",
    "tcode": "MM01",
    "module": "MM Master Data",
    "time": "20 min",
    "images": [
      "assets/img/mm_image26.png"
    ],
    "purpose": "Define the Material Master record for wholesale Chain Lock (CHLK1###) as a Trading Good (HAWA).",
    "businessLogic": "Materials in SAP are classified by Material Type. HAWA represents Trading Goods—materials procured externally and resold to customers without internal manufacturing or transformation. We configure Basic Data, Purchasing, General Plant, and Accounting views.",
    "systemImpact": "Creates material record CHLK1### in table MARA/MARC/MBEW. Assigns Base Unit of Measure (EA), Material Group, Valuation Class, and standard price.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Industry Sector",
        "value": "Mechanical Engineering (M)"
      },
      {
        "field": "Material Type",
        "value": "Trading Goods (HAWA)"
      },
      {
        "field": "Base Unit of Measure",
        "value": "EA (Each)"
      },
      {
        "field": "Material Group",
        "value": "AC (Accessories)"
      },
      {
        "field": "Plant / Storage Loc",
        "value": "MI00 / TG00 (Trading Goods)"
      }
    ],
    "expectedOutput": "Material CHLK1### created successfully.",
    "tAccount": null,
    "qa": {
      "question": "Differentiate between material types HAWA, ROH, and FERT.",
      "answer": "HAWA: Trading Goods (procured externally, resold without modification); ROH: Raw Materials (purchased externally, consumed in production); FERT: Finished Products (manufactured internally, sold to customers)."
    }
  },
  {
    "step": 3,
    "title": "Change Material (Extend Distribution Chain)",
    "role": "Sergey Petrov (Warehouse Employee)",
    "app": "Change Material",
    "tcode": "MM02",
    "module": "MM / SD Integration",
    "time": "5 min",
    "images": [
      "assets/img/mm_image34.png"
    ],
    "purpose": "Extend material CHLK1### to Sales Organization UE00 and Distribution Channel WH.",
    "businessLogic": "To allow chain locks to be sold or transferred across sales channels later, the sales views (Sales: Sales Org. 1 and 2) must be extended for the designated sales area.",
    "systemImpact": "Adds table MVKE entries for UE00/WH, configuring delivering plant MI00 and tax classifications.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Sales Org / Distr Channel",
        "value": "UE00 / WH"
      },
      {
        "field": "Delivering Plant",
        "value": "MI00"
      },
      {
        "field": "Tax Classification",
        "value": "1 (Taxable)"
      }
    ],
    "expectedOutput": "Material CHLK1### has been changed (extended to sales area).",
    "tAccount": null,
    "qa": {
      "question": "Why must a material be extended rather than created from scratch for each department?",
      "answer": "SAP's single master record architecture allows a material to share central basic data (description, weight) while department-specific views (sales, purchasing, plant accounting) are incrementally added without duplicating central records."
    }
  },
  {
    "step": 4,
    "title": "Display Stock (Pre-Procurement Baseline)",
    "role": "Wilton Saban (Inventory Supervisor)",
    "app": "Stock Overview",
    "tcode": "MMBE",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image8.png"
    ],
    "purpose": "Check baseline inventory balance for CHLK1### across all stock categories.",
    "businessLogic": "Validates that initial stock is either zero or at known opening levels before raising procurement requisitions.",
    "systemImpact": "Read-only inventory inquiry displaying 10 stock types.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Plant",
        "value": "MI00"
      }
    ],
    "expectedOutput": "Stock Overview indicates initial quantity (e.g. 400 units in Unrestricted-Use).",
    "tAccount": null,
    "qa": {
      "question": "What are the key stock categories displayed in SAP MMBE?",
      "answer": "1) Unrestricted-Use (immediately available for sale/use); 2) Quality Inspection (undergoing lab testing); 3) Blocked Stock (damaged/defective); 4) Stock in Transfer; 5) In-Transit (shipped between plants)."
    }
  },
  {
    "step": 5,
    "title": "Create Purchase Requisition",
    "role": "Wilton Saban (Inventory Supervisor)",
    "app": "Create Purchase Requisition",
    "tcode": "ME51N",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image33.png"
    ],
    "purpose": "Create internal purchase request for 200 Chain Locks (CHLK1###) needed at Plant MI00.",
    "businessLogic": "A Purchase Requisition (PR) is an internal document requesting the purchasing department to procure materials. It does not go to the vendor; it triggers sourcing activities.",
    "systemImpact": "Creates PR document (e.g. 0010000115) in table EBAN. No accounting or vendor commitments.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Quantity",
        "value": "200 EA"
      },
      {
        "field": "Delivery Date",
        "value": "10 days from today"
      },
      {
        "field": "Plant / Storage Loc",
        "value": "MI00 / TG00"
      },
      {
        "field": "Purchasing Group",
        "value": "N00 (North America)"
      }
    ],
    "expectedOutput": "Purchase Requisition number 00100001## created.",
    "tAccount": null,
    "qa": {
      "question": "Is a Purchase Requisition sent to an external vendor?",
      "answer": "No. A Purchase Requisition is strictly an internal request within the company to authorize the purchasing department to procure goods."
    }
  },
  {
    "step": 6,
    "title": "Manage Stock (Stock/Requirements List)",
    "role": "Alberto Conti (Inventory Assistant)",
    "app": "Monitor Stock / Requirements",
    "tcode": "MD04",
    "module": "MM / PP",
    "time": "5 min",
    "images": [
      "assets/img/mm_image30.png"
    ],
    "purpose": "Verify that Purchase Requisition 00100001## appears dynamically as a projected stock inflow in MRP.",
    "businessLogic": "MD04 provides real-time Material Requirements Planning (MRP) status, showing how planned orders, purchase requisitions, and sales orders affect future stock availability.",
    "systemImpact": "Live MRP calculation verifying projected stock increases by 200 units upon planned delivery.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Plant",
        "value": "MI00"
      }
    ],
    "expectedOutput": "MRP list shows PurRqs 00100001## with MRP element +200 EA.",
    "tAccount": null,
    "qa": {
      "question": "How does MD04 differ from MMBE in SAP?",
      "answer": "MMBE displays static physical on-hand stock at the present moment. MD04 displays a dynamic timeline integrating current stock with future demand (sales orders, reservations) and future supply (requisitions, purchase orders, production orders)."
    }
  },
  {
    "step": 7,
    "title": "Create Request for Quotation (RFQ)",
    "role": "Joyce Hausman (Purchasing Agent)",
    "app": "Create Request for Quotation",
    "tcode": "ME41",
    "module": "MM",
    "time": "15 min",
    "images": [
      "assets/img/mm_image6.jpg",
      "assets/img/mm_image18.jpg"
    ],
    "purpose": "Send competitive bidding RFQs referencing PR 00100001## to 3 potential suppliers.",
    "businessLogic": "To ensure best pricing and compliance with procurement policies, GBI solicits bids from three vendors: Mid-West Supply ###, Dallas Bike Basics, and Spy Gear. Each vendor receives an identical RFQ with a collective number for grouping.",
    "systemImpact": "Generates 3 RFQ documents (e.g. 7000000147, 7000000148, 7000000149) sharing collective search code ###.",
    "inputs": [
      {
        "field": "RFQ Type",
        "value": "AN (RFQ)"
      },
      {
        "field": "Quotation Deadline",
        "value": "5 days from today"
      },
      {
        "field": "Collective Number",
        "value": "###"
      },
      {
        "field": "Reference PR",
        "value": "00100001##"
      },
      {
        "field": "Vendors",
        "value": "Mid-West Supply ###, Dallas Bike Basics, Spy Gear"
      }
    ],
    "expectedOutput": "RFQs 700000014# created for all 3 vendors.",
    "tAccount": null,
    "qa": {
      "question": "What is the purpose of the 'Collective Number' in SAP RFQ creation?",
      "answer": "The Collective Number acts as a grouping tag that links multiple separate vendor RFQs together under a single bid evaluation project, allowing comparative price analysis in ME49."
    }
  },
  {
    "step": 8,
    "title": "Create Quotation from Vendor (Maintain Quotes)",
    "role": "Joyce Hausman (Purchaser)",
    "app": "Maintain Quotations",
    "tcode": "ME47",
    "module": "MM",
    "time": "10 min",
    "images": [
      "assets/img/mm_image27.jpg"
    ],
    "purpose": "Enter returned vendor price bids into SAP against each RFQ document.",
    "businessLogic": "Purchasing enters received vendor bids: Mid-West Supply bids $32.00/unit; Dallas Bike Basics bids $35.00/unit; Spy Gear bids $36.00/unit. Delivery dates and freight terms are logged.",
    "systemImpact": "Updates RFQ documents with net price and condition records.",
    "inputs": [
      {
        "field": "RFQ Number",
        "value": "700000014#"
      },
      {
        "field": "Net Price Mid-West Supply",
        "value": "32.00 USD / EA"
      },
      {
        "field": "Net Price Dallas Bike Basics",
        "value": "35.00 USD / EA"
      },
      {
        "field": "Net Price Spy Gear",
        "value": "36.00 USD / EA"
      }
    ],
    "expectedOutput": "Quotations maintained for all three suppliers.",
    "tAccount": null,
    "qa": {
      "question": "What status does an RFQ have once prices are entered in ME47?",
      "answer": "It becomes a completed Vendor Quotation, ready for comparative price analysis."
    }
  },
  {
    "step": 9,
    "title": "Price-Based Bid Evaluation",
    "role": "Joyce Hausman (Purchasing Manager)",
    "app": "Compare Price Quotations",
    "tcode": "ME49",
    "module": "MM",
    "time": "10 min",
    "images": [
      "assets/img/mm_image32.jpg",
      "assets/img/mm_image4.jpg"
    ],
    "purpose": "Perform automated bid comparison and select Mid-West Supply as winning vendor.",
    "businessLogic": "ME49 ranks vendor bids side-by-side by net price, payment terms, and delivery cost. Mid-West Supply is the lowest bidder at $32.00/unit (Rank 1). Rejection indicators are set for competing suppliers.",
    "systemImpact": "Evaluation matrix confirms Mid-West Supply 1003### as selected supplier. Sets rejection flags for other two vendors.",
    "inputs": [
      {
        "field": "Purchasing Org",
        "value": "US00"
      },
      {
        "field": "Collective Number",
        "value": "###"
      }
    ],
    "expectedOutput": "Comparison report identifies Mid-West Supply as Rank 1 (100% price score).",
    "tAccount": null,
    "qa": {
      "question": "How does SAP ME49 evaluate bids?",
      "answer": "It normalizes all quotes to a common currency and unit of measure, applies cash discount terms, and ranks bids from lowest effective cost (Rank 1) to highest."
    }
  },
  {
    "step": 10,
    "title": "Create Purchase Order Referencing an RFQ",
    "role": "Joyce Hausman (Purchasing Agent)",
    "app": "Manage Purchase Orders / Create PO",
    "tcode": "ME21N",
    "module": "MM",
    "time": "15 min",
    "images": [
      "assets/img/mm_image5.jpg"
    ],
    "purpose": "Issue legally binding Purchase Order 4500000088 to Mid-West Supply ### for 200 Chain Locks at $32.00/unit (Total USD 6,400.00).",
    "businessLogic": "A Purchase Order (PO) is the formal commercial contract sent to the supplier committing Global Bike to pay for delivered items. Referencing RFQ 7000000147 pulls all pricing, delivery terms, and specs automatically.",
    "systemImpact": "Generates Standard PO 4500000088 (document type NB). Updates PR status to 'Ordered'. Creates an external legal commitment, but NO financial accounting postings yet.",
    "inputs": [
      {
        "field": "Vendor",
        "value": "Mid-West Supply ### (1003###)"
      },
      {
        "field": "Reference RFQ",
        "value": "7000000147"
      },
      {
        "field": "Purchasing Org / Group",
        "value": "US00 / N00"
      },
      {
        "field": "Quantity / Net Price",
        "value": "200 EA @ 32.00 USD (Total: 6,400.00 USD)"
      }
    ],
    "expectedOutput": "Standard PO created under number 45000000##.",
    "tAccount": null,
    "qa": {
      "question": "Why is Step 10 (Create PO) considered of absolute criticality in Procure-to-Pay?",
      "answer": "Because the PO creates the formal legal and commercial commitment between Global Bike and the supplier, establishing binding pricing, delivery dates, and the benchmark for the 3-Way Match."
    }
  },
  {
    "step": 11,
    "title": "Display Purchase Order",
    "role": "Wilton Saban (Inventory Supervisor)",
    "app": "Display Purchase Order",
    "tcode": "ME23N",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image24.jpg"
    ],
    "purpose": "Inspect PO header, items, delivery schedules, and partner details.",
    "businessLogic": "Confirms purchase order structure before delivery: Header (Vendor, currency, org data), Item Overview (CHLK1###, 200 EA, $32.00), Item Detail (Plant MI00, Storage Loc TG00).",
    "systemImpact": "Read-only verification.",
    "inputs": [
      {
        "field": "PO Number",
        "value": "45000000##"
      }
    ],
    "expectedOutput": "PO displays active status with confirmed lines.",
    "tAccount": null,
    "qa": {
      "question": "What are the 3 structural areas of an SAP Purchase Order screen?",
      "answer": "1) Header (data applying to whole PO: supplier, currency, terms); 2) Item Overview (line items: material, qty, price, delivery date); 3) Item Detail (specific settings: account assignment, tolerances, invoice verification)."
    }
  },
  {
    "step": 12,
    "title": "Post Goods Receipt for Purchase Order (Delivery 1)",
    "role": "Tatiana Karsova (Goods Receipt Clerk)",
    "app": "Post Goods Receipt for Purchasing Document",
    "tcode": "MIGO",
    "module": "MM / FI",
    "time": "15 min",
    "images": [
      "assets/img/mm_image10.jpg"
    ],
    "purpose": "Receive partial shipment of 100 Chain Locks from Mid-West Supply into Quality Inspection stock.",
    "businessLogic": "When shipment arrives, the dock clerk inspects packing slips against PO 4500000088. The supplier delivers 100 units (partial delivery). Because this is a new vendor/material, system routes delivery into Quality Inspection stock. Posting MIGO increases stock and posts financial entries.",
    "systemImpact": "1) Material Document (type WE, e.g. 5000000168) posted in MM; 2) Financial Journal Entry posted in FI: Debits Inventory, Credits GR/IR Clearing Account (9100000) for $3,200.00.",
    "inputs": [
      {
        "field": "Movement Type",
        "value": "101 (Goods Receipt for PO)"
      },
      {
        "field": "Purchase Order",
        "value": "45000000##"
      },
      {
        "field": "Quantity Received",
        "value": "100 EA"
      },
      {
        "field": "Stock Type",
        "value": "Quality Inspection"
      },
      {
        "field": "Storage Location",
        "value": "TG00"
      }
    ],
    "expectedOutput": "Material Document 5000000168 posted.",
    "tAccount": {
      "title": "Goods Receipt Financial Posting (Doc Type: WE - Goods Receipt)",
      "debit": {
        "account": "Inventory - Chain Locks (Asset)",
        "amount": "USD 3,200.00 (100 EA @ $32)"
      },
      "credit": {
        "account": "9100000 GR/IR Clearing Account (Temp Liability)",
        "amount": "USD 3,200.00"
      }
    },
    "qa": {
      "question": "What does Document Type WE indicate in Goods Receipt?",
      "answer": "Document Type WE indicates a standard Goods Receipt for a Purchase Order, recording physical inventory inflow and crediting the GR/IR clearing account."
    }
  },
  {
    "step": 13,
    "title": "Check Received Goods (Transfer to Unrestricted Stock)",
    "role": "Tatiana Karsova (Quality Inspector)",
    "app": "Transfer Stock - In-Plant / Post Goods Movement",
    "tcode": "MIGO / Movement 321",
    "module": "MM",
    "time": "10 min",
    "images": [
      "assets/img/mm_image29.jpg"
    ],
    "purpose": "Transfer the 100 tested chain locks from Quality Inspection stock to Unrestricted-Use stock.",
    "businessLogic": "After quality inspection confirms chain locks meet safety specifications, quality staff posts a transfer posting (movement type 321) releasing the 100 units into unrestricted stock for warehouse operations.",
    "systemImpact": "Generates Material Document 4900038533. No financial GL posting because material valuation and plant do not change.",
    "inputs": [
      {
        "field": "Movement Type",
        "value": "321 (Transfer from Quality Inspection to Unrestricted)"
      },
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Quantity",
        "value": "100 EA"
      }
    ],
    "expectedOutput": "Material Document 4900038533 posted. Stock is now Unrestricted.",
    "tAccount": null,
    "qa": {
      "question": "Between the documents generated in step 12 and step 13, which is the output for the Goods Receipt step?",
      "answer": "Material Document 5000000168 (Step 12) is the true Goods Receipt document. Document 4900038533 (Step 13) is merely an internal stock status transfer posting (Movement 321) with no new goods inflow."
    }
  },
  {
    "step": 14,
    "title": "Check Physical Goods Receipt",
    "role": "Tatiana Karsova (Goods Receipt Clerk)",
    "app": "Stock Overview",
    "tcode": "MMBE",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image20.jpg"
    ],
    "purpose": "Verify unrestricted stock has increased from 400 to 500 units at Plant MI00.",
    "businessLogic": "Audit verification confirming that quality inspection stock is cleared to 0 and unrestricted-use stock reflects the newly available 100 chain locks.",
    "systemImpact": "Verifies stock balance in table MARD.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Plant",
        "value": "MI00"
      }
    ],
    "expectedOutput": "Unrestricted-Use stock shows 500 EA (400 baseline + 100 received).",
    "tAccount": null,
    "qa": {
      "question": "What does 'Number of Reversed Items: 0 of 2' mean in SAP Goods Receipt?",
      "answer": "It confirms that none of the line items received have been returned, cancelled, or reversed (via movement 102/122), proving the receipt remains 100% valid."
    }
  },
  {
    "step": 15,
    "title": "Create and Post the First Supplier Invoice",
    "role": "Silvia Cassano (Accounts Payable Accountant)",
    "app": "Create Supplier Invoice",
    "tcode": "MIRO",
    "module": "MM / FI-AP",
    "time": "15 min",
    "images": [
      "assets/img/mm_image28.jpg",
      "assets/img/mm_image35.jpg"
    ],
    "purpose": "Process Mid-West Supply's invoice for the first delivery (100 units = USD 3,200.00).",
    "businessLogic": "Silvia executes Logistics Invoice Verification (LIV). She inputs PO 4500000088. SAP performs the automated 3-Way Match comparing PO price ($32/ea) vs Goods Receipt quantity (100 ea) vs Invoice ($3,200.00). When balanced, posting clears GR/IR and creates a vendor payable.",
    "systemImpact": "Posts Supplier Invoice 5105600287. Debits GR/IR Clearing (9100000) for $3,200.00; Credits Accounts Payable (3300000) for $3,200.00. Vendor open item created.",
    "inputs": [
      {
        "field": "Transaction",
        "value": "1 (Invoice)"
      },
      {
        "field": "Invoice Date",
        "value": "Current date"
      },
      {
        "field": "Reference PO",
        "value": "45000000##"
      },
      {
        "field": "Invoice Amount",
        "value": "3,200.00 USD"
      },
      {
        "field": "Quantity Invoiced",
        "value": "100 EA"
      }
    ],
    "expectedOutput": "Supplier Invoice 5105600287 created. Status: Posted.",
    "tAccount": {
      "title": "Supplier Invoice Financial Posting (Doc Type: RE - Supplier Invoice)",
      "debit": {
        "account": "9100000 GR/IR Clearing Account (Clearing Temp)",
        "amount": "USD 3,200.00"
      },
      "credit": {
        "account": "3300000 Accounts Payable - Mid-West Supply 1003###",
        "amount": "USD 3,200.00"
      }
    },
    "qa": {
      "question": "What are the primary invoice statuses in SAP S/4HANA?",
      "answer": "Open (posted, awaiting payment); Cleared (fully settled by payment); Parked (saved draft awaiting approval); Blocked (discrepancy detected by 3-Way Match); Posted (officially recorded in G/L)."
    }
  },
  {
    "step": 16,
    "title": "Display Purchase Order History (First Milestones)",
    "role": "Wilton Saban (Inventory Supervisor)",
    "app": "Display Purchase Order",
    "tcode": "ME23N / PO History",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image9.jpg",
      "assets/img/mm_image15.jpg"
    ],
    "purpose": "Review PO History tab showing GR document 5000000168 (100 EA) and IR document 5105600287 (100 EA).",
    "businessLogic": "Demonstrates the integration of MM and FI: PO History links all follow-on material documents and financial invoices back to the purchasing commitment.",
    "systemImpact": "Displays balance: Delivered 100 EA, Invoiced 100 EA, Still to Deliver 100 EA.",
    "inputs": [
      {
        "field": "PO Number",
        "value": "45000000##"
      }
    ],
    "expectedOutput": "PO History tab displays both WE (GR) and RE (IR) line items matching perfectly.",
    "tAccount": null,
    "qa": {
      "question": "When does the PO History tab appear in SAP?",
      "answer": "The Purchase Order History tab appears automatically only after the first transactional follow-on document (Goods Receipt or Invoice Receipt) has been posted against the PO."
    }
  },
  {
    "step": 17,
    "title": "Display Document Flow",
    "role": "Joyce Hausman (Purchasing Agent)",
    "app": "Display Document Flow",
    "tcode": "ME23N / Doc Flow",
    "module": "MM / FI Integration",
    "time": "5 min",
    "images": [
      "assets/img/mm_image14.jpg",
      "assets/img/mm_image13.jpg"
    ],
    "purpose": "Inspect graphical document flow connecting PR, RFQ, PO, GR, and Invoice.",
    "businessLogic": "Validates the audit trail and internal control compliance across the procurement cycle.",
    "systemImpact": "Visual verification.",
    "inputs": [
      {
        "field": "PO Number",
        "value": "45000000##"
      }
    ],
    "expectedOutput": "Document chain displays all linked documents.",
    "tAccount": null,
    "qa": {
      "question": "What is the primary benefit of Document Flow in purchasing?",
      "answer": "It provides full traceability from initial internal requisition to final payment, preventing duplicate orders, phantom suppliers, and unauthorized purchases."
    }
  },
  {
    "step": 18,
    "title": "Post Goods Receipt for Purchase Order (Delivery 2)",
    "role": "Tatiana Karsova (Goods Receipt Clerk)",
    "app": "Post Goods Receipt for Purchasing Document",
    "tcode": "MIGO",
    "module": "MM / FI",
    "time": "15 min",
    "images": [
      "assets/img/mm_image22.jpg"
    ],
    "purpose": "Receive second partial shipment of 100 Chain Locks directly into Unrestricted-Use stock.",
    "businessLogic": "Mid-West Supply delivers remaining 100 units. Because the supplier and material have now been established and passed initial inspection, this second delivery is posted directly to Unrestricted-Use stock without passing through quality inspection.",
    "systemImpact": "1) Material Document (WE) 5000000169 created; 2) Financial Journal Entry posted: Debits Inventory for $3,200.00; Credits GR/IR 9100000 for $3,200.00.",
    "inputs": [
      {
        "field": "Movement Type",
        "value": "101"
      },
      {
        "field": "PO Number",
        "value": "45000000##"
      },
      {
        "field": "Quantity",
        "value": "100 EA"
      },
      {
        "field": "Stock Type",
        "value": "Unrestricted-Use (Direct release)"
      }
    ],
    "expectedOutput": "Material Document 5000000169 posted directly to Unrestricted-Use.",
    "tAccount": {
      "title": "Goods Receipt 2 Financial Posting (Doc Type: WE)",
      "debit": {
        "account": "Inventory - Chain Locks (Asset)",
        "amount": "USD 3,200.00"
      },
      "credit": {
        "account": "9100000 GR/IR Clearing Account (Temp Liability)",
        "amount": "USD 3,200.00"
      }
    },
    "qa": {
      "question": "How does the second delivery differ from the first delivery?",
      "answer": "The first delivery was posted into Quality Inspection stock, requiring a separate transfer posting (321) to unrestricted use. The second delivery was posted directly into Unrestricted-Use stock, skipping quality inspection."
    }
  },
  {
    "step": 19,
    "title": "Check Physical Goods Receipt (Delivery 2)",
    "role": "Tatiana Karsova (Goods Receipt Clerk)",
    "app": "Stock Overview",
    "tcode": "MMBE",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image21.jpg"
    ],
    "purpose": "Verify unrestricted inventory balance has reached 600 units (400 original + 100 first + 100 second).",
    "businessLogic": "Confirms total physical fulfillment of the 200 units ordered on PO 4500000088.",
    "systemImpact": "Validates final inventory level in table MARD.",
    "inputs": [
      {
        "field": "Material",
        "value": "CHLK1###"
      },
      {
        "field": "Plant",
        "value": "MI00"
      }
    ],
    "expectedOutput": "Unrestricted-Use stock = 600 EA.",
    "tAccount": null,
    "qa": {
      "question": "What is the total quantity of chain locks procured across both deliveries?",
      "answer": "200 units in total (100 units in Delivery 1 + 100 units in Delivery 2), bringing total stock from 400 to 600 units."
    }
  },
  {
    "step": 20,
    "title": "Create and Post the Second Supplier Invoice",
    "role": "Silvia Cassano (AP Accountant)",
    "app": "Create Supplier Invoice",
    "tcode": "MIRO",
    "module": "MM / FI-AP",
    "time": "15 min",
    "images": [
      "assets/img/mm_image17.jpg",
      "assets/img/mm_image3.jpg"
    ],
    "purpose": "Process Mid-West Supply's second invoice (100 units = USD 3,200.00).",
    "businessLogic": "Silvia verifies the remaining delivered quantity against PO 4500000088. 3-Way Match confirms 100 units received in Delivery 2. Posting invoice creates second vendor payable.",
    "systemImpact": "Posts Supplier Invoice 5105600288. Debits GR/IR (9100000) for $3,200.00; Credits Accounts Payable (3300000) for $3,200.00. Vendor liability total is now $6,400.00 across both invoices.",
    "inputs": [
      {
        "field": "Reference PO",
        "value": "45000000##"
      },
      {
        "field": "Invoice Amount",
        "value": "3,200.00 USD"
      },
      {
        "field": "Quantity Invoiced",
        "value": "100 EA"
      }
    ],
    "expectedOutput": "Supplier Invoice 5105600288 created.",
    "tAccount": {
      "title": "Supplier Invoice 2 Financial Posting (Doc Type: RE)",
      "debit": {
        "account": "9100000 GR/IR Clearing Account (Clearing Temp)",
        "amount": "USD 3,200.00"
      },
      "credit": {
        "account": "3300000 Accounts Payable - Mid-West Supply 1003###",
        "amount": "USD 3,200.00"
      }
    },
    "qa": {
      "question": "What is the combined balance on the GR/IR account after Steps 12, 15, 18, and 20?",
      "answer": "Exactly $0.00! Delivery 1: Cr $3,200, Dr $3,200 &rarr; Net $0. Delivery 2: Cr $3,200, Dr $3,200 &rarr; Net $0. All goods receipts and invoice receipts are matched."
    }
  },
  {
    "step": 21,
    "title": "Post Outgoing Payment",
    "role": "Silvia Cassano (Accounts Payable Accountant)",
    "app": "Post Outgoing Payments",
    "tcode": "F-53",
    "module": "FI-AP",
    "time": "15 min",
    "images": [
      "assets/img/mm_image31.jpg",
      "assets/img/mm_image7.jpg"
    ],
    "purpose": "Execute full outgoing bank wire payment of USD 6,400.00 to Mid-West Supply, settling both invoices 5105600287 and 5105600288.",
    "businessLogic": "Silvia posts outgoing wire payment from Global Bike's checking account (Bank 1: 1810000). She selects both open invoices ($3,200 + $3,200 = $6,400.00). Matching payment with open items clears both vendor line items to zero.",
    "systemImpact": "Posts Outgoing Payment Journal Entry 1500000070 (document type KZ). Debits Accounts Payable (3300000) for $6,400.00; Credits Bank 1 (1810000) for $6,400.00. Vendor invoices marked as Cleared.",
    "inputs": [
      {
        "field": "Company Code",
        "value": "US00"
      },
      {
        "field": "Bank Account",
        "value": "1810000 (Bank 1)"
      },
      {
        "field": "Amount",
        "value": "6,400.00 USD"
      },
      {
        "field": "Vendor Account",
        "value": "1003### (Mid-West Supply ###)"
      },
      {
        "field": "Selected Invoices",
        "value": "Invoice 5105600287 & Invoice 5105600288"
      }
    ],
    "expectedOutput": "Journal Entry 1500000070 posted. Invoices cleared with green status.",
    "tAccount": {
      "title": "Outgoing Payment Journal Entry 1500000070 (Doc Type: KZ - Vendor Payment)",
      "debit": {
        "account": "3300000 Accounts Payable - Mid-West Supply 1003###",
        "amount": "USD 6,400.00"
      },
      "credit": {
        "account": "1810000 Bank 1 (Asset Outflow)",
        "amount": "USD 6,400.00"
      }
    },
    "qa": {
      "question": "What does a document type KZ represent in SAP?",
      "answer": "KZ represents a Vendor Payment document in Accounts Payable, recording cash outflow from the bank and clearing vendor liability."
    }
  },
  {
    "step": 22,
    "title": "Display Vendor Payment & Supplier Balance",
    "role": "Silvia Cassano (AP Accountant)",
    "app": "Display Supplier Balances / Manage Supplier Line Items",
    "tcode": "FK10N / FBL1N",
    "module": "FI-AP",
    "time": "10 min",
    "images": [
      "assets/img/mm_image11.jpg"
    ],
    "purpose": "Inspect the vendor T-account balance in subledger 1003### and verify clearing status.",
    "businessLogic": "Accountant verifies that total debits from payments match total credits from invoices. The two green checkmarks confirm clearing status.",
    "systemImpact": "Supplier subledger shows Debit 6,400.00 (Step 21 payment) minus Credit 6,400.00 (Steps 15 & 20 invoices) = Balance 0.00 for this case study.",
    "inputs": [
      {
        "field": "Supplier",
        "value": "1003###"
      },
      {
        "field": "Company Code",
        "value": "US00"
      },
      {
        "field": "Fiscal Year",
        "value": "2026"
      }
    ],
    "expectedOutput": "Supplier line items show two checkmarks indicating cleared status.",
    "tAccount": {
      "title": "Supplier T-Account Reconciliation (Mid-West Supply 1003###, Account 3300000)",
      "debit": {
        "account": "Step 21 Payment (JE 1500000070)",
        "amount": "USD 6,400.00"
      },
      "credit": {
        "account": "Step 15 Invoice ($3,200.00) + Step 20 Invoice ($3,200.00)",
        "amount": "USD 6,400.00"
      }
    },
    "qa": {
      "question": "How can you tell from the report whether an invoice has been paid?",
      "answer": "The invoice appears in the 'Cleared Items' list with two green checkmarks and references the payment document number (KZ)."
    }
  },
  {
    "step": 23,
    "title": "Display Purchase Order History (Final Completed State)",
    "role": "Wilton Saban (Inventory Supervisor)",
    "app": "Display Purchase Order",
    "tcode": "ME23N / PO History",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/mm_image23.jpg",
      "assets/img/mm_image2.jpg",
      "assets/img/mm_image16.jpg"
    ],
    "purpose": "Verify PO 4500000088 history reflects full fulfillment: 2 Goods Receipts (100 + 100 = 200 EA) and 2 Invoices ($3,200 + $3,200 = $6,400.00).",
    "businessLogic": "Final procurement audit confirming that PO commitments equal delivered quantities equal billed amounts.",
    "systemImpact": "Confirms PO status is Completely Delivered and Completely Invoiced.",
    "inputs": [
      {
        "field": "PO Number",
        "value": "45000000##"
      }
    ],
    "expectedOutput": "PO History shows 4 lines: 2 GRs (WE) totaling 200 EA, 2 Invoices (RE) totaling USD 6,400.00. Balance to deliver = 0, Balance to invoice = 0.",
    "tAccount": null,
    "qa": {
      "question": "What is the final balance remaining to deliver on PO 4500000088?",
      "answer": "Zero EA. All 200 units have been received and invoiced."
    }
  },
  {
    "step": 24,
    "title": "Display Balance List & General Ledger Line Items",
    "role": "Shuyuan Chen (Head of Accounting)",
    "app": "Display G/L Account Balances / Line Item Browser",
    "tcode": "FS10N / FAGLL03",
    "module": "FI General Ledger",
    "time": "10 min",
    "images": [
      "assets/img/mm_image25.jpg"
    ],
    "purpose": "Audit all General Ledger accounts touched during the 23 preceding procurement steps.",
    "businessLogic": "The Chief Financial Officer and Internal Auditor audit the four core accounts affected across the entire Procure-to-Pay workflow to confirm balance sheet and income statement integrity.",
    "systemImpact": "Displays debit, credit, and ending balance for accounts: Inventory, 9100000 (GR/IR), 3300000 (Accounts Payable), 1810000 (Bank 1).",
    "inputs": [
      {
        "field": "Company Code",
        "value": "US00"
      },
      {
        "field": "Fiscal Year",
        "value": "2026"
      }
    ],
    "expectedOutput": "All G/L balances verified against trial balance.",
    "tAccount": {
      "title": "Complete MM Procure-to-Pay Four-Account Ledger Summary",
      "debit": {
        "account": "1) Inventory: +USD 6,400.00 (200 units @ $32)\\n2) 9100000 GR/IR: +USD 6,400.00 (Cleared at IR)\\n3) 3300000 AP: +USD 6,400.00 (Cleared at Payment)",
        "amount": "Debit Postings"
      },
      "credit": {
        "account": "1) 9100000 GR/IR: -USD 6,400.00 (Posted at GR)\\n2) 3300000 AP: -USD 6,400.00 (Posted at IR)\\n3) 1810000 Bank 1: -USD 6,400.00 (Cash Outflow)",
        "amount": "Credit Postings"
      }
    },
    "qa": {
      "question": "Which general ledger accounts were used in the previous 23 steps?",
      "answer": "1) Inventory Account (debited at Goods Receipt, steps 12 & 18); 2) 9100000 GR/IR Clearing Account (credited at Goods Receipt, debited at Invoice Receipt, steps 15 & 20); 3) 3300000 Accounts Payable (credited at Invoice, debited at Payment, step 21); 4) 1810000 Bank 1 (credited at Outgoing Payment, step 21)."
    }
  }
];
