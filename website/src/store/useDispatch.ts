import { useDispatch as _useDispatch } from 'react-redux';
import { AppDispatch } from './index';

// A custom hook that shortcuts directly to our app-specific Dispatch type
export const useDispatch = () => _useDispatch<AppDispatch>();
