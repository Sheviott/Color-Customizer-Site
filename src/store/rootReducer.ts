import { combineReducers } from '@reduxjs/toolkit';
import { colorPicker } from './catalog/colorPickerSlice';


export const rootReducer = combineReducers({
  colorPicker: colorPicker,
});

export type RootState = ReturnType<typeof rootReducer>;