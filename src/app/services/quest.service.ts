import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categories } from '../data/categories';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'boolean' | 'multiple';

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: Question[];
}

export interface QuizSettings {
  difficulty: Difficulty;
  category: number;
  type: QuestionType;
  timed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private baseUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getCategories() {
    return Promise.resolve({ trivia_categories: categories });
  }

  getQuestions(settings: QuizSettings) {
    const url = `${this.baseUrl}?amount=10&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}&language=es`;
    return this.http.get<QuizResponse>(url);
  }
}
