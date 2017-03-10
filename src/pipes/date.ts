import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  private date:any;

  /*Reconstruct date string, change order to finnish form*/
  cleanDate = (date) => {
    date = date.split('-');
    const newDate = date[2] + '.' + date[1] + '.' + date[0];
    return newDate;
  }

  /*transform function, if argument is 'parse' reconstrcut date string*/
  transform(value: any, args?: any): any {

    if(args === 'parse') {
      value = value.split('T');
      this.date = this.cleanDate(value[0]);
      return this.date;
    }

    return value;

  }

}
