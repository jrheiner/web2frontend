import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<any> {
    return this.http.get('/api/posts');
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get(`/api/posts/${postId}`);
  }

  postPost(data): Observable<any> {
    return this.http.post(`/api/posts`, data);
  }

  editPostById(postId: string, data: string): Observable<any> {
    return this.http.put(`/api/posts/${postId}`, data);
  }

  deletePostById(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}`);
  }

  getComments(postId: string): Observable<any> {
    return this.http.get(`/api/comments/post/${postId}`);
  }

  getComment(commentId: string): Observable<any> {
    return this.http.get(`/api/comments/${commentId}`);
  }

  postComment(data: string): Observable<any> {
    return this.http.put(`/api/comments`, data);
  }

  editCommentById(commentId: string, data: string): Observable<any> {
    return this.http.put(`/api/comments/${commentId}`, data);
  }

  deleteCommentById(commentId: string): Observable<any> {
    return this.http.delete(`/api/comments/${commentId}`);
  }

  getUserSelf(): Observable<any> {
    return this.http.get(`/api/user`);
  }

  editUserSelf(data): Observable<any> {
    return this.http.put(`/api/user`, data);
  }

  deleteUserSelf(): Observable<any> {
    return this.http.delete(`/api/user`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/login', {username, password});
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/register', {username, password});
  }
}
