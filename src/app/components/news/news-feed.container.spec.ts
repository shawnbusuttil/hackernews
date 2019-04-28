import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NewsFeedContainer } from './news-feed.container';
import { MOCKED_POSTS, BUFFER } from "../../app.const";
import { NewsFeedService } from '../../services/news-feed.service';

class MockNewsFeedService {
    getTopPosts$ = () => undefined;
    getPosts$ = () => of(MOCKED_POSTS);
}

describe("NewsFeedContainerSpecs", () => {
    let fixture: ComponentFixture<NewsFeedContainer>;
    let component: NewsFeedContainer;
    let service: MockNewsFeedService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsFeedContainer],
            providers: [
                { provide: NewsFeedService, useClass: MockNewsFeedService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsFeedContainer);
        service = TestBed.get(NewsFeedService);
        component = fixture.componentInstance;
    });

    describe("given the container is initialized", () => {
        it("should have no posts", () => {
            expect(component.posts.length).toEqual(0);
        });
        
        describe("when the posts are fetched", () => {
            beforeEach(() => {
                spyOn(service, "getTopPosts$").and.returnValue(of([0, 1]));
                fixture.detectChanges();
            });

            it("should get the posts", () => {
                expect(component.posts).toEqual(MOCKED_POSTS);
            });
        });

        describe("when more posts are loaded", () => {
            describe("and the number of ids is greater than posts loaded", () => {
                beforeEach(() => {
                    spyOn(service, "getTopPosts$").and.returnValue(of(Array.from(Array(100).keys())));
                    spyOn(service, "getPosts$").and.callThrough();
                    fixture.detectChanges();
                });

                it("should get more posts", () => {
                    component.loadMorePosts();
                    expect(service.getPosts$).toHaveBeenCalled();
                });
            });

            describe("and the number of ids is less than posts loaded", () => {         
                beforeEach(() => {
                    spyOn(service, "getTopPosts$").and.returnValue(of([0, 1]));
                    fixture.detectChanges();
                });
                
                it("should not get more posts", () => {
                    component.loadMorePosts();

                    spyOn(service, "getPosts$").and.callThrough();
                    expect(service.getPosts$).not.toHaveBeenCalled();
                });
            });
        });
    });
});