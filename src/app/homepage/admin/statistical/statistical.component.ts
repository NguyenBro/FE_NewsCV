import { Component, OnInit } from '@angular/core';
import { CompanysService } from '../../company/services/companys.service';
import { CompetenceFramesService } from '../../competence-frames/services/competence-frames.service';
import { NewsEventService } from '../../news-event/services/news-event.service';
import { NewsScholarshipService } from '../../news-scholarship/services/news-scholarship.service';
import { NewsCompetionService } from '../../news/services/news-competion.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.less'],
})
export class StatisticalComponent implements OnInit {
  load = true;
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
    private serviceCompetence: CompetenceFramesService,
    private serviceAdmin: AdminService
  ) {
    this.loadData();
  }
  async loadData() {
    //company
    this.serviceCompany.getListCompany().subscribe((listCom) => {
      this.lengthCompany = listCom.data.length;
    });
    //news
    this.serviceEvent.getListEvent().subscribe((lista) => {
      this.lengthEvent = lista.data.length;
      this.lengthNews = lista.data.length + this.lengthNews;
    });
    this.serviceCompetion.getListCompetion().subscribe((listb) => {
      this.lengthCompetion = listb.data.length;
      this.lengthNews = listb.data.length + this.lengthNews;
    });
    this.serviceScholarship.getListScholarship().subscribe((listC) => {
      this.lengthScholarship = listC.data.length;
      this.lengthNews = listC.data.length + this.lengthNews;
    });
    // serviceAdmin.getInteractiveNews().subscribe((list) => {
    //   this.lengthNews = list.data.length;
    //   console.log('job', this.lengthJob);
    // });
    //job
    await this.serviceCompetence.getListRecruit().subscribe((list) => {
      this.lengthJob = list.data.length;
      this.load = false;
    });
  }
  ngOnInit(): void {}
}
