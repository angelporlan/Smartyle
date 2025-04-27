import { Injectable } from '@angular/core';

export interface Avatar {
  id: number;
  name: string;
  image: string;
  price: number;
  unlocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORAGE_KEY = 'quiz_avatars';
  private readonly SELECTED_AVATAR_KEY = 'selected_avatar';

  private avatars: Avatar[] = [
    {
      id: 1,
      name: 'Default Avatar',
      image: '👤',
      price: 0,
      unlocked: true
    },
    {
      id: 2,
      name: 'Cool Cat',
      image: '😺',
      price: 10,
      unlocked: false
    },
    {
      id: 3,
      name: 'Happy Dog',
      image: '🐶',
      price: 15,
      unlocked: false
    },
    {
      id: 4,
      name: 'Wizard',
      image: '🧙‍♂️',
      price: 20,
      unlocked: false
    },
    {
      id: 5,
      name: 'Alien',
      image: '👽',
      price: 25,
      unlocked: false
    },
    {
      id: 6,
      name: 'Crown',
      image: '👑',
      price: 30,
      unlocked: false
    },
    {
      id: 7,
      name: 'Dragon',
      image: '🐲',
      price: 50,
      unlocked: false
    },
    {
      id: 8,
      name: 'Unicorn',
      image: '🦄',
      price: 75,
      unlocked: false
    }
  ];

  constructor() {
    this.loadAvatars();
  }

  private loadAvatars() {
    const savedAvatars = localStorage.getItem(this.STORAGE_KEY);
    if (savedAvatars) {
      this.avatars = JSON.parse(savedAvatars);
    } else {
      this.saveAvatars();
    }
  }

  private saveAvatars() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.avatars));
  }

  getAvatars(): Avatar[] {
    return this.avatars;
  }

  getSelectedAvatar(): Avatar {
    const selectedId = localStorage.getItem(this.SELECTED_AVATAR_KEY);
    return this.avatars.find(a => a.id === Number(selectedId)) || this.avatars[0];
  }

  setSelectedAvatar(avatarId: number) {
    localStorage.setItem(this.SELECTED_AVATAR_KEY, avatarId.toString());
  }

  purchaseAvatar(avatarId: number, diamonds: number): boolean {
    const avatar = this.avatars.find(a => a.id === avatarId);
    if (!avatar || avatar.unlocked || avatar.price > diamonds) {
      return false;
    }

    avatar.unlocked = true;
    this.saveAvatars();
    return true;
  }
} 