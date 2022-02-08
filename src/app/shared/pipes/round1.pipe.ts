import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { GetCandidate, GetUser } from '../interfaces/GetCandidate';

@Pipe({
  name: 'round1'
})
export class Round1Pipe implements PipeTransform {

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
      return candidate.getUsers[0].userName;
    } else if(candidate.getUsers.length == 2) {
      if(candidate.getUsers[0].userStreams[0].streamName == 'management') {
        return candidate.getUsers[1].userName;
      }
  
      return candidate.getUsers[0].userName;
    }

    

    return '';
    
  }

}
