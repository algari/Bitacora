export const Config = {
    API_SERVER_URL: 'http://localhost:3300',//'http://172.104.91.187',
    API_SERVER_URL_LOCAL: 'mongodb://localhost:27017/Bitacora',//'http://localhost:8085',

  RESULT_POSITIVO : 'Positive',
  RESULT_NEGATIVO : 'Negative',
  RESULT_BREAKEVEN:'Break Even',

  TYPE_LONG:'Long',
  TYPE_SHORT:'Short',
  TYPE_CALL:'Call',
  TYPE_PUT:'Put',

  STATUS_CLOSED : 'Closed',
  STATUS_OPEN : 'Open',
  
  TYPES : [
    {label:'Select', value:null},
    {label:'Long', value:'Long'},
    {label:'Short', value:'Short'},
  ],

  TIME_FRAMES : [
    {label:'Select', value:null},
    {label:'1 Minuto', value:'1M'},
    {label:'2 Minutos', value:'2M'},
    {label:'5 Minutos', value:'5M'},
    {label:'15 Minutos', value:'15M'},
    {label:'1 Hora', value:'1H'},
    {label:'1 Dia', value:'1D'},
    {label:'1 Semana', value:'1W'}
  ],

  FOLLOWED : [
    {label:'NO', value:'NO'},
    {label:'SI', value:'SI'},
  ],

};
