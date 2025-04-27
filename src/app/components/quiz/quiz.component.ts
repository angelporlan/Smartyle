import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question, QuestionType, QuizSettings } from '../../services/quest.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() questions: Question[] = [];
  @Input() settings!: QuizSettings;
  @Output() restartQuiz = new EventEmitter<void>();
  
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  score = 0;
  quizCompleted = false;
  shuffledAnswers: string[] = [];
  userAnswers: string[] = [];
  timeLeft = 15;
  timerSubscription?: Subscription;
  diamondCount: number = 0;

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  ngOnInit() {
    this.loadDiamonds();
    this.shuffleAnswers();
    if (this.settings.timed) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadDiamonds() {
    const stored = localStorage.getItem('diamonds');
    this.diamondCount = stored ? parseInt(stored, 10) : 0;
  }

  startTimer() {
    this.timeLeft = 15;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    // Primero establecemos la clase resetting para el reinicio instantáneo
    const timerBar = document.querySelector('.timer-bar');
    if (timerBar) {
      timerBar.classList.remove('counting');
      timerBar.classList.add('resetting');
      
      // Usamos setTimeout para asegurarnos de que el reinicio se complete
      setTimeout(() => {
        timerBar.classList.remove('resetting');
        timerBar.classList.add('counting');
      }, 0);
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitAnswer();
      }
    });
  }

  shuffleAnswers() {
    const answers = [...this.currentQuestion.incorrect_answers];
    answers.push(this.currentQuestion.correct_answer);
    this.shuffledAnswers = this.shuffleArray(answers);
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  submitAnswer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.selectedAnswer) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
      
      if (this.selectedAnswer === this.currentQuestion.correct_answer) {
        this.score++;
      }
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.shuffleAnswers();
      if (this.settings.timed) {
        this.startTimer();
      }
    } else {
      this.quizCompleted = true;
      // Sumar diamantes al final del quiz
      this.diamondCount += this.score;
      localStorage.setItem('diamonds', this.diamondCount.toString());
    }
  }

  private shuffleArray(array: string[]): string[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  isAnswerCorrect(index: number): boolean {
    return this.userAnswers[index] === this.questions[index].correct_answer;
  }

  getTimePercentage(): number {
    return (this.timeLeft / 15) * 100;
  }
} 