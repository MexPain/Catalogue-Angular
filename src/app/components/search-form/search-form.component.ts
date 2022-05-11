import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

/**
 * A form with a search field and a button
 */
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  /**
   * An event which gives back the text from the search field when the button is pressed
   */
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()
  /**
   * A text about the item we're searching for. It will appear in the label of the text-field
   */
  @Input() typeLabel!: string

  searchText = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if(this.searchText.hasError('required')) {
      return 'You must enter a value'
    }
    return this.searchText.hasError('minlength') ? 'Must be at least 3 characters long' : ''
  }

  onSubmit() {
      this.onSearch.emit(this.searchText.value)
  }

}
