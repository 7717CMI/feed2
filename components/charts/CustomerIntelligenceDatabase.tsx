'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface CustomerData {
  sNo: number
  companyName: string
  yearEstablished: string
  headquarters: string
  employees: string
  revenue: string
  keyContactPerson: string
  designation: string
  emailAddress: string
  phoneNumber: string
  linkedInProfile: string
  websiteUrl: string
  productCategories: string
  purchaseFrequency: string
  salesChannelType: string
  regionOperation: string
  engagementWithSuppliers: string
  preferredContactMethod: string
  responseSpeed: string
}

const customerData: CustomerData[] = [
  {
    sNo: 1,
    companyName: 'JBS',
    yearEstablished: '1953',
    headquarters: 'S\u00e3o Paulo, Brazil',
    employees: '~270,000+',
    revenue: '~77,200.14',
    keyContactPerson: 'Gilberto Tomazoni',
    designation: 'Global CEO',
    emailAddress: 'tomazoni.gilberto@gmail.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://in.linkedin.com/company/jbs',
    websiteUrl: 'https://www.jbs.com.br/en/about/',
    productCategories: 'Methionine used for protein synthesis in poultry and swine feed; Propionic Acid used as mold inhibitor in feed storage; Butyric Acid used for gut health and feed efficiency in poultry and livestock diets',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Commodity traders & global distributors \u2013 large-volume feed ingredients and additives sourced through international traders and authorized distributor networks',
    regionOperation: 'Global operations with major processing and livestock operations in Brazil, United States, Canada, Europe and Australia, with distribution and export networks across Asia and Latin America',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'B2B supplier portal, corporate procurement emails, formal vendor onboarding channels',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 2,
    companyName: 'Tyson Foods, Inc.',
    yearEstablished: '1935',
    headquarters: 'Springdale, Arkansas, USA',
    employees: '~133,000',
    revenue: '~54,400.27',
    keyContactPerson: 'Donnie King',
    designation: 'CEO',
    emailAddress: 'donnie.king@tyson.com',
    phoneNumber: '1 630-991-5100',
    linkedInProfile: 'https://www.linkedin.com/company/tyson-foods/',
    websiteUrl: 'https://www.tysonfoods.com/',
    productCategories: 'Methionine used in poultry feed formulation; Propionic Acid used for feed preservation; Butyric Acid used to support intestinal health and feed conversion in broiler production',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Authorized distributors & ingredient traders \u2013 additives typically procured via approved supplier distributors and large agricultural traders',
    regionOperation: 'Primary operations across the United States with processing facilities and supply chain networks across North America, along with export distribution across Asia and Europe',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'B2B supplier portal, corporate email, LinkedIn supplier engagement',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 3,
    companyName: 'Koch Foods, Inc.',
    yearEstablished: '1985',
    headquarters: 'Park Ridge, Illinois, USA',
    employees: '~13,000+',
    revenue: 'NA',
    keyContactPerson: 'Joseph C. Grendys',
    designation: 'Chairman, CEO & President',
    emailAddress: 'joe.grendys@kochfoods.com',
    phoneNumber: '1 312-806-8555',
    linkedInProfile: 'https://www.linkedin.com/company/koch-foods-inc/',
    websiteUrl: 'https://kochfoods.com/',
    productCategories: 'Methionine used in broiler feed nutrition for amino acid balancing; Propionic Acid used for mold prevention in poultry feed ingredients',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional feed ingredient distributors \u2013 additives and premixes sourced through regional distributor suppliers supporting poultry feed mills',
    regionOperation: 'United States poultry production network across Alabama, Georgia, Mississippi, Illinois, Ohio and Tennessee supporting domestic supply and export markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct B2B email contact, corporate email, supplier relationship communication',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 4,
    companyName: 'Mountaire Farms, Inc.',
    yearEstablished: '1914',
    headquarters: 'Millsboro, Delaware, USA',
    employees: '~10,000',
    revenue: '~3,800.36',
    keyContactPerson: 'Amanda Irwin',
    designation: 'President / Chairman',
    emailAddress: 'airwin@mountaire.com',
    phoneNumber: '1-302-934-1100',
    linkedInProfile: 'https://www.linkedin.com/company/mountaire-farms/',
    websiteUrl: 'https://mountaire.com/',
    productCategories: 'Methionine used for broiler growth performance; Propionic Acid used as feed preservative in integrated poultry feed mills; Butyric Acid used for gut health improvement',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Feed ingredient wholesalers & distributors \u2013 integrated poultry feed operations supplied by regional wholesalers and additive distributors',
    regionOperation: 'United States operations concentrated in the Mid-Atlantic and Southeastern states including Delaware, Maryland, Virginia, North Carolina and Arkansas',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate procurement email, supplier portal, direct phone contact',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 5,
    companyName: 'Sanderson Farms, LLC (Wayne-Sanderson Farms)',
    yearEstablished: '1947',
    headquarters: 'Laurel, Mississippi, USA',
    employees: '~26,000',
    revenue: '~4,700.42',
    keyContactPerson: 'Kevin McDaniel',
    designation: 'President and CEO',
    emailAddress: 'kevin.mcdaniel@waynefarms.com',
    phoneNumber: '1 800-392-0844',
    linkedInProfile: 'https://www.linkedin.com/company/sanderson-farms/',
    websiteUrl: 'https://sandersonfarms.com/',
    productCategories: 'Methionine used in poultry feed amino acid balancing; Propionic Acid used as preservative in feed storage; Butyric Acid used to stabilize gut microbiota',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Ingredient wholesalers \u2013 additives and premixes sourced via established ingredient wholesalers supplying integrated feed mills',
    regionOperation: 'United States integrated poultry production across Mississippi, Texas, Louisiana, Georgia and North Carolina with nationwide supply distribution',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate procurement channels, supplier portal, vendor email communication',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 6,
    companyName: 'Cal-Maine Foods, Inc.',
    yearEstablished: '1957',
    headquarters: 'Ridgeland, Mississippi, USA',
    employees: '~3,800',
    revenue: '~4,200.33\u20134,400.71',
    keyContactPerson: 'Sherman L. Miller',
    designation: 'President & CEO',
    emailAddress: 'sherman@calmainefoods.com',
    phoneNumber: '1 601-948-6813',
    linkedInProfile: 'https://www.linkedin.com/company/calmainefoods/',
    websiteUrl: 'https://www.calmainefoods.com/',
    productCategories: 'Methionine used in layer diets for egg production; Propionic Acid used for feed stability and mold prevention; Butyric Acid used for digestive health',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Commodity traders & distributors \u2013 large-scale layer feed ingredients sourced through grain traders and additive distributors',
    regionOperation: 'United States multi-state egg production network with feed mills and production facilities across the Midwest, Southeast and Southwest regions',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, corporate email, procurement phone contact',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 7,
    companyName: 'Smithfield Foods, Inc.',
    yearEstablished: '1936',
    headquarters: 'Smithfield, Virginia, USA',
    employees: '~34,000',
    revenue: '~14,000.18+',
    keyContactPerson: 'Shane Smith',
    designation: 'President & CEO',
    emailAddress: 'shanesmith@smithfieldfoods.com',
    phoneNumber: '1-800-736-3001',
    linkedInProfile: 'https://www.linkedin.com/company/smithfield-foods/',
    websiteUrl: 'https://www.smithfieldfoods.com/',
    productCategories: 'Methionine used in swine nutrition; Propionic Acid used to prevent fungal growth in feed; plant tannin extracts including Acacia mearnsii and Quebracho used for digestive efficiency',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Commodity traders & authorized distributors \u2013 swine feed ingredients and additives supplied through global traders and distributor partnerships',
    regionOperation: 'United States hog production and pork processing operations with supply networks across North America and export markets in Asia and Europe',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate procurement email, supplier phone contact, procurement channels',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 8,
    companyName: 'Seaboard Corporation / Seaboard Foods',
    yearEstablished: '1995',
    headquarters: 'Merriam, Kansas, USA',
    employees: '~14,000+',
    revenue: '~9,746.29',
    keyContactPerson: 'Peter Ghandour',
    designation: 'Senior Procurement Manager',
    emailAddress: 'peter_ghandour@seaboardfoods.com',
    phoneNumber: '1 913-261-2600',
    linkedInProfile: 'https://www.linkedin.com/company/seaboard-foods/',
    websiteUrl: 'https://www.seaboardfoods.com/',
    productCategories: 'Methionine used in hog feed formulations; Propionic Acid used for feed grain preservation; Butyric Acid used for intestinal health in swine production',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Grain traders & distributor network \u2013 feed additives and ingredients sourced via commodity traders and regional distributors',
    regionOperation: 'United States pork production and feed mill operations across Oklahoma, Kansas, Texas, Colorado and Iowa supporting domestic and export markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Supplier portal, procurement email, direct phone contact',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 9,
    companyName: 'Prestage Foods / Prestage Farms, Inc.',
    yearEstablished: '1983',
    headquarters: 'Clinton, North Carolina, USA',
    employees: '~2,700',
    revenue: '~783.54',
    keyContactPerson: 'Treasa Bremmer',
    designation: 'Director of Purchasing',
    emailAddress: 'tbremmer@prestagefoods.com',
    phoneNumber: '1 910-865-6611',
    linkedInProfile: 'https://www.linkedin.com/company/prestage-farms/',
    websiteUrl: 'https://www.prestagefoods.com/',
    productCategories: 'Methionine used in turkey and poultry feed; Propionic Acid used for feed preservation; Butyric Acid used to improve gut health and feed efficiency',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional feed ingredient distributors \u2013 additives and premixes supplied through regional distributor networks supporting integrated operations',
    regionOperation: 'United States pork and turkey production operations across North Carolina, South Carolina, Iowa, Mississippi, Oklahoma, Alabama and Texas',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct procurement email, phone contact, vendor communication channels',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 10,
    companyName: 'MBRF Ingredients',
    yearEstablished: '1934',
    headquarters: 'S\u00e3o Paulo, Brazil',
    employees: '~130,000',
    revenue: 'NA',
    keyContactPerson: 'G\u00f6zdecan Onan \u0130pek\u00e7i',
    designation: 'Procurement Manager',
    emailAddress: 'gozdecanonan@brf-global.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/mbrf-ingredients/',
    websiteUrl: 'https://www.mbrfingredients.com.br/en/',
    productCategories: 'Tannic Acid, Chestnut Extract and Quebracho tannin extracts used as natural antimicrobial additives in animal feed ingredients and aquaculture feed',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Global distributors & traders \u2013 ingredient sourcing through international distributors and agricultural commodity traders',
    regionOperation: 'Brazil-based operations with processing facilities across South America and export supply to Europe, Asia, the Middle East and the Americas',
    engagementWithSuppliers: 'Medium\u2013High',
    preferredContactMethod: 'Corporate email, website contact form, B2B supplier meetings',
    responseSpeed: 'Medium'
  },
  {
    sNo: 11,
    companyName: 'Perdue Farms Inc.',
    yearEstablished: '1939',
    headquarters: 'Salisbury, Maryland, USA',
    employees: '~19,534',
    revenue: 'NA',
    keyContactPerson: 'Mark Passen',
    designation: 'Regional Purchasing Manager',
    emailAddress: 'mark.passen@perdue.com',
    phoneNumber: '1 410-341-5005',
    linkedInProfile: 'https://www.linkedin.com/company/perduefarms/',
    websiteUrl: 'https://corporate.perduefarms.com/',
    productCategories: 'Methionine used for poultry feed amino acid balance; Propionic Acid used for feed storage stability; Butyric Acid used for gut health improvement',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Ingredient distributors & wholesalers \u2013 additives and premixes typically sourced through distributor networks supplying poultry feed mills',
    regionOperation: 'United States poultry operations primarily across Maryland, Virginia, Delaware, North Carolina and Georgia supporting North American supply',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct procurement emails, supplier engagement channels',
    responseSpeed: 'Medium\u2013High'
  },
  {
    sNo: 12,
    companyName: 'Bachoco Corporate',
    yearEstablished: '1952',
    headquarters: 'Celaya, Guanajuato, Mexico',
    employees: '~25,000',
    revenue: '~5,420.44',
    keyContactPerson: 'Ernesto Salmon Castelo',
    designation: 'CEO',
    emailAddress: 'ernesto.salmon@bachoco.net',
    phoneNumber: '52 461 618 3555',
    linkedInProfile: 'https://www.linkedin.com/company/grupo-bachoco/',
    websiteUrl: 'https://en.grupobachoco.com/companies/',
    productCategories: 'Methionine used in poultry and swine diets; Propionic Acid used for feed preservation; plant tannin extracts used for digestive health in livestock',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Regional distributors & wholesalers \u2013 feed additives and premixes procured via local distributor networks and ingredient wholesalers',
    regionOperation: 'Mexico-based poultry and feed production operations with facilities across Mexico and additional operations in the United States',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email contact with procurement teams',
    responseSpeed: 'Medium'
  },
  {
    sNo: 13,
    companyName: 'Marfrig Global Foods S.A.',
    yearEstablished: '1986',
    headquarters: 'S\u00e3o Paulo, Brazil',
    employees: '~126,000\u2013130,000',
    revenue: '~29,780.37',
    keyContactPerson: 'Miguel Gularte',
    designation: 'CEO',
    emailAddress: 'procurement@marfrig.com.br',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/marfrigglobalfoods/',
    websiteUrl: 'https://ri.marfrig.com.br/en/grupo-marfrig/global-capacity/our-operations/',
    productCategories: 'Methionine used in livestock feed formulations; Propionic Acid used as antifungal preservative; tannin extracts used for digestive health in cattle diets',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Commodity traders & wholesalers \u2013 feed ingredients sourced primarily through traders and regional ingredient wholesalers',
    regionOperation: 'Beef processing operations across Brazil, Argentina and the United States with distribution and exports to Europe, Asia and global markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal communication, corporate emails',
    responseSpeed: 'Medium'
  },
  {
    sNo: 14,
    companyName: 'Minerva Foods S.A.',
    yearEstablished: '1992',
    headquarters: 'Barretos, S\u00e3o Paulo, Brazil',
    employees: '~33,850',
    revenue: '~6,000.58',
    keyContactPerson: 'Fernando Galletti de Queiroz',
    designation: 'CEO',
    emailAddress: 'diretoria@minerva.ind.br',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/minerva-foods-s-a-/',
    websiteUrl: 'https://minervafoods.com/en/product-quality-and-animal-welfare/',
    productCategories: 'Tannin extracts including Acacia mearnsii, Chestnut Extract and Quebracho used in ruminant feed for methane reduction and digestive health',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Ingredient wholesalers & traders \u2013 feed inputs and additives sourced through commodity traders and wholesale suppliers',
    regionOperation: 'South American beef production across Brazil, Paraguay, Uruguay, Argentina and Colombia with exports to Europe, Asia and the Middle East',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email communication, LinkedIn engagement',
    responseSpeed: 'Medium'
  },
  {
    sNo: 15,
    companyName: 'PHW Group',
    yearEstablished: '1961',
    headquarters: 'Germany',
    employees: '~11,000',
    revenue: '~4,396.22',
    keyContactPerson: 'Sarah Nieder',
    designation: 'Product development',
    emailAddress: 'snieder@phw-gruppe.de',
    phoneNumber: '49 4445 8910',
    linkedInProfile: 'https://www.linkedin.com/company/phw-gruppe/',
    websiteUrl: 'https://phw-gruppe.de/',
    productCategories: 'Methionine used in poultry feed formulations; Propionic Acid used as preservative in feed grains and feed storage',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Authorized distributors & ingredient traders \u2013 feed additives and premixes sourced through certified EU distributors and trading partners',
    regionOperation: 'Germany-based poultry production with operations across Europe and export supply to international markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 16,
    companyName: "Pilgrim's Europe",
    yearEstablished: '1984',
    headquarters: 'Denmark',
    employees: '~17,000',
    revenue: '~2,011.65',
    keyContactPerson: 'Kerry Varney',
    designation: 'Procurement Category Manager',
    emailAddress: 'contact@pilgrimseurope.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/pilgrimseurope',
    websiteUrl: 'https://pilgrimseurope.com/',
    productCategories: 'Methionine used for poultry growth performance; Propionic Acid used for feed preservation; Butyric Acid used for intestinal health and digestion',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional distributors \u2013 additives supplied through regional feed additive distributors supporting poultry feed mills',
    regionOperation: 'Poultry production across the United Kingdom, Poland and other European markets with integrated supply chains across the EU',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct procurement email and supplier communication channels',
    responseSpeed: 'Medium'
  },
  {
    sNo: 17,
    companyName: 'El Pozo Alimentacion S.A.',
    yearEstablished: '1954',
    headquarters: 'Alhama de Murcia, Spain',
    employees: '~5,234',
    revenue: '~4,033.74',
    keyContactPerson: 'Rafael Sanchez',
    designation: 'Export Area Manager',
    emailAddress: 'rafael.sanchez@elpozo.com',
    phoneNumber: '34 968 63 68 00',
    linkedInProfile: 'https://www.linkedin.com/company/elpozo',
    websiteUrl: 'https://www.elpozo.com/en/',
    productCategories: 'Methionine used in pork production feed; Propionic Acid used to stabilize feed ingredients; tannin extracts used for gut health in swine',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'EU ingredient distributors & wholesalers \u2013 additives and feed ingredients sourced via European distributor and wholesale networks',
    regionOperation: 'Spain-based meat production with distribution across the European Union and export markets in the Middle East and Asia',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email contact form, procurement communication',
    responseSpeed: 'Medium'
  },
  {
    sNo: 18,
    companyName: 'Miratorg',
    yearEstablished: '1995',
    headquarters: 'Moscow, Russia',
    employees: '~43,000',
    revenue: '~3,200.31',
    keyContactPerson: 'Victor Linnik',
    designation: 'President & Co-founder',
    emailAddress: 'info@miratorg.ru',
    phoneNumber: '+7 495 789-25-68',
    linkedInProfile: 'https://www.linkedin.com/company/miratorg',
    websiteUrl: 'https://miratorg.world/home.html',
    productCategories: 'Methionine used in livestock nutrition; Propionic Acid used for feed preservation; tannin extracts including Quebracho used for digestive health',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Regional distributors & commodity traders \u2013 feed additives and grains sourced through Russian distributor networks and traders',
    regionOperation: "Russia's large integrated livestock and meat production operations with supply across Russia and export markets in Asia and the Middle East",
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct procurement email communication',
    responseSpeed: 'Medium'
  },
  {
    sNo: 19,
    companyName: 'The Cherkizovo Group',
    yearEstablished: '1973',
    headquarters: 'Moscow, Russia',
    employees: '~40,000',
    revenue: '~3,176.49',
    keyContactPerson: 'Sergey Mikhailov',
    designation: 'CEO',
    emailAddress: 'info@cherkizovo.ru',
    phoneNumber: '+7 495 755 1515',
    linkedInProfile: 'https://www.linkedin.com/company/cherkizovo',
    websiteUrl: 'https://www.cherkizovo.com/',
    productCategories: 'Methionine used in poultry and swine feed; Propionic Acid used as feed preservative and mold inhibitor',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Commodity traders & ingredient wholesalers \u2013 poultry and livestock feed inputs sourced via traders and wholesale suppliers',
    regionOperation: 'Russia-based poultry and pork production operations with domestic distribution and exports across Asia and the Middle East',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, direct emails, supplier communication',
    responseSpeed: 'Medium'
  },
  {
    sNo: 20,
    companyName: 'Charoen Pokphand Foods PCL',
    yearEstablished: '1978',
    headquarters: 'Bangkok, Thailand',
    employees: '~132,739',
    revenue: '~19,000\u201321,000',
    keyContactPerson: 'Prasit Boondoungprasert',
    designation: 'CEO',
    emailAddress: 'info@cpfworldwide.com',
    phoneNumber: '+66 2 628 9999',
    linkedInProfile: 'https://www.linkedin.com/company/cpfworldwide',
    websiteUrl: 'https://www.cpfworldwide.com/en/home',
    productCategories: 'Methionine used in poultry and swine feed; Propionic Acid used for feed preservation; Butyric Acid and plant tannin extracts used in aquaculture feed',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Authorized distributors & regional traders \u2013 additives and premixes sourced through distributor networks and regional ingredient traders',
    regionOperation: 'Thailand-based multinational livestock and feed company with operations across Southeast Asia, China and global export markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, direct corporate emails, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 21,
    companyName: 'New Hope Liuhe Co., Ltd.',
    yearEstablished: '1998',
    headquarters: 'Chengdu, China',
    employees: '40,000+',
    revenue: '~21,250.36',
    keyContactPerson: 'Liu Chang',
    designation: 'Chairwoman',
    emailAddress: 'info@newhopeliuhe.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/new-hopeliuhe',
    websiteUrl: 'https://en.newhopeliuhe.com/',
    productCategories: 'Methionine used in livestock and poultry diets; Propionic Acid used for feed preservation; plant tannin extracts used for digestive health',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Feed additive distributors \u2013 additives and premixes supplied primarily through regional distributor networks supporting feed mills',
    regionOperation: 'China-based feed and livestock production network with operations across Southeast Asia and expanding international markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email communication',
    responseSpeed: 'Medium'
  },
  {
    sNo: 22,
    companyName: 'Haid Group Co., Ltd.',
    yearEstablished: '1995',
    headquarters: 'Guangdong, China',
    employees: '~41,821',
    revenue: '~16,044.28',
    keyContactPerson: 'Hua Xue (Xue Hua)',
    designation: 'CEO',
    emailAddress: 'info@haid.com.cn',
    phoneNumber: '86 20 3938 8666',
    linkedInProfile: 'https://www.linkedin.com/company/haidgroup',
    websiteUrl: 'https://www.haid.com.cn/',
    productCategories: 'Methionine used in aquaculture and livestock feed; Propionic Acid used for feed preservation; plant extracts used for digestive health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Distributor network & ingredient wholesalers \u2013 additives supplied through established distributor partners and wholesale suppliers',
    regionOperation: 'China-based aquaculture and livestock feed operations with distribution across China and growing international presence',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate emails, procurement phone calls',
    responseSpeed: 'Medium'
  },
  {
    sNo: 23,
    companyName: 'Wens Foodstuff Group Co., Ltd.',
    yearEstablished: '1983',
    headquarters: 'Shandong, China',
    employees: '~49,902',
    revenue: '~14,480.52',
    keyContactPerson: 'Not publicly listed',
    designation: 'CEO',
    emailAddress: 'info@wens.com.cn',
    phoneNumber: '86 766-2292926',
    linkedInProfile: 'https://www.linkedin.com/company/wens-foodstuff',
    websiteUrl: 'https://www.wens.com.cn/',
    productCategories: 'Methionine used in poultry feed; Propionic Acid used for mold inhibition and feed storage stability',
    purchaseFrequency: 'Monthly / Quarterly',
    salesChannelType: 'Regional feed distributors \u2013 additives and premixes sourced through distributor networks supporting integrated livestock operations',
    regionOperation: 'China-based livestock and poultry production operations with integrated farming networks across multiple Chinese provinces',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, corporate emails',
    responseSpeed: 'Medium'
  },
  {
    sNo: 24,
    companyName: 'Muyuan Foods Co., Ltd.',
    yearEstablished: '1992',
    headquarters: 'Henan, China',
    employees: '~133,642',
    revenue: '~20,000\u201322,000',
    keyContactPerson: 'Ying Lin Qin',
    designation: 'CEO',
    emailAddress: 'info@muyuanfoods.com',
    phoneNumber: '86 377 6355 0999',
    linkedInProfile: 'https://www.linkedin.com/company/muyuan-foods',
    websiteUrl: 'https://www.muyuanfoods.com/',
    productCategories: 'Methionine used in swine feed formulations; Propionic Acid used for feed grain preservation; Butyric Acid used for digestive health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Distributor network & commodity traders \u2013 feed additives sourced through distributor partners and agricultural traders',
    regionOperation: 'China-based large-scale swine production operations with farms and feed production facilities across central and eastern China',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email contact, procurement calls',
    responseSpeed: 'Medium'
  },
  {
    sNo: 25,
    companyName: 'Wellhope Foods Co., Ltd.',
    yearEstablished: '1996',
    headquarters: 'Shandong, China',
    employees: '~9,167',
    revenue: '~4,557.33',
    keyContactPerson: 'Mohammed Irfan',
    designation: 'Production Engineer',
    emailAddress: 'info@wellhope-ag.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/wellhope-foods',
    websiteUrl: 'http://en.wellhope-ag.com/about/',
    productCategories: 'Methionine used in poultry and livestock feed; Propionic Acid used as preservative; plant tannin extracts used in digestive health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional feed additive distributors \u2013 additives and premixes supplied through established distributor networks',
    regionOperation: 'China-based poultry and feed operations with distribution across China and export markets in Southeast Asia',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email communication',
    responseSpeed: 'Medium'
  },
  {
    sNo: 26,
    companyName: 'PT Japfa Comfeed Indonesia Tbk',
    yearEstablished: '1971',
    headquarters: 'Jakarta, Indonesia',
    employees: '~31,322',
    revenue: '~3,571.46',
    keyContactPerson: 'Antonius Harwanto',
    designation: 'Executive Vice President',
    emailAddress: 'info@japfacomfeed.co.id',
    phoneNumber: '62 628 11993203',
    linkedInProfile: 'https://www.linkedin.com/company/japfa-comfeed-indonesia',
    websiteUrl: 'https://www.japfacomfeed.co.id/en',
    productCategories: 'Methionine used in poultry and aquaculture feed; Propionic Acid used for feed stability; Butyric Acid used for gut health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional distributors & commodity traders \u2013 additives sourced via distributor networks and regional agricultural traders',
    regionOperation: 'Southeast Asia livestock and feed operations across Indonesia, Vietnam, India and Myanmar with exports across regional markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, direct corporate emails',
    responseSpeed: 'Medium'
  },
  {
    sNo: 27,
    companyName: 'PT. Charoen Pokphand Indonesia, Tbk.',
    yearEstablished: '1972',
    headquarters: 'Jakarta, Indonesia',
    employees: '~9,799',
    revenue: '~4,319.72',
    keyContactPerson: 'Wendi Lim',
    designation: 'General Manager',
    emailAddress: 'wendi.lim@gmail.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/charoen-pokphand-indonesia',
    websiteUrl: 'https://charoenpokphandid.com/en/index.html',
    productCategories: 'Methionine used in poultry and aquaculture feed; Propionic Acid used as preservative; tannin extracts used for digestive health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Authorized distributors & wholesalers \u2013 additives and premixes supplied through distributor and wholesale supplier networks',
    regionOperation: 'Indonesia-based feed, poultry and livestock production operations with distribution across Southeast Asia and export markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email communication, procurement calls',
    responseSpeed: 'Medium'
  },
  {
    sNo: 28,
    companyName: 'Suguna Foods Private Limited',
    yearEstablished: '1984',
    headquarters: 'Coimbatore, India',
    employees: '~6,928',
    revenue: '~1,290.38',
    keyContactPerson: 'Sunil Lingashetti',
    designation: 'Manager - Procurement',
    emailAddress: 'sunillingashetti@sugunafoods.com',
    phoneNumber: '91 93410 05150',
    linkedInProfile: 'https://www.linkedin.com/company/suguna-foods',
    websiteUrl: 'https://sugunafoods.com/',
    productCategories: 'Methionine used in poultry feed formulations; Propionic Acid used for feed preservation; Butyric Acid used for intestinal health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional distributors & ingredient wholesalers \u2013 poultry feed additives sourced through local distributors and wholesalers',
    regionOperation: 'India-based poultry production and feed operations with distribution across India and export markets in the Middle East and Africa',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate contact, email, phone',
    responseSpeed: 'Medium'
  },
  {
    sNo: 29,
    companyName: 'Venkys India',
    yearEstablished: '1976',
    headquarters: 'Pune, India',
    employees: '~5,138',
    revenue: '~402.51',
    keyContactPerson: 'Piyush Thakkar',
    designation: 'Purchase Manager',
    emailAddress: 'piyush.thakkar@venkys.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/venkys-india',
    websiteUrl: 'https://venkys.com/',
    productCategories: 'Methionine used in poultry diets; Propionic Acid used to stabilize feed ingredients and prevent fungal growth',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Feed additive distributors & wholesalers \u2013 additives and premixes supplied via distributor networks serving poultry feed operations',
    regionOperation: 'India-based poultry production and animal nutrition operations with distribution across India and presence in Southeast Asian markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Procurement portal, corporate emails',
    responseSpeed: 'Medium'
  },
  {
    sNo: 30,
    companyName: 'Inghams Group Limited',
    yearEstablished: '1988',
    headquarters: 'Sydney, Australia',
    employees: '~8,200',
    revenue: '~2,079.43',
    keyContactPerson: 'Adrian Biesbroek',
    designation: 'Senior Category Manager Procurement',
    emailAddress: 'abiesbroek@inghams.com.au',
    phoneNumber: '61 411 475 131',
    linkedInProfile: 'https://www.linkedin.com/company/inghams-group',
    websiteUrl: 'https://inghams.com.au/our-company/about-us/',
    productCategories: 'Methionine used in poultry feed formulations; Propionic Acid used for feed preservation; Butyric Acid used for gut health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Ingredient wholesalers & distributor partners \u2013 feed additives sourced through wholesale ingredient suppliers and distributors',
    regionOperation: 'Australia and New Zealand poultry production operations with supply networks across domestic markets and exports to Southeast Asia',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email contact, supplier relations',
    responseSpeed: 'Medium'
  },
  {
    sNo: 31,
    companyName: 'Baiada Poultry Pty Ltd',
    yearEstablished: '1940',
    headquarters: 'Australia',
    employees: '~5,000+',
    revenue: '~2,112.64',
    keyContactPerson: 'Elaine Heming',
    designation: 'Planning / Procurement Co-Ordinator',
    emailAddress: 'elaine.heming@gmail.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/baiadapoultry',
    websiteUrl: 'https://www.baiada.com.au/',
    productCategories: 'Methionine used in poultry nutrition; Propionic Acid used as antifungal preservative in feed storage',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Ingredient wholesalers & distributors \u2013 poultry feed additives supplied via wholesale suppliers and distributor channels',
    regionOperation: 'Australia-based poultry production with nationwide distribution and export supply to Asian markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email communication, phone',
    responseSpeed: 'Medium'
  },
  {
    sNo: 32,
    companyName: 'San Miguel Foods, Inc. (SMFI)',
    yearEstablished: '1953',
    headquarters: 'Philippines',
    employees: '~5,000+',
    revenue: '~2,100.28',
    keyContactPerson: 'Julie Velasquez',
    designation: 'Senior Procurement Manager',
    emailAddress: 'julievel0728@yahoo.com',
    phoneNumber: '63 917 545 7914',
    linkedInProfile: 'https://www.linkedin.com/company/sanmiguelcorporation',
    websiteUrl: 'https://www.sanmiguelfoods.com/',
    productCategories: 'Methionine used in livestock and aquaculture feed; Propionic Acid used for feed preservation',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional distributors & wholesalers \u2013 additives and premixes sourced through distributor networks across Southeast Asia',
    regionOperation: 'Philippines-based food and livestock operations with distribution across Southeast Asia',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email, procurement portal',
    responseSpeed: 'Medium'
  },
  {
    sNo: 33,
    companyName: 'Astral Foods (Pty) Ltd',
    yearEstablished: '2001',
    headquarters: 'South Africa',
    employees: '~12,995',
    revenue: '~1,107.35',
    keyContactPerson: 'Tracey Fullard',
    designation: 'Procurement Category Manager',
    emailAddress: 'traceyloo81@gmail.com',
    phoneNumber: '27 11 991 6000',
    linkedInProfile: 'https://www.linkedin.com/company/astral-foods',
    websiteUrl: 'https://www.astralfoods.com/',
    productCategories: 'Methionine used in poultry feed formulations; Propionic Acid used for feed preservation; Butyric Acid used for gut health',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Feed additive distributors & traders \u2013 additives supplied through distributor partners and agricultural traders',
    regionOperation: 'South Africa poultry production and feed operations with distribution across Southern African markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 34,
    companyName: 'RCL FOODS',
    yearEstablished: '1960',
    headquarters: 'South Africa',
    employees: '~21,830',
    revenue: '~1,885.46',
    keyContactPerson: 'Samantha Rudolph',
    designation: 'Commodity Procurement Manager',
    emailAddress: 'samantha.rudolph@rclfoods.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/rcl-foods',
    websiteUrl: 'https://rclfoods.com/',
    productCategories: 'Methionine used in poultry and livestock feed; Propionic Acid used as feed preservative',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Distributor network & ingredient wholesalers \u2013 additives sourced through distributor partners supplying integrated feed mills',
    regionOperation: 'South Africa food and poultry operations with regional presence across Southern Africa',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email contact form',
    responseSpeed: 'Medium'
  },
  {
    sNo: 35,
    companyName: 'CBH Africa',
    yearEstablished: '1911',
    headquarters: 'South Africa',
    employees: '~4,623',
    revenue: '~3,300.39',
    keyContactPerson: 'David (Dave) van der Merwe',
    designation: 'Biosecurity & Quality Officer',
    emailAddress: 'david@mccgroup.co.za',
    phoneNumber: '27 11 447 6044',
    linkedInProfile: 'https://www.linkedin.com/company/cbh-africa',
    websiteUrl: 'https://www.cbh.africa/our-story/',
    productCategories: 'Tannin extracts including Acacia mearnsii and Chestnut Extract used in ruminant feed formulations for digestion and methane reduction',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Commodity traders & regional distributors \u2013 feed inputs sourced via commodity traders and distributor networks',
    regionOperation: 'Southern Africa agricultural trading and feed operations with export supply to global markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 36,
    companyName: 'Quantum Foods',
    yearEstablished: '2007',
    headquarters: 'South Africa',
    employees: '~2,572',
    revenue: '~386.17',
    keyContactPerson: 'Rochelle Kearns',
    designation: 'Production Manager',
    emailAddress: 'kr@orica.com',
    phoneNumber: '27 21 864 8600',
    linkedInProfile: 'https://www.linkedin.com/company/quantum-foods',
    websiteUrl: 'https://quantumfoods.co.za/',
    productCategories: 'Methionine used in poultry feed formulations; Propionic Acid used as antifungal preservative',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Regional feed distributors \u2013 additives and premixes sourced through distributor networks serving poultry feed mills',
    regionOperation: 'South Africa poultry and feed operations with presence across Southern African markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email communication, procurement portal',
    responseSpeed: 'Medium'
  },
  {
    sNo: 37,
    companyName: 'Zambeef Products PLC',
    yearEstablished: '1994',
    headquarters: 'Zambia',
    employees: '~7,082',
    revenue: '~302.63',
    keyContactPerson: 'Christabel Kalasa',
    designation: 'Procurement Officer',
    emailAddress: 'christabelk@zambeef.co.zm',
    phoneNumber: '260 211 369 000',
    linkedInProfile: 'https://www.linkedin.com/company/zambeef-products-plc',
    websiteUrl: 'https://zambeefplc.com/',
    productCategories: 'Methionine used in livestock feed formulations; Propionic Acid used for feed preservation; tannin extracts used for digestive health',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Regional distributors & wholesalers \u2013 additives supplied through distributor partners across Southern Africa',
    regionOperation: 'Zambia-based livestock and feed production with operations across Southern Africa and regional export markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 38,
    companyName: 'Premier FMCG (Pty) Ltd',
    yearEstablished: '1992',
    headquarters: 'South Africa',
    employees: '~8,400',
    revenue: '~556.48',
    keyContactPerson: 'Wian Cloete',
    designation: 'Group Procurement Manager',
    emailAddress: 'wian.cloete@premierfmcg.com',
    phoneNumber: '27 10 494 6617',
    linkedInProfile: 'https://www.linkedin.com/company/premier-fmcg',
    websiteUrl: 'https://www.premierfmcg.com/',
    productCategories: 'Propionic Acid used as feed preservative; tannin extracts used as natural antimicrobial additives in livestock feed',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Ingredient wholesalers & distributors \u2013 additives and feed inputs sourced via wholesale suppliers and distributor networks',
    regionOperation: 'South Africa food production and distribution operations with supply across Southern African markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 39,
    companyName: 'Arab Company for Livestock Development (ACOLID)',
    yearEstablished: '1980',
    headquarters: 'Saudi Arabia',
    employees: '~50',
    revenue: 'NA',
    keyContactPerson: 'Dr. Mohamed Elseady',
    designation: 'Poultry Health Manager',
    emailAddress: 'mohamedelseady84@gmail.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/acolid',
    websiteUrl: 'https://www.acolid.com/',
    productCategories: 'Methionine used in livestock feed formulations; Propionic Acid used for feed preservation',
    purchaseFrequency: 'Seasonal / Quarterly',
    salesChannelType: 'Regional distributors & ingredient traders \u2013 additives sourced through distributor networks and regional feed ingredient traders',
    regionOperation: 'Livestock and feed development operations across Middle East and North Africa',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Direct corporate email, phone contact',
    responseSpeed: 'Medium'
  },
  {
    sNo: 40,
    companyName: 'Al Watania Poultry',
    yearEstablished: '1977',
    headquarters: 'Saudi Arabia',
    employees: '~7,500',
    revenue: 'NA',
    keyContactPerson: 'Rabie Hamza',
    designation: 'Procurement Manager',
    emailAddress: 'rhamza@alwatania-egy.com',
    phoneNumber: 'NA',
    linkedInProfile: 'https://www.linkedin.com/company/alwatania-poultry',
    websiteUrl: 'https://alwatania.sa/en/get-to-know-us/',
    productCategories: 'Methionine used in poultry feed; Propionic Acid used as preservative; Butyric Acid used for gut health and feed efficiency',
    purchaseFrequency: 'Monthly / Seasonal',
    salesChannelType: 'Feed additive distributors & wholesalers \u2013 additives supplied through distributor partners supporting integrated poultry operations',
    regionOperation: 'Saudi Arabia integrated poultry production with supply across Saudi Arabia and regional Middle East markets',
    engagementWithSuppliers: 'High',
    preferredContactMethod: 'Corporate email, phone, procurement portal',
    responseSpeed: 'Medium'
  }
]

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = customerData.filter(customer => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      customer.companyName.toLowerCase().includes(term) ||
      customer.headquarters.toLowerCase().includes(term) ||
      customer.keyContactPerson.toLowerCase().includes(term) ||
      customer.productCategories.toLowerCase().includes(term) ||
      customer.regionOperation.toLowerCase().includes(term)
    )
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-black">Animal Feed Additives Customers Intelligence Database</h2>
          <p className="text-sm text-gray-600 mt-1">Verified directory and insight on Animal Feed Additives Customers across the Global</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th rowSpan={2} className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-center text-xs font-semibold text-black min-w-[50px] sticky left-0 z-10">S.No.</th>
              <th colSpan={5} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                COMPANY INFORMATION
              </th>
              <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                CONTACT DETAILS
              </th>
              <th colSpan={2} className="bg-[#90EE90] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                PRODUCT REQUIRED
              </th>
              <th colSpan={2} className="bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                CUSTOMER CAPACITY & OPERATIONS
              </th>
              <th colSpan={3} className="bg-[#DEB887] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
                CUSTOMER ENGAGEMENT LEVEL
              </th>
            </tr>
            <tr className="bg-gray-100">
              {/* Company Information */}
              <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">Company Name</th>
              <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[80px]">Year Established</th>
              <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">Headquarters</th>
              <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[120px]">
                <div>No. of Employees (est.)</div>
                <div className="font-normal text-[10px] text-gray-600">(if available)</div>
              </th>
              <th className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[120px]">
                <div>Revenue/Turnover</div>
                <div className="font-normal text-[10px] text-gray-600">(if available) US$ Mn</div>
              </th>
              {/* Contact Details */}
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[140px]">Key Contact Person</th>
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">Designation / Role</th>
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">Email Address<div className="font-normal text-[10px] text-gray-600">(verified / generic)</div></th>
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[140px]">Phone / WhatsApp Number</th>
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">LinkedIn Profile</th>
              <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">Website URL</th>
              {/* Product Required */}
              <th className="bg-[#C8E6C9] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[280px]">
                <div>Product Categories Required</div>
                <div className="font-normal text-[10px] text-gray-600">(Type of Additives)</div>
              </th>
              <th className="bg-[#C8E6C9] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
                <div>Purchase Frequency</div>
                <div className="font-normal text-[10px] text-gray-600">(Seasonal, Monthly, Quarterly)</div>
              </th>
              {/* Customer Capacity & Operations */}
              <th className="bg-[#E1BEE7] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[280px]">
                <div>Sales Channel Type</div>
                <div className="font-normal text-[10px] text-gray-600">(Distributors, Wholesaler, Trader)</div>
              </th>
              <th className="bg-[#E1BEE7] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[280px]">
                Region-specific Operation
              </th>
              {/* Customer Engagement Level */}
              <th className="bg-[#FFE0B2] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[140px]">
                <div>Engagement With Suppliers</div>
                <div className="font-normal text-[10px] text-gray-600">(Low, Medium, High)</div>
              </th>
              <th className="bg-[#FFE0B2] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
                <div>Preferred Contact Method</div>
                <div className="font-normal text-[10px] text-gray-600">(Phone, E-Mail, B2B, Others)</div>
              </th>
              <th className="bg-[#FFE0B2] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[140px]">
                <div>Response Speed</div>
                <div className="font-normal text-[10px] text-gray-600">(for procurement)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer, index) => (
              <tr key={customer.sNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center sticky left-0 bg-inherit">{customer.sNo}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black font-medium">{customer.companyName}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">{customer.yearEstablished}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.headquarters}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.employees}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.revenue}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                  <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                  <a href={customer.linkedInProfile} target="_blank" rel="noopener noreferrer" className="truncate block max-w-[150px]">
                    {customer.linkedInProfile.replace('https://www.linkedin.com/', '').replace('https://in.linkedin.com/', '')}
                  </a>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                  <a href={customer.websiteUrl} target="_blank" rel="noopener noreferrer" className="truncate block max-w-[150px]">
                    {customer.websiteUrl.replace('https://', '').replace('http://', '')}
                  </a>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.productCategories}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.purchaseFrequency}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.salesChannelType}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.regionOperation}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    customer.engagementWithSuppliers === 'High' ? 'bg-green-100 text-green-800' :
                    customer.engagementWithSuppliers.includes('Medium') ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.engagementWithSuppliers}
                  </span>
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.preferredContactMethod}</td>
                <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    customer.responseSpeed.includes('High') ? 'bg-green-100 text-green-800' :
                    customer.responseSpeed.includes('Medium') ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.responseSpeed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-gray-500 text-right">
        Showing {filteredData.length} of {customerData.length} companies
      </div>
    </div>
  )
}
