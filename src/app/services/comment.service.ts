// src/app/services/comment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';
import { Comment } from '../models/comment.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://springboot-security-app-latest.onrender.com/api/comments';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  /** Construye dinámicamente los headers con el token válido */
  private get httpOptions() {
    const token = this.storage.getSession('token') || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Obtiene los comentarios de un tweet concreto
   */
  getCommentsByTweet(tweetId: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.baseUrl}/tweet/${tweetId}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Crea un nuevo comentario para un tweet
   */
  createComment(tweetId: number, content: string): Observable<Comment> {
    return this.http
      .post<Comment>(
        `${this.baseUrl}/create`,
        { tweetId, content },
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina un comentario por su id
   */
  deleteComment(commentId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${commentId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Manejador de errores centralizado */
  private handleError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      msg = error.error.message;
    } else {
      // Error del servidor
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(msg);
    window.alert(msg);
    return throwError(() => msg);
  }
}
