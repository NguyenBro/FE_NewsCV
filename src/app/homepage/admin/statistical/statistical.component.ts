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
      this.lengthNews = lista.data.length + this.lengthNews;
    });
    serviceCompetion.getListCompetion().subscribe((listb) => {
      this.lengthCompetion = listb.data.length;
      this.lengthNews = listb.data.length + this.lengthNews;
    });
    serviceScholarship.getListScholarship().subscribe((listC) => {
      this.lengthScholarship = listC.data.length;
      this.lengthNews = listC.data.length + this.lengthNews;
    });
    //job
    serviceCompetence.getListRecruit().subscribe((list) => {
      this.lengthJob = list.data.length;
      console.log('job', this.lengthJob);
    });
  }

  ngOnInit(): void {}
}
