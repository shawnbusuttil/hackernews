import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: "hn-news",
    templateUrl: "./app-news.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNewsComponent {
}