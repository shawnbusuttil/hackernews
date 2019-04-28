import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import { NewsFeedService } from "./news-feed.service";
import { API_URL, MOCKED_POSTS } from '../app.const';

const MOCKED_IDS = [0, 1];

describe("NewsFeedServiceSpecs", () => {
    let service: NewsFeedService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NewsFeedService,
                { provide: "apiUrl", useValue: API_URL }
            ]
        });

        service = TestBed.get(NewsFeedService);
        httpMock = TestBed.get(HttpTestingController);
    });

    describe("given the top posts are requested", () => {
        it("should return the top post ids", () => {
            service.getTopPosts$().subscribe(ids => {
                expect(ids).toEqual(MOCKED_IDS);
            });

            const req = httpMock.expectOne({ method: "GET", url: `${API_URL}/topstories.json` });

            req.flush(MOCKED_IDS);
            httpMock.verify();
        });
    });

    describe("given the ids of the posts are passed in", () => {
        it("should return the corresponding posts", () => {
            service.getPosts$(MOCKED_IDS).subscribe(posts => {
                expect(posts).toEqual(MOCKED_POSTS);
            });

            MOCKED_IDS.map(item => httpMock.expectOne({ method: "GET", url: `${API_URL}/item/${item}.json` })
                .flush(MOCKED_POSTS[item]));

            httpMock.verify();
        });
    });
});