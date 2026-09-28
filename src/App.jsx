import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, Check, ChevronRight, CircleDot, Code2, Download,
  ExternalLink, Gauge, Layers3, Link2, Menu, MonitorSmartphone, Network,
  Search, ShieldCheck, Sparkles, TerminalSquare, TestTube2, X,
} from 'lucide-react'
import { useTranslation } from './i18n/LanguageContext'
import profile from './config/profile'

function SectionHeading({ eyebrow, title, description }) {
  return <div className="section-heading reveal"><span className="eyebrow"><span aria-hidden="true">//</span> {eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation()
  return <div className="language-switch" role="group" aria-label={t.language.groupLabel}>
    <button type="button" aria-label={t.language.englishLabel} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <span aria-hidden="true"></span>
    <button type="button" aria-label={t.language.portugueseLabel} aria-pressed={language === 'pt-BR'} onClick={() => setLanguage('pt-BR')}>PT-BR</button>
  </div>
}

function Header({ active }) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return <header className="site-header">
    <a className="brand" href="#home" aria-label={t.header.homeLabel}><span className="brand-mark">MF</span><span className="brand-copy">Maicon Figueredo<small>{t.header.quality}</small></span></a>
    <nav className={open ? 'nav open' : 'nav'} aria-label={t.header.navLabel}>
      {t.nav.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <LanguageSwitch />
    <button className="menu-toggle" aria-label={t.header.toggleNavigation} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <a className="header-cta" href={profile.linkedin} target="_blank" rel="noreferrer">{t.header.linkedin} <ExternalLink aria-hidden="true" /></a>
  </header>
}

function Hero() {
  const { t, language } = useTranslation()
  return <section id="home" className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-copy reveal">
      <div className="availability"><span></span> {t.hero.availability}</div>
      <p className="hero-kicker">{t.hero.greeting}</p>
      <h1 id="hero-title">{t.hero.title}<span>{t.hero.subtitle}</span></h1>
      <p className="hero-lede">{t.hero.description}</p>
      <div className="hero-actions">
        <a className="button primary" href="#projects">{t.hero.viewProjects} <ArrowDown aria-hidden="true" /></a>
        <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Link2 aria-hidden="true" /> {t.hero.linkedin}</a>
        <a className="button ghost" href={profile.resume[language]} download title={t.hero.resumeTitle}><Download aria-hidden="true" /> {t.hero.downloadResume}</a>
      </div>
      <div className="hero-badges" aria-label={t.hero.coreSkillsLabel}>{t.hero.badges.map(badge => <span key={badge}>{badge}</span>)}</div>
    </div>
    <div className="quality-console reveal" aria-label={t.hero.consoleLabel}>
      <div className="console-head"><span><i></i><i></i><i></i></span><code>quality.signal</code><ShieldCheck aria-hidden="true" /></div>
      <div className="console-body">
        <div className="console-status"><span className="pulse"></span><strong>{t.hero.status}</strong><small>{t.hero.statusDetail}</small></div>
        <div className="signal-chart" aria-hidden="true">{[42,64,35,78,55,88,62,94,70,100,76,92].map((h,i) => <span key={i} style={{'--height':`${h}%`}}></span>)}</div>
        <div className="console-grid">{t.hero.metrics.map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <div className="console-log">{t.hero.logs.map(([label,status],index) => <p key={label}><span>{String(index+1).padStart(2,'0')}</span>{label}<em>{status}</em></p>)}</div>
      </div>
    </div>
  </section>
}

function ProofStrip() {
  const { t } = useTranslation()
  return <div className="proof-strip section-shell reveal" aria-label={t.hero.coreSkillsLabel}>{t.proof.map(([title,text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}</div>
}

function About() {
  const { t } = useTranslation()
  return <section id="about" className="section section-shell">
    <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} description={t.about.description} />
    <div className="about-grid">
      <article className="about-main surface reveal"><div className="icon-box"><ShieldCheck aria-hidden="true" /></div><h3>{t.about.mainTitle}</h3>{t.about.mainParagraphs.map(p => <p key={p}>{p}</p>)}</article>
      {t.about.cards.map((card,index) => <article className="about-card surface reveal" key={card.index}><span className="card-index">{card.index}</span>{index===0?<MonitorSmartphone aria-hidden="true"/>:<Network aria-hidden="true"/>}<h3>{card.title}</h3><p>{card.text}</p></article>)}
      <article className="about-card wide surface reveal"><span className="card-index">{t.about.practiceIndex}</span><div className="practice-list">{t.about.practices.map(item => <span key={item}><Check aria-hidden="true"/>{item}</span>)}</div></article>
    </div>
  </section>
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)
  const { t } = useTranslation()
  useEffect(() => { if (project && ref.current && !ref.current.open) ref.current.showModal() }, [project])
  if (!project) return null
  return <dialog className="project-dialog" ref={ref} onClose={onClose} onClick={e => e.target===e.currentTarget && e.currentTarget.close()}>
    <div className="dialog-inner">
      <button className="dialog-close" onClick={() => ref.current?.close()} aria-label={t.common.closeProject}><X/></button>
      <span className="eyebrow">{t.common.project} {project.index}</span><h2>{project.name}</h2><p className="dialog-lede">{project.description}</p>
      <div className="dialog-grid">
        <div><h3>{t.common.problem}</h3><p>{project.problem}</p></div><div><h3>{t.common.solution}</h3><p>{project.solution}</p></div>
        <div><h3>{t.common.mainResults}</h3><ul>{project.results.map(item => <li key={item}><Check/>{item}</li>)}</ul></div>
        <div><h3>{t.common.architecture}</h3><ol>{project.architecture.map((item,i) => <li key={item}><span>{String(i+1).padStart(2,'0')}</span>{item}</li>)}</ol></div>
      </div><div className="chips">{project.technologies.map(item => <span key={item}>{item}</span>)}</div>
    </div>
  </dialog>
}

function PresenceVisual({ project }) {
  const { t } = useTranslation()
  return <div className="presence-visual" aria-label={`${project.name} - ${t.projectSection.criticalJourney}`}>
    <div className="phone-frame"><div className="phone-top"></div><div className="phone-content"><span className="mini-label">{t.projectSection.criticalJourney}</span><ShieldCheck/><strong>{t.projectSection.firstAccess}</strong><small>{t.projectSection.checkpoints}</small><div className="phone-progress"><span></span></div></div></div>
    <div className="flow-stack">{project.flow.map((item,i) => <div key={item}><span>{i+1}</span>{item}{i<project.flow.length-1&&<ChevronRight/>}</div>)}</div>
  </div>
}

function PerformanceMiniChart() {
  const { t } = useTranslation()
  return <div className="perf-mini" aria-label={t.projectSection.chartAria}>
    <div className="perf-label"><span>{t.projectSection.performanceReport}</span><small>{t.projectSection.nonProduction}</small></div>
    <svg viewBox="0 0 320 104" role="img" aria-label={t.projectSection.chartLabel}><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#51d7ff" stopOpacity=".28"/><stop offset="1" stopColor="#51d7ff" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 88 L0 72 L32 68 L64 74 L96 55 L128 61 L160 38 L192 49 L224 26 L256 43 L288 20 L320 30 L320 88 Z"/><path className="chart-line" d="M0 72 L32 68 L64 74 L96 55 L128 61 L160 38 L192 49 L224 26 L256 43 L288 20 L320 30"/><line x1="0" y1="88" x2="320" y2="88"/></svg>
    <div className="perf-legend"><span><i className="cyan"></i>{t.projectSection.latency}</span><span><i className="violet"></i>{t.projectSection.throughput}</span><span><i className="red"></i>{t.projectSection.errors}</span></div>
  </div>
}

function Projects() {
  const [selectedId,setSelectedId] = useState(null)
  const { t } = useTranslation()
  const main=t.projects[0], selected=t.projects.find(project=>project.id===selectedId)||null
  return <section id="projects" className="section section-shell">
    <SectionHeading eyebrow={t.projectSection.eyebrow} title={t.projectSection.title} description={t.projectSection.description}/>
    <article className="featured-project surface reveal"><div className="project-copy"><span className="card-index">{t.common.project} {main.index} · {main.label}</span><h3>{main.name}</h3><p>{main.description}</p><div className="project-facts"><div><span>{t.common.problem}</span><p>{main.problem}</p></div><div><span>{t.common.solution}</span><p>{main.solution}</p></div></div><div className="chips">{main.technologies.map(item=><span key={item}>{item}</span>)}</div><button className="text-button" onClick={()=>setSelectedId(main.id)}>{t.common.viewProject} <ArrowRight/></button></div><PresenceVisual project={main}/></article>
    <div className="project-grid">{t.projects.slice(1).map(project => <article key={project.id} className={`project-card surface reveal project-${project.id}`}>
      <span className="card-index">{t.common.project} {project.index} · {project.label}</span><div className="project-icon">{project.id==='monitor'?<TerminalSquare/>:project.id==='api'?<Network/>:project.id==='performance'?<Gauge/>:<Code2/>}</div><h3>{project.name}</h3><p>{project.description}</p>
      {project.id==='performance'&&<PerformanceMiniChart/>}{project.id==='api'&&<div className="api-sample"><code><i>POST</i> /v1/session</code><code><span>200</span> contract.valid</code></div>}
      {project.id==='monitor'&&<div className="log-sample">{t.projectSection.logLines.map((line,index)=><code key={line}><span>12:04:{21+index*3}</span> {line}</code>)}</div>}
      {project.id==='web'&&<div className="layer-sample">{project.architecture.map(item=><span key={item}>{item}</span>)}</div>}
      <div className="chips compact">{project.technologies.map(item=><span key={item}>{item}</span>)}</div><button className="text-button" onClick={()=>setSelectedId(project.id)}>{t.common.viewProject} <ArrowRight/></button>
    </article>)}</div>
    <ProjectDialog project={selected} onClose={()=>setSelectedId(null)}/>
  </section>
}

function TestingProcess() {
  const { t } = useTranslation(); const icons=[Search,TestTube2,CircleDot,ShieldCheck]
  return <section id="process" className="section section-shell process-section"><SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} description={t.process.description}/><div className="process-track reveal">{t.process.steps.map((step,i)=><div className="process-step" key={step}><span>{String(i+1).padStart(2,'0')}</span><strong>{step}</strong>{i<t.process.steps.length-1&&<ArrowRight aria-hidden="true"/>}</div>)}</div><div className="strategy-grid"><article className="surface strategy-card reveal"><span className="card-index">{t.process.strategyIndex}</span><h3>{t.process.strategyTitle}</h3><p>{t.process.strategyText}</p><div className="strategy-points">{t.process.strategyPoints.map((point,index)=>{const Icon=icons[index];return <span key={point}><Icon/> {point}</span>})}</div></article><TestPyramid/></div></section>
}

function TestPyramid() {
  const { t }=useTranslation(); const classes=['pyr-e2e','pyr-integration','pyr-api','pyr-unit']
  return <article className="surface pyramid-card reveal"><div className="pyramid-copy"><span className="card-index">{t.process.pyramidIndex}</span><h3>{t.process.pyramidTitle}</h3><p>{t.process.pyramidText}</p></div><div className="pyramid" aria-label={t.process.pyramidAria}>{t.process.pyramid.map(([level,detail],index)=><div className={classes[index]} key={level}>{level} <small>{detail}</small></div>)}</div></article>
}

function TechStack() {
  const { t }=useTranslation(); const icons=[Code2,Network,MonitorSmartphone,Gauge,Layers3,TerminalSquare,TestTube2,Search,Sparkles]
  return <section id="stack" className="section section-shell"><SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.title} description={t.stack.description}/><div className="stack-grid">{t.stack.groups.map((group,i)=>{const Icon=icons[i];return <article className="stack-card surface reveal" key={group.title}><div className="stack-title"><Icon aria-hidden="true"/><h3>{group.title}</h3></div><p>{group.note}</p><div className="chips compact">{group.tools.map(tool=><span key={tool}>{tool}</span>)}</div></article>})}</div></section>
}

function Experience() {
  const { t }=useTranslation()
  return <section id="experience" className="section section-shell"><SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description}/><div className="timeline">{t.experience.items.map((item,i)=><article className="timeline-item reveal" key={`${item.company}-${item.years}`}><div className="timeline-marker"><span>{String(i+1).padStart(2,'0')}</span></div><div className="timeline-date">{item.years}</div><div className="timeline-content surface"><span className="company">{item.company}</span><h3>{item.role}</h3><p>{item.description}</p><div className="chips compact">{item.tools.map(tool=><span key={tool}>{tool}</span>)}</div></div></article>)}</div></section>
}

function Toolbox() {
  const { t }=useTranslation()
  return <section id="toolbox" className="section section-shell"><SectionHeading eyebrow={t.toolbox.eyebrow} title={t.toolbox.title} description={t.toolbox.description}/><div className="toolbox-grid">{t.toolbox.groups.map(group=><article className="toolbox-card surface reveal" key={group.id}><span className="card-index">{group.id}</span><h3>{group.title}</h3><p>{group.text}</p><ul>{group.items.map(item=><li key={item}><Check/>{item}</li>)}</ul></article>)}</div></section>
}

function Credentials() {
  const { t }=useTranslation()
  return <section id="certifications" className="section section-shell credentials-section"><SectionHeading eyebrow={t.credentials.eyebrow} title={t.credentials.title} description={t.credentials.description}/><div className="credential-grid">{t.credentials.items.map(item=><article className="credential-card surface reveal" key={item.title}><span className="card-index">{item.type}</span><ShieldCheck aria-hidden="true"/><h3>{item.title}</h3><p>{item.issuer}</p><small>{item.detail}</small></article>)}</div></section>
}

function Contact() {
  const { t }=useTranslation(); const icons=[CircleDot,Network,MonitorSmartphone]
  return <section id="contact" className="section section-shell contact-section"><div className="contact-card reveal"><span className="eyebrow">{t.contact.eyebrow}</span><h2>{t.contact.title}</h2><p>{t.contact.description}</p><div className="contact-meta">{t.contact.meta.map((item,index)=>{const Icon=icons[index];return <span key={item}><Icon/> {item}</span>})}</div><a className="button primary" href={profile.linkedin} target="_blank" rel="noreferrer"><Link2/> {t.contact.button} <ArrowRight/></a></div></section>
}

function Footer() {
  const { t }=useTranslation()
  return <footer className="footer section-shell"><div><span className="brand-mark">MF</span><p><strong>Maicon Figueredo</strong><small>{t.footer.role}</small></p></div><p>{t.footer.statement}</p><a href="#home">{t.footer.backToTop} <ArrowDown/></a></footer>
}

export default function App() {
  const [active,setActive]=useState('home'); const { t }=useTranslation()
  useEffect(()=>{
    const sections=t.nav.map(([id])=>document.getElementById(id)).filter(Boolean)
    const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setActive(visible[0].target.id)},{rootMargin:'-25% 0px -60%',threshold:[0,.2,.5]})
    sections.forEach(section=>sectionObserver.observe(section))
    const reveals=document.querySelectorAll('.reveal')
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12})
    reveals.forEach(item=>revealObserver.observe(item))
    return()=>{sectionObserver.disconnect();revealObserver.disconnect()}
  },[t])
  return <><a className="skip-link" href="#main">{t.skipLink}</a><div className="page-grid" aria-hidden="true"></div><Header active={active}/><main id="main"><Hero/><ProofStrip/><About/><Projects/><TestingProcess/><TechStack/><Experience/><Toolbox/><Credentials/><Contact/></main><Footer/></>
}
