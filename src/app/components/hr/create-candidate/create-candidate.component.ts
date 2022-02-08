import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddCandidate } from 'src/app/shared/interfaces/AddCandidate';
import { Candidate } from 'src/app/shared/interfaces/candidate';
import { Stream } from 'src/app/shared/interfaces/stream';




@Component({
  selector: 'ims-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {

  public addCandidate: AddCandidate = {
    candidateName: '',
    candidateExperience: null,
    candidateStatus: 'pending',
    projectId: null,
    streamId: null

  };

  streams: Stream[] = [];

  candidateNameChecker = false;
  candidateExperienceChecker = false;
  candidateProjectChecker = false;
  candidateStreamChecker = false;

  constructor(private candidateService: CandidateService, private router: Router, private route: ActivatedRoute, private projectService: ProjectService ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.projectId);
    this.addCandidate.projectId = this.route.snapshot.params.projectId;
    let id = this.route.snapshot.params.projectId;
    this.projectService.getStreams(id).subscribe(
      (response: any) => {
        this.streams = response;
      }
    )

  }

  candidateNameFilled(): boolean {


    if(this.addCandidate.candidateName != null && this.addCandidate.candidateName != '') {
      return true;
    } 
    this.candidateNameChecker = true;
    setTimeout(()=> {
      this.candidateNameChecker = false;
    }, 5000);
    return false;

  }
  
  candidateExperienceFilled() {
    if(this.addCandidate.candidateExperience!= null) {
      return true;
    }
    this.candidateExperienceChecker = true;
    setTimeout(()=> {
      this.candidateExperienceChecker = false;
    }, 5000);
    return false;
  }
  
  candidateProjectSelected() {
    if(this.addCandidate.projectId != null) {
      return true;
    }

    this.candidateProjectChecker = true;
    setTimeout(()=> {
      this.candidateProjectChecker = false;
    }, 5000);
    return false;
  }
  
  candidateStreamSelected() {
    if(this.addCandidate.streamId != null) {
      return true;
    }

    this.candidateStreamChecker = true;
    setTimeout(()=> {
      this.candidateStreamChecker = false;
    }, 5000);
    return false;
  }

  isValid(): boolean {
    if(this.candidateNameFilled() && this.candidateExperienceFilled() && this.candidateProjectSelected() && this.candidateStreamSelected()) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    

    if(this.isValid()) {
      if(this.addCandidate.projectId) {
        this.addCandidate.projectId = parseInt(this.addCandidate.projectId.toString());
      }
      if(this.addCandidate.streamId) {
        this.addCandidate.streamId = parseInt(this.addCandidate.streamId.toString());
        // this.addCandidate.streamId = parseInt(this.addCandidate.streamId.toString());
      }
      
      this.candidateService.addCandidate(this.addCandidate).subscribe(
        (response: any) => {
          // console.log(this.addCandidate);
          // console.log(response);

          this.router.navigate(['/project', this.addCandidate.projectId]);
        },
        (error: any)=> {
          console.log(error);
        }
        );
      // console.log(this.addCandidate);

    } else {
      console.log("not added")
    }
  }
}


