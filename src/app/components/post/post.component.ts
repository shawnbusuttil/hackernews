import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Post } from '../../models/post.model';

@Component({
    selector: "hn-post",
    styleUrls: ["./post.component.scss"],
    templateUrl: "./post.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
    @Input() post: Post;
}