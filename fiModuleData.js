// FI Module and Financial Statements Dataset
window.FI_MODULE_DATA = {
  "overview": {
    "title": "Financial Accounting (FI) Module Architecture",
    "description": "Financial Accounting (FI) in SAP S/4HANA records and manages all financial transactions of an enterprise to provide external regulatory reporting (Balance Sheet, Income Statement, Statement of Cash Flows) in compliance with US GAAP and IFRS.",
    "coreEquation": "ASSETS = LIABILITIES + OWNER'S EQUITY",
    "pillars": [
      {
        "title": "General Ledger (FI-GL)",
        "desc": "The central repository of all business accounting transactions, providing complete financial records for external auditing."
      },
      {
        "title": "Accounts Payable (FI-AP)",
        "desc": "Manages money owed to suppliers ('Money Out'). Tracks supplier invoices, open items, and executes outgoing payments."
      },
      {
        "title": "Accounts Receivable (FI-AR)",
        "desc": "Manages money owed by customers ('Money In'). Tracks customer invoices, credit limits, and processes incoming cash receipts."
      },
      {
        "title": "Asset Accounting (FI-AA)",
        "desc": "Tracks fixed assets (machinery, buildings, equipment) and records automated depreciation schedules."
      }
    ]
  },
  "apVsArComparison": [
    {
      "dimension": "Business Focus",
      "ap": "Supplier / Vendor Accounting (Money Out)",
      "ar": "Customer Accounting (Money In)"
    },
    {
      "dimension": "Primary Objective",
      "ap": "Track obligations owed to suppliers and disburse outgoing payments",
      "ar": "Track receivables owed by buyers and collect incoming payments"
    },
    {
      "dimension": "Originating ERP Process",
      "ap": "Procure-to-Pay (P2P) in Materials Management (MM)",
      "ar": "Order-to-Cash (O2C) in Sales and Distribution (SD)"
    },
    {
      "dimension": "Primary G/L Reconciliation Account",
      "ap": "3300000 (Trade Payables - Liability)",
      "ar": "1200000 (Trade Receivables - Asset)"
    },
    {
      "dimension": "Standard Invoice Document Type",
      "ap": "RE (Vendor Invoice from MIRO)",
      "ar": "RV (Customer Invoice from VF01)"
    },
    {
      "dimension": "Payment Document Type",
      "ap": "KZ (Vendor Payment from F-53)",
      "ar": "DZ (Customer Payment from F-28)"
    },
    {
      "dimension": "Key SAP Fiori Apps",
      "ap": "Create Supplier Invoice, Display Supplier Balances, Post Outgoing Payments",
      "ar": "Create Outgoing Invoices, Display Customer Balances, Post Incoming Payments"
    },
    {
      "dimension": "Clearing Status Meaning",
      "ap": "Supplier invoice matched with payment; liability settled to 0.00",
      "ar": "Customer invoice matched with payment; receivable settled to 0.00"
    }
  ],
  "exercises": [
    {
      "id": "gbi-balance-sheet",
      "title": "Exercise 1: Global Bike Balance Sheet Verification",
      "context": "Global Bike Inc. reports the following account balances at the close of the accounting period (Slide 17):",
      "rawAccounts": [
        {
          "account": "Cash",
          "amount": 10000,
          "category": "asset"
        },
        {
          "account": "Inventory",
          "amount": 8000,
          "category": "asset"
        },
        {
          "account": "Equipment",
          "amount": 12000,
          "category": "asset"
        },
        {
          "account": "Accounts Receivable",
          "amount": 5000,
          "category": "asset"
        },
        {
          "account": "Accounts Payable",
          "amount": 7000,
          "category": "liability"
        },
        {
          "account": "Bank Loan",
          "amount": 10000,
          "category": "liability"
        },
        {
          "account": "Owner's Capital",
          "amount": 18000,
          "category": "equity"
        }
      ],
      "solution": {
        "totalAssets": 35000,
        "totalLiabilities": 17000,
        "totalEquity": 18000,
        "totalLiabilitiesAndEquity": 35000,
        "equationVerified": true,
        "explanation": "Total Assets ($10k Cash + $8k Inventory + $12k Equipment + $5k AR = $35,000) equals Total Liabilities ($7k AP + $10k Bank Loan = $17,000) plus Owner's Equity ($18,000 Capital). The accounting equation balances perfectly at $35,000 = $35,000."
      }
    },
    {
      "id": "gbi-income-statement",
      "title": "Exercise 2: Global Bike Income Statement Calculation",
      "context": "During the subsequent operating period, Global Bike reports the following revenues and operational expenses (Slide 19):",
      "rawAccounts": [
        {
          "account": "Sales Revenue",
          "amount": 15000,
          "type": "revenue"
        },
        {
          "account": "Sales Returns and Allowances",
          "amount": 1000,
          "type": "contra-revenue"
        },
        {
          "account": "Cost of Goods Sold (COGS)",
          "amount": 6000,
          "type": "expense"
        },
        {
          "account": "Salaries Expense",
          "amount": 2500,
          "type": "expense"
        },
        {
          "account": "Rent Expense",
          "amount": 1500,
          "type": "expense"
        },
        {
          "account": "Utilities Expense",
          "amount": 500,
          "type": "expense"
        },
        {
          "account": "Income Tax Expense",
          "amount": 700,
          "type": "tax"
        }
      ],
      "solution": {
        "netSales": 14000,
        "grossProfit": 8000,
        "totalOperatingExpenses": 10500,
        "netIncomeBeforeTaxes": 3500,
        "taxExpense": 700,
        "netIncome": 2800,
        "explanation": "Net Sales = $15,000 - $1,000 = $14,000. Total Operating Expenses = $6,000 COGS + $2,500 Salaries + $1,500 Rent + $500 Utilities = $10,500. Net Income Before Taxes = $14,000 - $10,500 = $3,500. After Tax ($700), Net Income is $2,800."
      }
    },
    {
      "id": "thao-company-worksheet",
      "title": "Exercise 3: Thao Company Comprehensive Trial Balance (Slide 23)",
      "context": "Thao Company Worksheet for the year ended December 31, 2017. Adjusted Trial Balance shows Dr 103,700 and Cr 103,700. Prepare the Balance Sheet and verify the accounting equation:",
      "rawAccounts": [
        {
          "account": "Cash",
          "amount": 5300,
          "side": "dr",
          "category": "asset"
        },
        {
          "account": "Accounts Receivable",
          "amount": 10800,
          "side": "dr",
          "category": "asset"
        },
        {
          "account": "Supplies",
          "amount": 1500,
          "side": "dr",
          "category": "asset"
        },
        {
          "account": "Prepaid Insurance",
          "amount": 2000,
          "side": "dr",
          "category": "asset"
        },
        {
          "account": "Equipment",
          "amount": 27000,
          "side": "dr",
          "category": "asset"
        },
        {
          "account": "Accumulated Depreciation - Equipment",
          "amount": 5600,
          "side": "cr",
          "category": "contra-asset"
        },
        {
          "account": "Notes Payable",
          "amount": 15000,
          "side": "cr",
          "category": "liability"
        },
        {
          "account": "Accounts Payable",
          "amount": 6100,
          "side": "cr",
          "category": "liability"
        },
        {
          "account": "Salaries & Wages Payable",
          "amount": 2400,
          "side": "cr",
          "category": "liability"
        },
        {
          "account": "Interest Payable",
          "amount": 600,
          "side": "cr",
          "category": "liability"
        },
        {
          "account": "Owner's Capital",
          "amount": 13000,
          "side": "cr",
          "category": "equity"
        },
        {
          "account": "Owner's Drawings",
          "amount": 7000,
          "side": "dr",
          "category": "contra-equity"
        },
        {
          "account": "Service Revenue",
          "amount": 61000,
          "side": "cr",
          "category": "revenue"
        },
        {
          "account": "Advertising Expense",
          "amount": 8400,
          "side": "dr",
          "category": "expense"
        },
        {
          "account": "Supplies Expense",
          "amount": 4000,
          "side": "dr",
          "category": "expense"
        },
        {
          "account": "Depreciation Expense",
          "amount": 5600,
          "side": "dr",
          "category": "expense"
        },
        {
          "account": "Insurance Expense",
          "amount": 3500,
          "side": "dr",
          "category": "expense"
        },
        {
          "account": "Salaries & Wages Expense",
          "amount": 28000,
          "side": "dr",
          "category": "expense"
        },
        {
          "account": "Interest Expense",
          "amount": 600,
          "side": "dr",
          "category": "expense"
        }
      ],
      "solution": {
        "totalAssets": 41000,
        "totalLiabilities": 24100,
        "netIncome": 10900,
        "endingCapital": 16900,
        "totalLiabilitiesAndEquity": 41000,
        "equationVerified": true,
        "explanation": "1) Total Assets: Cash ($5,300) + AR ($10,800) + Supplies ($1,500) + Prepaid Ins ($2,000) + Net Equipment ($27,000 - $5,600 = $21,400) = $41,000.\\n2) Total Liabilities: Notes Payable ($15,000) + AP ($6,100) + Salaries Payable ($2,400) + Interest Payable ($600) = $24,100.\\n3) Net Income: Revenue ($61,000) - Total Expenses ($8,400 + $4,000 + $5,600 + $3,500 + $28,000 + $600 = $50,100) = $10,900.\\n4) Ending Owner's Equity: Capital ($13,000) + Net Income ($10,900) - Drawings ($7,000) = $16,900.\\n5) Verification: $24,100 (Liabilities) + $16,900 (Equity) = $41,000 = Total Assets!"
      }
    }
  ],
  "fiApSteps": [
    {
      "step": 1,
      "title": "Create Bank Account in General Ledger",
      "app": "Manage G/L Account Master Data",
      "code": "1801305 / Bank 130",
      "purpose": "Establish company checking account for disbursements"
    },
    {
      "step": 2,
      "title": "Create Reconciliation Account in General Ledger",
      "app": "Manage G/L Account Master Data",
      "code": "3300000 / Trade Payables",
      "purpose": "Link vendor subledger to main balance sheet"
    },
    {
      "step": 3,
      "title": "Create Expense Account in General Ledger",
      "app": "Manage G/L Account Master Data",
      "code": "7403000 / Rent Expense",
      "purpose": "Track facility lease costs on Income Statement"
    },
    {
      "step": 4,
      "title": "Create Vendor Master Record for Landlord",
      "app": "Manage Business Partner Master Data",
      "code": "Cardinal Properties 130",
      "purpose": "Create supplier record with payment terms and recon account"
    },
    {
      "step": 5,
      "title": "Post Transfer of Funds to Alternate Bank Account",
      "app": "Post General Journal Entries",
      "code": "JE 100000125",
      "purpose": "Transfer working capital into operating account"
    },
    {
      "step": 6,
      "title": "Review Transfer of Funds",
      "app": "Display G/L Account Balances",
      "code": "Bank Line Items",
      "purpose": "Verify bank balance reflects transferred liquidity"
    },
    {
      "step": 7,
      "title": "Create Invoice Receipt for Rent Expense",
      "app": "Create Supplier Invoice (MIRO)",
      "code": "Inv 5105600535",
      "purpose": "Debit Rent Expense, Credit Accounts Payable for Landlord"
    },
    {
      "step": 8,
      "title": "Display & Review G/L Balances",
      "app": "Display G/L Account Balances",
      "code": "FS10N",
      "purpose": "Verify Rent Expense debit and AP credit in ledger"
    },
    {
      "step": 9,
      "title": "Display & Review AP Balances",
      "app": "Display Supplier Balances",
      "code": "FK10N",
      "purpose": "Verify Landlord has open payable balance"
    },
    {
      "step": 10,
      "title": "Post Outgoing Payment to Landlord",
      "app": "Post Outgoing Payments (F-53)",
      "code": "Payment JE",
      "purpose": "Disburse rent funds, debiting AP and crediting Bank"
    },
    {
      "step": 11,
      "title": "Display & Review AP Balances (Cleared State)",
      "app": "Manage Supplier Line Items",
      "code": "FBL1N",
      "purpose": "Verify Landlord open items now have green clearing checkmarks"
    },
    {
      "step": 12,
      "title": "Run Financial Statement (Balance Sheet & Income Statement)",
      "app": "Balance Sheet / Income Statement",
      "code": "F.01",
      "purpose": "Generate external financial reporting reflecting updated balances"
    }
  ]
};
