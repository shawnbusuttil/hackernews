import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';

import { Post } from '../models/post.model';
import { mergeMap, merge, concat, reduce } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class NewsFeedService {
    private httpOptions = {
        headers: new HttpHeaders({
            "Access-Control-Allow-Origin": "*"
        })
    };

    constructor(
        @Inject("apiUrl") private apiUrl: string,
        private http: HttpClient
    ) {
    }

    getTopPosts$(): Observable<number[]> {
        return this.http.get<number[]>(`${this.apiUrl}/topstories.json`, this.httpOptions);
    }

    getPosts$(ids: number[]): Observable<Post[]> {
        return from(ids).pipe(
            mergeMap(id => this.http.get<Post>(`${this.apiUrl}/item/${id}.json`, this.httpOptions)),
            reduce((acc: Post[], item: Post) => acc.concat(item), [])
        );
    }
}