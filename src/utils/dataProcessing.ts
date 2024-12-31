type CropData = {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string | number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
    "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  };
  
  export const processDataForTable = (data: CropData[]) => {
    const yearlyData: Record<
      string,
      { maxCrop: string; maxProduction: number; minCrop: string; minProduction: number }
    > = {};
  
    data.forEach((entry) => {
      const year = entry.Year.split(",")[1]?.trim() || "Unknown Year";
      const production = Number(entry["Crop Production (UOM:t(Tonnes))"]) || 0;
      const crop = entry["Crop Name"];
  
      if (!yearlyData[year]) {
        yearlyData[year] = { maxCrop: crop, maxProduction: production, minCrop: crop, minProduction: production };
      }
  
      const yearEntry = yearlyData[year];
      if (production > yearEntry.maxProduction) {
        yearEntry.maxCrop = crop;
        yearEntry.maxProduction = production;
      }
  
      if (production < yearEntry.minProduction) {
        yearEntry.minCrop = crop;
        yearEntry.minProduction = production;
      }
    });
  
    return Object.entries(yearlyData).map(([year, { maxCrop, minCrop }]) => ({
      year,
      maxCrop,
      minCrop,
    }));
  };
  
  export const processDataForChart = (data: CropData[]) => {
    const cropStats: Record<string, { totalYield: number; count: number }> = {};
  
    data.forEach((entry) => {
      const crop = entry["Crop Name"];
      const yieldValue = Number(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
  
      if (!cropStats[crop]) {
        cropStats[crop] = { totalYield: 0, count: 0 };
      }
  
      cropStats[crop].totalYield += yieldValue;
      cropStats[crop].count += 1;
    });
  
    return Object.entries(cropStats).map(([crop, { totalYield, count }]) => ({
      crop,
      averageYield: count > 0 ? totalYield / count : 0,
    }));
  };
  