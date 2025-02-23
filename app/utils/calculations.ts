import { lbsToKg, inchesToCm } from './unitConversion';

export type Unit = 'metric' | 'imperial';

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  unit: Unit
): number {
  // Convert imperial to metric if necessary
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 2.54; // inches to cm
  }

  // Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  return bmr;
}

export function calculateBMI(weight: number, height: number, unit: Unit): number {
  // Convert imperial to metric if necessary
  if (unit === 'imperial') {
    weight = weight * 0.453592; // lbs to kg
    height = height * 0.0254; // inches to meters
  } else {
    height = height / 100; // cm to meters
  }

  return weight / (height * height);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 16) return 'bmi.severeThinness';
  if (bmi < 17) return 'bmi.moderateThinness';
  if (bmi < 18.5) return 'bmi.mildThinness';
  if (bmi < 25) return 'bmi.normal';
  if (bmi < 30) return 'bmi.overweight';
  if (bmi < 35) return 'bmi.obeseClassI';
  if (bmi < 40) return 'bmi.obeseClassII';
  return 'bmi.obeseClassIII';
}

export function calculateTargetWeight(height: number, unit: Unit): number {
  const targetBMI = 21.5;
  let heightInMeters: number;

  if (unit === 'imperial') {
    heightInMeters = height * 0.0254; // inches to meters
  } else {
    heightInMeters = height / 100; // cm to meters
  }

  let targetWeightKg = targetBMI * (heightInMeters * heightInMeters);

  if (unit === 'imperial') {
    return targetWeightKg * 2.20462; // kg to lbs
  }

  return targetWeightKg;
}

export function calculateTargetBMR(
  height: number,
  age: number,
  gender: 'male' | 'female',
  unit: Unit
): number {
  const targetWeight = calculateTargetWeight(height, unit);
  return calculateBMR(targetWeight, height, age, gender, unit);
}

export function calculateDaysToTargetWeight(
  currentWeight: number,
  targetWeight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  unit: Unit
): number {
  // Convert to metric if imperial
  if (unit === 'imperial') {
    currentWeight = lbsToKg(currentWeight);
    targetWeight = lbsToKg(targetWeight);
    height = inchesToCm(height);
  }

  const weightDiff = Math.abs(currentWeight - targetWeight);
  const dailyCalorieDiff = 500; // 500 calorie surplus/deficit per day
  const caloriesPerKg = 7700; // Approximately 7700 calories per kg of body weight
  
  // Calculate days needed based on the calorie difference
  const daysToTarget = Math.ceil((weightDiff * caloriesPerKg) / dailyCalorieDiff);

  // Return -1 if it would take too long (over 2 years)
  if (daysToTarget > 730) {
    return -1;
  }

  return daysToTarget;
}

export function calculateMacros(
  targetBMR: number,
  targetWeight: number,
  unit: Unit
) {
  // Convert target weight to kg if imperial
  const targetWeightKg = unit === 'imperial' ? targetWeight * 0.453592 : targetWeight;

  // Protein: 2.2g per kg of target body weight
  const proteinGrams = targetWeightKg * 2.2;
  const proteinCalories = proteinGrams * 4; // 4 calories per gram of protein

  // Fat: 20% of target calories
  const fatCalories = targetBMR * 0.20;
  const fatGrams = fatCalories / 9; // 9 calories per gram of fat

  // Remaining calories for carbs
  const carbCalories = targetBMR - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4; // 4 calories per gram of carbs

  return {
    protein: Math.round(proteinGrams),
    fat: Math.round(fatGrams),
    carbs: Math.round(carbGrams)
  };
}

export function isObese(bmi: number): boolean {
  return bmi >= 30;
}

// Create a named exports object to ensure all functions are properly exported
export const calculations = {
  calculateBMR,
  calculateBMI,
  getBMICategory,
  calculateTargetWeight,
  calculateTargetBMR,
  calculateDaysToTargetWeight,
  calculateMacros,
  isObese
};

