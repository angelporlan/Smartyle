import { Component, EventEmitter, Output } from '@angular/core';
import { Difficulty } from '../../services/quest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difficulty-menu',
  imports: [CommonModule],
  templateUrl: './difficulty-menu.component.html',
  styleUrls: ['./difficulty-menu.component.css']
})
export class DifficultyMenuComponent {
  @Output() difficultySelected = new EventEmitter<Difficulty>();
  
  difficulties: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Fácil' },
    { value: 'medium', label: 'Medio' },
    { value: 'hard', label: 'Difícil' }
  ];

  selectDifficulty(difficulty: Difficulty) {
    this.difficultySelected.emit(difficulty);
  }
} 