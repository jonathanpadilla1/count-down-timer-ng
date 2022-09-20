import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {

    private subscription!: Subscription;
  
    public dateNow = new Date();
    public dDay = new Date('Sep 21 2022 14:15:00');

    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference: any;
    public secondsToDday: any;
    public minutesToDday: any;
    public hoursToDday: any;
    public daysToDday: any;

    private getTimeDifference () {
        this.timeDifference = this.dDay.getTime() - new  Date().getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

    private allocateTimeUnits (timeDifference: number) {
        this.secondsToDday = this.render(Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute));
        this.minutesToDday = this.render(Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute));
        this.hoursToDday = this.render(Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay));
        this.daysToDday = this.render(Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)));
    }

    private render(t: any) {
      const tiempo = t < 10 ? '0' + t : t;
      const caracteres = tiempo.toString().split('')
      let render = ''

      caracteres.forEach((valor: any) => {
        render += `<span class="caja-contador">${ valor }</span>`
      });

      return render;
    }

    ngOnInit() {
       this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifference(); });
    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}