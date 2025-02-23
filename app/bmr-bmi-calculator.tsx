'use client'

import React, { useState, useEffect } from 'react'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { 
  calculations,
  type Unit 
} from './utils/calculations'
import { kgToLbs, lbsToKg, cmToInches, inchesToCm } from './utils/unitConversion'
import LanguageSelector from './components/LanguageSelector'
import InputForm from './components/InputForm'
import ResultsDisplay from './components/ResultsDisplay'
import { messages, SupportedLanguage, isRTL } from './utils/languageUtils'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
const saveToLocalStorage = (data: {
  unit: Unit;
  gender: 'male' | 'female';
  age: string;
  weight: string;
  height: string;
  calculatedPressed: boolean;
  bmr: number | null;
  bmi: number | null;
  targetWeight: number | null;
  targetBMR: number | null;
  daysToTarget: number | null;
  macros: { protein: number; fat: number; carbs: number } | null;
}) => {
  setLocalStorage('bmrBmiCalculatorData', JSON.stringify(data));
}

const loadFromLocalStorage = () => {
  const data = getLocalStorage('bmrBmiCalculatorData');
  return data ? JSON.parse(data) : null;
}

const saveLanguageToLocalStorage = (lang: SupportedLanguage) => {
  setLocalStorage('bmrBmiCalculatorLanguage', lang);
}

interface BMRBMICalculatorProps {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
}

const BMRBMICalculator: React.FC<BMRBMICalculatorProps> = ({ language, setLanguage }) => {
  const [unit, setUnit] = useState<Unit>('metric')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmr, setBMR] = useState<number | null>(null)
  const [bmi, setBMI] = useState<number | null>(null)
  const [targetWeight, setTargetWeight] = useState<number | null>(null)
  const [targetBMR, setTargetBMR] = useState<number | null>(null)
  const [daysToTarget, setDaysToTarget] = useState<number | null>(null)
  const [macros, setMacros] = useState<{ protein: number; fat: number; carbs: number } | null>(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setUnit(savedData.unit);
      setGender(savedData.gender);
      setAge(savedData.age);
      setWeight(savedData.weight);
      setHeight(savedData.height);
      if (savedData.calculatedPressed) {
        const ageNum = parseInt(savedData.age);
        const weightNum = parseFloat(savedData.weight);
        const heightNum = parseFloat(savedData.height);
        
        if (ageNum && weightNum && heightNum) {
          const calculatedBMR = calculations.calculateBMR(weightNum, heightNum, ageNum, savedData.gender, savedData.unit);
          const calculatedBMI = calculations.calculateBMI(weightNum, heightNum, savedData.unit);
          const calculatedTargetWeight = calculations.calculateTargetWeight(heightNum, savedData.unit);
          const calculatedTargetBMR = calculations.calculateTargetBMR(heightNum, ageNum, savedData.gender, savedData.unit);
          const calculatedDaysToTarget = calculations.calculateDaysToTargetWeight(
            weightNum,
            calculatedTargetWeight,
            heightNum,
            ageNum,
            savedData.gender,
            savedData.unit
          );
        
          setBMR(calculatedBMR);
          setBMI(calculatedBMI);
          setTargetWeight(calculatedTargetWeight);
          setTargetBMR(calculatedTargetBMR);
          setDaysToTarget(calculatedDaysToTarget);

          const calculatedMacros = calculations.calculateMacros(calculatedTargetBMR, calculatedTargetWeight, savedData.unit);
          setMacros(calculatedMacros);

          setShowResults(true);
        }
      }
    }
  }, []);

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit)
    setShowResults(false)
    if (weight && height) {
      if (newUnit === 'imperial') {
        setWeight(kgToLbs(parseFloat(weight)).toFixed(2))
        setHeight(cmToInches(parseFloat(height)).toFixed(2))
      } else {
        setWeight(lbsToKg(parseFloat(weight)).toFixed(2))
        setHeight(inchesToCm(parseFloat(height)).toFixed(2))
      }
    }
  }

  const handleCalculate = () => {
    const ageNum = parseInt(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    if (ageNum && weightNum && heightNum) {
      const calculatedBMR = calculations.calculateBMR(weightNum, heightNum, ageNum, gender, unit)
      const calculatedBMI = calculations.calculateBMI(weightNum, heightNum, unit)
      const calculatedTargetWeight = calculations.calculateTargetWeight(heightNum, unit)
      const calculatedTargetBMR = calculations.calculateTargetBMR(heightNum, ageNum, gender, unit)
      const calculatedDaysToTarget = calculations.calculateDaysToTargetWeight(
        weightNum,
        calculatedTargetWeight,
        heightNum,
        ageNum,
        gender,
        unit
      )
    
      setBMR(calculatedBMR)
      setBMI(calculatedBMI)
      setTargetWeight(calculatedTargetWeight)
      setTargetBMR(calculatedTargetBMR)
      setDaysToTarget(calculatedDaysToTarget)

      const calculatedMacros = calculations.calculateMacros(calculatedTargetBMR, calculatedTargetWeight, unit);
      setMacros(calculatedMacros)

      setShowResults(true)

      saveToLocalStorage({
        unit,
        gender,
        age,
        weight,
        height,
        calculatedPressed: true,
        bmr: calculatedBMR,
        bmi: calculatedBMI,
        targetWeight: calculatedTargetWeight,
        targetBMR: calculatedTargetBMR,
        daysToTarget: calculatedDaysToTarget,
        macros: calculatedMacros,
      });
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Top Ad Banner */}
      {/* <div className="w-full h-[90px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Google Ad Banner</p>
      </div> */}

      <Card className="w-full p-4 sm:p-6 md:p-8" dir={isRTL(language) ? 'rtl' : 'ltr'}>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-2xl sm:text-3xl"><FormattedMessage id="app.title" /></CardTitle>
              <CardDescription className="text-sm sm:text-base"><FormattedMessage id="app.description" /></CardDescription>
            </div>
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <InputForm
              unit={unit}
              gender={gender}
              age={age}
              weight={weight}
              height={height}
              handleUnitChange={handleUnitChange}
              setGender={setGender}
              setAge={setAge}
              setWeight={setWeight}
              setHeight={setHeight}
              handleCalculate={handleCalculate}
              isRTL={isRTL(language)}
            />
            {showResults && bmr !== null && bmi !== null && targetWeight !== null && targetBMR !== null && daysToTarget !== null && (
              <ResultsDisplay
                bmr={bmr}
                bmi={bmi}
                targetWeight={targetWeight}
                targetBMR={targetBMR}
                daysToTarget={daysToTarget}
                unit={unit}
                getBMICategory={calculations.getBMICategory}
                currentWeight={parseFloat(weight)}
                macros={macros}
              />
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <FormattedMessage id="footer.note" />
            </p>
          </CardFooter>
        </Card>

      {/* Bottom Ad Banner */}
      {/* <div className="w-full h-[90px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Google Ad Banner</p>
      </div> */}
    </div>
  )
}

export default function WrappedBMRBMICalculator() {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const savedLanguage = getLocalStorage('bmrBmiCalculatorLanguage') as SupportedLanguage;
    return savedLanguage || 'en-GB';
  });

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    saveLanguageToLocalStorage(lang);
  };

  return (
    <IntlProvider messages={messages[language]} locale={language} defaultLocale="en-GB">
      <BMRBMICalculator language={language} setLanguage={handleLanguageChange} />
    </IntlProvider>
  )
}

