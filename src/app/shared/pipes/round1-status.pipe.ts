import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { GetCandidate } from '../interfaces/GetCandidate';

@Pipe({
  name: 'round1Status'
})
export class Round1StatusPipe implements PipeTransform {
  transform(candidate: GetCandidate, ...args: unknown[]): unknown {
    



    return this.getRoundStatus(candidate);

  }
  

  message = '';

  constructor(private userService: UserService) {

  }

  getRoundStatus(candidate: GetCandidate) : any {

    if(candidate.getUsers == null || candidate.getUsers.length == 0) {
      return '';
    } else if(candidate.getUsers.length == 1) {
      return  candidate.getUsers[0].userStatus;
    } else if(candidate.getUsers.length == 2) {
      if(candidate.getUsers[0].userStreams[0].streamName == 'management') {
        return  candidate.getUsers[1].userStatus;
      }
  
      return  candidate.getUsers[0].userStatus;
    }

    

    return '';
    
  }

}
