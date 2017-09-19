import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortAddress'
})
export class ShortAddressPipe implements PipeTransform {

  transform(address: string, args?: any): any {
    return address.split(',')[0];
  }

}
