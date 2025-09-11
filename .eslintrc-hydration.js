// ESLint rules para prevenir erros de hidratação
module.exports = {
  rules: {
    // Detecta uso de window/document sem proteção
    'no-restricted-globals': [
      'error',
      {
        name: 'window',
        message: 'Use typeof window !== "undefined" check or useEffect for client-side code'
      },
      {
        name: 'document', 
        message: 'Use typeof document !== "undefined" check or useEffect for client-side code'
      }
    ],
    
    // Detecta Math.random e Date.now que causam diferenças
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name="Math"][callee.property.name="random"]',
        message: 'Math.random() causes hydration mismatches. Use it inside useEffect or with proper state management.'
      },
      {
        selector: 'CallExpression[callee.object.name="Date"][callee.property.name="now"]',
        message: 'Date.now() causes hydration mismatches. Use it inside useEffect or with proper state management.'
      }
    ]
  }
}