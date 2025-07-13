import { Router } from "express";
const router = Router();

// System Integration Case Studies Data
const systemIntegrationData = {
    'calicut-airport': {
        title: 'SITC of Cat-II Lighting at Calicut Airport',
        category: 'SITC/Turnkey Projects',
        badge: '₹7 Cr.',
        image: '/images/calicut-airport-case.jpg',
        challenge: [
            'Timelines Reduced to 120 Days by AAI',
            'LED lighting Installations on typical existing Installations',
            'Close Coordination with Civil Contractor for pipe laying and aligning our day-to-day program with them',
            'Working on Operational Runways and Taxiways'
        ],
        solution: [
            'Proper Planning and approval from both AAI and other stack holders',
            'Taking proper coordinates of lights with DGPS',
            'Deputation of Experienced and qualified engineers',
            'Keeping extra machines, man-power and tools to avoid any failure',
            'Modification in Existing Remote Desk',
            'Early ordering of Imported lights and picked by Air'
        ],
        results: [
            'Project Finished as per AAI requirements within 120 Days, which is a History in AAI',
            'Completion certificate issued by NSC'
        ],
        stats: [
            { label: 'Project Value', value: '₹7 Cr.' },
            { label: 'System Type', value: 'Cat-II' },
            { label: 'Completion Time', value: '120 Days' },
            { label: 'Achievement', value: 'Record Time' }
        ],
        gallery: [
            '/images/calicut-1.jpg',
            '/images/calicut-2.jpg',
            '/images/calicut-3.jpg',
            '/images/calicut-4.jpg'
        ]
    },

    'palam-airbase': {
        title: 'First ILCMS project of Defense Market - SITC of Cat-IIIB Lighting at Palam Airbase',
        category: 'SITC/Turnkey Projects',
        badge: '₹7 Cr.',
        image: '/images/palam-airbase-case.jpg',
        challenge: [
            'Multiple clients and working area was under control of IAF and AAI',
            'Secondary Cable laying on Concrete Slabs',
            'Close Coordination with Atg for single lamp monitoring system',
            'Integration of Nasu CCRs to atg ILCMS'
        ],
        solution: [
            'Proper Planning and approval from IAF',
            'Taking proper coordinates of lights with DGPS',
            'Deputation of Experienced and qualified engineers',
            'Keeping extra machines and tools to avoid any failure',
            'Training to IAF in ILCMS and installation'
        ],
        results: [
            'Project Finished as per IAF requirements on Time',
            'Completion certificate issued IAF'
        ],
        stats: [
            { label: 'Project Value', value: '₹7 Cr.' },
            { label: 'System Type', value: 'Cat-IIIB' },
            { label: 'Client', value: 'IAF & AAI' },
            { label: 'Specialty', value: 'First Defense ILCMS' }
        ],
        gallery: [
            '/images/palam-1.jpg',
            '/images/palam-2.jpg',
            '/images/palam-3.jpg',
            '/images/palam-4.jpg'
        ]
    },

    'ayodhya-airport': {
        title: 'Divine place - SITC of Cat-I Lighting at Maharishi Valmiki International Airport Ayodhya',
        category: 'SITC/Turnkey Projects',
        badge: '₹7 Cr.',
        image: '/images/ayodhya-airport-case.jpg',
        challenge: [
            'First Cat-I Airport Constructed by Up Government',
            'Regular Visit of the CM of UP and their officials, which led to Regular Scope change',
            'Timelines Reduced by Up Government by 3 months',
            'First Design Build Contract for VAS'
        ],
        solution: [
            'A dedicated Engineering and procurement team placed in HQ',
            'Materials Ordering done by priority',
            'Deputation of Experienced and qualified engineers',
            'Keeping extra machines and tools to avoid any failure'
        ],
        results: [
            'Project Finished as per Timelines given by UP Government',
            'Highlights of this project was in all news paper'
        ],
        stats: [
            { label: 'Project Value', value: '₹7 Cr.' },
            { label: 'System Type', value: 'Cat-I' },
            { label: 'Timeline Reduction', value: '3 Months' },
            { label: 'Media Coverage', value: 'National News' }
        ],
        gallery: [
            '/images/ayodhya-1.jpg',
            '/images/ayodhya-2.jpg',
            '/images/ayodhya-3.jpg',
            '/images/ayodhya-4.jpg'
        ]
    },

    'jaipur-airport': {
        title: '23 No\'s AVDGS AT JAIPUR AIRPORT',
        category: 'SITC/Turnkey Projects',
        badge: '₹8 Cr.',
        image: '/images/jaipur-airport-case.jpg',
        challenge: [
            'Installation on remote parking bays',
            'Integration with existing GOS',
            'Cable laying through HDD technology',
            'Power from existing source'
        ],
        solution: [
            'Marking of AVDGS pole coordinates with DGPS',
            'Experienced and qualified technicians identified',
            'Installation of foundation well before time',
            'Approval of structural design engineer for DGCA',
            'Software modification of GOS'
        ],
        results: [
            'Installation of AVDGS completed on time',
            'Seamless integration to existing GOS',
            'Proper Functioning of AVDGS'
        ],
        stats: [
            { label: 'Project Value', value: '₹8 Cr.' },
            { label: 'AVDGS Units', value: '23' },
            { label: 'Technology', value: 'HDD' },
            { label: 'Integration', value: 'Seamless' }
        ],
        gallery: [
            '/images/jaipur-1.jpg',
            '/images/jaipur-2.jpg',
            '/images/jaipur-3.jpg',
            '/images/jaipur-4.jpg'
        ]
    },

    'chandigarh-airport': {
        title: 'SITC of Cat-IIIB Lighting at Chandigarh Airport',
        category: 'SITC/Turnkey Projects',
        badge: '₹10 Cr.',
        image: '/images/chandigarh-airport-case.jpg',
        challenge: [
            'Multiple clients and working area was under control of IAF and AAI',
            'Secondary Cable laying on Concrete Slabs',
            'Close Coordination with Civil Contractor for Identification of Pipe',
            'Conversion of All Halogen Lights to LED'
        ],
        solution: [
            'Proper Planning and approval from both AAI and IAF',
            'Taking proper coordinates of lights with DGPS',
            'Deputation of Experienced and qualified engineers',
            'Keeping extra machines and tools to avoid any failure'
        ],
        results: [
            'Project Finished as per IAF & AAI requirements on Time',
            'Completion certificate issued AAI'
        ],
        stats: [
            { label: 'Project Value', value: '₹10 Cr.' },
            { label: 'System Type', value: 'Cat-IIIB' },
            { label: 'Client', value: 'IAF & AAI' },
            { label: 'Conversion', value: 'Halogen to LED' }
        ],
        gallery: [
            '/images/chandigarh-1.jpg',
            '/images/chandigarh-2.jpg',
            '/images/chandigarh-3.jpg',
            '/images/chandigarh-4.jpg'
        ]
    },

    'bial-airport': {
        title: 'SITC of AGL System at BIAL Airport',
        category: 'SITC/Turnkey Projects',
        badge: '₹15 Cr.',
        image: '/images/bial-airport-case.jpg',
        challenge: [
            'Execution of work during the covid lockdown and pandemic situation',
            'IR Value was too low due to heavy raining in most days',
            'Ground level gap of 10mm for PAPI installation',
            'Survey point delay for coring and shallow base installation',
            'Duct placed 700+mm depth in PQC area',
            'Duct block for cable pulling'
        ],
        solution: [
            'Planned approach and material arranged on time',
            'Implemented Covid precautions to work during pandemic situation',
            'Deputed experienced team to complete the cable pulling work on time',
            '8 legs cored for placing the 4 PAPI at desired levels'
        ],
        results: [
            'Hand overed Runway on March 25 as per schedule',
            'Hand overed Taxiway on July 09 as per schedule',
            'Completed the project with zero incident and accident following every safety procedures'
        ],
        stats: [
            { label: 'Project Value', value: '₹15 Cr.' },
            { label: 'System Type', value: 'AGL' },
            { label: 'Safety Record', value: '0 Incidents' },
            { label: 'Completion', value: 'On Schedule' }
        ],
        gallery: [
            '/images/bial-1.jpg',
            '/images/bial-2.jpg',
            '/images/bial-3.jpg',
            '/images/bial-4.jpg'
        ]
    },

    'prayagraj-airport': {
        title: 'AVDGS AT PRAYAGRAJ AIRPORT',
        category: 'SITC/Turnkey Projects',
        badge: '₹5 Cr.',
        image: '/images/prayagraj-airport-case.jpg',
        challenge: [
            'Stringent timeline of 3 months for inauguration by PM before Kumbh mela for greenfield airport',
            'Approval of DGCA as per CAR',
            'Coordination with PBB manufacturer',
            'Installation of Operator panel in PBB on site'
        ],
        solution: [
            'Marking of AVDGS pole coordinates with DGPS',
            'Experienced and qualified technicians identified',
            'Installation of foundation well before time',
            'Approval of structural design engineer for DGCA',
            'Installation of cable on same route of PBB cable'
        ],
        results: [
            'Project completed within 3 months',
            'AVDGS installed in 2 days',
            'Performance certificate issued by Tata Projects'
        ],
        stats: [
            { label: 'Project Value', value: '₹5 Cr.' },
            { label: 'Timeline', value: '3 Months' },
            { label: 'Installation', value: '2 Days' },
            { label: 'Event', value: 'Kumbh Mela' }
        ],
        gallery: [
            '/images/prayagraj-1.jpg',
            '/images/prayagraj-2.jpg',
            '/images/prayagraj-3.jpg',
            '/images/prayagraj-4.jpg'
        ]
    },
};

// SITC Turnkey Projects Case Studies Data
const sitcTurnkeyData = {
    'hasimara-airbase': {
        title: 'Refurbishment of MAFI AIRBASE-Hasimara',
        category: 'System Integration',
        badge: '₹3 Cr.',
        image: '/images/hasimara-airbase-case.jpg',
        challenge: [
            'System Installed at airbase is a proprietary system',
            'Integration of airfield lighting to Existing Tata Make CMS',
            'Close Coordination with Civil Contractor for Finalizing the Location of lights',
            'Installation of Lights on remote locations'
        ],
        solution: [
            'Taking proper coordinates of lights with DGPS',
            'Deputation of Experienced and qualified software engineers',
            'Fortnightly meetings with Civil for close coordination\'s',
            'Keeping extra machines and tools to avoid any failure'
        ],
        results: [
            'Integration done successful',
            'Project Finished as per IAF requirements',
            'Performance certificate issued GE Projects'
        ],
        stats: [
            { label: 'Project Value', value: '₹3 Cr.' },
            { label: 'System Type', value: 'Proprietary' },
            { label: 'Integration', value: 'Tata CMS' },
            { label: 'Client', value: 'IAF' }
        ],
        gallery: [
            '/images/hasimara-1.jpg',
            '/images/hasimara-2.jpg',
            '/images/hasimara-3.jpg',
            '/images/hasimara-4.jpg'
        ]
    },

    'amritsar-airport': {
        title: 'CAT IIIB AGL MAINTENANCE AMRITSAR AIRPORT',
        category: 'System Integration',
        badge: '₹1.65 Cr.',
        image: '/images/amritsar-airport-case.jpg',
        challenge: [
            'Integration of 6 different types of CCRs in ALCMS',
            'Shifting the CCRs in operational airport',
            'Legacy hardwares',
            'Changing IT hardware during live operations'
        ],
        solution: [
            'Serial and parallel comms integration of CCRs',
            'Experienced and qualified technicians identified',
            'Adopted written lock in and lock out procedures',
            'NOTAM taken for performing work on the system'
        ],
        results: [
            'Integration project completed in 2 months',
            'CCRs shifted in record time of 2 days',
            'IT hardware of ALCMS changed in 1 day'
        ],
        stats: [
            { label: 'Project Value', value: '₹1.65 Cr.' },
            { label: 'CCR Types', value: '6' },
            { label: 'Integration Time', value: '2 Months' },
            { label: 'Hardware Change', value: '1 Day' }
        ],
        gallery: [
            '/images/amritsar-1.jpg',
            '/images/amritsar-2.jpg',
            '/images/amritsar-3.jpg',
            '/images/amritsar-4.jpg'
        ]
    },
};

// O&M (Operations & Maintenance) Case Studies Data
const onmData = {
    'guwahati-airport': {
        title: 'AGL Maintenance at Guwahati International AIRPORT (ADANI)',
        category: 'O&M',
        badge: '₹4 Cr.',
        image: '/images/guwahati-airport-case.jpg',
        challenge: [
            'Taking over the site with in 5 days, from AAI contractor',
            'BCAS clearance',
            'No proper process was in Place',
            'SITC of CMMS',
            'Hiring of 32 Resources on very short notice'
        ],
        solution: [
            'Experienced and qualified Engineers & technicians identified during bidding time',
            'Day and night working on all desired documentation',
            'Arrangement of all tools and Vehicles'
        ],
        results: [
            'Successful taking over on 1st Aug 2022 (between 31st July and 31st Aug 2022)',
            'Successful implementation of CMMS',
            'Appreciation from Adani Team and DGCA during DGCA visit'
        ],
        stats: [
            { label: 'Project Value', value: '₹4 Cr.' },
            { label: 'Takeover Time', value: '5 Days' },
            { label: 'Resources Hired', value: '32' },
            { label: 'CMMS Implementation', value: 'Successful' }
        ],
        gallery: [
            '/images/guwahati-1.jpg',
            '/images/guwahati-2.jpg',
            '/images/guwahati-3.jpg',
            '/images/guwahati-4.jpg'
        ]
    }
};

// Lifecycle Services Case Studies Data
const lifecycleData = {
    
};

// Repair & Upgrade Services Case Studies Data
const repairUpgradeData = {
    
};

const itemAndSpares = {
    
};

// Routes
router.get("/", (req, res) => {
    res.render("solutions/index.ejs");
});

router.get("/system-integration", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: systemIntegrationData,
        pageTitle: "System Integration",
        pageDescription: "Delivering seamless integration of multi-vendor systems for airfields, defense, and railway infrastructure. Ensuring interoperability, centralized control, and reliability."
    });
});

router.get("/sitc-turnkey-projects", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: sitcTurnkeyData,
        pageTitle: "SITC Turnkey Projects",
        pageDescription: "Complete turnkey solutions from design to commissioning. Delivering end-to-end project management with guaranteed performance and quality standards."
    });
});

router.get("/onm", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: onmData,
        pageTitle: "Operations & Maintenance",
        pageDescription: "Comprehensive operations and maintenance services ensuring optimal performance, maximum uptime, and cost-effective lifecycle management of critical infrastructure."
    });
});

router.get("/lifecycle-services", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: lifecycleData,
        pageTitle: "Lifecycle Services",
        pageDescription: "Complete asset lifecycle management from initial design through modernization to end-of-life. Maximizing value and performance throughout the entire asset journey."
    });
});

router.get("/repair-upgrade-services", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: repairUpgradeData,
        pageTitle: "Repair & Upgrade Services",
        pageDescription: "Specialized repair and upgrade services for aging infrastructure. Modernizing systems with latest technology while maintaining operational continuity."
    });
});

router.get("/3rd-party", (req, res) => {
    res.render("solutions/solution.ejs", { 
        caseStudiesData: itemAndSpares,
        pageTitle: "3rd Party Items & Spares",
        pageDescription: "Procurement and supply of genuine 3rd party components, spare parts, and accessories from trusted global OEMs. Full support for legacy and modern systems alike."
    });
});

export default router;