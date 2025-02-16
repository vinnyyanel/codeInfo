import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubscriberService } from '../../../services/subscribers/subscriber.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private subscriberService= inject(SubscriberService);
  private cdr= inject(ChangeDetectorRef);
  protected isLoading:boolean=false;
  email:any;
  register(){
    this.isLoading = true;
    this.subscriberService.postSubscriber(this.email).subscribe({
      next:res=>{
        console.log(res.message);
        this.email='';
        this.isLoading = false;
        this.cdr.detectChanges();
      },error:error=>{
        console.log(error.message);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
