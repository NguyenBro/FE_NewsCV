import { Component } from '@angular/core';

import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { map, mergeMap, tap } from 'rxjs';
import { NewsEventEntryComponent } from '../news-event-entry/news-event-entry.component';
import { NewsEventService } from '../services/news-event.service';
import { ComFrame } from '../../model/competence-frames.model';
import { newsService } from '../../services/news.service';
import { user } from '../../model/news.model';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-event-form.component.html',
  styleUrls: ['./news-event-form.component.less'],
})
export class NewsEventFormComponent {
  user: user = new user();
  public isEmptyName = false;
  public isVisibleModal = false;
  public currentComFrame: ComFrame = new ComFrame();
  filterList: string[] = [];
  public id = '';
  todo = [
    'Chưa có gia đình',
    'Năng động',
    'Sáng tạo',
    'Khả năng làm việc nhóm',
    'Bằng cấp',
    'Kinh nghiệm',
    'Tỉ mỉ',
    'Tính toán',
    'Nhiệt huyết',
  ];
  todo1 = this.todo;
  nodone: string[] = [];
  public comFrame$ = this.route.params.pipe(
    map((p) => p['comFrameId']),
    mergeMap((p) => this.service.getComFrameInfo(p)),
    tap(
      (comFrame) =>
        (this.currentComFrame = new ComFrame(comFrame) || new ComFrame())
    )
  );
  constructor(
    private readonly service: NewsEventService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private news: NewsEventEntryComponent,
    private serviceNews: newsService
  ) {
    this.news.flex = true;
    this.comFrame$.subscribe();
    serviceNews
      .getLoggedInUser(localStorage.getItem('email') || '')
      .subscribe((user) => {
        if (user.errorCode === null) {
          this.user = user.data;
          console.log('user1131', this.user);
        }
      });
  }

  enteredToDo(event: CdkDragEnter) {
    moveItemInArray(this.todo, event.item.data, event.container.data);
  }

  enteredDone(event: CdkDragEnter) {
    moveItemInArray(
      this.currentComFrame.competences,
      event.item.data,
      event.container.data
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!(event.previousContainer === event.container)) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showModal(): void {
    this.isVisibleModal = true;
  }

  public cancel() {
    this.router.navigate(['.homepage/news-event']);
    this.news.isDetailShown = false;
  }
  public save() {
    if (
      this.currentComFrame.name != '' &&
      this.currentComFrame.competences != this.nodone
    ) {
      if (this.id !== '' && this.id !== undefined) {
        this.service.update(this.currentComFrame);
        this.message.success('Chỉnh sửa thành công');
      } else {
        this.currentComFrame.id = this.service.getRandomId();
        this.service.create(this.currentComFrame);
        this.message.success('Thêm thành công');
      }

      this.news.getPageList(0, true);
      this.service.comframe = this.currentComFrame;
      this.router.navigate(['.homepage/news-event/' + this.currentComFrame.id]);
      // this.cancel();
    } else if (this.currentComFrame.name === '') {
      this.message.error('Vui lòng nhập tên bộ khung năng lực!', {
        nzDuration: 3000,
      });
    } else if (this.currentComFrame.competences === this.nodone) {
      this.message.error(
        'Vui lòng thêm ít nhất 1 năng lực cho bộ khung năng lực!',
        {
          nzDuration: 3000,
        }
      );
    }
  }
  public add(item: string) {
    this.currentComFrame.competences.push(item);
    this.todo.splice(this.todo.indexOf(item), 1);
  }
  public remove(item: string) {
    this.todo.push(item);
    this.currentComFrame.competences.splice(
      this.currentComFrame.competences.indexOf(item),
      1
    );
  }
  search(event: Event) {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      const searchText = element.value;
      this.filter(searchText);
      console.log(searchText);

      // this.addFilter(searchText);
    }
  }
  require(event: Event) {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      const name = element.value;
      if (name === '') {
        this.isEmptyName = true;
      } else {
        this.isEmptyName = false;
      }
    }
  }
  filter(searchText: string) {
    console.log(this.todo1);
    if (searchText.length === 0) this.todo = this.todo1;
    if (this.service.checkVietnames(searchText)) {
      this.todo = this.todo1.filter(
        (item) =>
          //if vietnam accent
          //checkVietnam (searchText) true

          item.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        //else
        //convertVietnames(item.title).include()
      );
    } else {
      this.todo = this.todo1.filter(
        (item) =>
          //if vietnam accent
          //checkVietnam (searchText) true

          this.service
            .toLowerCaseNonAccentVietnamese(item)
            .includes(searchText.toLocaleLowerCase())
        //else
        //convertVietnames(item.title).include()
      );
    }

    console.log(this.todo);
  }
  // addFilter(filterText: string) {
  //   if (
  //     !this.filterList.some(
  //       (x) => x.toLowerCase() == filterText.toLowerCase()
  //     ) &&
  //     filterText.length > 0
  //   ) {
  //     this.filterList.push(filterText);
  //     console.log(this.filterList);
  //     this.saveSearchKeyword(filterText);
  //     this.getPageList(0, true);
  //   }
  // }
}
