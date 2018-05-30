import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rep} from '../model/rep.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class RepService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/reps';

  reps: Rep[] = [
    new Rep(1, 'Abby', 'Ames', 'email1@gmail.com', 'AA', true),
    new Rep(2, 'Blake', 'Black', 'email2@gmail.com', 'BB', true),
    new Rep(3, 'Carl', 'Coney', 'email3@gmail.com', 'CC', true),
    new Rep(4, 'Devon', 'Drake', 'email4@gmail.com', 'DD', true),
 ];

  getReps() : Rep[] {
    return this.reps;
  }

  getRepById(id: number) : Rep {
    let jMax: number = this.reps.length;
    for( let j = 0; j < jMax; j++ ) {
      if( this.reps[j].id === id ) {
        return this.reps[j];
      }
    }
    return null;
    //return this.http.get<Rep>(this.baseUrl + '/' + id);
  }

  findRep(rep: Rep) : Rep {
    this.reps.forEach( function(testRep) {
      if( testRep.firstName.toUpperCase() === rep.firstName.toUpperCase() && 
      testRep.lastName.toUpperCase() === rep.lastName.toUpperCase() && 
      testRep.email.toUpperCase() === rep.email.toUpperCase()) {
        return testRep;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createRep (rep: Rep) : string {
    let testRep: Rep = this.findRep(rep);
    if( testRep != null) {
      return 'Already added: id is: ' + testRep.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.reps.length;
    if( this.reps.length > 0 ) {
      newId = this.reps[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.reps[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    rep.id = newId;
    this.reps.push(rep);
    return '';
    //return this.http.post(this.baseUrl, rep);
  }

  updateRep(rep: Rep) : string {
    let isFound : boolean = false;
    this.reps.forEach( (item, index) => {
      if(item.id === rep.id) {
        isFound = true;
        this.reps[index] = rep;
      }
    });
    if( isFound) {
      return '';
    }
    return 'Rep was not found';
    //return this.http.put(this.baseUrl + '/' + rep.id, rep);
  }

  deleteRep (id: number) : string {
    this.reps.forEach( (item, index) => {
      if(item.id === id) {
        this.reps.splice(index,1);
        return '';
      }
    });
    return 'Rep not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}

