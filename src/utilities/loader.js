/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import ErrorMessage from '../components/shared/errorMessage';
import Loading from '../components/shared/loading';

export function getElement(isLoaded, hasErrors, element) {
  if (hasErrors) {
    return <ErrorMessage />;
  }
  if (!isLoaded) {
    return <Loading key="loading" />;
  }
  return element;
}
