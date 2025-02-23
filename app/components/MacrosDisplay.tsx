import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'

interface MacrosDisplayProps {
  macros: {
    protein: number
    fat: number
    carbs: number
  }
}

const MacrosDisplay: React.FC<MacrosDisplayProps> = ({ macros }) => {
  return (
    <Alert className="mt-4">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle className="text-sm sm:text-base"><FormattedMessage id="macro.title" /></AlertTitle>
      <AlertDescription>
        <div className="mt-2 space-y-2">
          <p className="text-sm sm:text-base"><FormattedMessage id="macro.description" key="macroDescription" /></p>
          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
            <li key="protein"><FormattedMessage id="macro.protein" key="macroProtein" values={{ amount: macros.protein}} /></li>
            <li key="fat"><FormattedMessage id="macro.fat" key="macroFat" values={{ amount: macros.fat }} /></li>
            <li key="carbs"><FormattedMessage id="macro.carbs" key="macroCarbs" values={{ amount: macros.carbs }} /></li>
          </ul>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            <FormattedMessage id="macro.note" key="macroNote" />
          </p>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export default MacrosDisplay

