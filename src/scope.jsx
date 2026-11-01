/* =========================================================
   scope.jsx — eight questions, ink on paper
   The same language as the rest of the site: one typeface, one ink,
   and the question lighting word by word as it arrives. The eight
   steps and the Formspree submission are unchanged; what changed is
   that the page now looks like the site it belongs to.

   SETUP (one-time):
   1. formspree.io -> create account
   2. New form -> copy the endpoint URL
   3. Paste it as FORMSPREE_URL below.
   ========================================================= */

const FORMSPREE_URL = 'https://formspree.io/f/mdarkdng';
const CALENDLY      = 'https://calendly.com/afrotechboss/chidile-ozoemena';
const TO_EMAIL      = 'chidileozoemena@gmail.com';

const { useState: useSF, useEffect: useSFE, useRef: useSFR } = React;

/* ── Data ─────────────────────────────────────────────────────────── */
/* No eyebrows: the position in the run is shown once, in the top bar,
   and the question itself carries the step. */
const STEPS = [
  { title: 'First, who are you?',           sub: 'The basics. Nothing scary.' },
  { title: 'Where can I find you?',         sub: 'Handles and links.' },
  { title: 'What world do you operate in?', sub: 'Help me understand your space.' },
  { title: 'Why are you here?',             sub: 'Be direct about it.' },
  { title: 'Tell me more.',                 sub: 'As much or as little as you like.' },
  { title: 'How should I reach you?',       sub: 'Pick your preferred channel.' },
  { title: 'Anything to show me?',          sub: 'Optional — decks, briefs, references.' },
  { title: "You're almost done.",           sub: 'Review and send, or book a call.' },
];

const REASONS = [
  { v: 'gig',          l: 'Gig / Contract' },
  { v: 'advisory',     l: 'Advisory' },
  { v: 'proposal',     l: 'Proposal' },
  { v: 'consultation', l: 'Consultation' },
  { v: 'speaker',      l: 'Public Speaker 🎤', /* taste-skill-ignore: his own words */ tip: "Haha — you didn't know I spoke? Well, now you do." },
  { v: 'partnership',  l: 'Partnership' },
  { v: 'just-hi',      l: 'Just saying hi 👋' /* taste-skill-ignore: his own words */ },
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

/* REASONS and CHANNELS store a slug in state; everything a human reads —
   the review screen, the email — wants the label. */
const labelOf = (list, v) => (list.find(o => o.v === v) || {}).l || v || '';

/* ── The light-up ─────────────────────────────────────────────────────
   The question takes its ink word by word, the same way every line on
   the site does. A step mounts already in view, so instead of waiting
   for an observer it lights on the next frame. */
function Lit({ t, as, className }) {
  const words = t.split(' ');
  const Tag = as || 'p';
  const ref = useSFR(null);
  useSFE(() => {
    const id = requestAnimationFrame(() => ref.current && ref.current.classList.add('on'));
    return () => cancelAnimationFrame(id);
  }, [t]);
  return (
    <Tag ref={ref} className={'lit ' + (className || '')}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" style={{ '--d': Math.min(i, 44) * 30 + 'ms' }}>{w}</span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* ── Field primitives ─────────────────────────────────────────────── */
function FText({ label, name, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div className="sc-field">
      <label className="sc-label">{label}{required && <span className="sc-req"> *</span>}</label>
      <input
        className="sc-input"
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
    <div className="sc-field">
      <label className="sc-label">{label}{required && <span className="sc-req"> *</span>}</label>
      <textarea
        className="sc-input sc-area"
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder || ''}
        rows={5}
      />
    </div>
  );
}

function FSelect({ label, name, value, onChange, options, required }) {
  return (
    <div className="sc-field">
      <label className="sc-label">{label}{required && <span className="sc-req"> *</span>}</label>
      <select
        className="sc-input sc-select"
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
    <div className="sc-field">
      <div className="sc-picks">
        {options.map(o => (
          <label
            key={o.v}
            className={'sc-pick' + (value === o.v ? ' on' : '')}
            onMouseEnter={() => o.tip && setTip(o.v)}
            onMouseLeave={() => setTip(null)}
          >
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(name, o.v)} />
            <span>{o.l}</span>
          </label>
        ))}
      </div>
      {tip && (
        <p className="sc-aside" key={tip}>
          {options.find(o => o.v === tip)?.tip}
        </p>
      )}
    </div>
  );
}

function FFile({ value, onChange, onTooBig }) {
  const [drag, setDrag] = useSF(false);
  const ref = useSFR(null);

  const handle = file => {
    if (!file) return;
    /* Five megabytes, said in the page's own voice rather than by a
       browser alert box. */
    if (file.size > 5 * 1024 * 1024) { onTooBig(file.name); return; }
    onTooBig(null);
    const reader = new FileReader();
    reader.onload = e => onChange('attachment', { name: file.name, type: file.type, data: e.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div
        className={'sc-drop' + (drag ? ' drag' : '')}
        onClick={() => ref.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
      >
        <input ref={ref} type="file" style={{ display: 'none' }}
          accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
          onChange={e => handle(e.target.files[0])} />
        {value
          ? <p className="sc-drop-has"><b>{value.name}</b> is attached.</p>
          : <>
              <p className="sc-drop-say">Drop a file here, or click to browse.</p>
              <p className="sc-drop-hint">Image, PDF, Word or PowerPoint. Up to 5 MB.</p>
            </>
        }
      </div>
      {value && (
        <button className="sc-plain" onClick={() => onChange('attachment', null)}>
          Remove the file
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
      <p className="sc-note">Hover "Public Speaker" for a surprise.</p>
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
      <div className="sc-two">
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
        <FText
          label={`Your ${selected.l} ${selected.v === 'email' ? 'address' : 'handle / number'}`}
          name="contact_handle"
          value={d.contact_handle}
          onChange={u}
          placeholder={selected.ph}
          required
        />
      )}
    </>
  );
}

function S7({ d, u, tooBig, onTooBig }) {
  return (
    <>
      <p className="sc-note">
        Completely optional — attach a brief, deck, wireframe, or reference image.
      </p>
      <FFile value={d.attachment} onChange={u} onTooBig={onTooBig} />
      {tooBig && (
        <p className="sc-warn">
          <b>{tooBig}</b> is over 5 MB, so it stayed on your machine. Send a lighter version,
          or write the brief below and I will ask you for the file by reply.
        </p>
      )}
    </>
  );
}

function S8({ d, onSubmit, status, mailtoHref }) {
  if (status === 'sent') {
    return (
      <div className="sc-sent">
        <Lit as="h2" t="Got it. I'll be in touch." />
        <p className="sub">Check <b>{d.email}</b> — I'll reply there.</p>
        <div className="acts">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn">
            Book a call while you wait
          </a>
          <a href="/" className="btn ghost">Back to the front</a>
        </div>
      </div>
    );
  }

  const rows = [
    ['Name', d.name], ['Email', d.email], ['Company', d.company],
    ['LinkedIn', d.linkedin], ['X', d.twitter], ['Telegram', d.telegram], ['Website', d.website],
    ['Industry', d.industry], ['Org size', d.org_size], ['Role', d.role],
    ['Reason', labelOf(REASONS, d.reason)], ['Brief', d.brief ? d.brief.slice(0, 80) + (d.brief.length > 80 ? '…' : '') : ''],
    ['Timeline', d.timeline], ['Budget', d.budget],
    ['Preferred contact', labelOf(CHANNELS, d.contact_ch)], ['Contact handle', d.contact_handle],
    ['File', d.attachment?.name],
  ].filter(([, v]) => v);

  return (
    <>
      <div className="sc-rows">
        {rows.map(([k, v]) => (
          <div key={k} className="sc-row">
            <span className="sc-row-k">{k}</span>
            <span className="sc-row-v">{v}</span>
          </div>
        ))}
      </div>
      <div className="acts">
        <button className="btn" onClick={onSubmit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : status === 'error' ? 'Try again' : 'Send it'}
        </button>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn ghost">
          Or book a call instead
        </a>
      </div>
      {status === 'error' && (
        <p className="sc-warn">
          That didn't go through. Try again, or{' '}
          <a href={mailtoHref}>send it as an email instead</a>.
        </p>
      )}
    </>
  );
}

/* Who you are writing to, and what briefs like this have turned into.
   The first screen only: after that the page is nothing but the questions. */
const RECENT = [
  { n: 'UnioGate', s: 'uniogate.jpg' },
  { n: 'TUMAM',    s: 'tumam.jpg' },
  { n: 'Uzo Labs', s: 'uzolabs.jpg' },
];

function Who() {
  return (
    <div className="sc-who">
      <div className="sc-me">
        <img src="assets/chidile-avatar.jpg" alt="Chidile Ozoemena" width="128" height="128" />
        <p>I read every brief myself and answer within two working days. Nothing here goes to a queue.</p>
      </div>
      <h2 className="sc-prev-h">What a brief has turned into before</h2>
      <div className="sc-prev">
        {RECENT.map((p) => (
          <figure key={p.n}>
            <img src={'assets/shots/' + p.s} alt={'The first screen of ' + p.n} />
            <figcaption>{p.n}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ── App ──────────────────────────────────────────────────────────── */
function ScopeApp() {
  const [step,   setStep]   = useSF(0);
  const [out,    setOut]    = useSF(false);
  const [data,   setData]   = useSF({});
  const [status, setStatus] = useSF('idle'); // idle | sending | sent | error
  const [tooBig, setTooBig] = useSF(null);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const go = dir => {
    setOut(true);
    setTimeout(() => { setStep(s => s + dir); setOut(false); window.scrollTo(0, 0); }, 270);
  };

  const canNext = () => {
    if (step === 0) return !!(data.name?.trim() && data.email?.trim());
    if (step === 3) return !!data.reason;
    if (step === 4) return !!data.brief?.trim();
    if (step === 5) return !!(data.contact_ch && data.contact_handle?.trim());
    return true;
  };

  const compileMessage = () => {
    const f = (label, val) => (val ? `${label}: ${val}` : null);
    // A section with no answered fields is left out entirely rather than
    // arriving as a bare divider.
    const sections = [
      ['WHO', [
        f('Name',    data.name),
        f('Email',   data.email),
        f('Company', data.company),
      ]],
      ['FIND THEM', [
        f('LinkedIn', data.linkedin),
        f('Twitter',  data.twitter),
        f('Telegram', data.telegram),
        f('Website',  data.website),
      ]],
      ['CONTEXT', [
        f('Industry', data.industry),
        f('Org size', data.org_size),
        f('Role',     data.role),
      ]],
      ['THE ASK', [
        f('Reason',   labelOf(REASONS, data.reason)),
        f('Brief',    data.brief),
        f('Timeline', data.timeline),
        f('Budget',   data.budget),
      ]],
      ['REACH THEM', [
        f('Preferred channel', labelOf(CHANNELS, data.contact_ch)),
        f('Contact handle',    data.contact_handle),
      ]],
      ['FILE', [
        f('Attachment', data.attachment?.name),
      ]],
    ];

    const bar = (title) => `═══ ${title} ` + '═'.repeat(Math.max(3, 34 - title.length));

    return sections
      .filter(([, lines]) => lines.some(Boolean))
      .map(([title, lines]) => [bar(title), ...lines.filter(Boolean)].join('\n'))
      .join('\n\n');
  };

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Scope submission — ${labelOf(REASONS, data.reason) || 'enquiry'} from ${data.name}`);
    const body    = encodeURIComponent(compileMessage());
    return `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async () => {
    if (status === 'sending') return;
    setStatus('sending');
    try {
      // Formspree's JSON API. The attachment is not sent — file uploads are a
      // paid feature — so the brief carries its name and I ask for it by reply.
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name || '',
          email: data.email || '',
          _subject: `Scope submission — ${labelOf(REASONS, data.reason) || 'enquiry'} from ${data.name || 'someone'}`,
          message: compileMessage(),
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (e) {
      setStatus('error');
    }
  };

  const stepComponents = [
    <S1 d={data} u={update} />,
    <S2 d={data} u={update} />,
    <S3 d={data} u={update} />,
    <S4 d={data} u={update} />,
    <S5 d={data} u={update} />,
    <S6 d={data} u={update} />,
    <S7 d={data} u={update} tooBig={tooBig} onTooBig={setTooBig} />,
    <S8 d={data} onSubmit={submit} status={status} mailtoHref={mailtoHref()} />,
  ];

  const pct = Math.round((step / (STEPS.length - 1)) * 100);

  return (
    <div className="sc">
      <div className="sc-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>

      <nav className="top" aria-label="Top">
        <b><a href="/">Chidile Ozoemena</a></b>
        <div className="top-go">
          <span className="sc-count">{status === 'sent' ? 'Sent' : `Step ${step + 1} of ${STEPS.length}`}</span>
          <a href="/">Leave the form</a>
        </div>
      </nav>

      <main className="wrap sc-body">
        <div className={'sc-step ' + (out ? 'out' : 'in') + (status === 'sent' ? ' solo' : '')}>
          {status === 'sent' ? null : (
            <div className={'sc-ask' + (step === 0 ? ' lead' : '')}>
              <Lit as="h1" t={STEPS[step].title} />
              <p className="sub">{STEPS[step].sub}</p>
            </div>
          )}
          <div className="sc-answer">{stepComponents[step]}</div>
        </div>
        {step === 0 && status !== 'sent' ? <Who /> : null}
      </main>

      {status !== 'sent' && (
        <div className="sc-foot">
          <div className="wrap sc-foot-in">
            <button
              className="sc-plain"
              onClick={() => go(-1)}
              style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <div className="sc-dots" aria-hidden="true">
              {STEPS.map((_, i) => (
                <i key={i} className={i === step ? 'now' : i < step ? 'done' : ''} />
              ))}
            </div>
            {step < STEPS.length - 1
              ? <button className="btn" onClick={() => go(1)} disabled={!canNext()}>
                  {step === STEPS.length - 2 ? 'Review' : 'Next'}
                </button>
              : <span className="sc-foot-pad" />}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ScopeApp />);
