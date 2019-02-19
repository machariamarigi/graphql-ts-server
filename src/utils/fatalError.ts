import { createError } from 'apollo-errors';
 
export const FatalError = createError('FatalError', {
  message: 'A fatal error has occurred'
});