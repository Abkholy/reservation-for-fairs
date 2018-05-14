import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument}
from 'angularfire2/firestore';
//observable
import{Observable}from'rxjs/Observable';
//models
import {Fair}from'../models/Fair';

@Injectable()
export class FairService {

  faircollection:AngularFirestoreDocument<Fair>;
  fairobs:Observable<Fair>;


  constructor(public  afs:AngularFirestore) {
  }

  getFairDates(fair){
    return this.fairobs=this.afs.collection('Fairs').doc(fair).valueChanges();  
  }



}



