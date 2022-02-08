import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { StreamService } from 'src/app/services/stream/stream.service';
import { AddProject, Streamc } from 'src/app/shared/interfaces/AddProject';
import { Stream } from 'src/app/shared/interfaces/stream';


@Component({
  selector: 'ims-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  addProject: AddProject = {
    project: {
      projectName: '',
      projectDate: '',
      candidates: []
    },
    streamc: []
  };
  projectName!: String;
  remainingStreams!: Stream[];
  addedStreams1: Stream[] = [];
  addedStreams: Streamc[] = [];
  streamToAdd!: Stream | null;
  candidateRequired!: number | null;


  projectNameChecker = false;
  projectDateChecker = false;
  addStreamChecker = false;
  streamListChecker = false;
  candidateNumberChecker = false;

  isProjectNameValid(): boolean {

    if(this.addProject.project.projectName != null && this.addProject.project.projectName != '') {
      this.projectNameChecker =false;
      return true;
    }
    this.projectNameChecker = true;
    setTimeout(()=> {
      this.projectNameChecker = false;
    }, 5000);
    return false;
  }

  isProjectDateValid(): boolean {

    if(this.addProject.project.projectDate != null && this.addProject.project.projectDate != '') {
      this.projectDateChecker =false;
      return true;
    }
    this.projectDateChecker = true;
    setTimeout(()=> {
      this.projectDateChecker = false;
    }, 5000);
    return false;
  }

  isStreamListValid(): boolean {

    if(this.addProject.streamc != null && this.addProject.streamc.length != 0) {
      this.streamListChecker = false;
      return true;
    }

    this.streamListChecker = true;
    setTimeout(()=> {
      this.streamListChecker = false;
    }, 5000);

    return false;
  }

  constructor(private projectService: ProjectService, private streamService: StreamService, private router: Router) { }

  ngOnInit(): void {
    
    
    this.streamService.getStreams().subscribe(
      (response: any) => {
        // console.log(response);
        this.remainingStreams = response;
        // console.log(this.remainingStream)

      },
      (error: any) => {
        console.log(error);
      }
    );


  }

  updateDoB(dateObject: any){
    this.addProject.project.projectDate = JSON.stringify(dateObject.value) ;
    // console.log(this.addProject)
  }

  addStream(): void {
    // console.log(this.streamToAdd)
    if(this.streamToAdd == null) {
      this.addStreamChecker = true;
      setTimeout(() => {this.addStreamChecker = false}, 5000);
      return;
    } else if(this.candidateRequired == null || this.candidateRequired <= 0) {
      this.candidateNumberChecker = true;
      setTimeout(() => {this.candidateNumberChecker = false}, 5000);
      return;
    }
    this.addStreamChecker = false;
    let streamc: Streamc = {
      streamId: this.streamToAdd.id,
      candidate_required: this.candidateRequired
    }
    
    // this.candidateRequired = null;
    this.addProject.project.projectName = this.addProject.project.projectName;

    this.addedStreams.push(streamc);
    this.addedStreams1.push(this.streamToAdd);
    // console.log(this.addedStreams)

    this.remainingStreams.forEach((element, index)=>{
      if(element == this.streamToAdd) {
        this.remainingStreams.splice(index,1);
      }
    });

    this.streamToAdd = null;
    // this.candidateRequired = null;
    // console.log(this.remainingStreams)
    
  }

  onSubmit(): void {
    this.addProject.streamc = this.addedStreams;
    if(this.isProjectNameValid() && this.isProjectDateValid() && this.isStreamListValid()) {
      this.projectService.addProject(this.addProject).subscribe(
        (response: any) => {
          // console.log("success", response);
          let form = <HTMLFormElement>document.getElementById('add-project');
          form.reset;
          window.location.href='/hrdashboard';
        }
      );
    } else  {
      console.log('cannot submit');
    }
    
  }

  onReset(): void {
    this.remainingStreams = this.remainingStreams.concat(this.addedStreams1);
    this.addedStreams1 = [];
    this.addedStreams = [];
    this.streamToAdd = null;
  }
}
