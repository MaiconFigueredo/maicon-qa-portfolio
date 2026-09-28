import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import ptBR from './ptBR'

const STORAGE_KEY = 'portfolio-language'
const translations = { en, 'pt-BR': ptBR }
const LanguageContext = createContext(null)

function updateMeta(selector, value) {
  const element = document.querySelector(selector)
  if (element) element.setAttribute('content', value)
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return translations[saved] ? saved : 'en'
  })

  const setLanguage = (nextLanguage) => {
    if (!translations[nextLanguage]) return
    localStorage.setItem(STORAGE_KEY, nextLanguage)
    setLanguageState(nextLanguage)
  }

  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = t.meta.lang
    document.title = t.meta.title
    updateMeta('meta[name="description"]', t.meta.description)
    updateMeta('meta[property="og:title"]', t.meta.title)
    updateMeta('meta[property="og:description"]', t.meta.description)
    updateMeta('meta[property="og:locale"]', t.meta.ogLocale)
    updateMeta('meta[name="twitter:title"]', t.meta.title)
    updateMeta('meta[name="twitter:description"]', t.meta.description)
  }, [language, t])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useTranslation must be used inside LanguageProvider')
  return context
}
