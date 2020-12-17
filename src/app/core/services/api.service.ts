import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Api server, defines all API calls.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Constructor
   * @param http - HttpClient to make requests
   */
  constructor(private http: HttpClient) {
  }

  /**
   * API request to get project statistics
   */
  getProjectStats(): Observable<any> {
    return this.http.get('/api');
  }

  /**
   * API request to get all posts
   */
  getAllPosts(): Observable<any> {
    return this.http.get('/api/posts');
  }

  /**
   * API request to get a post by id
   * @param postId - Post id
   */
  getPostById(postId: string): Observable<any> {
    return this.http.get(`/api/posts/${postId}`);
  }

  /**
   * API request to create a new post
   * @param data - Form data
   */
  postPost(data: FormData): Observable<any> {
    return this.http.post(`/api/posts`, data, {headers: {Accept: 'application/json'}});
  }

  /**
   * API request to update an existing post
   * @param postId - Post id
   * @param data - New post data
   */
  editPostById(postId: string, data: any): Observable<any> {
    return this.http.put(`/api/posts/${postId}`, data);
  }

  /**
   * API request to delete a post
   * @param postId - Post id
   */
  deletePostById(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}`);
  }

  /**
   * API request to like a post
   * @param postId - Post id
   */
  likePost(postId: string): Observable<any> {
    return this.http.get(`/api/posts/${postId}/vote`);
  }

  /**
   * API request to delete a like from a post
   * @param postId - Post id
   */
  removeLikePost(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}/vote`);
  }

  /**
   * API request to get all comments for a post
   * @param postId - Post id
   */
  getComments(postId: string): Observable<any> {
    return this.http.get(`/api/comments/post/${postId}`);
  }

  /**
   * API request to get a comment by id
   * @param commentId - Comment id
   */
  getComment(commentId: string): Observable<any> {
    return this.http.get(`/api/comments/${commentId}`);
  }

  /**
   * API request to post a new comment under a post
   * @param id - Post id
   * @param data - Comment description
   */
  postComment(id: string, data: { description: string }): Observable<any> {
    return this.http.post(`/api/comments/${id}`, data);
  }

  /**
   * API request to edit an existing comment
   * @param commentId - Comment id
   * @param data - New comment description
   */
  editCommentById(commentId: string, data: { description: string }): Observable<any> {
    return this.http.put(`/api/comments/${commentId}`, data);
  }

  /**
   * API request to delete a comment
   * @param commentId - Comment id
   */
  deleteCommentById(commentId: string): Observable<any> {
    return this.http.delete(`/api/comments/${commentId}`);
  }

  /**
   * API request to get information about the logged in user
   */
  getUserSelf(): Observable<any> {
    return this.http.get(`/api/user`);
  }

  /**
   * API request to get information about any user by id
   * @param id - User id
   */
  getUserById(id: string): Observable<any> {
    return this.http.get(`/api/user/${id}`);
  }

  /**
   * API request to update the logged in user
   * @param data - Form data
   */
  editUserSelf(data: FormData): Observable<any> {
    return this.http.put(`/api/user`, data);
  }

  /**
   * API request to delete the logged in user
   */
  deleteUserSelf(): Observable<any> {
    return this.http.delete(`/api/user`);
  }

  /**
   * API request to check if a username is available
   * @param username - Username to check
   */
  checkUsername(username: string): Observable<any> {
    return this.http.get(`/api/user/check/${username}`);
  }

  /**
   * API request to the save list of a user
   */
  getUserSaved(): Observable<any> {
    return this.http.get('/api/user/saved/');
  }

  /**
   * API request to check if a post is part of the save list of the logged in user
   * @param postId - Post id to check
   */
  checkUserSaved(postId: string): Observable<any> {
    return this.http.get(`/api/user/saved/${postId}`);
  }

  /**
   * API request to add a post id to the save list of the logged in user
   * @param postId - Post id to add
   */
  addUserSaved(postId: string): Observable<any> {
    return this.http.post(`/api/user/save/${postId}`, null);
  }

  /**
   * API request to request a session/auth token
   * @param username - Username
   * @param password - Password
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/login', {username, password});
  }

  /**
   * API request to register a new user
   * @param username - Username
   * @param password - Password
   */
  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/register', {username, password});
  }
}
