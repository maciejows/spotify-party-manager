import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSeconds'
})
export class TimeSecondsPipe implements PipeTransform {

  transform(value: number): string {
    let seconds = value/1000;
    let integer: number = Math.floor(seconds/60);
    let reminder = Math.floor(seconds % 60);
    return `${integer}:${reminder < 10? '0' : ''}${reminder}`;
  }

}
