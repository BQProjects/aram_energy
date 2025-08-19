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
      "Attractive electricity and gas prices for \n businesses and private customers.",
    "about.contactPerson": "Permanent contact person",
    "about.contactPersonDesc": "Personal support without constant \n changes.",
    "about.reliablePartner": "Reliable partner",
    "about.reliablePartnerDesc": "Together with Energie Service Pool \n GmbH.",
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
      "As an independent energy optimizer based in Paderborn, we offer attractive electricity and gas contracts – regardless of whether you are billed according to the RLM (Rural Land Use Plan) or SLP (Sustainable Land Use Plan). Whether you are a small business, medium-sized company, or private household – Aram Energy Solution offers customized electricity and gas contracts at consistently favorable terms. We pool the demand of many customers to achieve better prices together – without any hidden costs or bait offers.",

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

    // Terms and Conditions
    "terms.title": "Terms and Conditions for the supply of electricity",
    "terms.scope": "Scope of Application",
    "terms.scope.content":
      "These General Terms and Conditions form the basis of the contract between you as a consumer within the meaning of § 13 BGB and Stadtwerke Duisburg AG for the supply of electricity. Otherwise, the Regulation on General Conditions for the Basic Supply of Household Customers and the Emergency Supply with Electricity from the Low-Voltage Grid (Electricity Basic Supply Regulation - StromGVV) in the version of 26.10.2006 (last amended on 22.11.2021) applies accordingly to this contractual relationship, unless different regulations are made below. In the event of changes to the StromGVV, Stadtwerke Duisburg AG is entitled to demand an adjustment to the respectively valid version. All legal transactions, e.g. written communications, confirmations, offers, acceptances as well as public announcements may also be made in text form, e.g. by email, deviating from the StromGVV, unless another form is expressly specified below.",
    "terms.contract":
      "What is the subject of the contract and how is it concluded?",
    "terms.contract.content":
      "The subject of the contract is the supply of electricity to the consumption point you have specified with a standard load profile, i.e. without registering power measurement, whereby the annual withdrawal quantity may not exceed 100,000 kWh of electricity. The contract also includes grid usage as well as measurement by the responsible metering point operator cf. § 2 No. 5 Metering Point Operation Act (MsbG). Prerequisites for concluding the contract are the specification and maintenance of a valid billing address and - if you have concluded an online contract with us - a valid email address. In the event of a change to your email address and/or your billing address, you are obligated to inform Stadtwerke Duisburg AG immediately. The contract is concluded by confirmation of the supply order signed by the customer (order form) by Stadtwerke Duisburg AG in text form (contract confirmation), at the latest with the start of supply.",
    "terms.duration":
      "How long is the contract term and how can the contract be terminated?",
    "terms.duration.content":
      "The initial contract term and the term of the respective contract extensions correspond to the product selection you made in the course of placing the order and can be found in the attached product data sheet. The contract can be terminated by both contracting parties at the end of a contract term. The notice period can be found in the attached product data sheet. The termination must be in text form. If the contract has not been terminated or otherwise ended, it shall be extended indefinitely with a notice period of one month. In the case of a change of residence, the customer is entitled to extraordinary termination with a notice period of six weeks. The termination can be declared with effect from the time of moving out or with effect from a later date. This does not apply if the supplier offers the customer within two weeks of receiving the termination in text form a continuation of the supply contract at his new place of residence under the previous contractual conditions and supply at the new withdrawal point is possible. For this purpose, the customer must communicate his future address or a market location number used to designate his future withdrawal point in his extraordinary termination.",
    "terms.creditCheck": "Credit Check",
    "terms.creditCheck.content":
      "a. In accordance with the consent to the credit check given by the customer in the registration process, Stadtwerke Duisburg AG is entitled to obtain credit information about the customer. Our company regularly checks your creditworthiness when concluding contracts. b. Stadtwerke Duisburg AG is entitled to reject a contract conclusion with the customer in particular if the information from the credit check suggests insufficient creditworthiness of the customer to fulfill his payment obligations under this contract.",
    "terms.delivery": "When does delivery begin and when do I have to pay?",
    "terms.delivery.content":
      "a. Delivery begins at the earliest on the date specified by you and listed by Stadtwerke Duisburg AG in the contract confirmation, provided that delivery is actually and legally possible at this time. Otherwise, the start of delivery will be determined by Stadtwerke Duisburg AG. If delivery cannot begin within twelve months of contract conclusion, Stadtwerke Duisburg AG will inform you of this. Both parties then have the opportunity to withdraw from the contract within 14 days of receiving this notification. If neither party withdraws from the contract within this period, the start of delivery will be determined by Stadtwerke Duisburg AG. A possible supplier change is generally free of charge and is carried out quickly by Stadtwerke Duisburg AG within the statutory deadlines. The price you have to pay is based on your actual consumption in connection with the product you have selected and the individual product configuration you have made, which you can find in the product data sheet. The payment obligation begins with the start of delivery.",
    "terms.pricing":
      "How is my price composed, how do price changes occur and do I have a right of termination in case of price changes?",
    "terms.pricing.content":
      "a. Your electricity price includes the following costs: procurement and distribution costs, VAT, electricity tax, concession fee, fees for grid usage, for measurement and metering point operation of conventional and modern measuring devices by the responsible metering point operator, billing costs, additional charges according to § 12 EnFG (from the obligations of the Combined Heat and Power Act and the offshore grid surcharge), the Electricity Grid Fee Regulation (StromNEV) according to § 19 para. 2 and the surcharge for interruptible loads according to § 18 para. 1 AbLaV. b. (1) If you have chosen a tariff that is designated as a classic tariff in the product data sheet, and your consumption is recorded via an intelligent measuring system (iMSys), you will be charged a basic price reduced by the amount specified in the product data sheet. Stadtwerke Duisburg AG will bill you separately for the costs of measurement and metering point operation using iMSys in the amount actually incurred, at the latest with the billing. Paragraphs d. to g. do not apply. The actual costs for an iMSys vary depending on the metering point operator. The statutory price caps serve as cost orientation, see price sheet for the price caps for intelligent measuring systems (iMSys). You can find their amount in the price sheet of your responsible metering point operator. Stadtwerke Duisburg AG communicates the exact amount with the contract confirmation. If you have commissioned your own metering point operator, you will be charged a basic price reduced by the amount specified in the product data sheet. (2) If you have chosen a tariff that is designated as an intelligent tariff in the product data sheet, and your consumption is recorded via an iMSys, the measuring price for iMSys specified in the product data sheet of the tariff you have chosen applies in addition to the basic price. If you have commissioned your own metering point operator, the measuring price for iMSys will not be charged. c. If you have commissioned your own metering point operator, they will bill you directly for the fees for measurement and metering point operation; no billing via Stadtwerke Duisburg AG takes place. d. Price changes by Stadtwerke Duisburg AG are made by way of unilateral performance determination in the exercise of reasonable discretion according to § 315 BGB. The customer can have this reviewed by civil court according to § 315 BGB. In the unilateral performance determination by Stadtwerke Duisburg AG, only changes in costs that are decisive for price determination according to paragraph a and paragraph b (2) are to be considered. Stadtwerke Duisburg AG is entitled to carry out a price change in case of cost increases, obligated in case of cost reductions. In price determination, Stadtwerke Duisburg AG is obligated to consider cost increases only taking into account offsetting cost reductions and to carry out a balancing of cost increases and cost reductions. e. Stadtwerke Duisburg AG reviews cost development at least every twelve months. Stadtwerke Duisburg AG must determine the scope and timing of a price change so that cost reductions are taken into account according to the same business criteria as cost increases. In particular, Stadtwerke Duisburg AG may not pass on cost reductions later than cost increases. f. Price changes only become effective after written notification to customers, which must be made at least one month before the intended change. g. If Stadtwerke Duisburg AG changes prices, the customer has the right to terminate the contract without observing a notice period upon the change taking effect. Stadtwerke Duisburg AG will expressly point this out to the customer in the written notification of the upcoming change. The termination must be in text form. Stadtwerke Duisburg AG must confirm the termination immediately upon receipt in text form. The right to extraordinary termination according to § 314 BGB remains unaffected. h. Paragraphs d)- g) apply accordingly if the procurement, generation, delivery, distribution, placing on the market or consumption of electricity is subject to a new tax, levy or other sovereign imposed, generally binding burden (i.e. no fines etc.) after contract conclusion, insofar as this has direct influence on the costs for the services owed under this contract. The same applies if the amount of a passed-on tax, levy or other sovereign burden changes or ceases. i. Deviating from paragraphs d)-h), changes in VAT according to the VAT Act are passed on at the time the change takes effect without announcement and without extraordinary termination possibility. j. Due to the tariff diversity, Stadtwerke Duisburg AG points out for reasons of practicability and clarity for special contract customers, deviating from the information obligations of a basic supplier according to § 2 para. 3 of the StromGVV, exclusively the federally uniform applicable state or regulatory induced surcharges and burdens contained in the electricity price on their website. Reference is also made to the information platform of the transmission system operators regarding surcharges and burdens. Regarding the non-federally uniform burdens (currently grid fees and concession fees), reference is also made to the information platform of the local grid operator.",
    "terms.guarantee": "What does my price guarantee cover?",
    "terms.guarantee.content":
      "a. If your selected electricity product includes a price guarantee, changes, new introductions and elimination of taxes and levies as well as state-induced burdens and reliefs that affect procurement, generation, grid connection, grid usage (transmission and distribution) or consumption of electrical energy are excluded from this price guarantee. The passing on of these burdens and reliefs in the price guarantee period is carried out according to section 6 paragraphs d) to g). For a tariff designated as a classic tariff in the product data sheet, the costs for measurement and metering point operation using iMSys are also excluded from the price guarantee. The passing on of these costs is carried out according to section 6 paragraph b(1). For a tariff designated as an intelligent tariff in the product data sheet, the measuring price for iMSys according to section 6 paragraph b(2) is covered by the price guarantee. b. The term of your price guarantee depends on the electricity product you have selected. After the expiration of the first price guarantee, another price guarantee follows. You can find the duration of the price guarantee and the subsequent price guarantee in the product data sheet. Price changes at the beginning of another price guarantee are carried out according to section 6 paragraphs d to g.",
    "terms.billing": "Billing, Invoicing, Payment",
    "terms.billing.content":
      "a. Payment can be made at your choice by bank transfer or alternatively by granting a SEPA basic direct debit mandate (direct debit procedure). If you choose the direct debit procedure, we will inform you of our creditor identification number and the mandate reference number assigned to your direct debit authorization in text form. You can also find this information in the purpose of your account statement for SEPA basic direct debits. b. If you have granted us a SEPA basic direct debit mandate, the minimum period for the advance notification (pre-notification) for collections in the SEPA basic direct debit procedure is shortened to a period of five calendar days before due date. c. During the billing period, you pay monthly or quarterly advance payments depending on your selected product configuration, which result from your actual or estimated previous year's consumption or the ordered energy quantity. The first payment becomes due at the earliest from the start of delivery, the subsequent advance payments follow depending on your selected product configuration at intervals of one or three months respectively. The advance payments are credited to the billing. The amount of the advance payments will be communicated to you with the contract confirmation for first-time supply and with the consumption billing for continued supply. For electricity products with an intelligent tariff whose metering point is equipped with an intelligent measuring system [iMSys], consumption billing is carried out periodically via an actual billing. In this case, no advance payments are collected. Invoice amounts and advance payments become due at the time specified by Stadtwerke Duisburg AG, but at the earliest two weeks after receipt of the payment request. Outstanding payments are reminded after due date. The costs for the reminder can be found in the product data sheet. You are always permitted to prove lower costs. For bank returns, i.e. if bank collection is not possible, appropriate and justified third-party fees in the amount actually incurred are passed on to the customer. The assertion of default interest at the statutory rate as well as further default damages in the amount actually incurred remains reserved. The higher actual damage is then asserted instead of the flat-rate damage, crediting any reminder cost flat rates already paid. e. The customer's electricity consumption is determined and billed annually at the end of the billing period, subject to paragraph f). f. Deviating from paragraph e), billing is also carried out monthly, quarterly or semi-annually at the customer's request. The customer is further entitled to free electronic transmission of billings and billing information as well as free annual transmission in paper form. In case of electronic transmission, billing information is made available to the customer free of charge at least every six months, upon request every three months. Customers for whom remote transmission of consumption data takes place receive billing information via the supplier's online customer portal monthly free of charge. g. The customer receives the consumption billing from Stadtwerke Duisburg AG at the latest six weeks after the end of the billing period and a final billing at the latest 6 weeks after the end of the supply relationship with the actual electricity consumption in the billing period as well as information on the actual determination of the meter reading. If billing is carried out monthly, the deadline for billing is three weeks. h. If the billing results in a credit for the customer, Stadtwerke Duisburg AG will refund this within two weeks or fully offset it against the next advance payment demand. Future advance payments are adjusted accordingly. Credits from a final billing are paid out within two weeks.",
    "terms.interruption": "When can the supply be interrupted?",
    "terms.interruption.content":
      "a. Stadtwerke Duisburg AG is entitled to have the electricity supply interrupted by the grid operator without prior threat if you culpably act contrary to the contract including these general electricity supply conditions to a not insignificant extent and the interruption is necessary to prevent the use of electricity by bypassing, influencing or before installation of the measuring devices. b. For other contraventions, particularly for non-fulfillment of a payment obligation despite reminder, Stadtwerke Duisburg AG is entitled to have the electricity supply interrupted 4 weeks after threat. This does not apply if the consequences of the interruption are disproportionate to the severity of the contravention or if you demonstrate that there is sufficient prospect that you will meet your obligations. Due to payment default, Stadtwerke Duisburg AG may only have an interruption of electricity supply carried out under the aforementioned conditions if you are in default with payment obligations of at least 100.00 euros after deduction of any advance payments. In calculating the amount, those non-titled claims that you have objected to in proper form and time and with sound reasoning are not considered. Furthermore, those arrears are not considered that are not yet due because of an agreement between you and Stadtwerke Duisburg AG or that result from a disputed and not yet legally decided price adjustment by Stadtwerke Duisburg AG. c. You will be informed four weeks before a planned supply interruption due to non-payment in an appropriate manner clearly and easily understandably about possibilities to avoid the supply interruption that do not cause additional costs for you. d. The beginning of the interruption of electricity supply will be announced to you three working days in advance. e. Stadtwerke Duisburg AG must have electricity supply restored immediately as soon as the reasons for its interruption have ceased and you have compensated the costs of interruption and restoration of supply. The costs of interruption and restoration of supply can be found in the product data sheet. You are always permitted to prove lower costs.",
    "terms.bonus": "Bonus Payment",
    "terms.bonus.content":
      "a. Insofar as Stadtwerke Duisburg AG has agreed a new customer bonus with you upon contract conclusion, the following regulations apply: The one-time bonus payment is made provided the contractual relationship has existed uninterrupted for twelve supply months. The bonus will be credited and offset to you after the expiration of twelve months with the next consumption billing; any customer credit exceeding after this offset will be paid out. For granting a new customer bonus applies: New customer is who has not been supplied by Stadtwerke Duisburg AG in his household in the last six months before contract conclusion. The amount of the bonus depends on the consumption actually calculated in the first annual consumption billing. You can find a table with bonus amounts for the respective consumption segments on the product data sheet. b. Insofar as Stadtwerke Duisburg AG has agreed an immediate bonus with you, this becomes due at the time communicated to you in your contract confirmation, but at the latest sixty days after start of delivery. Stadtwerke Duisburg AG does not have to grant the immediate bonus if the energy supply contract is terminated before the time specified in the contract confirmation or if you are not a new customer according to the definition in section 10 a. Stadtwerke Duisburg AG may refuse payment of the immediate bonus as long as outstanding claims exist. If an immediate bonus is promised, a bank connection must be specified upon contract conclusion to which Stadtwerke Duisburg AG can transfer the immediate bonus on the due date.",
    "terms.liability": "Who is liable for claims from supply disruptions?",
    "terms.liability.content":
      "In case of a disruption or irregularities in electricity supply, Stadtwerke Duisburg AG is exempt from its performance obligation according to § 6 para. 3 StromGVV insofar as it concerns consequences of a disruption of grid operation or metering point operation. Claims from supply disruptions within the meaning of § 6 para. 3 sentence 1 StromGVV are, insofar as they concern consequences of disruption of grid operation, to be asserted against the grid operator or, insofar as they concern consequences of disruption of metering point operation, against the responsible metering point operator. For damages caused in other ways including damages due to non-compliance with contractually agreed service quality, which also includes inaccurate or delayed billings, Stadtwerke Duisburg AG is liable for intent and gross negligence, also of their vicarious agents, according to statutory provisions. The same applies to negligently caused damages from injury to life, body or health. For negligently caused property and financial damages, Stadtwerke Duisburg AG and their vicarious agents are only liable for breach of an essential contractual obligation, but limited in amount to the damages foreseeable and typical for the contract at the time of contract conclusion. Essential contractual obligations are those whose fulfillment characterizes the contract and on which the customer may rely.",
    "terms.changes": "Changes to the General Terms and Conditions (GTC)",
    "terms.changes.content":
      "Changes to the General Terms and Conditions will be communicated to you by Stadtwerke Duisburg AG at the latest four weeks before taking effect in text form and by publication on the internet. In case of a change to the General Terms and Conditions, you have the right to terminate the contract without observing a notice period at the time the changes take effect. A unilateral change to the General Terms and Conditions is only permissible if there is an objective necessity for adjustment, such as in case of changes to laws, ordinances or case law with effects on the effectiveness of the GTC or on the reasonableness of unchanged contract continuation. The termination must be in text form.",
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

    // Terms and Conditions (AGB)
    "terms.title": "Allgemeine Geschäftsbedingungen für die Stromlieferung",
    "terms.scope": "Anwendungsbereich",
    "terms.scope.content":
      "Die AGB bilden die Grundlage des Vertrags zwischen Ihnen als Verbraucher im Sinne des § 13 BGB und der Stadtwerke Duisburg AG über die Belieferung mit Strom. Im Übrigen findet auf dieses Vertragsverhältnis die Verordnung über Allgemeine Bedingungen für die Grundversorgung von Haushaltskunden und die Ersatzversorgung mit Elektrizität aus dem Niederspannungsnetz (Stromgrundversorgungsverordnung - StromGVV) in der Fassung vom 26.10.2006 (zuletzt geändert am 22.11.2021) entsprechend Anwendung, soweit nicht nachfolgend anderweitige Regelungen getroffen werden. Bei Änderungen der StromGVV ist die Stadtwerke Duisburg AG berechtigt, eine Anpassung an die jeweilsgültige Fassung zu verlangen. Alle rechtsgeschäftlichen Handlungen, z. B. briefliche Mitteilungen, Bestätigungen, Angebote, Annahmen sowie öffentliche Bekanntmachungen können abweichend von der StromGVV auch in Textform, z. B. per E-Mail, erfolgen, es sei denn, nachfolgend ist eine andere Form ausdrücklich vorgegeben.",
    "terms.contract":
      "Was ist Gegenstand des Vertrags und wie kommt er zustande?",
    "terms.contract.content":
      "Gegenstand des Vertrags ist die Lieferung von Strom an die von Ihnen genannte Verbrauchsstelle mit Standardlastprofil, das heißt ohne registrierende Leistungsmessung, wobei die jährliche Entnahmemenge 100.000 kWh Strom nicht überschreiten darf. Der Vertrag umfasst ebenfalls die Netznutzung sowie die Messung durch den grundzu- ständigen Messstellenbetreiber vgl. § 2 Nr. 5 Messstellenbetriebs-gesetz (MsbG). Voraussetzung für den Vertragsschluss ist die Angabe und Beibehaltung einer gültigen Rechnungsadresse und - sofern Sie einen Onlinevertrag mit uns abge-schlossen haben - einer gültigen E-Mail-Adresse. Im Falle einer Änderung Ihrer E-Mail-Adresse und/oder Ihrer Rechnungsadresse sind Sie verpflichtet, die Stadtwerke DuisburgAG umgehend zu informieren. Der Vertrag kommt durch Bestätigung des durch den Kunden unterzeichneten Auftrags zur Belieferung (Auftragsformular) durch die Stadtwerke Duisburg AG in Textform(Vertragsbestätigung) zustande, jedenfalls spätestens mit Belieferung.",
    "terms.duration":
      "Wie lang ist die Vertragslaufzeit und wie kann derVertrag gekündigt werden?",
    "terms.duration.content":
      "Die Erstvertragslaufzeit und die Laufzeit der jeweiligen Vertragsverlängerungen entsprechen der von Ihnen im Zuge der Auftragserteilung getroffenen Produktauswahlund sind dem beigefügten Produktdatenblatt zu entnehmen. Der Vertrag kann von beiden Vertragspartnern zum Ende einer Vertragslaufzeit gekündigt werden. Die Kündigungsfrist ist dem beigefügten Produktdatenblatt zu entnehmen. Die Kündigung bedarf der Textform. Sofern der Vertrag nicht gekündigt oder auf sonstige Weise beendet wurde, verlängerter sich auf unbestimmte Zeit, mit einer Kündigungsfrist von einem Monat. Im Falle eines Wohnsitzwechsels ist der Kundeunter Einhaltung einerKündigungsfrist von sechs Wochen zu einer außerordentlichen Kündigung berechtigt. Die Kündigung kann mit Wirkung zum Zeitpunkt des Auszugs oder mit Wirkung zu einem späteren Zeitpunkt erklärt werden. Dies gilt nicht, wenn der Lieferant dem Kunden binnen zwei Wochen nach Erhalt der Kündigung in Textform eine Fortsetzung des Liefervertrages an dessen neuem Wohnsitz zu den bisherigen Vertragsbedingungen anbietet und die Belieferung an der neuen Entnahmestelle möglich ist. Zu diesem Zwecke hat der Kunde in seiner außerordentlichen Kündigung seine zukünftige Anschrift oder eine zur Bezeichnung seiner zukünftigen Entnahmestelle verwendete Marktlokationsnummer mitzuteilen.",
    "terms.creditCheck": "Bonitätsprüfung",
    "terms.creditCheck.content":
      "a.  Nach Maßgabe der vom Kunden im Anmeldeprozess abgegebenen Einwilligung zur Bonitätsprüfung ist die Stadtwerke DuisburgAG berechtigt, eine Bonitätsauskunft zum Kunden einzuholen. Unser Unternehmen prüft regelmäßig bei Vertragsabschlüssen Ihre Bonität. b.  Die Stadtwerke Duisburg AG ist berechtigt, einen Vertragsschluss mit dem Kunden insbesondere dann abzulehnen, wenn die Auskunft der Bonitätsprüfung eine nicht ausreichende Bonität des Kunden zur Erfüllung seiner Zahlungsverpflichtungen aus diesem Vertrag schließen lässt.",
    "terms.delivery": "Wann beginnt die Lieferung und ab wann muss ich zahlen?",
    "terms.delivery.content":
      "a.  Lieferbeginn ist frühestens das von Ihnengenannte und von der Stadtwerke Duisburg AG in der Vertragsbestätigung aufgeführte Datum, sofern zu diesem Zeitpunkt die Belieferung tatsächlich und rechtlich möglich ist. Ansonsten wird der Lieferbeginndurch die Stadtwerke Duisburg AG bestimmt. Ist ein Lieferbeginn innerhalb von zwölf Monaten nach Vertragsabschluss nicht möglich, wird Ihnen die Stadtwerke Duisburg AG dies mitteilen. Sodann haben beide Parteien die Möglichkeit, innerhalb von 14 Tagen nach Zugang dieser Mitteilung vom Vertrag zurückzutreten. Tritt keine der Parteien innerhalb dieser Frist vom Vertrag zurück, wird der Lieferbeginn von der Stadtwerke Duisburg AG bestimmt. Ein möglicher Lieferantenwechsel ist grundsätzlich kostenfrei und wird seitensder Stadtwerke DuisburgAG zügig innerhalbder gesetzlichen Fristen durchgeführt. Der von Ihnen zu zahlende Preis richtet sich nach Ihrem tatsächlichen Verbrauch in Verbindung mit dem von Ihnen ausgewählten Produkt und der von Ihnenvorgenommenen individuellen Produktkonfiguration, die Sie dem Produktdatenblatt entnehmen können. Die Zahlungspflicht beginnt mit Lieferbeginn.",
    "terms.pricing":
      "Wie setzt sich mein Preis zusammen, wie erfolgen Preisänderungen und habe ich ein Kündigungsrecht bei Preisänderungen?",
    "terms.pricing.content":
      "a.  In Ihrem Strompreis sind die folgenden Kosten enthalten: Beschaffungs und Vertriebskosten, die Umsatzsteuer, die Stromsteuer, die Konzessionsabgabe, die Entgelte für die Netznutzung, für die Messung und den Messstellenbetrieb konven- tionellerund moderner Messeinrichtungen durch den grundzuständigen Messstellen- betreiber, die Kosten der Abrechnung, die Mehrbelastungen nach § 12 EnFG (aus den Verpflichtungen des Kraft-Wärme-Kopplungsgesetzes und die Offshore-Netzumlage), die Stromnetzentgeltverordnung (StromNEV) nach § 19 Abs. 2 und die Umlage für abschaltbare Lasten nach § 18 Abs. 1 AbLaV. b. (1) Haben Sie einen Tarif gewählt, der im Produktdatenblatt als klassischer Tariff bezeichnet ist, und wird Ihr Verbrauch über ein intelligentes Messsystem (iMSys) erfasst, wird Ihnen ein um den im Produktdatenblatt genannten Betrag reduzierterGrundpreis berechnet. Die Kosten für die Messung und den Messstellenbetrieb mittels iMSys rechnen die Stadtwerke Duisburg AG separat in der jeweils tatsächlich anfallenden Höhe, spätestens mit der Rechnungsstellung, mit Ihnen ab. Absätze d. bis g. finden keine Anwendung. Die tatsächlichen Kosten für ein iMSys sind je nach Messstellenbetreiber unterschiedlich. Als Kostenorientierung gelten die gesetzlichen Preisobergrenzen, siehe Preisblatt zu den Preisobergrenzen für intelligente Mess- systeme (iMSys). Ihre Höhe können Sie dem Preisblatt Ihres grundzuständigen Messstellenbetreibers entnehmen. Die exakte Höhe teilt die Stadtwerke Duisburg AG mit der Vertragsbestätigung mit. Haben Sie einen eigenen Messstellenbetreiber beauftragt, wird Ihnen ein um den im Produktdatenblatt genannten Betrag reduzierter Grundpreis berechnet. (2) Haben Sie einen Tarif gewählt, der im Produktdatenblatt als intelligenter Tarif bezeichnet ist, und wird Ihr Verbrauch über ein iMSys erfasst, gilt neben dem Grundpreis der im Produktdatenblatt des von Ihnen gewählten Tarifs angegebene Messpreis für iMSys. Haben Sie einen eigenen Messstellenbetreiber beauftragt, wird der Messpreis für iMSys nicht berechnet. c.  Haben Sie einen eigenenMessstellenbetreiber beauftragt, dann stellt Ihnendieser die Entgelte für Messung und Messstellenbetrieb direkt in Rechnung; eine Abrechnung über die Stadtwerke Duisburg AG erfolgt nicht. d.  Preisänderungen durch die Stadtwerke Duisburg AG erfolgenim Wege der einseitigen Leistungsbestimmung in Ausübung billigen Ermessens nach § 315 BGB. Der Kunde kann dies nach § 315 BGB zivilgerichtlich überprüfen lassen. Bei der einseitigen Leistungsbestimmung durch die Stadtwerke Duisburg AG sind ausschließlich Änderungen der Kostenzu berücksichtigen, die für die Preisermittlung nach Absatz a und Absatz b (2) maßgeblich sind. Die Stadtwerke Duisburg AG ist bei Kosten- steigerungen berechtigt, bei Kostensenkungen verpflichtet, eine Preisänderung durchzuführen. Bei der Preisermittlung ist die Stadtwerke Duisburg AG verpflichtet, Kostensteigerungen nur unter Ansatz gegenläufiger Kostensenkungen zu berück- sichtigen und eine Saldierung von Kostensteigerungen und Kostensenkungen vorzunehmen. e.  Die Stadtwerke Duisburg AG nimmt mindestens alle zwölf Monate eine Überprüfung der Kostenentwicklung vor. Die Stadtwerke Duisburg AG hat den Umfangund den Zeitpunkt einer Preisänderung so zu bestimmen, dass Kostensenkungen nach denselben betriebswirtschaftlichen MaßstäbenRechnung getragen wird wie Kostener- höhungen. Insbesondere darf die die Stadtwerke Duisburg AG die Kostensenkungen nicht später weitergeben als Kostensteigerungen. f.  Änderungen der Preise werden erst nach textlicher Mitteilung an die Kunden wirksam,die mindestens einen Monat vor der beabsichtigten Änderung erfolgen muss. g.  Ändert die Stadtwerke Duisburg AG die Preise, so hat der Kunde das Recht, den Vertrag ohne Einhaltung einer Kündigungsfrist zum Wirksamwerden der Änderung zu kündigen. Hierauf wird die Stadtwerke Duisburg AG den Kunden in der textlichen Mitteilung über die bevorstehende Änderung ausdrücklich hinweisen. Die Kündigung bedarf der Textform. Die Stadtwerke Duisburg AG hat die Kündigung unverzüglich nach Eingangin Textform zu bestätigen. Das Recht zur außerordentlichen Kündigungnach § 314 BGB bleibt unberührt. h.   Die Absätze d)- g) geltenentsprechend, falls die Beschaffung, Erzeugung, Lieferung, Verteilung, das Inverkehrbringen oder der Verbrauch von Strom nach Vertragsschluss mit einer neuen Steuer, Abgabe oder sonstigen hoheitlich auferlegten, allgemein verbindlichen Belastung (d. h. keine Bußgelder o.ä.) belegt wird, soweit diese unmittelbaren Einfluss auf die Kosten für die nach diesem Vertrag geschuldeten Leistungen hat. Dasselbe gilt, falls sich die Höhe einer weitergegebenen Steuer, Abgabe oder sonstigen hoheitlichen Belastung ändert oder entfällt. i.  Abweichend von den Absätzen d)-h) werden Änderungen der Umsatzsteuer gemäß dem Umsatzsteuergesetz zum Zeitpunkt des Wirksamwerdens der Änderung ohne Ankündigung und ohne außerordentliche Kündigungsmöglichkeit weitergegeben. j.  Aufgrund der Tarifvielfalt weist die Stadtwerke Duisburg AG aus Praktikabilitätsgründen und zur Übersichtlichkeit für die Sondervertragskunden abweichend von den Informationspflichten eines Grundversorgers gemäß § 2 Abs. 3 der StromGVVausschließlich die bundeseinheitlich geltenden staatlich oder regulatorisch veranlassten Umlagen und Belastungen, die im Strompreis enthalten sind, auf ihrer Websiteaus. Auf die Informationsplattform der Übertragungsnetz- betreiberzu den Umlagen und Belastungen wird ebenfalls hingewiesen. Wegen der nichtbundeseinheitlichen Belastungen (derzeit Netzentgelte und Konzessionsab- gaben) wird ebenfallsauf die Informationsplattform des örtlichenNetzbetreibers hingewiesen.",
    "terms.guarantee": "Was umfasst meine Preisgarantie?",
    "terms.guarantee.content":
      "a.  Umfasst das von Ihnen gewählteStromprodukt eine Preisgarantie, so sind von dieser Preisgarantie Änderungen, Neueinführungen und Wegfall von Steuern und Abgaben sowie staatlich veranlasste Belastungen und Entlastungen, die die Beschaffung, Erzeugung, den Netzanschluss, die Netznutzung (Übertragung und Verteilung) oderden Verbrauch von elektrischer Energie betreffen, ausgenommen. Die Weitergabe dieser Belastungen und Entlastungen im Preisgarantieraum erfolgen nach Maßgabe von Ziffer 6 Absatz d) bis g). Bei einemTarif, der im Produktdatenblatt als klassischer Tarif bezeichnet ist, sind die Kosten für die Messung und den Messstellenbetrieb mittels iMSys ebenfalls von der Preisgarantie ausgenommen. Die Weitergabe dieser Kosten erfolgt nach Maßgabe von Ziffer 6 Absatz b(1). Bei einem Tarif, der im Produktdatenblatt als intelligenter Tarif bezeichnet ist, ist der Messpreis für iMSys nach Ziffer 6 Absatz b(2) von der Preisgarantie umfasst. b.  Die Laufzeit Ihrer Preisgarantie richtet sich nach dem von Ihnen ausgewählten Stromprodukt. Nach dem Ablauf der ersten Preisgarantie schließt sich jeweils eine weitere Preisgarantie an. Die Dauer der Preisgarantie und der Folgepreisgarantie entnehmen Sie dem Produktdatenblatt. Preisänderungen zum Beginn einer weiteren Preisgarantie erfolgen nach Maßgabe von Ziffer 6 Absatz d bis g.",
    "terms.billing": "Abrechnung, Rechnungsstellung, Zahlung",
    "terms.billing.content":
      "a.  Die Zahlung kann nach Ihrer Wahl per Überweisung oder alternativ durch Erteilung eines SEPA-Basis-Lastschriftmandats (Lastschrifverfahren) erfolgen. Wählen Sie das Lastschriftverfahren, so teilen wir Ihnen unsere Gläubiger-Identifikationsnummer und die Ihrer Einzugs-ermächtigung zugeordnete Mandatsreferenznummer in Textform mit. Diese Angaben finden Sie bei SEPA-Basis-Lastschriften auch im Verwendungszweck Ihres Kontoauszugs. b.  Sofern Sie uns ein SEPA-Basis-Lastschriftmandat erteilt haben, wird die Mindestfrist für die Vorabankündigung (Pre-Notification) für Einzüge im SEPA-Basis-Lastschrift- verfahren auf eine Frist von fünf Kalendertagen vor Fälligkeit verkürzt. c.  Während des Abrechnungszeitraums zahlen Sie je nach der von Ihnen gewählten Produktkonfiguration monatliche bzw. vierteljährliche Abschläge, die sich aus Ihremtatsächlichen oder geschätzten Vorjahresverbrauch bzw. der bestellten Energiemenge ergeben. Die erste Zahlung wird frühestens ab Lieferbeginn fällig, die nachfolgenden Abschläge folgen je nach der von Ihnen gewählten Produktkonfiguration im Abstand von jeweils einem bzw. drei Monaten. Die Abschläge werden auf die Abrechnung angerechnet. Die Höhe der Abschläge wird Ihnen bei erstmaliger Belieferung mit der Vertragsbestätigung und bei fortgesetzter Belieferung mit der Verbrauchsabrechnung mitgeteilt. Für Stromprodukte mit einem intelligenten Tarif, deren Messstelle mit einem intelligenten Messsystem [iMSys] ausgerüstet ist, erfolgt die Verbrauchsabrechnung periodisch über eine IST-Abrechnung. In dem Fall werden keine Abschläge erhoben. Rechnungsbeträge und Abschlägewerden zu dem von der Stadtwerke DuisburgAG angegebenen Zeitpunkt, frühestens jedoch zwei Wochen nach Zugang der Zahlungsaufforderung fällig.Rückständige Zahlungen werden nach Fälligkeit angemahnt. Die Kosten für die Mahnung sind dem Produktdatenblatt zu entnehmen. Der Nachweisgeringerer Kosten ist Ihnen jederzeitgestattet. Für Bankrückläufer, also falls der Bankeinzug nicht möglich ist, werden angemessene und berechtigte fremde Gebührenin der tatsächlich entstandenen Höhe an den Kunden weitergegeben. Die Geltendmachung von Verzugszinsen in der gesetzlichen Höhe sowie weitererVerzugsschäden in tatsächlich angefallener Höhe bleibt vorbehalten. Der höhere tatsächliche Schaden wird dann anstelle des pauschalierten Schadens unter Anrechnung etwaiger bereits entrichteter Mahnkostenpauschalen geltend gemacht. e.  Der Stromverbrauch des Kunden wird vorbehaltlich des Absatzes f) in der Regel jährlich zum Ende des Abrechnungszeitraums ermittelt und abgerechnet. f.  Abweichend von Absatz e) erfolgt die Rechnungsstellung auf Wunsch des Kunden auch monatlich, viertel- oder halbjährlich. Der Kunde hat ferner Anspruch auf eine unentgeltliche elektronische Übermittlung der Abrechnungen und Abrechnungsinfor- mationensowie eine unentgeltliche jährliche Übermittlung in Papierform. Im Falle der elektronischen Übermittlung werden dem Kunden die Abrechnungsinformationen mindestens alle sechs Monate, auf Verlangen alle drei Monate, unentgeltlich zur Verfügung gestellt. Kunden, bei denen eine Fernübermittlung der Verbrauchsdaten erfolgt, werden Abrechnungsinformationen über das Online-Kundenportal des Lieferanten monatlich unentgeltlich zur Verfügung gestellt. g.  Der Kunde erhält die Verbrauchsabrechnung von der Stadtwerke Duisburg AG spätestens sechs Wochen nach Beendigung des abzurechnenden Zeitraums und eine Abschlussrechnung spätestens 6 Wochen nach Beendigung des Lieferverhältnisses mit dem tatsächlichen Stromverbrauch im abzurechnenden Zeitraum sowie Angaben zur tatsächlichen Ermittlung des Zählerstandes. Erfolgt eine Abrechnung monatlich, so beträgt die Frist für die Abrechnung drei Wochen. h.  Ergibt sich aus der Abrechnung ein Guthaben des Kunden, wird die Stadtwerke Duisburg AG ihm dieses binnen zwei Wochen erstatten oder vollständig mit der nächsten Abschlagsforderung verrechnen. Zukünftige Abschlagszahlungen werden entsprechend angepasst. Guthaben aus einer Abschlussrechnung werden binnen zwei Wochenausgezahlt.",
    "terms.interruption": "Wann kann die Versorgung unterbrochen werden?",
    "terms.interruption.content":
      "a.  Die Stadtwerke Duisburg AG ist berechtigt, die Stromversorgung ohne vorherige Androhung durch den Netzbetreiber unterbrechen zu lassen, wenn Sie dem Vertrageinschließlich dieser allgemeinen Stromlieferbedingungen in nicht unerheblichem Maße schuldhaft zuwiderhandeln und die Unterbrechung erforderlich ist, um den Gebrauch von Strom unter Umgehung, Beeinflussung oder vor Anbringung der Messeinrichtungen zu verhindern. b.  Bei anderen Zuwiderhandlungen, insbesondere bei der Nichterfüllung einer Zahlungsverpflichtung trotz Mahnung, ist die Stadtwerke Duisburg AG berechtigt, die Stromversorgung 4 Wochen nach Androhung unterbrechen zu lassen. Dies gilt nicht,wenn die Folgender Unterbrechung außerVerhältnis zur Schwereder Zuwiderhandlung stehen oder wenn Sie darlegen, dass hinreichende Aussicht besteht, dass Sie Ihren Verpflichtungen nachkommen. Wegen Zahlungsverzuges darf die Stadtwerke Duisburg AG eine Unterbrechung der Stromversorgung unter den vorgenannten Voraussetzungen nur dann durchführen lassen, wenn Sie nach Abzug etwaiger Anzahlungen mit Zahlungsverpflichtungen von mindestens 100,00 Euro in Verzug sind. Bei der Berechnungder Höhe des Betrages bleiben diejenigen nicht titulierten Forderungen außer Betracht, die Sie form- und fristgerecht sowie schlüssig begründetbeanstandet haben. Fernerbleiben diejenigen Rückstände außer Betracht, die wegen einer Vereinbarung zwischen dem Ihnen und der Stadtwerke DuisburgAG noch nicht fällig sind oder die aus einer streitigen und noch nicht rechtskräftig entschiedenen Preisanpassung der Stadtwerke Duisburg AG resultieren. c.  Sie werden vier Wochen vor einer geplanten Versorgungsunterbrechung wegen Nichtzahlung in geeigneter Weise deutlich und leicht verständlich über Möglichkeiten zur Vermeidung der Versorgungsunterbrechung informiert, die für Sie keine Mehr- kostenverursachen. d.  Der Beginn der Unterbrechung der Stromversorgung wird Ihnen drei Werktage im Vorausangekündigt. e.  Die Stadtwerke Duisburg AG hat die Stromversorgung unverzüglich wiederherstellen zu lassen,sobald die Gründe für ihre Unterbrechung entfallensind und Sie die Kosten der Unterbrechung und Wiederherstellung der Belieferung ersetzt haben. Die Kosten der Unterbrechung und Wiederherstellung der Belieferung sind dem Produktdatenblatt zu entnehmen. Der Nachweis geringerer Kosten ist Ihnen jederzeit gestattet.",
    "terms.bonus": "Bonuszahlung",
    "terms.bonus.content":
      "a.  Soweit die Stadtwerke Duisburg AG mit Ihnen bei Vertragsabschluss einen Neukundenbonus vereinbart hat, gelten folgende Regelungen: Die einmalige Bonuszahlung erfolgt, sofern das Vertragsverhältnis zwölf Versorgungsmonate ununterbrochen bestanden hat. Der Bonus wird Ihnen nach Ablauf der zwölf Monate mit der nächsten Verbrauchsabrechnung gutgeschrieben und verrechnet; ein nach dieser Verrechnung überschießendes Kundenguthaben wird ausgezahlt. Für die Einräumung eines Neukundenbonus gilt: Neukunde ist, wer in den letzten sechs Monaten vor Vertragsschluss in seinem Haushalt nicht von der Stadtwerke Duisburg AG beliefert wurde. Die Höhe des Bonus richtet sich nach dem tatsächlich in der ersten Jahresverbrauchsabrechnung berechneten Verbrauch. Eine Tabellemit Bonushöhen für die jeweiligen Verbrauchssegmente finden Sie auf dem Produktdatenblatt. b.  Soweit die Stadtwerke Duisburg AG mit Ihnen einen Sofortbonus vereinbart hat, so wird dieser zu dem Zeitpunkt fällig, der Ihnen in Ihrer Vertragsbestätigung mitgeteiltwird, spätestens aber sechzig Tage nach Lieferbeginn. Die Stadtwerke Duisburg AG muss den Sofortbonus nicht gewähren, wenn der Energieliefervertrag vor dem in der Vertragsbestätigung genannten Zeitpunkt beendetwird oder wenn Sie kein Neukunde gemäß der Definition in Ziffer 10 a sind. Die Stadtwerke Duisburg AG darf die Zahlung des Sofortbonus verweigern, solange offene Forderungen bestehen. Wird ein Sofortbonus zugesagt, so muss bei Vertragsabschluss zwingend eine Bankverbindung angegeben werden, an die die Stadtwerke Duisburg AG den Sofortbonus zum Fälligkeitsdatum überweisen kann.",
    "terms.liability": "Wer haftet bei Ansprüchen aus Versorgungsstörungen?",
    "terms.liability.content":
      "Bei einer Störung oder bei Unregelmäßigkeiten der Stromlieferung ist die Stadtwerke Duisburg AG gem. § 6 Abs. 3 StromGVV von ihrer Leistungspflicht befreit, soweit es sich um Folgen einer Störung des Netzbetriebs oder des Messstellenbetriebs handelt. Ansprüche aus Versorgungsstörungen im Sinne des § 6 Abs. 3 Satz 1 StromGVV sind, soweit es sich um Folgen der Störung des Netzbetriebs handelt,gegen den Netzbetreiber oder, soweit es sich um Folgen der Störung des Messstellenbetriebs handelt, gegen den zuständigen Messstellenbetreiber geltend zu machen. Bei in sonstiger Weise verursachten Schäden einschließlich Schäden aufgrund der Nichteinhaltung vertraglich vereinbarter Leistungsqualität, wozu auch ungenaue oder verspätete Abrechnungen zählen, haftendie Stadtwerke DuisburgAG bei Vorsatz und groberFahrlässigkeit, auch ihrer Erfüllungsgehilfen, nach den gesetzlichen Bestimmungen. Das gleiche gilt bei fahrlässig verursachten Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei fahrlässig verursachten Sach- und Vermögensschäden haftendie Stadtwerke Duisburg AG und ihre Erfüllungsgehilfen nur bei der Verletzung einer wesentlichen Vertragspflicht, jedoch der Höhe nach beschränkt auf die bei Vertrags- schluss vorhersehbaren und vertragstypischen Schäden. Wesentliche Vertragspflichten sind solche, deren Erfüllung den Vertrag prägt und auf die der Kunde vertrauen darf.",
    "terms.changes": "Änderungen der Allgemeinen Geschäftsbedingungen (AGB)",
    "terms.changes.content":
      "Änderungen der Allgemeinen Geschäftsbedingungen werdenIhnen durch die Stadtwerke Duisburg AG spätestens vier Wochen vor Inkrafttreten in Textform und per Veröffent-lichung im Internet mitgeteilt. Im Falle einer Änderung der Allgemeinen Geschäftsbe- dingungen haben Sie das Recht, den Vertrag ohne Einhaltung einer Kündigungsfrist zum Zeitpunkt des Wirksamwerdens der Änderungen zu kündigen. Eine einseitige Änderung der Allgemeinen Geschäftsbedingungen ist nur dann zulässig, wenn die objektiveNotwendigkeit zur Anpassung besteht, so etwa bei Änderungen von Gesetzen, Verordnungen oder der Rechtsprechung mit Auswirkungen auf die Wirksamkeit der AGB bzw. auf die Zumutbarkeit einer unveränderten Vertragsfortführung. Die Kündigung bedarf der Textform.",
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
