import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; // firestore
import { Observable } from '@firebase/util';
import { CalendarModule } from 'primeng/calendar'; // date picker
import { DatePipe } from '@angular/common'; // date filter
import { FairService } from '../../services/fair.service';
import { PeriodService } from '../../services/period.service';
import { Fair } from '../../models/Fair';
import { Period } from '../../models/period';
import { FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrls: ['./resform.component.css']
})


export class ResformComponent implements OnInit {


// ReservationData
slectedFairData;
// tslint:disable-next-line:no-inferrable-types
slectedfair: string = ' ';
// tslint:disable-next-line:no-inferrable-types
slecteddate: string = ' ';

slectedinterval: string;
selectedSchoolName: string;
selectedEDULevel: string;
selectedOffice: string;
selectedSchoolPhone: string;
selectedSupervisor: string;
selectedSupervisorPhone: string;
selectedStudentsNumber: number;

// selected fair date
mindate: Date = new Date(1999, 8 , 9);
maxdate: Date = new Date(1999, 8, 9);

en: any; // date picker localizer


// SlectedPeriodData:any;
SlectedPeriodData;
SlectedPeriodPlaces: number;
SlectedPeriodPeriod: string;
// tslint:disable-next-line:no-inferrable-types
fstSubscribecall: boolean = true;



// **********firestore observables******//
faircollection: AngularFirestoreCollection<any> = this.afs.collection('Fairs');
fiarobs = this.faircollection.valueChanges();

periodcollection: AngularFirestoreCollection<any> = this.afs.collection('Fairs')
.doc(' ').collection('dates').doc(' ').collection('periods');
periodobs = this.periodcollection.valueChanges();

reservationcollection: AngularFirestoreCollection<any> = this.afs.collection('reservations');

// **********************//



constructor(private afs: AngularFirestore , private fairService: FairService, private periodService: PeriodService,
            private datePipe: DatePipe ,
            //  customFormsModule: CustomFormsModule
            ) {}

    ngOnInit() {
        this.en = {
            firstDayOfWeek: 0,
            dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            dayNamesShort: ['أحد', 'اثن', 'ثلا', 'ارب', 'خمي', 'جمع', 'سبت'],
            dayNamesMin: ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'],
            monthNames: [ 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر' ],
            monthNamesShort: [ 'ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس' ],
            today: 'اليوم',
            clear: 'مسح'
        };
    }



   getdates(event) {

    if (this.slectedfair === '') {
    this.mindate = new Date(1999, 8, 9);
    this.maxdate = new Date(1999, 8, 9);
    this.slecteddate = ' ';
    this.periodcollection = this.afs.collection('Fairs')
    .doc(' ').collection('dates').doc(' ').collection('periods');
    this.periodobs = this.periodcollection.valueChanges();
      } else {
        this.fairService.getFairDates(this.slectedfair).subscribe(fiarobs => {this.slectedFairData = fiarobs;
          this.mindate = new Date(this.slectedFairData.fromDate);  this.maxdate = new Date(this.slectedFairData.toDate); }); }

    }


   getperiods(event) {
    this.slecteddate = this.datePipe.transform(this.slecteddate, 'yyyy-MM-dd');

    this.periodcollection = this.afs.collection('Fairs')
    .doc(this.slectedfair).collection('dates').doc(this.slecteddate).collection('periods');
    this.periodobs = this.periodcollection.valueChanges();

   }



  AddReservation() {
    this.reservationcollection.doc('زيارة ' + this.selectedSchoolName + ' ل ' + this.slectedfair).set({

      fairName: this.slectedfair,
      eduLevel: this.selectedEDULevel,
      eduOffice: this.selectedOffice,
      schoolName: this.selectedSchoolName,
      schoolPhone: this.selectedSchoolPhone,
      studentNumber: this.selectedStudentsNumber,
      teacherName: this.selectedSupervisor,
      teacherPhone: this.selectedSupervisorPhone,
      visitDate: this.slecteddate,
      visitTime: this.slectedinterval}).catch((err) => {console.log(err); });

      this.periodService.getPeriodData(this.slectedfair, this.slecteddate, this.slectedinterval)
      .subscribe(periodob => {this.SlectedPeriodData = periodob;
        this.SlectedPeriodPlaces = this.SlectedPeriodData.noOfSchool;
        this.managePeriodPlaces(this.SlectedPeriodPlaces);
      });
      }

      managePeriodPlaces(SlectedPeriodPlaces: number) {
      if (this.fstSubscribecall) {
        this.fstSubscribecall = false;

        if (SlectedPeriodPlaces === 1) {
        this.periodcollection.doc(this.slectedinterval).delete().then(() => {console.log('donaaaaaaaa'); });
        } else {
              this.periodService.updatePlaces(this.slectedfair, this.slecteddate, this.slectedinterval, SlectedPeriodPlaces);
          }
        }
      }

  }



