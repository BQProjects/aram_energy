"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation data
const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.schedule": "Schedule a call",
    "nav.contact": "Contact",
    "header.getQuote": "Get a quote",

    // Main page
    "hero.title": "Aram Energy Solution",
    "hero.subtitle": "Your trusted partner for energy solutions",
    "hero.learnMore": "Learn more",
    "hero.description": "Discover our energy consulting services",

    // About section
    "about.title": "About Aram Energy Solution",
    "about.affordableRates": "Affordable rates for everyone",
    "about.affordableRatesDesc":
      "Attractive electricity and gas prices for businesses and private customers.",
    "about.contactPerson": "Permanent contact person",
    "about.contactPersonDesc": "Personal support without constant changes.",
    "about.reliablePartner": "Reliable partner",
    "about.reliablePartnerDesc": "Together with Energie Service Pool GmbH.",
    "about.mission": "Our Mission",
    "about.vision": "Our Vision",
    "about.values": "Our Values",

    // Mission section
    "mission.title": "Our Mission",
    "mission.transparentPricing": "Save more by switching providers",
    "mission.transparentPricingDesc":
      "Higher consumption brings greater savings potential.",
    "mission.sustainableEnergy": "Individual consulting for companies",
    "mission.sustainableEnergyDesc":
      "Tailor-made offers for commercial customers.",
    "mission.fastSwitching": "Check and optimize billing",
    "mission.fastSwitchingDesc": "We analyze your contracts holistically.",
    "mission.customerSatisfaction": "Easy change, full support",
    "mission.customerSatisfactionDesc":
      "Non-binding advice and professional handling.",

    // Wide Range section
    "wideRange.title": "Bundle energy cleverly – with Aram Energy Solution",
    "wideRange.subtitle":
      "Energy that suits you – for businesses and private households",
    "wideRange.cta": "Contact us now and secure a framework agreement!",
    "wideRange.description":
      "As an independent energy optimizer based in Paderborn, we offer attractive electricity and gas contracts – regardless of whether you are billed according to the RLM or SLP. Whether you are a small business, medium-sized company, or private household – Aram Energy Solution offers customized electricity and gas contracts at consistently favorable terms.",

    // Wide Range features (for WideRangeScroll)
    "wideRange.feature1.heading": "Wide range conditions for all",
    "wideRange.feature1.desc": "through intelligent bundling",
    "wideRange.feature2.heading": "Reliable energy suppliers",
    "wideRange.feature2.desc": "e.g. Stadtwerke Duisburg AG",
    "wideRange.feature3.heading": "Personal support",
    "wideRange.feature3.desc": "fixed contact person instead of hotline",
    "wideRange.feature4.heading": "All-round service",
    "wideRange.feature4.desc":
      "We take care of the change of provider and all formalities",

    // Services section
    "services.title": "Our Services",
    "services.electricity": "Electricity Solutions",
    "services.gas": "Gas Solutions",
    "services.renewable": "Renewable Energy",

    // How it works
    "howItWorks.title": "How It Works",
    "howItWorks.interested": "Interested in photovoltaic systems?",
    "howItWorks.solarEnergy": "Use solar energy now and save in the long term!",
    "howItWorks.description":
      "Are you considering a solar system for your home or business? Then you've come to the right place. We'll be happy to receive your inquiry and forward it to one of our experienced partners.",
    "howItWorks.step1": "You register your interest with us.",
    "howItWorks.step2":
      "A certified solar expert will contact you and come to your home for a personal consultation.",
    "howItWorks.step3":
      "Together we will determine which solution best suits your roof, your consumption and your budget.",
    "howItWorks.step4":
      "You will receive a tailor-made offer – transparent and non-binding.",
    "howItWorks.cta":
      "Express your interest now without obligation and secure a consultation!",

    // Get a quote
    "getQuote.title": "How can I get a quote?",
    "getQuote.description":
      "You have an electricity bill, which you send to us digitally via WhatsApp or email. We'll explain everything to you and send you an offer immediately. If you accept it, we'll take care of the switching process for you.",
    "getQuote.referral.title":
      "Customers refer customers – Join in. It's worth it!",
    "getQuote.referral.subtitle": "Recommend Aram Energy Solution and benefit:",
    "getQuote.referral.description":
      "We'd like to thank you for your loyalty – and at the same time give even more people the opportunity to benefit from our affordable electricity and gas offers. That's why we've launched our referral program.",
    "getQuote.step1":
      "Recommend us to friends, acquaintances or business partners.",
    "getQuote.step2":
      "The new customer concludes a contract based on your recommendation.",
    "getQuote.step3": "You will receive a 40€ bonus",

    // Footer
    "footer.contact": "Contact",
    "footer.address": "Address",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.imprint": "Imprint",
    "footer.accessibility": "Accessibility Statement",
    "footer.refund": "Refund Policy",

    // Calculation form
    "calculation.title": "Calculate Your Tariff",
    "calculation.electricity": "Electricity",
    "calculation.gas": "Gas",
    "calculation.consumption": "Annual Consumption in kWh",
    "calculation.zipCode": "Postal code",
    "calculation.calculate": "Calculate tariff",
    "calculation.customerType": "Customer type",
    "calculation.private": "Private",
    "calculation.company": "Company",
    "calculation.tariffKey": "Tariff key",
    "calculation.transactionKey": "Transaction key",
    "calculation.zipCodePlaceholder": "Enter your postal code",
    "calculation.consumptionPlaceholder": "Consumption in kWh",
    "calculation.tariffKeyPlaceholder": "Enter tariff key",
    "calculation.transactionKeyPlaceholder": "Enter transaction key",
    "calculation.helpText": "Do you need help calculating your consumption?",
    "calculation.validationError":
      "Please enter both annual consumption (kWh) and postal code.",

    // CalculatorCard fields
    "calculator.deliveryPointInfo": "Delivery Point Information",
    "calculator.postalCode": "Postal Code",
    "calculator.location": "Location",
    "calculator.tariffInfo": "Tariff Information",
    "calculator.division": "Division",
    "calculator.customerCategory": "Customer Category",
    "calculator.furtherInfo": "Further Information",
    "calculator.transactionKey": "Transaction Key",
    "calculator.advertisingPartner": "Advertising Partner",

    // Our Service section
    "ourService.title": "Our Services",
    "ourService.arrangeCall": "Arrange a call",
    "ourService.card1": "Home Visit",
    "ourService.card2": "Telephone Appointment",
    "ourService.card3": "Online Meeting",
    "ourService.book": "Book",

    // Booking page
    "bookNow.title": "Book a Service",
    "bookNow.subtitle": "Discover and book our available appointments now.",
    "bookNow.date": "Date",
    "bookNow.time": "Time",
    "bookNow.name": "Name",
    "bookNow.email": "Email",
    "bookNow.phone": "Phone number",
    "bookNow.error": "Booking failed. Please try again.",
    "bookNow.success": "Booking successful! We have received your request.",
    "bookNow.loading": "Booking...",
    "bookNow.submit": "Book appointment now",

    // Our Partner section
    "ourPartner.heading": "Our corporation partner:",

    // Get In Touch section
    "getInTouch.title": "Get in Touch",
    "getInTouch.subtitle":
      "Ready for your energy journey? Contact us today for a free consultation.",
    "getInTouch.contactInfo": "Contact Information",
    "getInTouch.phone": "Phone",
    "getInTouch.email": "Email",
    "getInTouch.office": "Office",
    "getInTouch.officeLocation": "Paderborn, Germany",
    "getInTouch.hours": "Business Hours",
    "getInTouch.hoursWeek": "Mon - Fri: 8:00 AM - 6:00 PM",
    "getInTouch.hoursSat": "Sat: 9:00 AM - 4:00 PM",
    "getInTouch.followUs": "Follow Us",
    "getInTouch.sendMessage": "Send Us a Message",
    "getInTouch.firstName": "First Name",
    "getInTouch.lastName": "Last Name",
    "getInTouch.emailAddress": "Email Address",
    "getInTouch.emailPlaceholder": "Enter your email address",
    "getInTouch.phoneNumber": "Telephone Number",
    "getInTouch.phonePlaceholder": "Enter your phone number",
    "getInTouch.serviceType": "Service Type",
    "getInTouch.selectService": "Select a service",
    "getInTouch.service1": "Service 1",
    "getInTouch.service2": "Service 2",
    "getInTouch.message": "Message",
    "getInTouch.messagePlaceholder": "Tell us your energy needs...",
    "getInTouch.agree":
      "I agree to receive communications from PowerGrid and understand that I can unsubscribe at any time.",
    "getInTouch.send": "Send Message",
    "getInTouch.success": "Your message has been sent successfully!",

    // Submetering section (whatisSub)
    "submetering.heading": "Submetering",
    "submetering.title": "What is submetering?",
    "submetering.button": "Click to start",
    "submetering.card1.title": "Transparent consumption thanks to submetering",
    "submetering.card1.para":
      "Submetering is the individual recording of consumption of resources such as water, heat or electricity in multi-unit buildings.",
    "submetering.card2.title": "Pay fairly – only what you use",
    "submetering.card2.para":
      "It enables fair and transparent billing, as each user only pays for what they actually consume.",
    "submetering.card3.title": "Save energy, reduce costs",
    "submetering.card3.para":
      "This promotes energy efficiency and cost savings.",
    "submetering.whoCanUse": "Who can use this?",
    "submetering.whoCanUseDesc":
      "Property managers, homeowners, housing associations and other relevant contacts are potential customers.",

    // Stepper
    "stepper.calculator": "Calculator",
    "stepper.selectOption": "Select Option",
    "stepper.personalDetails": "Personal Details",
    "stepper.addressDetails": "Address Details",
    "stepper.paymentMethod": "Payment Method",

    // SelectPower
    "selectPower.label": "Select your power consumption",
    "selectPower.low": "Low (up to 2,000 kWh)",
    "selectPower.medium": "Medium (2,000–5,000 kWh)",
    "selectPower.high": "High (over 5,000 kWh)",

    // Tariff fields for SelectPower
    "tariff.basePrice": "Base Price",
    "tariff.laborPrice": "Labor Price",
    "tariff.typeOfCurrent": "Type Of Current",
    "tariff.contractTerm": "Contract Term",
    "tariff.priceGuarantee": "Price Guarantee",
    "tariff.downPayment": "Down Payment",
    "tariff.total": "Total",
    "tariff.chooseTariff": "Choose Tariff",
    // Tariff names (optional, for translation)
    "R(H)EINPOWER Direct Electricity Tariff":
      "R(H)EINPOWER Direct Electricity Tariff",
    "R(H)EINPOWER MeinStrom Heat Pump 24 Tariff":
      "R(H)EINPOWER MeinStrom Heat Pump 24 Tariff",

    // PersonalDetails page
    "personaldetails.salutation": "Salutation",
    "personaldetails.salutationPlaceholder": "Please select...",
    "personaldetails.mr": "Mr",
    "personaldetails.ms": "Ms",
    "personaldetails.mrs": "Mrs",
    "personaldetails.dr": "Dr",
    "personaldetails.name": "Name",
    "personaldetails.namePlaceholder": "Enter your name",
    "personaldetails.surname": "Surname",
    "personaldetails.surnamePlaceholder": "Enter your surname",
    "personaldetails.billingAddress": "Billing address",
    "personaldetails.billingSame":
      "The billing address corresponds to the delivery address",
    "personaldetails.billingDifferent":
      "The billing address is different from the delivery address",
    "personaldetails.birthDate": "Birth date",
    "personaldetails.email": "E-mail address",
    "personaldetails.emailPlaceholder": "Enter your email",
    "personaldetails.repeatEmail": "Repeat email address",
    "personaldetails.repeatEmailPlaceholder": "Repeat your email",
    "personaldetails.phone": "Telephone number",
    "personaldetails.next": "Next",
    "personaldetails.error.required": "Please fill in all required fields.",
    "personaldetails.error.emailMatch": "Email addresses do not match.",

    // AddressDetails page
    "addressdetails.postalCode": "Postal Code",
    "addressdetails.postalCodePlaceholder": "Enter your postal code",
    "addressdetails.location": "Location",
    "addressdetails.locationPlaceholder": "Enter your location",
    "addressdetails.street": "Street",
    "addressdetails.streetPlaceholder": "Enter your street",
    "addressdetails.houseNumberAndSuffix":
      "House Number * / House Number Suffix",
    "addressdetails.houseNumberPlaceholder": "Number",
    "addressdetails.houseNumberSuffixPlaceholder": "Suffix",
    "addressdetails.moveInStatus": "Move-in Status",
    "addressdetails.alreadyLive": "I am currently living here (already live)",
    "addressdetails.movingIn":
      "I have just moved in or I am about to move in (move in)",
    "addressdetails.desiredStart": "Desired Start of Delivery",
    "addressdetails.previousSupplier": "Previous Supplier",
    "addressdetails.previousSupplierPlaceholder": "Enter previous supplier",
    "addressdetails.previousCustomerNo": "Previous Customer No.",
    "addressdetails.previousCustomerNoPlaceholder":
      "Enter previous customer number",
    "addressdetails.meterNo": "Meter No.",
    "addressdetails.meterNoPlaceholder": "Enter meter number",
    "addressdetails.supplierSwitchInfo":
      "Would you like to switch suppliers more quickly? Then please provide us with your store location number. This will allow us to start supplying you more quickly.",
    "addressdetails.meterLocationNo": "Meter Location No.",
    "addressdetails.meterLocationNoPlaceholder": "Enter meter location number",
    "addressdetails.billingAddress": "Billing address",
    "addressdetails.billingHouseNumberAndSuffix":
      "Billing House Number * / Suffix",
    "addressdetails.billingHouseNumberPlaceholder": "Number",
    "addressdetails.billingHouseNumberSuffixPlaceholder": "Suffix",
    "addressdetails.billingStreet": "Billing Street *",
    "addressdetails.billingStreetPlaceholder": "Enter billing street",
    "addressdetails.billingCity": "Billing City *",
    "addressdetails.billingCityPlaceholder": "Enter billing city",
    "addressdetails.billingPostal": "Billing Postal Code *",
    "addressdetails.billingPostalPlaceholder": "Enter billing postal code",
    "addressdetails.billingCountry": "Billing Country *",
    "addressdetails.billingCountryPlaceholder": "Enter billing country",
    "addressdetails.next": "Next",
    "addressdetails.error.billingType": "Please select billing type.",
    "addressdetails.error.billingFields":
      "Please fill in all required billing address fields.",
    "addressdetails.error.desiredStart":
      "Please select desired start of delivery.",
    "addressdetails.error.previousSupplier": "Please enter previous supplier.",
    "addressdetails.error.previousCustomerNo":
      "Please enter previous customer number.",
    "addressdetails.error.meterNo": "Please enter meter number.",
    "addressdetails.error.moveInStatus": "Please select move-in status.",

    // AddressCard
    "addresscard.personalInfo": "Personal information:",
    "addresscard.furtherInfo": "Further information",
    "addresscard.advertisingPartner": "Advertising business partner:",

    // SepaCard
    "sepaCard.deliveryPointInfo": "Delivery point information:",
    "sepaCard.furtherInfo": "Further information",

    // SEPA Mandate page
    "sepaMandate.title": "SEPA mandate",
    "sepaMandate.iban": "IBAN",
    "sepaMandate.ibanPlaceholder": "Enter your IBAN",
    "sepaMandate.accountHolder": "Account holder",
    "sepaMandate.accountHolderPlaceholder": "Enter account holder name",
    "sepaMandate.ibanInfo":
      "You can find the IBAN on your bank card, among other places. It consists of the country code DE, a two-digit individual security number from your bank, and a further 18 digits.",
    "sepaMandate.sepaInfo":
      "By entering my bank details, I authorize Stadtwerke Duisburg AG to collect payments from my account via SEPA direct debit. At the same time, I instruct my bank to honor the direct debits drawn on my account by Stadtwerke Duisburg AG.",
    "sepaMandate.confirmEmail": "Receive confirmation email",
    "sepaMandate.paymentTerms": "Our payment terms",
    "sepaMandate.paymentTermsSub": "debited monthly from account",
    "sepaMandate.submit": "Submit",
    "sepaMandate.submitting": "Submitting...",
    "sepaMandate.success":
      "Submission successful! Please check your email to confirm.",
    "sepaMandate.error.submissionFailed": "Submission failed",
  },
  de: {
    // Header
    "nav.home": "Startseite",
    "nav.services": "Dienstleistungen",
    "nav.about": "Über uns",
    "nav.schedule": "Anruf vereinbaren",
    "nav.contact": "Kontakt",
    "header.getQuote": "Angebot einholen",

    // Main page
    "hero.title": "Aram Energy Solution",
    "hero.subtitle": "Ihr vertrauensvoller Partner für Energielösungen",
    "hero.learnMore": "Mehr erfahren",
    "hero.description": "Entdecken Sie unsere Energieberatungsdienste",

    // About section
    "about.title": "Über Aram Energy Solution",
    "about.affordableRates": "Attraktive Preise für jeden",
    "about.affordableRatesDesc":
      "Attraktive Strom- und Gaspreise für Unternehmen und Privatkunden.",
    "about.contactPerson": "Dauerhafter Ansprechpartner",
    "about.contactPersonDesc":
      "Persönliche Unterstützung ohne konstante Änderungen.",
    "about.reliablePartner": "Zuverlässiger Partner",
    "about.reliablePartnerDesc": "Zusammen mit Energie Service Pool GmbH.",
    "about.mission": "Unsere Mission",
    "about.vision": "Unsere Vision",
    "about.values": "Unsere Werte",

    // Mission section
    "mission.title": "Unsere Mission",
    "mission.transparentPricing": "Transparente Preise",
    "mission.transparentPricingDesc":
      "Keine versteckten Gebühren. Klar, vorab Kosten für alle Kunden.",
    "mission.sustainableEnergy": "Nachhaltige Energien",
    "mission.sustainableEnergyDesc":
      "Wir unterstützen nachhaltige Energielösungen für eine bessere Zukunft.",
    "mission.fastSwitching": "Schnelle Umstellung",
    "mission.fastSwitchingDesc":
      "Schnelle und einfache Umstellung auf unsere Dienste mit minimalem Aufwand.",
    "mission.customerSatisfaction": "Kundenzufriedenheit",
    "mission.customerSatisfactionDesc":
      "Verpflichtet, hervorragende Unterstützung und zuverlässige Service zu bieten.",

    // Wide Range section
    "wideRange.title": "Energie clever bündeln – mit Aram Energy Solution",
    "wideRange.subtitle":
      "Energie, die zu Ihnen passt – für Unternehmen und Privathaushalte",
    "wideRange.cta":
      "Kontaktieren Sie uns jetzt und sichern Sie sich einen Rahmenvertrag!",
    "wideRange.description":
      "Als unabhängiger Energieoptimierer mit Sitz in Paderborn bieten wir attraktive Strom- und Gasverträge – unabhängig davon, ob Sie nach RLM oder SLP abgerechnet werden. Ob Sie ein kleines Unternehmen, ein mittelständisches Unternehmen oder ein Privathaushalt sind – Aram Energy Solution bietet maßgeschneiderte Strom- und Gasverträge zu durchgehend günstigen Konditionen.",

    // Wide Range features (for WideRangeScroll)
    "wideRange.feature1.heading": "Vielfältige Konditionen für alle",
    "wideRange.feature1.desc": "durch intelligente Bündelung",
    "wideRange.feature2.heading": "Zuverlässige Energieversorger",
    "wideRange.feature2.desc": "z.B. Stadtwerke Duisburg AG",
    "wideRange.feature3.heading": "Persönliche Betreuung",
    "wideRange.feature3.desc": "Fester Ansprechpartner statt Hotline",
    "wideRange.feature4.heading": "Rundum-Service",
    "wideRange.feature4.desc":
      "Wir übernehmen den Anbieterwechsel und alle Formalitäten",

    // Services section
    "services.title": "Unsere Dienstleistungen",
    "services.electricity": "Stromlösungen",
    "services.gas": "Gaslösungen",
    "services.renewable": "Erneuerbare Energien",

    // How it works
    "howItWorks.title": "So funktioniert es",
    "howItWorks.interested": "Interessiert an Photovoltaik-Systemen?",
    "howItWorks.solarEnergy":
      "Nutzen Sie jetzt Solarenergie und sparen Sie in der langen Frist!",
    "howItWorks.description":
      "Sind Sie an einem Solarsystem für Ihr Zuhause oder Ihr Unternehmen interessiert? Dann sind Sie hier genau richtig. Wir freuen uns, Ihre Anfrage zu erhalten und an einen unserer erfahrenen Partner weiterzuleiten.",
    "howItWorks.step1": "Sie registrieren Ihr Interesse bei uns.",
    "howItWorks.step2":
      "Ein zertifizierter Solarexperte wird Sie kontaktieren und zu Ihrem Wohnort kommen, um eine persönliche Beratung abzuschließen.",
    "howItWorks.step3":
      "Zusammen bestimmen wir, welche Lösung am besten zu Ihrem Dach, Ihrem Verbrauch und Ihrem Budget passt.",
    "howItWorks.step4":
      "Sie erhalten eine maßgeschneiderte Offerte – transparent und unverbindlich.",
    "howItWorks.cta":
      "Machen Sie jetzt Ihr Interesse ohne Verpflichtung aus und sichern Sie eine Beratung!",

    // Get a quote
    "getQuote.title": "Wie kann ich ein Angebot erhalten?",
    "getQuote.description":
      "Sie haben eine Stromrechnung, die Sie uns digital über WhatsApp oder E-Mail zusenden. Wir erklären Ihnen alles und senden Ihnen sofort ein Angebot. Wenn Sie es annehmen, übernehmen wir den Wechselprozess für Sie.",
    "getQuote.referral.title":
      "Kunden empfehlen Kunden – Machen Sie mit. Es lohnt sich!",
    "getQuote.referral.subtitle":
      "Empfehlen Sie Aram Energy Solution und profitieren Sie:",
    "getQuote.referral.description":
      "Wir möchten uns für Ihre Treue bedanken – und gleichzeitig noch mehr Menschen die Möglichkeit geben, von unseren günstigen Strom- und Gasangeboten zu profitieren. Deshalb haben wir unser Empfehlungsprogramm gestartet.",
    "getQuote.step1":
      "Empfehlen Sie uns an Freunde, Bekannte oder Geschäftspartner.",
    "getQuote.step2":
      "Der neue Kunde schließt einen Vertrag auf Basis Ihrer Empfehlung ab.",
    "getQuote.step3": "Sie erhalten einen 40€ Bonus",

    // Footer
    "footer.contact": "Kontakt",
    "footer.address": "Adresse",
    "footer.legal": "Rechtliches",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.imprint": "Impressum",
    "footer.accessibility": "Zugänglichkeitserklärung",
    "footer.refund": "Rückgabepolicy",

    // Calculation form
    "calculation.title": "Ihren Tarif berechnen",
    "calculation.electricity": "Strom",
    "calculation.gas": "Gas",
    "calculation.consumption": "Jahresverbrauch (kWh)",
    "calculation.zipCode": "PLZ",
    "calculation.calculate": "Berechnen",
    "calculation.customerType": "Kundenart",
    "calculation.private": "Privat",
    "calculation.company": "Firma",
    "calculation.tariffKey": "Tarifschlüssel",
    "calculation.transactionKey": "Transaktionsschlüssel",
    "calculation.zipCodePlaceholder": "Postleitzahl eingeben",
    "calculation.consumptionPlaceholder": "Jahresverbrauch eingeben",
    "calculation.tariffKeyPlaceholder": "Tarifschlüssel eingeben",
    "calculation.transactionKeyPlaceholder": "Transaktionsschlüssel eingeben",
    "calculation.helpText":
      "Brauchen Sie Hilfe bei der Berechnung Ihres Verbrauchs?",
    "calculation.validationError":
      "Bitte geben Sie sowohl den Jahresverbrauch (kWh) als auch die Postleitzahl ein.",

    // CalculatorCard fields
    "calculator.deliveryPointInfo": "Lieferstelleninformation",
    "calculator.postalCode": "Postleitzahl",
    "calculator.location": "Ort",
    "calculator.tariffInfo": "Tarifinformation",
    "calculator.division": "Sparte",
    "calculator.customerCategory": "Kundenkategorie",
    "calculator.furtherInfo": "Weitere Informationen",
    "calculator.transactionKey": "Transaktionsschlüssel",
    "calculator.advertisingPartner": "Werbepartner",

    // Our Service section
    "ourService.title": "Unsere Dienstleistungen",
    "ourService.arrangeCall": "Rückruf vereinbaren",
    "ourService.card1": "Hausbesuch",
    "ourService.card2": "Telefontermin",
    "ourService.card3": "Online-Meeting",
    "ourService.book": "Buchen",

    // Booking page
    "bookNow.title": "Service buchen",
    "bookNow.subtitle":
      "Jetzt unsere verfügbaren Termine entdecken und buchen.",
    "bookNow.date": "Datum",
    "bookNow.time": "Uhrzeit",
    "bookNow.name": "Name",
    "bookNow.email": "E-Mail",
    "bookNow.phone": "Telefonnummer",
    "bookNow.error": "Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "bookNow.success": "Buchung erfolgreich! Wir haben Ihre Anfrage erhalten.",
    "bookNow.loading": "Buchen...",
    "bookNow.submit": "Jetzt Termin buchen",

    // Our Partner section
    "ourPartner.heading": "Unser Kooperationspartner:",

    // Get In Touch section
    "getInTouch.title": "Kontaktieren Sie uns",
    "getInTouch.subtitle": "Wir helfen Ihnen gerne weiter.",
    "getInTouch.contactInfo": "Kontaktinformationen",
    "getInTouch.phone": "Telefon",
    "getInTouch.email": "E-Mail",
    "getInTouch.office": "Büro",
    "getInTouch.officeLocation": "Paderborn, Deutschland",
    "getInTouch.hours": "Geschäftszeiten",
    "getInTouch.hoursWeek": "Mo - Fr: 8:00 - 18:00 Uhr",
    "getInTouch.hoursSat": "Sa: 9:00 - 16:00 Uhr",
    "getInTouch.followUs": "Folgen Sie uns",
    "getInTouch.sendMessage": "Schreiben Sie uns eine Nachricht",
    "getInTouch.firstName": "Vorname",
    "getInTouch.lastName": "Nachname",
    "getInTouch.emailAddress": "E-Mail-Adresse",
    "getInTouch.emailPlaceholder": "Geben Sie Ihre E-Mail-Adresse ein",
    "getInTouch.phoneNumber": "Telefonnummer",
    "getInTouch.phonePlaceholder": "Geben Sie Ihre Telefonnummer ein",
    "getInTouch.serviceType": "Dienstleistungsart",
    "getInTouch.selectService": "Dienstleistung auswählen",
    "getInTouch.service1": "Dienstleistung 1",
    "getInTouch.service2": "Dienstleistung 2",
    "getInTouch.message": "Nachricht",
    "getInTouch.messagePlaceholder":
      "Teilen Sie uns Ihren Energiebedarf mit...",
    "getInTouch.agree":
      "Ich stimme zu, Mitteilungen von PowerGrid zu erhalten und weiß, dass ich mich jederzeit abmelden kann.",
    "getInTouch.send": "Nachricht senden",
    "getInTouch.success": "Ihre Nachricht wurde erfolgreich gesendet.",

    // Submetering section (whatisSub)
    "submetering.heading": "Submetering",
    "submetering.title": "Was ist Submetering?",
    "submetering.button": "Jetzt starten",
    "submetering.card1.title": "Transparenter Verbrauch dank Submetering",
    "submetering.card1.para":
      "Submetering ist die individuelle Erfassung des Verbrauchs von Ressourcen wie Wasser, Wärme oder Strom in Mehrparteiengebäuden.",
    "submetering.card2.title": "Fair bezahlen – nur was Sie nutzen",
    "submetering.card2.para":
      "Es ermöglicht eine faire und transparente Abrechnung, da jeder Nutzer nur für das zahlt, was er tatsächlich verbraucht.",
    "submetering.card3.title": "Energie sparen, Kosten senken",
    "submetering.card3.para":
      "Dies fördert die Energieeffizienz und Kosteneinsparungen.",
    "submetering.whoCanUse": "Wer kann das nutzen?",
    "submetering.whoCanUseDesc":
      "Hausverwalter, Eigentümer, Wohnungsbaugesellschaften und andere relevante Ansprechpartner sind potenzielle Kunden.",

    // Stepper
    "stepper.calculator": "Rechner",
    "stepper.selectOption": "Option wählen",
    "stepper.personalDetails": "Persönliche Daten",
    "stepper.addressDetails": "Adressdaten",
    "stepper.paymentMethod": "Zahlungsmethode",

    // SelectPower
    "selectPower.label": "Wählen Sie Ihren Stromverbrauch",
    "selectPower.low": "Niedrig (bis 2.000 kWh)",
    "selectPower.medium": "Mittel (2.000–5.000 kWh)",
    "selectPower.high": "Hoch (über 5.000 kWh)",

    // Tariff fields for SelectPower
    "tariff.basePrice": "Grundpreis",
    "tariff.laborPrice": "Arbeitspreis",
    "tariff.typeOfCurrent": "Stromart",
    "tariff.contractTerm": "Vertragslaufzeit",
    "tariff.priceGuarantee": "Preisgarantie",
    "tariff.downPayment": "Abschlagszahlung",
    "tariff.total": "Gesamt",
    "tariff.chooseTariff": "Tarif wählen",
    // Tariff names (optional, for translation)
    "R(H)EINPOWER Direct Electricity Tariff": "R(H)EINPOWER Direktstromtarif",
    "R(H)EINPOWER MeinStrom Heat Pump 24 Tariff":
      "R(H)EINPOWER MeinStrom Wärmepumpen 24 Tarif",

    // PersonalDetails page
    "personaldetails.salutation": "Anrede",
    "personaldetails.salutationPlaceholder": "Bitte auswählen...",
    "personaldetails.mr": "Herr",
    "personaldetails.ms": "Frau",
    "personaldetails.mrs": "Frau (verh.)",
    "personaldetails.dr": "Dr.",
    "personaldetails.name": "Vorname",
    "personaldetails.namePlaceholder": "Geben Sie Ihren Vornamen ein",
    "personaldetails.surname": "Nachname",
    "personaldetails.surnamePlaceholder": "Geben Sie Ihren Nachnamen ein",
    "personaldetails.billingAddress": "Rechnungsadresse",
    "personaldetails.billingSame":
      "Die Rechnungsadresse entspricht der Lieferadresse",
    "personaldetails.billingDifferent":
      "Die Rechnungsadresse ist von der Lieferadresse abweichend",
    "personaldetails.birthDate": "Geburtsdatum",
    "personaldetails.email": "E-Mail-Adresse",
    "personaldetails.emailPlaceholder": "Geben Sie Ihre E-Mail ein",
    "personaldetails.repeatEmail": "E-Mail-Adresse wiederholen",
    "personaldetails.repeatEmailPlaceholder": "Wiederholen Sie Ihre E-Mail",
    "personaldetails.phone": "Telefonnummer",
    "personaldetails.next": "Weiter",
    "personaldetails.error.required":
      "Bitte füllen Sie alle Pflichtfelder aus.",
    "personaldetails.error.emailMatch":
      "E-Mail-Adressen stimmen nicht überein.",

    // AddressDetails page
    "addressdetails.postalCode": "Postleitzahl",
    "addressdetails.postalCodePlaceholder": "Geben Sie Ihre Postleitzahl ein",
    "addressdetails.location": "Ort",
    "addressdetails.locationPlaceholder": "Geben Sie Ihren Ort ein",
    "addressdetails.street": "Straße",
    "addressdetails.streetPlaceholder": "Geben Sie Ihre Straße ein",
    "addressdetails.houseNumberAndSuffix": "Hausnummer * / Hausnummernzusatz",
    "addressdetails.houseNumberPlaceholder": "Nummer",
    "addressdetails.houseNumberSuffixPlaceholder": "Zusatz",
    "addressdetails.moveInStatus": "Einzugsstatus",
    "addressdetails.alreadyLive": "Ich wohne bereits hier (bereits eingezogen)",
    "addressdetails.movingIn":
      "Ich bin gerade eingezogen oder ziehe bald ein (Einzug)",
    "addressdetails.desiredStart": "Gewünschter Lieferbeginn",
    "addressdetails.previousSupplier": "Vorversorger",
    "addressdetails.previousSupplierPlaceholder":
      "Geben Sie den Vorversorger ein",
    "addressdetails.previousCustomerNo": "Vor-Kundennummer",
    "addressdetails.previousCustomerNoPlaceholder":
      "Geben Sie die Vor-Kundennummer ein",
    "addressdetails.meterNo": "Zählernummer",
    "addressdetails.meterNoPlaceholder": "Geben Sie die Zählernummer ein",
    "addressdetails.supplierSwitchInfo":
      "Möchten Sie schneller den Anbieter wechseln? Dann geben Sie bitte Ihre Zählpunktbezeichnung an. So können wir Sie schneller beliefern.",
    "addressdetails.meterLocationNo": "Zählpunktbezeichnung",
    "addressdetails.meterLocationNoPlaceholder":
      "Geben Sie die Zählpunktbezeichnung ein",
    "addressdetails.billingAddress": "Rechnungsadresse",
    "addressdetails.billingHouseNumberAndSuffix":
      "Hausnummer * / Zusatz (Rechnung)",
    "addressdetails.billingHouseNumberPlaceholder": "Nummer",
    "addressdetails.billingHouseNumberSuffixPlaceholder": "Zusatz",
    "addressdetails.billingStreet": "Straße (Rechnung) *",
    "addressdetails.billingStreetPlaceholder":
      "Geben Sie die Rechnungsstraße ein",
    "addressdetails.billingCity": "Stadt (Rechnung) *",
    "addressdetails.billingCityPlaceholder": "Geben Sie die Rechnungsstadt ein",
    "addressdetails.billingPostal": "PLZ (Rechnung) *",
    "addressdetails.billingPostalPlaceholder":
      "Geben Sie die Rechnungs-PLZ ein",
    "addressdetails.billingCountry": "Land (Rechnung) *",
    "addressdetails.billingCountryPlaceholder":
      "Geben Sie das Rechnungsland ein",
    "addressdetails.next": "Weiter",
    "addressdetails.error.billingType":
      "Bitte wählen Sie den Rechnungstyp aus.",
    "addressdetails.error.billingFields":
      "Bitte füllen Sie alle erforderlichen Rechnungsadressfelder aus.",
    "addressdetails.error.desiredStart":
      "Bitte wählen Sie den gewünschten Lieferbeginn aus.",
    "addressdetails.error.previousSupplier":
      "Bitte geben Sie den Vorversorger ein.",
    "addressdetails.error.previousCustomerNo":
      "Bitte geben Sie die Vor-Kundennummer ein.",
    "addressdetails.error.meterNo": "Bitte geben Sie die Zählernummer ein.",
    "addressdetails.error.moveInStatus":
      "Bitte wählen Sie den Einzugsstatus aus.",

    // AddressCard
    "addresscard.personalInfo": "Persönliche Informationen:",
    "addresscard.furtherInfo": "Weitere Informationen",
    "addresscard.advertisingPartner": "Werbepartner:",

    // SepaCard
    "sepaCard.deliveryPointInfo": "Lieferpunktinformationen:",
    "sepaCard.furtherInfo": "Weitere Informationen",

    // SEPA Mandate page
    "sepaMandate.title": "SEPA-Mandat",
    "sepaMandate.iban": "IBAN",
    "sepaMandate.ibanPlaceholder": "Geben Sie Ihre IBAN ein",
    "sepaMandate.accountHolder": "Kontoinhaber",
    "sepaMandate.accountHolderPlaceholder": "Name des Kontoinhabers eingeben",
    "sepaMandate.ibanInfo":
      "Die IBAN finden Sie unter anderem auf Ihrer Bankkarte. Sie besteht aus dem Ländercode DE, einer zweistelligen individuellen Sicherheitsnummer Ihrer Bank und weiteren 18 Ziffern.",
    "sepaMandate.sepaInfo":
      "Mit der Eingabe meiner Bankdaten ermächtige ich die Stadtwerke Duisburg AG, Zahlungen von meinem Konto mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von den Stadtwerken Duisburg AG auf mein Konto gezogenen Lastschriften einzulösen.",
    "sepaMandate.confirmEmail": "Bestätigungs-E-Mail erhalten",
    "sepaMandate.paymentTerms": "Unsere Zahlungsbedingungen",
    "sepaMandate.paymentTermsSub": "monatlich vom Konto abgebucht",
    "sepaMandate.submit": "Absenden",
    "sepaMandate.submitting": "Wird gesendet...",
    "sepaMandate.success":
      "Erfolgreich übermittelt! Bitte prüfen Sie Ihre E-Mails zur Bestätigung.",
    "sepaMandate.error.submissionFailed": "Übermittlung fehlgeschlagen",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
