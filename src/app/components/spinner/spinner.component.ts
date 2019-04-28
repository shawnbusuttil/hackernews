import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "hn-spinner",
    templateUrl: "./spinner.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
    @Input() diameter: number = 50;
}