import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeArray'
})
export class PipeArrayPipe implements PipeTransform {

  transform(value: any): any {
    const result = [];
    for (let i = 0; i < value; i++) {
        result.push(i);
      }
    return result;
  }

}
