import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getProjectStats(): Observable<any> {
    return this.http.get('/api');
  }


  getAllPosts(): Observable<any> {
    return this.http.get('/api/posts');
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get(`/api/posts/${postId}`);
  }

  postPost(data: FormData): Observable<any> {
    return this.http.post(`/api/posts`, data, {headers: {Accept: 'application/json'}});
  }

  editPostById(postId: string, data: any): Observable<any> {
    return this.http.put(`/api/posts/${postId}`, data);
  }

  deletePostById(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}`);
  }

  likePost(postId: string): Observable<any> {
    return this.http.get(`/api/posts/${postId}/vote`);
  }

  removeLikePost(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}/vote`);
  }

  getComments(postId: string): Observable<any> {
    return this.http.get(`/api/comments/post/${postId}`);
  }

  getComment(commentId: string): Observable<any> {
    return this.http.get(`/api/comments/${commentId}`);
  }

  postComment(id: string, data: { description: string }): Observable<any> {
    return this.http.post(`/api/comments/${id}`, data);
  }

  editCommentById(commentId: string, data: { description: string }): Observable<any> {
    return this.http.put(`/api/comments/${commentId}`, data);
  }

  deleteCommentById(commentId: string): Observable<any> {
    return this.http.delete(`/api/comments/${commentId}`);
  }

  getUserSelf(): Observable<any> {
    return this.http.get(`/api/user`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`/api/user/${id}`);
  }

  editUserSelf(data: FormData): Observable<any> {
    return this.http.put(`/api/user`, data);
  }

  deleteUserSelf(): Observable<any> {
    return this.http.delete(`/api/user`);
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get(`/api/user/check/${username}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/login', {username, password});
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/register', {username, password});
  }
}
