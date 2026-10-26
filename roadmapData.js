// Zero-to-A+ Progressive Learning Roadmap Data
window.ROADMAP_DATA = [
  {
    level: 1,
    title: "Level 1: Foundations of MIS & Information Systems",
    subtitle: "From absolute zero to understanding how organizations manage information",
    badge: "Beginner",
    color: "blue",
    description: "Master the fundamental definitions, components, and human capabilities required in modern Management Information Systems.",
    lessons: [
      {
        id: "mis-definitions",
        title: "1.1 The MIS Triad: MIS vs. ERP vs. SAP",
        summary: "Demystifying the three core terms often confused by beginners.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              Understanding enterprise technology starts with distinguishing between the broad discipline, the software category, and the specific vendor solution:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
              <div class="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                <div class="font-bold text-blue-900 text-lg mb-1">MIS</div>
                <div class="text-xs font-semibold text-blue-600 uppercase mb-2">Management Information Systems</div>
                <p class="text-sm text-slate-600">The overarching discipline and framework of hardware, software, data, procedures, and people that collects, processes, and presents information to support managerial decision-making.</p>
              </div>
              <div class="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                <div class="font-bold text-purple-900 text-lg mb-1">ERP</div>
                <div class="text-xs font-semibold text-purple-600 uppercase mb-2">Enterprise Resource Planning</div>
                <p class="text-sm text-slate-600">A unified software category designed to integrate all core business functions (finance, procurement, manufacturing, sales, HR) onto a single real-time database.</p>
              </div>
              <div class="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div class="font-bold text-emerald-900 text-lg mb-1">SAP</div>
                <div class="text-xs font-semibold text-emerald-600 uppercase mb-2">Systems, Applications & Products</div>
                <p class="text-sm text-slate-600">The market-leading German software enterprise that developed SAP ECC and the next-generation intelligent ERP suite: <strong>SAP S/4HANA</strong> (running on an in-memory database).</p>
              </div>
            </div>
            <div class="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-900 rounded-r-lg">
              <strong>Exam Takeaway:</strong> MIS is the management discipline; ERP is the integrated system architecture; SAP is the premier software company and platform.
            </div>
          </div>
        `
      },
      {
        id: "mis-components",
        title: "1.2 The Five-Component MIS Framework",
        summary: "Hardware, Software, Data, Procedures, and People—and why People are paramount.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              An Information System consists of five interconnected components that bridge the computer side to the human side:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 text-center my-4">
              <div class="p-3 rounded-lg bg-slate-100 border border-slate-300">
                <div class="text-2xl mb-1">🖥️</div>
                <div class="font-bold text-slate-800 text-sm">Hardware</div>
                <div class="text-xs text-slate-500 mt-1">Computer Side<br>(Speed, processing, storage)</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-100 border border-slate-300">
                <div class="text-2xl mb-1">💾</div>
                <div class="font-bold text-slate-800 text-sm">Software</div>
                <div class="text-xs text-slate-500 mt-1">Instructions<br>(Transforms hardware into tool)</div>
              </div>
              <div class="p-3 rounded-lg bg-indigo-50 border-2 border-indigo-400">
                <div class="text-2xl mb-1">🗄️</div>
                <div class="font-bold text-indigo-900 text-sm">Data</div>
                <div class="text-xs text-indigo-600 mt-1">The Bridge<br>(Raw facts turned into insight)</div>
              </div>
              <div class="p-3 rounded-lg bg-slate-100 border border-slate-300">
                <div class="text-2xl mb-1">📋</div>
                <div class="font-bold text-slate-800 text-sm">Procedures</div>
                <div class="text-xs text-slate-500 mt-1">Instructions<br>(Rules & standardized methods)</div>
              </div>
              <div class="p-3 rounded-lg bg-amber-50 border-2 border-amber-500">
                <div class="text-2xl mb-1">👥</div>
                <div class="font-bold text-amber-900 text-sm">People</div>
                <div class="text-xs text-amber-700 font-bold mt-1">Human Side<br>MOST CRITICAL!</div>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
              <h4 class="font-semibold text-slate-800">Why is 'People' the most important component? (Frequent Exam Question)</h4>
              <p class="text-slate-600">
                Even the most expensive technology, cleanest data, and well-designed procedures are worthless without skilled, motivated human beings. People interpret insights, exercise judgment, execute governance, and adapt the system to evolving business needs. Without proper training and human collaboration, systems suffer underutilization or data contamination.
              </p>
            </div>
          </div>
        `
      },
      {
        id: "non-routine-skills",
        title: "1.3 Robert Reich's Four Non-Routine Cognitive Skills",
        summary: "The essential mental models needed to thrive in an ERP and MIS environment.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              To gain career security and excel in MIS, former Secretary of Labor Robert Reich identified four critical cognitive skills that computers cannot automate:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 font-bold text-blue-700 text-base mb-1">
                  <span class="p-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm">1</span> Abstract Thinking / Reasoning
                </div>
                <p class="text-sm text-slate-600 mt-2">The ability to construct a mental model of an idea, concept, or raw data, seeing patterns and trends to derive meaningful business insights (e.g., a financial analyst interpreting market indicators, or a data analyst creating visualizations from raw logs).</p>
              </div>
              <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 font-bold text-emerald-700 text-base mb-1">
                  <span class="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm">2</span> Systems Thinking
                </div>
                <p class="text-sm text-slate-600 mt-2">The ability to model inputs, processes, and outputs of a system and connect how one department's action affects the entire enterprise (e.g., a software architect designing an app while evaluating how it interacts with security protocols, database queries, and external APIs).</p>
              </div>
              <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 font-bold text-purple-700 text-base mb-1">
                  <span class="p-1.5 bg-purple-100 text-purple-800 rounded-lg text-sm">3</span> Collaboration
                </div>
                <p class="text-sm text-slate-600 mt-2">Developing ideas, giving and receiving critical feedback, and aligning multi-disciplinary teams toward a common objective (e.g., surgeons, anesthesiologists, and nurses coordinating in surgery, or cross-functional marketing and engineering teams creating a new product).</p>
              </div>
              <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center gap-2 font-bold text-amber-700 text-base mb-1">
                  <span class="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm">4</span> Ability to Experiment
                </div>
                <p class="text-sm text-slate-600 mt-2">Making reasoned analyses of opportunities, developing promising solutions, evaluating alternatives, and testing prototypes without fear of failure (e.g., a product manager deploying pilot services in test markets, or a developer iterating new features with user feedback).</p>
              </div>
            </div>
            <div class="bg-rose-50 border-l-4 border-rose-500 p-3 text-sm text-rose-900 rounded-r-lg">
              <strong>Exam Trap Warning:</strong> Moore's Law states that chip transistor density doubles roughly every 18-24 months (hardware processing power doubles while hardware cost halves). <em>It does NOT guarantee software implementation costs will halve!</em> In fact, ERP implementations often become more complex over time due to business process demands.
            </div>
          </div>
        `
      }
    ]
  },
  {
    level: 2,
    title: "Level 2: Strategic Advantage, Porter's Models & Value Chain",
    subtitle: "How information systems generate sustainable competitive advantage",
    badge: "Intermediate",
    color: "emerald",
    description: "Master Porter's Five Forces, Four Competitive Strategies, and Value Chain Analysis with exact corporate case studies from your exam.",
    lessons: [
      {
        id: "porters-five-forces",
        title: "2.1 Porter's Five Forces Model (Industry Structure Analysis)",
        summary: "Analyzing the competitive environment with exam-tested real-world examples.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              Michael Porter established that five competitive forces determine the profitability and attractiveness of any industry:
            </p>
            <div class="space-y-3">
              <div class="p-3 rounded-lg bg-slate-50 border-l-4 border-blue-600">
                <div class="font-bold text-slate-800">1. Bargaining Power of Suppliers</div>
                <div class="text-xs text-blue-700 font-semibold mb-1">Course Exam Examples:</div>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li><strong>Commercial Aircraft:</strong> Boeing & Airbus dominate the market due to massive capital barriers, proprietary technology, and regulatory hurdles &rarr; <em>Strong Supplier Power</em>.</li>
                  <li><strong>Luxury Fashion / Exclusive Jewelry:</strong> Consumers have virtually no bargaining leverage because brand exclusivity gives the supplier total pricing power.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border-l-4 border-emerald-600">
                <div class="font-bold text-slate-800">2. Bargaining Power of Buyers</div>
                <div class="text-xs text-emerald-700 font-semibold mb-1">Course Exam Example:</div>
                <p class="text-sm text-slate-600"><strong>Large Retail Chains (Walmart):</strong> Because Walmart purchases immense volumes of products, they force suppliers to lower their wholesale prices &rarr; <em>Strong Buyer Power</em>.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border-l-4 border-purple-600">
                <div class="font-bold text-slate-800">3. Threat of Substitutes</div>
                <div class="text-xs text-purple-700 font-semibold mb-1">Course Exam Examples:</div>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li><strong>Streaming Platforms (Netflix, YouTube):</strong> Offer digital alternatives that replace traditional cable TV subscriptions &rarr; <em>High Threat of Substitutes</em>.</li>
                  <li><strong>Life-Saving Pharmaceuticals:</strong> For patented critical medications with no alternative treatments, patients have no substitutes &rarr; <em>Low Threat of Substitutes</em>.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border-l-4 border-amber-600">
                <div class="font-bold text-slate-800">4. Threat of New Entrants</div>
                <div class="text-xs text-amber-700 font-semibold mb-1">Course Exam Concept:</div>
                <p class="text-sm text-slate-600">High capital requirements, complex R&D, and government patents prevent new companies from entering the industry (e.g., semiconductor fabrication or commercial aerospace &rarr; <em>Low Threat of New Entrants</em>).</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 border-l-4 border-rose-600">
                <div class="font-bold text-slate-800">5. Rivalry Among Existing Competitors</div>
                <div class="text-xs text-rose-700 font-semibold mb-1">Course Exam Example:</div>
                <p class="text-sm text-slate-600"><strong>Automotive Industry:</strong> Toyota, Ford, Honda, and GM engage in continuous price wars, model refreshes, and intense marketing campaigns &rarr; <em>Strong Competitive Rivalry</em>.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "competitive-strategies",
        title: "2.2 Porter's Four Competitive Strategies Matrix",
        summary: "The 2x2 grid governing how organizations position themselves to win.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              An organization chooses its competitive strategy based on its <strong>Competitive Advantage</strong> (Low Cost vs. Differentiation) and its <strong>Competitive Scope</strong> (Broad Industry-Wide vs. Focused Niche):
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div class="p-4 rounded-xl border-2 border-blue-400 bg-blue-50/60">
                <div class="text-xs uppercase font-bold text-blue-700 tracking-wider">Broad Market + Low Cost</div>
                <h4 class="text-lg font-bold text-blue-950 mt-1">Cost Leadership</h4>
                <p class="text-sm text-slate-600 mt-2">Providing lowest price across entire industry by aggressive operational efficiency and scale.</p>
                <div class="mt-3 pt-3 border-t border-blue-200 text-xs text-blue-900 font-medium">
                  <strong>Exam Cases:</strong>
                  <ul class="list-disc list-inside mt-1">
                    <li><strong>Walmart:</strong> Massive purchasing volume and supply chain efficiency.</li>
                    <li><strong>IKEA:</strong> Flat-pack ready-to-assemble furniture passing savings to European & global shoppers.</li>
                  </ul>
                </div>
              </div>
              <div class="p-4 rounded-xl border-2 border-purple-400 bg-purple-50/60">
                <div class="text-xs uppercase font-bold text-purple-700 tracking-wider">Broad Market + Uniqueness</div>
                <h4 class="text-lg font-bold text-purple-950 mt-1">Differentiation Leadership</h4>
                <p class="text-sm text-slate-600 mt-2">Offering industry-wide unique, premium products with superior design, branding, and customer experience.</p>
                <div class="mt-3 pt-3 border-t border-purple-200 text-xs text-purple-900 font-medium">
                  <strong>Exam Cases:</strong>
                  <ul class="list-disc list-inside mt-1">
                    <li><strong>Apple:</strong> Premium prices for innovative design, ease-of-use, and supreme ecosystem security.</li>
                    <li><strong>Nike:</strong> Distinctive branding, performance innovation, and celebrity endorsements.</li>
                  </ul>
                </div>
              </div>
              <div class="p-4 rounded-xl border-2 border-emerald-400 bg-emerald-50/60">
                <div class="text-xs uppercase font-bold text-emerald-700 tracking-wider">Niche Segment + Low Cost</div>
                <h4 class="text-lg font-bold text-emerald-950 mt-1">Cost Focus</h4>
                <p class="text-sm text-slate-600 mt-2">Offering the lowest prices strictly within a narrow, specific target demographic or geographic niche.</p>
                <div class="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-900 font-medium">
                  <strong>Exam Cases:</strong>
                  <ul class="list-disc list-inside mt-1">
                    <li><strong>Southwest Airlines:</strong> Low fares on short-haul point-to-point flights with limited amenities for budget travelers.</li>
                    <li><strong>Aldi:</strong> Limited selection of private-label items and compact stores for budget grocery shoppers.</li>
                  </ul>
                </div>
              </div>
              <div class="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/60">
                <div class="text-xs uppercase font-bold text-amber-700 tracking-wider">Niche Segment + Uniqueness</div>
                <h4 class="text-lg font-bold text-amber-950 mt-1">Differentiation Focus</h4>
                <p class="text-sm text-slate-600 mt-2">Providing highly customized, ultra-exclusive offerings to an elite or specialized demographic.</p>
                <div class="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-900 font-medium">
                  <strong>Exam Cases:</strong>
                  <ul class="list-disc list-inside mt-1">
                    <li><strong>Rolex:</strong> Exclusive precision luxury watches targeting ultra-high-income status seekers.</li>
                    <li><strong>Lamborghini:</strong> Handcrafted supercar exotics targeting high-net-worth collectors who prioritize speed over price.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "value-chain-processes",
        title: "2.3 The Value Chain & Why Business Processes Matter",
        summary: "Primary activities, support activities, and why establishing processes early prevents data silos.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              Porter's <strong>Value Chain</strong> model outlines the sequence of activities through which a firm creates value for customers:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 text-sm mb-2">5 Primary Activities (Direct Physical Value)</h4>
                <ol class="list-decimal list-inside text-sm text-slate-600 space-y-1">
                  <li><strong>Inbound Logistics:</strong> Receiving, storing, and disseminating raw materials (NutriNest sourcing packaging and organic ingredients).</li>
                  <li><strong>Operations:</strong> Transforming inputs into finished products (assembling bicycles or packaging nutritional formulas).</li>
                  <li><strong>Outbound Logistics:</strong> Collecting, storing, and physically distributing products to buyers.</li>
                  <li><strong>Marketing & Sales:</strong> Inducing buyers to purchase (pricing, promotions, quotations).</li>
                  <li><strong>Service:</strong> Maintaining and enhancing product value after the sale (warranties, repairs).</li>
                </ol>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 text-sm mb-2">4 Support Activities (Enabling Backbone)</h4>
                <ul class="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li><strong>Procurement:</strong> Finding suppliers, negotiating contracts, and releasing POs (supports Inbound Logistics and Operations).</li>
                  <li><strong>Human Resource Management:</strong> Recruiting, training staff in compliance, supplier evaluations, and document handling.</li>
                  <li><strong>Technology Development:</strong> Equipment maintenance, IT architecture, software engineering, and R&D.</li>
                  <li><strong>Firm Infrastructure:</strong> General management, legal, accounting, finance, and quality assurance.</li>
                </ul>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-sm space-y-2">
              <h4 class="font-semibold text-indigo-950">Why Establish Business Processes Early? (Exam Question)</h4>
              <p class="text-indigo-900">
                1. <strong>Efficiency & Consistency:</strong> Reduces errors, eliminates operational bottlenecks, and ensures repeatable customer satisfaction.<br>
                2. <strong>Scalability:</strong> Structured workflows allow rapid onboarding of new hires and frictionless expansion into new regions.<br>
                3. <strong>Preventing Information Silos:</strong> Disconnected departmental applications trap data, creating inconsistent records, duplicated effort, and blind spots in executive decision-making. ERP solves this by unifying data into a single source of truth.
              </p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    level: 3,
    title: "Level 3: Global Bike Inc. (GBI) Enterprise Model",
    subtitle: "The real-world business case study underpinning your SAP lab assignments",
    badge: "Intermediate",
    color: "purple",
    description: "Understand the corporate merger, organizational chart, dual accounting standards, and IT strategy of Global Bike.",
    lessons: [
      {
        id: "gbi-background",
        title: "3.1 Global Bike Inc. Background & Co-CEO Structure",
        summary: "Frankenstein Bikes (USA) + Heidelberg Composites (Germany) merger.",
        content: `
          <div class="space-y-4">
            <p class="text-slate-700 leading-relaxed">
              Global Bike Inc. (GBI) was founded in <strong>2001</strong> through the merger of two innovative bicycle manufacturers:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-slate-900">🇺🇸 John Davis (Co-CEO)</div>
                <div class="text-xs text-blue-600 font-semibold mb-2">Former Frankenstein Bikes (USA)</div>
                <p class="text-sm text-slate-600">Focuses on sales, marketing, and customer-facing processes. GBI's US operations are headquartered in <strong>Dallas, Texas</strong>.</p>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="font-bold text-slate-900">🇩🇪 Peter Schwarz (Co-CEO)</div>
                <div class="text-xs text-emerald-600 font-semibold mb-2">Former Heidelberg Composites (Germany)</div>
                <p class="text-sm text-slate-600">Focuses on product engineering, research, and manufacturing. European operations are based in <strong>Heidelberg, Germany</strong>.</p>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-sm space-y-2">
              <h4 class="font-bold text-slate-800">Organizational Implications for the ERP Project:</h4>
              <ul class="list-disc list-inside text-slate-600 space-y-1">
                <li><strong>Cross-functional Coordination:</strong> With two co-CEOs dividing customer-facing and production responsibilities, the ERP system must ensure seamless data flow between sales orders, production planning, and procurement.</li>
                <li><strong>Multi-Accounting Standards:</strong> GBI operates under <strong>US GAAP</strong> for US company code (<code>US00</code>) and <strong>IFRS</strong> for German company code (<code>DE00</code>). SAP S/4HANA must support dual ledgers.</li>
                <li><strong>Hybrid Supply Chain:</strong> GBI outsources carbon frame production to specialty suppliers while handling final assembly in Dallas and Heidelberg. Real-time supply chain integration is critical.</li>
                <li><strong>Centralized IT in Dallas:</strong> All enterprise IT infrastructure is maintained centrally in Dallas, requiring secure role-based access control (RBAC).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        id: "gbi-pre-post-erp",
        title: "3.2 Weaknesses Prior to ERP vs. Expected Benefits",
        summary: "Why GBI transitioned to SAP S/4HANA and what business value was unlocked.",
        content: `
          <div class="space-y-4">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm border-collapse border border-slate-200">
                <thead class="bg-slate-100 text-slate-700">
                  <tr>
                    <th class="p-3 border border-slate-200 text-left w-1/2">Weaknesses Prior to ERP Implementation</th>
                    <th class="p-3 border border-slate-200 text-left w-1/2">Expected Benefits from SAP S/4HANA</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td class="p-3 border border-slate-200"><strong>Fragmented Systems:</strong> Each division ran isolated software, creating conflicting data, duplication, and lack of visibility.</td>
                    <td class="p-3 border border-slate-200"><strong>Single Centralized Database:</strong> All departments view identical real-time numbers with zero redundant data entry.</td>
                  </tr>
                  <tr>
                    <td class="p-3 border border-slate-200"><strong>High Operational IT Costs:</strong> Maintaining separate legacy environments in USA and Germany inflated support budgets.</td>
                    <td class="p-3 border border-slate-200"><strong>Standardized Global Processes:</strong> Consolidated IT in Dallas reduces license and infrastructure overhead.</td>
                  </tr>
                  <tr>
                    <td class="p-3 border border-slate-200"><strong>Supply Chain Blind Spots:</strong> Inability to trace material availability caused stockouts and delivery delays.</td>
                    <td class="p-3 border border-slate-200"><strong>End-to-End Traceability:</strong> Real-time ATP (Available-to-Promise) and automated document audit trails.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      }
    ]
  },
  {
    level: 4,
    title: "Level 4: Materials Management (MM) & Procure-to-Pay (P2P)",
    subtitle: "From Purchase Requisition to Vendor Outgoing Payment",
    badge: "Advanced",
    color: "amber",
    description: "Master organizational elements, master data, the 8-stage P2P cycle, the 3-Way Match, and GR/IR clearing.",
    lessons: [
      {
        id: "mm-org-master",
        title: "4.1 MM Organizational Structure & Master Data",
        summary: "Client, Company Code, Plant, Storage Locations, Purchasing Org/Group, and Master Data views.",
        content: `
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 text-sm mb-2">MM Organizational Hierarchy</h4>
                <ul class="text-sm text-slate-600 space-y-2">
                  <li>🏢 <strong>Client:</strong> Highest level in SAP (e.g., Client <code>###</code>). Shared system database.</li>
                  <li>🏛️ <strong>Company Code:</strong> Independent accounting unit (e.g., <code>US00</code> Global Bike Inc. US).</li>
                  <li>🏭 <strong>Plant:</strong> Manufacturing or distribution facility (e.g., <code>MI00</code> Miami Plant, <code>DL00</code> Dallas).</li>
                  <li>📦 <strong>Storage Location:</strong> Physical warehouse area.
                    <div class="text-xs text-slate-500 pl-4 mt-1">
                      &bull; <code>TG00</code>: Trading Goods (goods purchased for resale without assembly)<br>
                      &bull; <code>FG00</code>: Finished Goods (internally assembled bicycles)
                    </div>
                  </li>
                  <li>💼 <strong>Purchasing Organization / Group:</strong> Negotiates terms with suppliers (e.g., <code>US00</code> US Purchasing Org, <code>N00</code> North America Purchasing Group).</li>
                </ul>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 class="font-bold text-slate-800 text-sm mb-2">MM Master Data Views</h4>
                <ul class="text-sm text-slate-600 space-y-2">
                  <li>🤝 <strong>Business Partner (Vendor Master):</strong>
                    <div class="text-xs text-slate-500 pl-4 mt-0.5">
                      &bull; Role <code>FLVN00</code>: FI Vendor (Financial accounting data & reconciliation account <code>3300000</code>)<br>
                      &bull; Role <code>FLVN01</code>: Purchasing Vendor (Order currency, payment terms)
                    </div>
                  </li>
                  <li>⚙️ <strong>Material Master:</strong>
                    <div class="text-xs text-slate-500 pl-4 mt-0.5">
                      &bull; <code>ROH</code>: Raw Materials | <code>HALB</code>: Semi-finished<br>
                      &bull; <code>FERT</code>: Finished Goods | <code>HAWA</code>: Trading Goods (Chain Lock <code>CHLK1###</code>)
                    </div>
                  </li>
                  <li>📜 <strong>Purchasing Info Record (PIR):</strong> Connects a specific vendor with a specific material (agreed price, lead time).</li>
                </ul>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "mm-p2p-cycle",
        title: "4.2 The Procure-to-Pay (P2P) 8-Stage Cycle & 3-Way Match",
        summary: "The chronological flow of purchasing and the fraud-prevention matching mechanism.",
        content: `
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
              <h4 class="font-bold text-amber-950 mb-2">8-Stage Chronological Flow:</h4>
              <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">1. Purchase Requisition</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">2. RFQ & Vendor Selection</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">3. Purchase Order (PO)</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">4. Notify Vendor</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">5. Vendor Shipment</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">6. Goods Receipt (GR)</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">7. Invoice Verification</span>
                <span>&rarr;</span>
                <span class="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-amber-900">8. Outgoing Payment</span>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-3">
              <h4 class="font-bold text-slate-800">The 3-Way Match (Fraud Prevention):</h4>
              <p class="text-slate-600">
                Before releasing an invoice for payment, SAP automatically matches three critical documents:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-slate-800 text-xs uppercase">Document 1</div>
                  <div class="font-semibold text-blue-600 text-sm mt-1">Purchase Order (PO)</div>
                  <div class="text-xs text-slate-500 mt-1">Agreed Price & Quantities</div>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-slate-800 text-xs uppercase">Document 2</div>
                  <div class="font-semibold text-emerald-600 text-sm mt-1">Goods Receipt (GR)</div>
                  <div class="text-xs text-slate-500 mt-1">Actual Delivered Quantities</div>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-slate-800 text-xs uppercase">Document 3</div>
                  <div class="font-semibold text-purple-600 text-sm mt-1">Supplier Invoice (IR)</div>
                  <div class="text-xs text-slate-500 mt-1">Billed Amount & Terms</div>
                </div>
              </div>
              <p class="text-xs text-slate-500 italic">
                If billed price exceeds PO price or billed quantity exceeds received quantity, SAP places a payment block on the invoice until an authorized manager reviews the discrepancy.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm space-y-2">
              <h4 class="font-bold text-blue-950">The GR/IR Clearing Account (9100000):</h4>
              <p class="text-blue-900">
                Because Goods Receipt and Supplier Invoice rarely arrive at the exact same second, SAP uses a temporary liability suspense account called <strong>GR/IR (Goods Receipt / Invoice Receipt)</strong>:
              </p>
              <ul class="list-disc list-inside text-xs text-blue-800 space-y-1 font-mono">
                <li>At Goods Receipt: Debit Inventory (Asset) | Credit GR/IR 9100000 (Temp Liability)</li>
                <li>At Supplier Invoice: Debit GR/IR 9100000 (Clear Temp) | Credit Accounts Payable 3300000 (Vendor Liability)</li>
                <li>At Payment: Debit Accounts Payable 3300000 | Credit Bank 1810000 (Asset)</li>
              </ul>
              <p class="text-xs text-blue-900 font-medium">
                Net result: GR/IR balances to <strong>$0.00</strong> when both goods and invoices are matched.
              </p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    level: 5,
    title: "Level 5: Sales & Distribution (SD) & Order-to-Cash (O2C)",
    subtitle: "From Customer Inquiry to Incoming Payment & G/L Document Flow",
    badge: "Advanced",
    color: "blue",
    description: "Master Sales Areas, the 7-stage O2C cycle, Outbound Delivery vs Goods Issue, and financial document flow.",
    lessons: [
      {
        id: "sd-org-master",
        title: "5.1 SD Organizational Structure & Master Data",
        summary: "Sales Organization, Distribution Channel, Division, and Sales Area.",
        content: `
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-3">
              <h4 class="font-bold text-slate-800">The Sales Area Triad (Vital Exam Concept):</h4>
              <p class="text-slate-600">
                In SAP SD, all sales transactions must be executed within a defined <strong>Sales Area</strong>, which is a unique combination of three units:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-blue-800">1. Sales Organization</div>
                  <div class="text-xs text-slate-500 mt-1">Distributes goods, negotiates sales terms (e.g., <code>UE00</code> US East, <code>UW00</code> US West).</div>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-purple-800">2. Distribution Channel</div>
                  <div class="text-xs text-slate-500 mt-1">Path by which products reach customers (e.g., <code>WH</code> Wholesale, <code>RE</code> Retail, <code>IN</code> Internet).</div>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <div class="font-bold text-emerald-800">3. Division</div>
                  <div class="text-xs text-slate-500 mt-1">Product group or business sector (e.g., <code>BI</code> Bicycles, <code>AS</code> Accessories).</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "sd-o2c-cycle",
        title: "5.2 The Order-to-Cash (O2C) Process Cycle",
        summary: "Inquiry, Quotation, Order, Shipping, Goods Issue, Billing, and Payment.",
        content: `
          <div class="space-y-4">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm border-collapse border border-slate-200">
                <thead class="bg-slate-100 text-slate-700">
                  <tr>
                    <th class="p-2.5 border border-slate-200 text-left">Stage</th>
                    <th class="p-2.5 border border-slate-200 text-left">T-Code / App</th>
                    <th class="p-2.5 border border-slate-200 text-left">Module</th>
                    <th class="p-2.5 border border-slate-200 text-left">Accounting Impact?</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td class="p-2.5 border border-slate-200 font-semibold">1. Customer Inquiry</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VA11 / Create Inquiry</td>
                    <td class="p-2.5 border border-slate-200 text-blue-600 font-semibold">SD</td>
                    <td class="p-2.5 border border-slate-200 text-slate-400">None (Pre-sales inquiry)</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 border border-slate-200 font-semibold">2. Customer Quotation</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VA21 / Create Quotation</td>
                    <td class="p-2.5 border border-slate-200 text-blue-600 font-semibold">SD</td>
                    <td class="p-2.5 border border-slate-200 text-slate-400">None (Legally binding price offer)</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 border border-slate-200 font-semibold">3. Sales Order</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VA01 / Create Sales Order</td>
                    <td class="p-2.5 border border-slate-200 text-blue-600 font-semibold">SD</td>
                    <td class="p-2.5 border border-slate-200 text-slate-400">None (ATP check, reserves stock)</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 border border-slate-200 font-semibold">4. Outbound Delivery (Picking/Packing)</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VL01N / Outbound Delivery</td>
                    <td class="p-2.5 border border-slate-200 text-amber-600 font-semibold">LE / WM</td>
                    <td class="p-2.5 border border-slate-200 text-slate-400">None (Logistical staging)</td>
                  </tr>
                  <tr class="bg-emerald-50/50">
                    <td class="p-2.5 border border-slate-200 font-bold text-emerald-900">5. Post Goods Issue (PGI)</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VL02N / Post Goods Issue</td>
                    <td class="p-2.5 border border-slate-200 text-emerald-700 font-bold">MM + FI</td>
                    <td class="p-2.5 border border-slate-200 text-emerald-800 font-semibold">YES! Debit COGS (6993000), Credit Inventory (1110000)</td>
                  </tr>
                  <tr class="bg-blue-50/50">
                    <td class="p-2.5 border border-slate-200 font-bold text-blue-900">6. Billing Document (Invoice)</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">VF01 / Create Billing Doc</td>
                    <td class="p-2.5 border border-slate-200 text-blue-700 font-bold">SD + FI</td>
                    <td class="p-2.5 border border-slate-200 text-blue-800 font-semibold">YES! Debit AR (1200000), Credit Sales Revenue (4000000)</td>
                  </tr>
                  <tr class="bg-purple-50/50">
                    <td class="p-2.5 border border-slate-200 font-bold text-purple-900">7. Incoming Payment</td>
                    <td class="p-2.5 border border-slate-200 font-mono text-xs">F-28 / Incoming Payment</td>
                    <td class="p-2.5 border border-slate-200 text-purple-700 font-bold">FI</td>
                    <td class="p-2.5 border border-slate-200 text-purple-800 font-semibold">YES! Debit Bank (1810000), Credit AR (1200000). Clears item!</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 text-sm text-amber-900 rounded-r-lg">
              <strong>Key Exam Distinction:</strong><br>
              &bull; <em>Outbound Delivery Document:</em> Handles logistics (picking, packing, transportation scheduling). Does not alter financial accounts.<br>
              &bull; <em>Goods Issue Document:</em> Created when physical goods leave the warehouse door. Alters inventory balance and posts COGS to General Ledger!
            </div>
          </div>
        `
      }
    ]
  },
  {
    level: 6,
    title: "Level 6: Financial Accounting (FI) Integration & Exam Mastery",
    subtitle: "Balance Sheets, Income Statements, T-Accounts, and Exam Secrets",
    badge: "A+ Mastery",
    color: "rose",
    description: "Prepare the balance sheet, verify the accounting equation, reconcile AR/AP, and lock in your A+ grade.",
    lessons: [
      {
        id: "fi-statements",
        title: "6.1 The Accounting Equation & Financial Statements",
        summary: "Assets = Liabilities + Equity, Income Statement structure, GBI & Thao Company exercises.",
        content: `
          <div class="space-y-6">
            <!-- Golden Equation -->
            <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white text-center shadow-md border border-indigo-900/50">
              <div class="text-xs uppercase font-bold tracking-wider text-indigo-300">The Golden Equation of Accounting</div>
              <div class="text-2xl md:text-3xl font-extrabold font-mono text-emerald-400 mt-1">ASSETS = LIABILITIES + OWNER'S EQUITY</div>
              <p class="text-xs text-slate-300 mt-2 max-w-xl mx-auto">Every transaction in SAP S/4HANA (PGI, Invoice, Payment, GR/IR) maintains this balance across real-time General Ledger accounts.</p>
            </div>

            <!-- Direct Jump Banner -->
            <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div class="font-bold text-sm text-emerald-950 dark:text-emerald-200">📊 Full Interactive Financial Statements Module Available</div>
                <div class="text-xs text-emerald-700 dark:text-emerald-400">Explore the complete Global Bike Balance Sheet, Income Statement, and Thao Company Worksheet solver with slide previews.</div>
              </div>
              <button onclick="window.switchTab('fi-module')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer">
                <span>📊</span> Open Financial Statements Tab &rarr;
              </button>
            </div>

            <!-- Two Statements Side-by-Side Summary -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Balance Sheet Card -->
              <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span>🏛️</span> Balance Sheet
                  </h4>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Point in Time</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400">Snapshot of the organization\'s financial condition at a specific moment in time (e.g., Dec 31).</p>
                <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-750 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div class="font-bold text-blue-600 dark:text-blue-400">Total Assets = $35,000 (GBI)</div>
                  <div class="text-slate-500 pl-2">&bull; Cash: $10,000 &bull; AR: $5,000</div>
                  <div class="text-slate-500 pl-2">&bull; Inventory: $8,000 &bull; Equip: $12,000</div>
                  <div class="border-t border-slate-200 dark:border-slate-600 pt-1 font-bold text-emerald-600 dark:text-emerald-400">Liabilities + Equity = $35,000</div>
                  <div class="text-slate-500 pl-2">&bull; AP: $7,000 &bull; Bank Loan: $10,000</div>
                  <div class="text-slate-500 pl-2">&bull; Owner\'s Capital: $18,000</div>
                </div>
              </div>

              <!-- Income Statement Card -->
              <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span>📈</span> Income Statement
                  </h4>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Period of Time</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400">Shows operating performance (revenues, expenses, and profitability) over an elapsed duration.</p>
                <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-750 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div class="text-blue-600 dark:text-blue-400 font-semibold">Sales Revenue: $15,000 - Returns $1k = $14k Net</div>
                  <div class="text-amber-600 dark:text-amber-400 pl-2">- Cost of Goods Sold (COGS): $6,000</div>
                  <div class="font-bold text-emerald-600 dark:text-emerald-400">= Gross Profit: $8,000 (57.1%)</div>
                  <div class="text-slate-500 pl-2">- Operating Exp (Salaries/Rent/Util): $4,500</div>
                  <div class="text-slate-500 pl-2">- Income Tax: $700</div>
                  <div class="border-t border-slate-200 dark:border-slate-600 pt-1 font-extrabold text-rose-600 dark:text-rose-400">= NET INCOME: $2,800 (20.0%)</div>
                </div>
              </div>
            </div>

            <!-- Thao Company Problem Summary -->
            <div class="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 space-y-2">
              <div class="flex items-center justify-between font-bold text-sm">
                <span>📝 Thao Company Worksheet Solution (Slide 23)</span>
                <span class="text-xs bg-indigo-200 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded">Exam Classic</span>
              </div>
              <p class="leading-relaxed">
                Adjusted Trial Balance totals: <strong>Dr 103,700 | Cr 103,700</strong>.<br>
                1. <strong>Net Income:</strong> Service Revenue ($61,000) - Total Expenses ($50,100) = <strong>$10,900</strong>.<br>
                2. <strong>Ending Capital:</strong> Capital ($13,000) + Net Income ($10,900) - Drawings ($7,000) = <strong>$16,900</strong>.<br>
                3. <strong>Total Assets:</strong> Cash ($5,300) + AR ($10,800) + Supplies ($1,500) + Prepaid Ins ($2,000) + Net Equip ($21,400) = <strong>$41,000</strong>.<br>
                4. <strong>Total Liabilities & Equity:</strong> Liabilities ($24,100) + Equity ($16,900) = <strong>$41,000 = Total Assets</strong> ✅!
              </p>
            </div>
          </div>
        `
      },
      {
        id: "fi-ap-vs-ar",
        title: "6.2 Accounts Payable (AP) vs. Accounts Receivable (AR)",
        summary: "Vendor accounting vs Customer accounting, open items, and clearing status.",
        content: `
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl border border-rose-200 bg-rose-50/50 text-sm">
                <div class="font-bold text-rose-950 text-base mb-1">Accounts Payable (FI-AP)</div>
                <div class="text-xs font-semibold text-rose-700 uppercase mb-2">Money Out &bull; Supplier Accounting</div>
                <ul class="text-slate-600 space-y-1 text-xs">
                  <li><strong>Purpose:</strong> Track and settle debts owed to suppliers for goods or services received.</li>
                  <li><strong>Key App:</strong> Create Supplier Invoice &rarr; Display Supplier Balances &rarr; Post Outgoing Payments.</li>
                  <li><strong>Reconciliation Account:</strong> <code>3300000</code> (Trade Payables).</li>
                  <li><strong>Document Types:</strong> <code>RE</code> (Vendor Invoice), <code>KZ</code> (Vendor Payment).</li>
                </ul>
              </div>
              <div class="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-sm">
                <div class="font-bold text-emerald-950 text-base mb-1">Accounts Receivable (FI-AR)</div>
                <div class="text-xs font-semibold text-emerald-700 uppercase mb-2">Money In &bull; Customer Accounting</div>
                <ul class="text-slate-600 space-y-1 text-xs">
                  <li><strong>Purpose:</strong> Track and collect amounts owed by customers for delivered bicycles and goods.</li>
                  <li><strong>Key App:</strong> Create Outgoing Invoices &rarr; Display Customer Balances &rarr; Post Incoming Payments.</li>
                  <li><strong>Reconciliation Account:</strong> <code>1200000</code> (Trade Receivables).</li>
                  <li><strong>Document Types:</strong> <code>RV</code> (Customer Invoice), <code>DZ</code> (Customer Payment).</li>
                </ul>
              </div>
            </div>
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
              <strong>Clearing Status in SAP:</strong> An open item represents an unpaid obligation. When incoming or outgoing payment is posted, the transaction is reconciled against the open invoice. Once debit and credit amounts match, the status shifts to <strong>Cleared</strong> (green checkmarks), closing the financial cycle.
            </div>
          </div>
        `
      }
    ]
  }
];
