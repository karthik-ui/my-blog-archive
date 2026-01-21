/**
 * Jasmine helper functions for test specifications.
 * Works around ESM module scoping by accessing Karma-provided jasmine globals via window object.
 * Specs should import these helpers instead of trying to use jasmine/spyOn directly.
 */

// Type-safe access to Jasmine global functions provided by Karma
// These must be evaluated at runtime, not module load time
const getJasmine = () => {
  // Safely access the window object
  if (typeof window === 'undefined') {
    throw new Error('Jasmine helpers can only be used in browser environment');
  }
  
  // Get reference to jasmine - it will be injected by Karma at runtime
  const jasmine = (window as any).jasmine;
  if (!jasmine) {
    throw new Error('Jasmine is not available. Ensure this test is running with Karma test runner that includes Jasmine.');
  }
  return jasmine;
};

const getSpyOn = () => {
  if (typeof window === 'undefined') {
    throw new Error('spyOn helper can only be used in browser environment');
  }
  
  const spyOn = (window as any).spyOn;
  if (!spyOn) {
    throw new Error('spyOn is not available. Ensure this test is running with Karma test runner that includes Jasmine.');
  }
  return spyOn;
};

/**
 * Creates a Jasmine spy function
 * @param name The spy name
 * @param fn Optional function implementation
 */
export function createSpy(name: string, fn?: (...args: any[]) => any): jasmine.Spy {
  return getJasmine().createSpy(name, fn);
}

/**
 * Creates a Jasmine spy object with multiple methods
 * @param baseName The object name
 * @param methodNames Array of method names to spy on
 */
export function createSpyObj<T>(baseName: string, methodNames: (keyof T)[]): jasmine.SpyObj<T> {
  return getJasmine().createSpyObj(baseName, methodNames as string[]);
}

/**
 * Creates a spy on a specific method of an object
 * @param obj The object to spy on
 * @param method The method name to spy on
 */
export function spyOnMethod(obj: any, method: string | symbol): jasmine.Spy {
  return getSpyOn()(obj, method);
}

/**
 * Alias for spyOnMethod for convenience
 */
export function spyOn(obj: any, method: string | symbol): jasmine.Spy {
  return getSpyOn()(obj, method);
}
