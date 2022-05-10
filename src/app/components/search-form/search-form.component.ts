import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()
  @Input() typeLabel!: string
  searchText: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.searchText) {
      this.onSearch.emit(this.searchText)
    }
  }

}
