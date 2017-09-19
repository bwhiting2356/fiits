import { Pipe, PipeTransform } from '@angular/core';
import { addMinutes } from './addMinutes';

@Pipe({
  name: 'addMinutes'
})
export class AddMinutesPipe implements PipeTransform {

  transform(timeString: string, args?: any): any {
    const time = new Date(timeString);
    return addMinutes(time, args)
  }

}
