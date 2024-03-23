import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import general from './slices/general';
import company from './slices/company';
import project from './slices/project';
import sells from './slices/sells';
import sellsReport from './slices/sellsReport';
import invoice from './slices/invoice';
import workOrder from './slices/workOrder';



// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
    blacklist: [],
};

const rootReducer = combineReducers({
  general:general,
  app: appReducer,
  company:company,
  project:project,
  sells:sells,
  sellsReport:sellsReport,
  invoice:invoice,
  workOrder:workOrder
  
});

export { rootPersistConfig, rootReducer };