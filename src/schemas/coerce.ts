export function optionalJsonArray(value: unknown): unknown {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed : value;
    } catch {
      return value;
    }
  }
  return value;
}

export function optionalString(value: unknown): unknown {
  if (value === '') {
    return undefined;
  }
  return value;
}
