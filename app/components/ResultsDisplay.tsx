import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Unit } from '../utils/calculations'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ResultsDisplayProps {
  bmr: number
  bmi: number
  targetWeight: number
  targetBMR: number
  daysToTarget: number
  unit: Unit
  getBMICategory: (bmi: number) => string
  currentWeight: number
  macros: { protein: number; fat: number; carbs: number } | null
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  bmr,
  bmi,
  targetWeight,
  targetBMR,
  daysToTarget,
  unit,
  getBMICategory,
  currentWeight,
  macros,
}) => {
  const isWeightGain = currentWeight < targetWeight;
  const weightDiff = Math.abs(currentWeight - targetWeight);
  const shouldShowProjection = weightDiff > 0.1;

  return (
    <div className="mt-6 space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold">
          <FormattedMessage id="result.current" />
        </h3>
        <p className="text-sm sm:text-base">
          <FormattedMessage id="result.bmr" values={{ bmr: bmr.toFixed(2) }} />
        </p>
        <p className="text-sm sm:text-base">
          <FormattedMessage 
            id="result.bmi" 
            values={{ 
              bmi: bmi.toFixed(2), 
              category: <FormattedMessage id={getBMICategory(bmi)} />
            }} 
          />
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold"><FormattedMessage id="result.target" /></h3>
        <p className="text-sm sm:text-base">
          <FormattedMessage 
            id="result.targetWeight"
            values={{ 
              weight: targetWeight.toFixed(2), 
              unit: <FormattedMessage id={unit === 'metric' ? "unit.kg" : "unit.lbs"} />
            }} 
          />
        </p>
        <p className="text-sm sm:text-base"><FormattedMessage id="result.targetBMR" values={{ bmr: targetBMR.toFixed(2) }} /></p>
      </div>
      {shouldShowProjection && (
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">
            <FormattedMessage id="result.weightChangeProjection" />
          </h3>
          {daysToTarget > 0 ? (
            <>
              <p className="text-sm sm:text-base">
                <FormattedMessage 
                  id="result.daysToTarget"
                  values={{ days: daysToTarget }} 
                />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                <FormattedMessage 
                  id={isWeightGain ? "result.projectionNoteGain" : "result.projectionNoteLoss"}
                  values={{
                    amount: unit === 'metric' ? '0.5 kg' : '1 lb'
                  }}
                />
              </p>
            </>
          ) : (
            <p className="text-sm sm:text-base">
              <FormattedMessage id="result.unableToCalculate" />
            </p>
          )}
          {macros && (
            <Alert className="mt-4">
              <AlertTitle className="text-md sm:text-lg font-semibold">
                <FormattedMessage id="macro.title" />
              </AlertTitle>
              <AlertDescription>
                <p className="text-sm sm:text-base mt-2">
                  <FormattedMessage id="macro.description" />
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base mt-2">
                  <li key="protein">
                    <FormattedMessage id="macro.protein" values={{ amount: macros.protein }} />
                  </li>
                  <li key="fat">
                    <FormattedMessage id="macro.fat" values={{ amount: macros.fat }} />
                  </li>
                  <li key="carbs">
                    <FormattedMessage id="macro.carbs" values={{ amount: macros.carbs }} />
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  <FormattedMessage id="macro.note" />
                </p>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}

export default ResultsDisplay

