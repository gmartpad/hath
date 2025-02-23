import enGB from '../lang/en-GB.json'
import enUS from '../lang/en-US.json'
import zh from '../lang/zh.json'
import hi from '../lang/hi.json'
import es from '../lang/es.json'
import ar from '../lang/ar.json'
import fr from '../lang/fr.json'
import bn from '../lang/bn.json'
import ru from '../lang/ru.json'
import pt from '../lang/pt.json'
import ptBR from '../lang/pt-BR.json'
import id from '../lang/id.json'

export const messages = {
  'en-GB': enGB,
  'en-US': enUS,
  zh,
  hi,
  es,
  ar,
  fr,
  bn,
  ru,
  pt,
  'pt-BR': ptBR,
  id
}

export type SupportedLanguage = keyof typeof messages

export const isRTL = (language: string): boolean => language === 'ar'

