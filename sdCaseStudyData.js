// SD Case Study 14-Step Detailed Dataset
window.SD_CASE_STUDY_STEPS = [
  {
    "step": 1,
    "title": "Create New Customer (Business Partner)",
    "role": "Nguyễn Thị Ngọc Diệp (Contract Manager / Sales Master Data Clerk)",
    "app": "Manage Business Partner Master Data",
    "tcode": "BP",
    "module": "SD / FI Master Data",
    "time": "15 min",
    "images": [
      "assets/img/sd_image3.png"
    ],
    "purpose": "Establish a comprehensive Business Partner master record for new retail client 'The Bike Zone ###' in Orlando, FL.",
    "businessLogic": "Before taking any orders, SAP requires customer master data containing company code accounting parameters (reconciliation account 1200000) and sales area distribution rules. Standard practice at GBI involves copying customer template (e.g., The Bike Zone 000) to inherit preconfigured shipping conditions, pricing procedures, and payment terms (Net 30) while establishing unique tax IDs and street addresses.",
    "systemImpact": "Assigns unique internal BP number (e.g., 1003###) and customer account number. Creates General Data (name/address), Company Code Data (US00, Recon G/L 1200000), and Sales Area Data (UE00/WH/BI).",
    "inputs": [
      {
        "field": "Business Partner Role",
        "value": "Customer (FLCU00 for FI, FLCU01 for Sales)"
      },
      {
        "field": "Name 1",
        "value": "The Bike Zone ###"
      },
      {
        "field": "Search Term 1",
        "value": "###"
      },
      {
        "field": "City / Postal Code",
        "value": "Orlando / 32801"
      },
      {
        "field": "Country / Region",
        "value": "US / FL"
      },
      {
        "field": "Reconciliation Account",
        "value": "1200000 (Trade Receivables)"
      },
      {
        "field": "Sales Area",
        "value": "Sales Org UE00 | Distr Channel WH | Division BI"
      }
    ],
    "expectedOutput": "Business Partner record created successfully with unique 7-digit ID (e.g. 1003219).",
    "tAccount": null,
    "qa": {
      "question": "What are the 3 essential data segments in a SAP Customer Master record?",
      "answer": "1) General Data (Client-level: Name, address, communication, tax ID); 2) Company Code Data (FI-level: Reconciliation Account 1200000, payment terms, dunning notices); 3) Sales Area Data (SD-level: Shipping plant, currency USD, pricing conditions, delivering plant MI00)."
    }
  },
  {
    "step": 2,
    "title": "Create Customer Request (Inquiry)",
    "role": "Nguyễn Tâm Việt Phúc (Sales Agent)",
    "app": "Manage Sales Inquiries / Create Inquiry",
    "tcode": "VA11",
    "module": "SD",
    "time": "10 min",
    "images": [
      "assets/img/sd_image11.png"
    ],
    "purpose": "Log customer's non-binding price and availability inquiry for 5 Deluxe Touring Bikes and 2 Professional Touring Bikes.",
    "businessLogic": "An inquiry is an official pre-sales document recording customer interest without establishing legal commitment. It captures requested quantities, valid-from and valid-to dates, and allows the sales representative to gauge demand without reserving warehouse inventory or triggering delivery obligations.",
    "systemImpact": "Creates an Inquiry document (e.g., 10000121) in table VBAK/VBAP with document type 'IN'. Zero financial postings or inventory deductions occur at this stage.",
    "inputs": [
      {
        "field": "Inquiry Type",
        "value": "IN (Inquiry)"
      },
      {
        "field": "Sales Organization",
        "value": "UE00 (US East)"
      },
      {
        "field": "Distribution Channel",
        "value": "WH (Wholesale)"
      },
      {
        "field": "Division",
        "value": "BI (Bicycles)"
      },
      {
        "field": "Sold-to Party",
        "value": "The Bike Zone ### (1003###)"
      },
      {
        "field": "Material Line 1",
        "value": "DXTR1### (Deluxe Touring Bike, Black) - Qty: 5"
      },
      {
        "field": "Material Line 2",
        "value": "PRTR1### (Professional Touring Bike, Red) - Qty: 2"
      }
    ],
    "expectedOutput": "Inquiry document generated: 'Inquiry 100001## has been saved'.",
    "tAccount": null,
    "qa": {
      "question": "Why does an Inquiry not affect financial accounts or inventory?",
      "answer": "An inquiry is purely informational. The customer has not committed to purchase, and the company has not guaranteed stock or pricing. No legal claim or physical goods movement occurs."
    }
  },
  {
    "step": 3,
    "title": "Create Customer Quotation",
    "role": "Nguyễn Tâm Việt Phúc (Sales Representative)",
    "app": "Manage Sales Quotations / Create Quotation",
    "tcode": "VA21",
    "module": "SD",
    "time": "10 min",
    "images": [
      "assets/img/sd_image5.png"
    ],
    "purpose": "Generate a legally binding commercial offer referencing Inquiry 100001## with a special 5% competitive discount.",
    "businessLogic": "A quotation transforms the customer inquiry into an official offer specifying exact prices, delivery terms, and an expiration date. Referencing the inquiry automatically pulls customer and material details, preventing duplicate data entry. Entering condition discount 'RA00' applies a 5% discount across the line items.",
    "systemImpact": "Generates Quotation document (e.g., 20000059) of type 'QT'. Links upstream Inquiry in Document Flow. Still zero accounting impact, but establishes legally enforceable pricing until validity expires.",
    "inputs": [
      {
        "field": "Quotation Type",
        "value": "QT (Quotation)"
      },
      {
        "field": "Reference Document",
        "value": "Inquiry 100001##"
      },
      {
        "field": "Valid To Date",
        "value": "1 Month from current date"
      },
      {
        "field": "Pricing Condition",
        "value": "Discount RA00: 5% applied to line items"
      },
      {
        "field": "Net Calculated Value",
        "value": "USD 20,092.50 (Gross USD 21,400.00 minus USD 1,307.50 discount)"
      }
    ],
    "expectedOutput": "Quotation 200000## has been saved. Pricing conditions reflect discounted total.",
    "tAccount": null,
    "qa": {
      "question": "What is the critical legal difference between an Inquiry and a Quotation in SAP?",
      "answer": "An Inquiry is completely non-binding. A Quotation is a legally enforceable commitment by the seller to deliver goods at specified prices within the validity period if the customer accepts."
    }
  },
  {
    "step": 4,
    "title": "Create Sales Order Referencing Quotation",
    "role": "Nguyễn Tâm Việt Phúc (Sales Agent)",
    "app": "Manage Sales Orders / Create Sales Order",
    "tcode": "VA01",
    "module": "SD",
    "time": "10 min",
    "images": [
      "assets/img/sd_image7.png"
    ],
    "purpose": "Finalize customer purchase commitment by creating a confirmed Standard Sales Order referencing Quotation 200000##.",
    "businessLogic": "When the customer accepts the quotation, creating a sales order referencing the quotation locks in agreed prices and quantities. SAP triggers an automatic Available-to-Promise (ATP) check against current stock and scheduled receipts at Plant MI00 and determines the confirmed shipping schedule.",
    "systemImpact": "Creates Standard Order (type 'OR', e.g., Order 51). Updates preceding Quotation status to 'Completed'. Reserves inventory requirements in Materials Management (visible in MD04/MMBE). No General Ledger postings yet.",
    "inputs": [
      {
        "field": "Order Type",
        "value": "OR (Standard Order)"
      },
      {
        "field": "Reference Quotation",
        "value": "Quotation 200000##"
      },
      {
        "field": "Customer PO Number",
        "value": "PO-TBZ-###"
      },
      {
        "field": "Customer PO Date",
        "value": "Today's Date"
      },
      {
        "field": "Req. Delivery Date",
        "value": "Default scheduled date"
      }
    ],
    "expectedOutput": "Standard Order ## has been saved with confirmed schedule lines.",
    "tAccount": null,
    "qa": {
      "question": "What system checks automatically trigger upon saving a Sales Order in SAP?",
      "answer": "1) Availability Check (ATP) against plant stock; 2) Customer Credit Limit Check (FI-AR Credit Management); 3) Delivery and Transportation Scheduling; 4) Pricing condition derivation and tax recalculation."
    }
  },
  {
    "step": 5,
    "title": "Check Stock Status (Initial Warehouse Check)",
    "role": "Nguyễn Trúc Giang (Inventory Supervisor)",
    "app": "Stock Overview",
    "tcode": "MMBE",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/sd_image6.png",
      "assets/img/sd_image19.png"
    ],
    "purpose": "Verify on-hand warehouse physical inventory of DXTR1### and PRTR1### at Plant MI00 before initiating fulfillment.",
    "businessLogic": "Warehouse supervisors must verify physical inventory across storage locations (FG00 for Finished Goods) to ensure sufficient unrestricted stock is available to fulfill the delivery without triggering backorders or stockouts.",
    "systemImpact": "Read-only inventory inquiry. Shows unrestricted-use stock, quality inspection stock, and sales order committed reserves across company code US00 and Plant MI00.",
    "inputs": [
      {
        "field": "Material",
        "value": "DXTR1### and PRTR1###"
      },
      {
        "field": "Plant",
        "value": "MI00 (Miami Distribution Center)"
      },
      {
        "field": "Storage Location",
        "value": "FG00 (Finished Goods)"
      }
    ],
    "expectedOutput": "Stock Overview displays current on-hand quantities (e.g. 50 units DXTR1### and 40 units PRTR1### in Unrestricted-Use).",
    "tAccount": null,
    "qa": {
      "question": "Why is stock verified at storage location FG00 rather than TG00 in the SD case study?",
      "answer": "In GBI, Deluxe and Professional Touring bikes are assembled finished products stored under Finished Goods (FG00). Trading goods (purchased for resale without assembly, like chain locks) are stored under TG00."
    }
  },
  {
    "step": 6,
    "title": "Track Sales Order (Future Supply Analysis)",
    "role": "Nguyễn Trúc Giang (Logistics Coordinator)",
    "app": "Track Sales Orders / Sales Order Fulfillment Issues",
    "tcode": "VA03 / Fiori Track",
    "module": "SD",
    "time": "5 min",
    "images": [
      "assets/img/sd_image4.png"
    ],
    "purpose": "Inspect the fulfillment status of Sales Order 51 and examine 'Future Supply' timeline.",
    "businessLogic": "Modern SAP Fiori apps provide 360-degree visibility over fulfillment blocks, delivery creation status, and projected stock. 'Future Supply' identifies scheduled production completions or incoming shipments to ensure that warehouse order spikes do not starve subsequent sales orders.",
    "systemImpact": "Live monitoring dashboard. Confirms Order processing status is 'In Process' with zero delivery blocks or credit blocks.",
    "inputs": [
      {
        "field": "Sales Order Number",
        "value": "Order 51 (or your generated order number)"
      }
    ],
    "expectedOutput": "Fulfillment status shows order is valid, credit is approved, and shipping is ready to start.",
    "tAccount": null,
    "qa": {
      "question": "What does 'Future Supply' indicate in the Sales Order Tracking screen?",
      "answer": "Future Supply identifies scheduled incoming stock—such as confirmed production orders or vendor purchase orders—projected to arrive in time to fulfill customer demand without draining buffer safety stock."
    }
  },
  {
    "step": 7,
    "title": "Start Delivery Process (Create Outbound Delivery)",
    "role": "Nguyễn Trúc Giang (Shipping Specialist)",
    "app": "Create Outbound Deliveries - From Sales Orders",
    "tcode": "VL01N",
    "module": "LE / SD",
    "time": "10 min",
    "images": [
      "assets/img/sd_image10.png",
      "assets/img/sd_image13.png"
    ],
    "purpose": "Initialize warehouse fulfillment by creating Outbound Delivery document 800000## for Sales Order 51.",
    "businessLogic": "Outbound Delivery is the operational authorization for the warehouse to pick, pack, and prepare products for freight transport. The Shipping Point (MI00) takes ownership of the items. Crucially, creating an outbound delivery document does NOT decrease inventory or create accounting entries yet—it creates the shipping directive.",
    "systemImpact": "Generates Outbound Delivery document (e.g., 80000048). Sets order shipping status to 'Partially Processed / Being Picked'. Links into Document Flow.",
    "inputs": [
      {
        "field": "Shipping Point",
        "value": "MI00 (Miami Shipping Center)"
      },
      {
        "field": "Sales Order Number",
        "value": "51"
      },
      {
        "field": "Planned Goods Issue Date",
        "value": "Current date"
      }
    ],
    "expectedOutput": "Outbound Delivery 800000## has been created.",
    "tAccount": null,
    "qa": {
      "question": "Which fields are strictly required to create an Outbound Delivery in SAP?",
      "answer": "Shipping Point (MI00), Selection Date, and Sales Order Number (or Due Date Range)."
    }
  },
  {
    "step": 8,
    "title": "Track Sales Order (Fulfillment Stage Verification)",
    "role": "Nguyễn Trúc Giang (Logistics Coordinator)",
    "app": "Track Sales Orders",
    "tcode": "Fiori Track",
    "module": "SD",
    "time": "5 min",
    "images": [
      "assets/img/sd_image4.png"
    ],
    "purpose": "Inspect fulfillment progress to confirm Outbound Delivery has been scheduled and picking list generated.",
    "businessLogic": "Tracking order progression prevents warehouse delays. It verifies that delivery status has shifted from 'Open' to 'In Processing / Delivery Created', but 'Goods Issue' and 'Billing' remain pending.",
    "systemImpact": "Verifies that logistics execution has taken custody of the sales requirement.",
    "inputs": [
      {
        "field": "Sales Order Number",
        "value": "51"
      }
    ],
    "expectedOutput": "Delivery stage shows 'Created'; Picking and Goods Issue show 'Not Started'.",
    "tAccount": null,
    "qa": {
      "question": "Which business areas contribute to order status tracking at this stage?",
      "answer": "Sales (SD), Warehouse / Logistics Execution (LE/WM), and Credit Management (FI)."
    }
  },
  {
    "step": 9,
    "title": "Pick Materials and Post Goods Issue (PGI)",
    "role": "Nguyễn Đức Bảo (Warehouse Worker / Shipping Clerk)",
    "app": "Change Outbound Delivery / Post Goods Issue",
    "tcode": "VL02N",
    "module": "LE / MM / FI",
    "time": "15 min",
    "images": [
      "assets/img/sd_image8.png"
    ],
    "purpose": "Record physical picking of 5 Deluxe and 2 Professional bikes from storage location FG00, load carrier, and post Goods Issue.",
    "businessLogic": "Picking physically removes stock from warehouse racks and stages it at the loading dock. Recording Pick Quantity (5 and 2) satisfies the delivery line items. Then, clicking 'Post Goods Issue' (PGI) is the critical legal milestone: title of ownership transfers to the carrier/customer, physical warehouse stock is deducted, and the financial cost of goods sold is officially recognized in the General Ledger.",
    "systemImpact": "1) Material Document (type WL, e.g. 4900038051) posted in MM reducing inventory by 7 bikes; 2) Accounting Journal Entry (e.g. 4900024044) posted in FI debiting COGS and crediting Inventory; 3) Delivery status updated to 'Goods Issue: Completed'.",
    "inputs": [
      {
        "field": "Outbound Delivery Number",
        "value": "800000##"
      },
      {
        "field": "Storage Location",
        "value": "FG00"
      },
      {
        "field": "Picked Quantity Line 1 (DXTR1###)",
        "value": "5"
      },
      {
        "field": "Picked Quantity Line 2 (PRTR1###)",
        "value": "2"
      }
    ],
    "expectedOutput": "Goods Issue posted successfully. Outbound delivery status updated to 'Completely Processed'.",
    "tAccount": {
      "title": "Journal Entry 4900024044 (Document Type: WL - Goods Issue)",
      "debit": {
        "account": "6993000 Cost of Goods Sold (COGS)",
        "amount": "USD 10,000.00"
      },
      "credit": {
        "account": "1110000 Finished Goods Inventory",
        "amount": "USD 10,000.00"
      }
    },
    "qa": {
      "question": "What is the crucial financial and inventory effect of Posting Goods Issue (PGI)?",
      "answer": "PGI reduces physical inventory balances in the warehouse and simultaneously posts a G/L journal entry: DEBIT Cost of Goods Sold (COGS 6993000) and CREDIT Finished Goods Inventory (1110000). Legal title to goods officially transfers."
    }
  },
  {
    "step": 10,
    "title": "Check Stock Status (Post-Goods Issue Verification)",
    "role": "Nguyễn Đức Bảo (Warehouse Supervisor)",
    "app": "Stock Overview",
    "tcode": "MMBE",
    "module": "MM",
    "time": "5 min",
    "images": [
      "assets/img/sd_image1.png"
    ],
    "purpose": "Verify that unrestricted-use inventory has decreased exactly by the delivered quantities.",
    "businessLogic": "Audit verification step to guarantee inventory integrity between physical staging and ERP system records. If 50 Deluxe bikes were on hand, the balance must now read exactly 45.",
    "systemImpact": "Confirms inventory decrement in MM table MARD.",
    "inputs": [
      {
        "field": "Material",
        "value": "DXTR1### and PRTR1###"
      },
      {
        "field": "Plant",
        "value": "MI00"
      },
      {
        "field": "Storage Location",
        "value": "FG00"
      }
    ],
    "expectedOutput": "Stock count shows exactly 5 fewer DXTR1### and 2 fewer PRTR1### in Unrestricted-Use.",
    "tAccount": null,
    "qa": {
      "question": "Explain the difference between the Stock Overview in step 5 and step 10.",
      "answer": "In step 5, unrestricted stock reflected full available quantities before shipping. In step 10, stock is decreased by 5 Deluxe Touring bikes and 2 Professional Touring bikes due to the Goods Issue posting."
    }
  },
  {
    "step": 11,
    "title": "Create Billing Document for Customer",
    "role": "Nguyễn Đức Bảo (Billing Clerk)",
    "app": "Create Billing Documents",
    "tcode": "VF01",
    "module": "SD / FI",
    "time": "10 min",
    "images": [
      "assets/img/sd_image12.png"
    ],
    "purpose": "Generate customer invoice referencing completed Outbound Delivery 800000##.",
    "businessLogic": "Billing converts delivered physical goods into an accounts receivable obligation. Referencing the outbound delivery ensures the customer is billed only for what was actually shipped and confirmed via Goods Issue. Pricing conditions and discounts from the sales order are automatically computed.",
    "systemImpact": "Creates SD Billing Document (type F2, e.g. 90000054). Sets delivery billing status to 'Completely Invoiced'.",
    "inputs": [
      {
        "field": "Billing Document Type",
        "value": "F2 (Invoice)"
      },
      {
        "field": "Reference Document",
        "value": "Outbound Delivery 800000##"
      }
    ],
    "expectedOutput": "Billing Document 900000## generated for USD 20,092.50.",
    "tAccount": null,
    "qa": {
      "question": "In what ways does SD billing mirror MM vendor invoice posting?",
      "answer": "Both use preceding operational documents (SD uses Outbound Delivery; MM uses PO and Goods Receipt) to verify materials, quantities, and pricing, and both generate financial accounting postings (SD creates Accounts Receivable; MM creates Accounts Payable)."
    }
  },
  {
    "step": 12,
    "title": "Display Billing Document & Post Customer Invoice",
    "role": "Huỳnh Trương Sinh (AR Accountant)",
    "app": "Display / Change Billing Document",
    "tcode": "VF03",
    "module": "FI-AR",
    "time": "5 min",
    "images": [
      "assets/img/sd_image18.jpg"
    ],
    "purpose": "Verify accounting transfer of Billing Document 900000## and examine resulting FI Journal Entry.",
    "businessLogic": "In standard SAP integration, saving a billing document automatically releases an accounting journal entry (document type RV) to the General Ledger. The accountant verifies that trade receivables are debited and sales revenues and sales discounts are accurately credited.",
    "systemImpact": "Posts Accounting Journal Entry (type RV, e.g. 90000048) in company code US00. Customer subledger account 1003### shows an open debit item for USD 20,092.50.",
    "inputs": [
      {
        "field": "Billing Document",
        "value": "900000##"
      }
    ],
    "expectedOutput": "Journal entry created. Billing document status displays 'Journal entry has been created; Open'.",
    "tAccount": {
      "title": "Journal Entry 90000048 (Document Type: RV - Billing Document)",
      "debit": {
        "account": "1200000 Trade Receivables: USD 20,092.50\\n4770000 Rebates Granted (Sales Discount): USD 1,307.50",
        "amount": "Total Debit: USD 21,400.00"
      },
      "credit": {
        "account": "4000000 Sales Revenue (Gross)",
        "amount": "Total Credit: USD 21,400.00"
      }
    },
    "qa": {
      "question": "What is the difference between a Billing Document and a Customer Invoice?",
      "answer": "Billing Document is the broad SAP SD category encompassing customer invoices (F2), credit memos, debit memos, and pro forma invoices. A Customer Invoice is the specific billing document type that legally requests payment and creates an Accounts Receivable posting in FI."
    }
  },
  {
    "step": 13,
    "title": "Post Receipt of Customer Payment",
    "role": "Huỳnh Trương Sinh (AR Accountant)",
    "app": "Post Incoming Payments",
    "tcode": "F-28",
    "module": "FI-AR",
    "time": "10 min",
    "images": [
      "assets/img/sd_image20.jpg"
    ],
    "purpose": "Record bank wire receipt of USD 20,092.50 from The Bike Zone ### and clear open invoice 900000##.",
    "businessLogic": "When the customer's payment arrives in Global Bike's checking account, the AR accountant records the incoming funds. Matching the payment against open invoice 900000## clears the receivable from open status to cleared status, leaving zero remaining customer balance.",
    "systemImpact": "Posts Incoming Payment Journal Entry (type DZ, e.g. 1400000045). Debits Bank 1 (1810000), credits Trade Receivables (1200000). Customer open line item becomes cleared (status turns Green).",
    "inputs": [
      {
        "field": "Company Code",
        "value": "US00"
      },
      {
        "field": "Account (Bank)",
        "value": "1810000 (Bank 1)"
      },
      {
        "field": "Amount",
        "value": "20,092.50 USD"
      },
      {
        "field": "Customer Account",
        "value": "1003### (The Bike Zone ###)"
      },
      {
        "field": "Assigned Open Item",
        "value": "Invoice 900000##"
      }
    ],
    "expectedOutput": "Journal Entry 14000000## posted. Invoice is fully cleared.",
    "tAccount": {
      "title": "Journal Entry 1400000045 (Document Type: DZ - Customer Payment)",
      "debit": {
        "account": "1810000 Bank 1 (Asset)",
        "amount": "USD 20,092.50"
      },
      "credit": {
        "account": "1200000 Trade Receivables (Asset Clearance)",
        "amount": "USD 20,092.50"
      }
    },
    "qa": {
      "question": "Why is Posting Incoming Payment considered the true final stage of the Order-to-Cash process?",
      "answer": "Because all operational and financial commitments are completely settled: goods have been delivered, the invoice has been posted, cash has been deposited into the company bank account, and the customer receivable has been cleared to 0.00."
    }
  },
  {
    "step": 14,
    "title": "Review Document Flow & G/L Audit Trail",
    "role": "Huỳnh Trương Sinh (Senior Internal Auditor / Lead Consultant)",
    "app": "Display Document Flow",
    "tcode": "VA03 / Document Flow",
    "module": "SD / MM / FI Integration",
    "time": "5 min",
    "images": [
      "assets/img/sd_image16.jpg",
      "assets/img/sd_image14.jpg",
      "assets/img/sd_image15.jpg",
      "assets/img/sd_image17.jpg"
    ],
    "purpose": "Review the full unbroken chronological audit trail linking all sales, logistics, and financial documents from inquiry to payment.",
    "businessLogic": "SAP's single centralized database architecture maintains real-time relational links between all business transactions. From any document in the chain, authorized users can drill up or down to inspect predecessor and successor records, proving compliance, tax integrity, and internal control.",
    "systemImpact": "Displays interactive tree showing Inquiry -> Quotation -> Sales Order -> Outbound Delivery -> Goods Issue -> Invoice -> Accounting Doc -> Payment Clearing.",
    "inputs": [
      {
        "field": "Sales Order",
        "value": "51"
      }
    ],
    "expectedOutput": "Unbroken document flow with every node displaying 'Completed' or 'Cleared'.",
    "tAccount": {
      "title": "Complete SD Order-to-Cash Three-Entry T-Account Summary",
      "debit": {
        "account": "1) PGI: COGS 6993000 ($10,000.00)\\n2) Inv: Trade Receivables 1200000 ($20,092.50) + Rebates Granted 4770000 ($1,307.50)\\n3) Pay: Bank 1810000 ($20,092.50)",
        "amount": "Total Debit Impact"
      },
      "credit": {
        "account": "1) PGI: Finished Goods Inventory 1110000 ($10,000.00)\\n2) Inv: Sales Revenue 4000000 ($21,400.00)\\n3) Pay: Trade Receivables 1200000 ($20,092.50)",
        "amount": "Total Credit Impact"
      }
    },
    "qa": {
      "question": "What is the primary audit purpose of the G/L Document Flow?",
      "answer": "It guarantees transparency and fraud prevention by providing an immutable chronological chain of custody: auditors can verify that every dollar of reported revenue originated from a legitimate customer order and a real physical delivery."
    }
  }
];
