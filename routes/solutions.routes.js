import { Router } from "express";
const router = Router();

// System Integration Case Studies Data
const systemIntegrationData = {
    'kolkata-airport': {
        title: 'SITC of Cat-IIIB Lighting at Kolkata Airport',
        category: 'Airport Infrastructure',
        badge: '₹12 Cr.',
        image: '/images/kolkata-airport-case.jpg',
        challenge: [
            'Single Lamp Monitoring Control System belongs to Honeywell',
            'Integration of Field installations i.e. matching parameters required for Honeywell ILCMS',
            'Close Coordination with Civil Contractor for Identification of Pipe',
            'Working on Operational Runways and Taxiways'
        ],
        solution: [
            'Proper Planning and approval from both AAI and other stack holders',
            'Taking proper coordinates of lights with DGPS',
            'Deputation of Experienced and qualified engineers',
            'Keeping extra machines and tools to avoid any failure'
        ],
        results: [
            'Project Finished as per AAI requirements on Time',
            'Completion certificate issued by Vishal Infra',
            'Zero safety incidents during installation',
            'Successful integration with existing Honeywell systems'
        ],
        stats: [
            { label: 'Project Value', value: '₹12 Cr.' },
            { label: 'System Type', value: 'Cat-IIIB' },
            { label: 'Completion Time', value: '8 Months' },
            { label: 'Safety Record', value: '0 Incidents' }
        ],
        gallery: [
            '/images/kolkata-1.jpg',
            '/images/kolkata-2.jpg',
            '/images/kolkata-3.jpg',
            '/images/kolkata-4.jpg'
        ]
    },
    'defense-integration': {
        title: 'Multi-Vendor Defense System Integration',
        category: 'Defense Systems',
        badge: '₹8.5 Cr.',
        image: '/images/defense-case.jpg',
        challenge: [
            'Integration of multiple vendor systems with different protocols',
            'Ensuring secure communication between all systems',
            'Meeting stringent defense security standards',
            'Coordinating with multiple stakeholders and vendors'
        ],
        solution: [
            'Developed custom middleware for protocol translation',
            'Implemented end-to-end encryption for all communications',
            'Created unified command and control interface',
            'Established rigorous testing and validation procedures'
        ],
        results: [
            'Successful integration of 12 different vendor systems',
            'Achieved 99.9% system uptime',
            'Reduced operational response time by 40%',
            'Received commendation from defense authorities'
        ],
        stats: [
            { label: 'Project Value', value: '₹8.5 Cr.' },
            { label: 'Systems Integrated', value: '12' },
            { label: 'Uptime Achieved', value: '99.9%' },
            { label: 'Response Time Reduction', value: '40%' }
        ],
        gallery: [
            '/images/defense-1.jpg',
            '/images/defense-2.jpg',
            '/images/defense-3.jpg',
            '/images/defense-4.jpg'
        ]
    },
    'railway-infrastructure': {
        title: 'Railway Signaling & Control Systems',
        category: 'Railway Systems',
        badge: '₹15 Cr.',
        image: '/images/railway-case.jpg',
        challenge: [
            'Upgrading legacy signaling systems without service disruption',
            'Ensuring compliance with latest safety standards',
            'Coordinating with railway operations for minimal downtime',
            'Managing complex cabling and infrastructure modifications'
        ],
        solution: [
            'Phased implementation approach to minimize disruption',
            'Advanced testing protocols before system activation',
            'Redundant safety systems for fail-safe operation',
            'Comprehensive training program for operational staff'
        ],
        results: [
            'Successful upgrade of 50 KM railway corridor',
            'Achieved 100% safety compliance',
            'Reduced signal failure incidents by 85%',
            'Improved train scheduling efficiency by 30%'
        ],
        stats: [
            { label: 'Project Value', value: '₹15 Cr.' },
            { label: 'Coverage Area', value: '50 KM' },
            { label: 'Safety Compliance', value: '100%' },
            { label: 'Efficiency Improvement', value: '30%' }
        ],
        gallery: [
            '/images/railway-1.jpg',
            '/images/railway-2.jpg',
            '/images/railway-3.jpg',
            '/images/railway-4.jpg'
        ]
    }
};

// SITC Turnkey Projects Case Studies Data
const sitcTurnkeyData = {
    'mumbai-metro': {
        title: 'Mumbai Metro Line 3 - SITC Project',
        category: 'Metro Infrastructure',
        badge: '₹25 Cr.',
        image: '/images/mumbai-metro-case.jpg',
        challenge: [
            'Underground metro construction in densely populated area',
            'Integration with existing transportation networks',
            'Ensuring minimal disruption to city traffic',
            'Complex geological conditions and water table issues'
        ],
        solution: [
            'Advanced tunneling boring machines for underground construction',
            'Real-time monitoring systems for structural integrity',
            'Coordinated phased construction with traffic management',
            'Specialized waterproofing and drainage solutions'
        ],
        results: [
            'Successful completion of 33.5 KM underground corridor',
            'Zero major accidents during construction',
            'Delivered project 2 months ahead of schedule',
            'Reduced travel time by 60% for commuters'
        ],
        stats: [
            { label: 'Project Value', value: '₹25 Cr.' },
            { label: 'Track Length', value: '33.5 KM' },
            { label: 'Stations Built', value: '27' },
            { label: 'Daily Capacity', value: '1.7M Passengers' }
        ],
        gallery: [
            '/images/mumbai-metro-1.jpg',
            '/images/mumbai-metro-2.jpg',
            '/images/mumbai-metro-3.jpg',
            '/images/mumbai-metro-4.jpg'
        ]
    },
    'bangalore-airport': {
        title: 'Bangalore Airport Terminal 2 - Complete SITC',
        category: 'Airport Infrastructure',
        badge: '₹18 Cr.',
        image: '/images/bangalore-airport-case.jpg',
        challenge: [
            'Constructing new terminal while maintaining airport operations',
            'Integration with existing Terminal 1 systems',
            'Meeting international aviation safety standards',
            'Managing complex MEP systems and baggage handling'
        ],
        solution: [
            'Modular construction approach for minimal operational impact',
            'Advanced BMS and SCADA systems for centralized control',
            'Redundant power and communication systems',
            'Automated baggage handling and security systems'
        ],
        results: [
            'Increased airport capacity by 25 million passengers annually',
            'Achieved LEED Gold certification for sustainability',
            'Reduced passenger processing time by 35%',
            'Successfully commissioned all systems on schedule'
        ],
        stats: [
            { label: 'Project Value', value: '₹18 Cr.' },
            { label: 'Terminal Area', value: '2.5 Lakh sqft' },
            { label: 'Annual Capacity', value: '25M Passengers' },
            { label: 'Processing Time Reduction', value: '35%' }
        ],
        gallery: [
            '/images/bangalore-airport-1.jpg',
            '/images/bangalore-airport-2.jpg',
            '/images/bangalore-airport-3.jpg',
            '/images/bangalore-airport-4.jpg'
        ]
    },
    'delhi-smart-city': {
        title: 'Delhi Smart City Infrastructure - Phase 1',
        category: 'Smart City',
        badge: '₹22 Cr.',
        image: '/images/delhi-smart-city-case.jpg',
        challenge: [
            'Retrofitting existing city infrastructure with smart technologies',
            'Ensuring interoperability between different smart systems',
            'Managing data privacy and cybersecurity concerns',
            'Coordinating with multiple government agencies'
        ],
        solution: [
            'IoT-based sensor networks for real-time monitoring',
            'Centralized command and control center',
            'Blockchain-based data security and privacy protection',
            'Comprehensive stakeholder engagement and training programs'
        ],
        results: [
            'Deployed 10,000+ IoT sensors across the city',
            'Reduced emergency response time by 45%',
            'Achieved 30% energy savings through smart grid',
            'Improved citizen satisfaction score by 25%'
        ],
        stats: [
            { label: 'Project Value', value: '₹22 Cr.' },
            { label: 'IoT Sensors', value: '10,000+' },
            { label: 'Energy Savings', value: '30%' },
            { label: 'Response Time Reduction', value: '45%' }
        ],
        gallery: [
            '/images/delhi-smart-1.jpg',
            '/images/delhi-smart-2.jpg',
            '/images/delhi-smart-3.jpg',
            '/images/delhi-smart-4.jpg'
        ]
    }
};

// O&M (Operations & Maintenance) Case Studies Data
const onmData = {
    'chennai-port': {
        title: 'Chennai Port - Comprehensive O&M Services',
        category: 'Port Operations',
        badge: '₹35 Cr.',
        image: '/images/chennai-port-case.jpg',
        challenge: [
            'Maintaining 24/7 operations with zero downtime tolerance',
            'Managing complex cargo handling systems',
            'Ensuring compliance with international port standards',
            'Coordinating maintenance across multiple operational areas'
        ],
        solution: [
            'Implemented predictive maintenance using AI analytics',
            'Established 24/7 monitoring and rapid response teams',
            'Developed comprehensive maintenance schedules',
            'Created digital twin for port operations optimization'
        ],
        results: [
            'Achieved 99.8% system uptime over 3 years',
            'Reduced maintenance costs by 25%',
            'Improved cargo throughput by 20%',
            'Zero major equipment failures in 18 months'
        ],
        stats: [
            { label: 'Contract Value', value: '₹35 Cr.' },
            { label: 'System Uptime', value: '99.8%' },
            { label: 'Cost Reduction', value: '25%' },
            { label: 'Contract Duration', value: '5 Years' }
        ],
        gallery: [
            '/images/chennai-port-1.jpg',
            '/images/chennai-port-2.jpg',
            '/images/chennai-port-3.jpg',
            '/images/chennai-port-4.jpg'
        ]
    },
    'hyderabad-metro': {
        title: 'Hyderabad Metro - Rolling Stock Maintenance',
        category: 'Metro Operations',
        badge: '₹28 Cr.',
        image: '/images/hyderabad-metro-case.jpg',
        challenge: [
            'Maintaining metro fleet availability above 95%',
            'Managing complex electrical and mechanical systems',
            'Ensuring passenger safety and comfort standards',
            'Optimizing maintenance schedules with operational demands'
        ],
        solution: [
            'Condition-based maintenance using IoT sensors',
            'Automated fault detection and diagnostic systems',
            'Skilled technician training and certification programs',
            'Integrated maintenance management system'
        ],
        results: [
            'Maintained 97.5% fleet availability consistently',
            'Reduced unscheduled maintenance by 40%',
            'Improved passenger satisfaction to 94%',
            'Extended rolling stock lifespan by 15%'
        ],
        stats: [
            { label: 'Contract Value', value: '₹28 Cr.' },
            { label: 'Fleet Availability', value: '97.5%' },
            { label: 'Maintenance Reduction', value: '40%' },
            { label: 'Passenger Satisfaction', value: '94%' }
        ],
        gallery: [
            '/images/hyderabad-metro-1.jpg',
            '/images/hyderabad-metro-2.jpg',
            '/images/hyderabad-metro-3.jpg',
            '/images/hyderabad-metro-4.jpg'
        ]
    }
};

// Lifecycle Services Case Studies Data
const lifecycleData = {
    'pune-airport': {
        title: 'Pune Airport - Complete Lifecycle Management',
        category: 'Airport Lifecycle',
        badge: '₹42 Cr.',
        image: '/images/pune-airport-case.jpg',
        challenge: [
            'Managing entire lifecycle from design to decommissioning',
            'Ensuring continuous system upgrades and modernization',
            'Maintaining operational efficiency throughout asset life',
            'Balancing CAPEX and OPEX optimization'
        ],
        solution: [
            'Comprehensive lifecycle planning and roadmap development',
            'Phased modernization approach with minimal disruption',
            'Asset performance monitoring and optimization',
            'Sustainable practices and circular economy principles'
        ],
        results: [
            'Extended asset life by 20 years through strategic upgrades',
            'Achieved 35% reduction in total cost of ownership',
            'Maintained 99.5% system availability during transitions',
            'Improved energy efficiency by 40% over lifecycle'
        ],
        stats: [
            { label: 'Project Value', value: '₹42 Cr.' },
            { label: 'Asset Life Extension', value: '20 Years' },
            { label: 'TCO Reduction', value: '35%' },
            { label: 'Energy Efficiency', value: '40%' }
        ],
        gallery: [
            '/images/pune-airport-1.jpg',
            '/images/pune-airport-2.jpg',
            '/images/pune-airport-3.jpg',
            '/images/pune-airport-4.jpg'
        ]
    },
    'gurgaon-metro': {
        title: 'Gurgaon Metro - Technology Lifecycle Services',
        category: 'Metro Lifecycle',
        badge: '₹30 Cr.',
        image: '/images/gurgaon-metro-case.jpg',
        challenge: [
            'Managing technology obsolescence in critical systems',
            'Ensuring seamless transitions during system upgrades',
            'Maintaining service quality during modernization',
            'Integrating new technologies with legacy systems'
        ],
        solution: [
            'Technology roadmap aligned with operational requirements',
            'Phased migration strategy with parallel system operation',
            'Comprehensive testing and validation protocols',
            'Change management and staff training programs'
        ],
        results: [
            'Successfully migrated 85% of legacy systems',
            'Achieved zero service disruptions during upgrades',
            'Improved system performance by 50%',
            'Reduced maintenance requirements by 30%'
        ],
        stats: [
            { label: 'Project Value', value: '₹30 Cr.' },
            { label: 'System Migration', value: '85%' },
            { label: 'Performance Improvement', value: '50%' },
            { label: 'Maintenance Reduction', value: '30%' }
        ],
        gallery: [
            '/images/gurgaon-metro-1.jpg',
            '/images/gurgaon-metro-2.jpg',
            '/images/gurgaon-metro-3.jpg',
            '/images/gurgaon-metro-4.jpg'
        ]
    }
};

// Repair & Upgrade Services Case Studies Data
const repairUpgradeData = {
    'kochi-airport': {
        title: 'Kochi Airport - Runway Lighting System Upgrade',
        category: 'Airport Upgrades',
        badge: '₹16 Cr.',
        image: '/images/kochi-airport-case.jpg',
        challenge: [
            'Upgrading aging runway lighting systems without flight disruptions',
            'Ensuring compliance with latest ICAO standards',
            'Managing complex electrical infrastructure modifications',
            'Coordinating with air traffic control and airline operations'
        ],
        solution: [
            'Night-time installation windows during low traffic periods',
            'Advanced LED technology with remote monitoring capabilities',
            'Redundant power systems for enhanced reliability',
            'Comprehensive testing protocols and certification'
        ],
        results: [
            'Successful upgrade of 3 runway lighting systems',
            'Achieved 60% energy savings with LED technology',
            'Improved visibility and safety for night operations',
            'Zero flight delays during installation period'
        ],
        stats: [
            { label: 'Project Value', value: '₹16 Cr.' },
            { label: 'Runways Upgraded', value: '3' },
            { label: 'Energy Savings', value: '60%' },
            { label: 'Flight Delays', value: '0' }
        ],
        gallery: [
            '/images/kochi-airport-1.jpg',
            '/images/kochi-airport-2.jpg',
            '/images/kochi-airport-3.jpg',
            '/images/kochi-airport-4.jpg'
        ]
    },
    'noida-metro': {
        title: 'Noida Metro - Signaling System Modernization',
        category: 'Metro Upgrades',
        badge: '₹12 Cr.',
        image: '/images/noida-metro-case.jpg',
        challenge: [
            'Modernizing 15-year-old signaling systems',
            'Ensuring backward compatibility with existing infrastructure',
            'Minimizing service disruptions during upgrades',
            'Integrating new safety features and protocols'
        ],
        solution: [
            'Parallel system installation with gradual migration',
            'Advanced CBTC (Communication Based Train Control) technology',
            'Comprehensive staff training and certification programs',
            'Rigorous testing and validation procedures'
        ],
        results: [
            'Upgraded signaling systems across 29 stations',
            'Increased train frequency by 25%',
            'Reduced headway time from 120 to 90 seconds',
            'Improved passenger capacity by 30%'
        ],
        stats: [
            { label: 'Project Value', value: '₹12 Cr.' },
            { label: 'Stations Upgraded', value: '29' },
            { label: 'Frequency Increase', value: '25%' },
            { label: 'Capacity Improvement', value: '30%' }
        ],
        gallery: [
            '/images/noida-metro-1.jpg',
            '/images/noida-metro-2.jpg',
            '/images/noida-metro-3.jpg',
            '/images/noida-metro-4.jpg'
        ]
    }
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

export default router;