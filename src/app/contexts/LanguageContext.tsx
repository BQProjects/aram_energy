"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.schedule': 'Schedule a call',
    'nav.contact': 'Contact',
    'header.getQuote': 'Get a quote',
    
    // Main page
    'hero.title': 'Aram Energy Solution',
    'hero.subtitle': 'Your trusted partner for energy solutions',
    'hero.learnMore': 'Learn more',
    
    // About section
    'about.title': 'About Aram Energy Solution',
    'about.affordableRates': 'Affordable rates for everyone',
    'about.affordableRatesDesc': 'Attractive electricity and gas prices for businesses and private customers.',
    'about.contactPerson': 'Permanent contact person',
    'about.contactPersonDesc': 'Personal support without constant changes.',
    'about.reliablePartner': 'Reliable partner',
    'about.reliablePartnerDesc': 'Together with Energie Service Pool GmbH.',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.values': 'Our Values',
    
    // Mission section
    'mission.title': 'Our Mission',
    'mission.transparentPricing': 'Transparent pricing',
    'mission.transparentPricingDesc': 'No hidden fees. Clear, upfront costs for all customers.',
    'mission.sustainableEnergy': 'Sustainable energy',
    'mission.sustainableEnergyDesc': 'We support green energy solutions for a better future.',
    'mission.fastSwitching': 'Fast switching',
    'mission.fastSwitchingDesc': 'Quick and easy transition to our services with minimal hassle.',
    'mission.customerSatisfaction': 'Customer satisfaction',
    'mission.customerSatisfactionDesc': 'Dedicated to providing excellent support and reliable service.',
    
    // Wide Range section
    'wideRange.title': 'Bundle energy cleverly – with Aram Energy Solution',
    'wideRange.subtitle': 'Energy that suits you – for businesses and private households',
    'wideRange.cta': 'Contact us now and secure a framework agreement!',
    'wideRange.description': 'As an independent energy optimizer based in Paderborn, we offer attractive electricity and gas contracts – regardless of whether you are billed according to the RLM or SLP. Whether you are a small business, medium-sized company, or private household – Aram Energy Solution offers customized electricity and gas contracts at consistently favorable terms.',
    
    // Services section
    'services.title': 'Our Services',
    'services.electricity': 'Electricity Solutions',
    'services.gas': 'Gas Solutions',
    'services.renewable': 'Renewable Energy',
    
    // How it works
    'howItWorks.title': 'How It Works',
    'howItWorks.interested': 'Interested in photovoltaic systems?',
    'howItWorks.solarEnergy': 'Use solar energy now and save in the long term!',
    'howItWorks.description': 'Are you considering a solar system for your home or business? Then you\'ve come to the right place. We\'ll be happy to receive your inquiry and forward it to one of our experienced partners.',
    'howItWorks.step1': 'You register your interest with us.',
    'howItWorks.step2': 'A certified solar expert will contact you and come to your home for a personal consultation.',
    'howItWorks.step3': 'Together we will determine which solution best suits your roof, your consumption and your budget.',
    'howItWorks.step4': 'You will receive a tailor-made offer – transparent and non-binding.',
    'howItWorks.cta': 'Express your interest now without obligation and secure a consultation!',
    
    // Get a quote
    'getQuote.title': 'How can I get a quote?',
    'getQuote.description': 'You have an electricity bill, which you send to us digitally via WhatsApp or email. We\'ll explain everything to you and send you an offer immediately. If you accept it, we\'ll take care of the switching process for you.',
    'getQuote.referral.title': 'Customers refer customers – Join in. It\'s worth it!',
    'getQuote.referral.subtitle': 'Recommend Aram Energy Solution and benefit:',
    'getQuote.referral.description': 'We\'d like to thank you for your loyalty – and at the same time give even more people the opportunity to benefit from our affordable electricity and gas offers. That\'s why we\'ve launched our referral program.',
    'getQuote.step1': 'Recommend us to friends, acquaintances or business partners.',
    'getQuote.step2': 'The new customer concludes a contract based on your recommendation.',
    'getQuote.step3': 'You will receive a 40€ bonus',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.address': 'Address',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.imprint': 'Imprint',
    'footer.accessibility': 'Accessibility Statement',
    'footer.refund': 'Refund Policy',
    
    // Calculation form
    'calculation.title': 'Calculate Your Tariff',
    'calculation.electricity': 'Electricity',
    'calculation.gas': 'Gas',
    'calculation.consumption': 'Annual Consumption (kWh)',
    'calculation.zipCode': 'ZIP Code',
    'calculation.calculate': 'Calculate',
    'calculation.customerType': 'Customer type',
    'calculation.private': 'Private',
    'calculation.company': 'Company',
    'calculation.tariffKey': 'Tariff key',
    'calculation.transactionKey': 'Transaction key',
    'calculation.zipCodePlaceholder': 'Enter postal code',
    'calculation.consumptionPlaceholder': 'Enter annual consumption',
    'calculation.tariffKeyPlaceholder': 'Enter tariff key',
    'calculation.transactionKeyPlaceholder': 'Enter transaction key',
    'calculation.helpText': 'Do you need help calculating your consumption?',
  },
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.about': 'Über uns',
    'nav.schedule': 'Anruf vereinbaren',
    'nav.contact': 'Kontakt',
    'header.getQuote': 'Angebot einholen',
    
    // Main page
    'hero.title': 'Aram Energy Solution',
    'hero.subtitle': 'Ihr vertrauensvoller Partner für Energielösungen',
    'hero.learnMore': 'Mehr erfahren',
    
    // About section
    'about.title': 'Über Aram Energy Solution',
    'about.affordableRates': 'Attraktive Preise für jeden',
    'about.affordableRatesDesc': 'Attraktive Strom- und Gaspreise für Unternehmen und Privatkunden.',
    'about.contactPerson': 'Dauerhafter Ansprechpartner',
    'about.contactPersonDesc': 'Persönliche Unterstützung ohne konstante Änderungen.',
    'about.reliablePartner': 'Zuverlässiger Partner',
    'about.reliablePartnerDesc': 'Zusammen mit Energie Service Pool GmbH.',
    'about.mission': 'Unsere Mission',
    'about.vision': 'Unsere Vision',
    'about.values': 'Unsere Werte',
    
    // Mission section
    'mission.title': 'Unsere Mission',
    'mission.transparentPricing': 'Transparente Preise',
    'mission.transparentPricingDesc': 'Keine versteckten Gebühren. Klar, vorab Kosten für alle Kunden.',
    'mission.sustainableEnergy': 'Nachhaltige Energien',
    'mission.sustainableEnergyDesc': 'Wir unterstützen nachhaltige Energielösungen für eine bessere Zukunft.',
    'mission.fastSwitching': 'Schnelle Umstellung',
    'mission.fastSwitchingDesc': 'Schnelle und einfache Umstellung auf unsere Dienste mit minimalem Aufwand.',
    'mission.customerSatisfaction': 'Kundenzufriedenheit',
    'mission.customerSatisfactionDesc': 'Verpflichtet, hervorragende Unterstützung und zuverlässige Service zu bieten.',
    
    // Wide Range section
    'wideRange.title': 'Energie clever bündeln – mit Aram Energy Solution',
    'wideRange.subtitle': 'Energie, die zu Ihnen passt – für Unternehmen und Privathaushalte',
    'wideRange.cta': 'Kontaktieren Sie uns jetzt und sichern Sie sich einen Rahmenvertrag!',
    'wideRange.description': 'Als unabhängiger Energieoptimierer mit Sitz in Paderborn bieten wir attraktive Strom- und Gasverträge – unabhängig davon, ob Sie nach RLM oder SLP abgerechnet werden. Ob Sie ein kleines Unternehmen, ein mittelständisches Unternehmen oder ein Privathaushalt sind – Aram Energy Solution bietet maßgeschneiderte Strom- und Gasverträge zu durchgehend günstigen Konditionen.',
    
    // Services section
    'services.title': 'Unsere Dienstleistungen',
    'services.electricity': 'Stromlösungen',
    'services.gas': 'Gaslösungen',
    'services.renewable': 'Erneuerbare Energien',
    
    // How it works
    'howItWorks.title': 'So funktioniert es',
    'howItWorks.interested': 'Interessiert an Photovoltaik-Systemen?',
    'howItWorks.solarEnergy': 'Nutzen Sie jetzt Solarenergie und sparen Sie in der langen Frist!',
    'howItWorks.description': 'Sind Sie an einem Solarsystem für Ihr Zuhause oder Ihr Unternehmen interessiert? Dann sind Sie hier genau richtig. Wir freuen uns, Ihre Anfrage zu erhalten und an einen unserer erfahrenen Partner weiterzuleiten.',
    'howItWorks.step1': 'Sie registrieren Ihr Interesse bei uns.',
    'howItWorks.step2': 'Ein zertifizierter Solarexperte wird Sie kontaktieren und zu Ihrem Wohnort kommen, um eine persönliche Beratung abzuschließen.',
    'howItWorks.step3': 'Zusammen bestimmen wir, welche Lösung am besten zu Ihrem Dach, Ihrem Verbrauch und Ihrem Budget passt.',
    'howItWorks.step4': 'Sie erhalten eine maßgeschneiderte Offerte – transparent und unverbindlich.',
    'howItWorks.cta': 'Machen Sie jetzt Ihr Interesse ohne Verpflichtung aus und sichern Sie eine Beratung!',
    
    // Get a quote
    'getQuote.title': 'Wie kann ich ein Angebot erhalten?',
    'getQuote.description': 'Sie haben eine Stromrechnung, die Sie uns digital über WhatsApp oder E-Mail zusenden. Wir erklären Ihnen alles und senden Ihnen sofort ein Angebot. Wenn Sie es annehmen, übernehmen wir den Wechselprozess für Sie.',
    'getQuote.referral.title': 'Kunden empfehlen Kunden – Machen Sie mit. Es lohnt sich!',
    'getQuote.referral.subtitle': 'Empfehlen Sie Aram Energy Solution und profitieren Sie:',
    'getQuote.referral.description': 'Wir möchten uns für Ihre Treue bedanken – und gleichzeitig noch mehr Menschen die Möglichkeit geben, von unseren günstigen Strom- und Gasangeboten zu profitieren. Deshalb haben wir unser Empfehlungsprogramm gestartet.',
    'getQuote.step1': 'Empfehlen Sie uns an Freunde, Bekannte oder Geschäftspartner.',
    'getQuote.step2': 'Der neue Kunde schließt einen Vertrag auf Basis Ihrer Empfehlung ab.',
    'getQuote.step3': 'Sie erhalten einen 40€ Bonus',
    
    // Footer
    'footer.contact': 'Kontakt',
    'footer.address': 'Adresse',
    'footer.legal': 'Rechtliches',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.imprint': 'Impressum',
    'footer.accessibility': 'Zugänglichkeitserklärung',
    'footer.refund': 'Rückgabepolicy',
    
    // Calculation form
    'calculation.title': 'Ihren Tarif berechnen',
    'calculation.electricity': 'Strom',
    'calculation.gas': 'Gas',
    'calculation.consumption': 'Jahresverbrauch (kWh)',
    'calculation.zipCode': 'PLZ',
    'calculation.calculate': 'Berechnen',
    'calculation.customerType': 'Kundenart',
    'calculation.private': 'Privat',
    'calculation.company': 'Firma',
    'calculation.tariffKey': 'Tarifschlüssel',
    'calculation.transactionKey': 'Transaktionsschlüssel',
    'calculation.zipCodePlaceholder': 'Postleitzahl eingeben',
    'calculation.consumptionPlaceholder': 'Jahresverbrauch eingeben',
    'calculation.tariffKeyPlaceholder': 'Tarifschlüssel eingeben',
    'calculation.transactionKeyPlaceholder': 'Transaktionsschlüssel eingeben',
    'calculation.helpText': 'Brauchen Sie Hilfe bei der Berechnung Ihres Verbrauchs?',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
