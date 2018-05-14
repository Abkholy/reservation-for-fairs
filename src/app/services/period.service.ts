import { Injectable } from '@angular/core';
// firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
// observable
import {Observable} from 'rxjs/Observable';
// models
import {Period} from '../models/period';

@Injectable()
export class PeriodService {


  periodcollection: AngularFirestoreDocument<Period>;
  periodob: Observable<Period>;




  constructor(public  afs: AngularFirestore) {
  }

  getPeriodData(slectedfair, slecteddate, slectedinterval) {

    return this.periodob = this.afs.collection('Fairs').doc(slectedfair).collection('dates')
    .doc(slecteddate).collection('periods').doc<Period>(slectedinterval).valueChanges();

  }




  updatePlaces(slectedfair, slecteddate, slectedinterval, noOfSchool) {

    noOfSchool = noOfSchool - 1;

    this.afs.collection('Fairs').doc(slectedfair).collection('dates')
    .doc(slecteddate).collection('periods').doc(slectedinterval).update({
      noOfSchool : noOfSchool
    });
  }




}
