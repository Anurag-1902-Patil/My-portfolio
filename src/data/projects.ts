import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'drivelegal',
    title: 'DriveLegal',
    subtitle: 'AI-Powered Road Safety Chatbot',
    tier: 1,
    tierLabel: 'FLAGSHIP',
    status: 'IIT Madras — Top 21 Finalist',
    tagline:
      'An offline RAG chatbot that answers Indian traffic-law questions with exact challan amounts and cited legal sections.',
    description:
      'DriveLegal answers questions about Indian traffic law — fines, offences, legal sections — without needing an internet connection. It retrieves from a locally indexed corpus of legal documents and generates answers with citations, running entirely offline.',
    achievement: 'Top 21 Finalist at IIT Madras Road Safety AI Hackathon — selected from 19,000+ submissions nationwide.',
    tech: [
      { group: 'AI / RAG', items: ['Mistral 7B', 'Ollama', 'LangChain', 'FAISS', 'all-MiniLM-L6-v2 embeddings'] },
      { group: 'Backend', items: ['FastAPI', 'Python'] },
      { group: 'Frontend', items: ['Streamlit'] },
      { group: 'Data', items: ['Legal PDF processing', 'Document chunking', 'Offline reverse geocoding'] },
    ],
    stack: ['Mistral 7B', 'Ollama', 'FAISS', 'LangChain', 'FastAPI', 'Streamlit'],
    links: [
      { label: 'GitHub', href: 'https://github.com/sohmh/DriveLegal', kind: 'github' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=WV1UiILqcWk', kind: 'demo' },
      { label: 'Case Study', href: '/projects/drivelegal', kind: 'case-study' },
    ],
    caseStudy: {
      hero:
        'Most people fined under Indian traffic law don\'t know what the law actually says — or whether the challan amount is even correct. DriveLegal makes the law queryable, offline, with citations.',
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'The IIT Madras Road Safety AI Hackathon asked a hard question: can AI actually make Indian roads safer? Most entries chased detection and dashboards. I went after understanding — the gap between citizens and the traffic law that governs them.',
            'Challans are issued every day, but the Motor Vehicles Act and state amendments are buried in dense PDFs. Even a straightforward question — "what is the fine for riding without a helmet in Maharashtra?" — requires digging through legal documents most people will never open.',
          ],
        },
        {
          heading: 'Problem',
          body: [
            'Existing approaches fall into two camps, both insufficient. Generic chatbots hallucinate legal sections and invent fine amounts — dangerous when real money and legal compliance are involved. Search engines return raw PDFs and leave the interpretation to the user.',
            'There is also a practical constraint: road-safety contexts — checkpoints, rural areas, moving vehicles — often have poor connectivity. A solution that depends on a cloud API is a solution that fails exactly where it is needed.',
          ],
        },
        {
          heading: 'Users & context',
          body: [
            'The primary users are ordinary vehicle owners who want to verify a challan or understand an offence, and road-safety volunteers who need quick, citable answers in the field. Both need accuracy over fluency — a wrong section number is worse than no answer.',
          ],
        },
        {
          heading: 'My contribution',
          body: [
            'I designed and built the full pipeline: legal document ingestion, the retrieval stack, the offline LLM serving layer, the FastAPI backend, and the Streamlit interface. The offline-first constraint was my architectural call and it shaped every downstream decision.',
          ],
        },
        {
          heading: 'Solution',
          body: [
            'DriveLegal is a retrieval-augmented generation system that runs fully offline. Legal PDFs are parsed, chunked, and embedded into a local FAISS index. A query retrieves the most relevant chunks, and Mistral 7B — served locally through Ollama — generates an answer grounded in those chunks, citing the legal sections it used.',
            'Because challan amounts vary by state and offence, retrieval quality matters more than model size. The system is tuned to surface the exact section text rather than rely on the model\'s memory of the law.',
          ],
        },
      ],
      architecture: [
        { label: 'Legal PDFs', detail: 'Motor Vehicles Act & state amendments, parsed and cleaned' },
        { label: 'Chunking', detail: 'Section-aware splitting so clauses stay intact' },
        { label: 'Embeddings', detail: 'all-MiniLM-L6-v2 — small, fast, runs on CPU' },
        { label: 'FAISS index', detail: 'Local vector store, no network dependency' },
        { label: 'LangChain', detail: 'Retrieval chain + prompt assembly with citations' },
        { label: 'Mistral 7B via Ollama', detail: 'Local inference, offline generation' },
        { label: 'FastAPI', detail: 'Query API separating UI from the pipeline' },
        { label: 'Streamlit UI', detail: 'Simple question-answer interface with cited sources' },
      ],
      decisions: [
        {
          title: 'Offline-first over cloud APIs',
          body: 'A hosted LLM would have been easier and more capable, but it fails without connectivity and sends legal queries to a third party. Running Mistral 7B through Ollama keeps the whole system local and reproducible.',
        },
        {
          title: 'Small embeddings, good chunking',
          body: 'all-MiniLM-L6-v2 is not the strongest embedding model, but it runs comfortably on CPU. I invested the difference in section-aware chunking — keeping legal clauses intact improved answer grounding more than a larger embedding model would have.',
        },
        {
          title: 'Citations as a hard requirement',
          body: 'Every answer must cite the legal sections it relied on. The prompt and retrieval chain are built so the model grounds its answer in retrieved text instead of generating from memory — hallucinated law is the primary failure mode.',
        },
        {
          title: 'Offline reverse geocoding',
          body: 'Challan amounts differ by state, so location context matters. A bundled offline reverse-geocoding dataset resolves coordinates to a state without any network call.',
        },
      ],
      challenges: [
        {
          title: 'Legal PDFs are hostile to parsing',
          body: 'Multi-column layouts, amendment tables, and inconsistent formatting across state documents broke naive extraction. I ended up iterating on cleaning and section-aware chunking more than on any other part of the system.',
        },
        {
          title: 'Latency on modest hardware',
          body: 'A 7B model on consumer hardware is not instant. Quantized weights through Ollama and keeping the retrieval context tight made response times acceptable for a field tool.',
        },
        {
          title: 'Grounding without hallucination',
          body: 'Early versions occasionally cited plausible-sounding but wrong sections. Constraining generation to retrieved chunks — and refusing to answer when retrieval confidence was low — fixed most of it.',
        },
      ],
      results: [
        'Top 21 Finalist — IIT Madras Road Safety AI Hackathon',
        'Selected from 19,000+ submissions nationwide',
        'Fully offline question answering over Indian traffic law with cited legal sections and challan amounts',
      ],
      lessons: [
        'Retrieval quality beats model size for domain QA — chunking strategy was the highest-leverage decision.',
        'Offline-first is a feature, not just a constraint: it forced a simpler, more robust architecture.',
        'In legal-adjacent systems, knowing when not to answer is as important as answering.',
      ],
      future: [
        'Multilingual support for regional-language queries',
        'Expanded state-wise amendment coverage',
        'Confidence scoring surfaced in the UI, not just the pipeline',
      ],
    },
  },
  {
    slug: 'project-kranti',
    title: 'Project Kranti',
    subtitle: 'Data Capture & Schedule-Linking Layer for Real-Time Progress Tracking',
    tier: 2,
    tierLabel: 'MAJOR / HACKATHON',
    status: 'Active build',
    tagline:
      'Turning messy field updates — WhatsApp messages, voice notes, photos, diaries — into validated, schedule-linked progress data.',
    description:
      'Construction and infrastructure projects run on schedules, but actual progress arrives as chaos: WhatsApp texts, voice notes, site photos, handwritten diaries, spreadsheets. Project Kranti captures that chaos, structures it with ASR/OCR and LLMs, matches it against schedule nodes with confidence scoring, and writes validated progress back — with a full audit trail.',
    tech: [
      { group: 'Ingestion', items: ['WhatsApp API / Evolution API / Baileys', 'Photos, scanned diaries, spreadsheets', 'Planner exports'] },
      { group: 'Understanding', items: ['Whisper / faster-whisper (ASR)', 'PaddleOCR / Tesseract / OpenCV', 'pdfplumber, pandas, openpyxl'] },
      { group: 'Extraction & Matching', items: ['Qwen 2.5 via llama.cpp / vLLM', 'BGE-M3 embeddings', 'RapidFuzz', 'Reranking', 'LoRA / QLoRA (PEFT)'] },
      { group: 'Platform', items: ['FastAPI', 'Celery + Redis/RabbitMQ', 'PostgreSQL + pgvector / Qdrant / Chroma', 'MinIO', 'React / Next.js planner console', 'Docker'] },
    ],
    stack: ['FastAPI', 'Qwen 2.5', 'Whisper', 'PaddleOCR', 'PostgreSQL', 'Celery', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Anurag-1902-Patil', kind: 'github' },
      { label: 'Case Study', href: '/projects/project-kranti', kind: 'case-study' },
    ],
    caseStudy: {
      hero:
        'Project schedules live in planning tools. Actual progress lives in WhatsApp groups, voice notes, and handwritten site diaries. Project Kranti is the layer that connects the two.',
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'On infrastructure projects, the plan says one thing and the site says another — and nobody reconciles them in real time. Progress updates exist, but they are scattered across channels that no scheduling tool can read.',
            'The interesting problem is not building another dashboard. It is the unglamorous middle: capturing messy operational data and linking it, reliably, to the schedule it belongs to.',
          ],
        },
        {
          heading: 'Problem',
          body: [
            'A site engineer\'s progress update might be a voice note in Marathi-accented Hindi, a photo of a rebar cage, or a scanned page of a site diary. A planner\'s schedule is a tree of L5/L6 activity nodes. Between them is a gap that today is bridged manually — weekly, imperfectly, by people retyping information.',
            'Manual bridging is slow, lossy, and unauditable. By the time progress is visible, it is too stale to act on.',
          ],
        },
        {
          heading: 'Users & context',
          body: [
            'Field staff should keep reporting exactly how they already do — WhatsApp, photos, diaries. Planners and project managers get structured, confidence-scored progress against their actual schedule, and a review queue for anything the system is unsure about.',
          ],
        },
        {
          heading: 'My contribution',
          body: [
            'I designed the end-to-end architecture and built the pipeline: multi-source ingestion, the ASR/OCR layer, LLM-based structured extraction, schedule matching with confidence scoring, the human-review path, and the write-back with audit trail.',
          ],
        },
        {
          heading: 'Solution',
          body: [
            'Kranti is a capture-and-linking layer, not a replacement for planning tools. Updates flow in from WhatsApp (via Evolution API/Baileys), file uploads, and planner exports. Voice is transcribed with faster-whisper; photos and scans go through PaddleOCR/Tesseract with OpenCV preprocessing; spreadsheets and PDFs are parsed directly.',
            'An LLM (Qwen 2.5, served via llama.cpp or vLLM) extracts structured progress statements — what activity, what quantity, when, where. Each statement is matched against L5/L6 schedule nodes using a blend of fuzzy string matching (RapidFuzz), embedding similarity (BGE-M3), and reranking. High-confidence matches write through automatically; low-confidence cases go to a human review queue. Every write is audit-logged.',
            'Over time, validated matches accumulate into discipline-tagged datasets — institutional memory that also serves as fine-tuning data (LoRA/QLoRA via PEFT) to improve extraction on project-specific language.',
          ],
        },
      ],
      architecture: [
        { label: 'Capture', detail: 'WhatsApp text/voice, photos, scanned diaries, spreadsheets, planner exports' },
        { label: 'Normalize', detail: 'ASR (faster-whisper), OCR (PaddleOCR/Tesseract/OpenCV), tabular parsing' },
        { label: 'Extract', detail: 'Qwen 2.5 structures updates into progress statements' },
        { label: 'Match', detail: 'RapidFuzz + BGE-M3 embeddings + reranking against L5/L6 schedule nodes' },
        { label: 'Score', detail: 'Confidence per match; low-confidence → human review queue' },
        { label: 'Write-back', detail: 'Validated progress updates project schedules with a full audit trail' },
        { label: 'Learn', detail: 'Discipline-tagged datasets → LoRA/QLoRA fine-tuning, institutional memory' },
      ],
      decisions: [
        {
          title: 'Human-in-the-loop by design',
          body: 'The system never pretends to certainty. Every match carries a confidence score, and low-confidence cases route to human review. In project controls, a confidently wrong update is worse than a delayed one.',
        },
        {
          title: 'Hybrid matching over pure embeddings',
          body: 'Schedule node names are short and formulaic — pure vector similarity confuses sibling activities. Combining RapidFuzz lexical matching, BGE-M3 semantic similarity, and a reranker is more reliable than any single signal.',
        },
        {
          title: 'Meet users where they are',
          body: 'No new app for field staff. WhatsApp is already the operating system of Indian construction sites, so ingestion is built around it rather than fighting it.',
        },
        {
          title: 'Local LLM serving',
          body: 'Project data is commercially sensitive. Qwen 2.5 via llama.cpp/vLLM keeps extraction on infrastructure the project controls, with the option to fine-tune on accumulated data.',
        },
      ],
      challenges: [
        {
          title: 'The messiness is the point',
          body: 'Voice notes mix languages, photos are taken in bad light, and diaries use personal shorthand. Each input channel needed its own normalization strategy before extraction could work at all.',
        },
        {
          title: 'Ambiguous schedule matching',
          body: '"Column casting done" could match several L6 nodes across floors and blocks. Confidence scoring plus human review is the honest answer — fully automatic matching is a trap.',
        },
        {
          title: 'Async everything',
          body: 'ASR and OCR are slow. The pipeline is fully asynchronous — Celery with Redis/RabbitMQ — so ingestion stays responsive while heavy processing happens in workers.',
        },
      ],
      results: [
        'End-to-end pipeline from WhatsApp voice note to schedule-linked, audit-trailed progress update',
        'Human review queue with confidence scoring for ambiguous matches',
        'React/Next.js planner console for reviewing matches and monitoring capture',
      ],
      lessons: [
        'The hardest part of real-world AI systems is not the model — it is the data path around it.',
        'Confidence is a UI problem as much as an ML problem: reviewers need to see why the system is unsure.',
        'Audit trails are not optional when software writes into systems of record.',
      ],
      future: [
        'Fine-tuned extraction model from accumulated validated data',
        'Richer planner integrations and two-way sync',
        'Progress forecasting from linked historical data',
      ],
    },
  },
  {
    slug: 'medisense-ai',
    title: 'MediSense AI',
    subtitle: 'Lab reports, translated into understanding',
    tier: 3,
    tierLabel: 'AI / HEALTH-TECH',
    status: 'Shipped',
    tagline:
      'Upload a pathology report PDF — get the biomarkers extracted, explained in plain language, scored, and visualized.',
    description:
      'MediSense AI analyzes pathology and lab report PDFs: it extracts biomarkers, converts technical medical information into accessible explanations, computes a health score, and presents visual insights. Complex report → structured information → understandable insights. Built under the CodeBlooded banner.',
    tech: [
      { group: 'AI', items: ['Google Gemini 3 Flash', 'LLM-based extraction & explanation'] },
      { group: 'Processing', items: ['PDF processing', 'Biomarker data extraction', 'Health analytics'] },
      { group: 'Web', items: ['Modern web stack', 'Data visualization'] },
    ],
    stack: ['Gemini 3 Flash', 'PDF Processing', 'LLM Extraction', 'Health Analytics', 'Data Viz'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Anurag-1902-Patil/Code-Blooded', kind: 'github' },
      { label: 'Live demo', href: 'https://frontendmediasense.vercel.app/', kind: 'live' },
      { label: 'Demo video', href: 'https://youtu.be/vGGVGf2dBUM?si=C3icm9ojcoVUlDMB', kind: 'demo' },
      { label: 'Case Study', href: '/projects/medisense-ai', kind: 'case-study' },
    ],
    caseStudy: {
      hero:
        'A lab report is written for doctors, but it is read by patients. MediSense AI closes that gap: biomarkers out of the PDF, explained plainly, scored, and visualized.',
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'Everyone has received a pathology report and googled the abbreviations one by one. The information is all there — it is just encoded in a format meant for clinicians. That translation problem is a natural fit for LLMs, as long as extraction stays faithful to the source document.',
          ],
        },
        {
          heading: 'Problem',
          body: [
            'Lab reports are dense tables of abbreviations, values, units, and reference ranges. Patients want to know three things: what was measured, is it okay, and what does it mean. The raw PDF answers none of these accessibly.',
          ],
        },
        {
          heading: 'Users & context',
          body: [
            'Non-medical users holding a pathology report. The tool explains and organizes — it does not diagnose, and it does not replace a doctor.',
          ],
        },
        {
          heading: 'My contribution',
          body: [
            'I built the full application: PDF ingestion, the extraction pipeline, the explanation layer, health scoring, and the visual insights interface.',
          ],
        },
        {
          heading: 'Solution',
          body: [
            'The app ingests a report PDF and extracts biomarker names, values, units, and reference ranges. Gemini 3 Flash converts each biomarker into a plain-language explanation. Results are organized into a health score and charts that show which values sit inside or outside their reference ranges.',
            'The pipeline is deliberately conservative: the model extracts and explains what is in the report rather than generating medical advice.',
          ],
        },
      ],
      architecture: [
        { label: 'Report PDF', detail: 'Pathology / lab report upload' },
        { label: 'PDF processing', detail: 'Text and table extraction' },
        { label: 'Biomarker extraction', detail: 'Gemini 3 Flash structures values, units, ranges' },
        { label: 'Explanation layer', detail: 'Plain-language conversion of medical terminology' },
        { label: 'Health scoring', detail: 'Aggregate view against reference ranges' },
        { label: 'Visual insights', detail: 'Charts highlighting in-range vs flagged values' },
      ],
      decisions: [
        {
          title: 'Explain, never diagnose',
          body: 'The prompt design keeps the model on extraction and explanation. Medical claims beyond the report\'s own content are explicitly out of scope — that boundary is a feature.',
        },
        {
          title: 'Reference ranges as the anchor',
          body: 'Explanations are grounded in the report\'s own reference ranges rather than generic internet knowledge, which keeps insights faithful to the specific lab\'s methodology.',
        },
      ],
      challenges: [
        {
          title: 'PDFs are not data',
          body: 'Lab reports come in endless layouts — scanned images, multi-column tables, merged cells. Robust extraction required defensive parsing before the LLM ever saw the text.',
        },
        {
          title: 'Useful but honest scoring',
          body: 'A health score must summarize without overclaiming. It reflects how many values fall outside reference ranges — an organizational aid, not a medical assessment.',
        },
      ],
      results: [
        'Working web application: report PDF in → structured biomarkers, plain-language explanations, health score, and visual insights out',
      ],
      lessons: [
        'In health-adjacent software, what the product refuses to say matters as much as what it says.',
        'LLM extraction needs deterministic validation around it — values and units must be checked, not trusted.',
      ],
      future: [
        'Trend tracking across multiple reports over time',
        'Wider lab-format coverage',
      ],
    },
  },
  {
    slug: 'it-department-website',
    title: 'IT Department Website',
    subtitle: 'A real website, chosen and shipped',
    tier: 4,
    tierLabel: 'DEPLOYED / COLLEGE',
    status: 'Selected & deployed',
    tagline:
      'The official website for my college\'s IT department — built independently in React and selected over other student submissions.',
    description:
      "A React website for the IT department at Pune Vidyarthi Griha's College of Engineering and Technology (PVG's COET), Pune. Multiple students submitted implementations — mine was selected and deployed live.",
    achievement: 'Selected over multiple student submissions and deployed as the department\'s live website.',
    tech: [
      { group: 'Frontend', items: ['React', 'JavaScript', 'CSS'] },
      { group: 'Delivery', items: ['Independent design & build', 'Deployment'] },
    ],
    stack: ['React', 'JavaScript', 'CSS', 'Deployment'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Anurag-1902-Patil', kind: 'github' },
      { label: 'Live website', href: 'https://itsa-gamma.vercel.app/', kind: 'live' },
      { label: 'Demo video', href: 'https://youtu.be/n4sSaLqurV0', kind: 'demo' },
      { label: 'Case Study', href: '/projects/it-department-website', kind: 'case-study' },
    ],
    caseStudy: {
      hero:
        'Not a hackathon demo, not a tutorial clone — a real website for a real department, chosen over competing submissions and put live.',
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'The IT department needed a website — somewhere to present the department, its members, and its work. Students were invited to build it. I treated it like a real client project rather than a college assignment.',
          ],
        },
        {
          heading: 'Problem',
          body: [
            'The department had no proper web presence. Information about faculty, the program, and department activity was scattered or unavailable. The site needed to be presentable to outsiders and maintainable by the department.',
          ],
        },
        {
          heading: 'Users & context',
          body: [
            'Prospective students evaluating the program, current students looking for department information, and faculty presenting their work. The audience is broad, so clarity mattered more than flashiness.',
          ],
        },
        {
          heading: 'My contribution',
          body: [
            'Everything: structure, design, implementation, and deployment. I built it independently in React.',
          ],
        },
        {
          heading: 'Solution',
          body: [
            'A clean React site presenting the department, its members, and its work — component-based so sections are easy to update. The priority was practical: readable, fast, and shippable, not technically showy.',
          ],
        },
      ],
      architecture: [
        { label: 'React SPA', detail: 'Component-based structure for easy updates' },
        { label: 'Department sections', detail: 'About, members, work, information' },
        { label: 'Deployment', detail: 'Built and shipped as a live site' },
      ],
      decisions: [
        {
          title: 'Boring technology, deliberately',
          body: 'The department needed a maintainable website, not a showcase of my stack. React with plain CSS keeps it approachable for whoever maintains it next.',
        },
        {
          title: 'Content structure first',
          body: 'I designed around what the department actually needed to say — members, work, information — rather than starting from a template and filling slots.',
        },
      ],
      challenges: [
        {
          title: 'Real stakeholders, real constraints',
          body: 'Unlike a personal project, this had to satisfy the department. Iterating on feedback from actual stakeholders is a different skill from coding alone.',
        },
      ],
      results: [
        'Selected over multiple student submissions',
        'Deployed as the department\'s live website',
      ],
      lessons: [
        'Shipping something real people use teaches things side projects cannot — feedback cycles, stakeholders, and the discipline of finishing.',
        'Selection is a different kind of validation than applause: someone had to choose this over alternatives and live with that choice.',
      ],
      future: [
        'Content updates handled with the department as needs evolve',
      ],
    },
  },
]

export const featuredProject = projects[0]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
