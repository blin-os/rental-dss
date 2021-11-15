import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
  providers: [RentalService]
})
export class RentalListComponent implements OnInit {
  @Input() groupFilters: Object;
	@Input() searchByKeyword: string;
	users: any[] = [];
	filteredUsers: any[] = [];
 
  rentals: any;
  currentRental = null;
  currentIndex = -1;
  title = '';
  minPrice = null;
  maxPrice = null;
  minSize = null;
  maxSize = null;
  minRooms = null;
  maxRooms = null;
  minBathrooms = null;
  maxBathrooms = null;
  petsAllowed = false;
  smokingAllowed = false;
  furnished = false;
  laundry = false;

  constructor(private rentalService: RentalService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.retrieveRentals();
  }

  

  retrieveRentals(): void {
    this.rentalService.getAll()
      .subscribe(
        data => {
          this.rentals = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveRentals();
    this.currentRental = null;
    this.currentIndex = -1;
  }

  setActiveRental(rental, index): void {
    this.currentRental = rental;
    this.currentIndex = index;
  }

  removeAllRentals(): void {
    this.rentalService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveRentals();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.rentalService.findByTitle(this.title)
      .subscribe(
        data => {
          this.rentals = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchByFilters(): void {
    this.rentalService.findByFilters(
      this.minPrice, 
      this.maxPrice, 
      this.minSize, 
      this.maxSize, 
      this.minRooms, 
      this.maxRooms, 
      this.minBathrooms, 
      this.maxBathrooms, 
      this.petsAllowed, 
      this.smokingAllowed, 
      this.furnished, 
      this.laundry)
      .subscribe(
        data => {
          this.rentals = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}