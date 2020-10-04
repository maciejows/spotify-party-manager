import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSeconds'
})
export class TimeSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const seconds = value / 1000;
    const integer: number = Math.floor(seconds / 60);
    const reminder = Math.floor(seconds % 60);
    return `${integer}:${reminder < 10 ? '0' : ''}${reminder}`;
  }
}
