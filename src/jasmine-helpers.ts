/**
 * Jasmine helper functions for test specifications.
 * Works around ESM module scoping by accessing Karma-provided jasmine globals via window object.
 * Specs should import these helpers instead of trying to use jasmine/spyOn directly.
 */

// Type-safe access to Jasmine global functions provided by Karma
const getJasmine = () => {
  const win = typeof window !== 'undefined' ? (window as any) : (globalThis as any);
  return win.jasmine || win.Jasmine || {
    createSpy: () => { throw new Error('Jasmine not initialized'); },
    createSpyObj: () => { throw new Error('Jasmine not initialized'); }
  };
};

const getSpyOn = () => {
  const win = typeof window !== 'undefined' ? (window as any) : (globalThis as any);
  return win.spyOn || (() => { throw new Error('spyOn not initialized'); });
};

/**
 * Creates a Jasmine spy function
 * @param name The spy name
 * @param fn Optional function implementation
 */
export function createSpy(name: string, fn?: Function): jasmine.Spy {
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
