import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sku} from '../model/sku.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class SkuService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/skus';

  skus: Sku[] = [
    new Sku(1, 'Sku1', 'Name1', 'Desc1', 100.0),
    new Sku(2, 'Sku2', 'Name2', 'Desc2', 102.0),
    new Sku(3, 'Sku3', 'Name3', 'Desc3', 103.0),
    new Sku(4, 'Sku4', 'Name4', 'Desc4', 104.0),
 ];

  getSkus() : Sku[] {
    return this.skus;
  }

  getSkuById(id: number) : Sku {
    let jMax: number = this.skus.length;
    for( let j = 0; j < jMax; j++ ) {
      if( this.skus[j].id === id ) {
        return this.skus[j];
      }
    }
    return null;
    //return this.http.get<Sku>(this.baseUrl + '/' + id);
  }

  findSku(sku: Sku) : Sku {
    this.skus.forEach( function(testSku) {
      if( testSku.id === sku.id) { 
        return testSku;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createSku (sku: Sku) : string {
    let testSku: Sku = this.findSku(sku);
    if( testSku != null) {
      return 'Already added: id is: ' + testSku.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.skus.length;
    if( this.skus.length > 0 ) {
      newId = this.skus[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.skus[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    sku.id = newId;
    this.skus.push(sku);
    return '';
    //return this.http.post(this.baseUrl, sku);
  }

  updateSku(sku: Sku) : string {
    let isFound : boolean = false;
    this.skus.forEach( (item, index) => {
      if(item.id === sku.id) {
        isFound = true;
        this.skus[index] = sku;
      }
    });
    if( isFound) {
      return '';
    }
    return 'Sku was not found';
    //return this.http.put(this.baseUrl + '/' + sku.id, sku);
  }

  deleteSku (id: number) : string {
    this.skus.forEach( (item, index) => {
      if(item.id === id) {
        this.skus.splice(index,1);
        return '';
      }
    });
    return 'Sku not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}

