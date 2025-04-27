import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService, Avatar } from '../../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StoreComponent {
  @Input() diamonds: number = 0;
  @Output() diamondsChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  avatars: Avatar[] = [];
  selectedAvatar: Avatar;

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
    this.avatars = this.storeService.getAvatars();
    this.selectedAvatar = this.storeService.getSelectedAvatar();
    const storedDiamonds = localStorage.getItem('diamonds');
    this.diamonds = storedDiamonds ? parseInt(storedDiamonds) : 0;
  }

  purchaseAvatar(avatar: Avatar) {
    if (this.storeService.purchaseAvatar(avatar.id, this.diamonds)) {
      this.diamonds -= avatar.price;
      localStorage.setItem('diamonds', this.diamonds.toString());
      this.diamondsChange.emit(this.diamonds);
    }
  }

  selectAvatar(avatar: Avatar) {
    if (avatar.unlocked) {
      this.selectedAvatar = avatar;
      this.storeService.setSelectedAvatar(avatar.id);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 