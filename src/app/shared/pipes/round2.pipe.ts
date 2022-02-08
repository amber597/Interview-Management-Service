import { Pipe, PipeTransform } from '@angular/core';
import { GetCandidate } from '../interfaces/GetCandidate';

@Pipe({
  name: 'round2'
})
export class Round2Pipe implements PipeTransform {

  transform(value: GetCandidate, ...args: unknown[]): unknown {
    return this.getRoundStatus(value);
  }

  

  
  getRoundStatus(candidate: GetCandidate) : String {
    if(candidate.getUsers == null || candidate.getUsers.length == 0) {
      return '';
    } else if(candidate.getUsers.length == 2) {
      if(candidate.getUsers[0].userStreams[0].streamName == 'management') {
        return candidate.getUsers[0].userName ;
      }
  
      return candidate.getUsers[1].userName ;

    }

    return '';
  
  }

}
