import { Component, OnInit } from '@angular/core';
import { CompanysService } from '../../company/services/companys.service';
import { CompetenceFramesService } from '../../competence-frames/services/competence-frames.service';
import { NewsEventService } from '../../news-event/services/news-event.service';
import { NewsScholarshipService } from '../../news-scholarship/services/news-scholarship.service';
import { NewsCompetionService } from '../../news/services/news-competion.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.less'],
})
export class StatisticalComponent implements OnInit {
  //Company
  lengthCompany: Number = new Number();
  //news
  lengthNews = 0;
  lengthEvent = 0;
  lengthCompetion = 0;
  lengthScholarship = 0;
  //job
  lengthJob: Number = new Number();
  constructor(
    private serviceCompany: CompanysService,
    private serviceEvent: NewsEventService,
    private serviceCompetion: NewsCompetionService,
    private serviceScholarship: NewsScholarshipService,
    private serviceCompetence: CompetenceFramesService
  ) {
    //company
    serviceCompany.getListCompany().subscribe((listCom) => {
      this.lengthCompany = listCom.data.length;
    });
    //news
    serviceEvent.getListEvent().subscribe((lista) => {
      this.lengthEvent = lista.data.length;
    });
    serviceCompetion.getListCompetion().subscribe((listb) => {
      this.lengthCompetion = listb.data.length;
    });
    serviceScholarship.getListScholarship().subscribe((listC) => {
      this.lengthScholarship = listC.data.length;
    });
    this.lengthNews =
      this.lengthCompetion + this.lengthEvent + this.lengthScholarship;
    //job
    serviceCompetence.getListRecruit().subscribe((listC) => {
      this.lengthJob = listC.data.length;
    });
  }

  ngOnInit(): void {}
}
