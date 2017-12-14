export const Config = {

  API_SERVER_URL: //'http://18.217.217.237:3300',
  'http://localhost:3300',

  RESULT_POSITIVO : 'Positive',
  RESULT_NEGATIVO : 'Negative',
  RESULT_BREAKEVEN:'Break Even',

  TYPE_LONG:'Long',
  TYPE_SHORT:'Short',

  STATUS_CLOSED : 'Closed',
  STATUS_OPEN : 'Open',
  STATUS_IMPORTED:'Imported',

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

  DAYS_WEEK : [
    {label:'Lunes', value:'Monday'},
    {label:'Martes', value:'Tuesday'},
    {label:'Miercoles', value:'Wednesday'},
    {label:'Jueves', value:'Thursday'},
    {label:'Viernes', value:'Friday'},
    {label:'Sabado', value:'Saturday'},
    {label:'Domingo', value:'Sunday'}
  ],

  YES :'YES',
  NO:'NO',

  SLD_SHORT:'SLD',
  BOT_LONG:'BOT'

};
