import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customepipe'
})
export class CustomepipePipe implements PipeTransform {
  
  transform(value: string, gender:string): string {
    let rtnValue:any;
    if(gender.toLowerCase()=="googleuser"){
      rtnValue="Hi "+ value;
    }
    else if(gender.toLowerCase()=="male"){
      rtnValue="Mr."+value;
    }
    else{
      rtnValue="Mrs."+value;
    }
    return rtnValue;
  }
}
