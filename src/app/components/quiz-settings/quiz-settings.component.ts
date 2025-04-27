import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestService, Category, Difficulty, QuestionType, QuizSettings } from '../../services/quest.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class QuizSettingsComponent implements OnInit {
  @Output() settingsSelected = new EventEmitter<QuizSettings>();
  
  categories: Category[] = [];
  selectedCategory: number = 9;
  selectedDifficulty: Difficulty = 'easy';
  selectedType: QuestionType = 'multiple';
  timed: boolean = false;
  showStore: boolean = false;

  diamondCount: number = 0;

  difficulties: { value: Difficulty; label: string; }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];
  
  questionTypes = [
    { value: 'multiple' as QuestionType, label: 'Multiple Choice' },
    { value: 'boolean' as QuestionType, label: 'True/False' }
  ];

  constructor(
    private questService: QuestService,
    private router: Router
  ) {}

  async ngOnInit() {
    const response = await this.questService.getCategories();
    this.categories = response.trivia_categories;
    this.loadDiamonds();
  }

  loadDiamonds() {
    const stored = localStorage.getItem('diamonds');
    this.diamondCount = stored ? parseInt(stored, 10) : 0;
  }

  setDifficulty(difficulty: Difficulty) {
    this.selectedDifficulty = difficulty;
  }

  setType(type: QuestionType) {
    this.selectedType = type;
  }

  startQuiz() {
    this.settingsSelected.emit({
      difficulty: this.selectedDifficulty,
      category: this.selectedCategory,
      type: this.selectedType,
      timed: this.timed
    });
  }

  toggleStore() {
    this.showStore = !this.showStore;
  }

  updateDiamonds(newCount: number) {
    this.diamondCount = newCount;
    localStorage.setItem('diamonds', newCount.toString());
  }

  goToStore() {
    this.router.navigate(['/store']);
  }
} 