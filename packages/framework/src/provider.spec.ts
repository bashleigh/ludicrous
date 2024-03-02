import { isConstructorProvider, isTokenProvider, isValueProvider } from './provider'

describe('Provider', () => {
  describe('isTokenProvider', () => {
    it('Will return false if value provider', () => {
      expect(isTokenProvider({ token: 'token', useValue: 'any' })).toBeFalsy()
    })

    it('Will return false if class provider', () => {
      expect(isTokenProvider(class Test {})).toBeFalsy()
    })

    it('Will return true if token provider', () => {
      expect(isTokenProvider({ token: 'token', useClass: class Test {} })).toBeTruthy()
    })
  })

  describe('isValueProvider', () => {
    it('Will return false if class provider', () => {
      expect(isValueProvider(class Test {})).toBeFalsy()
    })

    it('Will return true if token provider', () => {
      expect(isValueProvider({ token: 'token', useValue: 'any' })).toBeTruthy()
    })

    it('Will return false if class provider', () => {
      expect(isValueProvider({ token: 'token', useClass: class Test {} })).toBeFalsy()
    })
  })

  describe('isConstructorProvider', () => {
    it('Will return true if class provider', () => {
      expect(isConstructorProvider(class Test {})).toBeTruthy()
    })

    it('Will return false if token provider', () => {
      expect(isConstructorProvider({ token: 'token', useValue: 'any' })).toBeFalsy()
    })

    it('Will return false if class provider', () => {
      expect(isConstructorProvider({ token: 'token', useClass: class Test {} })).toBeFalsy()
    })
  })
})
