import { I18n } from 'i18n-js'
import en from './en.json'
import fr from './fr.json'

const STORAGE_NAME = 'locale'
export const Locales = {
  EN: 'en',
  FR: 'fr'
}
export const getStoredLocale = () => {
  return localStorage.getItem(STORAGE_NAME)
}

export const setStoredLocale = (l) => {
  return localStorage.setItem(STORAGE_NAME, l)
}

let i18n = new I18n({
  en,
  fr
})

const locale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language
let defaultLocale = Locales.FR
if (
  locale &&
  typeof locale === 'string' &&
  locale.length > 0 &&
  Object.values(Locales).includes(locale.substring(0, 2))
) {
  defaultLocale = locale
}
i18n.defaultLocale = defaultLocale
const prepareInternationalization = async () => {
  try {
    const l = await getStoredLocale()
    if (l !== 'null' && l !== null) {
      i18n.locale = l
    } else {
      i18n.locale = Locales.FR
    }
    return i18n
  } catch (error) {
    console.info(error)
  }
}

i18n.onChange(({ locale }) => {
  setStoredLocale(locale)
})

prepareInternationalization().then((i) => (i18n = i))

export { i18n }
