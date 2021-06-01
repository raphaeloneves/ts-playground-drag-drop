export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
}

export function validate(validatableData: Validatable) {
  let isValid = true;
  if (validatableData.required) {
    isValid = isValid && validatableData.value.toString().trim().length > 0;
  }
  if (typeof validatableData.value === "string") {
    if (validatableData.minLength) {
      isValid =
        isValid &&
        validatableData.value.trim().length >= validatableData.minLength;
    }
    if (validatableData.maxLength) {
      isValid =
        isValid &&
        validatableData.value.trim().length <= validatableData.maxLength;
    }
  }
  if (typeof validatableData.value === "number") {
    if (validatableData.max) {
      isValid = isValid && validatableData.value <= validatableData.max;
    }
    if (validatableData.min) {
      isValid = isValid && validatableData.value >= validatableData.min;
    }
  }
  return isValid;
}
