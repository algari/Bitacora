import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'moment'
})
export class MomentPipePipe implements PipeTransform {

  //{{project.created_at | moment: "YYYY-MM-DD":'YYYY-MM-DD hh:mm:ss' }}
  transform(value: any, outputFormat: string = 'lll',
            inputFormat: string = 'YYYY-MM-DD hh:mm:ss',
            locale: string = 'en'): any {
    moment.locale(locale);
    const output = outputFormat !== 'relative' ?
      moment(value, inputFormat).format(outputFormat) :
      moment(value, inputFormat).fromNow();
    return output;
  }

}
