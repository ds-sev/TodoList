import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  signal,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { ITask } from '../../shared/interfaces';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {

  searchForm!: FormGroup;
  autocompleteSuggestionsSig: WritableSignal<ITask[]> = signal<ITask[]>([]);
  autocompleteVisible: boolean = false;
  private initialTasksList: ITask[] = [];
  private formSubscription$: Subscription | undefined;

  //отслеживаем клики вне инпута
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeSuggestionsList();
    }
  }

  @Output() foundTasks = new EventEmitter<ITask[]>();
  @Output() selectedTaskFromSuggestionsList = new EventEmitter<ITask>;
  @Output() searchPerformed = new EventEmitter<boolean>(false);
  @Output() singleTaskSelected = new EventEmitter<boolean>(false);

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    //добавляем слушатель событий к документу, в случае клика вне инпута закрываем список а-комплита
    this.renderer.listen('document', 'click', (event: any) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closeSuggestionsList();
        this.searchForm.reset();
      }
    });

    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, Validators.required)
    });

    this.formSubscription$ = this.searchForm.get('searchValue')?.valueChanges
    .pipe(
      //небольшая задержка, если пользователь быстро вводит данные
      debounceTime(100),
      //отфильтровываем повторные потоки
      distinctUntilChanged()
    )
    .subscribe(value => {
      //получаем отфильтрованный список на основе введенных данных
      const suggestions = this.initialTasksList.filter(task => {
        if (task && task.name && value !== null) {
          return task.name.toLowerCase().includes(value.toLowerCase());
        } else {
          return false;
        }
      });
      if (value) {
        this.autocompleteSuggestionsSig.set(suggestions);
        this.autocompleteVisible = true;
      } else {
        this.autocompleteSuggestionsSig.set([]);
        this.closeSuggestionsList();
      }
    });
  }

  onFormFocus() {
    this.initialTasksList = this.userService.getStoredCurrentUserData().tasks;
  }

  //закрытие списка автокомплита
  closeSuggestionsList() {
    this.autocompleteVisible = false;
  }

  //отправляем сигнал со списком найденных задач; фиксируем, что был произведен поиск
  onSearchSubmit() {
    this.foundTasks.emit(this.autocompleteSuggestionsSig());
    this.singleTaskSelected.emit(false);
    this.searchPerformed.emit(true);
    this.closeSuggestionsList();
    //сбрасываем значение инпута
    this.searchForm.reset();
    //убираем фокус с инпута
    this.renderer.selectRootElement('.search-bar__input').blur();
  }

  //навигация к задаче из списка а-комплита
  navigateToTask(task: ITask) {
    this.searchPerformed.emit(false);
    this.singleTaskSelected.emit(true);
    this.selectedTaskFromSuggestionsList.emit(task);
    this.closeSuggestionsList();
  }

  ngOnDestroy() {
    if (this.formSubscription$) {
      this.formSubscription$.unsubscribe();
    }
  }
}
