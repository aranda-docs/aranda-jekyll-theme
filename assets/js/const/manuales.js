import { ManualUso } from './manualUso.js';
import { HealthReport } from './healthReport.js';
import { HelthReportManual } from './healthReportManual.js';
import { FieldServices } from './fieldServices.js';
import { VirtualSupport } from './virtualSupport.js';
import { DatabaseTool } from './dataBaseTool.js';
//-- Static database - docs control
export const Manuales = [
    ...ManualUso,
    ...HealthReport,
    ...HelthReportManual,
    ...FieldServices,
    ...VirtualSupport,
    ...DatabaseTool,
];