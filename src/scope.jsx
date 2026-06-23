/* =========================================================
   scope.jsx — multi-step scoping form
   =========================================================

   SETUP (one-time):
   1. Go to formspree.io → create free account
   2. New form → copy the endpoint URL (looks like https://formspree.io/f/xxxxxxxx)
   3. Paste it as FORMSPREE_URL below.
   ========================================================= */

const FORMSPREE_URL = 'https://formspree.io/f/mdarkdng'; // replace with your endpoint
const CALENDLY      = 'https://calendly.com/afrotechboss/chidile-ozoemena';
const TO_EMAIL      = 'chidileozoemena@gmail.com';

const { useState: useSF, useEffect: useSFE, useRef: useSFR } = React;

/* ── Data ─────────────────────────────────────────────────────────── */
const STEPS = [
  { eyebrow: '01 / Who',       title: 'First, who are you?',           sub: 'The basics. Nothing scary.' },
  { eyebrow: '02 / Find you',  title: 'Where can I find you?',         sub: 'Handles and links.' },
  { eyebrow: '03 / Context',   title: 'What world do you operate in?', sub: 'Help me understand your space.' },
  { eyebrow: '04 / Why',       title: 'Why are you here?',             sub: 'Be direct about it.' },
  { eyebrow: '05 / The brief', title: 'Tell me more.',                 sub: 'As much or as little as you like.' },
  { eyebrow: '06 / Reach you', title: 'How should I reach you?',       sub: 'Pick your preferred channel.' },
  { eyebrow: '07 / Files',     title: 'Anything to show me?',          sub: 'Optional — decks, briefs, references.' },
  { eyebrow: '08 / Done',      title: "You're almost done.",           sub: 'Review and send, or book a call.' },
];

const REASONS = [
  { v: 'gig',          l: 'Gig / Contract' },
  { v: 'advisory',     l: 'Advisory' },
  { v: 'proposal',     l: 'Proposal' },
  { v: 'consultation', l: 'Consultation' },
  { v: 'speaker',      l: 'Public Speaker 🎤', tip: "Haha — you didn't know I spoke? Well, now you do." },
  { v: 'partnership',  l: 'Partnership' },
  { v: 'just-hi',      l: 'Just saying hi 👋' },
  { v: 'other',        l: 'Something else' },
];

const CHANNELS = [
  { v: 'email',    l: 'Email',       ph: 'your@email.com' },
  { v: 'telegram', l: 'Telegram',    ph: '@yourhandle' },
  { v: 'x',        l: 'X / Twitter', ph: '@yourhandle' },
  { v: 'linkedin', l: 'LinkedIn',    ph: 'linkedin.com/in/you' },
  { v: 'whatsapp', l: 'WhatsApp',    ph: '+1 234 567 8900' },
  { v: 'phone',    l: 'Phone call',  ph: '+1 234 567 8900' },
];

const INDUSTRIES = [
  'Fintech / DeFi','Web3 / Crypto','Civic Tech','AI / ML',
  'SaaS / B2B','E-commerce','Media / Publishing','Healthcare',
  'Education','Gaming','Real Estate','NGO / Non-profit','Government','Other',
];

const COMPANY_SIZES = [
  'Solo / Freelancer','2–10 people','11–50 people',
  '51–200 people','200+ people','Government / Institution',
];

const BUDGETS = [
  'Under $1,000','$1,000 – $5,000','$5,000 – $15,000',
  '$15,000 – $50,000','$50,000+','Let\'s discuss',
];

const TIMELINES = [
  'ASAP','Within 1 month','1 – 3 months',
  '3 – 6 months','6+ months','Ongoing / retainer',
];

/* ── Field primitives ─────────────────────────────────────────────── */
function FText({ label, name, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div className="scope-field">
      <label className="scope-label">{label}{required && <span className="scope-req"> *</span>}</label>
      <input
        className="scope-input"
        type={type}
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder || ''}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

function FTextarea({ label, name, value, onChange, placeholder, required }) {
  return (
    <div className="scope-field">
      <label className="scope-label">{label}{required && <span className="scope-req"> *</span>}</label>
      <textarea
        className="scope-textarea"
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder || ''}
        rows={4}
      />
    </div>
  );
}

function FSelect({ label, name, value, onChange, options, required }) {
  return (
    <div className="scope-field">
      <label className="scope-label">{label}{required && <span className="scope-req"> *</span>}</label>
      <select
        className="scope-select"
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
      >
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FRadio({ name, options, value, onChange }) {
  const [tip, setTip] = useSF(null);
  return (
    <div className="scope-field">
      <div className="scope-radio-group">
        {options.map(o => (
          <label
            key={o.v}
            className="scope-radio"
            onMouseEnter={() => o.tip && setTip(o.v)}
            onMouseLeave={() => setTip(null)}
          >
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(name, o.v)} />
            <span className="scope-radio-label">{o.l}</span>
          </label>
        ))}
      </div>
      {tip && (
        <p className="scope-easter" key={tip}>
          {options.find(o => o.v === tip)?.tip}
        </p>
      )}
    </div>
  );
}

function FFile({ value, onChange }) {
  const [drag, setDrag] = useSF(false);
  const ref = useSFR(null);

  const handle = file => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('File too large — max 5 MB.'); return; }
    const reader = new FileReader();
    reader.onload = e => onChange('attachment', { name: file.name, type: file.type, data: e.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div
        className={`scope-dropzone ${drag ? 'drag' : ''}`}
        onClick={() => ref.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      >
        <input ref={ref} type="file" style={{ display: 'none' }}
          accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
          onChange={e => handle(e.target.files[0])} />
        {value
          ? <p>✓ <strong>{value.name}</strong></p>
          : <>
              <p>Drop a file here or <span style={{ color: 'var(--accent)', textDecoration: 'underline' }}>click to browse</span></p>
              <p className="scope-dropzone-hint">Image · PDF · Word · PowerPoint · Max 5 MB</p>
            </>
        }
      </div>
      {value && (
        <button className="scope-file-remove" onClick={() => onChange('attachment', null)}>
          × Remove file
        </button>
      )}
    </div>
  );
}

/* ── Steps ────────────────────────────────────────────────────────── */
function S1({ d, u }) {
  return (
    <>
      <FText label="Full name" name="name" value={d.name} onChange={u} placeholder="Chidile Ozoemena" required />
      <FText label="Email address" name="email" value={d.email} onChange={u} placeholder="you@company.com" type="email" required />
      <FText label="Company or organisation" name="company" value={d.company} onChange={u} placeholder="Acme Corp (optional)" />
    </>
  );
}

function S2({ d, u }) {
  return (
    <>
      <FText label="LinkedIn" name="linkedin" value={d.linkedin} onChange={u} placeholder="linkedin.com/in/yourname" />
      <FText label="X / Twitter" name="twitter" value={d.twitter} onChange={u} placeholder="@yourhandle" />
      <FText label="Telegram" name="telegram" value={d.telegram} onChange={u} placeholder="@yourhandle" />
      <FText label="Website / Portfolio" name="website" value={d.website} onChange={u} placeholder="https://yoursite.com" />
    </>
  );
}

function S3({ d, u }) {
  return (
    <>
      <FSelect label="Industry" name="industry" value={d.industry} onChange={u} options={INDUSTRIES} required />
      <FSelect label="Organisation size" name="org_size" value={d.org_size} onChange={u} options={COMPANY_SIZES} />
      <FText label="Your role / title" name="role" value={d.role} onChange={u} placeholder="Co-founder, PM, CTO…" />
    </>
  );
}

function S4({ d, u }) {
  return (
    <>
      <p style={{ color: 'var(--muted)', fontSize: '.85rem', fontFamily: 'var(--ff-sans)', marginBottom: '1.2rem' }}>
        Hover "Public Speaker" for a surprise.
      </p>
      <FRadio name="reason" options={REASONS} value={d.reason} onChange={u} />
    </>
  );
}

function S5({ d, u }) {
  return (
    <>
      <FTextarea
        label="Tell me about the project or engagement"
        name="brief" value={d.brief} onChange={u}
        placeholder="What are you building? What's the problem? What do you need from me?"
        required
      />
      <div className="scope-grid-2">
        <FSelect label="Timeline" name="timeline" value={d.timeline} onChange={u} options={TIMELINES} />
        <FSelect label="Budget range" name="budget" value={d.budget} onChange={u} options={BUDGETS} />
      </div>
    </>
  );
}

function S6({ d, u }) {
  const selected = CHANNELS.find(c => c.v === d.contact_ch);
  return (
    <>
      <FRadio name="contact_ch" options={CHANNELS} value={d.contact_ch} onChange={u} />
      {selected && (
        <div style={{ marginTop: '1.5rem' }}>
          <FText
            label={`Your ${selected.l} ${selected.v === 'email' ? 'address' : 'handle / number'}`}
            name="contact_handle"
            value={d.contact_handle}
            onChange={u}
            placeholder={selected.ph}
            required
          />
        </div>
      )}
    </>
  );
}

function S7({ d, u }) {
  return (
    <>
      <p style={{ color: 'var(--muted)', fontSize: '.9rem', fontFamily: 'var(--ff-sans)', marginBottom: '1.4rem' }}>
        Completely optional — attach a brief, deck, wireframe, or reference image.
      </p>
      <FFile value={d.attachment} onChange={u} />
    </>
  );
}

function S8({ d, onSubmit, submitted }) {
  if (submitted) {
    return (
      <div className="scope-submitted">
        <p>Got it. I'll be in touch.</p>
        <p className="sub">Check <strong>{d.email}</strong> — I'll reply there.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a call while you wait <span>→</span>
        </a>
      </div>
    );
  }

  const rows = [
    ['Name', d.name], ['Email', d.email], ['Company', d.company],
    ['LinkedIn', d.linkedin], ['X', d.twitter], ['Telegram', d.telegram], ['Website', d.website],
    ['Industry', d.industry], ['Org size', d.org_size], ['Role', d.role],
    ['Reason', d.reason], ['Brief', d.brief ? d.brief.slice(0, 80) + (d.brief.length > 80 ? '…' : '') : ''],
    ['Timeline', d.timeline], ['Budget', d.budget],
    ['Preferred contact', d.contact_ch], ['Contact handle', d.contact_handle],
    ['File', d.attachment?.name],
  ].filter(([, v]) => v);

  return (
    <>
      <div className="scope-summary">
        {rows.map(([k, v]) => (
          <div key={k} className="scope-summary-row">
            <span className="scope-summary-key">{k}</span>
            <span className="scope-summary-val">{v}</span>
          </div>
        ))}
      </div>
      <div className="scope-done-actions">
        <button className="btn-primary" onClick={onSubmit}>
          Send it <span>→</span>
        </button>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="scope-calendly-link">
          Or book a call instead →
        </a>
      </div>
    </>
  );
}

/* ── App ──────────────────────────────────────────────────────────── */
function ScopeApp() {
  const [step,       setStep]       = useSF(0);
  const [out,        setOut]        = useSF(false);
  const [data,      setData]      = useSF({});
  const [submitted, setSubmitted] = useSF(false);


  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const go = dir => {
    setOut(true);
    setTimeout(() => { setStep(s => s + dir); setOut(false); }, 270);
  };

  const canNext = () => {
    if (step === 0) return !!(data.name?.trim() && data.email?.trim());
    if (step === 3) return !!data.reason;
    if (step === 4) return !!data.brief?.trim();
    if (step === 5) return !!(data.contact_ch && data.contact_handle?.trim());
    return true;
  };

  const compileMessage = () => {
    const f = (label, val) => val ? `${label}: ${val}\n` : '';
    return [
      '═══ WHO ══════════════════════════',
      f('Name',    data.name),
      f('Email',   data.email),
      f('Company', data.company),
      '',
      '═══ FIND THEM ════════════════════',
      f('LinkedIn', data.linkedin),
      f('Twitter',  data.twitter),
      f('Telegram', data.telegram),
      f('Website',  data.website),
      '',
      '═══ CONTEXT ══════════════════════',
      f('Industry',  data.industry),
      f('Org size',  data.org_size),
      f('Role',      data.role),
      '',
      '═══ THE ASK ══════════════════════',
      f('Reason',   data.reason),
      f('Brief',    data.brief),
      f('Timeline', data.timeline),
      f('Budget',   data.budget),
      '',
      '═══ REACH THEM ═══════════════════',
      f('Preferred channel', data.contact_ch),
      f('Contact handle',   data.contact_handle),
      '',
      '═══ FILE ═════════════════════════',
      f('Attachment', data.attachment?.name || 'None'),
    ].join('\n');
  };

  const submit = () => {
    const subject = encodeURIComponent(`Scope submission — ${data.reason || 'enquiry'} from ${data.name}`);
    const body    = encodeURIComponent(compileMessage());
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const stepComponents = [
    <S1 d={data} u={update} />,
    <S2 d={data} u={update} />,
    <S3 d={data} u={update} />,
    <S4 d={data} u={update} />,
    <S5 d={data} u={update} />,
    <S6 d={data} u={update} />,
    <S7 d={data} u={update} />,
    <S8 d={data} onSubmit={submit} submitted={submitted} />,
  ];

  const pct = Math.round((step / (STEPS.length - 1)) * 100);

  return (
    <div className="scope-page">
      <LumenCursor />

      <div className="scope-progress" style={{ width: `${pct}%` }} />

      <header className="scope-header">
        <a href="./" className="logo footer-sig nav-sig" aria-label="Back to portfolio">
          <span className="sig-name">Chidile</span>
          <svg className="sig-scribble" viewBox="0 0 240 46" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <path d="M6 30 C 46 14, 92 12, 132 22 C 168 31, 198 33, 234 18 C 210 24, 150 30, 96 27 C 64 25, 36 27, 14 36"
              stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <div className="scope-dots">
          {STEPS.map((_, i) => (
            <div key={i} className={`scope-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
          ))}
        </div>
        <a href="./" className="scope-back-link">← Portfolio</a>
      </header>

      <main className="scope-body">
        <div className={`scope-step ${out ? 'out' : 'in'}`}>
          <p className="scope-eyebrow">{STEPS[step].eyebrow}</p>
          <h1 className="scope-title">{STEPS[step].title}</h1>
          <p className="scope-sub">{STEPS[step].sub}</p>
          {stepComponents[step]}
        </div>
      </main>

      {!submitted && (
        <nav className="scope-nav">
          <button
            className="scope-btn-back"
            onClick={() => go(-1)}
            style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          >
            ← Back
          </button>
          {step < STEPS.length - 1 && (
            <button className="scope-btn-next" onClick={() => go(1)} disabled={!canNext()}>
              {step === STEPS.length - 2 ? 'Review →' : 'Next →'}
            </button>
          )}
        </nav>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ScopeApp />);
