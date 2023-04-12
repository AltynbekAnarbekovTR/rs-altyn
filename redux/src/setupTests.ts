import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/extend-expect';
import { expect } from 'vitest';
import 'whatwg-fetch';

expect.extend(matchers);
