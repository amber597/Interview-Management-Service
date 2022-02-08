import { Pipe, PipeTransform } from '@angular/core';
import { GetCandidate } from '../interfaces/GetCandidate';

@Pipe({
  name: 'round2Status'
})
export class Round2StatusPipe implements PipeTransform {

  transform(value: GetCandidate, ...args: unknown[]): unknown {
    return this.getRoundStatus(value);
  }

  

  
  getRoundStatus(candidate: GetCandidate) : String {
    if(candidate.getUsers == null || candidate.getUsers.length == 0) {
      return '';
    } else if(candidate.getUsers.length == 2) {
      if(candidate.getUsers[0].userStreams[0].streamName == 'management') {
        return <string>candidate.getUsers[0].userStatus;
      }
  
      return <string> candidate.getUsers[1].userStatus;

    }

    return '';
  
  }

}
