import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: string[]): number | null {
    if(value.hasOwnProperty('length')) {
      return value.length;
    }
    return null;
  }
}
