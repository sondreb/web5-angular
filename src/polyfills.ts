(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
import * as process from 'process';
window['process'] = process;
