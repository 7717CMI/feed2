/**
 * Data Generation Script
 * Generates value.json, volume.json, and segmentation_analysis.json
 * for Natural Feed Additives / Tannin-based Feed Additives market
 */

const fs = require('fs');
const path = require('path');

// ============ CONFIGURATION ============

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// Geography hierarchy
const GEO_HIERARCHY = {
  "North America": ["U.S.", "Canada"],
  "Europe": ["U.K.", "Germany", "Italy", "France", "Spain", "Russia", "Rest of Europe"],
  "Asia Pacific": ["China", "India", "Japan", "South Korea", "ASEAN", "Australia", "Rest of Asia Pacific"],
  "Latin America": ["Brazil", "Argentina", "Mexico", "Rest of Latin America"],
  "Middle East & Africa": ["GCC", "South Africa", "Rest of Middle East & Africa"]
};

const REGIONS = Object.keys(GEO_HIERARCHY);

// Country share within each region (must sum to 1.0)
const COUNTRY_SHARES = {
  "North America": { "U.S.": 0.82, "Canada": 0.18 },
  "Europe": { "U.K.": 0.16, "Germany": 0.21, "Italy": 0.12, "France": 0.15, "Spain": 0.10, "Russia": 0.11, "Rest of Europe": 0.15 },
  "Asia Pacific": { "China": 0.34, "India": 0.20, "Japan": 0.16, "South Korea": 0.10, "ASEAN": 0.10, "Australia": 0.05, "Rest of Asia Pacific": 0.05 },
  "Latin America": { "Brazil": 0.44, "Argentina": 0.20, "Mexico": 0.26, "Rest of Latin America": 0.10 },
  "Middle East & Africa": { "GCC": 0.40, "South Africa": 0.30, "Rest of Middle East & Africa": 0.30 }
};

// Regional share of global market (must sum to 1.0)
const REGION_SHARES = {
  "North America": 0.28,
  "Europe": 0.27,
  "Asia Pacific": 0.27,
  "Latin America": 0.10,
  "Middle East & Africa": 0.08
};

// ============ SEGMENT DEFINITIONS ============

// Segment types with their segments and share of total market
const SEGMENT_TYPES = {
  "By Additive Type": {
    segments: {
      "Acacia mearnsii Extract": { share: 0.15, growth: 0.075 },
      "Schinopsis Extract (Quebracho)": {
        share: 0.22, growth: 0.068,
        children: {
          "Schinopsis balansae": { share: 0.55, growth: 0.072 },
          "Schinopsis lorentzii": { share: 0.45, growth: 0.063 }
        }
      },
      "Chestnut Extract": { share: 0.18, growth: 0.070 },
      "Tannic Acid": { share: 0.12, growth: 0.065 },
      "Methionine": { share: 0.10, growth: 0.082 },
      "Propionic Acid": { share: 0.10, growth: 0.060 },
      "Others (Plant-based Flavoring Agents, Butyric Acid, etc.)": { share: 0.13, growth: 0.058 }
    }
  },
  "By Livestock": {
    segments: {
      "Poultry": { share: 0.28, growth: 0.074 },
      "Swine": { share: 0.22, growth: 0.068 },
      "Ruminants (dairy, beef)": { share: 0.20, growth: 0.065 },
      "Aquaculture": { share: 0.13, growth: 0.085 },
      "Pet Animals": { share: 0.09, growth: 0.078 },
      "Others (Equine, etc.)": { share: 0.08, growth: 0.055 }
    }
  },
  "By Function": {
    segments: {
      "Growth Enhancement & Feed Efficiency": { share: 0.20, growth: 0.072 },
      "Gut Health & Microbiome Modulation": { share: 0.18, growth: 0.082 },
      "Nutritional Supplementation": { share: 0.15, growth: 0.068 },
      "Toxin Risk Management": { share: 0.13, growth: 0.070 },
      "Oxidation Control": { share: 0.13, growth: 0.064 },
      "pH Regulation & Feed Acidification": { share: 0.11, growth: 0.060 },
      "Palatability Improvement": { share: 0.10, growth: 0.075 }
    }
  },
  "By Form": {
    segments: {
      "Dry Forms": { share: 0.55, growth: 0.065 },
      "Liquid Forms": { share: 0.30, growth: 0.078 },
      "Others (Encapsulated / Coated Forms, etc.)": { share: 0.15, growth: 0.088 }
    }
  },
  "By Source": {
    segments: {
      "Natural": { share: 0.62, growth: 0.075 },
      "Synthetic": { share: 0.38, growth: 0.060 }
    }
  },
  "By Distribution Channel": {
    segments: {
      "Direct": { share: 0.56, growth: 0.068 },
      "Indirect (via. Distributors)": { share: 0.44, growth: 0.072 }
    }
  }
};

// Global market base value in 2021 (USD Million)
const GLOBAL_BASE_VALUE_2021 = 4200;
// Global market base volume in 2021 (Metric Tons)
const GLOBAL_BASE_VOLUME_2021 = 850000;

// ============ HELPER FUNCTIONS ============

// Seeded random for reproducibility
let seed = 42;
function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

// Add slight random variation (-3% to +3%)
function addVariation(value, variationPct = 0.03) {
  const variation = 1 + (seededRandom() - 0.5) * 2 * variationPct;
  return value * variation;
}

// Round to 1 decimal for value (USD M), round to integer for volume
function roundValue(val) {
  return Math.round(val * 10) / 10;
}

function roundVolume(val) {
  return Math.round(val);
}

// Generate time series for a given base value and growth rate
function generateTimeSeries(baseValue2021, annualGrowth, rounder) {
  const series = {};
  let val = baseValue2021;
  for (const year of YEARS) {
    if (year === 2021) {
      series[year] = rounder(val);
    } else {
      // Slight random variation on growth rate each year
      const yearGrowth = annualGrowth * addVariation(1, 0.15);
      val = val * (1 + yearGrowth);
      series[year] = rounder(val);
    }
  }
  return series;
}

// Generate data for all segments within a segment type for a specific geography base value
function generateSegmentData(segTypeKey, geoBaseValue, rounder) {
  const segType = SEGMENT_TYPES[segTypeKey];
  const result = {};

  for (const [segName, segConfig] of Object.entries(segType.segments)) {
    const segBase = geoBaseValue * segConfig.share;

    if (segConfig.children) {
      // Hierarchical segment - generate children first, then parent = sum of children
      const childResults = {};
      for (const [childName, childConfig] of Object.entries(segConfig.children)) {
        const childBase = segBase * childConfig.share;
        childResults[childName] = generateTimeSeries(childBase, childConfig.growth, rounder);
      }

      // Parent = sum of children
      const parentSeries = {};
      for (const year of YEARS) {
        let sum = 0;
        for (const childSeries of Object.values(childResults)) {
          sum += childSeries[year];
        }
        parentSeries[year] = rounder(sum);
      }

      result[segName] = parentSeries;
      // Add children
      for (const [childName, childSeries] of Object.entries(childResults)) {
        result[childName] = childSeries;
      }
    } else {
      result[segName] = generateTimeSeries(segBase, segConfig.growth, rounder);
    }
  }

  return result;
}

// ============ MAIN GENERATION ============

function generateAllData(globalBase, rounder) {
  const data = {};

  // Step 1: Generate country-level data first (bottom-up)
  const countryData = {};
  for (const [region, countries] of Object.entries(GEO_HIERARCHY)) {
    const regionShare = REGION_SHARES[region];
    const regionBase = globalBase * regionShare;

    for (const country of countries) {
      const countryShare = COUNTRY_SHARES[region][country];
      const countryBase = regionBase * countryShare;

      countryData[country] = {};
      for (const segTypeKey of Object.keys(SEGMENT_TYPES)) {
        // Reset seed per country-segment combination for variety but reproducibility
        seed = hashCode(`${country}-${segTypeKey}-${globalBase}`);
        countryData[country][segTypeKey] = generateSegmentData(segTypeKey, countryBase, rounder);
      }
    }
  }

  // Step 2: Compute region-level data = sum of countries
  const regionData = {};
  for (const [region, countries] of Object.entries(GEO_HIERARCHY)) {
    regionData[region] = {};

    for (const segTypeKey of Object.keys(SEGMENT_TYPES)) {
      regionData[region][segTypeKey] = {};
      const segType = SEGMENT_TYPES[segTypeKey];

      // Get all segment names (including children)
      const allSegNames = getAllSegmentNames(segType);

      for (const segName of allSegNames) {
        const sumSeries = {};
        for (const year of YEARS) {
          let sum = 0;
          for (const country of countries) {
            if (countryData[country][segTypeKey][segName]) {
              sum += countryData[country][segTypeKey][segName][year];
            }
          }
          sumSeries[year] = rounder(sum);
        }
        regionData[region][segTypeKey][segName] = sumSeries;
      }

      // Add "By Country" breakdown
      regionData[region]["By Country"] = regionData[region]["By Country"] || {};
      for (const country of countries) {
        // Use the first segment type's total as the country total
        const firstSegType = Object.keys(SEGMENT_TYPES)[0];
        const countryTotal = {};
        for (const year of YEARS) {
          let sum = 0;
          for (const [segName, segConfig] of Object.entries(SEGMENT_TYPES[firstSegType].segments)) {
            if (countryData[country][firstSegType][segName]) {
              sum += countryData[country][firstSegType][segName][year];
            }
          }
          countryTotal[year] = rounder(sum);
        }
        regionData[region]["By Country"][country] = countryTotal;
      }
    }
  }

  // Step 3: Compute Global = sum of all regions
  const globalData = {};
  for (const segTypeKey of Object.keys(SEGMENT_TYPES)) {
    globalData[segTypeKey] = {};
    const segType = SEGMENT_TYPES[segTypeKey];
    const allSegNames = getAllSegmentNames(segType);

    for (const segName of allSegNames) {
      const sumSeries = {};
      for (const year of YEARS) {
        let sum = 0;
        for (const region of REGIONS) {
          if (regionData[region][segTypeKey][segName]) {
            sum += regionData[region][segTypeKey][segName][year];
          }
        }
        sumSeries[year] = rounder(sum);
      }
      globalData[segTypeKey][segName] = sumSeries;
    }
  }

  // Add "By Region" to Global
  globalData["By Region"] = {};
  for (const region of REGIONS) {
    const firstSegType = Object.keys(SEGMENT_TYPES)[0];
    const regionTotal = {};
    for (const year of YEARS) {
      let sum = 0;
      for (const [segName, segConfig] of Object.entries(SEGMENT_TYPES[firstSegType].segments)) {
        if (regionData[region][firstSegType][segName]) {
          sum += regionData[region][firstSegType][segName][year];
        }
      }
      regionTotal[year] = rounder(sum);
    }
    globalData["By Region"][region] = regionTotal;
  }

  // Step 4: Assemble final output
  // Order: Global, then regions interleaved with their countries
  data["Global"] = globalData;

  for (const [region, countries] of Object.entries(GEO_HIERARCHY)) {
    // Region with "By Country" included
    data[region] = {};
    for (const segTypeKey of Object.keys(SEGMENT_TYPES)) {
      data[region][segTypeKey] = regionData[region][segTypeKey];
    }
    data[region]["By Country"] = regionData[region]["By Country"];

    // Countries
    for (const country of countries) {
      data[country] = countryData[country];
    }
  }

  return data;
}

function getAllSegmentNames(segType) {
  const names = [];
  for (const [segName, segConfig] of Object.entries(segType.segments)) {
    names.push(segName);
    if (segConfig.children) {
      for (const childName of Object.keys(segConfig.children)) {
        names.push(childName);
      }
    }
  }
  return names;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) + 1;
}

// ============ SEGMENTATION ANALYSIS ============

function generateSegmentationAnalysis() {
  const analysis = {
    "Global": {}
  };

  // Add segment types
  for (const [segTypeKey, segType] of Object.entries(SEGMENT_TYPES)) {
    analysis["Global"][segTypeKey] = {};
    for (const [segName, segConfig] of Object.entries(segType.segments)) {
      if (segConfig.children) {
        analysis["Global"][segTypeKey][segName] = {};
        for (const childName of Object.keys(segConfig.children)) {
          analysis["Global"][segTypeKey][segName][childName] = {};
        }
      } else {
        analysis["Global"][segTypeKey][segName] = {};
      }
    }
  }

  // Add By Region hierarchy
  analysis["Global"]["By Region"] = {};
  for (const [region, countries] of Object.entries(GEO_HIERARCHY)) {
    analysis["Global"]["By Region"][region] = {};
    for (const country of countries) {
      analysis["Global"]["By Region"][region][country] = {};
    }
  }

  return analysis;
}

// ============ EXECUTE ============

console.log("Generating value.json...");
const valueData = generateAllData(GLOBAL_BASE_VALUE_2021, roundValue);

console.log("Generating volume.json...");
seed = 42; // Reset seed
const volumeData = generateAllData(GLOBAL_BASE_VOLUME_2021, roundVolume);

console.log("Generating segmentation_analysis.json...");
const segAnalysis = generateSegmentationAnalysis();

// Write files
const outDir = path.join(__dirname, 'public', 'data');

fs.writeFileSync(
  path.join(outDir, 'value.json'),
  JSON.stringify(valueData, null, 2),
  'utf-8'
);
console.log("  Written value.json");

fs.writeFileSync(
  path.join(outDir, 'volume.json'),
  JSON.stringify(volumeData, null, 2),
  'utf-8'
);
console.log("  Written volume.json");

fs.writeFileSync(
  path.join(outDir, 'segmentation_analysis.json'),
  JSON.stringify(segAnalysis, null, 2),
  'utf-8'
);
console.log("  Written segmentation_analysis.json");

// Verification
console.log("\n=== VERIFICATION ===");
console.log("Geographies:", Object.keys(valueData).length);
console.log("Top-level keys:", Object.keys(valueData));
console.log("\nGlobal segment types:", Object.keys(valueData["Global"]));
console.log("\nNorth America segment types:", Object.keys(valueData["North America"]));
console.log("\nU.S. segment types:", Object.keys(valueData["U.S."]));

// Check Global 2021 total for first segment type
const firstSegType = Object.keys(SEGMENT_TYPES)[0];
let globalTotal2021 = 0;
for (const [segName, series] of Object.entries(valueData["Global"][firstSegType])) {
  // Only count parent-level segments (not children)
  const segConfig = SEGMENT_TYPES[firstSegType].segments[segName];
  if (segConfig) {
    globalTotal2021 += series[2021];
  }
}
console.log(`\nGlobal ${firstSegType} 2021 total: ${globalTotal2021.toFixed(1)} (expected ~${GLOBAL_BASE_VALUE_2021})`);

// Verify Global = sum of regions for a specific segment
const testSeg = Object.keys(SEGMENT_TYPES[firstSegType].segments)[0];
let regionSum2021 = 0;
for (const region of REGIONS) {
  regionSum2021 += valueData[region][firstSegType][testSeg][2021];
}
console.log(`\n"${testSeg}" 2021 - Global: ${valueData["Global"][firstSegType][testSeg][2021]}, Sum of regions: ${regionSum2021.toFixed(1)}`);

console.log("\nDone!");
