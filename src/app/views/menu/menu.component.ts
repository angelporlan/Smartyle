import { Component } from '@angular/core';
import { QuestService, Difficulty, QuestionType, Question, QuizSettings } from '../../services/quest.service';
import { QuizSettingsComponent } from '../../components/quiz-settings/quiz-settings.component';
import { QuizComponent } from '../../components/quiz/quiz.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, QuizSettingsComponent, QuizComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  questions: Question[] = [];
  showQuiz = false;
  settings!: QuizSettings;
  errorMessage = '';

  constructor(private questService: QuestService) { }

  onSettingsSelected(settings: QuizSettings) {
    this.settings = settings;
    this.errorMessage = '';
    
    this.questService.getQuestions(settings)
      .subscribe({
        next: (response) => {
          if (response.results && response.results.length > 0) {
            this.questions = response.results;
            this.showQuiz = true;
          } else {
            this.errorMessage = 'No hay preguntas disponibles para esta configuración. Por favor, intenta con otra combinación de categoría, dificultad o tipo de pregunta.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Hubo un error al cargar las preguntas. Por favor, intenta de nuevo.';
        }
      });
  }
}
