import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Unit } from '../utils/calculations'

interface InputFormProps {
  unit: Unit
  gender: 'male' | 'female'
  age: string
  weight: string
  height: string
  handleUnitChange: (newUnit: Unit) => void
  setGender: (gender: 'male' | 'female') => void
  setAge: (age: string) => void
  setWeight: (weight: string) => void
  setHeight: (height: string) => void
  handleCalculate: () => void
  isRTL: boolean
}

const InputForm: React.FC<InputFormProps> = ({
  unit,
  gender,
  age,
  weight,
  height,
  handleUnitChange,
  setGender,
  setAge,
  setWeight,
  setHeight,
  handleCalculate,
  isRTL,
}) => {
  const intl = useIntl()

  const UnitLabel: React.FC<{ label: string; unit: string }> = ({ label, unit }) => (
    <span className={`inline-flex gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      <span>{label}</span>
      <span dir="ltr">({unit})</span>
    </span>
  )

  return (
    <div className="space-y-6">
      <Tabs value={unit} onValueChange={(value) => handleUnitChange(value as Unit)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metric"><FormattedMessage id="unit.metric" /></TabsTrigger>
          <TabsTrigger value="imperial"><FormattedMessage id="unit.imperial" /></TabsTrigger>
        </TabsList>
        <TabsContent value="metric">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight-metric" className="text-sm sm:text-base">
                  <UnitLabel 
                    label={intl.formatMessage({ id: 'input.weight' })}
                    unit={intl.formatMessage({ id: 'unit.kg' })}
                  />
                </Label>
                <Input
                  id="weight-metric"
                  placeholder={intl.formatMessage({ id: 'input.weightPlaceholder' })}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  dir="ltr"
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height-metric" className="text-sm sm:text-base">
                  <UnitLabel 
                    label={intl.formatMessage({ id: 'input.height' })}
                    unit={intl.formatMessage({ id: 'unit.cm' })}
                  />
                </Label>
                <Input
                  id="height-metric"
                  placeholder={intl.formatMessage({ id: 'input.heightPlaceholder' })}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  dir="ltr"
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="imperial">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight-imperial" className="text-sm sm:text-base">
                  <UnitLabel 
                    label={intl.formatMessage({ id: 'input.weight' })}
                    unit={intl.formatMessage({ id: 'unit.lbs' })}
                  />
                </Label>
                <Input
                  id="weight-imperial"
                  placeholder={intl.formatMessage({ id: 'input.weightPlaceholder' })}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  dir="ltr"
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height-imperial" className="text-sm sm:text-base">
                  <UnitLabel 
                    label={intl.formatMessage({ id: 'input.height' })}
                    unit={intl.formatMessage({ id: 'unit.inches' })}
                  />
                </Label>
                <Input
                  id="height-imperial"
                  placeholder={intl.formatMessage({ id: 'input.heightPlaceholder' })}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  dir="ltr"
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm sm:text-base"><FormattedMessage id="input.age" /></Label>
          <Input
            id="age"
            placeholder={intl.formatMessage({ id: 'input.agePlaceholder' })}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            dir="ltr"
            className="text-sm sm:text-base"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm sm:text-base"><FormattedMessage id="input.gender" /></Label>
          <RadioGroup value={gender} onValueChange={(value) => setGender(value as 'male' | 'female')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="text-sm sm:text-base"><FormattedMessage id="gender.male" /></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="text-sm sm:text-base"><FormattedMessage id="gender.female" /></Label>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={handleCalculate} className="w-full text-sm sm:text-base">
          <FormattedMessage id="button.calculate" />
        </Button>
      </div>
    </div>
  )
}

export default InputForm

