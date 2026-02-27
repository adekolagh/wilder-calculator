import { useState, useEffect, useCallback } from 'react'

// ─── INSTRUMENT DATABASE ───────────────────────────────────────────────────────
const INSTRUMENTS = {
  // MAJORS
  'EURUSD': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'GBPUSD': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'AUDUSD': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'NZDUSD': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'USDCAD': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'USDCHF': { cat:'Majors', pm:10000, pv:0.10, dec:5 },
  'USDJPY': { cat:'Majors', pm:100,   pv:0.07, dec:3, jpy:true },

  // MINORS — EUR crosses
  'EURGBP': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },
  'EURCAD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURAUD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURNZD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURCHF': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURSEK': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURNOK': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURDKK': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURPLN': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'EURTRY': { cat:'Minors', pm:10000, pv:0.10, dec:5 },

  // MINORS — GBP crosses
  'GBPJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },
  'GBPCAD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPAUD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPNZD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPCHF': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPSEK': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPNOK': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'GBPPLN': { cat:'Minors', pm:10000, pv:0.10, dec:5 },

  // MINORS — Other crosses
  'AUDJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },
  'AUDCAD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'AUDNZD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'AUDCHF': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'NZDJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },
  'NZDCAD': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'NZDCHF': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'CADJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },
  'CADCHF': { cat:'Minors', pm:10000, pv:0.10, dec:5 },
  'CHFJPY': { cat:'Minors', pm:100,   pv:0.07, dec:3, jpy:true },

  // EXOTICS
  'USDZAR': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDMXN': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDTRY': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDSEK': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDDKK': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDNOK': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDSGD': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDHKD': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDCNH': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDPLN': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDHUF': { cat:'Exotics', pm:100,   pv:0.10, dec:3 },
  'USDCZK': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDTHB': { cat:'Exotics', pm:10000, pv:0.10, dec:5 },
  'USDINR': { cat:'Exotics', pm:100,   pv:0.10, dec:3 },
  'ZARJPY': { cat:'Exotics', pm:100,   pv:0.07, dec:3, jpy:true },
  'SGDJPY': { cat:'Exotics', pm:100,   pv:0.07, dec:3, jpy:true },
  'TRYJPY': { cat:'Exotics', pm:100,   pv:0.07, dec:3, jpy:true },
  'MXNJPY': { cat:'Exotics', pm:100,   pv:0.07, dec:3, jpy:true },
  'NOKJPY': { cat:'Exotics', pm:100,   pv:0.07, dec:3, jpy:true },

  // METALS
  'XAUUSD': { cat:'Metals', pm:10,  pv:0.10, dec:2, note:'Gold — 1 pip = $0.10 at 0.01 lot' },
  'XAGUSD': { cat:'Metals', pm:100, pv:0.05, dec:3, note:'Silver — pip value approx' },
  'XPTUSD': { cat:'Metals', pm:10,  pv:0.10, dec:2, note:'Platinum' },
  'XPDUSD': { cat:'Metals', pm:10,  pv:0.10, dec:2, note:'Palladium' },
  'XCUUSD': { cat:'Metals', pm:100, pv:0.10, dec:4, note:'Copper' },

  // CRYPTO
  'BTCUSD':  { cat:'Crypto', pm:1,    pv:0.10, dec:2, note:'Bitcoin — 1 pip = $1 move approx' },
  'ETHUSD':  { cat:'Crypto', pm:10,   pv:0.10, dec:2, note:'Ethereum — approx' },
  'LTCUSD':  { cat:'Crypto', pm:100,  pv:0.10, dec:2, note:'Litecoin — approx' },
  'XRPUSD':  { cat:'Crypto', pm:1000, pv:0.10, dec:4, note:'Ripple — approx' },
  'BNBUSD':  { cat:'Crypto', pm:10,   pv:0.10, dec:2, note:'BNB — approx' },
  'ADAUSD':  { cat:'Crypto', pm:1000, pv:0.10, dec:4, note:'Cardano — approx' },
  'SOLUSD':  { cat:'Crypto', pm:10,   pv:0.10, dec:2, note:'Solana — approx' },
  'DOTUSD':  { cat:'Crypto', pm:100,  pv:0.10, dec:3, note:'Polkadot — approx' },
  'DOGEUSD': { cat:'Crypto', pm:1000, pv:0.10, dec:4, note:'Dogecoin — approx' },
  'LINKUSD': { cat:'Crypto', pm:100,  pv:0.10, dec:3, note:'Chainlink — approx' },

  // COMMODITIES
  'USOIL':   { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'WTI Crude Oil' },
  'UKOIL':   { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'Brent Crude Oil' },
  'NATGAS':  { cat:'Commodities', pm:1000, pv:0.10, dec:3, note:'Natural Gas' },
  'CORN':    { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'Corn — approx' },
  'WHEAT':   { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'Wheat — approx' },
  'SOYBEAN': { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'Soybean — approx' },
  'COFFEE':  { cat:'Commodities', pm:100,  pv:0.10, dec:2, note:'Coffee — approx' },
  'COTTON':  { cat:'Commodities', pm:1000, pv:0.10, dec:3, note:'Cotton — approx' },
  'SUGAR':   { cat:'Commodities', pm:1000, pv:0.10, dec:3, note:'Sugar — approx' },
  'COCOA':   { cat:'Commodities', pm:1,    pv:0.10, dec:0, note:'Cocoa — approx' },

  // INDICES
  'US30':    { cat:'Indices', pm:1, pv:0.10, dec:1, note:'Dow Jones — 1 pip = 1 point' },
  'SPX500':  { cat:'Indices', pm:10,pv:0.10, dec:1, note:'S&P 500 — approx' },
  'NAS100':  { cat:'Indices', pm:1, pv:0.10, dec:1, note:'Nasdaq 100 — 1 pip = 1 point' },
  'UK100':   { cat:'Indices', pm:1, pv:0.10, dec:1, note:'FTSE 100 — 1 pip = 1 point' },
  'GER40':   { cat:'Indices', pm:1, pv:0.10, dec:1, note:'DAX 40 — 1 pip = 1 point' },
  'FRA40':   { cat:'Indices', pm:1, pv:0.10, dec:1, note:'CAC 40 — 1 pip = 1 point' },
  'JPN225':  { cat:'Indices', pm:1, pv:0.07, dec:1, note:'Nikkei 225 — JPY based, approx' },
  'AUS200':  { cat:'Indices', pm:1, pv:0.07, dec:1, note:'ASX 200 — AUD based, approx' },
  'HK50':    { cat:'Indices', pm:1, pv:0.10, dec:1, note:'Hang Seng — approx' },
  'EU50':    { cat:'Indices', pm:1, pv:0.10, dec:1, note:'Euro Stoxx 50 — approx' },
  'SWI20':   { cat:'Indices', pm:1, pv:0.10, dec:1, note:'SMI 20 — approx' },
  'CHINAH':  { cat:'Indices', pm:1, pv:0.10, dec:1, note:'China H-Shares — approx' },
}

const CATEGORIES = ['Majors','Minors','Exotics','Metals','Crypto','Commodities','Indices']
const GROUPS = CATEGORIES.map(cat => ({
  cat, pairs: Object.keys(INSTRUMENTS).filter(p => INSTRUMENTS[p].cat === cat)
}))

const LOTS = ['0.001','0.01','0.02','0.03','0.05','0.10','0.20','0.50','1.00','2.00','5.00']
const LEVS = ['10','20','30','50','100','200','400','500','1000']

// ─── WILDER LOGIC ─────────────────────────────────────────────────────────────
function runValidation(s) {
  const adx = +s.adx, pdi = +s.plusDI, mdi = +s.minusDI, rsi = +s.rsi
  const entry = +s.entry, sar = +s.sar
  const checks = []

  if (adx < 20)
    checks.push({ ok: false, text: 'ADX below 20 — No trend. Do not trade.' })
  else if (adx < 25)
    checks.push({ ok: null,  text: `ADX ${adx.toFixed(1)} — Weak trend developing. Trade with caution.` })
  else
    checks.push({ ok: true,  text: `ADX ${adx.toFixed(1)} — Strong trend confirmed.` })

  if (s.direction === 'BUY') {
    checks.push(pdi > mdi
      ? { ok: true,  text: `+DI ${pdi} > -DI ${mdi} — Bullish direction confirmed.` }
      : { ok: false, text: `-DI is dominant. Direction conflicts with BUY. Do not enter.` })
    checks.push(sar < entry
      ? { ok: true,  text: 'SAR is below price — Uptrend is valid.' }
      : { ok: false, text: 'SAR is above price — Conflicts with BUY. Wait for SAR flip.' })
    checks.push(rsi > 50
      ? { ok: true, text: `RSI ${rsi.toFixed(1)} above 50 — Bullish momentum confirmed.` }
      : { ok: null, text: `RSI ${rsi.toFixed(1)} below 50 — Momentum not yet confirming BUY.` })
  } else if (s.direction === 'SELL') {
    checks.push(mdi > pdi
      ? { ok: true,  text: `-DI ${mdi} > +DI ${pdi} — Bearish direction confirmed.` }
      : { ok: false, text: `+DI is dominant. Direction conflicts with SELL. Do not enter.` })
    checks.push(sar > entry
      ? { ok: true,  text: 'SAR is above price — Downtrend is valid.' }
      : { ok: false, text: 'SAR is below price — Conflicts with SELL. Wait for SAR flip.' })
    checks.push(rsi < 50
      ? { ok: true, text: `RSI ${rsi.toFixed(1)} below 50 — Bearish momentum confirmed.` }
      : { ok: null, text: `RSI ${rsi.toFixed(1)} above 50 — Momentum not yet confirming SELL.` })
  }

  return { checks, valid: !checks.some(c => c.ok === false) }
}

function runCalc(s) {
  const cfg = INSTRUMENTS[s.pair] || { pm:10000, pv:0.10, dec:5 }
  const entry = +s.entry, atr = +s.atr, sar = +s.sar
  const lot = +s.lotSize, bal = +s.balance, lev = +s.leverage
  const pm = cfg.pm
  const pv = cfg.pv * (lot / 0.01)

  const sarPips = Math.abs(entry - sar) * pm
  const atrPips = atr * pm
  const slPips  = Math.max(sarPips, atrPips)
  const tp1Pips = atrPips * 2
  const tp2Pips = atrPips * 3
  const dir     = s.direction === 'BUY' ? 1 : -1
  const fmt     = v => v.toFixed(cfg.dec)

  const slLoss  = slPips * pv
  const margin  = (lot * 100000) / lev
  const free    = bal - margin

  return {
    slPrice:  fmt(entry - dir * (slPips  / pm)),
    tp1Price: fmt(entry + dir * (tp1Pips / pm)),
    tp2Price: fmt(entry + dir * (tp2Pips / pm)),
    entryFmt: fmt(entry),
    slPips:   slPips.toFixed(1),
    tp1Pips:  tp1Pips.toFixed(1),
    tp2Pips:  tp2Pips.toFixed(1),
    slLoss:   slLoss.toFixed(2),
    tp1Prof:  (tp1Pips * pv).toFixed(2),
    tp2Prof:  (tp2Pips * pv).toFixed(2),
    rr1:      (tp1Pips / slPips).toFixed(2),
    rr2:      (tp2Pips / slPips).toFixed(2),
    riskPct:  (slLoss / bal * 100).toFixed(1),
    margin:   margin.toFixed(2),
    free:     free.toFixed(2),
    pipVal:   pv.toFixed(3),
    sarBasis: sarPips >= atrPips,
    isJpy:    !!cfg.jpy,
    note:     cfg.note || null,
    marginRisk: free < slLoss,
  }
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  card:  { background:'#fff', borderRadius:20, padding:'20px 16px', marginBottom:14, boxShadow:'0 1px 8px rgba(0,0,0,0.08)' },
  sec:   { fontSize:11, fontWeight:800, color:'#9ca3af', textTransform:'uppercase', letterSpacing:2, marginBottom:16 },
  lbl:   { display:'block', fontSize:11, fontWeight:800, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1.5, marginBottom:6 },
  inp:   { width:'100%', padding:'13px 14px', fontSize:15, fontWeight:700, background:'#fff', border:'2px solid #e5e7eb', borderRadius:12, color:'#111', outline:'none', boxSizing:'border-box' },
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
const Field = ({ lbl, val, onChange, ph = '' }) => (
  <div>
    <label style={S.lbl}>{lbl}</label>
    <input type="number" step="any" value={val}
      onChange={e => onChange(e.target.value)}
      placeholder={ph} style={S.inp} inputMode="decimal" />
  </div>
)

const Sel = ({ lbl, val, onChange, children, color }) => (
  <div>
    <label style={S.lbl}>{lbl}</label>
    <select value={val} onChange={e => onChange(e.target.value)}
      style={{ ...S.inp, cursor:'pointer', color: color || '#111' }}>
      {children}
    </select>
  </div>
)

const Stat = ({ lbl, val, color = '#111' }) => (
  <div style={{ background:'#f8fafc', borderRadius:12, padding:'14px 10px', textAlign:'center' }}>
    <div style={{ fontSize:10, fontWeight:800, color:'#9ca3af', textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>{lbl}</div>
    <div style={{ fontSize:16, fontWeight:900, color }}>{val}</div>
  </div>
)

const PriceBox = ({ lbl, price, pips, dollar, color, bg, border }) => (
  <div style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:14, padding:'14px 10px', textAlign:'center', flex:1 }}>
    <div style={{ fontSize:10, fontWeight:800, color, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>{lbl}</div>
    <div style={{ fontSize:16, fontWeight:900, color, marginBottom:5, wordBreak:'break-all' }}>{price}</div>
    <div style={{ fontSize:11, fontWeight:700, color, opacity:0.8 }}>{pips} pips</div>
    <div style={{ fontSize:13, fontWeight:800, color, marginTop:2 }}>{dollar}</div>
  </div>
)

const Note = ({ text, emoji = '📌', bg = '#fffbeb', border = '#fde047', textColor = '#854d0e' }) => (
  <div style={{ padding:'10px 14px', background:bg, border:`1.5px solid ${border}`, borderRadius:10, marginTop:10 }}>
    <div style={{ fontSize:12, fontWeight:700, color:textColor, lineHeight:1.5 }}>{emoji} {text}</div>
  </div>
)

// ─── INSTALL PROMPT ───────────────────────────────────────────────────────────
function InstallBanner() {
  const [prompt, setPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = e => { e.preventDefault(); setPrompt(e); setVisible(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{ background:'#0f172a', borderRadius:16, padding:'14px 16px', marginBottom:14, display:'flex', alignItems:'center', gap:14 }}>
      <span style={{ fontSize:28 }}>📲</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:800, color:'#f8fafc', marginBottom:3 }}>Install as App</div>
        <div style={{ fontSize:11, fontWeight:600, color:'#64748b' }}>Add to home screen for offline access</div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={() => setVisible(false)}
          style={{ padding:'8px 12px', background:'transparent', border:'1px solid #334155', borderRadius:8, color:'#64748b', fontSize:12, fontWeight:700, cursor:'pointer' }}>
          Later
        </button>
        <button onClick={install}
          style={{ padding:'8px 14px', background:'#2563eb', border:'none', borderRadius:8, color:'#fff', fontSize:12, fontWeight:800, cursor:'pointer' }}>
          Install
        </button>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const INIT = {
  pair:'AUDUSD', direction:'', entry:'', atr:'', sar:'',
  adx:'', plusDI:'', minusDI:'', rsi:'',
  lotSize:'0.01', balance:'10', leverage:'200',
}

export default function App() {
  const [s, setS] = useState(INIT)
  const [res, setRes] = useState(null)
  const [val, setVal] = useState(null)
  const [tab, setTab] = useState('calc') // 'calc' | 'rules'

  const upd = k => v => setS(p => ({ ...p, [k]: v }))
  const updE = k => e => setS(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    const ready = s.entry && s.atr && s.sar && s.adx && s.plusDI && s.minusDI && s.rsi && s.direction
    if (ready) { setVal(runValidation(s)); setRes(runCalc(s)) }
    else { setVal(null); setRes(null) }
  }, [s])

  const dirColor = s.direction === 'BUY' ? '#16a34a' : s.direction === 'SELL' ? '#dc2626' : '#6b7280'
  const tradeOk  = val?.valid
  const cfg      = INSTRUMENTS[s.pair] || {}

  const reset = () => { setS(INIT); setRes(null); setVal(null) }

  return (
    <div style={{ background:'#f1f5f9', minHeight:'100vh', paddingBottom:80 }}>

      {/* ── FIXED HEADER ── */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:'#0f172a', padding:'14px 16px 12px', boxShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth:480, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:800, color:'#475569', letterSpacing:3, textTransform:'uppercase' }}>Welles Wilder</div>
            <div style={{ fontSize:18, fontWeight:900, color:'#f8fafc', lineHeight:1.2 }}>5M Scalping Calculator</div>
          </div>
          <button onClick={reset}
            style={{ padding:'8px 14px', background:'#1e293b', border:'1px solid #334155', borderRadius:10, color:'#94a3b8', fontSize:12, fontWeight:700, cursor:'pointer' }}>
            Reset
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:480, margin:'0 auto', padding:'14px 14px 0' }}>

        <InstallBanner />

        {/* ── TAB SWITCHER ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
          {[['calc','📊 Calculator'], ['rules','📖 Wilder Rules']].map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:'12px', background: tab===t ? '#0f172a' : '#fff', border: tab===t ? 'none' : '1px solid #e5e7eb', borderRadius:12, color: tab===t ? '#fff' : '#6b7280', fontSize:13, fontWeight:800, cursor:'pointer', boxShadow: tab===t ? '0 2px 8px rgba(0,0,0,0.2)' : 'none' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'rules' && (
          <div style={S.card}>
            <div style={S.sec}>Welles Wilder — Original Rules</div>

            {[
              { title:'Step 1 — ADX (The Gatekeeper)', items:[
                'ADX below 20 = No trend = DO NOT TRADE',
                'ADX 20-25 = Trend developing = Prepare',
                'ADX above 25 = Trade allowed',
                'ADX above 40 = Very strong, watch for exhaustion',
              ]},
              { title:'Step 2 — DI (Direction)', items:[
                '+DI above -DI = Bullish = BUY setups only',
                '-DI above +DI = Bearish = SELL setups only',
                'Never trade against the dominant DI',
              ]},
              { title:'Step 3 — Parabolic SAR (Entry & SL)', items:[
                'SAR below price = Uptrend = Buy only',
                'SAR above price = Downtrend = Sell only',
                'SAR dot = your exact SL level',
                'When SAR flips = exit immediately, no exceptions',
              ]},
              { title:'Step 4 — RSI (Momentum)', items:[
                'RSI above 50 = Bullish momentum — stay long',
                'RSI below 50 = Bearish momentum — stay short',
                'RSI 70+ in uptrend = Trend STRENGTH, not reversal',
                'RSI 30- in downtrend = Trend STRENGTH, not reversal',
                'Failure swing = Wilder\'s strongest RSI signal',
                'RSI crosses 50 = possible trend change',
              ]},
              { title:'Step 5 — ATR (Position Sizing)', items:[
                'SL = 1× ATR or SAR distance (whichever is wider)',
                'TP1 = 2× ATR from entry',
                'TP2 = 3× ATR — hold if ADX still rising',
                'Never use fixed pips — let ATR decide based on volatility',
              ]},
              { title:'Exit Rules (Wilder Hard Rules)', items:[
                'SAR flips = EXIT immediately — his hardest rule',
                'DI crosses against you = EXIT',
                'ADX drops below 20 = EXIT, trend gone',
                'RSI failure swing forms = prepare to exit',
                'NEVER move SL further away — trail via SAR only',
              ]},
            ].map(({ title, items }, i) => (
              <div key={i} style={{ marginBottom:20 }}>
                <div style={{ fontSize:13, fontWeight:800, color:'#111', marginBottom:10, padding:'8px 12px', background:'#f1f5f9', borderRadius:8 }}>{title}</div>
                {items.map((item, j) => (
                  <div key={j} style={{ display:'flex', gap:10, padding:'7px 4px', borderBottom:'1px solid #f9fafb' }}>
                    <div style={{ width:6, height:6, background:'#2563eb', borderRadius:'50%', marginTop:6, flexShrink:0 }} />
                    <div style={{ fontSize:13, fontWeight:600, color:'#374151', lineHeight:1.5 }}>{item}</div>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ padding:'14px', background:'#eff6ff', borderRadius:12, border:'1px solid #93c5fd' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#1d4ed8', lineHeight:1.6 }}>
                📚 Reference: Welles Wilder — "New Concepts in Technical Trading Systems" (1978). All indicator settings: ADX 14, +DI 14, -DI 14, ATR 14, RSI 14, Parabolic SAR (0.02 step, 0.20 max).
              </div>
            </div>
          </div>
        )}

        {tab === 'calc' && (
          <>
            {/* ── TRADE SETUP ── */}
            <div style={S.card}>
              <div style={S.sec}>Trade Setup</div>

              <div style={{ marginBottom:12 }}>
                <label style={S.lbl}>Instrument / Pair</label>
                <select value={s.pair} onChange={updE('pair')} style={{ ...S.inp, cursor:'pointer' }}>
                  {GROUPS.map(({ cat, pairs }) => (
                    <optgroup key={cat} label={`── ${cat} ──`}>
                      {pairs.map(p => (
                        <option key={p} value={p}>{p}{INSTRUMENTS[p].jpy ? ' ★JPY' : ''}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {(cfg.jpy || cfg.note) && (
                  <Note
                    emoji={cfg.jpy ? '⚡' : '📌'}
                    text={cfg.jpy ? `JPY Pair — Pip = 0.01 (2nd decimal, not 4th). Pip value ~$0.07 at 0.01 lot. Prices shown to 3 decimal places.` : cfg.note}
                    bg={cfg.jpy ? '#eff6ff' : '#fffbeb'}
                    border={cfg.jpy ? '#93c5fd' : '#fde047'}
                    textColor={cfg.jpy ? '#1d4ed8' : '#854d0e'}
                  />
                )}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Sel lbl="Direction" val={s.direction} onChange={upd('direction')} color={dirColor}>
                  <option value=''>Select</option>
                  <option value='BUY'>BUY</option>
                  <option value='SELL'>SELL</option>
                </Sel>

                <Field lbl="Entry Price" val={s.entry} onChange={upd('entry')} ph={cfg.dec <= 3 ? '151.500' : '0.71263'} />
                <Field lbl="Balance ($)" val={s.balance} onChange={upd('balance')} ph="10" />

                <Sel lbl="Lot Size" val={s.lotSize} onChange={upd('lotSize')}>
                  {LOTS.map(l => <option key={l} value={l}>{l}</option>)}
                </Sel>

                <Sel lbl="Leverage" val={s.leverage} onChange={upd('leverage')}>
                  {LEVS.map(l => <option key={l} value={l}>1:{l}</option>)}
                </Sel>
              </div>
            </div>

            {/* ── INDICATOR VALUES ── */}
            <div style={S.card}>
              <div style={S.sec}>Wilder Indicator Values</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field lbl="ATR"           val={s.atr}     onChange={upd('atr')}     ph={cfg.jpy ? '0.150' : '0.00041'} />
                <Field lbl="Parabolic SAR" val={s.sar}     onChange={upd('sar')}     ph={cfg.jpy ? '151.200' : '0.71189'} />
                <Field lbl="ADX"           val={s.adx}     onChange={upd('adx')}     ph="22.56" />
                <Field lbl="+DI"           val={s.plusDI}  onChange={upd('plusDI')}  ph="32.26" />
                <Field lbl="-DI"           val={s.minusDI} onChange={upd('minusDI')} ph="14.03" />
                <Field lbl="RSI"           val={s.rsi}     onChange={upd('rsi')}     ph="73.43" />
              </div>
            </div>

            {/* ── VALIDATION ── */}
            {val && (
              <div style={S.card}>
                <div style={S.sec}>Wilder Rule Check</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {val.checks.map((c, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'flex-start', gap:10, padding:'12px 14px', borderRadius:12,
                      background: c.ok===true?'#f0fdf4': c.ok===false?'#fef2f2':'#fffbeb',
                      border:`1.5px solid ${c.ok===true?'#86efac': c.ok===false?'#fca5a5':'#fcd34d'}`,
                    }}>
                      <span style={{ fontSize:17 }}>{c.ok===true?'✅': c.ok===false?'❌':'⚠️'}</span>
                      <span style={{ fontSize:13, fontWeight:700, lineHeight:1.5,
                        color: c.ok===true?'#15803d': c.ok===false?'#b91c1c':'#92400e' }}>
                        {c.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:12, padding:'14px 16px', borderRadius:14, textAlign:'center', background: tradeOk?'#16a34a':'#dc2626' }}>
                  <span style={{ fontSize:14, fontWeight:900, color:'#fff' }}>
                    {tradeOk ? '✓  TRADE VALID — All Rules Passed' : '✗  TRADE INVALID — Fix Issues Above'}
                  </span>
                </div>
              </div>
            )}

            {/* ── RESULTS ── */}
            {res && (
              <>
                <div style={{ background:dirColor, borderRadius:18, padding:'18px 20px', textAlign:'center', marginBottom:14 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.6)', letterSpacing:3, marginBottom:6 }}>ACTIVE TRADE</div>
                  <div style={{ fontSize:28, fontWeight:900, color:'#fff' }}>{s.direction} {s.pair}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.8)', marginTop:6 }}>Entry @ {res.entryFmt}</div>
                </div>

                {/* Trade Levels */}
                <div style={S.card}>
                  <div style={S.sec}>Trade Levels</div>
                  <div style={{ display:'flex', gap:10, marginBottom:10 }}>
                    <PriceBox lbl="Stop Loss"    price={res.slPrice}  pips={res.slPips}  dollar={`-$${res.slLoss}`}  color="#dc2626" bg="#fef2f2" border="#fca5a5" />
                    <PriceBox lbl="TP1 · 2×ATR"  price={res.tp1Price} pips={res.tp1Pips} dollar={`+$${res.tp1Prof}`} color="#16a34a" bg="#f0fdf4" border="#86efac" />
                  </div>
                  <div style={{ background:'#eff6ff', border:'1.5px solid #93c5fd', borderRadius:14, padding:'14px 12px', textAlign:'center' }}>
                    <div style={{ fontSize:10, fontWeight:800, color:'#2563eb', textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>
                      TP2 · 3×ATR — Hold if ADX is Still Rising
                    </div>
                    <div style={{ fontSize:20, fontWeight:900, color:'#1d4ed8', marginBottom:6 }}>{res.tp2Price}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:'#2563eb' }}>
                      {res.tp2Pips} pips · +${res.tp2Prof} · RR {res.rr2}:1
                    </div>
                  </div>

                  {res.isJpy && (
                    <Note emoji="⚡" text="JPY pair confirmed — pip distance calculated correctly using 0.01 (2nd decimal place)." bg="#eff6ff" border="#93c5fd" textColor="#1d4ed8" />
                  )}
                </div>

                {/* Account Stats */}
                <div style={S.card}>
                  <div style={S.sec}>Account Stats</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                    <Stat lbl="Risk %" val={res.riskPct+'%'} color={+res.riskPct>10?'#dc2626': +res.riskPct>5?'#d97706':'#16a34a'} />
                    <Stat lbl="RR (TP1)" val={res.rr1+' : 1'} color={+res.rr1>=2?'#16a34a':'#d97706'} />
                    <Stat lbl="Pip Value" val={'$'+res.pipVal} />
                    <Stat lbl="SL Basis" val={res.sarBasis?'SAR':'ATR'} />
                    <Stat lbl="Margin Used" val={'$'+res.margin} />
                    <Stat lbl="Free Margin" val={'$'+res.free} color={res.marginRisk?'#dc2626':'#16a34a'} />
                  </div>

                  {res.marginRisk && (
                    <Note emoji="⚠️" text={`Margin call risk — Free margin ($${res.free}) is less than potential loss ($${res.slLoss}). Broker may close trade before SL.`} bg="#fef2f2" border="#fca5a5" textColor="#991b1b" />
                  )}
                </div>
              </>
            )}

            {!res && !val && (
              <div style={{ ...S.card, textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:44, marginBottom:14 }}>📊</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#374151', marginBottom:8 }}>Select a pair and fill in all values</div>
                <div style={{ fontSize:13, fontWeight:500, color:'#9ca3af' }}>SL, TP and full Wilder analysis will appear here</div>
              </div>
            )}
          </>
        )}

        <div style={{ textAlign:'center', fontSize:11, fontWeight:600, color:'#9ca3af', padding:'16px 0 20px' }}>
          Based on Welles Wilder — New Concepts in Technical Trading Systems (1978)
        </div>
      </div>
    </div>
  )
}
