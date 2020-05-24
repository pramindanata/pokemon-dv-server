import type {
  ValidationOptions,
  Schema,
  ValidationResult,
  ValidationError,
} from '@hapi/joi'

export interface ErrorBody {
  source: ValueSource
  data: {
    [key: string]: string[]
  }
}

export type ValueSource = 'body' | 'params' | 'query' | 'other'

export const options: ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
}

export const validate = (
  schema: Schema,
  value: Record<string, any>,
  source: ValueSource,
  immediate = true,
): ValidationResult => {
  const result = schema.validate(value, options)

  if (!immediate) {
    return result
  }

  if (result.error) {
    throw new ValidationException(result.error, source)
  }

  return result
}

export class ValidationException extends Error {
  private readonly bag: ValidationError
  private readonly source: ValueSource

  constructor(bag: ValidationError, source: ValueSource) {
    super()
    this.message = 'Validation Error'
    this.bag = bag
    this.source = source
  }

  getBag(): ValidationError {
    return this.bag
  }

  getSource(): ValueSource {
    return this.source
  }

  createBody(): ErrorBody {
    const data: Record<string, string[]> = this.bag.details.reduce(
      (prev: Record<string, string[]>, cur) => {
        const key = cur.path.join('.')

        if (!prev[key]) {
          prev[key] = []
        }

        prev[key].push(cur.message)

        return prev
      },
      {},
    )

    return {
      source: this.source,
      data,
    }
  }
}
