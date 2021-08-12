
import React from 'react'
import { render } from '@testing-library/react'
import {App} from './'

describe('App', () => {
    // test('true is truthy', () => {
    //   expect(true).toBe(true);
    // });
   
    it('renders', () => {
      //expect(false).toBe(false);
      render(<App />)
    });
  });
