/**
 * Convert Excel data to value.json, volume.json, and segmentation_analysis.json
 * Reads "Dashboard-Global Animal Feed Additives Market.xlsx"
 *
 * RULES:
 * 1. Don't double count
 * 2. Ignore "By Region" and "By Country" segments (they are geography, not segments)
 * 3. Handle hierarchical sub-segments (Schinopsis Extracts -> balansae/lorentzii)
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile('Dashboard-Global Animal Feed Additives Market.xlsx');
const ws = wb.Sheets['Master Sheet'];
const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

// ============ CONSTANTS ============
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
const VALUE_START = 6;
const VALUE_END = 965;
const VOLUME_START = 968;
const VOLUME_END = rawData.length - 1;

// Segment types to INCLUDE (exclude By Region and By Country)
const VALID_SEGMENT_TYPES = [
  'By Additive Type',
  'By Livestock',
  'By Function',
  'By Form',
  'By Source',
  'By Distribution Channel'
];

// Geography hierarchy definition (matching Excel structure)
const GEO_HIERARCHY = {
  "North America": ["U.S.", "Canada"],
  "Europe": ["U.K.", "Germany", "Italy", "France", "Spain", "Russia", "Rest of Europe"],
  "Asia Pacific": ["China", "India", "Japan", "South Korea", "ASEAN", "Australia", "Rest of Asia Pacific"],
  "Latin America": ["Brazil", "Argentina", "Mexico", "Rest of Latin America"],
  "Middle East": ["GCC Countries", "Israel", "Rest of Middle East"],
  "Africa": ["North Africa", "South Africa", "Central Africa"]
};

const REGIONS = Object.keys(GEO_HIERARCHY);
const ALL_COUNTRIES = Object.values(GEO_HIERARCHY).flat();

// Hierarchical segments: parent -> [children]
// The parent total = sum of children (we compute this, not from Excel to avoid double counting)
const HIERARCHICAL_SEGMENTS = {
  "Schinopsis Extracts (Quebracho)": ["Schinopsis balansae", "Schinopsis lorentzii"]
};

// ============ FUNCTIONS ============

function parseSection(startRow, endRow) {
  const result = {};

  for (let i = startRow; i <= endRow; i++) {
    const row = rawData[i];
    if (!row || row.length < 5) continue;

    const geography = row[0];
    const segmentType = row[1];
    const subSegment = row[2];   // Parent segment name
    const subSegment1 = row[3];  // Child segment name (same as parent if no hierarchy)

    // Skip header rows, empty rows, and non-data rows
    if (!geography || geography === 'Region' || !segmentType || segmentType === 'Segment') continue;

    // Skip "By Region" and "By Country" per user instruction
    if (segmentType === 'By Region' || segmentType === 'By Country') continue;

    // Skip if not a valid segment type
    if (!VALID_SEGMENT_TYPES.includes(segmentType)) continue;

    // Initialize geography
    if (!result[geography]) result[geography] = {};
    if (!result[geography][segmentType]) result[geography][segmentType] = {};

    // Extract year data
    const yearData = {};
    YEARS.forEach((year, idx) => {
      const val = row[4 + idx];
      yearData[year] = val !== null && val !== undefined ? Math.round(val * 10) / 10 : 0;
    });

    // Handle hierarchical segments
    if (subSegment !== subSegment1 && HIERARCHICAL_SEGMENTS[subSegment]) {
      // This is a child of a hierarchical parent
      // Add child data
      result[geography][segmentType][subSegment1] = yearData;

      // Compute parent as sum of children (avoid double counting)
      if (!result[geography][segmentType][subSegment]) {
        result[geography][segmentType][subSegment] = {};
        YEARS.forEach(year => {
          result[geography][segmentType][subSegment][year] = 0;
        });
      }
      // Add this child's values to parent sum
      YEARS.forEach(year => {
        result[geography][segmentType][subSegment][year] =
          Math.round((result[geography][segmentType][subSegment][year] + yearData[year]) * 10) / 10;
      });
    } else {
      // Regular segment (no hierarchy, or parent == child)
      result[geography][segmentType][subSegment1] = yearData;
    }
  }

  return result;
}

// Read "By Country" and "By Region" data DIRECTLY from Excel (no computation)
function addGeoSectionsFromExcel(data, startRow, endRow) {
  // Read By Country rows for each region, and By Region rows for Global
  for (let i = startRow; i <= endRow; i++) {
    const row = rawData[i];
    if (!row || row.length < 5) continue;

    const geography = row[0];
    const segmentType = row[1];
    const subSegment = row[2];
    const subSegment1 = row[3];

    if (!geography || geography === 'Region' || !segmentType || segmentType === 'Segment') continue;

    // Extract year data directly from Excel
    const yearData = {};
    YEARS.forEach((year, idx) => {
      const val = row[4 + idx];
      yearData[year] = val !== null && val !== undefined ? Math.round(val * 10) / 10 : 0;
    });

    if (segmentType === 'By Region' && geography === 'Global') {
      // Global > By Region > region name (data from Excel)
      if (!data["Global"]) data["Global"] = {};
      if (!data["Global"]["By Region"]) data["Global"]["By Region"] = {};
      data["Global"]["By Region"][subSegment1] = yearData;
    }

    if (segmentType === 'By Country' && REGIONS.includes(geography)) {
      // Region > By Country > country name (data from Excel)
      if (!data[geography]) data[geography] = {};
      if (!data[geography]["By Country"]) data[geography]["By Country"] = {};
      data[geography]["By Country"][subSegment1] = yearData;
    }
  }
}

// Generate segmentation_analysis.json
function generateSegmentationAnalysis() {
  const analysis = {
    "Global": {}
  };

  // Add segment types from the first geography that has data
  for (const segType of VALID_SEGMENT_TYPES) {
    analysis["Global"][segType] = {};

    // Get segments from Global data in value section
    for (let i = VALUE_START; i <= VALUE_END; i++) {
      const row = rawData[i];
      if (!row || row.length < 5) continue;
      if (row[0] !== 'Global' || row[1] !== segType) continue;

      const subSegment = row[2];
      const subSegment1 = row[3];

      if (subSegment !== subSegment1 && HIERARCHICAL_SEGMENTS[subSegment]) {
        // Hierarchical: parent -> children
        if (!analysis["Global"][segType][subSegment]) {
          analysis["Global"][segType][subSegment] = {};
        }
        analysis["Global"][segType][subSegment][subSegment1] = {};
      } else {
        // Flat segment
        if (!analysis["Global"][segType][subSegment1]) {
          analysis["Global"][segType][subSegment1] = {};
        }
      }
    }
  }

  // Add "By Region" hierarchy for geography extraction
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

console.log("Parsing Value section (rows " + VALUE_START + " to " + VALUE_END + ")...");
const valueData = parseSection(VALUE_START, VALUE_END);
console.log("Adding By Region/By Country from Excel for value...");
addGeoSectionsFromExcel(valueData, VALUE_START, VALUE_END);

console.log("Parsing Volume section (rows " + VOLUME_START + " to " + VOLUME_END + ")...");
const volumeData = parseSection(VOLUME_START, VOLUME_END);
console.log("Adding By Region/By Country from Excel for volume...");
addGeoSectionsFromExcel(volumeData, VOLUME_START, VOLUME_END);

console.log("Generating segmentation_analysis.json...");
const segAnalysis = generateSegmentationAnalysis();

// Write files
const outDir = path.join(__dirname, 'public', 'data');

fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2), 'utf-8');
console.log("  Written value.json");

fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2), 'utf-8');
console.log("  Written volume.json");

fs.writeFileSync(path.join(outDir, 'segmentation_analysis.json'), JSON.stringify(segAnalysis, null, 2), 'utf-8');
console.log("  Written segmentation_analysis.json");

// ============ VERIFICATION ============
console.log("\n=== VERIFICATION ===");
console.log("Value geographies:", Object.keys(valueData).length, Object.keys(valueData));
console.log("\nGlobal segment types:", Object.keys(valueData["Global"]));
console.log("\nNorth America segment types:", Object.keys(valueData["North America"] || {}));
console.log("\nMiddle East segment types:", Object.keys(valueData["Middle East"] || {}));
console.log("\nAfrica segment types:", Object.keys(valueData["Africa"] || {}));

// Verify no double counting for hierarchical segments
const globalAddType = valueData["Global"]["By Additive Type"];
const quebracho = globalAddType["Schinopsis Extracts (Quebracho)"];
const balansae = globalAddType["Schinopsis balansae"];
const lorentzii = globalAddType["Schinopsis lorentzii"];
console.log("\n--- Hierarchical segment check (2021) ---");
console.log("Quebracho parent:", quebracho[2021]);
console.log("balansae:", balansae[2021]);
console.log("lorentzii:", lorentzii[2021]);
console.log("Sum of children:", Math.round((balansae[2021] + lorentzii[2021]) * 10) / 10);
console.log("Match:", Math.abs(quebracho[2021] - (balansae[2021] + lorentzii[2021])) < 0.2);

// Verify Global total = sum of regions for a segment
const testSeg = "Acacia mearnsii Extract";
const globalVal2021 = globalAddType[testSeg][2021];
let regionSum = 0;
for (const region of REGIONS) {
  if (valueData[region] && valueData[region]["By Additive Type"] && valueData[region]["By Additive Type"][testSeg]) {
    regionSum += valueData[region]["By Additive Type"][testSeg][2021];
  }
}
console.log("\n--- Global = Sum of regions check ---");
console.log("Global Acacia 2021:", globalVal2021);
console.log("Sum of regions:", Math.round(regionSum * 10) / 10);
console.log("Match:", Math.abs(globalVal2021 - regionSum) < 1);

// Verify region = sum of countries
const naVal2021 = valueData["North America"]["By Additive Type"][testSeg][2021];
let countrySum = 0;
for (const country of GEO_HIERARCHY["North America"]) {
  if (valueData[country] && valueData[country]["By Additive Type"] && valueData[country]["By Additive Type"][testSeg]) {
    countrySum += valueData[country]["By Additive Type"][testSeg][2021];
  }
}
console.log("\nNorth America Acacia 2021:", naVal2021);
console.log("Sum of US+Canada:", Math.round(countrySum * 10) / 10);
console.log("Match:", Math.abs(naVal2021 - countrySum) < 1);

// Verify no double counting in total
let globalTotal2021 = 0;
for (const [segName, segData] of Object.entries(globalAddType)) {
  const isChild = Object.values(HIERARCHICAL_SEGMENTS).some(children => children.includes(segName));
  if (!isChild) {
    globalTotal2021 += segData[2021];
  }
}
console.log("\nGlobal By Additive Type total 2021 (parent-only):", Math.round(globalTotal2021 * 10) / 10);

// Check segmentation hierarchy
console.log("\n--- Segmentation Analysis ---");
console.log(JSON.stringify(segAnalysis, null, 2).substring(0, 500));

console.log("\nDone!");
