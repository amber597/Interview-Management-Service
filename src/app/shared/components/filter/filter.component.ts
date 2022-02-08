import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { StreamService } from 'src/app/services/stream/stream.service';
import { GetCandidate } from '../../interfaces/GetCandidate';
import { Project } from '../../interfaces/Project';
import { Stream } from '../../interfaces/stream';

@Component({
  selector: 'ims-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  type!: String;

  @Input()
  inputList: GetCandidate[] = [];

  @Output() searchClicked: EventEmitter<GetCandidate[]> = new EventEmitter<GetCandidate[]>();

  filteredList: GetCandidate[] = [];

  projects!: Project[];

  streams!: Stream[];

  name: string = '';

  projectId!: number;

  streamId!: number;


  constructor(private projectService: ProjectService, private streamService: StreamService) { }

  ngOnInit(): void {
    this.type = "name";

    this.projectService.getProjects().subscribe(
      (response: any) => {
        this.projects = response;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.streamService.getStreams().subscribe(
      (response: any) => {
        this.streams = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  isTypeName(): boolean{
    return this.type == 'name';
  }
  isTypeProject(): boolean{
    return this.type == 'project';
  }

  isTypeStream(): boolean{
    return this.type == 'stream';
  }


  onSearch() {
    if(this.type == 'name') {
      // console.log(this.name);
      this.filteredList =[];
      this.inputList.forEach(candidate => {
        if(candidate.candidateName.search(this.name) !=-1) {
          this.filteredList.push(candidate);
        }
      });

    } else if(this.type == 'project') {
      this.filteredList =[];
      this.inputList.forEach(candidate => {
        if(candidate.project.projectId == this.projectId) {
          this.filteredList.push(candidate);
        }
      });
    } else if(this.type == 'stream') {
      this.filteredList =[];
      this.inputList.forEach(candidate => {
        if(candidate.stream.streamId == this.streamId) {
          this.filteredList.push(candidate);
        }
      });
    } else {
      this.searchClicked.emit(this.inputList);
      return;
    }

    // console.log(this.filteredList);
    this.searchClicked.emit(this.filteredList);
  }

}
