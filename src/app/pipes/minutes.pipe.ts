import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {

  transform(seconds: number, args?: any): number {
    return Math.floor(seconds / 60);
  }

}
