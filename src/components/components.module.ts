import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ModalTrackComponent } from './modal-track/modal-track';
@NgModule({
	declarations: [ProgressBarComponent,
    ModalTrackComponent],
	imports: [],
	exports: [ProgressBarComponent,
    ModalTrackComponent]
})
export class ComponentsModule {}
