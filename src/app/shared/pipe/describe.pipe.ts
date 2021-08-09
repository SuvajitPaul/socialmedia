import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'describe'
})
export class DescribePipe implements PipeTransform {
  constructor(private route:Router) {}
  
  transform(value: string,maxlength:number): string {
    let rtnvalue:any;
    if(value?.length>maxlength){
      rtnvalue= value.substring(0,maxlength-1) + "... See More";
    }else{
      rtnvalue=value;
    }
    return rtnvalue;
  }

}
