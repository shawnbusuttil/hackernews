import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { from, Subscription, Observable } from 'rxjs';
import { mergeMap, map, merge, tap, filter, take, delay, reduce } from 'rxjs/operators';

import { BUFFER } from '../../app.const';

import { Post } from '../../models/post.model';
import { NewsFeedService } from '../../services/news-feed.service';

@Component({
    selector: "hn-news-feed",
    styleUrls: ["./news-feed.container.scss"],
    templateUrl: "./news-feed.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedContainer implements OnInit, OnDestroy {
    isLoading = false;

    ids: number[] = [];
    posts: Post[] = [];
    placeholders: number[] = Array(BUFFER);
    
    private data$$: Subscription;

    constructor(
        private service: NewsFeedService,
        private changeDetector: ChangeDetectorRef
    ) {}
    
    ngOnInit() {
        this.data$$ = this.service.getTopPosts$().pipe(
            tap(ids => this.ids = ids),
            mergeMap(ids => this.service.getPosts$(ids.slice(0, BUFFER)))
        ).subscribe(posts => this.addPosts(posts));
    }

    ngOnDestroy() {
        if (this.data$$) {
            this.data$$.unsubscribe();
        }   
    }

    loadMorePosts() {
        if (this.posts.length < this.ids.length) {
            this.isLoading = true;
            this.service.getPosts$(this.ids.slice(this.posts.length, this.posts.length + BUFFER)).pipe(
                filter(posts => !!posts)
            ).subscribe(posts => {
                this.isLoading = false;
                this.addPosts(posts);
            });
        }
    }

    private addPosts(posts: Post[]) {
        this.posts.push(...posts);
        this.changeDetector.markForCheck();
    }
}